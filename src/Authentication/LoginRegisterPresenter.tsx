import {inject, injectable} from 'inversify'
import * as AuthenticationRepository from './AuthenticationRepository'
import * as Router from '../Routing/Router'
import {action, makeObservable, observable} from 'mobx'
import {Types} from "../Core/Types";
import {RouteIds} from "../Routing/Routes";
import {AuthenticationRepositoryI} from "./AuthenticationRepository";
import {MessagesPresenter} from "../Core/Messages/MessagesPresenter";

export interface LoginRegisterPresenterI {
  email: string;
  password: string;
  option: string;
  showValidationMessage: boolean;
  validationMessage: string;
  login: () => void;
  register: () => void;
  logout: () => void;
}

@injectable()
export class LoginRegisterPresenter implements LoginRegisterPresenterI extends MessagesPresenter  {

  authenticationRepository: AuthenticationRepository.AuthenticationRepositoryI;
  router: Router.RouterI;

  email = ''
  password = ''
  option = 'login'
  showValidationMessage = false
  validationMessage = ''

  constructor(
      @inject(Types.AuthenticationRepository)
          authenticationRepository: AuthenticationRepository.AuthenticationRepositoryI,
      @inject(Types.Router) router: Router.RouterI
      ) {
    this.authenticationRepository = authenticationRepository;
    this.router = router;
    makeObservable(this, {
      email: observable,
      password: observable,
      option: observable,
      showValidationMessage: observable,
      validationMessage: observable
      reset: action,
      login: action,
      register: action,
      logOut: action
    })
    //todo MessagesPresenter
    this.init()
  }

  reset = () => {
    this.email = ''
    this.password = ''
    this.option = 'login'
  }

  login:LoginRegisterPresenterI["login"] = async () => {
    let loginPm = await this.authenticationRepository.login(this.email, this.password)
//todo MessagesPresenter
    this.unpackRepositoryPmToVm(loginPm, 'User logged in')

    if (loginPm.success) {
      this.router.goToId(RouteIds.Home)
    }

  }

  register:LoginRegisterPresenterI["register"] = async () => {
    let registerPm = await this.authenticationRepository.register(this.email, this.password)
    //todo MessagesPresenter
    // this.unpackRepositoryPmToVm(registerPm, 'User registered')
  }

  logout:LoginRegisterPresenterI["logout"] = async () => {
    this.authenticationRepository.logOut()
    this.router.goToId(RouteIds.Login)
  }
}
