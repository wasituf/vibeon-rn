import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import * as Haptics from "expo-haptics"
import { Image } from "expo-image"
import { LinearGradient } from "expo-linear-gradient"
import { useAtomValue } from "jotai"
import { useColorScheme } from "nativewind"
import { Pressable, Text, View } from "react-native"
import TrackPlayer, { State } from "react-native-track-player"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { THEME } from "@/lib/theme"
import {
  currentTrackInfoAtom,
  playbackPositionAtom,
  playbackStateAtom,
  playerLoadingAtom,
  trackDurationAtom,
} from "@/states/player"

export default function Player() {
  const { colorScheme } = useColorScheme()

  const currentTrackInfo = useAtomValue(currentTrackInfoAtom)
  const isTrackLoading = useAtomValue(playerLoadingAtom)
  const playbackState = useAtomValue(playbackStateAtom)
  const trackDuration = useAtomValue(trackDurationAtom)
  const trackProgress = useAtomValue(playbackPositionAtom) as number

  const isPlaying = playbackState === State.Playing
  const isBuffering = playbackState === State.Buffering

  const handlePlayPause = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Rigid)
    if (isPlaying) {
      await TrackPlayer.pause()
    } else {
      await TrackPlayer.play()
    }
  }

  const handleNextSong = async () => {
    await TrackPlayer.skipToNext()
  }

  const handlePreviousSong = async () => {
    await TrackPlayer.skipToPrevious()
  }

  const progressPercentage =
    trackDuration > 0 ? Math.round((trackProgress / trackDuration) * 100) : 0

  return (
    <View className="flex w-full items-end justify-center bg-card">
      <View className="flex w-full flex-row items-center justify-between gap-4 p-2 pl-4">
        <View className="flex flex-1 flex-row items-center justify-start gap-2 overflow-hidden">
          {/* Thumbnail */}
          {isBuffering || isTrackLoading ? (
            <Skeleton className="h-12 w-12 rounded-sm" />
          ) : (
            <Image
              source={currentTrackInfo?.artwork}
              contentFit="cover"
              style={{
                width: 48,
                height: 48,
                backgroundColor: "black",
                borderRadius: 4,
              }}
            />
          )}

          {/* Song Info */}
          <View className="items-start justify-center gap-0.5">
            <Text className="whitespace-nowrap text-left font-medium text-white">
              {currentTrackInfo?.title}
            </Text>
            <Text className="whitespace-nowrap text-center text-muted-foreground">
              {currentTrackInfo?.artist}
            </Text>
          </View>

          <LinearGradient
            colors={[
              "transparent",
              colorScheme === "dark" ? THEME.dark.card : THEME.light.card,
            ]}
            start={[0, 1]}
            end={[1, 1]}
            className="absolute right-0 bottom-0 h-full w-8"
          />
        </View>

        <View>
          <Pressable
            className="ml-2 h-11 w-11 items-center justify-center rounded-full active:bg-primary/10"
            onPress={handlePlayPause}
          >
            {isPlaying ? (
              <MaterialIcons
                name="pause"
                size={28}
                color="white"
                className="h-7 w-7"
              />
            ) : (
              <MaterialIcons
                name="play-arrow"
                size={28}
                color="white"
                className="h-7 w-7"
              />
            )}
          </Pressable>
        </View>
      </View>

      <Progress
        value={progressPercentage}
        className="h-0.5 rounded-full bg-border"
      />
    </View>
  )
}
