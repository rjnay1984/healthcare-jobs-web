import axios, { AxiosInstance } from "axios";
import {
  User,
  UserSetupRequest,
  Job,
  JobSearchParams,
  JobSearchResponse,
  CreateJobRequest,
  UpdateJobRequest,
} from "@/types";

class ServerApiClient {
  private getClient(token: string): AxiosInstance {
    return axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // User endpoints
  async getCurrentUser(token: string): Promise<User> {
    const client = this.getClient(token);
    const response = await client.get<User>("/api/users/me");
    return response.data;
  }

  async setupUser(token: string, data: UserSetupRequest): Promise<User> {
    const client = this.getClient(token);
    const response = await client.post<User>("/api/users/setup", data);
    return response.data;
  }

  // Job endpoints
  async searchJobs(
    token: string,
    params?: JobSearchParams
  ): Promise<JobSearchResponse> {
    const client = this.getClient(token);
    const response = await client.get("/api/jobs", { params });
    return response.data;
  }

  async getJob(token: string, id: string): Promise<Job> {
    const client = this.getClient(token);
    const response = await client.get<Job>(`/api/jobs/${id}`);
    return response.data;
  }

  async createJob(
    token: string,
    data: CreateJobRequest
  ): Promise<{ id: string }> {
    const client = this.getClient(token);
    const response = await client.post<{ id: string }>("/api/jobs", data);
    return response.data;
  }

  async updateJob(
    token: string,
    id: string,
    data: UpdateJobRequest
  ): Promise<{ id: string; message: string }> {
    const client = this.getClient(token);
    const response = await client.put<{ id: string; message: string }>(
      `/api/jobs/${id}`,
      data
    );
    return response.data;
  }

  async deleteJob(token: string, id: string): Promise<void> {
    const client = this.getClient(token);
    await client.delete(`/api/jobs/${id}`);
  }
}

export const serverApi = new ServerApiClient();
