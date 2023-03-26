import Login from './login page/login';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import SignUpPage from './createAccount/create';
import HomeTable from './homePage/homeTable';

const router = createBrowserRouter(createRoutesFromElements(
  <>
      <Route path='/' element={<Login />} />
      <Route path='/sign-up' exact element={<SignUpPage />}/>
      <Route path='/home' element={<RequireAuth redirectTo="/">
        <HomeTable />
      </RequireAuth>}/>
  </>
));

function RequireAuth({ children, redirectTo }) {
  let isAuthenticated = window.sessionStorage.getItem("signed");
  let blocked = window.sessionStorage.getItem("blocked");
  let email = window.sessionStorage.getItem("email");
  return (isAuthenticated && blocked != email ? children : <Navigate to={redirectTo} />);
}

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}


