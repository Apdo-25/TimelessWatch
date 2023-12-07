import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mail";
import getCurrentUser from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { name, email, message } = body as {
    name: string;
    email: string;
    message: string;
  };

  const emailBody = `
    <p>You have a new contact form submission</p>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong> ${message}</p>
  `;

  try {
    await sendEmail({
      to: process.env.EMAIL_TO!,
      subject: "New Contact Form Submission",
      text: message,
      html: emailBody,
    });

    // Return a success response
    return new Response("Email sent successfully", { status: 200 });
  } catch (error) {
    console.error("Email sending error:", error);

    // Return an error response
    return new Response("Error sending email", { status: 500 });
  }
}
