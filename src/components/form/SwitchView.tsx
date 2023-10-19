import React from 'react'
import { Switch } from 'antd'
import { useField } from 'formik'
import { FormItem } from '@/common/componentJson'

export const SwitchView = (props: FormItem) => {
  const { controlItemParam } = props
  const name = controlItemParam?.id as string
  const [field, meta, form] = useField(name)
  const { value } = field

  return (
    <div className="form-item">
      <div className="form-label">{controlItemParam?.label}</div>
      <div className="form-content">
        <Switch
          checked={value}
          onChange={(e) => {
            form.setValue(e)
          }}
        />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    </div>
  )
}
