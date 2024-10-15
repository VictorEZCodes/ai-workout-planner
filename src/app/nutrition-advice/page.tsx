'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { getNutritionAdvice } from '../../utils/api';

const NutritionAdviceForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    goal: '',
    dietaryRestrictions: [],
    currentWeight: '',
    targetWeight: '',
    dailyActivityLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDietaryRestrictions = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      dietaryRestrictions: checked
        ? [...prev.dietaryRestrictions, value]
        : prev.dietaryRestrictions.filter(item => item !== value)
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
        <select
          name="goal"
          value={formData.goal}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select a goal</option>
          <option value="Lose weight">Lose weight</option>
          <option value="Gain weight">Gain weight</option>
          <option value="Maintain weight">Maintain weight</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
        <div className="mt-2 space-y-2">
          {['Vegetarian', 'Vegan', 'Gluten-free', 'Lactose-free', 'Nut-free'].map((restriction) => (
            <div key={restriction} className="flex items-center">
              <input
                type="checkbox"
                id={restriction}
                name="dietaryRestrictions"
                value={restriction}
                checked={formData.dietaryRestrictions.includes(restriction)}
                onChange={handleDietaryRestrictions}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={restriction} className="ml-2 block text-sm text-gray-900">
                {restriction}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Current Weight (kg)</label>
        <input
          type="number"
          name="currentWeight"
          value={formData.currentWeight}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
        <input
          type="number"
          name="targetWeight"
          value={formData.targetWeight}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Daily Activity Level</label>
        <select
          name="dailyActivityLevel"
          value={formData.dailyActivityLevel}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select activity level</option>
          <option value="Sedentary">Sedentary</option>
          <option value="Lightly active">Lightly active</option>
          <option value="Moderately active">Moderately active</option>
          <option value="Very active">Very active</option>
          <option value="Extra active">Extra active</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Get Nutrition Advice
      </button>
    </form>
  );
};

const NutritionAdviceDisplay = ({ advice }) => {
  const { result } = advice;

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-2xl leading-6 font-bold text-gray-900">{result.seo_title}</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">{result.seo_content}</p>
      </div>
      <div className="border-t border-gray-200">
        <dl>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Goal</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.goal}</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Recommended Exercise</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <p className="font-semibold">{result.exercise_name}</p>
              <p>{result.description}</p>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Daily Calorie Intake</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.calories_per_day} calories</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Macronutrients</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                {Object.entries(result.macronutrients).map(([nutrient, percentage]) => (
                  <li key={nutrient} className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="ml-2 flex-1 w-0 truncate capitalize">{nutrient}</span>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <span className="font-medium">{percentage}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Meal Suggestions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {result.meal_suggestions.map((meal, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-semibold">{meal.meal}</h4>
                  {meal.suggestions.map((suggestion, suggIndex) => (
                    <div key={suggIndex} className="ml-4">
                      <p className="font-medium">{suggestion.name} ({suggestion.calories} calories)</p>
                      <p className="text-sm text-gray-600">Ingredients: {suggestion.ingredients.join(', ')}</p>
                    </div>
                  ))}
                </div>
              ))}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default function NutritionAdvicePage() {
  const router = useRouter();
  const [nutritionAdvice, setNutritionAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGetAdvice = async (formData) => {
    setIsLoading(true);
    setError(null);
    try {
      const advice = await getNutritionAdvice(formData);
      setNutritionAdvice(advice);

      // Record the activity
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'NUTRITION_ADVICE_RECEIVED',
          description: `Received nutrition advice for ${formData.goal} goal`,
        }),
      });

      // Optionally, redirect to dashboard
      // router.push('/dashboard');
    } catch (err) {
      setError('Failed to get nutrition advice. Please try again.');
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
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Get Personalized Nutrition Advice</h1>
              {isLoading ? (
                <p className="text-center text-gray-600">Loading your personalized nutrition advice...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : !nutritionAdvice ? (
                <NutritionAdviceForm onSubmit={handleGetAdvice} />
              ) : (
                <NutritionAdviceDisplay advice={nutritionAdvice} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}