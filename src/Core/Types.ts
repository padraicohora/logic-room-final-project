import {CurrentPagePresenter} from "../CurrentPagePresenter";
import {RoutingState} from "../Routing/RoutingState";
import {RouteUpdater} from "../Routing/RouteUpdater";
import {RouteRegistrar} from "../Routing/RouteRegistrar";
import {Config} from "./Config";
import {Router} from "../Routing/Router";
import {NavigationTree} from "../Navigation/NavigationTree";
import {NavigationPresenter} from "../Navigation/NavigationPresenter";
import {FakeHttpGateway} from "./FakeHttpGateway";
import {LoginRegisterPresenter} from "../Authentication/LoginRegisterPresenter";

export const Types = {
  ICurrentPagePresenter: Symbol.for('ICurrentPagePresenter'),
  IDataGateway: Symbol.for('IDataGateway'),
  IRouterGateway: Symbol.for('IRouterGateway'),
  Routes: Symbol.for('Routes'),
  RoutingState: Symbol.for('RoutingState'),
  RouteUpdater: Symbol.for('RouteUpdater'),
  RouteRegistrar: Symbol.for('RouteRegistrar'),
  Config: Symbol.for('Config'),
  Router: Symbol.for('Router'),
  FakeRouterGateway: Symbol.for('FakeRouterGateway'),
  NavigationTree: Symbol.for('NavigationTree'),
  NavigationPresenter: Symbol.for('NavigationPresenter'),
  FakeHttpGateway: Symbol.for('FakeHttpGateway'),
  AuthenticationRepository: Symbol.for('AuthenticationRepository'),
  LoginRegisterPresenter: Symbol.for('LoginRegisterPresenter'),
}
