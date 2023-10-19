import React, { useEffect, useState } from 'react'
import { Button, Modal, message } from 'antd'
import { ModalType, ModalTypes, RequestOptions, TableParam } from './types'
import { FormItem } from '@/common/componentJson'
import { TableList } from '@/services/product.type'
import { PaginationType } from '@/services/types'
import { ModalTable } from './Table'
import {
  Coupon,
  GetCouponParams,
  GetCouponTemplateParams,
} from '@/services/coupon.type'
import { FilterOperation } from './FilterOperation'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { extractIdFromString } from './utils'

interface Props extends FormItem {
  shopId: string
  visible: boolean
  onClose: (modalType: ModalType) => void
  onOkCallback: <T extends Coupon[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => void
  remoteData: {
    id: string
    children: string
  }[]
}

const modalType = ModalTypes.Coupon

export const CouponModal = (props: Props) => {
  const { visible, onClose, onOkCallback, shopId, remoteData, ...rest } = props
  const [loading, setLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<Coupon[]>([])
  const [afterFilterValues, setAfterFilterValues] = useState({})
  const tableParam = rest.listPage?.tableParam as TableParam
  const requestParam = rest.listPage?.requestParam?.options as RequestOptions
  const panelParam = rest.listPage?.panelParam?.items || ([] as FormItem[])

  const [miniPageList, ] = useState<TableList<Coupon>>({
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  useEffect(() => {
    if (visible) {
      const selectedRowKeys: React.Key[] = []
      remoteData.forEach((item) => {
        const selectedRowKey = extractIdFromString(item.id, 'templateId')
        if (selectedRowKey) {
          selectedRowKeys.push(selectedRowKey)
        }
      })

      setSelectedRowKeys(selectedRowKeys)
    }
  }, [visible])

  const getCouponList = async (
    options: GetCouponParams | GetCouponTemplateParams,
  ) => {
    setLoading(true)
    console.log('getCouponList-->',)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      getCouponList({
        ...requestParam,
        pageNum: 1,
        pageSize: 10,
      } as GetCouponTemplateParams | GetCouponParams)
    }
  }

  const onCancel = () => {
    onClose(modalType)
  }

  const remove = () => {
    setSelectedRowKeys([])
    setSelectRowData([])
  }

  const handleOk = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择一条数据')
      return
    }
    onClose(modalType)
    onOkCallback(selectRowData, selectedRowKeys)
  }

  const tableCallback = (pagination: PaginationType) => {
    getCouponList({
      ...requestParam,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      ...afterFilterValues,
    } as GetCouponTemplateParams | GetCouponParams)
  }

  const filterCallback = (values: AssemblyParam) => {
    setAfterFilterValues(values)
    getCouponList({
      ...requestParam,
      pageNum: 1,
      pageSize: 10,
      ...values,
    } as unknown as GetCouponTemplateParams | GetCouponParams)
  }

  const onChangeCallback = (
    selectedRowKeys: React.Key[],
    selectedRows: Coupon[],
  ) => {
    setSelectedRowKeys(Array.from(new Set(selectedRowKeys)))
    setSelectRowData(selectedRows)
  }

  return (
    <Modal
      title={props.text}
      open={visible}
      afterOpenChange={afterOpenChange}
      onCancel={onCancel}
      afterClose={() => remove()}
      width="50%"
      destroyOnClose={true}
      footer={[
        <Button key="back" onClick={onCancel}>
          取消
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          确定
        </Button>,
      ]}
    >
      <div className="modal-container">
        <FilterOperation
          panelParam={panelParam}
          filterCallback={filterCallback}
          shopId={shopId}
        />

        <ModalTable
          list={miniPageList.list}
          total={miniPageList.total}
          loading={loading}
          pageNum={miniPageList.pageNum}
          pageSize={miniPageList.pageSize}
          tableParam={tableParam}
          selectedRowKeys={selectedRowKeys}
          tableCallback={tableCallback}
          onChangeCallback={onChangeCallback}
        />
      </div>
    </Modal>
  )
}
