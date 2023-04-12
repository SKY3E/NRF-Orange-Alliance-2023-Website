// Import UserContext and useUserData
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
// Import website components
import SideBar from '../components/SiteComponents/SideBar';
import NavBar from '../components/SiteComponents/NavBar';
// Import Tailwind CSS Framework
import 'tailwindcss/tailwind.css';
// Import and create a font variable
import { Signika_Negative } from "next/font/google";
const signikaNegative = Signika_Negative({ 
  weight: ['400', '600', '700'], 
  subsets: ['latin'], 
  variable: '--font-signikaNegative',
});

// Display website components and export it
export default function App({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <main className={`${signikaNegative.variable} font-sans`}>
      {/* Set UserContext to current user data */}
      <UserContext.Provider value={ userData }>
        <NavBar />
        <SideBar />
        <Component {...pageProps} />
      </UserContext.Provider>
    </main>
  );
}
