import { useSetAtom } from "jotai"
import { useEffect } from "react"
import TrackPlayer, {
  Event,
  type Track,
  useProgress,
  useTrackPlayerEvents,
} from "react-native-track-player"
import {
  currentTrackIdAtom,
  currentTrackInfoAtom,
  playbackPositionAtom,
  playbackStateAtom,
  trackDurationAtom,
} from "@/states/player"

export const usePlayerEvents = () => {
  const setCurrentTrackInfo = useSetAtom(currentTrackInfoAtom)
  const setCurrentTrackId = useSetAtom(currentTrackIdAtom)
  const setPlaybackState = useSetAtom(playbackStateAtom)
  const setPlaybackPosition = useSetAtom(playbackPositionAtom)
  const setTrackDuration = useSetAtom(trackDurationAtom)

  const { position, duration } = useProgress()

  useEffect(() => {
    setPlaybackPosition(position)
    setTrackDuration(duration)
  }, [position, duration, setPlaybackPosition, setTrackDuration])

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], async (event) => {
    if (event.track) {
      const track = event.track as Track
      setCurrentTrackInfo(track)
      setCurrentTrackId(track?.id)
      setTrackDuration(track?.duration || 0)
    }
  })

  useTrackPlayerEvents([Event.PlaybackState], (event) => {
    setPlaybackState(event.state)
  })
}
