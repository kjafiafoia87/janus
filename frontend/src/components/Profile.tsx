import React, { useState, useRef } from 'react';
import { User, Mail, Building, Phone, MapPin, Camera, Edit2, Save, X } from 'lucide-react';

interface ProfileProps {
  darkMode: boolean;
}

interface UserData {
  name: string;
  title: string;
  email: string;
  phone: string;
  company: string;
  location: string;
  profilePicture: string | null;
}

const Profile: React.FC<ProfileProps> = ({ darkMode }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: 'John Smith',
    title: 'Legal Professional',
    email: 'john.smith@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Smith & Associates',
    location: 'New York, NY',
    profilePicture: null
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData(prev => ({
          ...prev,
          profilePicture: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the changes to a backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset any unsaved changes
  };

  const handleInputChange = (field: keyof UserData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  return (
    <div className={`flex-1 ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className={`rounded-lg shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} p-8`}>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="relative">
                <div 
                  className={`h-20 w-20 rounded-full flex items-center justify-center overflow-hidden ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-100'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {userData.profilePicture ? (
                    <img 
                      src={userData.profilePicture} 
                      alt="Profile" 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <User className={`h-12 w-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`} />
                  )}
                  <div className={`absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity cursor-pointer`}>
                    <Camera className="h-6 w-6 text-white" />
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>
              <div className="ml-6">
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={userData.name}
                      onChange={handleInputChange('name')}
                      className={`text-2xl font-bold w-full ${
                        darkMode 
                          ? 'bg-gray-700 text-white border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      } rounded-md border px-2 py-1`}
                    />
                    <input
                      type="text"
                      value={userData.title}
                      onChange={handleInputChange('title')}
                      className={`${
                        darkMode 
                          ? 'bg-gray-700 text-gray-400 border-gray-600' 
                          : 'bg-white text-gray-600 border-gray-300'
                      } rounded-md border px-2 py-1 w-full`}
                    />
                  </div>
                ) : (
                  <>
                    <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {userData.name}
                    </h1>
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {userData.title}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="flex space-x-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className={`p-2 rounded-lg flex items-center ${
                      darkMode 
                        ? 'bg-green-600 text-white hover:bg-green-700' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    <Save className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`p-2 rounded-lg flex items-center ${
                      darkMode 
                        ? 'bg-red-600 text-white hover:bg-red-700' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditClick}
                  className={`p-2 rounded-lg flex items-center ${
                    darkMode 
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700'
                  }`}
                >
                  <Edit2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Mail className="h-5 w-5 mr-3" />
                  {isEditing ? (
                    <input
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange('email')}
                      className={`${
                        darkMode 
                          ? 'bg-gray-700 text-gray-200 border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      } rounded-md border px-2 py-1 w-full`}
                    />
                  ) : (
                    <span>{userData.email}</span>
                  )}
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Phone className="h-5 w-5 mr-3" />
                  {isEditing ? (
                    <input
                      type="tel"
                      value={userData.phone}
                      onChange={handleInputChange('phone')}
                      className={`${
                        darkMode 
                          ? 'bg-gray-700 text-gray-200 border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      } rounded-md border px-2 py-1 w-full`}
                    />
                  ) : (
                    <span>{userData.phone}</span>
                  )}
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <Building className="h-5 w-5 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.company}
                      onChange={handleInputChange('company')}
                      className={`${
                        darkMode 
                          ? 'bg-gray-700 text-gray-200 border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      } rounded-md border px-2 py-1 w-full`}
                    />
                  ) : (
                    <span>{userData.company}</span>
                  )}
                </div>
                <div className={`flex items-center ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <MapPin className="h-5 w-5 mr-3" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={userData.location}
                      onChange={handleInputChange('location')}
                      className={`${
                        darkMode 
                          ? 'bg-gray-700 text-gray-200 border-gray-600' 
                          : 'bg-white text-gray-900 border-gray-300'
                      } rounded-md border px-2 py-1 w-full`}
                    />
                  ) : (
                    <span>{userData.location}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Subscription Details
              </h2>
              <div className={`rounded-md ${darkMode ? 'bg-gray-700' : 'bg-gray-50'} p-4`}>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Premium Plan
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Valid until December 31, 2024
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Access & Permissions
              </h2>
              <div className="space-y-2">
                <div className={`flex items-center justify-between py-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Concuria</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-green-900 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    Full Access
                  </span>
                </div>
                <div className={`flex items-center justify-between py-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Tool 2</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    Coming Soon
                  </span>
                </div>
                <div className={`flex items-center justify-between py-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  <span>Tool 3</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;