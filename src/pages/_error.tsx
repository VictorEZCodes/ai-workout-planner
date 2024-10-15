import Layout from '../components/Layout';

function Error({ statusCode }) {
  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            {statusCode
              ? `An error ${statusCode} occurred on server`
              : 'An error occurred on client'}
          </h1>
          <p className="text-xl text-gray-600 mb-8">We're sorry for the inconvenience. Please try again later.</p>
        </div>
      </div>
    </Layout>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;