import React, { useEffect, useMemo, useState } from 'react'
import { Button, Tag, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { FormItem } from '@/common/componentJson'
import {
  CouponForm,
  MiniPageForm,
  ModalType,
  ModalTypes,
  RemoteData,
  SelectValue,
} from './types'
import { MiniPageModal } from './MiniPage'
import { useAppSelector } from '@/store/hook'
import { shopIdState } from '@/store/designerSlice'
import { Product } from '@/services/product.type'
import { useFormikContext } from 'formik'
import { AssemblyParam, DataAssemblyParam } from '@/types/pageAssemblyTypes'
import {
  COUPON_DETAIL,
  DETAIL_VIEW_PAGE,
  MIMI_PAGE,
} from '@/common/constants'
import { MiniPage } from '@/services/miniPage.type'
import { CouponModal } from './Coupon'
import { Coupon } from '@/services/coupon.type'
import {
  generateTargetFormValues,
  isRenderChildField,
  isRenderField,
} from '@/common/generateFormSchema'
import { ActivityModal } from './Activity'
import { Activity } from '@/services/activity.type'
import { ProductModal } from './Product'
import { matchingRealField } from '@/common/utils'
import { ImgDisplay } from '../ImgDisplay'
import { CrowdPackModal } from './CrowdPackModal'
import { CrowdPackType } from '@/services/CrowdPack.type'
import { isEmpty } from 'lodash'
import store from '@/store/store'
import { designerActions } from '@/store/designerSlice'
import { removeDuplicates } from './utils'

export const RemoteView = (props: FormItem) => {
  const { controlItemParam, id: realField, dataAssemblyParam } = props
  const index = controlItemParam?.index as number
  const formik = useFormikContext<AssemblyParam>()
  const shopId = useAppSelector(shopIdState)
  const isMultiple =
    props.listPage?.tableParam.rowSelection?.type === 'checkbox'
  const name = props?.id as ModalType
  // HACK:万一没有dataOnlyCode?
  const dataOnlyCode = props?.dataAssemblyParam?.dataOnlyCode || name
  const [productVisible, setProductVisible] = useState<boolean>(false)
  const [activityVisible, setActivityVisible] = useState<boolean>(false)
  const [couponVisible, setCouponVisible] = useState<boolean>(false)
  const [miniPageVisible, setMiniPageVisible] = useState<boolean>(false)
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [validMsg, setValidMsg] = useState('')
  const required = controlItemParam?.rules?.required

  const controlType = useMemo(() => {
    return props.textParam?.controlType
  }, [dataAssemblyParam, realField])

  const visibleUtil = (visible: boolean, modalType: ModalType) => {
    switch (modalType) {
      case ModalTypes.Product:
      case ModalTypes.ProductList:
        setProductVisible(visible)
        break

      case ModalTypes.FullPresentActivity:
      case ModalTypes.FullReductionActivity:
      case ModalTypes.FullReductionActivity2:
      case ModalTypes.FullPresentActivity2:
      case ModalTypes.Activity2:
      case ModalTypes.Activity:
        setActivityVisible(visible)
        break

      case ModalTypes.Coupon:
      case ModalTypes.Coupons:
        setCouponVisible(visible)
        break

      case ModalTypes.CustormModule:
      case ModalTypes.MiniPage:
        setMiniPageVisible(visible)
        break

      case ModalTypes.CrowdPack:
        setModalVisible(visible)
        break

      default:
        break
    }
  }

  const onAdd = () => {
    visibleUtil(true, name)
  }

  const onClose = (modalType: ModalType) => {
    visibleUtil(false, modalType)
  }

  const onOkCoupon = (
    selectRowData: Coupon[],
    selectedRowKeys: React.Key[],
  ) => {
    onOk(selectRowData, selectedRowKeys, updateCouponForm)
  }

  const onOkProduct = (
    selectRowData: Product[],
    selectedRowKeys: React.Key[],
  ) => {
    onOk(selectRowData, selectedRowKeys, updateProductForm, false)
  }

  const onOkMiniPage = (
    selectRowData: MiniPage[],
    selectedRowKeys: React.Key[],
  ) => {
    onOk(selectRowData, selectedRowKeys, updateMiniPageForm)
  }

  const onOkCrowdPack = (
    selectRowData: CrowdPackType[],
    selectedRowKeys: React.Key[],
  ) => {
    onOk(selectRowData, selectedRowKeys, updateCrowdPackForm)
  }

  function onOk<T>(
    selectRowData: T[],
    selectedRowKeys: React.Key[],
    updateForm: (data: T[], filteredRemoteData: DataAssemblyParam[]) => void,
    isUniqueId = true,
  ) {
    if (selectRowData.length === 0 && selectedRowKeys.length) {
      return
    }

    const { fieldValues } = getFieldValues()
    const keySet = new Set(selectedRowKeys)
    const setKey = isUniqueId ? 'id' : 'key'
    const filteredRemoteData = fieldValues.filter((item) =>
      keySet.has(item[setKey]),
    )

    if (isMultiple) {
      const notNullSelectRowData = selectRowData.filter(
        (item) => item !== undefined,
      )
      const remoteDataIdSet = new Set(remoteData.map((item) => item.id))
      const notNullSelectRowDataUnique = notNullSelectRowData.filter(
        (item) => !remoteDataIdSet.has(item.id),
      )

      updateForm(notNullSelectRowDataUnique, filteredRemoteData)
    } else {
      updateForm(selectRowData, filteredRemoteData)
    }
  }

  const generateRemoteData = (
    realField: string,
    target: DataAssemblyParam[],
  ) => {
    const result: RemoteData[] = []
    for (const item of target) {
      const remoteData: RemoteData = {
        name: '',
        field: realField,
        id: '',
      }

      switch (realField) {
        case ModalTypes.Product:
        case ModalTypes.ProductList:
          remoteData.name = item.children
          remoteData.id = item.id
          break
        case ModalTypes.MiniPage:
        case ModalTypes.CustormModule:
          remoteData.name = item.text
          remoteData.id = item.id
          break
        case ModalTypes.Coupons:
        case ModalTypes.Coupon:
          remoteData.name = item.children || item.couponName
          remoteData.id = item.id
          break
        case ModalTypes.Activity:
        case ModalTypes.Activity2:
        case ModalTypes.FullReductionActivity:
        case ModalTypes.FullReductionActivity2:
        case ModalTypes.FullPresentActivity2:
        case ModalTypes.FullPresentActivity:
        case ModalTypes.CrowdPack:
          remoteData.name = item.value
          remoteData.id = item.id
          break
      }

      result.push(remoteData)
    }

    return result
  }

  const remoteDataPure = useMemo(() => {
    const fieldValue = dataAssemblyParam?.[realField]

    return fieldValue ? fieldValue : formik?.values[props.id] || []
  }, [dataAssemblyParam, realField, formik?.values])

  const getFieldValues = (): {
    fieldId: string
    fieldValues: DataAssemblyParam[]
  } => {
    const fieldValue = dataAssemblyParam?.[realField]
    const fieldId = fieldValue ? realField : props.id

    return {
      fieldId,
      fieldValues: fieldValue ? fieldValue : formik?.values[props.id] || [],
    }
  }

  const remoteData = useMemo(() => {
    const { fieldId, fieldValues } = getFieldValues()

    return generateRemoteData(fieldId, fieldValues)
  }, [dataAssemblyParam, realField, formik?.values])

  const updateForm = (
    formValuesName: string,
    updateData:
      | MiniPageForm
      | { children: string; id: string }
      | CouponForm[]
      | CouponForm
      | DataAssemblyParam[],
  ) => {
    const targetValue = Array.isArray(updateData) ? updateData : [updateData]
    const newData = generateTargetFormValues(
      formik?.values,
      formValuesName,
      index,
      realField,
      targetValue,
    )

    formik.setFieldValue(formValuesName, newData)
  }

  const updateProductForm = <T extends Product[]>(
    selectRowData: T,
    filteredRemoteData: DataAssemblyParam[],
  ) => {
    const formValuesName = props.dataId || 'data'
    let fieldValue

    if (props.activeType === 'data') {
      // HACK: product 没有id="唯一",需要用key
      fieldValue = selectRowData.map((item) => ({
        id: item.id,
        key: item.id,
        name: item.itemName,
        itemId: item.itemId,
        shopId: item.shopId,
        jumpUrl: '',
        src: item.imgPath,
        children: item.imgPath,
      }))
    } else {
      // HACK: product 没有id="唯一",需要用key
      fieldValue = selectRowData.map((item) => ({
        children: item.itemName,
        id: `${DETAIL_VIEW_PAGE}?itemId=${item.itemId}&shopId=${item.shopId}&busType=${item.busType}&id=${item.id}`,
        key: item.id,
      }))
    }

    if (props.dataAssemblyParam) {
      if (index !== undefined && realField !== '') {
        if (isMultiple) {
          updateForm(formValuesName, [...fieldValue, ...filteredRemoteData])
        } else {
          updateForm(formValuesName, fieldValue[0])
        }
      } else {
        message.warning('修改组件失败')
      }
    } else {
      if (isMultiple) {
        formik.setFieldValue(props.id, [...fieldValue, ...filteredRemoteData])
      } else {
        formik.setFieldValue(props.id, fieldValue)
      }
    }
  }

  const onOkActivity = <T extends Activity[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => {
    if (selectRowData.length === 0 && selectedRowKeys.length) {
      return
    }

    let fieldValue
    if (props.activeType === 'link') {
      fieldValue = selectRowData.map((item) => ({
        id: item.id,
        value: item.activityName || item.remark,
        text: item.activityName || item.remark,
        preheatStartTime: item.preheatStartTime,
        beginTime: item.beginTime,
        dataIndex: item.endTime,
        endTime: item.endTime,
      }))
    } else {
      fieldValue = selectRowData.map((item) => ({
        id: item.id,
        value: item.activityName || item.remark,
        text: item.activityName || item.remark,
        preheatStartTime: item.preheatStartTime,
        beginTime: item.beginTime,
        dataIndex: item.endTime,
        endTime: item.endTime,
      }))
    }

    if (props.dataAssemblyParam) {
      console.warn('onOkActivity--嵌套组件修改-待对接')
    } else {
      if (isMultiple) {
        console.warn('onOkActivity-2-1--待对接:', {
          value: props.listPage?.tableParam.rowSelection?.type,
          isMultiple,
          fieldValue,
        })
      } else {
        formik.setFieldValue(props.id, fieldValue)
      }
    }
  }

  const updateMiniPageForm = <T extends MiniPage[]>(
    selectRowData: T,
    filteredRemoteData: DataAssemblyParam[],
  ) => {
    const formValuesName = props.dataId || 'data'
    let fieldValue

    if (props.activeType === 'link') {
      fieldValue = selectRowData.map((item) => ({
        id: `${MIMI_PAGE}?pageId=${item.id}`,
        value: item.name,
        code: '',
        newUrl: '',
        children: '',
        text: item.name,
      }))
    } else {
      fieldValue = selectRowData.map((item) => ({
        id: item.id,
        value: item.name,
        code: '',
        newUrl: '',
        children: '',
        text: item.name,
      }))
    }

    if (props.dataAssemblyParam) {
      if (index !== undefined && realField !== '') {
        if (isMultiple) {
          updateForm(formValuesName, [...fieldValue, ...filteredRemoteData])
        } else {
          updateForm(formValuesName, fieldValue[0])
        }
      } else {
        message.warning('修改组件失败')
      }
    } else {
      if (isMultiple) {
        formik.setFieldValue(props.id, [...fieldValue, ...filteredRemoteData])
      } else {
        formik.setFieldValue(props.id, fieldValue)
      }
    }
  }

  const updateCouponForm = <T extends Coupon[]>(
    selectRowData: T,
    filteredRemoteData: DataAssemblyParam[],
  ) => {
    const formValuesName = props.dataId || 'data'
    let fieldValue

    if (props.activeType === 'link') {
      fieldValue = selectRowData.map((item) => ({
        children: item.couponName,
        id: `${COUPON_DETAIL}?templateId=${item.id}`,
      }))
    } else {
      fieldValue = selectRowData.map((item) => ({
        id: item.id,
        couponName: item.couponName,
        couponValue: item.couponValue,
        couponCategory: item.couponCategory,
        eventMarketingShow: item.eventMarketingShow,
        tag: item.tag,
        activityId: item.activityId,
        text: item.couponName,
      }))
    }

    if (props.dataAssemblyParam) {
      if (index !== undefined && realField !== '') {
        if (isMultiple) {
          formik.setFieldValue(formValuesName, [
            ...fieldValue,
            ...filteredRemoteData,
          ])
        } else {
          updateForm(formValuesName, fieldValue[0])
        }
      } else {
        message.warning('修改组件失败')
      }
    } else {
      if (isMultiple) {
        formik.setFieldValue(props.id, [...fieldValue, ...filteredRemoteData])
      } else {
        formik.setFieldValue(props.id, fieldValue)
      }
    }
  }

  const updateCrowdPackForm = <T extends CrowdPackType[]>(
    selectRowData: T,
    filteredRemoteData: DataAssemblyParam[],
  ) => {
    const formValuesName = props.dataId || 'data'
    let fieldValue

    if (props.activeType === 'data') {
      fieldValue = selectRowData.map((item) => ({
        id: item.remoteGroupId,
        value: item.name,
      }))
    } else {
      console.warn('link-未对接')
    }

    if (props.dataAssemblyParam) {
      if (index !== undefined && realField !== '') {
        if (isMultiple) {
          const uniqueData = removeDuplicates(
            [...(fieldValue as SelectValue[]), ...filteredRemoteData],
            'id',
          )
          updateForm(formValuesName, uniqueData)
        } else {
          updateForm(formValuesName, fieldValue[0])
        }
      } else {
        message.warning('修改组件失败')
      }
    } else {
      if (isMultiple) {
        const uniqueData = removeDuplicates(
          [...(fieldValue as SelectValue[]), ...filteredRemoteData],
          'id',
        )

        formik.setFieldValue(props.id, uniqueData)
      } else {
        formik.setFieldValue(props.id, fieldValue)
      }
    }
  }

  const onCloseTag = (e: React.MouseEvent<HTMLElement>, item: RemoteData) => {
    e.preventDefault()
    if (props.dataAssemblyParam) {
      const formValuesName = props?.dataId || 'data'
      const index = controlItemParam?.index
      const realField = matchingRealField(name)
      if (index !== undefined && realField !== '') {
        // 嵌套组件
        // TODO: 这里用id匹配到目标值可能会有bug，RemoteData数据太乱，id不一定是预期值
        const updatedTarget = (
          formik?.values[formValuesName] as DataAssemblyParam[]
        )?.map((element, i) => {
          if (index === i) {
            const target = (element[realField] as DataAssemblyParam[]).filter(
              (ele) => ele.id !== item.id,
            )
            return {
              ...element,
              [realField]: [...target],
            }
          }
          return element
        })

        formik.setFieldValue(formValuesName, updatedTarget)
      } else {
        message.warning('修改组件失败')
      }
    } else {
      const formValuesName = controlItemParam?.id || props.id
      const target = formik?.values[formValuesName] as DataAssemblyParam[]
      const targetItemIndex = target.findIndex((ele) => ele.id === item.id)
      if (targetItemIndex !== -1) {
        const updatedTarget = [
          ...target.slice(0, targetItemIndex),
          ...target.slice(targetItemIndex + 1),
        ]
        formik.setFieldValue(formValuesName, updatedTarget)
      } else {
        message.warning('修改组件失败')
      }
    }
  }

  useEffect(() => {
    if (!props.mutex) {
      return
    }

    if (controlItemParam?.rules?.required) {
      let needValid = false
      if (props.dataAssemblyParam) {
        needValid = isRenderChildField(
          props,
          formik.values,
          name,
          props?.controlItemParam?.index as number,
        )
      } else {
        needValid = isRenderField(props, formik.values, name)
      }

      if (needValid) {
        const { value } = controlItemParam || {}
        const isEmptyValue = isEmpty(value)

        setValidMsg(isEmptyValue ? `${props?.label}不能为空` : '')
        store.dispatch(
          designerActions.setFormikValidation({
            [dataOnlyCode + realField]: !isEmptyValue,
          }),
        )
      }
    }
  }, [formik.values])

  useEffect(() => {

    return () => {
      if (controlItemParam?.rules?.required) {
        store.dispatch(
          designerActions.removeOneValidation(dataOnlyCode + realField),
        )
      }
    }
  }, [])

  // console.log('RemoteView:', { remoteData,props })

  return (
    <div className="form-item">
      <label className={required ? 'form-label fieldRequired' : 'form-label'}>
        {props?.label}
      </label>
      <div className="form-content remote-content">
        <div
          className={`${
            remoteDataPure.length &&
            (controlType === 'Img' ? 'flex-direction-col' : 'common-bottom-mg')
          }`}
        >
          {controlType === 'Img' ? (
            <ImgDisplay dataKey="name" dataSource={remoteData} />
          ) : (
            remoteData.map((item, i) => {
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
          )}
        </div>

        <div className="add-btn">
          <Button onClick={onAdd}>
            <PlusOutlined />
            <span>{props?.text}</span>
          </Button>
        </div>

        {validMsg && <div className="field-error">{validMsg}</div>}
      </div>

      <ProductModal
        visible={productVisible}
        onClose={onClose}
        onOkCallback={onOkProduct}
        shopId={shopId}
        productType={'product'}
        remoteData={remoteDataPure}
        {...props}
      />

      <ActivityModal
        shopId={shopId}
        visible={activityVisible}
        onClose={onClose}
        onOkCallback={onOkActivity}
        remoteData={remoteDataPure}
        {...props}
      />

      <MiniPageModal
        shopId={shopId}
        visible={miniPageVisible}
        onClose={onClose}
        onOkCallback={onOkMiniPage}
        remoteData={remoteDataPure}
        {...props}
      />

      <CrowdPackModal
        visible={modalVisible}
        onClose={onClose}
        onOkCallback={onOkCrowdPack}
        remoteData={remoteDataPure}
        {...props}
      />

      <CouponModal
        shopId={shopId}
        visible={couponVisible}
        onClose={onClose}
        onOkCallback={onOkCoupon}
        remoteData={remoteDataPure}
        {...props}
      />
    </div>
  )
}
