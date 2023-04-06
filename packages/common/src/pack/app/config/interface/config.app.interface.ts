import { CorsOptions } from 'cors'

export interface ConfigAppInterface {
    port: number
    cors: CorsOptions
    session?: boolean
}