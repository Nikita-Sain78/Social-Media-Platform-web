// import { useState } from "react";
// import { useAuthStore } from "../store/useAuthStore";
// import {
//   Eye,
//   EyeOff,
//   Link,
//   Loader2,
//   Lock,
//   Mail,
//   MessageSquare,
//   User,
// } from "lucide-react";

// import AuthImagePattern from "../components/AuthImagePattern";
// import toast from "react-hot-toast";

// interface FormDataType {
//   fullName: string;
//   email: string;
//   password: string;
// }
// const SignUpPage = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState<FormDataType>({
//     fullName: "",
//     email: "",
//     password: "",
//   });

//   const { signup, isSigningUp } = useAuthStore();

//   const validateForm = () => {
//     if (!formData.fullName.trim()) return toast.error("Full name is required");
//     if (!formData.email.trim()) return toast.error("Email is required");
//     if (!/\S+@\S+\.\S+/.test(formData.email))
//       return toast.error("Invalid email format");
//     if (!formData.password) return toast.error("Password is required");
//     if (formData.password.length < 6)
//       return toast.error("Password must be at least 6 characters");

//     return true;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const success = validateForm();

//     if (success === true) signup(formData);
//   };

//   return (
//     <div className="min-h-screen grid lg:grid-cols-2">
//       {/* left side */}
//       <div className="flex flex-col justify-center items-center p-6 sm:p-12">
//         <div className="w-full max-w-md space-y-8">
//           {/* LOGO */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2 group">
//               <div
//                 className="size-12 rounded-xl bg-primary/10 flex items-center justify-center
//               group-hover:bg-primary/20 transition-colors"
//               >
//                 <MessageSquare className="size-6 text-primary" />
//               </div>
//               <h1 className="text-2xl font-bold mt-2">Create Account</h1>
//               <p className="text-base-content/60">
//                 Get started with your free account
//               </p>
//             </div>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Full Name</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <User className="size-5 text-base-content/40" />
//                 </div>
//                 <input
//                   type="text"
//                   className={`input input-bordered w-full pl-10`}
//                   placeholder="John Doe"
//                   value={formData.fullName}
//                   onChange={(e) =>
//                     setFormData({ ...formData, fullName: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text font-medium">Email</span>
//               </label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <Mail className="size-5 text-base-content/40" />
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
//                   <Lock className="size-5 text-base-content/40" />
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
//                     <EyeOff className="size-5 text-base-content/40" />
//                   ) : (
//                     <Eye className="size-5 text-base-content/40" />
//                   )}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="btn btn-primary w-full"
//               disabled={isSigningUp}
//             >
//               {isSigningUp ? (
//                 <>
//                   <Loader2 className="size-5 animate-spin" />
//                   Loading...
//                 </>
//               ) : (
//                 "Create Account"
//               )}
//             </button>
//           </form>

//           <div className="text-center">
//             <p className="text-base-content/60">
//               Already have an account?{" "}
//               <Link href="/login" className="link link-primary">
//                 Sign in
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* right side */}

//       <AuthImagePattern
//         title="Join our community"
//         subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
//       />
//     </div>
//   );
// };
// export default SignUpPage;

import { useState } from "react";
// import { useAutt } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Zap,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSignup } from "@/hooks/useAuth";

interface FormDataType {
  fullName: string;
  email: string;
  password: string;
}

const StrengthBar = ({ password }: { password: string }) => {
  const checks = [
    password.length >= 6,
    /[A-Z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];
  const score = checks.filter(Boolean).length;
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const labelColors = [
    "",
    "text-red-500",
    "text-amber-500",
    "text-blue-500",
    "text-emerald-500",
  ];
  const barColors = [
    "",
    "bg-red-500",
    "bg-amber-500",
    "bg-blue-500",
    "bg-emerald-500",
  ];

  if (!password) return null;

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i <= score ? barColors[score] : "bg-gray-200"}`}
          />
        ))}
      </div>
      <p className={`text-xs font-semibold ${labelColors[score]}`}>
        {labels[score]}
      </p>
    </div>
  );
};

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormDataType>({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    return true;
  };
  const { mutate: signUp } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signUp(formData);
  };

  const isNameValid = formData.fullName.trim().length > 1;
  const isEmailValid = /\S+@\S+\.\S+/.test(formData.email);

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        background: "#eef2ff",
      }}
    >
      {/* Google Font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');`}</style>

      {/* Pastel Mesh Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
          radial-gradient(ellipse 65% 55% at 10% 15%, rgba(186,230,253,0.65) 0%, transparent 60%),
          radial-gradient(ellipse 55% 50% at 90% 10%, rgba(221,214,254,0.65) 0%, transparent 60%),
          radial-gradient(ellipse 50% 55% at 55% 90%, rgba(253,186,116,0.30) 0%, transparent 55%),
          radial-gradient(ellipse 40% 40% at 85% 80%, rgba(196,181,253,0.40) 0%, transparent 55%),
          #eef2ff`,
        }}
      />

      {/* Page Inner */}
      <div className="relative z-10 flex items-center w-full max-w-5xl mx-auto gap-16 px-2 py-20">
        <div className="flex-shrink-0 flex items-center justify-center  lg:w-auto">
          <div
            className="w-100  rounded-3xl p-8 border"
            style={{
              background: "rgba(255,255,255,0.88)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderColor: "rgba(255,255,255,0.92)",
              boxShadow:
                "0 4px 6px rgba(0,0,0,0.02), 0 20px 60px rgba(79,70,229,0.12), inset 0 1px 0 rgba(255,255,255,1)",
            }}
          >
            {/* Card Logo */}
            <div className="flex items-center justify-center gap-2 mb-1">
              <span
                className="font-extrabold text-base tracking-tight"
                style={{ color: "#1e1b4b" }}
              >
                chatapp
              </span>
            </div>

            <h2
              className="text-center font-extrabold text-xl tracking-tight mb-1"
              style={{ color: "#111827", letterSpacing: "-0.03em" }}
            >
              Create your account
            </h2>
            <p className="text-center text-xs text-gray-400 mb-6">
              Get started — it&apos;s completely free
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Full Name */}
              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200
                      text-gray-900 bg-white placeholder-gray-300
                      ${
                        isNameValid
                          ? "border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                          : "border-gray-200 hover:border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                      }`}
                  />
                  {isNameValid && (
                    <CheckCircle2
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  className="block text-xs font-semibold text-gray-700 mb-1.5"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className={`w-full pl-9 pr-9 py-2.5 rounded-xl text-sm border outline-none transition-all duration-200
                      text-gray-900 bg-white placeholder-gray-300
                      ${
                        isEmailValid
                          ? "border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                          : "border-gray-200 hover:border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                      }`}
                  />
                  {isEmailValid && (
                    <CheckCircle2
                      size={14}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500"
                    />
                  )}
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
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    className="w-full pl-9 pr-9 py-2.5 rounded-xl text-sm border border-gray-200 outline-none transition-all duration-200
                      text-gray-900 bg-white placeholder-gray-300
                      hover:border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-50"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <StrengthBar password={formData.password} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="group relative w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white overflow-hidden transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:-translate-y-0.5 active:translate-y-0"
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
                {/* {isSigningUp ? ( */}
                {/* <>
                    <Loader2 size={15} className="animate-spin" /> Creating
                    account…
                  </>
                ) : ( */}
                {/* <> */}
                <span>Create Account</span>
                <ArrowRight
                  size={15}
                  className="group-hover:translate-x-1 transition-transform duration-200"
                />
                {/* </>
                )} */}
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-5">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-500 hover:text-indigo-700 hover:underline underline-offset-2 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
        {/* ═══ LEFT PANEL ═══ */}
        <div className="hidden lg:flex flex-col flex-1 gap-7 max-w-md px-4">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg,#4f46e5,#7c3aed)" }}
            >
              <Zap size={15} color="#fff" fill="#fff" />
            </div>
            <span
              className="font-extrabold text-lg tracking-tight"
              style={{ color: "#1e1b4b" }}
            >
              chatapp
            </span>
          </div>

          {/* Social proof */}
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
              <div className="text-amber-400 text-sm">★★★★★</div>
              <div
                className="text-xs font-semibold"
                style={{ color: "#4338ca" }}
              >
                Join 12k+ people
              </div>
            </div>
          </div>

          {/* Headline */}
          <div className="flex flex-col gap-3">
            <h1
              className="font-extrabold leading-tight tracking-tight"
              style={{
                fontSize: "clamp(2rem,3.5vw,2.9rem)",
                color: "#1e1b4b",
                letterSpacing: "-0.03em",
              }}
            >
              Your people are
              <br />
              waiting for{" "}
              <span
                style={{
                  background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                you.
              </span>
            </h1>
            <p className="text-gray-500 text-sm leading-relaxed">
              Create your free account in seconds.
              <br />
              Start real conversations with real people.
            </p>
          </div>

          {/* Pills */}
          <div className="flex flex-wrap gap-2">
            {["Free forever", "No credit card", "End-to-end encrypted"].map(
              (label) => (
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
              ),
            )}
          </div>

          {/* Checklist */}
          <div className="flex flex-col gap-3">
            {[
              "Set up in under 60 seconds",
              "Instant messaging across devices",
              "Your data is always private",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-indigo-500 shrink-0" />
                <span className="text-sm text-gray-600 font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ RIGHT CARD ═══ */}
      </div>
    </div>
  );
};

export default SignUpPage;
