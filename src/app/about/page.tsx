'use client';

import Layout from '../../components/Layout';
import Image from 'next/image';
import { FaDumbbell, FaApple, FaBrain } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center"
  >
    <motion.div
      whileHover={{ scale: 1.1 }}
      className="text-4xl text-indigo-600 mb-4"
    >
      {icon}
    </motion.div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

const TeamMember = ({ name, role, imageSrc, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="w-32 h-32 rounded-full overflow-hidden mb-4"
    >
      <Image src={imageSrc} alt={name} width={128} height={128} className="object-cover" />
    </motion.div>
    <h3 className="text-lg font-semibold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </motion.div>
);

export default function AboutPage() {
  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About AI Workout Planner</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              AI Workout Planner is a cutting-edge application that uses artificial intelligence to create personalized workout plans and provide nutrition advice.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <FeatureCard
              icon={<FaDumbbell />}
              title="Personalized Workouts"
              description="Get custom workout plans tailored to your fitness level, goals, and preferences."
              delay={0.2}
            />
            <FeatureCard
              icon={<FaApple />}
              title="Nutrition Guidance"
              description="Receive personalized nutrition advice to complement your workout routine."
              delay={0.4}
            />
            <FeatureCard
              icon={<FaBrain />}
              title="AI-Powered"
              description="Leverage the power of artificial intelligence for optimal fitness results."
              delay={0.6}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              Our mission is to make personalized fitness accessible to everyone, leveraging the power of AI to help individuals achieve their health and fitness goals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet the Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <TeamMember
                name="John Doe"
                role="Founder & CEO"
                imageSrc="/path/to/john-doe-image.jpg"
                delay={1.2}
              />
              <TeamMember
                name="Jane Smith"
                role="Head of AI"
                imageSrc="/path/to/jane-smith-image.jpg"
                delay={1.4}
              />
              <TeamMember
                name="Mike Johnson"
                role="Lead Developer"
                imageSrc="/path/to/mike-johnson-image.jpg"
                delay={1.6}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Layout>
  );
}