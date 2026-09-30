import { supabase } from "../lib/supabase";

type QuizPermission = {
  allowed: boolean;
  message?: string;
  remaining?: number | null;
};

/**
 * All signed-in students can start quizzes without a daily limit.
 */
export async function canStartQuiz(): Promise<QuizPermission> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Failed to check quiz access:", error);

    return {
      allowed: false,
      message: "Something went wrong while checking your quiz access.",
    };
  }

  if (!user) {
    return {
      allowed: false,
      message: "Please log in.",
    };
  }

  return {
    allowed: true,
    remaining: null,
  };
}

/**
 * Retained for compatibility with TestRunner.
 * Quiz attempts no longer need to be counted.
 */
export async function incrementQuizCount(): Promise<void> {
  return;
}

/**
 * There is no daily quiz limit.
 */
export async function getRemainingQuizzes(): Promise<number> {
  return Infinity;
}