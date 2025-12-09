import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { SmartsuppChat } from '../chat/SmartsuppChat';
import ScrollToTop from '../ScrollToTop';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1 pt-20">
        <Outlet />
      </main>
      <Footer />
      <SmartsuppChat />
    </div>
  );
}
