import { CardPlayerGameModel } from '../../../card/model/card.player.game.model'

export interface StrategyCampPlayerGameInteface {
    setCampToCard(listCard: Array<CardPlayerGameModel>): void
}