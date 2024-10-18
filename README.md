# AI Workout Planner

AI Workout Planner is a Next.js-based web application that leverages artificial intelligence to create personalized workout plans and provide nutrition advice tailored to your fitness goals.

## Features

- Personalized workout plan generation
- Custom workout creation
- Nutrition advice and meal suggestions
- Exercise library with detailed instructions
- User dashboard with activity tracking
- Food analysis using AI
- Responsive design for desktop and mobile devices

## Technologies Used

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion for animations
- MongoDB with Mongoose
- Clerk for authentication
- RapidAPI for AI-powered workout planning

## Getting Started

1. Clone the repository:

   ```
   git clone https://github.com/your-username/ai-workout-planner.git
   cd ai-workout-planner
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:

   ```
   RAPID_API_KEY=your_rapidapi_key
   RAPID_API_HOST=your_rapidapi_host
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   MONGODB_URI=your_mongodb_uri
   ```

4. Run the development server:

   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `src/app`: Contains the main application pages and layouts
- `src/components`: Reusable React components
- `src/utils`: Utility functions and API calls
- `src/models`: MongoDB schema definitions
- `src/contexts`: React context providers

## Key Components

### Main Page

### Workout Plan Generation

### Dashboard

### Nutrition Advice

## API Integration

The application uses RapidAPI to generate workout plans. Here's an example of how the API is called:

## Styling

The project uses Tailwind CSS for styling. The configuration can be found in:

## Deployment

This project is configured for easy deployment on Netlify. The `netlify.toml` file in the root directory contains the necessary configuration.

For other deployment options, please refer to the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Clerk](https://clerk.dev/)
- [RapidAPI](https://rapidapi.com/)
- [MongoDB](https://www.mongodb.com/)
- [Netlify](https://www.netlify.com/)
