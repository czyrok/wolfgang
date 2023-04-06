export interface ConfigBuildInterface {
    distFolderPath: string
    fileFormat: BufferEncoding
    conditionTemplate: string
    criticalDependencies: Array<string>
}