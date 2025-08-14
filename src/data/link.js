import { Action } from '@/constants';
import * as Model from '@/models';
import * as Auth from '@/pages/auth';
import * as Dashboard from '@/pages/dashboard';
import * as Landing from '@/pages/landing';
import { DatabaseOutlined, FileTextOutlined, HomeOutlined } from '@ant-design/icons';

export const landingLink = [
  {
    label: 'Beranda',
    key: '/',
    element: Landing.Home
  },
  {
    label: 'Berita UMKM',
    key: '/berita_umkm',
    element: Landing.News
  },
  {
    label: 'Daftar Sebagai Mitra',
    key: '/member_register',
    element: Landing.MemberRegister
  }
];

/**
 * @type {{
 *  label: string;
 *  permissions: [Action, import('@/models/Model').ModelChildren][];
 *  roles: Role[];
 *  children: {
 *   path: string;
 *   label: string;
 *   icon: import('react').ReactNode;
 *   element: import('react').ReactNode;
 *   roles?: Role[];
 *   permissions?: [Action, import('@/models/Model').ModelChildren][];
 *  }[];
 * }[]}
 */
export const dashboardLink = [
  {
    label: 'Belee',
    icon: HomeOutlined,
    children: [
      { path: '/dashboard', label: 'Dashboard', element: Dashboard.Dashboard },
      {
        path: '/dashboard/karyawan',
        label: 'Karyawan',
        element: Dashboard.Employees,
        permissions: [[Action.READ, Model.Employees]]
      }
    ]
  },
  {
    label: 'Tenants',
    icon: DatabaseOutlined,
    children: [
      {
        path: '/dashboard/pendaftar',
        label: 'Pendaftar',
        element: Dashboard.Registrants,
        permissions: [[Action.READ, Model.Registrants]]
      },
      {
        path: '/dashboard/tenant',
        label: 'Tenant',
        element: Dashboard.Tenants,
        permissions: [[Action.READ, Model.Tenants]]
      },
      {
        path: '/dashboard/testimoni',
        label: 'Testimoni',
        element: Dashboard.Testimonials,
        permissions: [[Action.READ, Model.Testimonial]]
      }
    ]
  },
  {
    label: 'Berita',
    icon: FileTextOutlined,
    children: [
      {
        path: '/dashboard/news',
        label: 'Berita UMKM',
        element: Dashboard.News,
        permissions: [[Action.READ, Model.News]]
      }
    ]
  }
].map((item) => ({
  ...item,
  permissions: item.children.flatMap((child) => child.permissions).filter((permission) => permission),
  roles: item.children.flatMap((child) => child.roles).filter((role) => role)
}));

export const authLink = [
  {
    path: '/auth/login',
    element: Auth.Login
  }
];
