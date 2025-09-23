import {
  BottomTabBar,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs"
import { StyleSheet, View } from "react-native"
import Player from "@/components/Player"

type Props = BottomTabBarProps

export default function CustomTabBar(props: Props) {
  return (
    <View className="absolute bottom-0 w-full bg-transparent">
      <Player />
      <BottomTabBar {...props} />
    </View>
  )
}
