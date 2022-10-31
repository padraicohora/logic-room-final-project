import { inject, injectable } from 'inversify'
import { computed, makeObservable } from 'mobx'
import * as NavigationTree from './NavigationTree'
import * as Router from '../Routing/Router'
import {Types} from "../Core/Types";
import {RouteIds} from "../Routing/Routes";
import TreeModel, {Node} from "tree-model";
import {TreeModelNode} from "./NavigationTree";

export interface NavigationPresenterI {
  currentSelectedNavigationNode: string | null;
  currentBackTarget: undefined | {
    enabled: boolean,
    target: null|RouteIds
  }
  isTop:boolean;
  viewModel: () => TreeModel.Node<TreeModelNode>;
  backToTop: ()=>void;
  goToId: (id:RouteIds)=>void;
  findCurrentNode: ()=>TreeModel.Node<TreeModelNode>;
}

@injectable()
class NavigationPresenter implements NavigationPresenterI{

  navigationTree: NavigationTree.NavigationTreeI
  router: Router.RouterI

  constructor(
      @inject(Types.NavigationTree) navigationTree: NavigationTree.NavigationTreeI,
      @inject(Types.Router) router: Router.RouterI
  ) {
    this.navigationTree = navigationTree;
    this.router = router;
    makeObservable(this, {
      currentSelectedNavigationNode: computed,
      currentBackTarget: computed,
      isTop: computed
    })
  }

  get currentSelectedNavigationNode() {
    if (!this.findCurrentNode()) return
    return this.findCurrentNode().model.id
  }

  get currentBackTarget() {
    if (!this.findCurrentNode()) return
    if (this.findCurrentNode().parent) {
      return { enabled: true, target: this.findCurrentNode().parent.model.id }
    } else return { enabled: false, target: null }
  }

  get isTop() {
    return !this.findCurrentNode().parent
  }

  viewModel = () => {
    return this.navigationTree.getTree()
  }

  backToTop = () => {
    let parent = this.findCurrentNode()
    do {
      parent = parent.parent
    } while (parent.model.type !== 'root')

    this.router.goToId(parent.model.id)
  }

  findCurrentNode = () => {
    var self = this
    return this.navigationTree.getTree().all(function (node) {
      return node.model.id === self.router.currentRouteId
    })[0]
  }

  goToId:NavigationPresenterI["goToId"] = (id) => {
    this.router.goToId(id)
  }

}
export {NavigationPresenter}
