import { describe, expect, it } from "vitest";
import { contactSchema } from "@/lib/contact-schema";

describe("contact form input rules", () => {
  it("accepts a complete valid message", () => {
    expect(contactSchema.safeParse({ name: "Devesh", email: "hello@example.com", subject: "A project", message: "I would like to discuss a project." }).success).toBe(true);
  });

  it("rejects names shorter than two characters or longer than 100", () => {
    const base = { email: "hello@example.com", subject: "A project", message: "I would like to discuss a project." };
    expect(contactSchema.safeParse({ ...base, name: "D" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, name: "D".repeat(101) }).success).toBe(false);
  });

  it("rejects invalid email addresses and addresses longer than 255 characters", () => {
    const base = { name: "Devesh", subject: "A project", message: "I would like to discuss a project." };
    expect(contactSchema.safeParse({ ...base, email: "not-an-email" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, email: `${"a".repeat(244)}@example.com` }).success).toBe(false);
  });

  it("enforces subject lengths of 3–150 characters", () => {
    const base = { name: "Devesh", email: "hello@example.com", message: "I would like to discuss a project." };
    expect(contactSchema.safeParse({ ...base, subject: "Hi" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, subject: "S".repeat(151) }).success).toBe(false);
  });

  it("enforces message lengths of 10–3,000 characters", () => {
    const base = { name: "Devesh", email: "hello@example.com", subject: "A project" };
    expect(contactSchema.safeParse({ ...base, message: "Too short" }).success).toBe(false);
    expect(contactSchema.safeParse({ ...base, message: "M".repeat(3001) }).success).toBe(false);
  });
});