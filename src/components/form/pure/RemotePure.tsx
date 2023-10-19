import React, { useMemo, useState } from 'react'
import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '@/common/componentJson'
import { Product, SelectRowDataFormType } from '@/services/product.type'
import { ProductModal } from '../modal/Product'
import { useFormikContext } from 'formik'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { ImgDisplay } from '../ImgDisplay'

export const RemotePure = (props: FormItem) => {
  const { id: realField, dataAssemblyParam } = props
  const formik = useFormikContext<AssemblyParam>()
  const [productVisible, setProductVisible] = useState<boolean>(false)

  const controlType = useMemo(() => {
    return props.textParam?.controlType
  }, [dataAssemblyParam, realField])

  const onAdd = () => {
    setProductVisible(true)
  }

  const onOkProduct = <T extends Product[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => {
    const keySet = new Set(selectedRowKeys)
    const filteredRemoteData = remoteDataPure.filter((item) =>
      keySet.has(item.id),
    )

    const notNullSelectRowData = selectRowData.filter(
      (item) => item !== undefined,
    )
    const remoteDataIdSet = new Set(remoteDataPure.map((item) => item.id))
    const notNullSelectRowDataUnique = notNullSelectRowData.filter(
      (item) => !remoteDataIdSet.has(item.id),
    )

    const newSelectRowData: SelectRowDataFormType[] =
      notNullSelectRowDataUnique.map((item) => {
        return {
          id: item.id,
          name: item.itemName,
          itemId: item.itemId,
          shopId: item.shopId || '',
          jumpUrl: '',
          src: item.imgPath,
          children: item.imgPath,
        }
      })

    formik.setFieldValue('list', [...filteredRemoteData, ...newSelectRowData])
  }

  const onClose = () => {
    setProductVisible(false)
  }

  const remoteDataPure = useMemo<SelectRowDataFormType[]>(() => {
    const fieldValue = dataAssemblyParam?.[realField]

    return fieldValue ? fieldValue : formik?.values[props.id] || []
  }, [dataAssemblyParam, realField, formik?.values])

  // console.log('RemotePure:', {props,remoteDataPure })

  return (
    <div className="form-item">
      <div className="form-label">{props?.label}</div>
      <div className="form-content add-btn">
        <div
          className={`${
            remoteDataPure.length &&
            (controlType === 'Img' ? 'flex-direction-col' : 'common-bottom-mg')
          }`}
        >
          {controlType === 'Img' ? (
            <ImgDisplay dataKey="children" dataSource={remoteDataPure} />
          ) : (
            remoteDataPure.map((item) => {
              return (
                <div key={item.id} className="common-right-mg">
                  {item.name}
                </div>
              )
            })
          )}
        </div>
        <Button onClick={onAdd}>
          <PlusOutlined />
          <span>{props?.text}</span>
        </Button>
      </div>

      <ProductModal
        visible={productVisible}
        onClose={onClose}
        onOkCallback={onOkProduct}
        shopId={''}
        {...props}
        productType={'productLib'}
        remoteData={remoteDataPure}
      />
    </div>
  )
}
