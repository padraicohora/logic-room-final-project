import { injectable } from 'inversify'
export enum RouteIds {
  Loading="loadingSpinner",
  Home="homeLink",
  Books = "booksLink",
  BooksExpand = "booksExpand",
  AddBooks = "addBooksLink",
  Authors = "authorsLink",
  AuthorsExpand = "authorsExpand",
  AddAuthors = "addAuthorsLink",
  AuthorPolicy = "authorPolicyLink",
  Map = "mapLink",
  Login = "loginLink",
}
export type Params = null | string
export type Query = null | string
export interface RouteI {
  routeId:RouteIds,
  routeDef?:{
    path:string
  },
  params?: Params,
  query?:Query,
  onEnter?: ()=>void,
  onLeave?: ()=>void,
}
export type InitialRoutes = RouteI[] | null
export interface RoutesI {
  routes:InitialRoutes
}
@injectable()
class Routes implements RoutesI{
  routes:InitialRoutes = null;
  constructor() {
    this.routes = [
      {
        routeId: RouteIds.Loading,
        // routeDef: {
        //   path: '/app/books'
        // }
      },
      {
        routeId: RouteIds.Home,
        routeDef: {
          path: '/app/home'
        },
        onEnter: () => {
          console.log('enter home')
        },
        onLeave: () => {
          console.log('leave home')
        }
      },
      {
        routeId: RouteIds.Books,
        routeDef: {
          path: '/app/books'
        }
      },
      {
        routeId: RouteIds.BooksExpand,
        // routeDef: {
        //   path: '/app/books'
        // }
      },
      {
        routeId: RouteIds.AddBooks,
        routeDef: {
          path: '/app/books/add'
        }
      },
      {
        routeId: RouteIds.Authors,
        routeDef: {
          path: '/app/authors'
        }
      },
      {
        routeId: RouteIds.AuthorsExpand,
        // routeDef: {
        //   path: '/app/books'
        // }
      },
      {
        routeId: RouteIds.AddAuthors,
        routeDef: {
          path: '/app/authors/add'
        }
      },
      {
        routeId: RouteIds.AuthorPolicy,
        routeDef: {
          path: '/app/authors/policy'
        }
      },
      {
        routeId: RouteIds.Map,
        routeDef: {
          path: '/app/authors/map'
        }
      },
      {
        routeId: RouteIds.Login,
        routeDef: {
          path: '/app/authentication/login'
        }
      }
    ]
  }

}
export {Routes}
