import {inject, injectable} from 'inversify'
import {Types} from '../Core/Types'
import * as Router from '../Routing/Router'
import * as HttpGateway from "../Core/HttpGateway";
import {RouteIds} from "../Routing/Routes";
import {action, makeObservable} from "mobx";
import { UserModel } from './UserModel'
import { MessagePacking } from '../Core/Messages/MessagePacking'

export interface AuthenticationRepositoryI {
}

@injectable()
class AuthenticationRepository {
  router: Router.RouterI;
  dataGateway: HttpGateway.HttpGatewayI
  //todo user model
  // userModel


  constructor(
      @inject(Types.Router) router: Router.RouterI,
      @inject(Types.IDataGateway) dataGateway: HttpGateway.HttpGatewayI

      // @inject(Types.UserModel) userModel: HttpGateway.HttpGatewayI
  ) {
    this.router = router;
    this.dataGateway = dataGateway;

    makeObservable(this, {
      // @ts-ignore
      login: action
    })
  }

  login = async (email, password) => {
    const loginDto = await this.dataGateway.post('/login', {
      email: email,
      password: password
    })

    if (loginDto.success) {
      this.userModel.email = email
      this.userModel.token = loginDto.result.token
    }

    return MessagePacking.unpackServerDtoToPm(loginDto)
  }

  register = async (email, password) => {
    const registerDto = await this.dataGateway.post('/register', {
      email: email,
      password: password
    })

    return MessagePacking.unpackServerDtoToPm(registerDto)
  }

  logOut = async () => {
    this.userModel.email = ''
    this.userModel.token = ''
  }


}
export {AuthenticationRepository}
