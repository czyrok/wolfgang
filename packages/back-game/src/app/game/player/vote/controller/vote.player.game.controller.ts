import { OnConnect, OnMessage, EmitOnSuccess, MessageBody, EmitNamespaceBroadcastOnSuccess, SocketController } from 'ts-socket.io-controller'
import { VotePlayerGameModel } from 'common'

import { HandlerVotePlayerGameModel } from '../handler/model/handler.vote.player.game.model'

@SocketController({
    namespace: '/game/player/vote',
    init: () => { }
})
export class VotePlayerGameController {
    @OnConnect()
    @EmitOnSuccess('get')
    get() {
        let handler: HandlerVotePlayerGameModel =  HandlerVotePlayerGameModel.instance
        
        return handler.vote
    }

    @EmitNamespaceBroadcastOnSuccess('get')
    @OnMessage()
    vote(@MessageBody() vote: VotePlayerGameModel) {
        let handlervote: HandlerVotePlayerGameModel =  HandlerVotePlayerGameModel.instance
        handlervote.toVote(vote)

        return [vote]
    }
}