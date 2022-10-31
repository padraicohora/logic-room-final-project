import * as React from 'react'
import { HomeComponent } from './Home/HomeComponent'
import { useInjection, withInjection } from './Core/WithPresenter'
import { observer } from 'mobx-react'
import { BooksComponent } from './Books/BooksComponent'
import { Types } from './Core/Types'
import { CurrentPagePresenter, CurrentPagePresenterI } from './CurrentPagePresenter'
import { RouteIds } from './Routing/Routes'
import { ReactNode } from 'react'
import { AddBooksComponent } from './Books/AddBooksComponent'
import { AddAuthorsComponent } from './Authors/AddAuthorsComponent'
import { AuthorsComponent } from './Authors/AuthorsComponent'
import { AuthorsPolicyComponent } from './Authors/AuthorsPolicyComponent'
import { LoginRegisterComponent } from './Authentication/LoginRegisterComponent'
import { MapComponent } from './Map/MapComponent'
import NavigationComponent from './Navigation/NavigationComponent'

export const CurrentPageComp = observer(() => {
  const viewModel = useInjection<CurrentPagePresenterI>(Types.ICurrentPagePresenter)
  React.useEffect(() => {
    viewModel.bootstrap()
  }, [])

  const renderedComponents: { id: RouteIds; component?: ReactNode; private: boolean }[] = [
    {
      id: RouteIds.Home,
      component: <HomeComponent key={RouteIds.Home} />,
      private: true,
    },
    {
      id: RouteIds.Books,
      component: <BooksComponent key={RouteIds.Books} />,
      private: true,
    },
    {
      id: RouteIds.BooksExpand,
      component: <BooksComponent key={RouteIds.BooksExpand} />,
      // component: <BooksComponent key="booksLink" />
      private: true,
    },
    {
      id: RouteIds.AddBooks,
      component: <AddBooksComponent key={RouteIds.AddBooks} />,
      private: true,
    },
    {
      id: RouteIds.Authors,
      component: <AuthorsComponent key={RouteIds.Authors} />,
      private: true,
    },
    {
      id: RouteIds.AuthorsExpand,
      component: <AuthorsComponent key={RouteIds.AuthorsExpand} />,
      // component: <BooksComponent key="booksLink" />
      private: true,
    },
    {
      id: RouteIds.AddAuthors,
      component: <AddAuthorsComponent key={RouteIds.AddAuthors} />,
      private: true,
    },
    {
      id: RouteIds.AuthorPolicy,
      component: <AuthorsPolicyComponent key={RouteIds.AuthorPolicy} />,
      private: true,
    },
    {
      id: RouteIds.Map,
      component: <MapComponent key={RouteIds.Map} />,
      private: true,
    },
    {
      id: RouteIds.Login,
      component: <LoginRegisterComponent key={RouteIds.Login} />,
      private: false,
    },
  ]

  const currentComponent = renderedComponents.find((c) => c.id === viewModel.currentRouteId)
  return (
    <div
      style={{
        display: 'flex',
      }}
    >
      {currentComponent && currentComponent.private && <NavigationComponent />}
      {/*{viewModel.currentRouteId === 'loginLink' ? (*/}
      {/*  <div>Create the login and register page</div>*/}
      {/*) : (*/}
      {/*  <div>Create the navigation menu and content pages</div>*/}
      {/*)}*/}
      {currentComponent ? currentComponent.component : <>404 not found</>}
    </div>
  )
})

export const CurrentPageComponent = CurrentPageComp
