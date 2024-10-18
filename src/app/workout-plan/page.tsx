'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import WorkoutPlanForm from '../../components/WorkoutPlanForm';
import WorkoutPlanDisplay from '../../components/WorkoutPlanDisplay';
import { generateWorkoutPlan } from '../../utils/api';

export default function WorkoutPlanPage() {
  const router = useRouter();
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGeneratePlan = async (formData) => {
    try {
      setError(null);
      setIsLoading(true);
      const plan = await generateWorkoutPlan(formData);
      // console.log('Received plan in page component:', JSON.stringify(plan, null, 2));
      setWorkoutPlan(plan);

      // Record the activity
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'WORKOUT_PLAN_GENERATED',
          description: `Generated a new workout plan for ${formData.goal || 'unspecified goal'}`,
        }),
      });

      // Optionally, redirect to dashboard
      // router.push('/dashboard');
    } catch (err) {
      // console.error('Error generating plan:', err);
      setError(err.message || 'An error occurred while generating the workout plan.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Generate Your Workout Plan</h1>
          {error && <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>}
          {isLoading ? (
            <p className="text-center text-gray-600 dark:text-gray-300">Generating your workout plan...</p>
          ) : !workoutPlan ? (
            <div className="text-gray-900 dark:text-white">
              <WorkoutPlanForm onSubmit={handleGeneratePlan} />
            </div>
          ) : (
            <div className="text-gray-900 dark:text-white">
              <WorkoutPlanDisplay plan={workoutPlan} />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}