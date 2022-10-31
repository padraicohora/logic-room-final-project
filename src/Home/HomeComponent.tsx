import * as React from 'react'
import { observer } from 'mobx-react'
import {useInjection, withInjection} from '../Core/WithPresenter'
import {CurrentPagePresenterI} from "../CurrentPagePresenter";
import {Types} from "../Core/Types";

export const HomeComponent = observer((props) => {
    // const viewModel = useInjection<CurrentPagePresenterI>(Types.ICurrentPagePresenter)
  return (
    <>
      <h3>Home</h3>
    </>
  )
})

