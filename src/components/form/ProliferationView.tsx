import React from 'react'
import { Button, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '@/common/componentJson'
import { useField, useFormikContext } from 'formik'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { random } from '@/common/utils'

type Props = FormItem

export const ProliferationView = (props: Props) => {
  const { values } = useFormikContext<AssemblyParam>()
  const name = props?.id as string
  const maxCount = props?.maxCount || 3
  const [field, meta, helpers] = useField(name)
  const { value = [] } = field

  const onAdd = () => {
    const defaultValues = values?.childrenDefaultVal || {}
    if (value.length >= maxCount) {
      message.warning(`已达到最大限制${maxCount}条数据，不能再新增了`)
      return
    }

    // HACK: 必须添加onlyCode,做react唯一渲染
    // TODO: 这里imgUrl: [] 不确定会不会造成多余数据
    const newData = [
      ...value,
      { imgUrl: [], ...defaultValues, dataOnlyCode: random() },
    ]

    helpers.setValue(newData)
  }

  return (
    <div className="form-item">
      <div className="form-label">{props?.label}</div>
      <div className="form-content add-btn">
        <Button onClick={onAdd}>
          <PlusOutlined />
          <span>新增</span>
        </Button>
      </div>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
