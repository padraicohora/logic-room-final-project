import React, {ReactNode, useContext} from 'react'
import {Container, interfaces} from "inversify";
import ServiceIdentifier = interfaces.ServiceIdentifier;

const InversifyContext = React.createContext<{container:Container|null}>({ container: null })

export const Provider = ({container, children}:{container:Container, children:ReactNode}) => {
  return <InversifyContext.Provider value={{ container }}>{children}</InversifyContext.Provider>
}

export function useInjection<T>(identifier:symbol) {
  const { container } = useContext(InversifyContext)
  if (!container) {
    throw new Error()
  }
  return (container.get(identifier) as T)
}

export function withInjection(identifiers :{[key:string]:ServiceIdentifier<symbol>}) {
  return (Component:ReactNode) => {
    return (props:{[key:string]:any}) => {
      const { container } = useContext(InversifyContext)
      if (!container) {
        throw new Error()
      }

      const finalProps = {...props};
      for (const [key, value] of Object.entries(identifiers)) {
        if(container){
          finalProps[key] = container.get(value)
        }

      }

      // @ts-ignore
      return <Component {...finalProps} />
    }
  }
}
