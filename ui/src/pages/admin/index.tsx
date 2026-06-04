import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ExitIcon, StarFilledIcon } from '@radix-ui/react-icons';
import { MenuItem, Sidebar } from './components/sidebar';
import "./index.css"
import {
  HomeIcon,
  GearIcon,
  BackpackIcon,
  TableIcon,
} from '@radix-ui/react-icons';
import { useOnce } from '../../utils/useOnce';

import DarkSwitch from '../../components/DarkSwitch';
import { Tools } from './tabs/Tools';
import { Catelog } from './tabs/Catelog';
import { ApiToken } from './tabs/ApiToken';
import { Setting } from './tabs/Setting';

const menuItems: MenuItem[] = [
  {
    key: 'tools',
    icon: <BackpackIcon className="w-5 h-5" />,
    label: '工具管理',
    path: '/admin/tools'
  },
  {
    key: 'categories',
    icon: <TableIcon className="w-5 h-5" />,
    label: '分类管理',
    path: '/admin/categories'
  },
  {
    key: 'api-token',
    icon: <StarFilledIcon className="w-5 h-5" />,
    label: 'API Token',
    path: '/admin/api-token'
  },
  {
    key: 'settings',
    icon: <GearIcon className="w-5 h-5" />,
    label: '系统设置',
    path: '/admin/settings'
  }
];

export const AdminPage = () => {
  const navigate = useNavigate();
  const [currentKey, setCurrentKey] = useState('tools');

  useOnce(() => {
    if (!localStorage.getItem('_token')) {
      navigate('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('_token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900 dark:text-white">VanNav 管理系统</h1>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <HomeIcon className="w-4 h-4 mr-2" />
                返回主页
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-2 text-sm text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
              >
                <ExitIcon className="w-4 h-4 mr-2" />
                退出登录
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 w-full h-[calc(100vh-64px)]">
        <Sidebar items={menuItems} currentKey={currentKey} onChange={setCurrentKey} />

        <main className="flex-1 overflow-auto">
          <div className="p-4 h-full">
            <div style={{ display: currentKey === 'tools' ? 'block' : 'none' }}>
              <Tools />
            </div>
            <div style={{ display: currentKey === 'categories' ? 'block' : 'none' }}>
              <Catelog />
            </div>
            <div style={{ display: currentKey === 'api-token' ? 'block' : 'none' }}>
              <ApiToken />
            </div>
            <div style={{ display: currentKey === 'settings' ? 'block' : 'none' }}>
              <Setting />
            </div>
          </div>
        </main>
      </div>
      <div className="fixed bottom-4 right-4 z-50 flex gap-4">
        <DarkSwitch showGithub={false} />
      </div>
    </div>
  );
};

export default AdminPage; 