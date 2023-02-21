import { EventEmitter } from '@angular/core'
import { VoteFormControllerModel } from 'common'

export class EventVoteUserSharedModel {
    private _playerVotingEvent: EventEmitter<VoteFormControllerModel> = new EventEmitter
    private _playerUnvotingEvent: EventEmitter<string> = new EventEmitter

    private _playerVotesResetEvent: EventEmitter<void> = new EventEmitter

    private _avatarSelectEvent: EventEmitter<string> = new EventEmitter
    private _avatarUnselectEvent: EventEmitter<string> = new EventEmitter

    public get playerVotingEvent(): EventEmitter<VoteFormControllerModel> {
        return this._playerVotingEvent
    }

    public get playerUnvotingEvent(): EventEmitter<string> {
        return this._playerUnvotingEvent
    }

    public get playerVotesResetEvent(): EventEmitter<void> {
        return this._playerVotesResetEvent
    }

    public get avatarSelectEvent(): EventEmitter<string> {
        return this._avatarSelectEvent
    }

    public get avatarUnselectEvent(): EventEmitter<string> {
        return this._avatarUnselectEvent
    }
}