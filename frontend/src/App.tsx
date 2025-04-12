import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Moon, Sun, UserCircle, Bell } from 'lucide-react';
import Concuria from './components/Concuria';
import HeaderContent from './components/HeaderContent';
import HomePage from './components/HomePage';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import Archives from './components/Archives';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "New Document Added",
      description: "A new decision regarding telecommunications sector has been added to Concuria.",
      time: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      title: "Feature Update",
      description: "New filtering options are now available in the document search.",
      time: "1 day ago",
      unread: false
    },
    {
      id: 3,
      title: "System Update",
      description: "Platform maintenance scheduled for next week.",
      time: "2 days ago",
      unread: false
    }
  ]);
  const [archivedDocuments, setArchivedDocuments] = useState(new Set<string>());
  const toggleArchiveDocument = (documentId: string) => {
    const newArchivedDocuments = new Set(archivedDocuments);
    if (newArchivedDocuments.has(documentId)) {
      newArchivedDocuments.delete(documentId);
    } else {
      newArchivedDocuments.add(documentId);
    }
    setArchivedDocuments(newArchivedDocuments);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(prev => !prev);
    document.documentElement.classList.toggle('dark');
  };

  const markNotificationAsRead = (notificationId: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, unread: false }
          : notification
      )
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({ ...notification, unread: false }))
    );
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-b`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <HeaderContent darkMode={darkMode} />
              <div className="flex items-center space-x-4">
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className={`p-2 rounded-lg relative ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                  >
                    <Bell className="h-5 w-5" />
                    {notifications.some(n => n.unread) && (
                      <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400" />
                    )}
                  </button>
                  {showNotifications && (
                    <div
                      className={`absolute right-0 mt-2 w-80 rounded-lg shadow-lg py-1 z-50 ${
                        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className={`px-4 py-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <h3 className={`text-sm font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          Notifications
                        </h3>
                      </div>
                      <div className="max-h-96 overflow-y-auto">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`px-4 py-3 ${
                              notification.unread
                                ? darkMode
                                  ? 'bg-gray-700/50'
                                  : 'bg-gray-50'
                                : ''
                            } ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                                  {notification.title}
                                </p>
                                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                  {notification.description}
                                </p>
                                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                                  {notification.time}
                                </p>
                              </div>
                              {notification.unread && (
                                <span className={`h-2 w-2 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className={`px-4 py-2 border-t ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                        <Link
                          to="/notifications"
                          onClick={() => {
                            setShowNotifications(false);
                            markAllNotificationsAsRead();
                          }}
                          className={`text-sm w-full text-center block ${
                            darkMode ? 'text-indigo-400 hover:text-indigo-300' : 'text-indigo-600 hover:text-indigo-700'
                          }`}
                        >
                          View all notifications
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={toggleDarkMode}
                  className={`p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </button>
                <Link
                  to="/profile"
                  className={`p-2 rounded-lg ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  <UserCircle className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/concuria" element={<Concuria darkMode={darkMode} />} />
            <Route path="/profile" element={<Profile darkMode={darkMode} />} />
            <Route
              path="/notifications"
              element={
                <Notifications
                  darkMode={darkMode}
                  notifications={notifications}
                  markNotificationAsRead={markNotificationAsRead}
                />
              }
            />
            <Route
              path="/archives"
              element={
                <Archives
                  darkMode={darkMode}
                  archivedDocuments={archivedDocuments}
                  onToggleArchive={toggleArchiveDocument}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;