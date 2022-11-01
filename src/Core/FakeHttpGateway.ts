import { injectable, inject } from 'inversify'
export interface FakeHttpGatewayI {
  get: (path: string) => void
  post: (path: string, requestDto: object) => void
}
@injectable()
class FakeHttpGateway implements FakeHttpGatewayI{
  get:FakeHttpGatewayI["get"] = async (path) => {}

  post:FakeHttpGatewayI["post"] = async (path, requestDto) => {
  }
  delete = async (path) => {}
}

export {FakeHttpGateway}
