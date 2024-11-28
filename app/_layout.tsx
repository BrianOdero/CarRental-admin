import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{
        headerTitle: "Admin Home Page",
        headerShown: false
      }} />
      <Stack.Screen name="addVehicle" />
      <Stack.Screen name="seeLogs" options={{headerTitle: "System Logs"}}/>
      <Stack.Screen name="currentVehicle" options={{headerTitle: "Current Vehicles"}}/>
    </Stack>
  )
}
