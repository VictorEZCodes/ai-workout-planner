'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../../components/Layout';
import { analyzeFoodPlate } from '../../utils/api';

const AnalyzeFoodForm = ({ onSubmit }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!imageUrl) {
      setError('Please enter an image URL');
      return;
    }

    try {
      onSubmit(imageUrl);
    } catch (err) {
      setError('Error processing image URL');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Enter Food Image URL</label>
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="https://example.com/food-image.jpg"
          required
        />
      </div>
      {error && <p className="text-red-600">{error}</p>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Analyze Food Plate
      </button>
    </form>
  );
};

const AnalysisDisplay = ({ analysis }) => {
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Food Plate Analysis</h3>
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Foods Identified</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                {analysis.foodsIdentified.map((food, index) => (
                  <li key={index}>{food}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Portion Sizes</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                {Object.entries(analysis.portionSizes).map(([food, portion], index) => (
                  <li key={index}>{food}: {portion}</li>
                ))}
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Estimated Calories</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{analysis.estimatedCalories} kcal</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Macronutrients</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                <li>Protein: {analysis.macronutrients.protein}</li>
                <li>Carbs: {analysis.macronutrients.carbs}</li>
                <li>Fats: {analysis.macronutrients.fats}</li>
              </ul>
            </dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Meal Balance</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{analysis.mealBalance}</dd>
          </div>
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Suggestions</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <ul className="list-disc pl-5">
                {analysis.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default function AnalyzeFoodPage() {
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeFood = async (imageUrl) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await analyzeFoodPlate(imageUrl);
      setAnalysis(result);

      // Record the activity
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'FOOD_ANALYZED',
          description: `Analyzed food plate: ${result.foodsIdentified.slice(0, 3).join(', ')}...`,
        }),
      });

      // Optionally, redirect to dashboard
      // router.push('/dashboard');
    } catch (err) {
      console.error('Error analyzing food plate:', err);
      setError(`Failed to analyze food plate: ${err.message}`);
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
              <h1 className="text-3xl font-bold text-gray-900 mb-6">Analyze Food Plate</h1>
              {isLoading ? (
                <p className="text-center text-gray-600">Analyzing your food plate...</p>
              ) : error ? (
                <p className="text-center text-red-600">{error}</p>
              ) : !analysis ? (
                <AnalyzeFoodForm onSubmit={handleAnalyzeFood} />
              ) : (
                <AnalysisDisplay analysis={analysis} />
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}