import React from 'react';
import { 
  Home, 
  CreditCard, 
  Ship, 
  FileText, 
  Settings, 
  Users,
  Shield
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Sidebar = ({ isOpen, activeTab, setActiveTab }) => {
  const { user } = useAuth();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'digital-id', label: 'Digital ID', icon: CreditCard },
    { id: 'boats', label: 'My Boats', icon: Ship },
    { id: 'permits', label: 'Permits', icon: FileText },
    { id: 'profile', label: 'Profile', icon: Settings },
  ];

  const adminItems = [
    { id: 'admin-users', label: 'Manage Users', icon: Users },
    { id: 'admin-permits', label: 'Permit Approvals', icon: Shield },
  ];

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === item.id
                    ? 'bg-blue-100 text-blue-900'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`mr-3 h-5 w-5 transition-colors ${
                    activeTab === item.id
                      ? 'text-blue-500'
                      : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                />
                {item.label}
              </button>
            );
          })}

          {user?.role === 'admin' && (
            <>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="space-y-1">
                {adminItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                        activeTab === item.id
                          ? 'bg-orange-100 text-orange-900'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon
                        className={`mr-3 h-5 w-5 transition-colors ${
                          activeTab === item.id
                            ? 'text-orange-500'
                            : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                      />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;