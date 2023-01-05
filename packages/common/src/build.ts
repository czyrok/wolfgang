import { readdir, readFile, writeFile } from 'fs'
import { join, extname } from 'path'

const fnNameTemplate: string = 'require2',
    fnTemplate: string = `function ${fnNameTemplate}(name) { return require(name) }\n`,
    conditionTemplate: string = '(typeof process === "undefined" || typeof window === "object") ? {} : ',
    currentFile: string = __filename,
    distFolderPath: string = join(process.cwd(), 'dist')

function criticalDependenciesReplacement(folderPath: string = distFolderPath): void {
    readdir(folderPath, (error: any, elements: Array<string>) => {
        if (error) throw error

        const files = elements.filter((value) => extname(value) === '.js')

        for (const file of files) {
            const path: string = join(folderPath, file)

            if (path === currentFile) continue

            readFile(path, 'utf8', (error: any, data: string) => {
                if (error) throw error

                const newData: string = processReplacement(data, 'jsonwebtoken')

                if (newData !== data) {
                    writeFile(path, newData, (error: any) => {
                        if (error) throw error

                        console.log(path)
                    })
                }
            })
        }

        const folders = elements.filter((value) => extname(value) === '')

        for (const folder of folders) {
            const path: string = join(folderPath, folder)

            criticalDependenciesReplacement(path)
        }
    })
}

function regexEscape(text: string): string {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
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

        newData = newData + conditionTemplate + requirePart
        data = dataRest

        beforeIndex = data.search(beforeRegex)
        requireIndex = data.search(requireRegex)
    }

    return newData === '' ? data : newData + data
}

criticalDependenciesReplacement()