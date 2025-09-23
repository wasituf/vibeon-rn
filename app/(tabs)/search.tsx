import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { useQuery } from "@tanstack/react-query"
import {
  LucideAudioWaveform,
  LucideLibrary,
  LucideX,
} from "lucide-react-native"
import { useColorScheme } from "nativewind"
import { useState } from "react"
import { FlatList, Pressable, Text, TextInput, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import ResultCard from "@/components/ResultCard"
import { Button } from "@/components/ui/button"
import { searchResultTypes } from "@/lib/constants"
import { THEME } from "@/lib/theme"
import { searchDefault } from "@/queries/search"

export default function Search() {
  const { colorScheme } = useColorScheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [submittedSearch, setSubmittedSearch] = useState("")

  const {
    data: results,
    isError,
    error,
    isFetching,
  } = useQuery({
    queryKey: ["search", submittedSearch],
    queryFn: () => searchDefault(submittedSearch),
    enabled: !!submittedSearch,
  })

  // TODO: implement filter functionality integrating with queries
  const [selectedFilter, setSelectedFilter] = useState<string>("all")

  const handleSearchSubmit = async () => {
    setSubmittedSearch(searchTerm.trim())
  }

  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="mb-16 flex-1 items-start justify-start gap-2"
    >
      {/* Temp search bar */}
      <View className="mx-2 flex-row gap-0.5">
        <Pressable
          onPress={() => console.log("go back")}
          className="h-11 w-11 items-center justify-center rounded-full"
        >
          <MaterialIcons
            name="arrow-back"
            size={24}
            color={
              colorScheme === "dark"
                ? THEME.dark.accentForeground
                : THEME.light.accentForeground
            }
          />
        </Pressable>
        <View className="flex-1 flex-row gap-2">
          <TextInput
            // value={searchTerm}
            enterKeyHint="search"
            placeholder="Search for music on YouTube..."
            value={searchTerm}
            onChangeText={(text) => setSearchTerm(text)}
            onSubmitEditing={handleSearchSubmit}
            className="h-11 flex-1 rounded-full bg-card px-4 text-white placeholder:text-muted-foreground"
          />
          <Button
            variant="default"
            size="icon"
            onPress={() => console.log("Search in local library")}
            className="h-11 w-11 rounded-full"
          >
            <LucideAudioWaveform
              size={24}
              color={
                colorScheme === "dark"
                  ? THEME.dark.accentForeground
                  : THEME.light.accentForeground
              }
            />
          </Button>
          <Button
            variant="default"
            size="icon"
            onPress={() => console.log("Search in local library")}
            className="h-11 w-11 rounded-full"
          >
            <LucideLibrary
              size={24}
              color={
                colorScheme === "dark"
                  ? THEME.dark.accentForeground
                  : THEME.light.accentForeground
              }
            />
          </Button>
        </View>
      </View>

      <View className="mx-3 my-2 h-8 flex-row items-center justify-start gap-1">
        {selectedFilter !== "all" && (
          <Pressable className="h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <LucideX size={24} color="hsl(0 0% 11%)" />
          </Pressable>
        )}
        <FlatList
          data={searchResultTypes}
          horizontal={true}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <Pressable
              className={`mx-1 items-center justify-center rounded-lg border border-border px-2 py-1 active:bg-primary/10 ${selectedFilter === item ? "h-8 bg-primary" : "bg-card"}`}
            >
              <Text
                className={`text-sm capitalize ${selectedFilter === item ? "text-card" : "text-foreground"}`}
              >
                {item.split("_").join(" ") + "s"}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {results && (
        <FlatList
          data={results}
          keyExtractor={(item) => item.resultId}
          contentContainerClassName={`w-full items-start justify-center gap-2 border-border px-2`}
          renderItem={({ item }) => <ResultCard result={item} />}
        />
      )}
    </SafeAreaView>
  )
}
