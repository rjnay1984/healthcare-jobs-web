// User types
export enum UserType {
  Candidate = 1,
  Employer = 2,
  Admin = 3,
}

export interface User {
  id: string;
  email: string;
  type: UserType;
  isActive: boolean;
  isSetupComplete: boolean;
  createdAt: string;
}

export interface UserSetupRequest {
  userType: UserType;
  firstName?: string;
  lastName?: string;
  companyName?: string;
  organizationType?: HealthcareOrganizationType;
}

// Job types
export enum JobStatus {
  Draft = 0,
  Active = 1,
  Paused = 2,
  Filled = 3,
  Cancelled = 4,
  Expired = 5,
}

export enum YearsOfExperience {
  EntryLevel = 0,
  Junior = 1,
  Intermediate = 2,
  Senior = 3,
  Expert = 4,
  Executive = 5,
}

export enum HealthcareOrganizationType {
  Hospital = 1,
  Clinic = 2,
  TechnologyCompany = 3,
  Pharmaceutical = 4,
  MedicalDevice = 5,
  Telemedicine = 6,
  HealthInsurance = 7,
  LongTermCare = 8,
  HomeHealth = 9,
  MentalHealth = 10,
  Consulting = 11,
  Government = 12,
  Academic = 13,
  Other = 99,
}

export interface JobLocation {
  city: string;
  state: string;
  zipCode: string;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  minExperience: YearsOfExperience;
  salaryMin?: number;
  salaryMax?: number;
  isRemote: boolean;
  requiresLicense: boolean;
  postedAt: string;
  expiresAt?: string;
  status: JobStatus;
  employerId: string;
  companyName: string;
  organizationType: HealthcareOrganizationType;
  location?: JobLocation;
  requiredCertifications: string[];
  requiredSpecialties: string[];
}

export interface JobSearchParams {
  keywords?: string;
  isRemote?: boolean;
  city?: string;
  state?: string;
  minExperience?: YearsOfExperience;
  minSalary?: number;
  certificationIds?: number[];
  specialtyIds?: number[];
  organizationType?: HealthcareOrganizationType;
  page?: number;
  pageSize?: number;
}

export interface JobSearchResponse {
  jobs: Job[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface CreateJobRequest {
  title: string;
  description: string;
  minExperience: YearsOfExperience;
  salaryMin?: number;
  salaryMax?: number;
  isRemote: boolean;
  requiresLicense: boolean;
  expiresInDays?: number;
  locationStreet?: string;
  locationCity?: string;
  locationState?: string;
  locationZipCode?: string;
  requiredCertificationIds?: number[];
  requiredSpecialtyIds?: number[];
}

export interface UpdateJobRequest {
  title?: string;
  description?: string;
  minExperience?: YearsOfExperience;
  salaryMin?: number;
  salaryMax?: number;
  isRemote?: boolean;
  status?: JobStatus;
}

export interface JobApplicationRequest {
  coverLetter?: string;
}

export interface JobApplicationResponse {
  applicationId: string;
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

// Better Auth profile type
export interface AuthentikProfile {
  sub: string;
  email: string;
  email_verified: boolean;
  name: string;
  given_name?: string;
  preferred_username?: string;
  nickname?: string;
  picture?: string;
  groups?: string[];
}
