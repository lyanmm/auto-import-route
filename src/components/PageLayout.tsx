import { Outlet, useLocation } from 'react-router-dom';
import React, { Suspense } from 'react';
import { Breadcrumb, Layout, Spin } from '@arco-design/web-react';
import { breadcrumbRoutes, renderBreadcrumb, routesToBreadcrumbConfig } from '@/config/breadcrumb';
import LayoutSider from '@/components/LayoutSider';

export default function PageLayout(props) {
  const location = useLocation();
  const breadcrumbConfig = routesToBreadcrumbConfig(breadcrumbRoutes, location);
  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Layout.Sider width={260}>
        <LayoutSider />
      </Layout.Sider>
      <Layout>
        <Layout.Header>
          <Breadcrumb>{renderBreadcrumb(breadcrumbConfig)}</Breadcrumb>
        </Layout.Header>
        <Layout.Content>
          <Suspense fallback={<Spin />}>
            <Outlet />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
