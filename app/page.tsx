"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function Home() {
  const handleGoogleLogin = async () => {
    const { data, error } = await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
     if (error) {
      toast.error(error.message);
      return;
    }
  };

  return (
    <div >
      <Button onClick={handleGoogleLogin}>
        Login with Google
      </Button>
    </div>
  );
}
