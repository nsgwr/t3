export interface Proposal {
  title: string;
  content: string;
  hiring_number: number;
  required_token_number: number;
  impl_period_from_date: Date;
  impl_period_to_date: Date;
}

export interface Result {
  content: string;
}

export interface Project {
  project_id: string;
  project_member_address: string;
  type: "pj" | "user";
  quarter: string;
  status: string;
  proposal?: Proposal;
  result?: Result;
  created_at: Date;
  updated_at: Date;
}