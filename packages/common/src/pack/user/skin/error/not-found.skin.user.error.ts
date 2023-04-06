export class NotFoundSkinUserError extends Error {
    public constructor() {
        super('Skin de l utilisateur non trouvé')
    }
}