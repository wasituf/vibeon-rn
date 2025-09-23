import { Image } from "expo-image"
import { useAtomValue } from "jotai"
import {
  LucideAudioLines,
  LucideEllipsisVertical,
  LucideView,
} from "lucide-react-native"
import { Pressable, Text, View } from "react-native"
import TrackPlayer from "react-native-track-player"
import { usePlayTrack } from "@/hooks/usePlayTrack"
import type { SearchResult } from "@/lib/constants"
import { currentTrackInfoAtom } from "@/states/player"

type Props = {
  result: SearchResult
}
export default function ResultCard({ result }: Props) {
  const { playTrack, isPending } = usePlayTrack()
  const currentTrackInfo = useAtomValue(currentTrackInfoAtom)

  const isCurrentTrack =
    result.videoId === currentTrackInfo?.id?.videoId || false

  const handlePress = () => {
    if (isCurrentTrack) {
      TrackPlayer.seekTo(0)
      TrackPlayer.play()
    } else {
      if (result.resultType === "song" || result.resultType === "video") {
        playTrack(result.videoId, result?.thumbnails?.at(-1)?.url as string)
      }
    }
  }

  const handleLongPress = () => {
    // TODO: implement info popup/drawer functionality

    console.log("Long pressedddd")
  }

  return (
    <Pressable
      onPress={handlePress}
      onLongPress={handleLongPress}
      className="w-full flex-row items-center justify-center gap-4 rounded-md p-2 pr-0 active:bg-primary/10"
    >
      <View className="relative">
        {isCurrentTrack && (
          <View className="absolute z-10 h-12 w-12 rounded-sm bg-black/60">
            <View className="-translate-x-1/2 -translate-y-1/2 absolute top-[50%] left-[50%] z-20">
              <LucideAudioLines size={24} color="white" />
            </View>
          </View>
        )}
        <Image
          source={result?.thumbnails?.at(-1)?.url}
          contentFit="contain"
          style={{
            width: 48,
            height: 48,
            backgroundColor: "black",
            borderRadius: result.resultType === "artist" ? 9999 : 4,
          }}
        />
      </View>
      <View className="items-between flex-1 justify-start gap-0.5">
        <Text className="font-medium text-foreground">
          {result.resultType === "artist" ? result.artist : result.title}
        </Text>
        {result.resultType === "song" ? (
          <Text className="text-muted-foreground">
            Song • {result.artists ? result.artists[0].name : result.artist}
            {result.duration !== null && " • " + result.duration}
            {result.views && " • " + result.views + " plays"}
          </Text>
        ) : result.resultType === "video" ? (
          <Text className="text-muted-foreground">
            Video • {result.artists && result.artists[0].name}
            {result.duration !== null && " • " + result.duration}{" "}
          </Text>
        ) : (
          <></>
        )}
      </View>
      <Pressable
        style={{ height: 48 }}
        className="w-10 items-center justify-center"
      >
        <LucideEllipsisVertical size={24} color="white" />
      </Pressable>
    </Pressable>
  )
}
