import { join } from 'path'

import { ConfigBuildInterface } from './interface/config.build.interface'

export const BuildConfig: ConfigBuildInterface = {
    distFolderPath: join(process.cwd(), 'dist'),
    fileFormat: 'utf8',
    conditionTemplate: '(typeof process === "undefined" || typeof window === "object") ? {} : ',
    criticalDependencies: [
        'jsonwebtoken'
    ]
}