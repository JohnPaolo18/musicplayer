import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/screens/LoginScreen";
import PlayerScreen from "./src/screens/PlayerScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Optional: hides the navigation bar on the login screen
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{ title: "Music Player" }} // Set the title for your player screen or use `headerShown: false` to hide
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
