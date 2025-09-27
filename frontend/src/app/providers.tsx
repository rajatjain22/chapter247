'use client';

import { Toaster } from 'react-hot-toast';
import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
    </Provider>
  );
}


