import React, { useMemo, useState } from 'react'
import { Button, Tag, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '@/common/componentJson'
import { useFormikContext } from 'formik'
import { ConfigSelectProductModal } from './modal/ConfigSelectProduct'
import { AssemblyParam, DataAssemblyParam } from '@/types/pageAssemblyTypes'
import { SelectRowDataFormType } from '@/services/product.type'

export const AddFormView = (props: FormItem) => {
  const [productVisible, setProductVisible] = useState<boolean>(false)
  const formik = useFormikContext<AssemblyParam>()
  const { controlItemParam } = props
  const noTabDataType = formik?.values?.noTab?.way

  const productData = useMemo<SelectRowDataFormType[]>(() => {
    const productFieldForm = formik?.values[props.dataId] as AssemblyParam
    if (productFieldForm?.way === 'custom') {
      return productFieldForm.list || []
    }

    return []
  }, [formik.values])

  const onAdd = () => {
    setProductVisible(true)
  }

  const onOkCallback = <T extends AssemblyParam>(values: T) => {
    const formValuesName = props.dataId || 'data'
    const { way, list = [], number, categoryId } = values
    if (way === 'category') {
      // HACK:categoryId 当选择category原有系统空是不赋值的,新系统是赋空值
      formik.setFieldValue(formValuesName, {
        way,
        categoryId,
        number,
        categoryName: values.categoryName,
      })
    } else {
      formik.setFieldValue(formValuesName, {
        way,
        list,
      })
    }
  }

  const onCloseTag = (
    e: React.MouseEvent<HTMLElement>,
    item: SelectRowDataFormType,
  ) => {
    e.preventDefault()
    try {
      if (props.dataAssemblyParam) {
        console.warn('src/components/form/AddFormView-非嵌套组件未对接:')
      } else {
        const formValuesName = controlItemParam?.id || props.id
        const childForm = formik?.values[formValuesName] as DataAssemblyParam
        // HACK: 这里是form嵌套结构，目前写死 form 对应的数组key为`list`,如果后面有其他使用的场景再兼容
        let target = [] as DataAssemblyParam[]
        if (props.type === 'form') {
          target = childForm['list']
        }
        const targetItemIndex = target.findIndex((ele) => ele.id === item.id)
        if (targetItemIndex !== -1) {
          const updatedTarget = [
            ...target.slice(0, targetItemIndex),
            ...target.slice(targetItemIndex + 1),
          ]

          formik.setFieldValue(formValuesName, {
            ...childForm,
            list: updatedTarget,
          })
        } else {
          message.warning('修改组件失败')
        }
      }
    } catch (error) {
      message.warning('修改组件失败')
    }
  }

  // console.log('AddFormView.tsx', { props, productData },formik?.values)

  return (
    <div className="form-item">
      <div className="form-label">{props?.label}</div>
      <div className="form-content add-btn">
        <div>
          <div
            className={`${
              (productData.length || noTabDataType !== 'custom') &&
              'common-bottom-mg'
            }`}
          >
            {noTabDataType === 'custom'
              ? productData.map((item, i) => {
                  return (
                    <Tag
                      key={item.id || i}
                      closeIcon
                      onClose={(e) => onCloseTag(e, item)}
                      className="tag-item"
                    >
                      {item.name}
                    </Tag>
                  )
                })
              : formik?.values?.noTab?.categoryName}
          </div>

          <Button onClick={onAdd}>
            <PlusOutlined />
            <span>配置选择商品</span>
          </Button>
        </div>
      </div>

      <ConfigSelectProductModal
        {...props}
        visible={productVisible}
        productFieldForm={formik?.values[props.dataId] as AssemblyParam}
        onClose={() => setProductVisible(false)}
        onOkCallback={onOkCallback}
      />
    </div>
  )
}
