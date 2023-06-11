import { HomeScreen } from "./screens/HomeScreen/HomeScreen";
import { MaterialIcons } from "@expo/vector-icons";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { TagScreen } from "./screens/TagScreen/TagScreen";
import { TagProvider } from "./context/tagProvider";
import { StatisticScreen } from "./screens/StatisticScreen/StatisticScreen";
import { SessionProvider } from "./context/sessionProvider";
import { DatabaseProvider } from "./context/databaseProvider";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <DatabaseProvider>
      <SessionProvider>
        <NavigationContainer>
          <TagProvider>
            <Drawer.Navigator initialRouteName="Home">
              <Drawer.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  drawerIcon: ({ color }) => (
                    <MaterialIcons name="home" size={24} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Tags"
                component={TagScreen}
                options={{
                  drawerIcon: ({ color }) => (
                    <MaterialIcons name="label" size={24} color={color} />
                  ),
                }}
              />
              <Drawer.Screen
                name="Statistics"
                component={StatisticScreen}
                options={{
                  drawerIcon: ({ color }) => (
                    <MaterialIcons
                      name="multiline-chart"
                      size={24}
                      color={color}
                    />
                  ),
                }}
              />
            </Drawer.Navigator>
          </TagProvider>
        </NavigationContainer>
      </SessionProvider>
    </DatabaseProvider>
  );
}
