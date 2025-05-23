import DashBoard from "@/views/DashBoard";
import Turnstile from 'react-turnstile'
import { useState } from 'react'

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const handleToken = (token: string) => {
    setToken(token);
    console.log("Captcha token:", token);
  };

  return (
    <>
      {" "}
      <DashBoard captchaToken={token} />
      <Turnstile
        onSuccess={handleToken}
        sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
      />
    </>
  );
}
