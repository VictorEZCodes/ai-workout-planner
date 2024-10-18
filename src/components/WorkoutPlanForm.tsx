'use client';

import { useState } from 'react';

const WorkoutPlanForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fitnessGoal: '',
    fitnessLevel: '',
    preferences: '',
    healthConditions: '',
    daysPerWeek: '',
    workoutDuration: '',
    planDurationWeeks: '4',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    if (value === '' || /^\d+$/.test(value)) {
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submissionData = {
      ...formData,
      preferences: formData.preferences.split(',').map(item => item.trim()).filter(Boolean),
      healthConditions: formData.healthConditions.split(',').map(item => item.trim()).filter(Boolean),
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fitness Goal</label>
        <input
          type="text"
          id="fitnessGoal"
          name="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Build muscle, Lose weight"
        />
      </div>

      <div>
        <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Fitness Level</label>
        <select
          id="fitnessLevel"
          name="fitnessLevel"
          value={formData.fitnessLevel}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          <option value="">Select your level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferences" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Preferences (comma-separated)</label>
        <input
          type="text"
          id="preferences"
          name="preferences"
          value={formData.preferences}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Weight training, Cardio, Yoga"
        />
      </div>

      <div>
        <label htmlFor="healthConditions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Health Conditions (comma-separated)</label>
        <input
          type="text"
          id="healthConditions"
          name="healthConditions"
          value={formData.healthConditions}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., None, Lower back pain"
        />
      </div>

      <div>
        <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Days Per Week</label>
        <input
          type="text"
          id="daysPerWeek"
          name="daysPerWeek"
          value={formData.daysPerWeek}
          onChange={handleNumericChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="workoutDuration" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Workout Duration (minutes)</label>
        <input
          type="text"
          id="workoutDuration"
          name="workoutDuration"
          value={formData.workoutDuration}
          onChange={handleNumericChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="planDurationWeeks" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Plan Duration (weeks)</label>
        <input
          type="text"
          id="planDurationWeeks"
          name="planDurationWeeks"
          value={formData.planDurationWeeks}
          onChange={handleNumericChange}
          className="mt-1 block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm py-2 px-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Workout Plan
        </button>
      </div>
    </form>
  );
};

export default WorkoutPlanForm;