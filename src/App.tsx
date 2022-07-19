import { Route, Routes } from 'react-router-dom';
import PageLayout from './components/PageLayout';
import { pageRoutes, preservedRoutes, transToRouteElement } from '@/config/routes';
import NotFound from '@/pages/404';

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>{transToRouteElement(pageRoutes)}</Route>
      {transToRouteElement(preservedRoutes)}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
