import { inject, injectable } from 'inversify'
import { action, makeObservable } from 'mobx'
import * as RoutingState from './RoutingState'
import * as Routes from './Routes'
import {Types} from "../Core/Types";

export type UpdateCurrentRoute = (routeId: Routes.RouteIds, params: Routes.Params, query: Routes.Query, arg?: string) => void

export interface RouteUpdaterI {
  updateCurrentRoute: UpdateCurrentRoute,
  findRoute: (routeId: Routes.RouteIds) => Routes.RouteI,
  updateRouteDetails: (routeId: Routes.RouteIds, params: string, query: string) => void
}

@injectable()
class RouteUpdater implements RouteUpdaterI {
  routingState: RoutingState.RoutingStateI
  routes: Routes.RoutesI;

  constructor(
      @inject(Types.Routes) routes: Routes.RoutesI,
      @inject(Types.RoutingState) routingState: RoutingState.RoutingStateI
  ) {
    this.routingState = routingState
    this.routes = routes
    makeObservable(this, {
      updateCurrentRoute: action,
      updateRouteDetails: action
    })
  }


  // AUTHENTICATION CODE
  // public canView = (routeId: string): boolean => {
  //   const targetRoute = this.routes.find(route => route.routeId === routeId)
  //   if (!targetRoute) return false
  //   if (!targetRoute.routeDef.permissionId) return true
  //   return this.authenticationRepository.canView(targetRoute.routeDef.permissionId)
  // }

  updateCurrentRoute = async (routeId: Routes.RouteIds, params: Routes.Params, query: Routes.Query) => {
    // AUTHENTICATION CODE
    // if (!this.canView(routeId)) {
    //   this.logoutUser()
    //   return
    // }

    const oldRouteId = this.routingState.currentState.routeId
    const routeChanged = oldRouteId !== routeId
    const targetRoute = this.findRoute(routeId)
    const targetRouteId = targetRoute.routeId

    console.log('old route is ', oldRouteId)
    console.log('new route is ', targetRouteId)

    if (routeChanged && oldRouteId && targetRoute.onLeave)
      targetRoute.onLeave()
    if (routeChanged && targetRoute.onEnter)
      targetRoute.onEnter()
    this.updateRouteDetails(targetRouteId, params, query)
  }

  findRoute(routeId: Routes.RouteIds): Routes.RouteI {
    const route: Routes.RouteI | undefined | null = this.routes.routes && this.routes.routes.find((route) => {
      return route.routeId === routeId
    })
    if (!route) {
      return {routeId: Routes.RouteIds.Loading, routeDef: {path: ''}}
    }
    return route
  }

  updateRouteDetails = (routeId: Routes.RouteIds, params: Routes.Params, query: Routes.Query) => {
    console.log('updating route')
    this.routingState.currentState.routeId = routeId
    this.routingState.currentState.params = params
    this.routingState.currentState.query = query
  }
}
export {RouteUpdater}
