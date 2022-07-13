export interface I_Job {
  id: string;
  createdAt: string;
  numberOfPositions: number;
  companyName: string;
  title: string;
  area: string;
  description: string;
  flagCode: string;
  relocate: string;
  salaryFrom: number;
  salaryTo: number;
  currency: string;
  jobType: string;
  skills: string;
}
