import { endsWith } from 'lodash';

export const getPathLevel = (path: string) => {
  return path.split(/[-\w]*/).length - 1;
};
export const formatPath = (path) => {
  return endsWith(path, '/') && path !== '/' ? path.slice(0, -1) : path;
};
export const getKey = (route) => {
  return route?.meta?.key || route?.meta?.title || route.path;
};
