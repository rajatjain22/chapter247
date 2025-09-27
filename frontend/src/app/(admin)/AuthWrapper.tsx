'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { logout, setUser } from '@/store/authSlice';
import API from '@/utils/API';
import toast from 'react-hot-toast';
import { AppDispatch } from '@/store';

export default function AuthWrapper({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleLogout = async () => {
    dispatch(logout()).unwrap().then(() => {
      toast.success("Logged out successfully 111");
      router.push("/signin")
    })
  };
  useEffect(() => {
    API.get("/me").then(res => { dispatch(setUser(res.data)); setLoading(false); })
      .catch(() => handleLogout())
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <>{children}</>;
}
