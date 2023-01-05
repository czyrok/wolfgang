import { CardGameModel } from '../../model/card.game.model'

export interface HandlerCardGameInterface {
    hasCard(value: CardGameModel): boolean
    getCard(): Array<CardGameModel>
}