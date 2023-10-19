import React, { useEffect, useState } from 'react'
import { Button, Modal, Tabs, message } from 'antd'
import type { TabsProps } from 'antd'
import { ModalType, ModalTypes, RequestOptions, TableParam } from './types'
import { FormItem } from '@/common/componentJson'
import { ModalTable } from './Table'
import { TableList } from '@/services/product.type'
import { PaginationType } from '@/services/types'
import { Activity, ActivityListOptions } from '@/services/activity.type'
import { FilterOperation } from './FilterOperation'
import { AssemblyParam } from '@/types/pageAssemblyTypes'
import { extractIdFromString } from './utils'

interface Props extends FormItem {
  shopId: string
  visible: boolean
  onClose: (modalType: ModalType) => void
  onOkCallback: <T extends Activity[]>(
    selectRowData: T,
    selectedRowKeys: React.Key[],
  ) => void
  remoteData: {
    id: string
    children: string
  }[]
}

const modalType = ModalTypes.Activity

const tabItems: TabsProps['items'] = [
  {
    key: 'READY',
    label: '未开始',
  },
  {
    key: 'ACTIVATE',
    label: '进行中',
  },
]

export const ActivityModal = (props: Props) => {
  const { visible, onClose, onOkCallback, shopId, remoteData, ...rest } = props
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [loading, setLoading] = useState(false)
  const [selectRowData, setSelectRowData] = useState<Activity[]>([])
  const [activityStatus, setActivityStatus] = useState<string>('')
  const [afterFilterValues, setAfterFilterValues] = useState({})
  const tableParam = rest.listPage?.tableParam as TableParam
  const requestParam = rest.listPage?.requestParam?.options as RequestOptions
  const panelParam = rest.listPage?.panelParam?.items || []
  const [activity] = useState<TableList<Activity>>({
    list: [],
    total: 0,
    pageNum: 1,
    pageSize: 10,
  })

  useEffect(() => {
    if (visible) {
      const selectedRowKeys: React.Key[] = []
      remoteData.forEach((item) => {
        const selectedRowKey = extractIdFromString(item.id)
        if (selectedRowKey) {
          selectedRowKeys.push(selectedRowKey)
        }
      })

      setSelectedRowKeys(selectedRowKeys)
    }
  }, [visible])

  const getActivityList = async (activityListOptions: ActivityListOptions) => {
    setLoading(true)
    console.log('getActivityList==>',)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      getActivityList({
        ...requestParam,
        pageNum: 1,
        pageSize: 10,
      } as ActivityListOptions)
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
    getActivityList({
      ...requestParam,
      pageNum: pagination.pageNum,
      pageSize: pagination.pageSize,
      activityStatus: activityStatus || requestParam.activityStatus,
      ...afterFilterValues,
    } as ActivityListOptions)
  }

  const filterCallback = (values: AssemblyParam) => {
    setAfterFilterValues(values)
    getActivityList({
      ...requestParam,
      pageNum: 1,
      pageSize: 10,
      ...values,
      activityStatus: activityStatus || requestParam.activityStatus,
    } as unknown as ActivityListOptions)
  }

  const onChangeCallback = (
    selectedRowKeys: React.Key[],
    selectedRows: Activity[],
  ) => {
    setSelectedRowKeys(Array.from(new Set(selectedRowKeys)))
    setSelectRowData(selectedRows)
  }

  const onChangeTab = (key: string) => {
    let status = key
    if (key === 'ACTIVATE' && props?.id === 'fullReductionActivity') {
      status = 'NEW'
    }

    getActivityList({
      ...requestParam,
      pageNum: 1,
      pageSize: 10,
      activityStatus: status,
    } as ActivityListOptions)

    setActivityStatus(status)
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

        <Tabs defaultActiveKey="1" items={tabItems} onChange={onChangeTab} />

        <ModalTable
          list={activity.list}
          total={activity.total}
          loading={loading}
          pageNum={activity.pageNum}
          pageSize={activity.pageSize}
          tableParam={tableParam}
          selectedRowKeys={selectedRowKeys}
          tableCallback={tableCallback}
          onChangeCallback={onChangeCallback}
        />
      </div>
    </Modal>
  )
}
