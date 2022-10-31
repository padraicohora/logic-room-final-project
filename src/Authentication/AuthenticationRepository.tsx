import {inject, injectable} from 'inversify'
import {Types} from '../Core/Types'
import * as Router from '../Routing/Router'
import * as HttpGateway from "../Core/HttpGateway";
import {RouteIds} from "../Routing/Routes";

export interface AuthenticationRepositoryI {
}

@injectable()
class AuthenticationRepository {
  router: Router.RouterI;
  dataGateway: HttpGateway.HttpGatewayI

  constructor(
      @inject(Types.Router) router: Router.RouterI,
      @inject(Types.IDataGateway) dataGateway: HttpGateway.HttpGatewayI
  ) {
    this.router = router;
    this.dataGateway = dataGateway;
  }


}
export {AuthenticationRepository}
