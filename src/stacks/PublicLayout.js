import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Tabs from "../Tabs";
import RegisterUser from "../screens/RegisterUser";
import Login from "../screens/Login";

const PublicLayout = () => {
  const PublicStack = createNativeStackNavigator();
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}
    >
      <PublicStack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <PublicStack.Screen
        options={{ headerShown: false }}
        name="Crear Cuenta"
        component={RegisterUser}
      />
      <PublicStack.Screen
        options={{ headerShown: false }}
        name="Tabs"
        component={Tabs}
      />
    </PublicStack.Navigator>
  );
};

export default PublicLayout;
