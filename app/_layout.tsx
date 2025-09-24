import "@/global.css"
import { ThemeProvider } from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import YTDL from "expo-youtube-dl"
import { useAtomValue, useSetAtom } from "jotai"
import { useColorScheme } from "nativewind"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { SafeAreaProvider } from "react-native-safe-area-context"
import TrackPlayer, { type Track } from "react-native-track-player"
import { usePlayerEvents } from "@/hooks/usePlayerEvents"
import { NAV_THEME } from "@/lib/theme"
import {
  currentTrackIdAtom,
  playbackPositionAtom,
  playbackQueueAtom,
  playerLoadingAtom,
} from "@/states/player"

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router"

const queryClient = new QueryClient()
TrackPlayer.registerPlaybackService(() =>
  require("../services/TrackPlayerService"),
)

const AppSetup = () => {
  const { colorScheme } = useColorScheme()

  const setPlayerLoading = useSetAtom(playerLoadingAtom)
  const currentTrackId = useAtomValue(currentTrackIdAtom)
  const playbackQueue = useAtomValue(playbackQueueAtom)
  const playbackPosition = useAtomValue(playbackPositionAtom)

  usePlayerEvents()

  useEffect(() => {
    const initializeYoutubeDl = async () => {
      try {
        console.log("Initializing YoutubeDL...")
        await YTDL.initYoutubeDL()
        console.log("YoutubeDL is ready.")
      } catch (error: unknown) {
        const err = error as { code: string; message: string }
        console.error(err.code, err.message)
      }
    }

    initializeYoutubeDl()
  }, [])

  useEffect(() => {
    const setupPlayer = async () => {
      try {
        await TrackPlayer.setupPlayer()

        const queue = playbackQueue as Track[]
        const trackId = currentTrackId
        const position = playbackPosition as number

        if (queue && queue.length > 0) {
          await TrackPlayer.add(queue)
          if (trackId) {
            const trackIndex = queue.findIndex((t) => t.id === trackId)
            if (trackIndex !== -1) {
              await TrackPlayer.skip(trackIndex)
              if (position) {
                await TrackPlayer.seekTo(position)
              }
            }
          }
        }
      } catch (error) {
        console.error("Failed to set up player: ", error)
      } finally {
        setPlayerLoading(false)
      }
    }

    setupPlayer()
  }, [])

  return (
    <ThemeProvider value={NAV_THEME[colorScheme ?? "light"]}>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <PortalHost />
    </ThemeProvider>
  )
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <QueryClientProvider client={queryClient}>
          <AppSetup />
        </QueryClientProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  )
}
