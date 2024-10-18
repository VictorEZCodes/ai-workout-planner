'use client';

import Layout from '../../components/Layout';
import { motion } from 'framer-motion';
import { FaDumbbell, FaClipboardList, FaApple, FaQuestion, FaUserCog } from 'react-icons/fa';

const FAQItem = ({ question, answer, icon, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="flex items-center mb-4"
    >
      <div className="text-3xl text-indigo-600 dark:text-indigo-400 mr-4">{icon}</div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{question}</h2>
    </motion.div>
    <p className="text-gray-600 dark:text-gray-300">{answer}</p>
  </motion.div>
);

export default function HelpPage() {
  const faqs = [
    {
      question: "How do I create a workout plan?",
      answer: "To create a workout plan, navigate to the 'Workout Plan' page and fill out the form with your fitness goals and preferences. Our AI will generate a personalized plan for you.",
      icon: <FaDumbbell />,
    },
    {
      question: "Can I customize my workout plan?",
      answer: "Yes, you can customize your workout plan using the 'Custom Workout' feature. This allows you to modify exercises, durations, and intensity levels.",
      icon: <FaUserCog />,
    },
    {
      question: "How does the food analysis feature work?",
      answer: "Our food analysis feature uses AI to analyze photos of your meals. Simply upload a photo on the 'Analyze' page, and you'll receive a breakdown of the nutritional content.",
      icon: <FaApple />,
    },
    {
      question: "How often should I update my workout plan?",
      answer: "It's recommended to update your workout plan every 4-6 weeks or when you feel your current plan is no longer challenging enough.",
      icon: <FaClipboardList />,
    },
    {
      question: "What if I have more questions?",
      answer: "If you have any additional questions, please don't hesitate to contact our support team through the 'Contact' page.",
      icon: <FaQuestion />,
    },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-3xl mx-auto">
          <motion.h1
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center"
          >
            Help / FAQ
          </motion.h1>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
                icon={faq.icon}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
}