import { tokenHandlers } from './tokenHandlers';

const PUBLIC_ROUTES = ['/login', '/register'];

export const setupInterceptors = (api) => {
  api.interceptors.request.use(
    async (config) => {
      const isPublicRoute = PUBLIC_ROUTES.some(route => config.url.endsWith(route));
      if (isPublicRoute) return config;

      return tokenHandlers.handleRequestToken(config);
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => tokenHandlers.handleResponseError(error, api)
  );
};
