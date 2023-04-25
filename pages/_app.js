// Import UserContext and useUserData
import { UserContext } from "../lib/context";
import { useUserData } from "../lib/hooks";
// Import website components
import Navigation from "@/components/SiteComponents/Navigation";
// Import Tailwind CSS Framework
import "tailwindcss/tailwind.css";
import '../styles/globals.css'
// Import and create a font variable
import { Signika_Negative } from "next/font/google";
const signikaNegative = Signika_Negative({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-signikaNegative",
});

// Display website components and export it
export default function App({ Component, pageProps }) {
  const userData = useUserData();

  return (
    <main className={`${signikaNegative.variable} font-sans`}>
      {/* Set UserContext to current user data */}
      <UserContext.Provider value={userData}>
        <Navigation />
        <Component {...pageProps} />
      </UserContext.Provider>
    </main>
  );
}
