import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import PublicLayout from "./src/stacks/PublicLayout";
import { UserInfo } from "./UserInfoContext";

export default function App() {
  const [user, setUser] = useState(undefined);

  return (
    <UserInfo.Provider
      value={{
        user,
        setUser,
      }}
    >
      <NavigationContainer>
        <PublicLayout />
      </NavigationContainer>
    </UserInfo.Provider>
  );
}
