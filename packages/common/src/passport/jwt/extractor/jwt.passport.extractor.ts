export class JWTPassportExtractor {
    public static get(req: any) {
        if (req.session.token) return req.session.token

        return null
    }
}