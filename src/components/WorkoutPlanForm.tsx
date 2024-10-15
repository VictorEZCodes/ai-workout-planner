'use client';

import { useState } from 'react';

const WorkoutPlanForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    fitnessGoal: '',
    fitnessLevel: '',
    preferences: [],
    healthConditions: [],
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

  const handleArrayChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value.split(',').map(item => item.trim())
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="fitnessGoal" className="block text-sm font-medium text-gray-700">Fitness Goal</label>
        <input
          type="text"
          id="fitnessGoal"
          name="fitnessGoal"
          value={formData.fitnessGoal}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Build muscle, Lose weight"
        />
      </div>

      <div>
        <label htmlFor="fitnessLevel" className="block text-sm font-medium text-gray-700">Fitness Level</label>
        <select
          id="fitnessLevel"
          name="fitnessLevel"
          value={formData.fitnessLevel}
          onChange={handleChange}
          className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        >
          <option value="">Select your level</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        <label htmlFor="preferences" className="block text-sm font-medium text-gray-700">Preferences (comma-separated)</label>
        <input
          type="text"
          id="preferences"
          name="preferences"
          value={formData.preferences.join(', ')}
          onChange={handleArrayChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., Weight training, Cardio, Yoga"
        />
      </div>

      <div>
        <label htmlFor="healthConditions" className="block text-sm font-medium text-gray-700">Health Conditions (comma-separated)</label>
        <input
          type="text"
          id="healthConditions"
          name="healthConditions"
          value={formData.healthConditions.join(', ')}
          onChange={handleArrayChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="e.g., None, Lower back pain"
        />
      </div>

      <div>
        <label htmlFor="daysPerWeek" className="block text-sm font-medium text-gray-700">Days Per Week</label>
        <input
          type="number"
          id="daysPerWeek"
          name="daysPerWeek"
          value={formData.daysPerWeek}
          onChange={handleChange}
          min="1"
          max="7"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="workoutDuration" className="block text-sm font-medium text-gray-700">Workout Duration (minutes)</label>
        <input
          type="number"
          id="workoutDuration"
          name="workoutDuration"
          value={formData.workoutDuration}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <label htmlFor="planDurationWeeks" className="block text-sm font-medium text-gray-700">Plan Duration (weeks)</label>
        <input
          type="number"
          id="planDurationWeeks"
          name="planDurationWeeks"
          value={formData.planDurationWeeks}
          onChange={handleChange}
          min="1"
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Workout Plan
        </button>
      </div>
    </form>
  );
};

export default WorkoutPlanForm;