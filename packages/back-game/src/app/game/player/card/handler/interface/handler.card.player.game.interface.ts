import { CardPlayerGameModel } from '../../model/card.player.game.model'

export interface HandlerCardPlayerGameInterface {
    hasCard(value: CardPlayerGameModel): boolean
}