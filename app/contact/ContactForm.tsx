"use client";
import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import Input from "@/app/components/inputs/Input";
import TextArea from "@/app/components/inputs/TextArea";
import Button from "@/app/components/Button";
import toast from "react-hot-toast";
import axios from "axios";
import FormWrap from "../components/FormWrap";

// Extend FieldValues with specific fields for the contact form
type ContactFormFields = FieldValues & {
  name: string;
  email: string;
  message: string;
};

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormFields>();

  const onSubmit: SubmitHandler<ContactFormFields> = async (data) => {
    try {
      await axios.post("/api/contact", data);
      toast.success("Message sent successfully");
      reset();
    } catch (error) {
      toast.error("Failed to send, log in to use contact form");
      console.error("Contact form submission error:", error);
    }
  };

  return (
    <FormWrap>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg mx-auto flex flex-col gap-4"
      >
        <Input
          id="name"
          label="Name"
          register={register as any}
          errors={errors}
          required
        />
        <Input
          id="email"
          label="Email"
          register={register as any}
          errors={errors}
          required
        />
        <TextArea
          id="message"
          label="Message"
          register={register as any}
          errors={errors}
          required
        />
        <Button label="Send Message" />
      </form>
    </FormWrap>
  );
};

export default ContactForm;
