import React from 'react'
import { FormItem } from '@/common/componentJson'
import { Radio, RadioChangeEvent } from 'antd'
import { useField } from 'formik'

export const RadioPure = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, , helpers] = useField(name)

  const onChangeRadio = async (e: RadioChangeEvent) => {
    const value = e.target.value
    helpers.setValue(value)
  }

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content">
        <Radio.Group
          {...field}
          optionType="button"
          options={controlItemParam?.data}
          onChange={onChangeRadio}
          size="middle"
          value={controlItemParam?.value}
        />
      </div>
    </div>
  )
}
