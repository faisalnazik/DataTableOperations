import { Suspense, lazy } from 'react'
import { Navigate, useRoutes, useLocation } from 'react-router-dom'
// layouts
import DashboardLayout from '../layouts/dashboard'
import LogoOnlyLayout from '../layouts/LogoOnlyLayout'
// components
import LoadingScreen from '../components/LoadingScreen'

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation()

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/app')} />}>
      <Component {...props} />
    </Suspense>
  )
}

export default function Router() {
  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/app" replace />
    },
    {
      path: '/app',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/app/tables" replace />, index: true },
        { path: 'tables', element: <Tables /> }
      ]
    },
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ])
}

// App
const Tables = Loadable(lazy(() => import('../pages/Tables')))
const NotFound = Loadable(lazy(() => import('../pages/Page404')))
