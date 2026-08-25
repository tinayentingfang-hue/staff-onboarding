export type Role = "staff" | "admin";

export type Profile = {
  id: string;
  full_name: string;
  role: Role;
  start_date: string | null;
  created_at: string;
};

export type Module = {
  id: string;
  slug: string;
  order_index: number;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export type QuizOption = {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  order_index: number;
};

export type QuizQuestion = {
  id: string;
  module_id: string;
  question: string;
  order_index: number;
  quiz_options: QuizOption[];
};

export type ProgressStatus = "not_started" | "in_progress" | "completed";

export type ModuleProgress = {
  id: string;
  user_id: string;
  module_id: string;
  status: ProgressStatus;
  completed_at: string | null;
  updated_at: string;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  module_id: string;
  score: number;
  total: number;
  passed: boolean;
  created_at: string;
};

export type StaffNote = {
  id: string;
  user_id: string;
  module_id: string | null;
  note: string;
  created_at: string;
  updated_at: string;
};
