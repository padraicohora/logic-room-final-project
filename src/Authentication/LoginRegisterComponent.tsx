import * as React from 'react'
import { observer } from 'mobx-react'
import {useInjection} from '../Core/WithPresenter'
import { AuthenticationRepositoryI} from './AuthenticationRepository'
import {Types} from "../Core/Types";
import {LoginRegisterPresenterI} from "./LoginRegisterPresenter";

export const LoginRegisterComponent = observer(() => {
    const AuthenticationRepository = useInjection<AuthenticationRepositoryI>(Types.AuthenticationRepository)
    const ViewModel = useInjection<LoginRegisterPresenterI>(Types.LoginRegisterPresenter)
  return (
    <div
      onClick={() => {
          ViewModel.login()
      }}
      className="navigation-item"
      style={{ backgroundColor: '#5BCA06' }}
    >
      Login
    </div>
  )
})
