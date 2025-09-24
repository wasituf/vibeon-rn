import InnerTube from "innertube"
import { Text, View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default function Home() {
  console.log(InnerTube.hello())
  return (
    <SafeAreaView
      edges={["right", "top", "left"]}
      className="mb-16 flex-1 items-center justify-center"
    >
      <Text className="text-white">Home Tab</Text>
    </SafeAreaView>
  )
}
