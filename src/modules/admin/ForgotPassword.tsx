import React, { useRef, useState, SyntheticEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ForgotPassword = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword, currentUser } = useAuth();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log("PRESSED");

    try {
      setError("");
      setLoading(true);
      console.log("attempting login2");
      await resetPassword(emailRef.current?.value);
      console.log("check your email");
    } catch {
      setError("Failed to log in");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          {currentUser && currentUser.email}
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Need to reset your password?
          </h2>
          <div>{error}</div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  ref={emailRef}
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                />
              </div>
            </div>
            <button
              className="bg-blue-500 text-white font-bold py-1 px-2 rounded"
              disabled={loading}
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
