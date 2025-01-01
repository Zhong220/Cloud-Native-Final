import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // 確保標題隱藏
        }}
      />
      <Stack.Screen name="addbill" options={{ title: "Add Bill" }} />
    </Stack>
  );
};

export default Layout;
