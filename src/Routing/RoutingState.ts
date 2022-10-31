import { injectable } from 'inversify'
import { makeObservable, observable } from 'mobx'
import {RouteI, RouteIds} from "./Routes";
export interface RoutingStateI {
  currentState:RouteI
}

@injectable()
class RoutingState implements RoutingStateI {
  currentState: RouteI;

  constructor() {
    this.currentState = { routeId: RouteIds.Login, params: null, query: null }
    makeObservable(this, { currentState: observable })
  }
}

export {RoutingState}
