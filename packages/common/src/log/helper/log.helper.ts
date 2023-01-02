import { Appender, Configuration, Layout } from 'log4js'

export class LogHelper {
    public static getAppenderConfig(name?: string, error: boolean = false): Appender {
        return {
            type: 'dateFile',
            filename: `trace/${name === undefined ? 'all.log' : `${name}.log`}`,
            maxLogSize: '1M',
            fileNameSep: '.',
            encoding: 'utf-8',
            compress: true,
            keepFileExt: true,
            numBackups: 5,
            pattern: 'yyyy-MM-dd',
            alwaysIncludePattern: true,
            layout: this.getLayoutConfig(name === undefined, error)
        }
    }

    public static getLayoutConfig(detailed: boolean = false, error: boolean = false, color: boolean = false): Layout {
        return {
            type: 'pattern',
            pattern: error ? `${color ? '%[' : ''}[%d] [%p]${detailed || error ? ' [%c] [%f{1}:%l]' : ''} %m%n%f%n%s${color ? '%]' : ''}`
                : `${color ? '%[' : ''}[%d] [%p]${detailed || error ? ' [%c] [%f{1}:%l]' : ''} %m${color ? '%]' : ''}`
        }
    }

    public static getCategoryConfig(category: string): Configuration['categories'][0] {
        return {
            appenders: ['outConsole', 'allFile', `${category}File`, 'error'],
            level: 'TRACE',
            enableCallStack: true
        }
    }

    public static getConfig(...categories: Array<string>): Configuration {
        let config: Configuration = {
            appenders: {
                outConsole: {
                    type: 'stdout',
                    layout: LogHelper.getLayoutConfig(true, false, true)
                },
                allFile: LogHelper.getAppenderConfig(),
                errorFile: LogHelper.getAppenderConfig('error', true),
                error: {
                    type: 'logLevelFilter',
                    level: 'ERROR',
                    appender: 'errorFile'
                }
            },
            categories: {
                default: {
                    appenders: ['outConsole', 'allFile', 'error'],
                    level: 'DEBUG',
                    enableCallStack: true
                }
            }
        }

        for (let category of categories) {
            config.appenders[`${category}File`] = LogHelper.getAppenderConfig(category)
            config.categories[category] = LogHelper.getCategoryConfig(category)
        }

        return config
    }
}