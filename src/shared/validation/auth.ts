import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Registration schema
export const registerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});
export const onboardingStep1Schema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  phoneNumber: z
    .string()
    .length(10, { message: "Phone number must be exactly 10 digits" }) // Enforces exactly 10 digits
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }), // Ensures only digits
  photo: z.string().nullable(),
});

// Onboarding Step 2 Schema
export const onboardingStep2Schema = z.object({
  country: z.string().min(1, { message: "Country is required" }),
  province: z.string().min(1, { message: "Province is required" }),
  district: z.string().min(1, { message: "District is required" }),
  municipality: z.string().min(1, { message: "Municipality is required" }),
  tole: z.string().min(1, { message: "Tole is required" }),
});

// Full onboarding schema for final validation
export const onboardingSchema = onboardingStep1Schema.merge(
  onboardingStep2Schema
);

// Types

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
export type OnboardingStep1Data = z.infer<typeof onboardingStep1Schema>;
export type OnboardingStep2Data = z.infer<typeof onboardingStep2Schema>;
export type OnboardingData = z.infer<typeof onboardingSchema>;
