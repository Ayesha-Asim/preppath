import { supabase } from "./supabase";

export type AchievementIconName =
  | "target" | "clipboard" | "flame" | "help" | "calendar"
  | "award" | "book" | "chart" | "spark" | "rocket" | "crown";

export type AchievementTestResult = {
  subject?: string | null;
  score?: number | string | null;
  total_questions?: number | string | null;
  total?: number | string | null;
  created_at?: string | null;
};

export type Achievement = {
  key: string;
  title: string;
  message: string;
  icon: AchievementIconName;
  current: number;
  target: number;
  unlocked: boolean;
  daily: boolean;
  suffix: string;
};

const safeDate = (value?: string | null) => {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const startOfDay = (date: Date) => {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy;
};

const testAccuracy = (result: AchievementTestResult) => {
  const score = Number(result.score || 0);
  const total = Number(result.total_questions ?? result.total ?? 0);
  return total > 0 ? Math.round((score / total) * 100) : 0;
};

const average = (values: number[]) =>
  values.length
    ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length)
    : 0;

export function buildAchievements(
  results: AchievementTestResult[],
  streak: number,
  now = new Date()
): Achievement[] {
  const todayStart = startOfDay(now);
  const tomorrow = new Date(todayStart);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayResults = results.filter((result) => {
    const date = safeDate(result.created_at);
    return date !== null && date >= todayStart && date < tomorrow;
  });

  const totalQuestions = results.reduce(
    (sum, result) => sum + Number(result.total_questions ?? result.total ?? 0), 0
  );
  const todayQuestions = todayResults.reduce(
    (sum, result) => sum + Number(result.total_questions ?? result.total ?? 0), 0
  );
  const todaySubjects = new Set(
    todayResults.map((result) => result.subject?.trim()).filter(Boolean)
  ).size;
  const uniqueSubjects = new Set(
    results.map((result) => result.subject?.trim()).filter(Boolean)
  ).size;
  const allTimeAccuracy = results.length ? average(results.map(testAccuracy)) : 0;
  const bestAccuracy = results.length ? Math.max(...results.map(testAccuracy)) : 0;
  const todayBest = todayResults.length ? Math.max(...todayResults.map(testAccuracy)) : 0;

  const createBadge = (
    key: string, title: string, message: string, icon: AchievementIconName,
    current: number, target: number, daily = false, suffix = ""
  ): Achievement => ({
    key, title, message, icon,
    current: Math.min(Math.max(0, current), target),
    target, unlocked: current >= target, daily, suffix,
  });

  return [
    createBadge("first_step", "First Step", "You completed your first mock test!", "target", results.length, 1),
    createBadge("getting_started", "Finding Your Rhythm", "You completed 3 mock tests!", "clipboard", results.length, 3),
    createBadge("practice_regular", "Practice Regular", "You completed 5 mock tests!", "book", results.length, 5),
    createBadge("double_digits", "Double Digits", "You completed 10 mock tests!", "award", results.length, 10),
    createBadge("test_explorer", "Test Explorer", "You completed 25 mock tests!", "rocket", results.length, 25),
    createBadge("practice_pro", "Practice Pro", "You completed 50 mock tests!", "crown", results.length, 50),
    createBadge("question_starter", "Question Starter", "You answered 50 practice questions!", "help", totalQuestions, 50),
    createBadge("question_collector", "Question Collector", "You answered 250 practice questions!", "book", totalQuestions, 250),
    createBadge("question_champion", "Question Champion", "You answered 1,000 practice questions!", "award", totalQuestions, 1000),
    createBadge("subject_explorer", "Subject Explorer", "You practiced 3 different subjects!", "book", uniqueSubjects, 3),
    createBadge("subject_versatile", "Subject All-Rounder", "You practiced 5 different subjects!", "spark", uniqueSubjects, 5),
    createBadge("strong_finish", "Strong Finish", "You scored at least 80% on a mock test!", "target", bestAccuracy, 80, false, "%"),
    createBadge("near_perfect", "Almost Perfect", "You scored at least 95% on a mock test!", "award", bestAccuracy, 95, false, "%"),
    createBadge("steady_progress", "Steady Progress", "You reached 70% average test accuracy!", "chart", allTimeAccuracy, 70, false, "%"),
    createBadge("high_accuracy", "High Accuracy", "You reached 85% average test accuracy!", "crown", allTimeAccuracy, 85, false, "%"),
    createBadge("three_day_streak", "Three-Day Momentum", "You reached a 3-day study streak!", "flame", streak, 3),
    createBadge("seven_day_streak", "One-Week Momentum", "You reached a 7-day study streak!", "flame", streak, 7),
    createBadge("fourteen_day_streak", "Two-Week Momentum", "You reached a 14-day study streak!", "flame", streak, 14),
    createBadge("daily_first", "Today's First Step", "You completed a mock test today!", "calendar", todayResults.length, 1, true),
    createBadge("daily_two", "Daily Double", "You completed 2 mock tests today!", "clipboard", todayResults.length, 2, true),
    createBadge("daily_three", "Triple Practice", "You completed 3 mock tests today!", "target", todayResults.length, 3, true),
    createBadge("daily_questions", "Question Sprint", "You answered 20 practice questions today!", "help", todayQuestions, 20, true),
    createBadge("daily_questions_50", "Question Marathon", "You answered 50 practice questions today!", "rocket", todayQuestions, 50, true),
    createBadge("daily_subjects", "Daily Explorer", "You practiced 2 subjects today!", "book", todaySubjects, 2, true),
    createBadge("daily_accuracy", "Today's High Score", "You scored at least 80% on a mock test today!", "award", todayBest, 80, true, "%"),
  ];
}

export async function notifyNewAchievements(
  userId: string,
  results: AchievementTestResult[],
  streak: number,
  now = new Date()
): Promise<Achievement[]> {
  const unlocked = buildAchievements(results, streak, now).filter((badge) => badge.unlocked);
  const newlyNotified: Achievement[] = [];
  const localDay = now.toDateString();

  for (const badge of unlocked) {
    const notificationTitle = `Badge earned: ${badge.title}`;

    const { data: existing, error: lookupError } = await supabase
      .from("notifications")
      .select("id, created_at")
      .eq("user_id", userId)
      .eq("type", "achievement")
      .eq("title", notificationTitle);

    if (lookupError) {
      console.error("Badge notification lookup error:", lookupError.message);
      continue;
    }

    const alreadyNotified = badge.daily
      ? (existing || []).some(
          (entry) => entry.created_at &&
            new Date(entry.created_at).toDateString() === localDay
        )
      : Boolean(existing?.length);

    if (alreadyNotified) continue;

    const { error } = await supabase.from("notifications").insert({
      user_id: userId,
      title: notificationTitle,
      message: badge.message,
      type: "achievement",
      is_read: false,
    });

    if (error) {
      console.error("Badge notification error:", error.message);
      continue;
    }

    newlyNotified.push(badge);
  }

  return newlyNotified;
}
