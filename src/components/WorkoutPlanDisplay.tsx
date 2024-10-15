'use client';

const WorkoutPlanDisplay = ({ plan }) => {
  console.log('Received plan:', JSON.stringify(plan, null, 2));

  if (!plan || !plan.result) {
    return <p>No workout plan available.</p>;
  }

  const { result } = plan;

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
            <dt className="text-sm font-medium text-gray-500">Fitness Level</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.fitness_level}</dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Duration</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{result.total_weeks} weeks</dd>
          </div>
          <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Schedule</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {result.schedule.days_per_week} days per week, {result.schedule.session_duration} minutes per session
            </dd>
          </div>
          <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
            <dt className="text-sm font-medium text-gray-500">Exercises</dt>
            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {result.exercises.map((dayPlan, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-semibold text-lg mb-3 bg-blue-100 p-2 rounded">{dayPlan.day}</h4>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {dayPlan.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="bg-white shadow-sm rounded-lg p-3 border border-gray-200">
                        <p className="font-medium text-blue-600 mb-2">{exercise.name}</p>
                        <p className="text-sm"><span className="font-medium">Duration:</span> {exercise.duration}</p>
                        <p className="text-sm"><span className="font-medium">Repetitions:</span> {exercise.repetitions}</p>
                        <p className="text-sm"><span className="font-medium">Sets:</span> {exercise.sets}</p>
                        <p className="text-sm"><span className="font-medium">Equipment:</span> {exercise.equipment}</p>
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
  );
};

export default WorkoutPlanDisplay;