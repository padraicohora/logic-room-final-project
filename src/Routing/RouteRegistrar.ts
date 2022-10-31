import { inject, injectable } from 'inversify'
import {RouteUpdater, RouteUpdaterI, UpdateCurrentRoute} from './RouteUpdater'
import {Types} from "../Core/Types";
import {InitialRoutes, RoutesI} from "./Routes";
import {RoutingStateI} from "./RoutingState";

export interface RouteRegistrarI {
  // routeUpdater:RouteUpdaterI
  extractRoutes: (routes:InitialRoutes) => object
}

@injectable()
class RouteRegistrar implements RouteRegistrarI{
  routeUpdater:RouteUpdaterI
  constructor(
      @inject(Types.RouteUpdater) routeUpdater:RouteUpdaterI,
  ) {
    this.routeUpdater = routeUpdater
  }

  extractRoutes = (routes:InitialRoutes) => {
    const routeConfig:{[key:string]:UpdateCurrentRoute} = {}
    routes && routes.forEach((route) => {
      const def = this.routeUpdater.findRoute(route.routeId)
      const {routeDef:{path = ""} = {}}  = def
      routeConfig[path] = async (params, query) => {
        this.routeUpdater.updateCurrentRoute(def.routeId, params, query, 'external')
      }
    })
    return routeConfig
  }
}
export {RouteRegistrar}
