import { injectable, inject } from 'inversify'
import * as Config from './Config'
import {Types} from "./Types";
import {RouteUpdaterI} from "../Routing/RouteUpdater";

export interface HttpGatewayI {
  get: (path: string) => object
  post: (path: string, requestDto: object) => object
}

@injectable()
class HttpGateway implements HttpGatewayI {
  config: Config.ConfigI

  constructor(
      @inject(Types.Config) config: Config.ConfigI,
  ) {
    this.config = config
  }
  get:HttpGatewayI["get"] = async (path:string) => {
    const response = await fetch(this.config.apiUrl + path)
    return response.json()

  }

  post:HttpGatewayI["post"] = async (path:string, requestDto:object) => {
    const response = await fetch(this.config.apiUrl + path, {
      method: 'POST',
      body: JSON.stringify(requestDto),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.json()
  }
}

export {HttpGateway}
