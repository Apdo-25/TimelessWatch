import React from "react";
import Heading from "@/app/components/Heading";
import ContactForm from "./ContactForm";
import Container from "../components/Container";
import FormWrap from "../components/FormWrap";

const ContactPage = () => {
  return (
    <Container>
      <div className="mt-8 ">
        <Heading title="Contact Us" center />
        <p className="text-center text-md text-gray-600 mt-4 mx-auto max-w-2xl">
          Have questions? We are here to help. Fill out the form below and our
          team will get back to you shortly.
        </p>
        <ContactForm />
      </div>
    </Container>
  );
};

export default ContactPage;
