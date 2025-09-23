import type { Track } from "react-native-track-player"
import { atomWithMMKV } from "@/lib/atomWithMMKV"

export type HistoryItem = Track & {
  downloadUrl: string
  timestamp: number
}

export const historyAtom = atomWithMMKV<HistoryItem[]>("listenHistory", [])
