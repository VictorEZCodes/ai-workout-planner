'use client';

import { useUser } from "@clerk/nextjs";
import Layout from "../../components/Layout";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUserContext } from '../../contexts/UserContext';
import {
  ChartBarIcon,
  ClipboardDocumentListIcon,
  CakeIcon,
  PencilSquareIcon,
  CameraIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

const features = [
  { name: 'Workout Plan', icon: ChartBarIcon, href: '/workout-plan', description: 'View and manage your current workout plan' },
  { name: 'Custom Workout', icon: PencilSquareIcon, href: '/custom-workout', description: 'Create a personalized workout plan' },
  { name: 'Exercise Library', icon: ClipboardDocumentListIcon, href: '/exercise-library', description: 'Browse and learn about various exercises' },
  { name: 'Nutrition', icon: CakeIcon, href: '/nutrition', description: 'Track your nutrition and get meal recommendations' },
  { name: 'Analyze Food', icon: CameraIcon, href: '/analyze-food', description: 'Analyze your meals with AI' },
];

const FeatureCard = ({ feature, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
  >
    <div className="p-6 flex-grow">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <feature.icon className="h-8 w-8 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">{feature.name}</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 mt-auto">
      <Link href={feature.href} className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300">
        Go to {feature.name} <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  </motion.div>
);

export default function DashboardPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { firstName } = useUserContext();
  const [activities, setActivities] = useState([]);
  const [isLoadingActivities, setIsLoadingActivities] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      fetchActivities();
    }
  }, [isSignedIn]);

  const fetchActivities = async () => {
    setIsLoadingActivities(true);
    try {
      const response = await fetch('/api/activities');
      if (response.ok) {
        const data = await response.json();
        setActivities(data);
      } else {
        // console.error('Failed to fetch activities:', await response.text());
      }
    } catch (error) {
      // console.error('Error fetching activities:', error);
    } finally {
      setIsLoadingActivities(false);
    }
  };

  const handleClearActivities = async () => {
    try {
      const response = await fetch('/api/activities', {
        method: 'DELETE',
      });
      if (response.ok) {
        setActivities([]);
      } else {
        // console.error('Failed to clear activities:', await response.text());
      }
    } catch (error) {
      // console.error('Error clearing activities:', error);
    }
  };

  if (!isLoaded || !isSignedIn) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden">
              <div className="px-4 py-5 sm:p-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Please Sign In</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">You need to be signed in to view your dashboard.</p>
                <Link href="/sign-in" className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-500 dark:bg-indigo-500 dark:hover:bg-indigo-400 transition-colors duration-300">Sign In</Link>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden mb-8"
          >
            <div className="px-6 py-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {firstName}!</h1>
              <p className="text-gray-600 dark:text-gray-400">Here's an overview of your fitness journey.</p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <FeatureCard key={feature.name} feature={feature} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleClearActivities}
                className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600 transition-colors duration-300"
              >
                <TrashIcon className="h-5 w-5 mr-2" />
                Clear All
              </motion.button>
            </div>
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
              <AnimatePresence>
                {isLoadingActivities ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="px-6 py-4 text-gray-500 dark:text-gray-400"
                  >
                    Loading activities...
                  </motion.p>
                ) : (
                  <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                    {activities.map((activity) => (
                      <motion.li
                        key={activity._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{activity.description}</p>
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                            {new Date(activity.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </motion.li>
                    ))}
                    {activities.length === 0 && (
                      <motion.li
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="px-6 py-4"
                      >
                        <p className="text-sm text-gray-500 dark:text-gray-400">No recent activities</p>
                      </motion.li>
                    )}
                  </ul>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}