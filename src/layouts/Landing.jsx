import { Footer, Navbar } from '@/components';
import { Outlet } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex h-dvh flex-col font-sans">
      <Navbar />

      <main className="flex-auto bg-white">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Landing;
