'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { getCustomWorkoutPlan } from '../../utils/api';

const CustomWorkoutForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    goal: '',
    fitnessLevel: '',
    preferences: [],
    healthConditions: [],
    daysPerWeek: '',
    sessionDuration: '',
    planDurationWeeks: '',
    customGoals: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Goal</label>
        <input
          type="text"
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Fitness Level</label>
        <select
          name="fitnessLevel"
          value={formData.fitnessLevel}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        >
          <option value="">Select Fitness Level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Preferences (comma-separated)</label>
        <input
          type="text"
          name="preferences"
          value={formData.preferences.join(', ')}
          onChange={handleArrayChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Health Conditions (comma-separated)</label>
        <input
          type="text"
          name="healthConditions"
          value={formData.healthConditions.join(', ')}
          onChange={handleArrayChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Days Per Week</label>
        <input
          type="number"
          name="daysPerWeek"
          value={formData.daysPerWeek}
          onChange={handleChange}
          min="1"
          max="7"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Session Duration (minutes)</label>
        <input
          type="number"
          name="sessionDuration"
          value={formData.sessionDuration}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Plan Duration (weeks)</label>
        <input
          type="number"
          name="planDurationWeeks"
          value={formData.planDurationWeeks}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Custom Goals (comma-separated)</label>
        <input
          type="text"
          name="customGoals"
          value={formData.customGoals.join(', ')}
          onChange={handleArrayChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Generate Custom Workout Plan
      </button>
    </form>
  );
};

const WorkoutPlanDisplay = ({ plan }) => {
  console.log("Received plan:", plan);

  if (!plan || !plan.exercises) {
    return <p>No workout plan available.</p>;
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-2xl font-bold text-gray-900">Workout Plan</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{plan.seoContent}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Goal</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{plan.goal}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Fitness Level</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{plan.fitnessLevel}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Duration</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {plan.totalWeeks === -1 ? "Ongoing" : `${plan.totalWeeks} weeks`}
            </dd>
          </div>
          {plan.schedule && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Schedule</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {plan.schedule.days_per_week} days per week, {plan.schedule.session_duration} minutes per session
              </dd>
            </div>
          )}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="border-t border-gray-200">
              <dl>
                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt className="text-sm font-medium text-gray-500">Exercises</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {plan.exercises.map((dayPlan, index) => (
                      <div key={index} className="mb-6">
                        <h4 className="font-semibold text-lg mb-3 bg-blue-100 p-2 rounded">{dayPlan.day}</h4>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                          {dayPlan.exercises.map((exercise, exIndex) => (
                            <div key={exIndex} className="bg-white shadow-sm rounded-lg p-3 border border-gray-200">
                              <p className="font-medium text-blue-600 mb-2">{exercise.name}</p>
                              <p className="text-sm"><span className="font-medium">Duration:</span> {exercise.duration}</p>
                              <p className="text-sm"><span className="font-medium">Repetitions:</span> {exercise.repetitions}</p>
                              <p className="text-sm"><span className="font-medium">Sets:</span> {exercise.sets}</p>
                              <p className="text-sm"><span className="font-medium">Equipment:</span> {exercise.equipment || 'None'}</p>
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
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Custom Workout Plan</h1>
              {isLoading ? (
                <p className="text-center text-gray-600">Generating your custom workout plan...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
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