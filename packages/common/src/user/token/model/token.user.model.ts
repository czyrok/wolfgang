import { DocumentType, Ref } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { Prop, getModelForClass } from '../../../fix/typegoose.fix'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'
import { SkinUserModel } from '../../skin/model/skin.user.model'

import { TokenUserInterface } from '../interface/token.user.interface'

@Exclude()
export class TokenUserModel extends DocumentModel implements TokenUserInterface {
  @Expose()
  @Prop({ required: true, ref: () => UserModel })
  user: Ref<UserModel>

  @Expose()
  @Prop({ required: true, default: new Date })
  releaseDate: Date = new Date

  @Expose()
  @Prop({ required: true })
  expiresIn!: string

  @Expose()
  @Prop({ required: true })
  ip!: string

  @Expose()
  @Prop({ required: true, default: true })
  active: boolean = true

  public constructor(user: DocumentType<UserModel>, expiresIn: string, ip: string) {
    super()

    this.user = user
    this.expiresIn = expiresIn
    this.ip = ip
  }
}

export const TokenUserModelDocument = getModelForClass(TokenUserModel, { customName: 'collection', automaticName: true })