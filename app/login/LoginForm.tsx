"use client";

import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <>
      <Heading title="Sign in to Timeless~Watch" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <hr className="bg-slate-300 w-full h-px" />
      <p className="text-center text-slate-500">
        Dont have an Account?{" "}
        <Link href="/register" className="text-slate-600 hover:underline">
          Register
        </Link>
      </p>
      <button
        type="submit"
        className="bg-slate-500 text-white w-full py-2 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Login"}
      </button>
    </>
  );
};

export default LoginForm;
