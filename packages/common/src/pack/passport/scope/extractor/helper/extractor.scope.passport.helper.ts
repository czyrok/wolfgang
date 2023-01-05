import { EnvUtil } from '../../../../env/util/env.util'

import { VarEnvEnum } from '../../../../env/var/enum/var.env.enum'

export class ExtractorScopePassportHelper {
    public static get(req: any): string | null {
        if (req && req.cookies) return req.cookies[EnvUtil.get(VarEnvEnum.JWT_COOKIE_NAME)]

        return null
    }
}