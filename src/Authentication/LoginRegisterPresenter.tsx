import {inject, injectable} from 'inversify'
import * as AuthenticationRepository from './AuthenticationRepository'
import * as Router from '../Routing/Router'
import {makeObservable, observable} from 'mobx'
import {Types} from "../Core/Types";
import {RouteIds} from "../Routing/Routes";
import {AuthenticationRepositoryI} from "./AuthenticationRepository";

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
export class LoginRegisterPresenter implements LoginRegisterPresenterI {

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
    })
  }

  logout:LoginRegisterPresenterI["logout"] = async () => {
    this.router.goToId(RouteIds.Login)
  }

  login:LoginRegisterPresenterI["login"] = async () => {
    console.log(this)
    this.router.goToId(RouteIds.Home)
  }

  register:LoginRegisterPresenterI["register"] = async () => {
    console.log(this)
  }
}
