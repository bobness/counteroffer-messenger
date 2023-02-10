import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { AuthUser } from "./src/types";
import CurrentUserContext from "./src/contexts/CurrentUserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

const Stack: any = createNativeStackNavigator();

export default function App() {
  const navigationRef = useNavigationContainerRef<any>();
  const [navigationIsReady, setNavigationIsReady] = useState(false);
  const [user, setUser] = useState<AuthUser | undefined>();
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      setUserLoading(true);
      AsyncStorage.getItem("@user")
        .then((userInfo) => {
          if (userInfo) {
            const storedUserInfo = JSON.parse(userInfo);
            setUser(storedUserInfo);
            navigationRef.navigate("Home");
          }
        })
        .finally(() => setUserLoading(false));
    }
  }, [user]);

  return (
    <CurrentUserContext.Provider value={user}>
      <NavigationContainer
        ref={navigationRef}
        onReady={() => setNavigationIsReady(true)}
      >
        <Stack.Navigator initialRouteName={"Loading"} initialRouteParams={{}}>
          <Stack.Screen name="Loading" options={{ headerShown: false }}>
            {(props: any) => (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  padding: 10,
                }}
              >
                <ActivityIndicator />
              </View>
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: true }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CurrentUserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
