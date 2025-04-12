import React from 'react';
import { Bell, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NotificationsProps {
  darkMode: boolean;
  notifications: {
    id: number;
    title: string;
    description: string;
    time: string;
    unread: boolean;
  }[];
  markNotificationAsRead: (id: number) => void;
}

const Notifications: React.FC<NotificationsProps> = ({ darkMode, notifications, markNotificationAsRead }) => {
  return (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center mb-6">
          <Link
            to="/"
            className={`mr-4 p-2 rounded-lg ${
              darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className={`text-2xl font-bold flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            <Bell className="h-6 w-6 mr-2" />
            Notifications
          </h1>
        </div>

        <div className={`rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          {notifications.map((notification, index) => (
            <div
              key={notification.id}
              onClick={() => markNotificationAsRead(notification.id)}
              className={`
                p-4 
                ${index !== notifications.length - 1 ? (darkMode ? 'border-b border-gray-700' : 'border-b border-gray-200') : ''}
                ${notification.unread ? (darkMode ? 'bg-gray-700/50' : 'bg-gray-50') : ''}
                ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-50'}
                transition-colors duration-150 ease-in-out
                cursor-pointer
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {notification.title}
                    </h3>
                    {notification.unread && (
                      <span className={`ml-2 h-2 w-2 rounded-full ${darkMode ? 'bg-indigo-400' : 'bg-indigo-600'}`} />
                    )}
                  </div>
                  <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {notification.description}
                  </p>
                  <p className={`mt-2 text-xs ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    {notification.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;