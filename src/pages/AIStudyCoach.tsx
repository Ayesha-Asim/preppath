import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";

import {
  ArrowRight,
  BookOpen,
  BrainCircuit,
  LoaderCircle,
  MessageSquarePlus,
  Send,
  Sparkles,
  UserRound,
  AlertCircle,
} from "lucide-react";

import MainLayout from "../components/MainLayout";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const suggestions = [
  "Explain quadratic equations step by step",
  "Quiz me on computer science fundamentals",
  "Help me prepare for university entry tests",
  "Explain a difficult concept in simple words",
];

function normalizeMathMarkdown(content: string) {
  return content
    // Convert escaped display-math dollars:
    // \$\$ ... \$\$  ->  $$ ... $$
    .replace(/\\\$\\\$/g, "$$")

    // Convert escaped inline-math dollars:
    // \$ ... \$  ->  $ ... $
    .replace(/\\\$/g, "$")

    // Convert \[ ... \] to display math
    .replace(/\\\[([\s\S]*?)\\\]/g, (_, math) => {
      return `\n\n$$${math.trim()}$$\n\n`;
    })

    // Convert \( ... \) to inline math
    .replace(/\\\(([\s\S]*?)\\\)/g, (_, math) => {
      return `$${math.trim()}$`;
    });
}

function MessageText({
  content,
  role,
}: ChatMessage) {
  if (role === "user") {
    return (
      <div className="coach-message-text">
        {content}
      </div>
    );
  }

  const normalizedContent =
    normalizeMathMarkdown(content);

  return (
    <div className="coach-message-text coach-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          table: ({ children }) => (
            <div className="coach-table-wrap">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {normalizedContent}
      </ReactMarkdown>
    </div>
  );
}

export default function AIStudyCoach() {
  const { user, loading } = useAuth();
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const navigate = useNavigate();

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [draft, setDraft] = useState("");
  const [usePerformance, setUsePerformance] =
    useState(false);

  const [sending, setSending] =
    useState(false);

  const [streamStarted, setStreamStarted] =
    useState(false);

  const [error, setError] = useState("");

  const endRef =
    useRef<HTMLDivElement>(null);

  const inputRef =
    useRef<HTMLTextAreaElement>(null);

  const requestRef =
    useRef(false);

  const abortRef =
    useRef<AbortController | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, sending]);

  useEffect(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    requestRef.current = false;

    setMessages([]);
    setDraft("");
    setError("");
    setSending(false);
    setStreamStarted(false);
  }, [user?.id]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function sendMessage(
    text = draft
  ) {
    const message = text.trim();

    if (
      !message ||
      sending ||
      requestRef.current ||
      !user ||
      message.length > 4000
    ) {
      return;
    }

    requestRef.current = true;

    setSending(true);
    setStreamStarted(false);
    setError("");

    const history = messages
      .slice(-20)
      .map(({ role, content }) => ({
        role,
        content,
      }));

    setMessages((previous) => [
      ...previous,
      {
        role: "user",
        content: message,
      },
    ]);

    setDraft("");

    const controller =
      new AbortController();

    abortRef.current = controller;

    let assistantAdded = false;
    let assistantText = "";

    try {
      // -----------------------------------------
      // GET CURRENT SUPABASE SESSION
      // -----------------------------------------

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (
        sessionError ||
        !session?.access_token
      ) {
        throw new Error(
          "Your session has expired. Please sign in again."
        );
      }

      // -----------------------------------------
      // BUILD EDGE FUNCTION URL
      // -----------------------------------------

      const supabaseUrl =
        import.meta.env.VITE_SUPABASE_URL;

      const anonKey =
        import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !anonKey) {
        throw new Error(
          "PrepPath is missing its Supabase configuration."
        );
      }

      const functionUrl =
        `${supabaseUrl}/functions/v1/ai-study-coach`;

      // -----------------------------------------
      // CALL STREAMING EDGE FUNCTION
      // -----------------------------------------

      const response = await fetch(
        functionUrl,
        {
          method: "POST",

          signal: controller.signal,

          headers: {
            Authorization:
              `Bearer ${session.access_token}`,

            apikey: anonKey,

            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            message,
            history,
            usePerformance,
          }),
        }
      );

      // -----------------------------------------
      // HANDLE SERVER ERROR BEFORE STREAMING
      // -----------------------------------------

      if (!response.ok) {
        let serverMessage =
          "Could not reach the AI assistant.";

        try {
          const payload =
            await response.json();

          if (
            typeof payload?.error ===
              "string" &&
            payload.error.trim()
          ) {
            serverMessage =
              payload.error.trim();
          }
        } catch {
          // Keep generic message.
        }

        throw new Error(serverMessage);
      }

      if (!response.body) {
        throw new Error(
          "The assistant returned an empty response."
        );
      }

      // -----------------------------------------
      // READ STREAM
      // -----------------------------------------

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      while (true) {
        const {
          done,
          value,
        } = await reader.read();

        if (done) {
          break;
        }

        const chunk =
          decoder.decode(value, {
            stream: true,
          });

        if (!chunk) {
          continue;
        }

        assistantText += chunk;

        // First text has arrived.
        // Replace Thinking… with the actual
        // assistant bubble.
        if (!assistantAdded) {
          assistantAdded = true;
          setStreamStarted(true);

          setMessages((previous) => [
            ...previous,
            {
              role: "assistant",
              content: assistantText,
            },
          ]);
        } else {
          // Update only the currently streaming
          // assistant message.
          setMessages((previous) => {
            if (!previous.length) {
              return previous;
            }

            const next = [...previous];
            const lastIndex =
              next.length - 1;

            if (
              next[lastIndex]?.role !==
              "assistant"
            ) {
              return previous;
            }

            next[lastIndex] = {
              role: "assistant",
              content: assistantText,
            };

            return next;
          });
        }
      }

      // Flush any final decoder bytes.
      const finalChunk =
        decoder.decode();

      if (finalChunk) {
        assistantText += finalChunk;

        if (!assistantAdded) {
          assistantAdded = true;
          setStreamStarted(true);

          setMessages((previous) => [
            ...previous,
            {
              role: "assistant",
              content: assistantText,
            },
          ]);
        } else {
          setMessages((previous) => {
            const next = [...previous];

            if (
              next.length > 0 &&
              next[next.length - 1].role ===
                "assistant"
            ) {
              next[next.length - 1] = {
                role: "assistant",
                content: assistantText,
              };
            }

            return next;
          });
        }
      }

      if (!assistantText.trim()) {
        throw new Error(
          "The assistant returned an empty response."
        );
      }
    } catch (cause) {
      if (
        cause instanceof DOMException &&
        cause.name === "AbortError"
      ) {
        return;
      }

      const messageText =
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.";

      setError(messageText);

      /*
       * If streaming had already started, keep the
       * partial response visible instead of deleting
       * what the student already received.
       */
    } finally {
      abortRef.current = null;

      requestRef.current = false;

      setSending(false);
      setStreamStarted(false);

      inputRef.current?.focus();
    }
  }

  function onSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    void sendMessage();
  }

  function onKeyDown(
    event: KeyboardEvent<HTMLTextAreaElement>
  ) {
    if (
      event.key === "Enter" &&
      !event.shiftKey &&
      !event.nativeEvent.isComposing
    ) {
      event.preventDefault();
      void sendMessage();
    }
  }

  function newChat() {
    if (sending) {
      return;
    }

    setMessages([]);
    setDraft("");
    setError("");

    inputRef.current?.focus();
  }

  return (
    <MainLayout>
      <div
        className={`coach-page ${
          isDark
            ? "coach-dark"
            : "coach-light"
        }`}
      >
        <div className="coach-header">
          <div>
            <div className="coach-eyebrow">
              <Sparkles size={13} />
              PREPPATH AI
            </div>

            <h1>AI Study Coach</h1>

            <p>
              Your AI assistant for studying,
              university prep, and everyday
              questions.
            </p>
          </div>

          {user && !loading && (
            <button
              className="coach-new"
              onClick={newChat}
              disabled={sending}
            >
              <MessageSquarePlus size={16} />
              New chat
            </button>
          )}
        </div>

        {loading ? (
          <div className="coach-gate">
            <LoaderCircle
              className="coach-spin"
              size={27}
            />

            <h2>Loading your account…</h2>
          </div>
        ) : !user ? (
          <div className="coach-gate">
            <h2>Sign in to chat</h2>

            <p>
              Create an account or sign in to
              use the AI Study Coach.
            </p>

            <button
              className="coach-primary"
              onClick={() =>
                navigate("/login")
              }
            >
              Sign in
              <ArrowRight size={16} />
            </button>
          </div>
        ) : (
          <div className="coach-chat-shell">
            <div className="coach-chat-top">
              <span className="coach-chat-title">
                <BrainCircuit size={18} />
                PrepPath Assistant
              </span>

              <span className="coach-status">
                <span />
                Unlimited messages
              </span>
            </div>

            <div
              className="coach-chat-scroll"
              role="log"
              aria-label="Chat messages"
              aria-live="polite"
            >
              {messages.length === 0 && (
                <div className="coach-welcome">
                  <div className="coach-welcome-icon">
                    <BrainCircuit
                      size={29}
                    />
                  </div>

                  <h2>
                    What can I help you with?
                  </h2>

                  <p>
                    Ask me anything. I’m
                    especially useful for learning
                    new concepts, solving practice
                    questions, and planning your
                    studies.
                  </p>

                  <div className="coach-suggestions">
                    {suggestions.map(
                      (suggestion) => (
                        <button
                          key={suggestion}
                          onClick={() =>
                            void sendMessage(
                              suggestion
                            )
                          }
                          disabled={sending}
                        >
                          <BookOpen size={16} />

                          <span>
                            {suggestion}
                          </span>

                          <ArrowRight
                            size={14}
                          />
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}

              {messages.map(
                (item, index) => (
                  <div
                    key={index}
                    className={`coach-message-row ${
                      item.role === "user"
                        ? "coach-from-user"
                        : "coach-from-ai"
                    }`}
                  >
                    <div className="coach-avatar">
                      {item.role === "user" ? (
                        <UserRound
                          size={16}
                        />
                      ) : (
                        <BrainCircuit
                          size={17}
                        />
                      )}
                    </div>

                    <div className="coach-bubble">
                      <MessageText
                        content={item.content}
                        role={item.role}
                      />
                    </div>
                  </div>
                )
              )}

              {sending &&
                !streamStarted && (
                  <div className="coach-message-row coach-from-ai">
                    <div className="coach-avatar">
                      <BrainCircuit
                        size={17}
                      />
                    </div>

                    <div className="coach-bubble coach-thinking">
                      <LoaderCircle
                        className="coach-spin"
                        size={16}
                      />
                      Thinking…
                    </div>
                  </div>
                )}

              <div ref={endRef} />
            </div>

            <div className="coach-compose">
              {error && (
                <div
                  className="coach-error"
                  role="alert"
                >
                  <AlertCircle size={16} />

                  <span>
                    {error} Your message is
                    still in the chat; you can
                    retry by sending it again.
                  </span>
                </div>
              )}

              <label className="coach-performance">
                <input
                  type="checkbox"
                  checked={usePerformance}
                  onChange={(event) =>
                    setUsePerformance(
                      event.target.checked
                    )
                  }
                  disabled={sending}
                />

                <span>
                  Use my PrepPath test
                  performance for personalized
                  advice
                </span>
              </label>

              <form
                className="coach-input-box"
                onSubmit={onSubmit}
              >
                <textarea
                  ref={inputRef}
                  value={draft}
                  onChange={(event) =>
                    setDraft(
                      event.target.value
                    )
                  }
                  onKeyDown={onKeyDown}
                  placeholder="Ask anything…"
                  aria-label="Message PrepPath Assistant"
                  maxLength={4000}
                  rows={2}
                  disabled={sending}
                />

                <button
                  type="submit"
                  disabled={
                    !draft.trim() ||
                    sending
                  }
                  aria-label="Send message"
                >
                  {sending ? (
                    <LoaderCircle
                      className="coach-spin"
                      size={18}
                    />
                  ) : (
                    <Send size={18} />
                  )}
                </button>
              </form>

              <div className="coach-compose-bottom">
                <span>
                  Enter to send · Shift + Enter
                  for a new line
                </span>

                <span>
                  {draft.length}/4000
                </span>
              </div>

              <p className="coach-disclaimer">
                AI can make mistakes. Verify
                important information, especially
                current university admissions and
                deadlines. Chats are not saved
                when you leave this page. AI
                provider limits may still apply.
              </p>
            </div>
          </div>
        )}
      </div>

      <style>{styles}</style>
    </MainLayout>
  );
}

const styles = `
.coach-limit{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:10px 12px;border:1px solid var(--c-border);border-radius:10px;background:var(--c-soft);color:var(--c-text);font-size:12px;margin-bottom:12px}.coach-status{white-space:nowrap}

.coach-page{--c-bg:#100c17;--c-card:#1c1426;--c-soft:#241b30;--c-border:rgba(171,132,255,.16);--c-text:#f6f1ff;--c-muted:#b5a9c5;--c-purple:#a78bfa;color:var(--c-text);max-width:1180px;margin:0 auto;padding:26px 22px 32px;font-family:inherit}

.coach-light{--c-bg:#f8f6fc;--c-card:#fff;--c-soft:#f4f0fb;--c-border:rgba(97,59,155,.16);--c-text:#241733;--c-muted:#756785;--c-purple:#6d28d9}

.coach-page button,.coach-page textarea{font:inherit}.coach-page button{cursor:pointer}.coach-page button:disabled{cursor:not-allowed;opacity:.55}

.coach-header{display:flex;justify-content:space-between;align-items:center;gap:20px;margin-bottom:22px}.coach-eyebrow{display:inline-flex;align-items:center;gap:7px;color:var(--c-purple);font-size:11px;font-weight:800;letter-spacing:.11em;margin-bottom:8px}.coach-header h1{font-size:clamp(26px,3vw,34px);line-height:1.15;letter-spacing:-.04em;margin:0 0 8px;font-weight:800}.coach-header p{margin:0;color:var(--c-muted);font-size:14px}.coach-new{display:inline-flex;align-items:center;gap:8px;border:1px solid var(--c-border);border-radius:10px;background:var(--c-card);color:var(--c-text);padding:10px 14px;white-space:nowrap;font-size:13px;font-weight:700}

.coach-chat-shell{background:var(--c-card);border:1px solid var(--c-border);border-radius:17px;overflow:hidden;display:flex;flex-direction:column;height:min(760px,calc(100vh - 205px));min-height:480px;box-shadow:0 12px 42px rgba(0,0,0,.08)}.coach-chat-top{padding:16px 20px;border-bottom:1px solid var(--c-border);display:flex;align-items:center;justify-content:space-between;gap:12px}.coach-chat-title{display:flex;align-items:center;gap:9px;font-weight:750;font-size:14px}.coach-chat-title svg{color:var(--c-purple)}.coach-status{display:flex;align-items:center;gap:7px;color:var(--c-muted);font-size:11px}.coach-status span{width:7px;height:7px;border-radius:50%;background:#a78bfa}

.coach-chat-scroll{flex:1;overflow-y:auto;min-height:0;padding:24px 22px;scroll-behavior:smooth}.coach-welcome{max-width:680px;margin:clamp(18px,6vh,62px) auto 24px;text-align:center}.coach-welcome-icon,.coach-gate-icon{width:56px;height:56px;border-radius:17px;display:grid;place-items:center;background:linear-gradient(135deg,#6d28d9,#a78bfa);color:white;margin:0 auto 18px}.coach-welcome h2{font-size:24px;letter-spacing:-.035em;margin:0 0 10px}.coach-welcome p{color:var(--c-muted);font-size:13px;line-height:1.7;max-width:520px;margin:0 auto 24px}.coach-suggestions{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;text-align:left}.coach-suggestions button{display:flex;align-items:center;gap:10px;text-align:left;border:1px solid var(--c-border);border-radius:11px;background:var(--c-soft);color:var(--c-text);padding:14px;font-size:12px;line-height:1.4}.coach-suggestions button:hover,.coach-new:hover{border-color:var(--c-purple)}.coach-suggestions button svg:first-child{color:var(--c-purple);flex-shrink:0}.coach-suggestions button svg:last-child{margin-left:auto;flex-shrink:0;color:var(--c-muted)}

.coach-message-row{display:flex;align-items:flex-start;gap:10px;margin:0 auto 22px;max-width:840px}.coach-avatar{width:30px;height:30px;border-radius:10px;background:var(--c-soft);color:var(--c-purple);display:grid;place-items:center;flex-shrink:0}.coach-bubble{background:var(--c-soft);border:1px solid var(--c-border);padding:12px 15px;border-radius:3px 13px 13px 13px;max-width:min(85%,720px);font-size:13px;line-height:1.75;overflow-wrap:anywhere}.coach-message-text{white-space:pre-wrap}.coach-markdown{white-space:normal;min-width:0}.coach-markdown>*:first-child{margin-top:0}.coach-markdown>*:last-child{margin-bottom:0}.coach-markdown p{margin:0 0 10px}.coach-markdown h1,.coach-markdown h2,.coach-markdown h3,.coach-markdown h4{font-size:1.1em;line-height:1.4;margin:15px 0 8px;font-weight:800}.coach-markdown ul,.coach-markdown ol{padding-left:22px;margin:8px 0 12px}.coach-markdown li{margin:3px 0}.coach-markdown li>p{margin:0}.coach-markdown table{border-collapse:collapse;width:100%;min-width:360px;font-size:12px;line-height:1.5}.coach-markdown th,.coach-markdown td{border:1px solid var(--c-border);padding:8px 10px;text-align:left;vertical-align:top;overflow-wrap:break-word}.coach-markdown th{background:var(--c-card);font-weight:800}.coach-markdown tr:nth-child(even) td{background:var(--c-card)}.coach-markdown .coach-table-wrap{max-width:100%;overflow-x:auto;margin:10px 0 14px}.coach-markdown pre{max-width:100%;overflow-x:auto;padding:10px;border-radius:8px;background:var(--c-card)}.coach-markdown code{font-size:.9em}.coach-markdown a{color:var(--c-purple);text-decoration:underline;overflow-wrap:anywhere}.coach-markdown blockquote{border-left:3px solid var(--c-purple);padding-left:12px;margin:10px 0;color:var(--c-muted)}.coach-from-user{flex-direction:row-reverse}.coach-from-user .coach-avatar{background:rgba(124,58,237,.2)}.coach-from-user .coach-bubble{background:#6d28d9;color:#fff;border-color:#6d28d9;border-radius:13px 3px 13px 13px}.coach-thinking{display:flex;align-items:center;gap:9px;color:var(--c-muted)}

.coach-compose{border-top:1px solid var(--c-border);padding:14px 20px 13px;background:var(--c-card)}.coach-performance{display:flex;align-items:center;gap:9px;color:var(--c-muted);font-size:12px;margin:0 0 11px;cursor:pointer}.coach-performance input{accent-color:#7c3aed;width:15px;height:15px}.coach-input-box{display:flex;align-items:flex-end;gap:10px;background:var(--c-soft);border:1px solid var(--c-border);border-radius:12px;padding:9px}.coach-input-box:focus-within{border-color:var(--c-purple)}.coach-input-box textarea{flex:1;min-width:0;max-height:150px;resize:vertical;background:transparent;border:0;outline:0;color:var(--c-text);padding:6px;font-size:13px;line-height:1.5}.coach-input-box textarea::placeholder{color:var(--c-muted)}.coach-input-box button,.coach-primary{background:#7c3aed;color:#fff;border:0;border-radius:9px;display:inline-flex;align-items:center;justify-content:center;gap:8px}.coach-input-box button{width:38px;height:38px;flex-shrink:0}.coach-compose-bottom{display:flex;justify-content:space-between;gap:8px;color:var(--c-muted);font-size:10px;margin-top:7px}.coach-disclaimer{color:var(--c-muted);font-size:10px;text-align:center;line-height:1.5;margin:10px 0 0}.coach-error{display:flex;gap:8px;align-items:flex-start;color:#e7a4bb;font-size:12px;margin-bottom:10px}.coach-error svg{flex-shrink:0}.coach-gate{border:1px solid var(--c-border);background:var(--c-card);border-radius:16px;max-width:720px;margin:30px auto;padding:50px 35px;text-align:center}.coach-gate h2{font-size:26px;letter-spacing:-.035em;margin:6px 0 12px}.coach-gate p{color:var(--c-muted);font-size:14px;line-height:1.7;max-width:530px;margin:0 auto 22px}.coach-benefits{display:flex;justify-content:center;flex-wrap:wrap;gap:10px;margin-bottom:24px}.coach-benefits span{display:inline-flex;align-items:center;gap:6px;background:var(--c-soft);padding:9px 11px;border-radius:8px;font-size:11px}.coach-benefits svg{color:var(--c-purple)}.coach-primary{padding:12px 18px;font-size:13px;font-weight:750}.coach-spin{animation:coach-rotate 1s linear infinite}@keyframes coach-rotate{to{transform:rotate(360deg)}}

@media(max-width:650px){.coach-page{padding:17px 12px}.coach-header{align-items:flex-start}.coach-header h1{font-size:26px}.coach-header p{font-size:12px}.coach-new{font-size:0;padding:10px}.coach-new svg{width:18px;height:18px}.coach-chat-shell{height:calc(100dvh - 205px);min-height:460px}.coach-chat-scroll{padding:18px 12px}.coach-chat-top{padding:13px}.coach-suggestions{grid-template-columns:1fr}.coach-welcome{margin:12px auto 20px}.coach-welcome h2{font-size:21px}.coach-bubble{max-width:85%}.coach-compose{padding:12px}.coach-compose-bottom span:first-child{display:none}.coach-compose-bottom{justify-content:flex-end}.coach-gate{padding:35px 17px}}
`;