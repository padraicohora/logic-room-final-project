import * as React from 'react'
import { observer } from 'mobx-react'
import {useInjection} from '../Core/WithPresenter'
import { AuthenticationRepositoryI} from './AuthenticationRepository'
import {Types} from "../Core/Types";
import {LoginRegisterPresenterI} from "./LoginRegisterPresenter";
import {MessagesComponent} from "../Core/Messages/MessagesComponent";

export const LoginRegisterComponent = observer(() => {
    const AuthenticationRepository = useInjection<AuthenticationRepositoryI>(Types.AuthenticationRepository)
    const ViewModel = useInjection<LoginRegisterPresenterI>(Types.LoginRegisterPresenter)
  return (

      <div className="login-register">
          <div className="w3-row">
              <div className="w3-col s4 w3-center">
                  <br />
              </div>
              <div className="w3-col s4 w3-center logo">
                  <img
                      alt="logo"
                      style={{ width: 160, filter: 'grayscale(100%)' }}
                      src="https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production/themes/2147767979/settings_images/iE7LayVvSHeoYcZWO4Dq_web-logo-pink-light-bg3x.png"
                  />
              </div>
              <div className="w3-col s4 w3-center">
                  <br />
              </div>
          </div>
          <div className="w3-row">
              <div className="w3-col s4 w3-center">
                  <br />
              </div>
              <div className="w3-col s4 w3-center option">
                  <input
                      className="lr-submit"
                      style={{ backgroundColor: '#e4257d' }}
                      type="submit"
                      value="login"
                      onClick={() => {
                           ViewModel..option = 'login'
                      }}
                  />
                  <input
                      className="lr-submit"
                      style={{ backgroundColor: '#2E91FC' }}
                      type="submit"
                      value="register"
                      onClick={() => {
                           ViewModel..option = 'register'
                      }}
                  />
              </div>
              <div className="w3-col s4 w3-center">
                  <br />
              </div>
          </div>
          <div
              className="w3-row"
              style={{
                  backgroundColor:  ViewModel..option === 'login' ? '#E4257D' : '#2E91FC',
                  height: 100,
                  paddingTop: 20
              }}
          >
              <form
                  className="login"
                  onSubmit={(event) => {
                      event.preventDefault()
                      if (formValid()) {
                          if ( ViewModel..option === 'login')  ViewModel..login()
                          if ( ViewModel..option === 'register')  ViewModel..register()
                      }
                  }}
              >
                  <div className="w3-col s4 w3-center">
                      <input
                          type="text"
                          value={ ViewModel..email}
                          placeholder="Email"
                          onChange={(event) => {
                               ViewModel..email = event.target.value
                          }}
                      />
                  </div>
                  <div className="w3-col s4 w3-center">
                      {' '}
                      <input
                          type="text"
                          value={ ViewModel..password}
                          placeholder="Password"
                          onChange={(event) => {
                               ViewModel..password = event.target.value
                          }}
                      />
                  </div>
                  <div className="w3-col s4 w3-center">
                      <input type="submit" className="lr-submit" value={ ViewModel..option} />
                  </div>

                  <br />
                  <br />
                  <br />
              </form>
          </div>
          <MessagesComponent />
      </div>

  )
})
