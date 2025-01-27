/**
 * Environment type for the application
 */
type Environment = "production" | "demo" | "testing" | "development";

/**
 * Configuration interface for API URLs
 */
interface APIConfig {
  production: string;
  demo: string;
  testing: string;
  development: string;
}

/**
 * API base URLs for different environments
 */
const API_URLS: APIConfig = {
  production: import.meta.env.VITE_PRODUCTION_API_URL,
  demo: import.meta.env.VITE_DEMO_API_URL,
  testing: import.meta.env.VITE_TESTING_API_URL,
  development: import.meta.env.VITE_DEVELOPMENT_API_URL,
} as const;

/**
 * Gets the current environment from Vite's environment variables
 * Defaults to 'development' if not specified
 */
const getCurrentEnvironment = (): Environment => {
  const env = import.meta.env.VITE_NODE_ENV || "development";
  return env as Environment;
};

/**
 * Determines and exports the base URL based on the current environment
 */
export const baseURL = API_URLS[getCurrentEnvironment()];

/**
 * Helper function to validate if all required environment variables are set
 * @throws {Error} If any required environment variable is missing
 */
const validateEnvironmentVariables = () => {
  const currentEnv = getCurrentEnvironment();
  if (!API_URLS[currentEnv]) {
    throw new Error(
      `Missing API URL configuration for environment: ${currentEnv}. ` +
        `Please check your .env file and ensure VITE_${currentEnv.toUpperCase()}_API_URL is set.`,
    );
  }
};

// Run validation during initialization
validateEnvironmentVariables();
