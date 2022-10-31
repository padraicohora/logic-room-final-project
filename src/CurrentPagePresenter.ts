import 'reflect-metadata'
import {inject, injectable} from 'inversify'
import * as Router from './Routing/Router'
import {RoutingState} from './Routing/RoutingState'
import {computed, makeObservable} from 'mobx'
import {Types} from "./Core/Types";
import {RouteIds} from "./Routing/Routes";

export interface CurrentPagePresenterI {
  currentRouteId: string;
  loading: boolean
  bootstrap: () => void
}

@injectable()
class CurrentPagePresenter implements CurrentPagePresenterI {

  router: Router.RouterI;
  loading: boolean;
  routingState: RoutingState

  constructor(@inject(Router.Router) router: Router.RouterI, @inject(Types.RoutingState) routingState:RoutingState) {
    this.router = router;
    this.routingState = routingState
    makeObservable(this, {
      currentRouteId: computed
    })
  }

  get currentRouteId() {
    return this.routingState.currentState.routeId
  }

  bootstrap = async () => {
    this.router.registerRoutes()
    this.router.goToId(RouteIds.Login)
    this.loading = false
  }
}
export {CurrentPagePresenter}
