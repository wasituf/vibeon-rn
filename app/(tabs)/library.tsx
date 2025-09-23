import { useAtomValue } from "jotai"
import { FlatList, Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { type HistoryItem, historyAtom } from "@/states/history"

export default function Library() {
  const history = useAtomValue(historyAtom) as HistoryItem[]

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="mb-16 flex-1 items-center justify-center"
    >
      <Text className="text-white">Library Tab</Text>
      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text className="text-foreground">
            {item.title} by {item.artist}
          </Text>
        )}
      />
    </SafeAreaView>
  )
}
