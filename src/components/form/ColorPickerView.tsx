import React from 'react'
import { ColorPicker } from 'antd'
import { useField } from 'formik'
import type { Color } from 'antd/es/color-picker'
import { FormItem } from '@/common/componentJson'

export const ColorPickerView = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, meta, helpers] = useField(name)

  const setColorHex = (val: Color) => {
    const colorHex = val.toHexString()
    helpers.setValue(colorHex)
  }

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content">
        <ColorPicker {...field} onChange={setColorHex} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  )
}
