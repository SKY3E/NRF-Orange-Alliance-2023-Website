// Import createContext from react and export UserContext which stores current user data
import { createContext } from "react";
export const UserContext = createContext({ user: null, username: null });