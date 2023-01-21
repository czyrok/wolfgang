export class NotFoundCardsProposalUserError extends Error {
    public constructor() {
        super('Proposition de carte non trouvée')
    }
}