import { join } from 'path'

import { ConfigBuildInterface } from './interface/config.build.interface'

export const BuildConfig: ConfigBuildInterface = {
    distFolderPath: join(process.cwd(), 'dist'),
    fileFormat: 'utf-8',
    conditionTemplate: 'typeof process === "undefined" || typeof window === "object"',
    criticalDependencies: [
        'jsonwebtoken',
        'crypto',
        'dotenv',
        'log4js',
        'passport',
        'passport-jwt',
        'passport-local',
        'ts-socket.io-controller',
        '@typegoose/typegoose',
        'express'
    ]
}