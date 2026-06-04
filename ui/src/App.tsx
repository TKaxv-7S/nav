import React, { Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { decodeTheme, initTheme } from './utils/theme';
import { Loading } from './components/Loading';

// 使用 React.lazy 懒加载组件
const Home = React.lazy(() => import('./pages/Home'));
const AdminPage = React.lazy(() => import('./pages/admin').then(module => ({ default: module.AdminPage })));
const Login = React.lazy(() => import('./pages/Login'));

// 加载中的占位组件
const LoadingFallback = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = initTheme();
    const decodedTheme = decodeTheme(theme);
    setIsDarkMode(decodedTheme.includes('dark'));

    // 监听主题变化
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target instanceof HTMLElement) {
          setIsDarkMode(mutation.target.classList.contains('dark-mode'));
        }
      });
    });

    const body = document.querySelector('body');
    if (body) {
      observer.observe(body, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  return <Loading />;
};

import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/*" element={<AdminPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;


