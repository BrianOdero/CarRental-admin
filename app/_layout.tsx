import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: "Admin Home Page"
      }} />
      <Stack.Screen name="addVehicle" />
      <Stack.Screen name="seeLogs"/>
      <Stack.Screen name="currentVehicle"/>
    </Stack>
  )
}
