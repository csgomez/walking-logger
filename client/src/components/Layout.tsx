import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { Toaster } from 'react-hot-toast';

function Layout() {
  return (
    <>
      <NavBar />
      <main className="content-container">
        <Outlet />
        <Toaster />
      </main>
    </>
  );
}

export default Layout;
