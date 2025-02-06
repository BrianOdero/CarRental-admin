import { useAuth } from "@/provider/AuthProvider";
import { Slot, Stack, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {


  const {session, initialized} = useAuth()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    if (!initialized) return

    const InAuthGroup = segments[0] === "(auth)" as any

    if(session && !InAuthGroup) {
      //redirect authenticated users to the home page
      router.replace('/(auth)/index' as any)
    }

    else if(!session && InAuthGroup) {
      router.replace('/')
    }
    
  }, [session, initialized])
  

  return <Slot/>
}
