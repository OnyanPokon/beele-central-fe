import { Footer, Navbar, ScrollToTop } from '@/components';
import { Outlet } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="flex h-dvh flex-col font-sans">
      <Navbar />

      <main className="flex-auto bg-white">
        <ScrollToTop />
        <Outlet />
        <Footer />
      </main>
    </div>
  );
};

export default Landing;
