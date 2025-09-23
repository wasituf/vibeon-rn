import { requireNativeModule } from "expo-modules-core"
import { useState } from "react"
import { Pressable, Text, View } from "react-native"

export default function Settings() {
  const ExpoYoutubeDl = requireNativeModule("ExpoYoutubeDl")
  const [totalTime, setTotalTime] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const fetchSongs = async () => {
    try {
      setIsLoading(true)
      const start = performance.now()
      const values = await Promise.all([
        ExpoYoutubeDl.getVideoInfo(
          "https://youtu.be/dQw4w9WgXcQ?si=J7IVk54Mfv6JZ2lO",
        ),
        ExpoYoutubeDl.getVideoInfo(
          "https://youtu.be/dQw4w9WgXcQ?si=J7IVk54Mfv6JZ2lO",
        ),
      ])
      const end = performance.now()
      setIsLoading(false)

      setTotalTime(`${end - start} ms`)
    } catch (error: unknown) {
      const err = error as { code: string; message: string }
      console.error(err.code, err.message)
    }
  }
  return (
    // TODO: make settings page a different nav stack
    <View className="flex-1 items-center justify-center">
      <Text className="text-white">Settings Tab</Text>
      <Pressable
        onPress={fetchSongs}
        className="h-10 items-center justify-center rounded-full bg-white px-4"
      >
        <Text className="text-black">Fetch Songs</Text>
      </Pressable>
      {isLoading ? (
        <Text className="mt-10 text-white">Loading...</Text>
      ) : (
        <Text className="mt-10 text-white">{totalTime}</Text>
      )}
    </View>
  )
}
