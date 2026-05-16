import {
  BikeIcon,
  Loader2Icon,
  LockIcon,
  Mail,
  UserIcon,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // states
  const [isLoginState, setIsLoginState] = useState(true);

  const [userdata, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  // functions
  const handleValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserData({
      ...userdata,
      [name]: value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(userdata);

    setLoading(true);

    // fake api request
    setTimeout(() => {
      setLoading(false);

      setUserData({
        name: "",
        email: "",
        password: "",
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f5f0] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-[#e4ede8]">

        {/* logo */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2"
          >
            <BikeIcon className="text-[#2d6a4a]" />
            <span className="text-2xl font-bold text-[#2d6a4a]">
              Grozo
            </span>
          </Link>

          <h1 className="mt-4 text-2xl font-bold text-[#1a2e22]">
            {isLoginState
              ? "Sign in to your account"
              : "Create a new account"}
          </h1>

          <p className="mt-2 text-sm text-[#7a9486]">
            {isLoginState
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              type="button"
              onClick={() =>
                setIsLoginState(!isLoginState)
              }
              className="ml-1 font-medium text-[#2d6a4a] hover:underline"
            >
              {isLoginState ? "Sign up" : "Sign in"}
            </button>
          </p>
        </div>

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {!isLoginState && (
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#3a5a46]"
              >
                Name
              </label>

              <div className="flex items-center rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 focus-within:border-[#2d6a4a] focus-within:ring-2 focus-within:ring-[#2d6a4a]/10 transition">
                <UserIcon
                  size={18}
                  className="text-[#9abfaa]"
                />

                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={userdata.name}
                  onChange={handleValues}
                  required
                  className="w-full bg-transparent p-3 outline-none text-[#1a2e22] placeholder-[#b8d0c0]"
                />
              </div>
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-[#3a5a46]"
            >
              Email Address
            </label>

            <div className="flex items-center rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 focus-within:border-[#2d6a4a] focus-within:ring-2 focus-within:ring-[#2d6a4a]/10 transition">
              <Mail
                size={18}
                className="text-[#9abfaa]"
              />

              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={userdata.email}
                onChange={handleValues}
                required
                className="w-full bg-transparent p-3 outline-none text-[#1a2e22] placeholder-[#b8d0c0]"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-[#3a5a46]"
            >
              Password
            </label>

            <div className="flex items-center rounded-xl border border-[#d8e8de] bg-[#f7f5f0] px-3 focus-within:border-[#2d6a4a] focus-within:ring-2 focus-within:ring-[#2d6a4a]/10 transition">
              <LockIcon
                size={18}
                className="text-[#9abfaa]"
              />

              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={userdata.password}
                onChange={handleValues}
                required
                className="w-full bg-transparent p-3 outline-none text-[#1a2e22] placeholder-[#b8d0c0]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center rounded-xl bg-[#1e3a2f] py-3 font-medium text-white transition hover:bg-[#2d6a4a] disabled:opacity-70"
          >
            {loading ? (
              <Loader2Icon className="animate-spin" />
            ) : isLoginState ? (
              "Sign in"
            ) : (
              "Sign up"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;