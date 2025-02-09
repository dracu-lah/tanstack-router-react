import axios from "axios";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
  ReactNode,
} from "react";

// Define types for the authentication state
interface AuthState {
  token: string | null;
  refreshToken: string | null;
  data: Record<string, any> | null;
}

// Define types for the action payload
interface SetTokenPayload {
  data: {
    accessToken: string;
    refreshToken: string;
    data: Record<string, any>;
  };
}

interface AuthAction {
  type: string;
  payload?: SetTokenPayload;
}

// Create the authentication context
const AuthContext = createContext<
  | (AuthState & {
      setToken: (newToken: SetTokenPayload) => void;
      clearToken: () => void;
    })
  | undefined
>(undefined);

// Define the possible actions for the authReducer
const ACTIONS = {
  setToken: "setToken",
  clearToken: "clearToken",
} as const;

// Helper function to set axios authorization header
const setAxiosAuthHeader = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Reducer function to handle authentication state changes
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case ACTIONS.setToken:
      if (action.payload) {
        const { accessToken, refreshToken, data } = action.payload.data;
        // Set the authentication tokens and data in local storage
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userData", JSON.stringify(data));
        // Set axios authorization header
        setAxiosAuthHeader(accessToken);
        // Update the state with the new tokens and data
        return { ...state, token: accessToken, refreshToken, data };
      }
      return state;
    case ACTIONS.clearToken:
      // Clear the authentication tokens and data from local storage
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userData");
      // Clear axios authorization header
      setAxiosAuthHeader(null);
      // Update the state by removing the tokens and data
      return { ...state, token: null, refreshToken: null, data: null };
    default:
      console.error(
        `You passed an action.type: ${action.type} which doesn't exist`,
      );
      return state;
  }
};

// Initial state for the authentication context
const initialData: AuthState = {
  token: localStorage.getItem("token"),
  refreshToken: localStorage.getItem("refreshToken"),
  data: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData")!)
    : null,
};

// AuthProvider component to provide the authentication context to children
interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // Use reducer to manage the authentication state
  const [state, dispatch] = useReducer(authReducer, initialData);

  // Effect to set axios authorization header on mount and when token changes
  useEffect(() => {
    setAxiosAuthHeader(state.token);
  }, [state.token]);

  // Function to set the authentication token
  const setToken = (newToken: SetTokenPayload) => {
    dispatch({ type: ACTIONS.setToken, payload: newToken });
  };

  // Function to clear the authentication token
  const clearToken = () => {
    dispatch({ type: ACTIONS.clearToken });
  };

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      ...state,
      setToken,
      clearToken,
    }),
    [state],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to easily access the authentication context
export const useAuth = (): AuthState & {
  setToken: (newToken: SetTokenPayload) => void;
  clearToken: () => void;
} => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export type AuthContextType = ReturnType<typeof useAuth>;
export default AuthProvider;
