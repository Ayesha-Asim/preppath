import { supabase } from "../lib/supabase";

type BookmarkToggleResult = {
  bookmarked: boolean;
  message?: string;
};

/**
 * Checks whether the signed-in user has bookmarked a question.
 */
export async function isBookmarked(
  questionId: string
): Promise<boolean> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Bookmark auth error:", userError);
    return false;
  }

  if (!user) return false;

  const { data, error } = await supabase
    .from("bookmarked_questions")
    .select("id")
    .eq("user_id", user.id)
    .eq("question_id", questionId)
    .maybeSingle();

  if (error) {
    console.error("Bookmark check error:", error);
    return false;
  }

  return Boolean(data);
}

/**
 * Adds or removes a bookmark through the database function.
 * All signed-in students can save unlimited bookmarks.
 */
export async function toggleBookmark(
  questionId: string
): Promise<BookmarkToggleResult> {
  if (!questionId) {
    return {
      bookmarked: false,
      message: "This question cannot be bookmarked.",
    };
  }

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    console.error("Bookmark auth error:", userError);

    return {
      bookmarked: false,
      message: "Could not verify your account.",
    };
  }

  if (!user) {
    return {
      bookmarked: false,
      message: "You must be signed in to save bookmarks.",
    };
  }

  const { data, error } = await supabase.rpc("toggle_bookmark", {
    target_question_id: questionId,
  });

  if (error) {
    console.error("Bookmark toggle error:", error);

    return {
      bookmarked: false,
      message: "Could not update your bookmark.",
    };
  }

  const result = (data ?? {}) as {
    bookmarked?: boolean;
    message?: string;
  };

  return {
    bookmarked: result.bookmarked === true,
    message:
      typeof result.message === "string"
        ? result.message
        : undefined,
  };
}