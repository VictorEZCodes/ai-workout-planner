'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { getExerciseDetails } from '../../utils/api';

const ExerciseDetailsForm = ({ onSubmit }) => {
  const [exerciseName, setExerciseName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(exerciseName);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="exerciseName" className="block text-sm font-medium text-gray-700">
          Exercise Name
        </label>
        <input
          type="text"
          id="exerciseName"
          name="exerciseName"
          value={exerciseName}
          onChange={(e) => setExerciseName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Get Exercise Details
      </button>
    </form>
  );
};

const ExerciseDetailsDisplay = ({ details }) => {
  const { result } = details;

  // Function to clean up instructions
  const cleanInstructions = (instructions) => {
    return instructions.map(instruction =>
      instruction.replace(/^Step \d+:\s*/, '').trim()
    );
  };

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{result.exercise_name}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{result.seo_content}</p>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {result.description && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.description}</dd>
            </div>
          )}
          {result.primary_muscles && result.primary_muscles.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Primary Muscles</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {result.primary_muscles.join(', ')}
              </dd>
            </div>
          )}
          {result.secondary_muscles && result.secondary_muscles.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Secondary Muscles</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {result.secondary_muscles.join(', ')}
              </dd>
            </div>
          )}
          {result.equipment_needed && result.equipment_needed.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Equipment Needed</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {result.equipment_needed.join(', ')}
              </dd>
            </div>
          )}
          {result.instructions && result.instructions.length > 0 && (
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Instructions</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ol className="list-decimal list-inside">
                  {cleanInstructions(result.instructions).map((step, index) => (
                    <li key={index} className="mb-2">{step}</li>
                  ))}
                </ol>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
};

export default function ExerciseDetailsPage() {
  const router = useRouter();
  const [exerciseDetails, setExerciseDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetExerciseDetails = async (exerciseName) => {
    setIsLoading(true);
    setError(null);
    try {
      const details = await getExerciseDetails(exerciseName);
      setExerciseDetails(details);

      // Record the activity
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'EXERCISE_DETAILS_VIEWED',
          description: `Viewed details for exercise: ${exerciseName}`,
        }),
      });
    } catch (err) {
      setError('Failed to get exercise details. Please try again.');
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
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Exercise Details</h1>
              {isLoading ? (
                <p className="text-center text-gray-600">Loading exercise details...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : !exerciseDetails ? (
                <ExerciseDetailsForm onSubmit={handleGetExerciseDetails} />
              ) : (
                <ExerciseDetailsDisplay details={exerciseDetails} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}