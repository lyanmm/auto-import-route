import React, { createElement, lazy } from 'react';
import { Route } from 'react-router-dom';
import type { ExportLazyModule, ExportSyncModule } from '@/type';

const PAGE_ROUTES = import.meta.glob('/src/pages/**/[a-z[]*.tsx');
const PAGE_ROUTES_Eager = import.meta.glob<true, string, ExportSyncModule>(
  '/src/pages/**/[a-z[]*.tsx',
  { eager: true }
);

const PRESERVED_ROUTES = import.meta.glob<true, string, ExportSyncModule>(
  '/src/pages/(_login|403).tsx',
  { eager: true }
);

export const pageRoutes = Object.keys(PAGE_ROUTES).flatMap((filePath) => {
  const path = filePath
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)]/, ':$1');
  // 对于纯菜单项，没有默认导出页面组件的，不加入路由
  if (!path.includes('components') && PAGE_ROUTES_Eager[filePath].default) {
    return [{ path, element: createElement(lazy(PAGE_ROUTES[filePath] as ExportLazyModule)) }];
  } else {
    return [];
  }
});

export const preservedRoutes = Object.keys(PRESERVED_ROUTES).map((route) => {
  const path = route.replace(/\/src\/pages\/|\.tsx$/g, '');
  return {
    path: path.includes('_') ? path.slice(1) : path,
    element: createElement(PRESERVED_ROUTES[route].default),
  };
});

export const transToRouteElement = (routes) => {
  return routes.map((route) => (
    <Route key={route.path} path={route.path} element={route.element} />
  ));
};
