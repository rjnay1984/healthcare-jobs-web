import axios, { AxiosInstance } from "axios";
import {
  Job,
  JobSearchParams,
  JobSearchResponse,
  CreateJobRequest,
  UpdateJobRequest,
} from "@/types";
import { getAccessToken } from "./get-access.token";

class ServerApiClient {
  private async getClient(): Promise<AxiosInstance> {
    const token = await getAccessToken();
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });
  }

  async getCurrentUser(): Promise<{
    userId: string;
    email: string;
    userType: string;
    hasCompletedOnboarding: boolean;
  } | null> {
    try {
      const client = await this.getClient();
      const response = await client.get<{
        userId: string;
        email: string;
        userType: string;
        hasCompletedOnboarding: boolean;
      }>("/api/users/me");
      return response.data;
    } catch (error) {
      console.error("Error fetching current user:", error);
      return null;
    }
  }

  // Job endpoints
  async searchJobs(params?: JobSearchParams): Promise<JobSearchResponse> {
    const client = await this.getClient();
    const response = await client.get("/api/jobs", { params });
    return response.data;
  }

  async getJob(id: string): Promise<Job> {
    const client = await this.getClient();
    const response = await client.get<Job>(`/api/jobs/${id}`);
    return response.data;
  }

  async createJob(data: CreateJobRequest): Promise<{ id: string }> {
    const client = await this.getClient();
    const response = await client.post<{ id: string }>("/api/jobs", data);
    return response.data;
  }

  async updateJob(
    id: string,
    data: UpdateJobRequest
  ): Promise<{ id: string; message: string }> {
    const client = await this.getClient();
    const response = await client.put<{ id: string; message: string }>(
      `/api/jobs/${id}`,
      data
    );
    return response.data;
  }

  async deleteJob(id: string): Promise<void> {
    const client = await this.getClient();
    await client.delete(`/api/jobs/${id}`);
  }
}

export const serverApi = new ServerApiClient();
