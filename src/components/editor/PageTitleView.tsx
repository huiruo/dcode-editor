import React, { useMemo } from 'react'
import defaultBgImg from '@/assets/mobile_top.png'
// import { PageTitleType } from '@/types/editorType'
import { Assembly, AssemblyParam } from '@/types/pageAssemblyTypes'
import store from '@/store/store'
import { designerActions } from '@/store/designerSlice'
import { message } from 'antd'

interface PageTitleViewProps {
  assemblyParam: AssemblyParam
  pageAssembly: Assembly[]
}

export const PageTitleView = (props: PageTitleViewProps) => {
  const { assemblyParam, pageAssembly } = props
  const {
    bgColor = '#f5f7fa',
    containTop = false,
    pageTitle,
    Radios,
    bgImg,
  } = assemblyParam

  const onPageSetting = () => {
    const { assemblyInfo, assemblyParam } = pageAssembly[0]
    if (assemblyInfo.id === 'DcodePages') {
      store.dispatch(
        designerActions.selectItemView({
          assemblyInfo,
          assemblyParam,
          index: 0,
        }),
      )
    } else {
      message.warning('不支持修改页面设置')
    }
  }

  const getPageSettingStyle = useMemo(() => {
    let styleParam = {}
    if (containTop) {
      if (Radios === '2') {
        styleParam = {
          backgroundImage: `url('${defaultBgImg}'), url("${
            bgImg && bgImg[0]
          }")`,
          backgroundSize: '100% 100% auto',
        }
      } else {
        styleParam = {
          backgroundColor: `${bgColor}`,
          backgroundImage: `url("${defaultBgImg}")`,
          backgroundSize: '100% 100%',
        }
      }
    } else {
      styleParam = {
        backgroundColor: '#ffffff',
        backgroundImage: `url("${defaultBgImg}")`,
        backgroundSize: '100% 100%',
      }
    }
    return styleParam
  }, [props])

  return (
    <div>
      <div className="top" style={getPageSettingStyle} onClick={onPageSetting}>
        <div style={{ height: '20px' }}></div>
        <div className="nav" style={{ height: '50px' }}>
          <div className="left"></div>
          <div className="center">{pageTitle || '点击设置页面标题'}</div>
          <div className="right"></div>
        </div>
      </div>
    </div>
  )
}
