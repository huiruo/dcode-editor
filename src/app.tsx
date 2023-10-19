import React, { ReactNode } from 'react'
import { Provider } from 'react-redux'
import store from './store/store'

interface ReduxProviderProps {
  children: ReactNode
}

const ReduxProvider = ({ children }: ReduxProviderProps) => (
  <Provider store={store}>{children}</Provider>
)

export function rootContainer(container: ReactNode, opts: ReduxProviderProps) {
  return React.createElement(ReduxProvider, opts, container)
}
