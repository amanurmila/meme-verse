import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white text-center">
      <img
        src="https://i.imgur.com/qIufhof.png"
        alt="Lost Astronaut"
        className="w-96 mb-6 animate-bounce"
      />
      <h1 className="text-6xl font-bold">404</h1>
      <p className="text-xl mt-2">Oops! Looks like you are lost in space. 🪐</p>
      <p className="text-lg text-gray-400 mt-1">
        The page you’re looking for is floating somewhere in the void...
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-500 rounded-lg text-lg font-semibold hover:bg-blue-600 transition-all duration-300"
      >
        🏠 Go Home
      </Link>
    </div>
  );
};

export default ErrorPage;
