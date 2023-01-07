import { readdir, readFile, writeFile } from 'fs'
import { join, extname } from 'path'

import { BuildConfig } from '../config/build.config'

import { LogUtil } from '../../pack/log/util/log.util'

import { LogHelper } from '../../pack/log/helper/log.helper'

import { TypeLogEnum } from '../../pack/log/type/enum/type.log.enum'

LogUtil.config = LogHelper.getConfig(TypeLogEnum.BUILD)

const fnNameTemplate: string = '___require2___',
    mapNameTemplate: string = '___Map___',
    fnTemplate: string = `function ${fnNameTemplate}(name) { return require(name) }\n`

interface Property {
    name: string
    type: 'fn' | 'obj'
}

interface Dependency {
    assignedName: string | undefined
    properties: Array<Property>
}

type PropertiesMap = Map<string, Dependency>

function readDistFile(file: string, path: string): void {
    readFile(path, BuildConfig.fileFormat, (error: any, data: string) => {
        if (error) throw error

        let propertiesMap: PropertiesMap = new Map,
            index: number = data.length,
            hasChanged: boolean = false

        for (let dependency of BuildConfig.criticalDependencies) {
            let assignedName: string | undefined = getDependencyAssignedName(data, dependency)

            if (assignedName)
                propertiesMap.set(dependency, {
                    assignedName: assignedName,
                    properties: getDependencyProperties(data, assignedName)
                })
        }

        for (let dependency of BuildConfig.criticalDependencies) {
            if (propertiesMap.get(dependency)?.assignedName === undefined) continue

            const [dataAfterProcessed, hasChangedAfterProcessed, indexAfterProcessed] =
                processDependencyReplacement(data, dependency, propertiesMap.get(dependency)?.assignedName || '')

            if (hasChangedAfterProcessed) {
                data = dataAfterProcessed

                if (indexAfterProcessed < index) {
                    index = indexAfterProcessed
                }

                hasChanged = true
            }
        }

        if (hasChanged) {
            data = setUsefulVar(data, index, propertiesMap)

            writeFile(path, data, (error: any) => {
                if (error) throw error

                LogUtil.logger(TypeLogEnum.BUILD).info(`${file} processed`)
            })
        }
    })
}

function readDistFolder(folderPath: string = BuildConfig.distFolderPath): void {
    readdir(folderPath, (error: any, elements: Array<string>) => {
        if (error) throw error

        const files = elements.filter((value) => extname(value) === '.js')

        for (const file of files) {
            const path: string = join(folderPath, file)

            if (path === __filename) continue

            readDistFile(file, path)
        }

        const folders = elements.filter((value) => extname(value) === '')

        for (const folder of folders) {
            const path: string = join(folderPath, folder)

            readDistFolder(path)
        }
    })
}

function regexEscape(text: string): string {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}

function substringData(
    data: string,
    newData: string,
    requireIndex: number,
    replacement: string,
    replacementLength: number,
    assignedName: string
): [string, string] {
    const beforePart: string = data.substring(0, requireIndex),
        requirePart: string = `${fnNameTemplate}("${replacement}")`,
        dataRest: string = data.substring(requireIndex + replacementLength, data.length)

    newData = newData + beforePart + `(${BuildConfig.conditionTemplate}) ? new ${mapNameTemplate}${assignedName} : ` + requirePart
    data = dataRest

    return [data, newData]
}

function processDependencyReplacement(data: string, replacement: string, assignedName: string): [string, boolean, number] {
    let newData: string = '',
        index: number = data.length

    const replacementLength: number = `require(.${replacement}.)`.length,
        regex: string = `require\\(["']${regexEscape(replacement)}["']\\)`,
        beforeRegex: RegExp = new RegExp(`^.{1,}${regex}`, 'gm'),
        requireRegex: RegExp = new RegExp(regex, 'gm')

    let beforeIndex: number = data.search(beforeRegex),
        requireIndex: number = data.search(requireRegex)

    while (requireIndex >= 0) {
        [data, newData] = substringData(data, newData, requireIndex, replacement, replacementLength, assignedName)

        if (beforeIndex < index) index = beforeIndex

        beforeIndex = data.search(beforeRegex)
        requireIndex = data.search(requireRegex)
    }

    return newData === '' ? [data, false, index] : [newData + data, true, index]
}

function getDependencyAssignedName(data: string, dependency: string): string | undefined {
    const regex: string = `require\\(["']${regexEscape(dependency)}["']\\)`,
        beforeRegex: RegExp = new RegExp(`^.{1,}${regex}`, 'gm'),
        requireRegex: RegExp = new RegExp(regex, 'gm')

    const beforeIndex: number = data.search(beforeRegex),
        requireIndex: number = data.search(requireRegex)

    const line: string = data.substring(beforeIndex, requireIndex)

    return line.split(' ')[1]
}

function getDependencyProperties(data: string, assignedName: string): Array<Property> {
    const regex: string = `${assignedName}[._a-zA-Z0-9]{1,}`,
        regexFn: RegExp = new RegExp(`\\(0, ${regex}\\)\\(`, 'gm'),
        fnPropertyUsingList: Array<string> = data.match(regexFn) ?? [],
        regexObj: RegExp = new RegExp(regex, 'gm'),
        ObjPropertyUsingList: Array<string> = data.match(regexObj) ?? []

    const result: Array<Property> = new Array

    for (const propertyUsing of fnPropertyUsingList) {
        let name: string = propertyUsing.substring(assignedName.length + 5).split(')')[0]

        if (result.filter((value: Property) => value.name === name).length === 0)
            result.push({
                name: name,
                type: 'fn'
            })
    }

    for (const propertyUsing of ObjPropertyUsingList) {
        let name: string = propertyUsing.substring(assignedName.length + 1)

        if (result.filter((value: Property) => value.name === name).length === 0)
            result.push({
                name: name,
                type: 'obj'
            })
    }

    return result
}

function buildClassMap(dependency: Dependency): string {
    let block: string = `class ${mapNameTemplate}${dependency.assignedName} {\n`

    for (const property of dependency.properties) {
        switch (property.type) {
            case 'fn':
                block = `${block}${property.name} = () => {}\n`
                break
            case 'obj':
                block = `${block}${property.name} = Object\n`
                break
        }
    }

    block = `${block}}\n`

    return block
}

function setUsefulVar(data: string, index: number, propertiesMap: PropertiesMap): string {
    const beforePart: string = data.substring(0, index),
        dataRest: string = data.substring(index, data.length)

    data = beforePart

    for (const entry of propertiesMap) {
        data = data + buildClassMap(entry[1])
    }

    data = data + fnTemplate + dataRest

    return data
}

LogUtil.logger(TypeLogEnum.BUILD).trace('Build started')

readDistFolder()