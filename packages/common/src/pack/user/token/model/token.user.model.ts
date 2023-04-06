import { DocumentType, Ref, prop, getModelForClass } from '@typegoose/typegoose'
import { Exclude, Expose } from 'class-transformer'

import { DocumentModel } from '../../../model/document.model'
import { UserModel } from '../../model/user.model'

import { TokenUserInterface } from '../interface/token.user.interface'

@Exclude()
export class TokenUserModel extends DocumentModel implements TokenUserInterface {
  @Expose()
  @prop({ required: true, ref: () => UserModel })
  user: Ref<UserModel>

  @Expose()
  @prop({ required: true, default: new Date })
  releaseDate: Date = new Date

  @Expose()
  @prop({ required: true })
  expiresIn!: string

  @Expose()
  @prop({ required: true })
  ip!: string

  @Expose()
  @prop({ required: true, default: true })
  active: boolean = true

  public constructor(user: DocumentType<UserModel>, expiresIn: string, ip: string) {
    super()

    this.user = user
    this.expiresIn = expiresIn
    this.ip = ip
  }
}

export const TokenUserModelDocument = getModelForClass(TokenUserModel, { schemaOptions: { collection: 'token_user' } })