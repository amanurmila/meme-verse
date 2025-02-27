import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaRegEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const { userLogin, setUser, handleGoogleSignIn, handleForgetPassword } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");
  const [email, setEmail] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const password = e.target.password.value;

    setPasswordError("");
    setFirebaseError("");

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, include an uppercase and a lowercase letter."
      );
      return;
    }

    userLogin(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("You Logged in Successfully");
        setUser(user);
        navigate("/");
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  const handleForgotPassword = () => {
    setFirebaseError("");
    if (!email) {
      setFirebaseError(
        "Please enter your email before requesting a password reset."
      );
      toast.error(
        "Please enter your email before requesting a password reset."
      );
      return;
    }
    handleForgetPassword(email)
      .then(() => {
        toast.success("Password reset email sent! Check your inbox.");
      })
      .catch((error) => {
        toast.error("Failed to send password reset email. Try again.");
        setFirebaseError(error.message);
      });
  };

  const handleSignIn = () => {
    handleGoogleSignIn(navigate).catch((error) => {
      setFirebaseError(error.message);
    });
  };

  return (
    <div className="min-h-screen">
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="card bg-gray-400 w-full max-w-md rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full bg-gray-50 text-black rounded-md px-4 py-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-control relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full bg-gray-50 text-black rounded-md px-4 py-2"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3 text-gray-700 hover:text-gray-900"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaEye />}
              </button>
              {passwordError && (
                <p className="text-red-500 mt-2 text-sm">{passwordError}</p>
              )}
            </div>
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-gray-600 text-sm underline hover:text-gray-800"
            >
              Forgot password?
            </button>
            <button className="btn w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md">
              Login
            </button>
            {firebaseError && (
              <p className="text-red-500 mt-4 text-sm">{firebaseError}</p>
            )}
          </form>
          <p className="text-black mt-4">
            Don not have an account?{" "}
            <Link className="text-red-600 hover:text-blue-700" to="/register">
              Register
            </Link>
          </p>
          <div className="mt-4">
            <button
              onClick={handleSignIn}
              className="btn w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
            >
              <FaGoogle /> Login With Google
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
