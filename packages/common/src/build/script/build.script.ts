import { readdir, readFile, writeFile } from 'fs'
import { join, extname } from 'path'

import { BuildConfig } from '../config/build.config'

import { LogUtil } from '../../pack/log/util/log.util'

import { LogHelper } from '../../pack/log/helper/log.helper'

import { TypeLogEnum } from '../../pack/log/type/enum/type.log.enum'

LogUtil.config = LogHelper.getConfig(TypeLogEnum.BUILD)

const fnNameTemplate: string = 'require2',
    fnTemplate: string = `function ${fnNameTemplate}(name) { return require(name) }\n`

LogUtil.logger(TypeLogEnum.BUILD).trace('Build started')

function readDistFile(file: string, path: string): void {
    readFile(path, BuildConfig.fileFormat, (error: any, data: string) => {
        if (error) throw error

        let newData: string = ''

        for (let dependency of BuildConfig.criticalDependencies) {
            newData = newData + processReplacement(data, dependency)
        }

        if (newData !== data) {
            writeFile(path, newData, (error: any) => {
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
    first: boolean,
    data: string,
    newData: string,
    beforeIndex: number,
    requireIndex: number,
    replacement: string,
    replacementLength: number
): [string, string] {
    const beforePart: string = data.substring(0, beforeIndex),
        lineStart: string = data.substring(beforeIndex, requireIndex),
        requirePart: string = `${fnNameTemplate}("${replacement}")`,
        dataRest: string = data.substring(requireIndex + replacementLength, data.length)

    if (first) {
        newData = newData + beforePart + fnTemplate + lineStart

        first = false
    } else {
        newData = newData + beforePart + lineStart
    }

    newData = newData + BuildConfig.conditionTemplate + requirePart
    data = dataRest

    return [data, newData]
}

function processReplacement(data: string, replacement: string): string {
    let newData: string = '',
        first: boolean = true

    const replacementLength: number = `require("${replacement}")`.length,
        regex: string = `require\\("${regexEscape(replacement)}"\\)`,
        beforeRegex: RegExp = new RegExp(`^.{1,}${regex}`, 'gm'),
        requireRegex: RegExp = new RegExp(regex, 'gm')

    let beforeIndex: number = data.search(beforeRegex),
        requireIndex: number = data.search(requireRegex)

    while (requireIndex >= 0) {
        [data, newData] = substringData(first, data, newData, beforeIndex, requireIndex, replacement, replacementLength)

        beforeIndex = data.search(beforeRegex)
        requireIndex = data.search(requireRegex)

        first = false
    }

    return newData === '' ? data : newData + data
}

readDistFolder()