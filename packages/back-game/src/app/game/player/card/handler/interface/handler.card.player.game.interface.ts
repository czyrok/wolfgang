import { CardPlayerGameModel } from 'common'

export interface HandlerCardPlayerGameInterface {
    hasCard(value: CardPlayerGameModel): boolean
    getCard(): Array<CardPlayerGameModel>
}