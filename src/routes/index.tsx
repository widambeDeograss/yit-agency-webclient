import { createBrowserRouter } from 'react-router-dom'
import GeneralError from '../pages/errors/general-error'
import NotFoundError from '../pages/errors/not-found-error'
import MaintenanceError from '../pages/errors/maintenance-error'
import UnauthorisedError from '../pages/errors/unauthorised-error'
import Main from '@/layout/main'

const router = createBrowserRouter([
  // Auth routes
  {
    path: '/sign',
    lazy: async () => ({
      Component: (await import('../pages//errors/maintenance-error')).default,
    }),
  },


  // Main routes
 {
   element: <Main />,
   path: '/',
   errorElement: <GeneralError />,
   children: [
    {
      index: true,
      lazy: async () => ({
        Component: (await import('../pages/home-page')).default,
      }),
    },
    {
        path:"/tet",
        lazy: async () => ({
          Component: (await import('../pages/talk-the-tech')).default,
        }),
      },
    // {
    //   path: 'talk-the-tech',
    //   lazy: async () => ({
    //     Component: (await import('./pages/settings')).default,
    //   }),
    //   errorElement: <GeneralError />,
    //   children: [
    //     {
    //       index: true,
    //       lazy: async () => ({
    //         Component: (await import('./pages/settings/appearance')).default,
    //       }),
    //     },
      
      
    //   ],
    // },
  ],

 },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
