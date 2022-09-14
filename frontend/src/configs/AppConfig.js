
import { env } from "./EnvironmentConfig";

export const APP_NAME = "SPA";
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const APP_PREFIX_PATH = "/app";
export const AUTH_PREFIX_PATH = "/auth";
export const DASHBOARD_PREFIX_PATH = "/dashboard";

export const ROLES = {
  USER: 'USER',
  ADMIN: 'ADMIN',
};

export const ERROR_MESSAGES = {
  NETWORK_CONNECTIVITY: "No response from server",
}