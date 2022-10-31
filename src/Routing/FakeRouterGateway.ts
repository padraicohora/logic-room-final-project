import { injectable } from 'inversify'
import { RouteHooks } from 'navigo'
export interface FakeRouterGatewayI  {
  registerRoutes:(routeConfig:RouteHooks|Function)=>Promise<unknown>;
  unload: ()=>void;
  goToPath: (pathname:string)=>void
}
@injectable()
class FakeRouterGateway implements FakeRouterGatewayI{
  registerRoutes = async (routeConfig:RouteHooks|Function) => {}

  unload = () => {}

  goToPath = async (pathname:string) => {}
}
export {FakeRouterGateway}
