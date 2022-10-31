import * as React from 'react'
import { observer } from 'mobx-react'
import {useInjection, withInjection} from '../Core/WithPresenter'
import {CurrentPagePresenterI} from "../CurrentPagePresenter";
import {Types} from "../Core/Types";

export const MapComponent = observer((props) => {
    // const viewModel = useInjection<CurrentPagePresenterI>(Types.ICurrentPagePresenter)
  return (
    <>
      <h3>Map</h3>
    </>
  )
})

