import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DragItemViewType, DragType } from '@/types/dragItemViewType'
import { Map } from 'immutable'
import { RootState } from './store'
import {
  ChangeIndexParam,
  CurrentMoveView,
  CurrentSelectView,
  DesignComponent,
  DesignerState,
  InsertByIndex,
} from '@/types/sliceType'
import { fetchPageInfo } from './reducer/thunkAction'
import {
  Assembly,
  AssemblyParam,
  BaseComponentType,
  PageInfo,
} from '@/types/pageAssemblyTypes'
import { componentJson } from '@/common/componentJson'
import {
  findTargetAssemblyParam,
  generateFormSchema,
} from '@/common/generateFormSchema'
import { cloneDeep } from 'lodash'
import { random, sortAssembly } from '@/common/utils'
import { pageTitleComponentSetting } from '@/common/componentList'

const initialState: DesignerState = {
  currentDrag: {
    dragType: DragType.Add,
    dragView: {
      id: DragItemViewType.DcodeLocation,
      iconType: '',
      title: '',
    },
  },
  currentMoveView: {
    onlyCode: '',
    index: 0,
    id: '',
  },
  currentSelectView: {
    assemblyInfo: {
      id: '',
      iconType: '',
      title: '',
      onlyCode: 0,
    },
    assemblyParam: {
      onlyCode: 0,
      data: [],
    },
    index: 0,
  },
  pageAssembly: [],
  pageInfo: {
    appCode: null,
    bizData: null,
    createPerson: '',
    createTime: '',
    descr: '',
    engineRespDto: null,
    extFields: {},
    extension: null,
    id: '',
    shopId: '',
    pageId: '',
    img: '',
    instanceId: '',
    name: '',
    pageEngineId: 'null',
    pageParamDtos: null,
    projectId: null,
    status: 0,
    tenantId: 0,
    title: '',
    updatePerson: '',
    updateTime: '',
  },
  formJson: {
    formSchema: [],
    defaultValues: { onlyCode: 0, data: [] },
  },
  formikIsValid: true,
  formikValidation: {},
}

const designerSlice = createSlice({
  name: 'designer',
  initialState,
  reducers: {
    /** 新增控件 */
    addView: (state, action: PayloadAction<Assembly>) => {
      // console.log('store->新增控件', action.payload)
      state.pageAssembly.push(action.payload)
    },
    /** 删除控件 */
    removeView: (state, action: PayloadAction<number>) => {
      const pageAssembly = state.pageAssembly
      pageAssembly.splice(action.payload, 1)
      state.formJson = {
        formSchema: [],
        defaultValues: { onlyCode: 0, data: [] },
      }
      state.currentMoveView = {
        onlyCode: '',
        index: 0,
        id: '',
      }
      state.formikValidation = {}
      state.currentSelectView = {
        assemblyInfo: {
          id: '',
          iconType: '',
          title: '',
          onlyCode: 0,
        },
        assemblyParam: {
          onlyCode: 0,
          data: [],
        },
        index: 0,
      }
    },
    /** 移动当前拖拽控件 */
    moveToIndex: (state, action: PayloadAction<ChangeIndexParam>) => {
      // console.log('store->移动当前拖拽控件:', action.payload)
      state.pageAssembly.splice(action.payload.dragIndex, 1)
      // 插入至悬停位置
      state.pageAssembly.splice(
        action.payload.hoverIndex,
        0,
        action.payload.itemView,
      )
    },
    /** 插入至悬停位置 */
    insertIntoIndex: (state, action: PayloadAction<InsertByIndex>) => {
      // console.log('store->插入至悬停位置', action.payload.itemView)
      state.pageAssembly.splice(
        action.payload.index,
        0,
        action.payload.itemView,
      )
    },
    /** 选中view */
    selectItemView: (state, action: PayloadAction<CurrentSelectView>) => {
      const {
        assemblyInfo: { id, onlyCode },
        assemblyParam,
      } = action.payload
      const json = componentJson[`${id}`].data
      // TODO: cloneDeep用于隔离可能有性能问题
      state.formJson = generateFormSchema(
        cloneDeep(json.resources),
        assemblyParam,
        onlyCode,
      )

      state.currentSelectView = action.payload

      // console.log('store-选中view-->', {
      //   payload: action.payload,
      //   id,
      //   state: original(state),
      // })
    },
    /** 选中view */
    moveItemView: (state, action: PayloadAction<CurrentMoveView>) => {
      state.currentMoveView = action.payload
    },
    /** 改变组件属性 */
    designComponent: (state, action: PayloadAction<DesignComponent>) => {
      const { onlyCode, values, isValid } = action.payload
      const { pageAssembly } = state
      const { index, assemblyParam } = findTargetAssemblyParam(
        pageAssembly,
        onlyCode,
      )

      let valuesImmutable = Map(values)
      if (valuesImmutable.has('childrenDefaultVal')) {
        valuesImmutable = valuesImmutable.delete('childrenDefaultVal')
      }

      state.pageAssembly[index] = {
        ...pageAssembly[index],
        assemblyParam: {
          ...assemblyParam,
          ...valuesImmutable.toJS(),
        },
      }
      state.formikIsValid = isValid

      // console.log('store--改变组件属性', {
      //   payload: action.payload,
      //   pageAssembly_index: pageAssembly[index],
      //   pageAssembly: original(pageAssembly),
      //   values,
      //   index,
      // })
    },
    /** 被拖拽控件的拖拽目的(新增、排序)、拖拽控件类型 */
    dragItemView: (
      state,
      action: PayloadAction<{
        dragItemView: BaseComponentType
        dragType: DragType
      }>,
    ) => {
      // console.log('dragItemView==>store:', action.payload)
      state.currentDrag.dragType = action.payload.dragType
      state.currentDrag.dragView = action.payload.dragItemView
    },
    /** 删除嵌套form组件 */
    deleteChildrenFormCard: (
      state,
      action: PayloadAction<{ values: AssemblyParam; index: number }>,
    ) => {
      const { index } = action.payload
      const { defaultValues, formSchema } = state.formJson
      const data = defaultValues?.data ? [...defaultValues.data] : []

      data.splice(index, 1)

      state.formJson = {
        formSchema,
        defaultValues: {
          ...defaultValues,
          data,
        },
      }
    },
    setFormikIsValid: (state, action: PayloadAction<boolean>) => {
      // console.log('setFormikIsValid-main:', action.payload)
      state.formikIsValid = action.payload
    },
    setFormikValidation: (
      state,
      action: PayloadAction<Record<string, string | boolean>>,
    ) => {
      // console.log('setFormikIsValid-child:', action.payload)
      state.formikValidation = { ...state.formikValidation, ...action.payload }
    },
    removeOneValidation: (state, action: PayloadAction<string>) => {
      delete state.formikValidation[action.payload]
    },
    setTemplate: (state, action: PayloadAction<{ pageText: string }>) => {
      const pageAssembly = JSON.parse(action.payload.pageText) as Assembly[]
      const containsDcodePages = pageAssembly.some(
        (item) => item.assemblyInfo.id === 'DcodePages',
      )
      if (!containsDcodePages) {
        const onlyCode = random()
        const itemView = {
          assemblyInfo: {
            ...pageTitleComponentSetting,
            onlyCode,
          },
          assemblyParam: { onlyCode },
        }
        pageAssembly.unshift(itemView)
      }

      state.pageAssembly = sortAssembly(pageAssembly)
    },

    setPageInfo: (state, action: PayloadAction<PageInfo>) => {
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      const { pageText, ...rest } = action.payload
      state.pageInfo = rest
    },
  },
  extraReducers(builder) {
    builder.addCase(
      fetchPageInfo.fulfilled,
      (state, action: PayloadAction<PageInfo>) => {
        const { pageText, ...rest } = action.payload
        const pageAssembly = JSON.parse(pageText) as Assembly[]

        const containsDcodePages = pageAssembly.some(
          (item) => item.assemblyInfo.id === 'DcodePages',
        )
        if (!containsDcodePages) {
          const onlyCode = random()
          const itemView = {
            assemblyInfo: {
              ...pageTitleComponentSetting,
              onlyCode,
            },
            assemblyParam: { onlyCode },
          }
          pageAssembly.unshift(itemView)
        }

        state.pageAssembly = sortAssembly(pageAssembly)
        state.pageInfo = rest
      },
    )
  },
})

export const store = configureStore({
  reducer: designerSlice.reducer,
})

export const designerActions = designerSlice.actions

export const pageInfoState = (state: RootState) => state.designer.pageInfo

export const shopIdState = (state: RootState) => state.designer.pageInfo.shopId

export const pageAssemblyState = (state: RootState) =>
  state.designer.pageAssembly

export const currentSelectViewState = (state: RootState) =>
  state.designer.currentSelectView

export const currentDragState = (state: RootState) => state.designer.currentDrag

export const formJsonState = (state: RootState) => state.designer.formJson

export const currentMoveState = (state: RootState) =>
  state.designer.currentMoveView

export const formikIsValidState = (state: RootState) =>
  state.designer.formikIsValid

export const formikValidationState = (state: RootState) =>
  state.designer.formikValidation
export default designerSlice.reducer
