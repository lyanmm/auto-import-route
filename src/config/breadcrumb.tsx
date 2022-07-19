import type { Location } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { formatPath, getKey } from '@/utils';
import { Breadcrumb } from '@arco-design/web-react';
import type { ExportSyncModule } from '@/type';

const PAGE_METAS = import.meta.glob<true, string, ExportSyncModule>('/src/pages/**/[a-z[]*.tsx', {
  eager: true,
});

interface BreadcrumbItem {
  hasDefault: boolean;
  path: string;
  meta: {
    title: string | string[];
    [key: string]: any;
  };
}

const getBreadcrumbMetas = (PAGE_METAS): BreadcrumbItem[] => {
  const metas = [];
  Object.keys(PAGE_METAS).forEach((filePath) => {
    const path = filePath
      .replace(/\/src\/pages|index|\.tsx$/g, '')
      .replace(/\[\.{3}.+]/, '*')
      .replace(/\[(.+)]/, ':$1');
    // 过滤掉路劲中包含 components 的路径
    if (!filePath.includes('components')) {
      metas.push({
        hasDefault: Boolean(PAGE_METAS[filePath].default),
        path: formatPath(path),
        meta: PAGE_METAS[filePath].meta,
      });
    }
  });
  return metas;
};

export const breadcrumbRoutes = getBreadcrumbMetas(PAGE_METAS);

export const routesToBreadcrumbConfig = (routes: BreadcrumbItem[], location: Location) => {
  const breadcrumbConfig = [];
  const pathnamePieces = location.pathname.match(/\/[-\w]*/g);
  let currentPath = '';
  pathnamePieces.forEach((pathnamePiece) => {
    currentPath += pathnamePiece;
    const matchedRoute = routes.find((route) => route.path === currentPath);
    if (matchedRoute) {
      breadcrumbConfig.push({
        ...matchedRoute,
        path: matchedRoute.hasDefault ? matchedRoute.path + location.search : '',
        title: matchedRoute.meta.title.toString(),
      });
    }
  });
  return breadcrumbConfig;
};

export const renderBreadcrumb = (breadcrumbConfig: BreadcrumbItem[]) => {
  return breadcrumbConfig.map((breadcrumb) => {
    const {
      path,
      meta: { title },
    } = breadcrumb;
    return (
      <Breadcrumb.Item key={getKey(breadcrumb)}>
        {path ? <Link to={path}>{title}</Link> : title}
      </Breadcrumb.Item>
    );
  });
};
