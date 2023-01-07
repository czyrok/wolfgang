export interface ConfigBuildInterface {
    distFolderPath: string
    fileFormat: string
    conditionTemplate: string
    criticalDependencies: Array<string>
}