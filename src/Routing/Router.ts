import { inject, injectable } from 'inversify'
import * as RouteRegistrar from './RouteRegistrar'
import * as RouteUpdater from './RouteUpdater'
import * as Routes from './Routes'
import * as RoutingState from './RoutingState'
import {Types} from '../Core/Types'
import {makeObservable, computed} from 'mobx'
import * as RouterGateway from "./RouterGateway";

export interface RouterI {
    goToId: (routeId: Routes.RouteIds, params?: Routes.Params, query?: Routes.Query) => void;
    registerRoutes: () => void;
    currentRouteId: Routes.RouteIds;
}

@injectable()
class Router implements RouterI {
    routeRegistrar: RouteRegistrar.RouteRegistrarI
    routeUpdater: RouteUpdater.RouteUpdaterI
    routes: Routes.RoutesI
    routerGateway: RouterGateway.RouterGatewayI
    routingState: RoutingState.RoutingStateI

    constructor(@inject(Types.RouteRegistrar) routeRegistrar: RouteRegistrar.RouteRegistrarI,
                @inject(Types.RouteUpdater) routeUpdater: RouteUpdater.RouteUpdaterI,
                @inject(Types.Routes) routes: Routes.RoutesI,
                @inject(Types.IRouterGateway) routerGateway: RouterGateway.RouterGatewayI,
                @inject(Types.RoutingState) routingState: RoutingState.RoutingStateI) {
        this.routeRegistrar = routeRegistrar
        this.routeUpdater = routeUpdater
        this.routes = routes
        this.routerGateway = routerGateway
        this.routingState = routingState

        makeObservable(this, {
            currentRouteId: computed
        })
    }

    get currentRouteId() {
        return this.routingState.currentState.routeId
    }

    registerRoutes = () => {
        let routeConfig = this.routeRegistrar.extractRoutes(this.routes.routes)
        this.routerGateway.registerRoutes(routeConfig)
    }

    goToId = async (routeId: Routes.RouteIds, params?: Routes.Params, query?: Routes.Query) => {
        let {routeDef:{path=""}={}} = this.routeUpdater && this.routeUpdater.findRoute(routeId)

        if (query) {
          path = path + '?' + query
        }

        this.routerGateway.goToPath(path)
  }
}
export {Router}
