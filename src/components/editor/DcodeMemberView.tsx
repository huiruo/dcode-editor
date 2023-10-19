import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { processData, random } from '@/common/utils'
import { Button, Image } from 'antd-mobile'
import { ossImgUrl } from '@/services/api'

interface DcodeMemberAssembly {
  onlyCode: ReturnType<typeof random>
  pointsNumColor: string
  couponNumColor: string
  baseGrowthText: string
  baseGrowthColor: string
  couponZhColor: string
  tabSelectedVal: string
  pointsZhColor: string
  normalGrowthColor: string
  nicknameColor: string
  highestGrowthColor: string
  highestGrowthText: string
  memberMode: string
  vMainTitleColor: string
  vBtnColor: string
  vBtnBgColor: string
  vBtnTitle: string
  vBgUrl: string
  vSubTitleColor: string
  vMainTitle: string
  vSubTitle: string
}

const defaultProps = {
  onlyCode: random(),
  pointsNumColor: '#262626',
  couponNumColor: '#262626',
  baseGrowthText: '欢迎进入XX商城',
  vMainTitle: '注册即享新人礼',
  baseGrowthColor: '#666666',
  vSubTitle: '立即登录享超值福利',
  couponZhColor: '#666666',
  tabSelectedVal: 'visitor',
  pointsZhColor: '#666666',
  vBtnTitle: '立即登录',
  vBgUrl: '',
  vSubTitleColor: '#666666',
  normalGrowthColor: '#666666',
  nicknameColor: '#262626',
  vBtnBgColor: '#262626',
  highestGrowthColor: '#666666',
  highestGrowthText: '尊贵的黑钻卡会员，请尽情享受权益',
  vMainTitleColor: '#262626',
  vBtnColor: '#ffffff',
  memberMode: '潜客',
}

interface MemberRenderObj {
  levelUrl: string
  subTitle: string
  subTitleColor: string
}

const renderMap: Map<string, MemberRenderObj> = new Map([
  [
    // 潜客
    'QIANKE_T0',
    {
      subTitle: 'baseGrowthText',
      subTitleColor: 'baseGrowthColor',
      levelUrl: '',
    },
  ],
  // 普通会员
  [
    'LPPZ_T0',
    {
      subTitle: '',
      subTitleColor: 'normalGrowthColor',
      levelUrl: 'normalCard.png',
    },
  ],
  // 银卡
  [
    'TSJHM-01',
    {
      subTitle: '',
      subTitleColor: 'normalGrowthColor',
      levelUrl: 'silverCard.png',
    },
  ],
  // 金卡
  [
    'TSJHM-02',
    {
      subTitle: '',
      subTitleColor: 'normalGrowthColor',
      levelUrl: 'goldCard.png',
    },
  ],
  // 钻卡
  [
    'TSJHM-03',
    {
      subTitle: '',
      subTitleColor: 'normalGrowthColor',
      levelUrl: 'diamondCard.png',
    },
  ],
  // 黑钻卡
  [
    'TSJHM-04',
    {
      subTitle: 'highestGrowthText',
      subTitleColor: 'highestGrowthColor',
      levelUrl: 'blackCard.png',
    },
  ],
])

export const DcodeMemberView = (props: DraggableViewProps) => {
  const { assemblyInfo, assemblyParam, index } = props

  const assembly = useMemo<DcodeMemberAssembly>(
    () => processData(assemblyParam, defaultProps) as DcodeMemberAssembly,
    [assemblyParam],
  )

  const { tabSelectedVal = 'visitor' } = assembly

  const memberRenderProps = useMemo<MemberRenderObj>(() => {
    const values = renderMap.get(assembly.memberMode) as MemberRenderObj

    return {
      levelUrl: values?.levelUrl,
      subTitle: assembly[values?.subTitle as keyof DcodeMemberAssembly],
      subTitleColor: assembly[values?.subTitleColor as keyof DcodeMemberAssembly],
    }
  }, [assembly])

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="editable tp-member tp-flex">
        {tabSelectedVal === 'visitor' ? (
          <>
            <div className="vright">
              <div
                className="common-bottom-mg font-weight font-size1"
                style={{ color: assembly.vMainTitleColor }}
              >
                {assembly.vMainTitle}
              </div>
              <div
                className="font-size2"
                style={{ color: assembly.vSubTitleColor }}
              >
                {assembly.vSubTitle}
              </div>
            </div>

            <div className="vleft xy-center">
              <Button
                style={{
                  background: assembly.vBtnBgColor,
                  color: assembly.vBtnColor,
                  borderRadius: '15px',
                  fontSize: '14px',
                  paddingLeft: '18px',
                  paddingRight: '18px',
                }}
              >
                {assembly.vBtnTitle}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="uright">
              <div
                className="flex_row_center font-weight font-size1 common-bottom-mg"
                style={{ color: assembly.nicknameColor }}
              >
                <div className="common-right-mg">用户昵称</div>
                {memberRenderProps.levelUrl && (
                  <Image
                    width={76}
                    height={20}
                    src={`${ossImgUrl}${memberRenderProps.levelUrl}`}
                  />
                )}
              </div>
              <div
                className="font-size2"
                style={{ color: memberRenderProps.subTitleColor }}
              >
                {memberRenderProps.subTitle
                  ? memberRenderProps.subTitle
                  : '还差40成长值，可升级钻卡'}
              </div>
            </div>

            <div className="uleft xy-center">
              <div>
                <div
                  className="common-bottom-mg font-weight font-size1"
                  style={{ color: assembly.couponNumColor }}
                >
                  24
                </div>
                <div style={{ color: assembly.couponZhColor }}>优惠券</div>
              </div>
              <div className="common-left-mg">
                <div
                  className="common-bottom-mg font-weight font-size1"
                  style={{ color: assembly.pointsNumColor }}
                >
                  3910
                </div>
                <div style={{ color: assembly.pointsZhColor }}>积分</div>
              </div>
            </div>
          </>
        )}
      </div>
    </DraggableView>
  )
}
