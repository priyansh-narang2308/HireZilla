"use client";

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabase-client";
import Image from "next/image";
import toast from "react-hot-toast";

const Login = () => {

  // sign with supabse
  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    });
    if (error) {
      console.error("Error: ", error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center p-10 bg-black/50 backdrop-blur-xl border border-green-600/20 rounded-2xl shadow-2xl w-full max-w-md animate-fade-in">

        <Image
          src="/login.png"
          alt="login"
          width={600}
          height={400}
          className="w-[350px] h-[220px] object-contain mb-6 drop-shadow-xl"
        />

        <h2 className="text-5xl font-extrabold text-white mb-3 text-center tracking-wide">
          Welcome to <span className="text-green-400 drop-shadow-[0_0_10px_#00ff7f]">HireZilla</span>
        </h2>

        <p className="text-xl text-gray-300 mb-8 text-center font-medium">
          Your gateway to smarter hiring — sign in below
        </p>

        <Button
          onClick={signInWithGoogle}
          className="bg-green-300 cursor-pointer hover:bg-green-400 transition-all duration-300 text-black font-semibold text-lg px-8 py-4 rounded-xl flex items-center gap-3 shadow-green-500/50 shadow-md hover:scale-105">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 48 48"
          >
            <path
              fill="#FFC107"
              d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8
              c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12
              c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4
              C12.955,4,4,12.955,4,24
              c0,11.045,8.955,20,20,20
              c11.045,0,20-8.955,20-20
              C44,22.659,43.862,21.35,43.611,20.083z"
            />
            <path
              fill="#FF3D00"
              d="M6.306,14.691l6.571,4.819
              C14.655,15.108,18.961,12,24,12
              c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
              C34.046,6.053,29.268,4,24,4
              C16.318,4,9.656,8.337,6.306,14.691z"
            />
            <path
              fill="#4CAF50"
              d="M24,44
              c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238
              C29.211,35.091,26.715,36,24,36
              c-5.202,0-9.619-3.317-11.283-7.946
              l-6.522,5.025
              C9.505,39.556,16.227,44,24,44z"
            />
            <path
              fill="#1976D2"
              d="M43.611,20.083H42V20H24v8
              h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
              c0.001-0.001,0.002-0.001,0.003-0.002
              l6.19,5.238
              C36.971,39.205,44,34,44,24
              C44,22.659,43.862,21.35,43.611,20.083z"
            />
          </svg>
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
