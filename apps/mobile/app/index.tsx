import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { LoginScreen } from "@ebanking/screens";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();

  const handleLogin = async () => {
    await AsyncStorage.setItem("isAuthenticated", "true");
    router.replace("/(tabs)/dashboard");
  };

  // Disabled auto-redirect - require login each time
  // useEffect(() => {
  //   // Check if already authenticated
  //   AsyncStorage.getItem('isAuthenticated').then((value) => {
  //     if (value === 'true') {
  //       router.replace('/(tabs)/dashboard');
  //     }
  //   });
  // }, []);

  return <LoginScreen onLogin={handleLogin} />;
}
