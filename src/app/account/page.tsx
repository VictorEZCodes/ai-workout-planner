'use client';

import { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";
import Layout from '../../components/Layout';
import toast, { Toaster } from 'react-hot-toast';
import { useUserContext } from '../../contexts/UserContext';

export default function AccountPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { firstName, lastName, updateName, setFirstName, setLastName } = useUserContext();
  const [activeTab, setActiveTab] = useState('profile');

  // Profile state
  const [localFirstName, setLocalFirstName] = useState(firstName);
  const [localLastName, setLocalLastName] = useState(lastName);
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Settings state
  const [darkMode, setDarkMode] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    showEmail: true,
    showFullName: true,
    allowDataCollection: true,
  });

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      setFirstName(user?.firstName || '');
      setLastName(user?.lastName || '');
      setEmail(user?.primaryEmailAddress?.emailAddress || '');
      // Fetch user settings from your API
      fetchUserSettings();
    }
  }, [isLoaded, isSignedIn, user, setFirstName, setLastName]);

  const fetchUserSettings = async () => {
    try {
      const response = await fetch('/api/user-settings');
      if (response.ok) {
        const settings = await response.json();
        setDarkMode(settings.darkMode);
        setPrivacySettings(settings.privacySettings);
      }
    } catch (error) {
      // console.error('Error fetching user settings:', error);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    try {
      if (!user) throw new Error('User not found');

      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: localFirstName, lastName: localLastName }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      updateName(localFirstName, localLastName);
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      // console.error('Error updating profile:', error);
      setErrorMessage(`Failed to update profile: ${error.message}`);
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/update-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ darkMode, privacySettings }),
      });

      if (!response.ok) {
        throw new Error('Failed to update settings');
      }

      toast.success('Settings saved successfully!');
      // Apply dark mode
      document.documentElement.classList.toggle('dark', darkMode);
    } catch (error: any) {
      // console.error('Error updating settings:', error);
      toast.error(`Failed to update settings: ${error.message}`);
    }
  };

  if (!isLoaded || !isSignedIn) {
    // return <div></div>;
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" reverseOrder={false} />
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Account</h1>
          <div className="overflow-hidden sm:rounded-lg">
            <div className="border-b border-gray-200 dark:border-gray-700">
              <nav className="-mb-px flex">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`${activeTab === 'profile'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Profile
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`${activeTab === 'settings'
                    ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ml-8`}
                >
                  Settings
                </button>
              </nav>
            </div>
            <div className="px-4 py-5 sm:p-6">
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Profile Information</h2>
                  {errorMessage && (
                    <div className="bg-red-100 dark:bg-red-900 border border-red-400 dark:border-red-700 text-red-700 dark:text-red-300 px-4 py-3 rounded relative mb-4" role="alert">
                      <span className="block sm:inline">{errorMessage}</span>
                    </div>
                  )}
                  <form onSubmit={handleProfileSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        value={localFirstName}
                        onChange={(e) => setLocalFirstName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        value={localLastName}
                        onChange={(e) => setLocalLastName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        readOnly
                        className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-gray-100 dark:bg-gray-600 sm:text-sm text-gray-900 dark:text-gray-300"
                      />
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              )}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Account Settings</h2>
                  <form onSubmit={handleSettingsSubmit} className="space-y-6">
                    <div>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={darkMode}
                          onChange={(e) => setDarkMode(e.target.checked)}
                          className="form-checkbox h-5 w-5 text-indigo-600 dark:text-indigo-400"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Dark Mode</span>
                      </label>
                    </div>
                    <div className="space-y-4">
                      <h3 className="text-md font-medium text-gray-900 dark:text-white">Privacy Settings</h3>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={privacySettings.allowDataCollection}
                          onChange={(e) => setPrivacySettings({ ...privacySettings, allowDataCollection: e.target.checked })}
                          className="form-checkbox h-5 w-5 text-indigo-600 dark:text-indigo-400"
                        />
                        <span className="ml-2 text-gray-700 dark:text-gray-300">Allow data collection for personalized experience</span>
                      </label>
                    </div>
                    <div>
                      <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save Settings
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}