import { Menu } from '@arco-design/web-react';
import { menuRoutes, renderMenus, routesToMenusConfig } from '@/config/menu';
import { useLocation } from 'react-router-dom';
import { getKey } from '@/utils';

const getDefaultConfig = (menusConfig, location) => {
  const defaultOpenKeys = [];
  const defaultSelectedKeys = [];
  const pathnamePieces = location.pathname.match(/\/[-\w]*/g);
  let currentPath = '';
  let lastNode = menusConfig;
  for (const pathnamePiece of pathnamePieces) {
    currentPath += pathnamePiece;
    const matchedMenu = lastNode.find((menu) => menu.path === currentPath);
    if (matchedMenu) {
      defaultOpenKeys.push(getKey(matchedMenu));
      if (matchedMenu?.next) {
        lastNode = matchedMenu.next;
      } else {
        defaultSelectedKeys.push(getKey(matchedMenu));
        break;
      }
    }
  }
  return { defaultOpenKeys, defaultSelectedKeys };
};

export default function LayoutSider(props) {
  const menusConfig = routesToMenusConfig(menuRoutes);
  const location = useLocation();
  const { defaultOpenKeys, defaultSelectedKeys } = getDefaultConfig(menusConfig, location);
  return (
    <Menu
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultSelectedKeys}
      style={{ width: '260px' }}
    >
      {renderMenus(menusConfig)}
    </Menu>
  );
}
