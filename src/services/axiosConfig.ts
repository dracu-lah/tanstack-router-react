import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { RefreshAPI } from "./api";

/**
 * Interface for the refresh token API response
 */
interface RefreshTokenResponse {
  accessToken: string;
}

/**
 * Interface for the refresh token request payload
 */
interface RefreshTokenRequest {
  refreshToken: string;
  accessToken: string;
}

/**
 * Flag to track if a token refresh attempt is in progress
 */
let isRefreshing = false;

/**
 * Refreshes the access token using the refresh token stored in localStorage
 * @returns Promise<string | null> - Returns the new access token or null if refresh fails
 */
const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("token");

    if (!refreshToken || !accessToken) {
      throw new Error("No refresh or access token found");
    }

    const payload: RefreshTokenRequest = { refreshToken, accessToken };
    const response = await RefreshAPI(payload);
    const newAccessToken = response.data.accessToken;

    // Store the new access token in localStorage
    localStorage.setItem("token", newAccessToken);

    // Update the default authorization header for axios
    axios.defaults.headers.common["Authorization"] = `Bearer ${newAccessToken}`;

    return newAccessToken;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "Error refreshing token:",
      axiosError.response?.data || axiosError.message,
    );

    // Clear localStorage and refresh the window on token refresh failure
    setTimeout(() => {
      localStorage.clear();
      window.location.reload();
    }, 2 * 1000);

    return null;
  }
};

/**
 * Extended type for Axios request config to include retry flag
 */
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Axios response interceptor configuration
 * Handles:
 * - 401 errors by attempting to refresh the token and retrying the request
 * - 403 errors by clearing the session and reloading the page
 */
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    // Handle 401 Unauthorized errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      const newAccessToken = await refreshToken();
      isRefreshing = false;

      if (newAccessToken && originalRequest.headers) {
        // Update the authorization header and retry the original request
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    // Handle 403 Forbidden errors
    if (error.response?.status === 403) {
      setTimeout(() => {
        localStorage.clear();
        window.location.reload();
      }, 2 * 1000);
    }

    return Promise.reject(error);
  },
);

export default axios;
