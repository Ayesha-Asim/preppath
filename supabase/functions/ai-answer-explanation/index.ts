import "@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "@supabase/supabase-js";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const jsonHeaders = {
  ...corsHeaders,
  "Content-Type": "application/json",
};

interface RequestBody {
  subject: string;
  question: string;
  options: string[];
  selectedAnswer: string;
  correctAnswer: string;
  existingExplanation?: string;
}

function jsonResponse(body: Record<string, unknown>, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: jsonHeaders,
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    // ---------------------------------------------------------
    // 1. Authenticate PrepPath user
    // ---------------------------------------------------------

    const authHeader = req.headers.get("Authorization");

    if (!authHeader?.startsWith("Bearer ")) {
      return jsonResponse(
        { error: "You must be signed in to use AI explanations." },
        401
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");

    if (!supabaseUrl || !supabaseAnonKey) {
      return jsonResponse({ error: "Server configuration error." }, 500);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: authHeader,
        },
      },
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const token = authHeader.replace("Bearer ", "").trim();

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser(token);

    if (userError || !user) {
      return jsonResponse(
        {
          error:
            "Your session is invalid or has expired. Please sign in again.",
        },
        401
      );
    }

    // ---------------------------------------------------------
    // 2. Validate request
    // ---------------------------------------------------------

    let body: RequestBody;

    try {
      body = await req.json();
    } catch {
      return jsonResponse({ error: "Invalid request body." }, 400);
    }

    const {
      subject,
      question,
      options,
      selectedAnswer,
      correctAnswer,
      existingExplanation,
    } = body;

    if (
      typeof subject !== "string" ||
      typeof question !== "string" ||
      !Array.isArray(options) ||
      options.length < 2 ||
      !options.every((option) => typeof option === "string") ||
      typeof selectedAnswer !== "string" ||
      typeof correctAnswer !== "string"
    ) {
      return jsonResponse({ error: "Invalid question data." }, 400);
    }

    if (
      subject.length > 100 ||
      question.length > 5000 ||
      options.length > 10 ||
      options.some((option) => option.length > 2000) ||
      selectedAnswer.length > 2000 ||
      correctAnswer.length > 2000 ||
      (existingExplanation && existingExplanation.length > 5000)
    ) {
      return jsonResponse({ error: "Question data is too large." }, 400);
    }

    // ---------------------------------------------------------
    // 3. Groq configuration
    // ---------------------------------------------------------

    const groqApiKey = Deno.env.get("GROQ_API_KEY");

    if (!groqApiKey) {
      console.error("GROQ_API_KEY is missing.");

      return jsonResponse(
        { error: "AI explanations are temporarily unavailable." },
        500
      );
    }

    const model = "openai/gpt-oss-20b";

    // ---------------------------------------------------------
    // 4. Build explanation prompt
    // ---------------------------------------------------------

    const prompt = `A student is practicing ${subject}.

Question:
${question}

Options:
${options
  .map(
    (option, index) =>
      `${String.fromCharCode(65 + index)}. ${option}`
  )
  .join("\n")}

Student's answer:
${selectedAnswer}

Correct answer:
${correctAnswer}

Existing explanation:
${existingExplanation || "None provided."}

Explain the answer clearly and accurately.

Requirements:
- Explain why the supplied correct answer is correct.
- If the student's answer is wrong, briefly explain the mistake.
- Do not change the supplied correct answer.
- Do not invent missing information.
- Keep the explanation concise but complete.
- Show important calculation steps when useful.
- Use normal Markdown.
- For inline mathematics, use $...$.
- For displayed mathematics, use $$...$$.
- Never leave LaTeX commands such as \\frac, \\sqrt, \\binom, \\sum, \\cdot, \\begin, or \\det outside math delimiters.
- Return only the explanation for the student.`;

    // ---------------------------------------------------------
    // 5. Call Groq
    // ---------------------------------------------------------

    const callGroq = async () => {
      return await fetch(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${groqApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model,
            messages: [
              {
                role: "system",
                content:
                  "You are PrepPath's study tutor. Give accurate, concise educational explanations. Use Markdown. When writing mathematical notation, always place LaTeX inside $...$ for inline math or $$...$$ for display math. Return only the explanation intended for the student.",
              },
              {
                role: "user",
                content: prompt,
              },
            ],
            temperature: 0.4,
            max_completion_tokens: 900,
            stream: false,
          }),
        }
      );
    }

    // ---------------------------------------------------------
    // 6. Try Groq
    // ---------------------------------------------------------

    let finalText = "";

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const response = await callGroq();

        if (!response.ok) {
          const providerError = await response.text().catch(() => "");

          console.error(
            `Groq attempt ${attempt} failed:`,
            response.status,
            providerError.slice(0, 500)
          );

          // Don't immediately return because a temporary provider
          // error may succeed on the second attempt.
          continue;
        }

        const data = await response.json();

        const content = data?.choices?.[0]?.message?.content;

        if (typeof content !== "string" || !content.trim()) {
          console.error(
            `Groq attempt ${attempt} returned no explanation text.`
          );

          continue;
        }

        finalText = content.trim();
        break;
      } catch (error) {
        console.error(
          `Groq attempt ${attempt} threw an error:`,
          error
        );
      }
    }

    if (!finalText) {
      return jsonResponse(
        {
          error:
            "The AI explanation could not be generated. Please try again.",
        },
        502
      );
    }

    // ---------------------------------------------------------
    // 7. Preserve TestRunner's existing SSE response contract
    // ---------------------------------------------------------

    const encoder = new TextEncoder();

    const outputStream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({
              choices: [
                {
                  delta: {
                    content: finalText,
                  },
                },
              ],
            })}\n\n`
          )
        );

        controller.enqueue(
          encoder.encode("data: [DONE]\n\n")
        );

        controller.close();
      },
    });

    return new Response(outputStream, {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("AI explanation function error:", error);

    return jsonResponse(
      {
        error:
          "Something went wrong while generating the AI explanation.",
      },
      500
    );
  }
});