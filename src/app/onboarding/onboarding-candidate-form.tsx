"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSession } from "@/lib/auth-client";
import { candidateSchema, type CandidateFormData } from "./schemas";
import { toast } from "sonner";

export default function OnboardingCandidateForm() {
  const { data: session } = useSession();

  // split session.user.name into first and last name if it exists
  const [firstName, lastName] = session?.user?.name?.split(" ") || ["", ""];

  const form = useForm<CandidateFormData>({
    resolver: zodResolver(candidateSchema),
    defaultValues: {
      authUserId: "",
      firstName: "",
      lastName: "",
      licenseNumber: "",
      experienceLevel: "EntryLevel",
      willRelocate: false,
      resumeUrl: "",
    },
  });

  // Update form values when session loads
  useEffect(() => {
    if (session?.user) {
      form.reset({
        authUserId: session.user.id,
        firstName: firstName || "",
        lastName: lastName || "",
        licenseNumber: "",
        experienceLevel: "EntryLevel",
        willRelocate: false,
        resumeUrl: "",
      });
    }
  }, [session, firstName, lastName, form]);

  const onSubmit = async (data: CandidateFormData) => {
    try {
      // TODO: Implement API call to submit candidate data
      console.log("Submitting candidate data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Handle success (redirect, show success message, etc.)
      toast.success("Candidate profile created successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error creating candidate profile. Please try again.");
    } finally {
      form.reset();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Personal Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Personal Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="authUserId"
            render={({ field }) => (
              <FormItem hidden>
                <FormLabel>Auth User ID *</FormLabel>
                <FormControl>
                  <Input disabled placeholder="user-auth-id" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Professional Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Professional Information</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="licenseNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Number</FormLabel>
                  <FormControl>
                    <Input placeholder="ABC123456" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="licenseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Type</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value || undefined)}
                    value={field.value ?? ""}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select license type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="RN">RN - Registered Nurse</SelectItem>
                      <SelectItem value="LPN">
                        LPN - Licensed Practical Nurse
                      </SelectItem>
                      <SelectItem value="MD">MD - Medical Doctor</SelectItem>
                      <SelectItem value="DO">
                        DO - Doctor of Osteopathic Medicine
                      </SelectItem>
                      <SelectItem value="PharmD">
                        PharmD - Doctor of Pharmacy
                      </SelectItem>
                      <SelectItem value="PA">
                        PA - Physician Assistant
                      </SelectItem>
                      <SelectItem value="NP">
                        NP - Nurse Practitioner
                      </SelectItem>
                      <SelectItem value="PT">
                        PT - Physical Therapist
                      </SelectItem>
                      <SelectItem value="OT">
                        OT - Occupational Therapist
                      </SelectItem>
                      <SelectItem value="RT">
                        RT - Respiratory Therapist
                      </SelectItem>
                      <SelectItem value="RHIA">
                        RHIA - Registered Health Information Administrator
                      </SelectItem>
                      <SelectItem value="RHIT">
                        RHIT - Registered Health Information Technician
                      </SelectItem>
                      <SelectItem value="CMA">
                        CMA - Certified Medical Assistant
                      </SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="licenseExpiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Expiry Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} value={field.value || ""} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="experienceLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Experience Level *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="EntryLevel">
                        Entry Level (0-1 years)
                      </SelectItem>
                      <SelectItem value="Junior">Junior (1-3 years)</SelectItem>
                      <SelectItem value="Intermediate">
                        Intermediate (3-5 years)
                      </SelectItem>
                      <SelectItem value="Senior">
                        Senior (5-10 years)
                      </SelectItem>
                      <SelectItem value="Expert">Expert (10+ years)</SelectItem>
                      <SelectItem value="Executive">
                        Executive (Leadership roles)
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Preferences Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Job Preferences</h3>

          <FormField
            control={form.control}
            name="willRelocate"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>
                    Willing to relocate for the right opportunity
                  </FormLabel>
                </div>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desiredSalaryMin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Desired Minimum Salary (USD)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="50000"
                    min="0"
                    max="1000000"
                    {...field}
                    value={field.value || ""}
                    onChange={(e) => {
                      const value = e.target.value
                        ? parseFloat(e.target.value)
                        : undefined;
                      field.onChange(value);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="resumeUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Resume URL</FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="https://example.com/resume.pdf"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => form.reset()}
            disabled={form.formState.isSubmitting}
          >
            Reset
          </Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting
              ? "Creating Profile..."
              : "Create Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
