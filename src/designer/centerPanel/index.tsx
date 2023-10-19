import React, { useMemo } from 'react'
import { useCallback } from 'react'
import { DraggableViewProvider } from './DraggableViewProvider'
import { useDrop, DropTargetMonitor } from 'react-dnd'
import store from '@/store/store'
import { processData, random } from '@/common/utils'
import { designerActions, pageAssemblyState } from '@/store/designerSlice'
import { DragType, DropAcceptList } from '@/types/dragItemViewType'
import { useAppSelector } from '@/store/hook'
import { AssemblyInfo, AssemblyParam } from '@/types/pageAssemblyTypes'
import { PageTitleView } from '@/components/editor/PageTitleView'
import { PAGE_TITLE_INFO } from '@/common/constants'
import '@/styles/center.less'
import '@/styles/editor.less'

interface Props {
  handleFormValue: <T>(field: string, value: T) => void
}

export const CenterPanel = (props: Props) => {
  const pageAssembly = useAppSelector(pageAssemblyState)

  const [, drop] = useDrop(() => ({
    accept: DropAcceptList,
    drop: (item, monitor: DropTargetMonitor) => {
      // console.log('editor-drop=>前置', store.getState(), '-', DragType.Add)
      if (store.getState().designer.currentDrag.dragType === DragType.Add) {
        const didDrop = monitor.didDrop()

        if (didDrop) return

        const randomId = random()
        // console.log(
        //   'editor-drop=>前置2:',
        //   store.getState().designer.currentDrag,
        //   'add-data',
        //   {
        //     id: randomId,
        //     type: store.getState().designer.currentDrag.dragView,
        //     text: randomId,
        //   },
        //   '==item:',
        //   item,
        // )

        store.dispatch(
          designerActions.addView({
            assemblyInfo: {
              ...store.getState().designer.currentDrag.dragView,
              onlyCode: randomId,
            },
            assemblyParam: { onlyCode: randomId },
          }),
        )
      }
    },
  }))

  const renderItem = useCallback(
    (
      assemblyInfo: AssemblyInfo,
      assemblyParam: AssemblyParam,
      index: number,
    ) => {
      return DraggableViewProvider.of(
        assemblyInfo,
        assemblyParam,
        index,
        props.handleFormValue,
      )
    },
    [],
  )

  const pageSettingAssemblyParam = useMemo(() => {
    const isFirstPageAssemblyValid =
      pageAssembly.length && pageAssembly[0].assemblyInfo.id === 'DcodePages'
    const assemblyParam = isFirstPageAssemblyValid
      ? processData(pageAssembly[0]?.assemblyParam, PAGE_TITLE_INFO)
      : PAGE_TITLE_INFO
    return assemblyParam
  }, [pageAssembly])

  const getPageSettingStyle = useMemo(() => {
    const { bgImg, Radios, bgColor, containTop } = pageSettingAssemblyParam
    const bgImageURL = bgImg?.length && bgImg[0]
    const bgImage = containTop
      ? { backgroundImage: `url("${bgImageURL}")` }
      : {
          backgroundImage: `url("${bgImageURL}")`,
          backgroundPosition: '0px 120px',
        }

    if (Radios === '2') {
      return bgImage
    } else {
      return { backgroundColor: bgColor }
    }
  }, [pageSettingAssemblyParam])

  console.log('centerPanel--main-render==>:', pageAssembly)

  return (
    <div className="center-panel" style={getPageSettingStyle}>
      <PageTitleView
        assemblyParam={pageSettingAssemblyParam}
        pageAssembly={pageAssembly}
      />
      <div
        ref={drop}
        style={{
          width: '100%',
          height: '90%',
          overflowY: 'scroll',
          overflowX: 'hidden',
        }}
      >
        {pageAssembly.map((item, index) => {
          const { assemblyInfo, assemblyParam } = item
          return (
            <div key={assemblyInfo.onlyCode}>
              {renderItem(assemblyInfo, assemblyParam, index)}
            </div>
          )
        })}
      </div>
    </div>
  )
}
