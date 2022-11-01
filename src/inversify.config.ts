import { Container } from 'inversify'
import {RouterGateway, RouterGatewayI} from './Routing/RouterGateway'
import {HttpGateway, HttpGatewayI} from './Core/HttpGateway'
import {OLD_Router, RouterI} from './Routing/Router'
import {RoutingState, RoutingStateI} from './Routing/RoutingState'
import { Types } from './Core/Types'
import {CurrentPagePresenter, CurrentPagePresenterI} from "./CurrentPagePresenter";
import {Routes, RoutesI} from "./Routing/Routes";
import {RouteUpdater, RouteUpdaterI} from "./Routing/RouteUpdater";
import {RouteRegistrar, RouteRegistrarI} from "./Routing/RouteRegistrar";
import {Config, ConfigI} from "./Core/Config";
import {FakeRouterGateway, FakeRouterGatewayI} from "./Routing/FakeRouterGateway";
import {NavigationTree, NavigationTreeI} from "./Navigation/NavigationTree";
import {NavigationPresenter, NavigationPresenterI} from "./Navigation/NavigationPresenter";
import {FakeHttpGateway, FakeHttpGatewayI} from "./Core/FakeHttpGateway";
import {AuthenticationRepository, AuthenticationRepositoryI} from "./Authentication/AuthenticationRepository";
import {LoginRegisterPresenter, LoginRegisterPresenterI} from "./Authentication/LoginRegisterPresenter";

export const container = new Container({
  autoBindInjectable: true,
  defaultScope: 'Transient'
})

container.bind<CurrentPagePresenterI>(Types.ICurrentPagePresenter).to(CurrentPagePresenter)
container.bind<HttpGatewayI>(Types.IDataGateway).to(HttpGateway)
container.bind<FakeHttpGatewayI>(Types.FakeHttpGateway).to(FakeHttpGateway)
container.bind<RouterGatewayI>(Types.IRouterGateway).to(RouterGateway).inSingletonScope()
container.bind<RoutesI>(Types.Routes).to(Routes)
container.bind<RoutingStateI>(Types.RoutingState).to(RoutingState).inSingletonScope()
container.bind<RouteUpdaterI>(Types.RouteUpdater).to(RouteUpdater)
container.bind<RouteRegistrarI>(Types.RouteRegistrar).to(RouteRegistrar)
container.bind<ConfigI>(Types.Config).to(Config)
container.bind<RouterI>(Types.Router).to(OLD_Router).inSingletonScope()
container.bind<FakeRouterGatewayI>(Types.FakeRouterGateway).to(FakeRouterGateway).inSingletonScope()
container.bind<NavigationTreeI>(Types.NavigationTree).to(NavigationTree)
container.bind<NavigationPresenterI>(Types.NavigationPresenter).to(NavigationPresenter)
container.bind<AuthenticationRepositoryI>(Types.AuthenticationRepository).to(AuthenticationRepository)
container.bind<LoginRegisterPresenterI>(Types.LoginRegisterPresenter).to(LoginRegisterPresenter)
