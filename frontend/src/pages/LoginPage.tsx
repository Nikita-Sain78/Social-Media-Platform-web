// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import AuthImagePattern from "../components/AuthImagePattern";
// import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
// import Link from "next/link";

// const LoginPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });
//   const { login, isLoggingIn } = useAuthStore();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     login(formData);
//   };

//   return (
//     <div className="h-full grid lg:grid-cols-2 ">
//       {/* Left Side - Form */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
//               transition-colors"
//               >
//                 <MessageSquare className="w-6 h-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
//               <p className="text-base-content/60">Sign in to your account</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="email"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="you@example.com"
//                   value={formData.email}
//                   onChange={(e) =>
//                     setFormData({ ...formData, email: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Password</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Lock className="h-5 w-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="••••••••"
//                   value={formData.password}
//                   onChange={(e) =>
//                     setFormData({ ...formData, password: e.target.value })
//                   }
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? (
//                     <EyeOff className="h-5 w-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="h-5 w-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-full"
//               disabled={isLoggingIn}
//             >
//               {isLoggingIn ? (
//                 <>
//                   <Loader2 className="h-5 w-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Sign in"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Don&apos;t have an account?{" "}
//               <Link href="/signup" className="link link-primary">
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <AuthImagePattern
//         title={"Welcome back!"}
//         subtitle={
//           "Sign in to continue your conversations and catch up with your messages."
//         }
//       />
//     </div>
//   );
// };
// export default LoginPage;

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Zap,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useAuthUser, useLogin } from "@/hooks/useAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { mutate: login, isPending: isLoggingIn } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      <div
        className="min-h-screen flex items-center justify-center overflow-hidden relative"
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          background: "#eef2ff",
        }}
      >
        {/* Pastel Mesh Background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 70% 60% at 15% 20%, rgba(186,230,253,0.7) 0%, transparent 60%),
              radial-gradient(ellipse 60% 50% at 85% 15%, rgba(221,214,254,0.7) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 50% 85%, rgba(253,186,116,0.35) 0%, transparent 55%),
              radial-gradient(ellipse 40% 40% at 80% 75%, rgba(196,181,253,0.45) 0%, transparent 55%),
              #eef2ff`,
          }}
        />

        {/* Page Inner */}
        <div className="relative z-10 flex items-center w-full max-w-5xl mx-auto gap-16 px-2 py-20 min-h-screen">
          {/* ═══ LEFT PANEL ═══ */}
          <div className="hidden lg:flex flex-col flex-1 gap-8 max-w-lg px-4">
            {/* Brand */}
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                }}
              >
                <Zap size={16} color="#fff" fill="#fff" />
              </div>
              <span
                className="font-extrabold text-lg tracking-tight"
                style={{ color: "#1e1b4b", letterSpacing: "-0.02em" }}
              >
                chatapp
              </span>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-3">
              <div className="flex">
                {[
                  {
                    initials: "AK",
                    bg: "linear-gradient(135deg,#a78bfa,#60a5fa)",
                  },
                  {
                    initials: "JM",
                    bg: "linear-gradient(135deg,#f472b6,#fb923c)",
                  },
                  {
                    initials: "SR",
                    bg: "linear-gradient(135deg,#34d399,#3b82f6)",
                  },
                ].map((av, i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: av.bg, marginLeft: i === 0 ? 0 : -10 }}
                  >
                    {av.initials}
                  </div>
                ))}
              </div>
              <div>
                <div className="text-amber-400 text-sm tracking-wide">
                  ★★★★★
                </div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: "#4338ca" }}
                >
                  Used by 12k+ people
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-3">
              <h1
                className="font-extrabold leading-tight"
                style={{
                  fontSize: "clamp(2.2rem,4vw,3.2rem)",
                  color: "#1e1b4b",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.1,
                }}
              >
                More than just
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  friends
                </span>{" "}
                — truly
                <br />
                connect.
              </h1>
              <p className="text-gray-500 leading-relaxed text-base  ">
                Connect with your global community.
                <br />
                Real conversations. Real people.
              </p>
            </div>

            {/* Pills */}
            <div className="flex flex-wrap gap-2">
              {[
                "End-to-end encrypted",
                "Real-time messaging",
                "Free forever",
              ].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border backdrop-blur-sm"
                  style={{
                    background: "rgba(255,255,255,0.7)",
                    borderColor: "rgba(99,102,241,0.2)",
                    color: "#4f46e5",
                  }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* ═══ RIGHT CARD ═══ */}
          <div className="flex-shrink-0 flex items-center justify-center w-1/3 lg:w-auto p-8">
            <div
              className="w-full max-w-sm rounded-3xl p-9 border"
              style={{
                background: "rgba(255,255,255,0.85)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                borderColor: "rgba(255,255,255,0.9)",
                boxShadow:
                  "0 4px 6px rgba(0,0,0,0.02), 0 20px 60px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,1)",
              }}
            >
              {/* Card Logo */}
              {/* <div className="flex items-center justify-center gap-2 mb-6">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  }}
                >
                  <Zap size={16} color="#fff" fill="#fff" />
                </div>
              </div> */}

              <h2
                className="text-center font-extrabold text-xl mb-1"
                style={{ color: "#111827", letterSpacing: "-0.03em" }}
              >
                Sign in to ChatApp
              </h2>
              <p className="text-center text-xs text-gray-400 mb-7">
                Welcome back! Please sign in to continue
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Email */}
                <div>
                  <label
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border border-gray-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-300 hover:border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    className="block text-xs font-semibold text-gray-700 mb-1.5"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={15}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    />
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl text-sm border border-gray-200 outline-none transition-all duration-200 bg-white text-gray-900 placeholder-gray-300 hover:border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0 mt-1"
                  style={{
                    background: "#1e1b4b",
                    boxShadow: "0 4px 14px rgba(30,27,75,0.25)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#312e81")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#1e1b4b")
                  }
                >
                  {/* Shimmer */}
                  <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 pointer-events-none" />
                  {isLoggingIn ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Signing in…
                    </>
                  ) : (
                    <>
                      <span>Continue</span>
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform duration-200"
                      />
                    </>
                  )}
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-xs text-gray-400 mt-5">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="font-semibold text-indigo-500 hover:text-indigo-700 hover:underline underline-offset-2 transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
