import { useMutation } from "@tanstack/react-query"
import { useAtomValue, useSetAtom } from "jotai"
import TrackPlayer from "react-native-track-player"
import { resolveTrack } from "@/queries/resolve"
import { type HistoryItem, historyAtom } from "@/states/history"
import { currentTrackInfoAtom, playerLoadingAtom } from "@/states/player"

export const usePlayTrack = () => {
  const setPlayerLoading = useSetAtom(playerLoadingAtom)
  const setCurrentTrackInfo = useSetAtom(currentTrackInfoAtom)
  const setHistory = useSetAtom(historyAtom)
  const history = useAtomValue(historyAtom) as HistoryItem[]

  const { mutate, isPending } = useMutation({
    mutationFn: resolveTrack,
    onSuccess: async (data, { videoId, thumbnail }) => {
      if (!data?.downloadUrl) {
        return
      }

      // First, pause the current track and clear the queue
      await TrackPlayer.reset()

      // Add the new track to the player's queue
      const track = {
        url: data.downloadUrl,
        title: data.title,
        artist: data.uploader,
        artwork: thumbnail,
        duration: data.duration,
        date: data.uploadDate,
        id: videoId,
      }

      await TrackPlayer.add([track])

      // Set the global state for the currently playing track
      setCurrentTrackInfo({
        ...track,
        duration: data.duration,
      })

      // Start playback and set loading state to false
      await TrackPlayer.play()
      setPlayerLoading(false)

      // Add the newly played track to the history atom
      setHistory((prevHistory: HistoryItem[]) => {
        const newHistory = [{ ...track, timestamp: Date.now() }, ...prevHistory]
        return newHistory.slice(0, 500)
      })
    },
    onError: (err) => {
      setPlayerLoading(false)
      console.error("Failed to resolve track:", err)
      // TODO: Display an error message to the user
    },
  })

  const playTrack = async (videoId: string, thumbnail: string) => {
    // Set loading state to true
    setPlayerLoading(true)

    const existingTrack = history.find((track) => track.id === videoId)

    if (existingTrack) {
      // Move the existing track to the top of history
      setHistory((prevHistory: HistoryItem[]) => {
        const filteredHistory = prevHistory.filter(
          (item) => item !== existingTrack,
        )
        return [existingTrack, ...filteredHistory]
      })

      console.log("Playing track from history:", existingTrack.title)
      const track = {
        url: existingTrack.url,
        title: existingTrack.title,
        artist: existingTrack.artist,
        artwork: existingTrack.artwork,
        duration: existingTrack.duration,
        date: existingTrack.uploadDate,
        id: existingTrack.id,
      }
      await TrackPlayer.reset()
      await TrackPlayer.add([track])
      setCurrentTrackInfo(track)
      await TrackPlayer.play()
      setPlayerLoading(false)
    } else {
      mutate({ videoId, thumbnail })
    }
  }
  return { playTrack, isPending }
}
