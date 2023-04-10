// Import UserContext and useUserData
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

// Display website components and export it
export default function App({ Component, pageProps }) {
  const userData = useUserData();
  
  return (
    <main>
      {/* Set UserContext to current user data */}
      <UserContext.Provider value={ userData }>
        <Component {...pageProps} />
      </UserContext.Provider>
    </main>
  );
}
