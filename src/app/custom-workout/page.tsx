'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { getCustomWorkoutPlan } from '../../utils/api';

const CustomWorkoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    goal: '',
    fitnessLevel: '',
    // preferences: [],
    // healthConditions: [],
    daysPerWeek: '',
    sessionDuration: '',
    planDurationWeeks: '',
    // customGoals: [],
    preferences: '',
    healthConditions: '',
    customGoals: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      preferences: formData.preferences.split(',').map(item => item.trim()).filter(Boolean),
      healthConditions: formData.healthConditions.split(',').map(item => item.trim()).filter(Boolean),
      customGoals: formData.customGoals.split(',').map(item => item.trim()).filter(Boolean),
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Goal</label>
        <input
          type="text"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Fitness Level</label>
        <select
          name="fitnessLevel"
          value={formData.fitnessLevel}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          required
        >
          <option value="">Select Fitness Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Preferences (comma-separated)</label>
        <input
          type="text"
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          placeholder="e.g. muscle build, cardio, strength"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Health Conditions (comma-separated)</label>
        <input
          type="text"
          name="healthConditions"
          value={formData.healthConditions}
          onChange={handleChange}
          placeholder="e.g. back pain, asthma"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Days Per Week</label>
        <input
          type="text"
          name="daysPerWeek"
          value={formData.daysPerWeek}
          onChange={handleNumericChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Session Duration (minutes)</label>
        <input
          type="text"
          name="sessionDuration"
          value={formData.sessionDuration}
          onChange={handleNumericChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Plan Duration (weeks)</label>
        <input
          type="text"
          name="planDurationWeeks"
          value={formData.planDurationWeeks}
          onChange={handleNumericChange}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-white">Custom Goals (comma-separated)</label>
        <input
          type="text"
          name="customGoals"
          value={formData.customGoals}
          onChange={handleChange}
          placeholder="e.g. lose weight, gain muscle"
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:text-white"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Custom Workout Plan
      </button>
    </form>
  );
};

const WorkoutPlanDisplay = ({ plan }) => {
  // console.log("Received plan:", plan);

  if (!plan || !plan.exercises) {
    return <p>No workout plan available.</p>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Workout Plan</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500 dark:text-gray-400">{plan.seoContent}</p>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200 dark:divide-gray-700">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Goal</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{plan.goal}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Fitness Level</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">{plan.fitnessLevel}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500 dark:text-white">Duration</dt>
            <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
              {plan.totalWeeks === -1 ? "Ongoing" : `${plan.totalWeeks} weeks`}
            </dd>
          </div>
          {plan.schedule && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">Schedule</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                {plan.schedule.days_per_week} days per week, {plan.schedule.session_duration} minutes per session
              </dd>
            </div>
          )}
          <div className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg">
            <div className="border-t border-gray-200 dark:border-gray-700">
              <dl>
                <div className="bg-gray-50 dark:bg-gray-700 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500 dark:text-white">Exercises</dt>
                  <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2">
                    {plan.exercises.map((dayPlan, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="font-semibold text-lg mb-3 bg-blue-100 dark:bg-blue-900 p-2 rounded">{dayPlan.day}</h4>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {dayPlan.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} className="bg-white dark:bg-gray-700 shadow-sm rounded-lg p-3 border border-gray-200 dark:border-gray-600">
                              <p className="font-medium text-blue-600 dark:text-blue-400 mb-2">{exercise.name}</p>
                              <p className="text-sm dark:text-gray-300"><span className="font-medium dark:text-white">Duration:</span> {exercise.duration}</p>
                              <p className="text-sm dark:text-gray-300"><span className="font-medium dark:text-white">Repetitions:</span> {exercise.repetitions}</p>
                              <p className="text-sm dark:text-gray-300"><span className="font-medium dark:text-white">Sets:</span> {exercise.sets}</p>
                              <p className="text-sm dark:text-gray-300"><span className="font-medium dark:text-white">Equipment:</span> {exercise.equipment || 'None'}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default function CustomWorkoutPage() {
  const router = useRouter();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetCustomWorkoutPlan = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const plan = await getCustomWorkoutPlan(formData);
      setWorkoutPlan(plan);

      // Record the activity
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'WORKOUT_PLAN_CREATED',
          description: `Created a new ${plan.goal} workout plan`,
        }),
      });

      // Optionally, redirect to dashboard
      // router.push('/dashboard');
    } catch (err) {
      setError('Failed to generate custom workout plan. Please try again.');
      // console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Generate Custom Workout Plan</h1>
              {isLoading ? (
                <p className="text-center text-gray-600 dark:text-gray-300">Generating your custom workout plan...</p>
              ) : error ? (
                <p className="text-center text-red-600 dark:text-red-400">{error}</p>
              ) : !workoutPlan ? (
                <CustomWorkoutForm onSubmit={handleGetCustomWorkoutPlan} />
              ) : (
                <WorkoutPlanDisplay plan={workoutPlan} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}