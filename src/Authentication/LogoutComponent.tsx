import * as React from 'react'
import { observer } from 'mobx-react'
import {useInjection} from '../Core/WithPresenter'
import { AuthenticationRepositoryI} from './AuthenticationRepository'
import {Types} from "../Core/Types";

export const LogoutComponent = observer(() => {
    const AuthenticationRepository = useInjection<AuthenticationRepositoryI>(Types.AuthenticationRepository)
  return (
    <div
      onClick={() => {
          AuthenticationRepository.logout()
      }}
      className="navigation-item"
      style={{ backgroundColor: '#5BCA06' }}
    >
      ← Logout
    </div>
  )
})
