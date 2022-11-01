import * as React from 'react'
import { observer } from 'mobx-react'
import {useInjection} from '../Core/WithPresenter'
import { LoginRegisterPresenter } from '../Authentication/LoginRegisterPresenter'

import {Types} from "../Core/Types";

export const LogoutComponent = observer(() => {
    const ViewModel = useInjection<LoginRegisterPresenter>(Types.AuthenticationRepository)
  return (
    <div
      onClick={() => {
          ViewModel.logout()
      }}
      className="navigation-item"
      style={{ backgroundColor: '#5BCA06' }}
    >
      ← Logout
    </div>
  )
})
