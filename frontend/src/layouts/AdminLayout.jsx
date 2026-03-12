import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const session = localStorage.getItem('adminSession');
    if (!session) {
      navigate('/admin/login', { replace: true });
      return;
    }
    try {
      const parsed = JSON.parse(session);
      if (!parsed?.email) {
        localStorage.removeItem('adminSession');
        navigate('/admin/login', { replace: true });
      }
    } catch {
      localStorage.removeItem('adminSession');
      navigate('/admin/login', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader />

        <main className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
