import { useState, useEffect } from "react";
import {
  ArrowRight,
  Mail,
  Lock,
  AlertCircle,
  CheckCircle,
  Loader,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleGoogleLogin = () => {
    setIsLoading(true);
    window.location.href = "/oauth2/authorization/google";
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);


    setTimeout(() => {
      if (email && password) {
        setSuccess("Login successful! Redirecting...");

      } else {
        setError("Please fill in all fields");

        setIsLoading(false);
      }
    }, 800);
  };


  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Left side - illustration */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center relative overflow-hidden">
        <div className="absolute w-full h-full bg-indigo-600 opacity-80 z-10"></div>
        <div className="relative z-20 text-white p-12 max-w-lg">
          <h2 className="text-4xl font-bold mb-6">
            Welcome to SkillSwap
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Share your knowledge, learn new skills, and connect with a community of learners and mentors.
          </p>
          <div className="flex items-center space-x-2 text-sm">
            <CheckCircle size={20} />
            <span>Access to community posts</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-3">
            <CheckCircle size={20} />
            <span>Personalized learning plans</span>
          </div>
          <div className="flex items-center space-x-2 text-sm mt-3">
            <CheckCircle size={20} />
            <span>Connect with experts</span>
          </div>
        </div>

        {/* Background shapes */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-indigo-700 transform -skew-y-3 origin-bottom-right z-0"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full -mr-32 -mt-32 opacity-50"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-800 rounded-full -ml-24 -mb-24 opacity-50"></div>
      </div>

      {/* Right side - login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to access your SkillSwap account</p>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-md flex items-center text-red-700">
              <AlertCircle size={20} className="mr-2" />
              <span>{error}</span>
            </div>
          )}

          {/* Success message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 rounded-md flex items-center text-green-700">
              <CheckCircle size={20} className="mr-2" />
              <span>{success}</span>
            </div>
          )}

          {/* Google login button */}
          <button
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 bg-white text-gray-700 py-3 px-4 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors mb-6 shadow-sm"
          >
            <svg
              width="20"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* <div className="relative flex items-center py-5">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-600">
              or sign in with email
            </span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div> */}

          {/* Email login form */}
          {/* <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  size={20}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 py-2 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex justify-end mt-2">
                <a className="text-sm text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  Forgot password?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
            >
              {isLoading ? (
                <Loader size={20} className="animate-spin" />
              ) : (
                <>
                  <span>Sign in</span>
                  <ArrowRight size={20} className="ml-2" />
                </>
              )}
            </button>
          </form> */}

          <div className="text-center mt-8">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a className="text-indigo-600 font-medium hover:text-indigo-500 cursor-pointer">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}