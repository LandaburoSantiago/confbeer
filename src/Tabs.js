import React, { useContext, useEffect } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ConferencesStackScreen from "./stacks/ConferencesStackScreen";
import { NavigationContainer } from "@react-navigation/native";
import Maps from "./screens/Maps";
import { Ionicons } from "@expo/vector-icons";
import { UserInfo } from "../UserInfoContext";
import { useNavigation } from "@react-navigation/native";

const Tabs = () => {
  const Tab = createBottomTabNavigator();
  const { user } = useContext(UserInfo);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login");
    }
  }, [user]);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconNombre;
            if (route.name === "Conferenciass") {
              iconNombre = focused ? "home" : "home-outline";
            } else if (route.name === "Mapa") {
              iconNombre = focused ? "location-sharp" : "location-outline";
            }
            return <Ionicons name={iconNombre} size={30} color="#000" />;
          },
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarStyle: {},
        })}
      >
        <Tab.Screen
          options={{ headerShown: false }}
          name="Conferenciass"
          component={ConferencesStackScreen}
        />
        <Tab.Screen
          options={{ headerShown: false }}
          name="Mapa"
          component={Maps}
        />
      </Tab.Navigator>
    </>
  );
};

export default Tabs;
