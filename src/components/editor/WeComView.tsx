import React, { useMemo } from 'react'
import {
  DraggableView,
  DraggableViewProps,
} from '@/designer/centerPanel/DraggableView'
import { Image } from 'antd-mobile'
import classNames from 'classnames'

export const WeComView = (props: DraggableViewProps) => {
  const { assemblyParam, assemblyInfo, index } = props
  const { axisY, width, axisX, requireRadius, imgUrl } = assemblyParam

  const qrCodeStyle = useMemo(() => {
    const codeStyle = {
      left: axisX / 2.1 || '0px',
      top: axisY / 2.1 || '0px',
      width: width / 2.1,
      height: width / 2.1,
      backgroundImage:
        'url(data:image/png;base64,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)',
      backgroundSize: '100%',
    }
    return codeStyle
  }, [assemblyParam])

  return (
    <DraggableView
      assemblyInfo={assemblyInfo}
      assemblyParam={assemblyParam}
      index={index}
    >
      <div className="tp-weChatCom">
        <div
          className={classNames('code-box', {
            'code-box-borderRadius': requireRadius,
          })}
        >
          <div className="weChatCom-content ">
            <Image src={imgUrl && imgUrl[0]} width={'100%'} />
          </div>
          {width > 0 && <div className="qr-code" style={qrCodeStyle}></div>}
        </div>
      </div>
    </DraggableView>
  )
}
