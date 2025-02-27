import { useContext, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaRegEyeSlash, FaEye } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const { createNewUser, setUser, updateUserProfile, handleGoogleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [firebaseError, setFirebaseError] = useState("");

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    setPasswordError("");
    setFirebaseError("");

    if (!validatePassword(password)) {
      setPasswordError(
        "Password must be at least 6 characters long, include an uppercase and a lowercase letter."
      );
      return;
    }

    createNewUser(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Successfully Created Account");
        updateUserProfile({ displayName: name, photoURL: photo })
          .then(() => {
            navigate("/");
          })
          .catch((err) => {
            setFirebaseError("Failed to update user profile.", err);
          });
      })
      .catch((error) => {
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
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <input
                name="name"
                type="text"
                placeholder="Name"
                className="input input-bordered w-full bg-gray-50 text-black rounded-md px-4 py-2"
                required
              />
            </div>
            <div className="form-control">
              <input
                name="photo"
                type="text"
                placeholder="Photo URL"
                className="input input-bordered w-full bg-gray-50 text-black rounded-md px-4 py-2"
                required
              />
            </div>
            <div className="form-control">
              <input
                name="email"
                type="email"
                placeholder="Email"
                className="input input-bordered w-full bg-gray-50 text-black rounded-md px-4 py-2"
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
            <button className="btn w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:bg-gradient-to-r hover:from-cyan-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-md">
              Register
            </button>
            {firebaseError && (
              <p className="text-red-500 mt-4 text-sm">{firebaseError}</p>
            )}
          </form>
          <p className="text-black mt-4">
            Already have an account?{" "}
            <Link className="text-red-600 hover:text-blue-700" to="/login">
              Login
            </Link>
          </p>
          <div className="mt-4">
            <button
              onClick={handleSignIn}
              className="btn w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-md"
            >
              <FaGoogle /> Register With Google
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
