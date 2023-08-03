"use client"

import { SignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Page() {
  const { isSignedIn  } = useAuth()
  const router = useRouter()
  
  if (isSignedIn) {
    return router.push("/dashboard")
  } else {
    return <SignUp/>
  }
}