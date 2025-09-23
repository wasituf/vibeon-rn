import { atom } from "jotai"
import { State, type Track } from "react-native-track-player"
import { atomWithMMKV } from "@/lib/atomWithMMKV"

// Persistent State 💾:
export const playbackQueueAtom = atomWithMMKV<Track[]>("playbackQueue", [])
export const currentTrackIdAtom = atomWithMMKV<string | undefined>(
  "currentTrackId",
  undefined,
)
export const playbackPositionAtom = atomWithMMKV<number>("playbackPosition", 0)

// Ephemeral State 👻:
export const playbackStateAtom = atom<State>(State.None)
export const trackDurationAtom = atom<number>(0)
export const currentTrackInfoAtom = atom<Track | undefined>(undefined)
export const playerLoadingAtom = atom<boolean>(true) // A general loading state for the player setup
