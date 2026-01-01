import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';
import { AuthProvider } from './context/AuthContext'; // Essential for role-based logic
import { Toaster } from 'react-hot-toast'; // For those sleek "Liquid Glass" notifications

const App: React.FC = () => {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      {/* The AuthProvider ensures that the 'currentLecturer' or 'currentStudent' 
        state is consistent, supporting your rule that data is viewable 
        by all but editable only by owners.
      */}
      <AuthProvider>
        <div className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-slate-900 selection:bg-[#006838]/10 selection:text-[#006838]">
          
          {/* Global Toast Notifications styled with glassmorphism */}
          <Toaster 
            position="top-right"
            toastOptions={{
              className: 'glass-notification',
              style: {
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(226, 232, 240, 0.5)',
                borderRadius: '16px',
                fontWeight: '600',
                fontSize: '14px'
              }
            }} 
          />

          <AppRoutes />
          
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;