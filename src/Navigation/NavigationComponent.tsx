import { useInjection } from '../Core/WithPresenter'
import { Types } from '../Core/Types'
import { NavigationPresenterI } from './NavigationPresenter'
import { LoginRegisterPresenterI } from '../Authentication/LoginRegisterPresenter'
import { TreeModelNode } from './NavigationTree'
import { useState } from 'react'
import NavigationListComponent from './NavigationListComponent'

const NavigationComponent = () => {
  const viewModel = useInjection<NavigationPresenterI>(Types.NavigationPresenter)
  const loginViewModel = useInjection<LoginRegisterPresenterI>(Types.LoginRegisterPresenter)
  const currentNode = viewModel.findCurrentNode()
  const header = currentNode && (
    <div
      style={{
        backgroundColor: 'lightgreen',
      }}
    >
      <span>{currentNode.model.text}</span>
    </div>
  )

  const topLink = currentNode && !viewModel.isTop && (
    <div>
      <button onClick={viewModel.backToTop}>{'< '}Back</button>
    </div>
  )

  const links =
    currentNode &&
    currentNode.model.children &&
    currentNode.model.children.map((node: TreeModelNode) => {
      return (
        <div>
          <NavigationListComponent node={node} />
        </div>
      )
    })
  const logoutLink = (
    <div>
      <button
        style={{
          backgroundColor: 'lightgreen',
        }}
        onClick={loginViewModel.logout}
      >
        Logout
      </button>
    </div>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {header}
      {links}
      {topLink}
      {logoutLink}
    </div>
  )
}

export default NavigationComponent
