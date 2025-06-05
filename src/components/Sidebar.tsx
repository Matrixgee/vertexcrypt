import React from "react";
import {
  X,
  LayoutDashboard,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat,
  Package,
  History,
  Headphones,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuItem {
  name: string;
  icon: React.ReactElement;
  path: string;
}

interface SidebarProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ active, setActive }) => {
  const [selectedMenu, setSelectedMenu] = React.useState<number | null>(0);

  const menuItems: MenuItem[] = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: "/user/overview",
    },
    {
      name: "Deposit",
      icon: <ArrowDownToLine className="w-5 h-5" />,
      path: "/user/deposit",
    },
    {
      name: "Withdrawal",
      icon: <ArrowUpFromLine className="w-5 h-5" />,
      path: "/user/withdraw",
    },
    {
      name: "My Plans",
      icon: <Repeat className="w-5 h-5" />,
      path: "/user/my-plans",
    },
    {
      name: "Packages",
      icon: <Package className="w-5 h-5" />,
      path: "/user/packages",
    },
    {
      name: "History",
      icon: <History className="w-5 h-5" />,
      path: "/user/history",
    },
    {
      name: "Support",
      icon: <Headphones className="w-5 h-5" />,
      path: "/user/support",
    },
  ];

  const navigate = useNavigate();

  const handleMenuClick = (path: string, index: number) => {
    setSelectedMenu(index);
    navigate(path);
    setActive(false);
  };

  return (
    <div className="relative">
      {/* Backdrop blur overlay for mobile */}
      {active && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setActive(false)}
        />
      )}

      <aside className={`sidebar ${active ? "active" : ""}`}>
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-green-900/30 to-slate-900/95 backdrop-blur-xl"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-green-400/5 to-green-500/5"></div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-4 w-20 h-20 bg-green-400/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 right-4 w-16 h-16 bg-green-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl animate-pulse delay-500"></div>
        </div>

        {/* Close button */}
        <button className="close-btn" onClick={() => setActive(!active)}>
          <X className="w-5 h-5" />
        </button>

        <div className="sidebar-inner">
          {/* Logo section */}
          <div className="logo-section">
            <div className="logo-container">
              <div className="logo-icon">
                <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </span>
                </div>
              </div>
              <div className="logo-text">
                <span className="brand-name">VertexCrypt</span>
                <span className="brand-subtitle">Trading Platform</span>
              </div>
            </div>
            <div className="logo-divider"></div>
          </div>

          {/* Navigation items */}
          <nav className="navigation">
            <ul className="nav-list">
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={`nav-item ${
                    selectedMenu === index ? "active" : ""
                  }`}
                  onClick={() => handleMenuClick(item.path, index)}
                >
                  <div className="nav-content">
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-text">{item.name}</span>
                  </div>
                  {selectedMenu === index && (
                    <div className="active-indicator"></div>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Bottom section */}
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">U</span>
                </div>
              </div>
              <div className="user-details">
                <span className="user-name">Trading Account</span>
                <span className="user-status">Premium</span>
              </div>
            </div>
          </div>
        </div>

        <style>{`
          .sidebar {
            width: 100%;
            max-width: 16rem;
            min-width: 16rem;
            height: 100vh;
            position: fixed;
            left: -20rem;
            top: 0;
            bottom:0;
            z-index: 30;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            border-right: 1px solid rgba(34, 197, 94, 0.2);
          }

          @media (min-width: 768px) {
            .sidebar {
              position: relative;
              left: 0;
            }
          }

          .sidebar.active {
            left: 0;
          }

          .close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            z-index: 10;
            background: rgba(239, 68, 68, 0.2);
            border: 1px solid rgba(239, 68, 68, 0.3);
            color: rgb(248, 113, 113);
            padding: 0.5rem;
            border-radius: 0.75rem;
            cursor: pointer;
            transition: all 0.2s ease;
            backdrop-filter: blur(8px);
          }

          .close-btn:hover {
            background: rgba(239, 68, 68, 0.3);
            transform: scale(1.05);
          }

          @media (min-width: 768px) {
            .close-btn {
              display: none;
            }
          }

          .sidebar-inner {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            position: relative;
            z-index: 5;
            padding: 1.5rem 1rem;
          }

          .logo-section {
            margin-bottom: 2rem;
          }

          .logo-container {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.5rem;
          }

          .logo-text {
            display: flex;
            flex-direction: column;
          }

          .brand-name {
            color: white;
            font-size: 1.25rem;
            font-weight: 700;
            line-height: 1.2;
          }

          .brand-subtitle {
            color: rgb(134, 239, 172);
            font-size: 0.75rem;
            font-weight: 500;
          }

          .logo-divider {
            height: 1px;
            background: linear-gradient(
              to right,
              transparent,
              rgba(34, 197, 94, 0.3),
              transparent
            );
            margin-top: 1rem;
          }

          .navigation {
            flex: 1;
            overflow-y: auto;
          }

          .nav-list {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            list-style: none;
          }

          .nav-item {
            position: relative;
            cursor: pointer;
            border-radius: 1rem;
            transition: all 0.3s ease;
            overflow: hidden;
          }

          .nav-item:hover {
            background: rgba(34, 197, 94, 0.1);
            transform: translateX(4px);
          }

          .nav-item.active {
            background: linear-gradient(
              135deg,
              rgba(34, 197, 94, 0.2),
              rgba(16, 185, 129, 0.2)
            );
            border: 1px solid rgba(34, 197, 94, 0.3);
          }

          .nav-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.875rem 1rem;
            position: relative;
            z-index: 2;
          }

          .nav-icon {
            color: rgb(156, 163, 175);
            transition: color 0.2s ease;
            flex-shrink: 0;
          }

          .nav-item:hover .nav-icon,
          .nav-item.active .nav-icon {
            color: rgb(34, 197, 94);
          }

          .nav-text {
            color: rgb(203, 213, 225);
            font-size: 0.95rem;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .nav-item:hover .nav-text,
          .nav-item.active .nav-text {
            color: white;
          }

          .active-indicator {
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
            width: 3px;
            height: 60%;
            background: linear-gradient(
              to bottom,
              rgb(34, 197, 94),
              rgb(16, 185, 129)
            );
            border-radius: 2px 0 0 2px;
            animation: slideIn 0.3s ease;
          }

          .sidebar-footer {
            margin-top: auto;
            padding-top: 1.5rem;
            border-top: 1px solid rgba(34, 197, 94, 0.2);
          }

          .user-info {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1rem;
            background: rgba(34, 197, 94, 0.1);
            border-radius: 1rem;
            border: 1px solid rgba(34, 197, 94, 0.2);
            backdrop-filter: blur(8px);
          }

          .user-details {
            display: flex;
            flex-direction: column;
          }

          .user-name {
            color: white;
            font-size: 0.875rem;
            font-weight: 600;
          }

          .user-status {
            color: rgb(34, 197, 94);
            font-size: 0.75rem;
            font-weight: 500;
          }

          @keyframes slideIn {
            from {
              height: 0;
            }
            to {
              height: 60%;
            }
          }

          /* Custom scrollbar */
          .navigation::-webkit-scrollbar {
            width: 4px;
          }

          .navigation::-webkit-scrollbar-track {
            background: transparent;
          }

          .navigation::-webkit-scrollbar-thumb {
            background: rgba(34, 197, 94, 0.3);
            border-radius: 2px;
          }

          .navigation::-webkit-scrollbar-thumb:hover {
            background: rgba(34, 197, 94, 0.5);
          }
        `}</style>
      </aside>
    </div>
  );
};

export default Sidebar;
