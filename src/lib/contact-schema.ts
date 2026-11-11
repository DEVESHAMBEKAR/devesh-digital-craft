import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100, "Name must be 100 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address.").max(255, "Email must be 255 characters or fewer."),
  subject: z.string().trim().min(3, "Please add a subject.").max(150, "Subject must be 150 characters or fewer."),
  message: z.string().trim().min(10, "Please share a little more detail (at least 10 characters).").max(3000, "Message must be 3,000 characters or fewer."),
});