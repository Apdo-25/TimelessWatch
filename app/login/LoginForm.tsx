"use client";
import { useEffect, useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";
import { safeUser } from "@/types";

interface LoginFormProps {
  currentUser: safeUser | null;
}

const LoginForm: React.FC<LoginFormProps> = ({ currentUser }) => {
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

  useEffect(() => {
    if (currentUser) {
      router.push("/cart");
      router.refresh();
    }
  }, [currentUser]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        router.push("/cart");
        router.refresh();
        toast.success("Logged in");
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  if (currentUser) {
    return (
      <p className="text-center text-slate-500">
        You are already logged in. Redirecting..{" "}
      </p>
    );
  }

  return (
    <>
      <Heading title="Sign in to Timeless~Watch" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="email"
        label="Email"
        type="email"
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
