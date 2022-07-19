import { cloneDeep, isString } from 'lodash';
import { formatPath, getKey, getPathLevel } from '@/utils';
import { Menu } from '@arco-design/web-react';
import { Link } from 'react-router-dom';
import type { ExportSyncModule } from '@/type';

interface PathItem {
  path: string;
  meta: {
    title: string;
    [k: string]: any;
  };
}

interface MenuItem extends PathItem {
  next?: MenuItem[];
}

const PAGE_METAS = import.meta.glob<true, string, ExportSyncModule>('/src/pages/**/[a-z[]*.tsx', {
  eager: true,
});

const getPageMetas = (PAGE_METAS): PathItem[] => {
  const metas = [];
  Object.keys(PAGE_METAS).forEach((filePath) => {
    const path = filePath
      .replace(/\/src\/pages|index|\.tsx$/g, '')
      .replace(/\[\.{3}.+]/, '*')
      .replace(/\[(.+)]/, ':$1');
    // 过滤掉路劲中包含 components 和 title 字段不是字符串的
    if (
      PAGE_METAS[filePath].meta &&
      isString(PAGE_METAS[filePath].meta.title) &&
      !filePath.includes('components')
    ) {
      metas.push({ path: formatPath(path), meta: PAGE_METAS[filePath].meta });
    }
  });
  return metas;
};

export const routesToMenusConfig = (pathRoutes: MenuItem[]): MenuItem[] => {
  const firstLevelMenus = [];
  const _pathRoutes = cloneDeep(pathRoutes);
  for (const menuItem of _pathRoutes) {
    const { path } = menuItem;
    const pathLevel = getPathLevel(path);
    _pathRoutes.forEach((item) => {
      if (
        item.path.includes(path) &&
        item.path !== path &&
        pathLevel + 1 === getPathLevel(item.path)
      ) {
        // 直接修改自身，因为是引用类型数据，会影响到原始数据，所以最后会直接得到一份完整的树结构
        menuItem.next = menuItem.next || [];
        menuItem.next.push(item);
      }
    });

    if (pathLevel === 1) {
      firstLevelMenus.push(menuItem);
    }
  }
  console.log(firstLevelMenus);
  return firstLevelMenus;
};

export const menuRoutes = getPageMetas(PAGE_METAS);

export const renderMenus = (menusConfig: MenuItem[]) => {
  return menusConfig.map((menuItem) => {
    const key = getKey(menuItem);
    if (menuItem.next) {
      return (
        <Menu.SubMenu key={key} title={menuItem.meta.title}>
          {renderMenus(menuItem.next)}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Link to={menuItem.path} key={key}>
          <Menu.Item key={key}>{menuItem.meta.title}</Menu.Item>
        </Link>
      );
    }
  });
};

/*for (const routesEagerKey in PAGE_METAS) {
  const path = routesEagerKey
    .replace(/\/src\/pages|index|\.tsx$/g, '')
    .replace(/\[\.{3}.+]/, '*')
    .replace(/\[(.+)]/, ':$1');

  if (path.includes('components')) continue;
  if (Array.isArray(PAGE_METAS[routesEagerKey].meta.title)) continue;
  metas.push({ path, meta: PAGE_METAS[routesEagerKey].meta });
}*/
/*const sortedAll = all.sort((a, b) => {
  const aLength = a.path.split(/[-\w]*!/).length;
  const bLength = b.path.split(/[-\w]*!/).length;
  return aLength - bLength;
});*/
// /asd/  /asd-asd/ /asd-asd-asd/
// /asd(-asd)*/
// path, path.replace(RegExp(/^\/(\w+)\/$/), '$1')
