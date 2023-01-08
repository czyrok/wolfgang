export class CountRandomDistributionGameError extends Error {
    public constructor() {
        super('Il n\'y a pas assez ou trop de cartes pour le nombre de joueurs')
    }
}