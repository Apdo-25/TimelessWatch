"use client";
import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log(data);

    signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.push("/cart");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

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
        <Link href="/register" className="text-slate-600 underline">
          Register
        </Link>
      </p>
      <Button
        label={
          isLoading ? (
            <AiOutlineLoading className="animate-spin" size={24} />
          ) : (
            "Login"
          )
        }
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default LoginForm;
