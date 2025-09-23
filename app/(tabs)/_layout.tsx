import { Tabs } from "expo-router"
import {
  LucideHome,
  LucideLibrary,
  LucideSearch,
  LucideSettings2,
} from "lucide-react-native"
import CustomTabBar from "@/components/CustomTabBar"

export default function TabLayout() {
  return (
    <>
      <Tabs
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={{ tabBarStyle: { borderTopWidth: 0, elevation: 0 } }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <LucideHome size={20} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color }) => <LucideSearch size={20} color={color} />,
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: "Library",
            tabBarIcon: ({ color }) => (
              <LucideLibrary size={20} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <LucideSettings2 size={20} color={color} />
            ),
            headerShown: false,
          }}
        />
      </Tabs>
    </>
  )
}
