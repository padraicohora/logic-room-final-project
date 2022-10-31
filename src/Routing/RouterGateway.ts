import { inject, injectable } from 'inversify'
import Navigo, { RouteHooks } from 'navigo'
import {InitialRoutes} from "./Routes";
export interface RouterGatewayI {
  // routeUpdater:RouteUpdaterI
  navigo:Navigo;
  registerRoutes:(routeConfig:RouteHooks|Function)=>Promise<unknown>;
  unload: ()=>void;
  goToPath: (pathname:string)=>void
}


@injectable()
class RouterGateway implements RouterGatewayI{
  navigo:Navigo

  registerRoutes = async (routeConfig:RouteHooks|Function) => {
    if (this.navigo) return new Promise((resolve) => setTimeout(resolve, 0))
    let root = null
    let useHash = false
    let hash = '#'
    // @ts-ignore
    this.navigo = new Navigo(root, useHash, hash)
    this.navigo
      .on(routeConfig)
      .notFound(() => {})
      .resolve()
    return new Promise((resolve) => setTimeout(resolve, 0))
  }

  unload = () => {
    this.navigo.destroy()
  }

  goToPath = async (pathname:string) => {
    this.navigo.navigate(pathname)
  }
}
export {RouterGateway}
