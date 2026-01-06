export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Update {
  id: number;
  title: string;
  description: string;
  category?: string;
  image_url?: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Certificate {
  id: number;
  certificate_name: string;
  full_name: string;
  issuer: string;
  image_path: string;
  issue_date: string;
  certificate_number?: string;
  score?: string;
  skills_covered?: string;
  description?: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface Image {
  id: number;
  file_name: string;
  file_path: string;
  file_type?: string;
  file_size?: number;
  created_at: string;
  updated_at: string;
}