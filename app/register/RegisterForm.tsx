"use client";
import { useState } from "react";
import Heading from "../components/Heading";
import Input from "../components/inputs/Input";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Link from "next/link";
import Button from "../components/Button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created");

        signIn("credentials", {
          email: data.email,
          password: data.password,
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
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <Heading title="Sign up for Timeless~Watch" />
      <hr className="bg-slate-300 w-full h-px" />
      <Input
        id="name"
        label="Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        Already have an account?{" "}
        <Link href="/login" className="text-slate-600 underline">
          Login
        </Link>
      </p>
      <Button
        label={
          isLoading ? (
            <AiOutlineLoading className="animate-spin" size={24} />
          ) : (
            "Register"
          )
        }
        onClick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default RegisterForm;
