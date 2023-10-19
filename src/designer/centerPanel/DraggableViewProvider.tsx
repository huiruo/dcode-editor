import React from 'react'
import { BannerView } from '@/components/editor/BannerView'
import { DragItemViewType } from '@/types/dragItemViewType'
import { LocationView } from '@/components/editor/LocationView'
import { GridTempView } from '@/components/editor/GridTempView'
import { AdvertisingView } from '@/components/editor/AdvertisingView'
import { SearchBarView } from '@/components/editor/SearchBarView'
import { ProdRecommendView } from '@/components/editor/ProdRecommendView'
import { SecondsKillView } from '@/components/editor/SecondsKillView'
import { SpellGroupView } from '@/components/editor/SpellGroupView'
import { CouponsView } from '@/components/editor/CouponsView'
import { OrderActiveView } from '@/components/editor/OrderActiveView'
import { DiscountTimeView } from '@/components/editor/DiscountTimeView'
import { PointsMerchandiseView } from '@/components/editor/PointsMerchandiseView'
import { ExchangeView } from '@/components/editor/ExchangeView'
import { LevitationToolView } from '@/components/editor/LevitationToolView'
import { DesignCustormView } from '@/components/editor/DesignCustormView'
import { PaddingLineView } from '@/components/editor/PaddingLineView'
import { HotZoneView } from '@/components/editor/HotZoneView'
import { LiveStreamingView } from '@/components/editor/LiveStreamingView'
import { NoticeBarView } from '@/components/editor/NoticeBarView'
import { ShareBtnView } from '@/components/editor/ShareBtnView'
import { WeComView } from '@/components/editor/WeComView'
import { AssemblyInfo, AssemblyParam } from '@/types/pageAssemblyTypes'
import { DcodeMemberView } from '@/components/editor/DcodeMemberView'

export class DraggableViewProvider {
  static of(
    assemblyInfo: AssemblyInfo,
    assemblyParam: AssemblyParam,
    index: number,
    handleFormValue?: <T>(field: string, value: T) => void,
  ) {
    switch (assemblyInfo.id) {
      case DragItemViewType.DcodeBanner:
        return (
          <BannerView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeLocation:
        return (
          <LocationView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeGrid:
        return (
          <GridTempView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeMember:
        return (
          <DcodeMemberView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeAdvertising:
        return (
          <AdvertisingView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeSearchBar:
        return (
          <SearchBarView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )

      case DragItemViewType.DcodeProdRecomPro:
        return (
          <ProdRecommendView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeSecondsKill:
        return (
          <SecondsKillView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeSpellGroup:
        return (
          <SpellGroupView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeCoupons:
        return (
          <CouponsView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeOrderActive:
        return (
          <OrderActiveView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )

      case DragItemViewType.DcodeDiscountTime:
        return (
          <DiscountTimeView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodePointsMerchandise:
        return (
          <PointsMerchandiseView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeExchange:
        return (
          <ExchangeView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeLevitationTool:
        return (
          <LevitationToolView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeDesignCustorm:
        return (
          <DesignCustormView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )

      case DragItemViewType.DcodePaddingLine:
        return (
          <PaddingLineView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeHotZone:
        return (
          <HotZoneView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
            handleFormValue={handleFormValue}
          />
        )
      case DragItemViewType.DcodeLiveStreaming:
        return (
          <LiveStreamingView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeNoticeBar:
        return (
          <NoticeBarView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeShareBtn:
        return (
          <ShareBtnView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      case DragItemViewType.DcodeWeCom:
        return (
          <WeComView
            assemblyInfo={assemblyInfo}
            assemblyParam={assemblyParam}
            index={index}
          />
        )
      default:
        return null
    }
  }
}
