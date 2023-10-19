import { createAsyncThunk } from '@reduxjs/toolkit'
import { services } from '@/services/api'
// import { success } from '@/common/constants'
import { PageInfo } from '@/types/pageAssemblyTypes'
import { FetchPageType } from '@/services/types'
import { SUCCESS } from '@/common/constants'

export const fetchPageInfo = createAsyncThunk<
  PageInfo,
  FetchPageType,
  { rejectValue: string }
>(
  'designer/fetchPageInfo',
  async (options: FetchPageType, { rejectWithValue }) => {
    try {
      const { shopId, pageId, isTemp } = options
      const res = await services.getPage({ pageId, isTemp })
      if (res.code === SUCCESS) {
        res.data.shopId = shopId
        res.data.pageId = pageId
        return res.data
      } else {
        return rejectWithValue('请求失败')
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)
