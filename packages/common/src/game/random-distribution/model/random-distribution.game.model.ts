import { CountRandomDistributionGameError } from '../error/count.random-distribution.game.error'

import { LogUtil } from '../../../log/util/log.util'
import { FactoryCardGameUtil } from '../../card/factory/util/factory.card.game.util'

import { RandomHelper } from '../../../random/helper/random.helper'

import { PlayerGameModel } from '../../player/model/player.game.model'
import { CardChoosingRulesModel } from '../../rules/card/choosing/model/card-choosing.rules.model'
import { CardGameModel } from '../../card/model/card.game.model'

import { TypeLogEnum } from '../../../log/type/enum/type.log.enum'
import { TypeCardGameEnum } from '../../card/type/enum/type.card.game.enum'

export class RandomDistributionGameModel {
    public async processing(choices: Array<CardChoosingRulesModel>, players: Array<PlayerGameModel>): Promise<void> {
        this.verifyCount(choices, players).catch((error: CountRandomDistributionGameError) => {
            throw error
        })

        let cardTypes: Array<TypeCardGameEnum> = this.getCardTypesAvailable(choices)
        RandomHelper.shuffle<TypeCardGameEnum>(cardTypes)

        for (let player of players) {
            let cardtype: TypeCardGameEnum | undefined = cardTypes.pop()

            if (cardtype === undefined) throw new CountRandomDistributionGameError

            let card: CardGameModel = FactoryCardGameUtil.get(cardtype)

            card.addPlayer(player)
            player.card = card
        }

        LogUtil.logger(TypeLogEnum.GAME).trace('Card player defined')
    }

    private async verifyCount(choices: Array<CardChoosingRulesModel>, players: Array<PlayerGameModel>): Promise<void> {
        let count = 0

        for (let choice of choices) count += choice.count

        if (count != players.length) throw new CountRandomDistributionGameError
    }

    private getCardTypesAvailable(choices: Array<CardChoosingRulesModel>): Array<TypeCardGameEnum> {
        let cardTypes: Array<TypeCardGameEnum> = new Array

        for (let choice of choices) {
            for (let i = 0; i < choice.count; i++) {
                cardTypes.push(choice.card.type)
            }
        }

        return cardTypes
    }
}