import SignIn from '../../pages/Authentication/SignIn';
import SignUp from '../../pages/Authentication/SignUp';
import Calendar from '../../pages/Calendar';
import Chart from '../../pages/Chart';
import ECommerce from '../../pages/Dashboard/ECommerce';
import FormElements from '../../pages/Form/FormElements';
import FormLayout from '../../pages/Form/FormLayout';
import Profile from '../../pages/Profile';
import Settings from '../../pages/Settings';
import Tables from '../../pages/Tables';
import Alerts from '../../pages/UiElements/Alerts';
import Buttons from '../../pages/UiElements/Buttons';

import DefaultLayout from '../../layout/DefaultLayout';
import PageTitle from '../../components/PageTitle';
import LoginContainer from '../../modules/auth/containers/LoginContainer';
import skill from '../../modules/skills/routes';
import project from '../../modules/projects/routes';
import AuthCallback from '../../modules/auth/views/AuthCallback';
import experience from '../../modules/experience/routes';
export const DefaultRoute = '/';

// Assuming lang and userRoute are defined somewhere in your code

const Routes = [
  {
    path: '/',
    element: <DefaultLayout />, // Use DefaultLayout as a parent route
    children: [
      {
        index: true,
        element: (
          <>
            <PageTitle title="eCommerce Dashboard | TailAdmin" />
            <ECommerce />
          </>
        ),
      },
      ...skill,
      ...project,
      ...experience,
      {
        path: '/auth/callback',
        Element: <AuthCallback />,
      },
      {
        path: 'calendar',
        element: (
          <>
            <PageTitle title="Calendar | TailAdmin" />
            <Calendar />
          </>
        ),
      },
      {
        path: 'profile',
        element: (
          <>
            <PageTitle title="Profile | TailAdmin" />
            <Profile />
          </>
        ),
      },
      {
        path: 'forms/form-elements',
        element: (
          <>
            <PageTitle title="Form Elements | TailAdmin" />
            <FormElements />
          </>
        ),
      },
      {
        path: 'forms/form-layout',
        element: (
          <>
            <PageTitle title="Form Layout | TailAdmin" />
            <FormLayout />
          </>
        ),
      },
      {
        path: 'tables',
        element: (
          <>
            <PageTitle title="Tables | TailAdmin" />
            <Tables />
          </>
        ),
      },
      {
        path: 'settings',
        element: (
          <>
            <PageTitle title="Settings | TailAdmin" />
            <Settings />
          </>
        ),
      },
      {
        path: 'chart',
        element: (
          <>
            <PageTitle title="Basic Chart | TailAdmin" />
            <Chart />
          </>
        ),
      },
      {
        path: 'ui/alerts',
        element: (
          <>
            <PageTitle title="Alerts | TailAdmin" />
            <Alerts />
          </>
        ),
      },
      {
        path: 'ui/buttons',
        element: (
          <>
            <PageTitle title="Buttons | TailAdmin" />
            <Buttons />
          </>
        ),
      },
      {
        path: 'auth/signin',
        element: (
          <>
            <PageTitle title="Signin | TailAdmin" />
            <SignIn />
          </>
        ),
      },
      {
        path: 'auth/signup',
        element: (
          <>
            <PageTitle title="Signup | TailAdmin" />
            <SignUp />
          </>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: <LoginContainer />,
  },
  {
    path: '*',
    element: <div>Not Found</div>,
  },
];

export default Routes;
