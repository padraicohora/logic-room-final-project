import 'reflect-metadata'
import { injectable, inject } from 'inversify'
import TreeModel from 'tree-model'
import * as AuthenticationRepository from '../Authentication/AuthenticationRepository'
import {RouteIds} from "../Routing/Routes";

type Node1 = {
  id: RouteIds;
  text: string;
  type: string
  children?: TreeModel.Model<Node1>;
}
// type Node2 = {
//   id: RouteIds;
//   text: string;
//   type: string
//   children?: TreeModel.Model<Node1|Node2>
// }


export type TreeModelNode = Node1
//   id: RouteIds;
//   text: string;
//   type: string
//   children: {
//     id: RouteIds;
//     text: string;
//     type: string
//     children: {
//       id: RouteIds;
//       text: string;
//       type: string
//       children: {
//         id: RouteIds;
//         text: string;
//         type: string
//       }[]
//     }[]
//   }[]
// }
//   children: {
//     id: RouteIds;
//     text: string;
//     type: string
//   }[];
//   id: RouteIds;
//   text: string;
//   type: string
// } | {
//   id: RouteIds;
//   text: string;
//   type: string
// };
export interface NavigationTreeI {
  getTree: () => TreeModel.Node<TreeModelNode>;
  // getTree:()=>TreeModel.Model<TreeModelNode>;
}

@injectable()
class NavigationTree implements NavigationTreeI {

  authenticationRepository: AuthenticationRepository.AuthenticationRepositoryI

  constructor(
      @inject(AuthenticationRepository.AuthenticationRepository) authenticationRepository: AuthenticationRepository.AuthenticationRepositoryI
) {
    this.authenticationRepository = authenticationRepository
}
  getTree() {
    let tree = new TreeModel()
   /* @ts-disable */

    let root: TreeModel.Node<TreeModelNode> = tree.parse({// @ts-ignore
      id: RouteIds.Home,
      type: 'root',
      text: 'Home',
      children: [
        {// @ts-ignore
          id: RouteIds.BooksExpand,
          type: 'expand',
          text: 'Books',// @ts-ignore
          children: [
            {
              id: RouteIds.Books,
              type: 'link',
              text: 'Books',
              children: [
                {
                  id: RouteIds.AddBooks,
                  type: 'link',
                  text: 'Add Book'
                }
              ]
            },
            {
              id: RouteIds.AddBooks,
              type: 'link',
              text: 'Add Book'
            }
          ]
        },
        {// @ts-ignore
          id: RouteIds.AuthorsExpand,
          type: 'expand',
          text: 'Authors',// @ts-ignore
          children: [
            {
              id: RouteIds.Authors,
              type: 'link',
              text: 'Authors',
              children: [
                {
                  id: RouteIds.AddAuthors,
                  type: 'link',
                  text: 'Add Author'
                },
                {
                  id: RouteIds.AuthorPolicy,
                  type: 'link',
                  text: 'Author Policy'
                },
                {
                  id: RouteIds.Map,
                  type: 'link',
                  text: 'View Map'
                }
              ]
            },
            {
              id: RouteIds.AddAuthors,
              type: 'link',
              text: 'Add Author',
              children: [
                {
                  id: RouteIds.Map,
                  type: 'link',
                  text: 'View Map'
                }
              ]
            },
            {
              id: RouteIds.AuthorPolicy,
              type: 'link',
              text: 'Author Policy'
            }
          ]
        }
      ]
    })
   /* @ts-enable */

    return root
  }
}
export {NavigationTree}
