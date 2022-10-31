import 'reflect-metadata'
import './styles.css'
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './Core/WithPresenter'
import { CurrentPageComponent } from './CurrentPageComponent'
import { container } from './inversify.config'
import { configure } from 'mobx'
import NavigationComponent from "./Navigation/NavigationComponent";

configure({
  enforceActions: 'never',
  computedRequiresReaction: false,
  reactionRequiresObservable: false,
  observableRequiresReaction: false,
  disableErrorBoundaries: false
})

const rootElement = document.getElementById('root')
ReactDOM.render(
    <Provider container={container}>

        <CurrentPageComponent/>
    </Provider>,
    rootElement)
