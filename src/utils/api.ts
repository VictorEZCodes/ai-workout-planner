const RAPID_API_KEY = process.env.NEXT_PUBLIC_RAPID_API_KEY;
const RAPID_API_HOST = process.env.NEXT_PUBLIC_RAPID_API_HOST;
import nodemailer from "nodemailer";

export async function generateWorkoutPlan(formData) {
  if (!RAPID_API_KEY || !RAPID_API_HOST) {
    throw new Error(
      "RapidAPI key or host is not defined in environment variables"
    );
  }

  const url =
    "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/generateWorkoutPlan";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
    body: JSON.stringify({
      goal: formData.fitnessGoal,
      fitness_level: formData.fitnessLevel,
      preferences: formData.preferences,
      health_conditions: formData.healthConditions,
      schedule: {
        days_per_week: parseInt(formData.daysPerWeek),
        session_duration: parseInt(formData.workoutDuration),
      },
      plan_duration_weeks: parseInt(formData.planDurationWeeks) || 4,
      lang: "en",
    }),
  };

  console.log(
    "Sending request with options:",
    JSON.stringify(options, null, 2)
  );

  try {
    const response = await fetch(url + "?noqueue=1", options);
    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      JSON.stringify(Object.fromEntries(response.headers), null, 2)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getNutritionAdvice(formData) {
  if (!RAPID_API_KEY || !RAPID_API_HOST) {
    throw new Error(
      "RapidAPI key or host is not defined in environment variables"
    );
  }

  const url =
    "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/nutritionAdvice";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
    body: JSON.stringify({
      goal: formData.goal,
      dietary_restrictions: formData.dietaryRestrictions,
      current_weight: parseInt(formData.currentWeight),
      target_weight: parseInt(formData.targetWeight),
      daily_activity_level: formData.dailyActivityLevel,
      lang: "en",
    }),
  };

  console.log(
    "Sending nutrition advice request with options:",
    JSON.stringify(options, null, 2)
  );

  try {
    const response = await fetch(url + "?noqueue=1", options);
    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      JSON.stringify(Object.fromEntries(response.headers), null, 2)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getExerciseDetails(exerciseName: string) {
  if (!RAPID_API_KEY || !RAPID_API_HOST) {
    throw new Error(
      "RapidAPI key or host is not defined in environment variables"
    );
  }

  const url =
    "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/exerciseDetails";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
    body: JSON.stringify({
      exercise_name: exerciseName,
      lang: "en",
    }),
  };

  console.log(
    "Sending exercise details request with options:",
    JSON.stringify(options, null, 2)
  );

  try {
    const response = await fetch(url + "?noqueue=1", options);
    console.log("Response status:", response.status);
    console.log(
      "Response headers:",
      JSON.stringify(Object.fromEntries(response.headers), null, 2)
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API Response:", JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getCustomWorkoutPlan(formData) {
  if (!RAPID_API_KEY || !RAPID_API_HOST) {
    throw new Error(
      "RapidAPI key or host is not defined in environment variables"
    );
  }

  const url =
    "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/customWorkoutPlan";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
    body: JSON.stringify({
      goal: formData.goal,
      fitness_level: formData.fitnessLevel,
      preferences: formData.preferences,
      health_conditions: formData.healthConditions,
      schedule: {
        days_per_week: parseInt(formData.daysPerWeek),
        session_duration: parseInt(formData.sessionDuration),
      },
      plan_duration_weeks: parseInt(formData.planDurationWeeks),
      custom_goals: formData.customGoals,
      lang: "en",
    }),
  };

  console.log(
    "Sending custom workout plan request with options:",
    JSON.stringify(options, null, 2)
  );

  try {
    const response = await fetch(url + "?noqueue=1", options);
    const responseText = await response.text();
    console.log("Response status:", response.status);
    console.log("Response text:", responseText);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${responseText}`
      );
    }

    const result = JSON.parse(responseText);

    // Extract the data from the 'result' object
    const formattedResult = {
      goal: result.result.goal,
      customGoals: result.result.custom_goals,
      fitnessLevel: result.result.fitness_level,
      totalWeeks: result.result.total_weeks,
      schedule: result.result.schedule,
      exercises: result.result.exercises,
      seoTitle: result.result.seo_title,
      seoContent: result.result.seo_content,
      seoKeywords: result.result.seo_keywords,
    };

    console.log(
      "Formatted API Response:",
      JSON.stringify(formattedResult, null, 2)
    );
    return formattedResult;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function analyzeFoodPlate(imageUrl: string) {
  if (!RAPID_API_KEY || !RAPID_API_HOST) {
    throw new Error(
      "RapidAPI key or host is not defined in environment variables"
    );
  }

  const url =
    "https://ai-workout-planner-exercise-fitness-nutrition-guide.p.rapidapi.com/analyzeFoodPlate";
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": RAPID_API_KEY,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
    body: JSON.stringify({
      image_url: imageUrl,
      lang: "en",
    }),
  };

  console.log("Sending food plate analysis request");
  console.log("Request body:", options.body);

  try {
    const response = await fetch(url + "?noqueue=1", options);
    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    const responseText = await response.text();
    console.log("Response text:", responseText);

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, body: ${responseText}`
      );
    }

    const result = JSON.parse(responseText);

    // Format the result
    const formattedResult = {
      foodsIdentified: result.result.foods_identified,
      portionSizes: result.result.portion_sizes,
      estimatedCalories: result.result.estimated_calories,
      macronutrients: result.result.macronutrients,
      mealBalance: result.result.meal_balance,
      suggestions: result.result.suggestions,
    };

    console.log(
      "Formatted API Response:",
      JSON.stringify(formattedResult, null, 2)
    );
    return formattedResult;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function sendEmail(name: string, email: string, message: string) {
  console.log("sendEmail function called with:", { name, email, message });

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error("Email credentials missing");
    throw new Error(
      "Email credentials are not defined in environment variables"
    );
  }

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"AI Workout Planner" <${process.env.EMAIL_USER}>`,
      to: "cron3652@gmail.com", // Your email address
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    console.log("Message sent: %s", info.messageId);
    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Detailed error sending email:", error);
    throw error;
  }
}
