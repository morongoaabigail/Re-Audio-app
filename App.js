import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Landing from "./Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Recording from "./components/Recording";
import Profile from "./components/Profile";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { CartProvider } from "./Manager/CartManager";

export default function App() {
  const Stack = createStackNavigator();

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
              <Stack.Screen
                name="Landing"
                component={Landing}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Register"
                component={Register}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Recording"
                component={Recording}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </View>
    </SafeAreaProvider>
  );
}
