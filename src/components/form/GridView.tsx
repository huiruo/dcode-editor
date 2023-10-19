import React from 'react'
import { useField } from 'formik'
import { FormItem } from '@/common/componentJson'
import { ossImgEditorUrl } from '@/services/api'

export const GridView = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, , form] = useField(name)
  const { value } = field

  const clickRadio = (val: string | boolean) => {
    form.setValue(val)
  }

  // console.log('GridView-render:', props.controlItemParam.label, '--', { props, data: props.controlItemParam?.data })

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content">
        <div className="radio-icon">
          {controlItemParam?.data?.length &&
            controlItemParam?.data.map((item, index: number) => (
              <div
                key={index}
                className={`radioImg ${
                  item.value === value ? 'radioActive' : ''
                }`}
                onClick={() => clickRadio(item.value)}
              >
                <img
                  src={
                    item.value === value
                      ? `${ossImgEditorUrl}${item.srcSelected}`
                      : `${ossImgEditorUrl}${item.src}`
                  }
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
