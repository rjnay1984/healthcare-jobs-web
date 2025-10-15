import { z } from "zod";

// Enums matching the C# enums
export const LicenseTypeEnum = z.enum([
  "RN", // Registered Nurse
  "LPN", // Licensed Practical Nurse
  "MD", // Medical Doctor
  "DO", // Doctor of Osteopathic Medicine
  "PharmD", // Doctor of Pharmacy
  "PA", // Physician Assistant
  "NP", // Nurse Practitioner
  "PT", // Physical Therapist
  "OT", // Occupational Therapist
  "RT", // Respiratory Therapist
  "RHIA", // Registered Health Information Administrator
  "RHIT", // Registered Health Information Technician
  "CMA", // Certified Medical Assistant
  "Other",
]);

export const YearsOfExperienceEnum = z.enum([
  "EntryLevel", // 0-1 years
  "Junior", // 1-3 years
  "Intermediate", // 3-5 years
  "Senior", // 5-10 years
  "Expert", // 10+ years
  "Executive", // Leadership roles
]);

// Zod schema matching the C# Candidate class
export const candidateSchema = z.object({
  authUserId: z.string().min(1, "Auth User ID is required"),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(100, "First name must be 100 characters or less"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(100, "Last name must be 100 characters or less"),
  licenseNumber: z
    .string()
    .max(50, "License number must be 50 characters or less")
    .optional(),
  licenseType: LicenseTypeEnum.optional(),
  licenseExpiry: z.string().optional(),
  experienceLevel: YearsOfExperienceEnum,
  willRelocate: z.boolean(),
  desiredSalaryMin: z
    .number()
    .min(0, "Salary must be non-negative")
    .max(1000000, "Salary must be 1,000,000 or less")
    .optional(),
  resumeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type CandidateFormData = z.infer<typeof candidateSchema>;
