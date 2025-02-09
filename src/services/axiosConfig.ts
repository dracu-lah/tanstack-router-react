import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { RefreshAPI } from "./api";

/**
 * Interface for refresh token API response
 */
interface RefreshTokenResponse {
  accessToken: string;
}

/**
 * Queue to hold pending requests while refreshing the token
 */
let refreshTokenPromise: Promise<string | null> | null = null;

/**
 * Refreshes the access token using the refresh token stored in localStorage
 */
const refreshToken = async (): Promise<string | null> => {
  if (!refreshTokenPromise) {
    refreshTokenPromise = (async () => {
      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const accessToken = localStorage.getItem("token");

        if (!refreshToken || !accessToken) throw new Error("No tokens found");

        const { data } = await RefreshAPI({ refreshToken, accessToken });
        localStorage.setItem("token", data.accessToken);
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${data.accessToken}`;

        return data.accessToken;
      } catch (error) {
        console.error("Token refresh failed:", error);
        localStorage.clear();
        window.location.reload();
        return null;
      } finally {
        refreshTokenPromise = null; // Reset promise after refresh attempt
      }
    })();
  }

  return refreshTokenPromise;
};

/**
 * Extended Axios request config to include retry flag
 */
interface ExtendedAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

/**
 * Axios response interceptor for handling token expiration
 */
axios.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshToken();

      if (newAccessToken && originalRequest.headers) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      }
    }

    if (error.response?.status === 403) {
      localStorage.clear();
      window.location.reload();
    }

    return Promise.reject(error);
  },
);

export default axios;
