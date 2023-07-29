import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Conferences from "../screens/Conferences";
import Details from "../screens/Details";

const ConferencesStackScreen = () => {
  const ConferencesStack = createNativeStackNavigator();
  return (
    <ConferencesStack.Navigator>
      <ConferencesStack.Screen
        options={{ headerShown: false }}
        name="Conferencias"
        component={Conferences}
      />
      <ConferencesStack.Screen name="Detalles" component={Details} />
    </ConferencesStack.Navigator>
  );
};

export default ConferencesStackScreen;
