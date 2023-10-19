import { DragItemViewType, DragType } from './dragItemViewType'
import {
  Assembly,
  AssemblyParam,
  BaseComponentType,
  PageInfoPure,
} from './pageAssemblyTypes'
import { FormJson } from './formSchemaTypes'

export type ChangeIndexParam = {
  dragIndex: number
  hoverIndex: number
  itemView: Assembly
}

export type InsertByIndex = {
  index: number
  itemView: Assembly
}

export type DragItemView = {
  dragType: DragType
  dragViewType: DragItemViewType | string
}

export interface DesignComponent {
  values: AssemblyParam
  onlyCode: string | number
  isValid: boolean
}

export interface CurrentSelectView extends Assembly {
  index: number
}

export interface CurrentMoveView {
  onlyCode: string | number
  index: number
  id: string
}

export interface DesignerState {
  currentDrag: {
    dragType: DragType
    dragView: BaseComponentType
  }
  currentSelectView: CurrentSelectView
  pageInfo: PageInfoPure
  pageAssembly: Assembly[]
  formJson: FormJson
  formikIsValid: boolean
  formikValidation: Record<string, string | boolean>
  currentMoveView: CurrentMoveView
}
