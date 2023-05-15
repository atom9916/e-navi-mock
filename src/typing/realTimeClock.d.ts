// パスのエラー解消のため、一旦作成したが、良く解っていないため後ほど考慮。

import { Ref } from 'vue'

export interface RealTimeClockData {
  currentDate: Ref<string>
  currentTime: Ref<string>
}

declare const RealTimeClock: RealTimeClockComponent
export default RealTimeClock
