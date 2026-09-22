import { Outlet } from 'react-router-dom';
import Header from './Header';
import BottomNav from './BottomNav';

export default function Layout() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col relative w-full pt-24 pb-28 bg-surface">
        <div className="flex flex-col w-full">
          <Outlet />
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
