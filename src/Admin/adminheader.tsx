import React, { useState, useRef } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Settings,
  User,
  Menu,
  Shield,
  Users,
  Database,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface AdminHeaderProps {
  active: boolean;
  setActive: (active: boolean) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ active, setActive }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [notifications] = useState(3); // Mock notification count for admin
  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleUserIconClick = () => {
    setIsModalVisible(true);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogout = () => {
    navigate("/login");
    console.log("Admin logout clicked");
  };

  const handleMenubar = () => {
    setActive(!active);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    console.log(`Navigate to: ${path}`);
  };

  const menuItems = [
    {
      label: "Admin Profile",
      icon: <User className="w-5 h-5" />,
      path: "/admin/adminhome",
    },
    {
      label: "System Settings",
      icon: <Settings className="w-5 h-5" />,
      path: "/admin/adminhome",
    },
    {
      label: "Notifications",
      icon: <Bell className="w-5 h-5" />,
      path: "/admin/adminhome",
      mobileOnly: true,
    },
    {
      label: "Admin Tools",
      icon: <Shield className="w-5 h-5" />,
      path: "/admin/adminhome",
    },
  ];

  return (
    <div className="admin-header-container">
      {/* Simple background */}
      <div className="absolute inset-0 bg-slate-900"></div>

      <div className="header-content">
        {/* Left Section - Menu Button */}
        <div className="menu-section">
          <button className="menu-button" onClick={handleMenubar}>
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Center Section - Admin Action Buttons (Desktop) */}
        <div className="action-buttons">
          <button
            className="admin-button users-button"
            onClick={() => handleNavigation("/admin/users")}
          >
            <div className="button-content">
              <Users className="w-4 h-4" />
              <span>Manage Users</span>
            </div>
          </button>
          <button
            className="admin-button data-button"
            onClick={() => handleNavigation("/admin/analytics")}
          >
            <div className="button-content">
              <Database className="w-4 h-4" />
              <span>View Analytics</span>
            </div>
          </button>
        </div>

        {/* Right Section - Admin Controls */}
        <div className="user-section">
          <div className="user-controls">
            {/* Notifications (Desktop) */}
            <div className="notification-wrapper">
              <button className="notification-button">
                <Bell className="w-5 h-5" />
                {notifications > 0 && (
                  <span className="notification-badge">{notifications}</span>
                )}
              </button>
            </div>

            {/* Admin Profile */}
            <div className="user-profile">
              <button className="avatar-button" onClick={handleUserIconClick}>
                {userImage ? (
                  <img src={userImage} alt="Admin" className="avatar-image" />
                ) : (
                  <div className="avatar-placeholder">
                    <Shield className="w-5 h-5" />
                  </div>
                )}
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />

              <div className="user-name">
                <span>Administrator</span>
              </div>

              <div className="dropdown-wrapper">
                <button className="dropdown-trigger" onClick={handleShowMenu}>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      showMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <div className="dropdown-menu">
                    <div className="dropdown-content">
                      {menuItems.map((item, index) => (
                        <button
                          key={index}
                          className={`dropdown-item ${
                            item.mobileOnly ? "mobile-only" : ""
                          }`}
                          onClick={() => {
                            setShowMenu(false);
                            handleNavigation(item.path);
                          }}
                        >
                          <span className="dropdown-icon">{item.icon}</span>
                          <span className="dropdown-label">{item.label}</span>
                        </button>
                      ))}
                      <div className="dropdown-divider"></div>
                      <button
                        className="dropdown-item logout-item"
                        onClick={handleLogout}
                      >
                        <span className="dropdown-icon">
                          <LogOut className="w-5 h-5" />
                        </span>
                        <span className="dropdown-label">Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalVisible && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">Add Admin Profile Image</h3>
            </div>
            <div className="modal-body">
              <p className="modal-text">Do you want to add a profile image?</p>
            </div>
            <div className="modal-footer">
              <button className="modal-cancel" onClick={handleCancel}>
                Cancel
              </button>
              <button className="modal-ok" onClick={handleOk}>
                Choose Image
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-header-container {
          width: 100%;
          height: 5rem;
          position: relative;
          border-bottom: 1px solid rgb(134, 239, 172);
        }

        .header-content {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 2rem;
          position: relative;
          z-index: 10;
        }

        .menu-section {
          flex: 0 0 auto;
          display: none;
        }

        .menu-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(134, 239, 172, 0.1);
          border: 1px solid rgb(134, 239, 172);
          border-radius: 0.75rem;
          color: white;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .menu-button:hover {
          background: rgba(134, 239, 172, 0.2);
          transform: scale(1.05);
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          flex: 0 0 auto;
        }

        @media (max-width: 768px) {
          .action-buttons {
            display: none;
          }
        }

        .admin-button {
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: 1px solid rgb(134, 239, 172);
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 500;
          background: rgba(134, 239, 172, 0.1);
          color: rgb(134, 239, 172);
        }

        .admin-button:hover {
          background: rgba(134, 239, 172, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(134, 239, 172, 0.3);
        }

        .users-button {
          color: rgb(134, 239, 172);
        }

        .users-button:hover {
          color: white;
        }

        .data-button {
          color: rgb(134, 239, 172);
        }

        .data-button:hover {
          color: white;
        }

        .button-content {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .user-section {
          flex: 0 0 auto;
        }

        .user-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .notification-wrapper {
          display: flex;
        }

        @media (max-width: 768px) {
          .notification-wrapper {
            display: none;
          }
        }

        .notification-button {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(134, 239, 172, 0.1);
          border: 1px solid rgb(134, 239, 172);
          border-radius: 0.75rem;
          color: rgb(134, 239, 172);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .notification-button:hover {
          background: rgba(134, 239, 172, 0.2);
          color: white;
          transform: scale(1.05);
        }

        .notification-badge {
          position: absolute;
          top: -0.25rem;
          right: -0.25rem;
          background: rgb(239, 68, 68);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 0.75rem;
          min-width: 1.25rem;
          text-align: center;
          box-shadow: 0 2px 8px rgba(239, 68, 68, 0.4);
        }

        .user-profile {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .avatar-button {
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.2s ease;
        }

        .avatar-button:hover {
          transform: scale(1.05);
        }

        .avatar-image {
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid rgb(134, 239, 172);
        }

        .avatar-placeholder {
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(134, 239, 172, 0.2);
          border: 2px solid rgb(134, 239, 172);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgb(134, 239, 172);
        }

        .user-name {
          color: white;
          font-weight: 600;
          font-size: 0.875rem;
        }

        @media (max-width: 640px) {
          .user-name {
            display: none;
          }
        }

        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-trigger {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2rem;
          height: 2rem;
          background: rgba(134, 239, 172, 0.1);
          border: 1px solid rgb(134, 239, 172);
          border-radius: 0.5rem;
          color: rgb(134, 239, 172);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .dropdown-trigger:hover {
          background: rgba(134, 239, 172, 0.2);
          color: white;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: 0.5rem;
          z-index: 9999;
          animation: fadeInDown 0.2s ease-out;
        }

        .dropdown-content {
          min-width: 12rem;
          background: rgba(15, 23, 42, 0.95);
          z-index: 1000;
          backdrop-filter: blur(20px);
          border: 1px solid rgb(134, 239, 172);
          border-radius: 1rem;
          padding: 0.5rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3),
            0 10px 10px -5px rgba(0, 0, 0, 0.2);
        }

        .dropdown-item {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          color: rgb(203, 213, 225);
          font-size: 0.875rem;
          font-weight: 500;
          border: none;
          background: transparent;
          text-align: left;
        }

        .dropdown-item:hover {
          background: rgba(134, 239, 172, 0.1);
          color: white;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 640px) {
          .mobile-only {
            display: flex;
          }
          .menu-section {
            display: block;
          }
        }

        .dropdown-icon {
          color: rgb(134, 239, 172);
          transition: color 0.2s ease;
        }

        .dropdown-item:hover .dropdown-icon {
          color: white;
        }

        .logout-item:hover {
          background: rgba(239, 68, 68, 0.1);
          color: rgb(239, 68, 68);
        }

        .logout-item:hover .dropdown-icon {
          color: rgb(239, 68, 68);
        }

        .dropdown-divider {
          height: 1px;
          background: rgb(134, 239, 172);
          margin: 0.5rem 0;
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgb(134, 239, 172);
          border-radius: 1rem;
          padding: 1.5rem;
          min-width: 20rem;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          animation: slideIn 0.3s ease-out;
        }

        .modal-header {
          margin-bottom: 1rem;
        }

        .modal-title {
          color: white;
          font-size: 1.25rem;
          font-weight: 600;
        }

        .modal-body {
          margin-bottom: 1.5rem;
        }

        .modal-text {
          color: rgb(203, 213, 225);
          font-size: 0.875rem;
        }

        .modal-footer {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }

        .modal-cancel,
        .modal-ok {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 500;
          font-size: 0.875rem;
        }

        .modal-cancel {
          background: rgba(134, 239, 172, 0.1);
          border: 1px solid rgb(134, 239, 172);
          color: rgb(203, 213, 225);
        }

        .modal-cancel:hover {
          background: rgba(134, 239, 172, 0.2);
          color: white;
        }

        .modal-ok {
          background: rgb(134, 239, 172);
          border: 1px solid transparent;
          color: rgb(15, 23, 42);
        }

        .modal-ok:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 25px rgba(134, 239, 172, 0.4);
        }

        .hidden {
          display: none;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @media (max-width: 768px) {
          .header-content {
            padding: 0 1rem;
          }

          .user-controls {
            gap: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminHeader;
