import React, { useEffect, useRef } from 'react'
import Cookies from 'js-cookie'
import { LeftPanel } from '@/designer/leftPanel'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { CenterPanel } from '@/designer/centerPanel'
import RightPanel from '@/designer/rightPanel'
import { getIndexURLSearchParams } from '@/common/utils'
import store from '@/store/store'
import { fetchPageInfo } from '@/store/reducer/thunkAction'
import { useLocation } from 'umi'
import '@/styles/index.less'

export interface RefProps {
  setFieldValue: <T>(field: string, value: T) => void
}

export default function IndexPage() {
  const rightPanelRef = useRef<RefProps>(null)
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  function handleFormValue<T>(field: string, value: T) {
    rightPanelRef?.current?.setFieldValue(field, value)
  }

  useEffect(() => {
    initPageInfo()
  }, [])

  const initPageInfo = async () => {
    const indexURLSearch = getIndexURLSearchParams(queryParams)
    // const { pageId, token, shopId, showContent, isTemp } = indexURLSearch
    const { token, shopId, showContent, isTemp } = indexURLSearch
    localStorage.setItem('urlState', JSON.stringify(indexURLSearch))

    if (token) Cookies.set('Access-Token', token)

    if (!showContent) {
      store.dispatch(fetchPageInfo({ pageId: '1', shopId, isTemp }))
    }
  }

  return (
    <div className="tp-container">
      <DndProvider backend={HTML5Backend}>
        <LeftPanel />
        <CenterPanel handleFormValue={handleFormValue} />
      </DndProvider>
      <RightPanel ref={rightPanelRef} />
    </div>
  )
}
