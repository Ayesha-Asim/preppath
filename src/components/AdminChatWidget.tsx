import { useEffect, useRef, useState } from "react";
import { supabase } from "../lib/supabase";

type Message = { id: string; sender_id: string; content: string; created_at: string };

export default function AdminChatWidget() {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [open, setOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unread, setUnread] = useState(false);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const bottom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    async function identify() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!active) return;
      setUserId(user?.id ?? null);
      if (!user) return;
      const { data } = await supabase.from("profiles").select("is_admin").eq("id", user.id).maybeSingle();
      if (active) setIsAdmin(data?.is_admin === true);
    }
    void identify();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      if (active) { setUserId(null); setIsAdmin(false); setConversationId(null); setMessages([]); setOpen(false); void identify(); }
    });
    return () => { active = false; subscription.unsubscribe(); };
  }, []);

  useEffect(() => {
    if (!userId || isAdmin) return;
    let active = true;
    async function load() {
      const { data: conversation, error: conversationError } = await supabase.from("admin_chat_conversations")
        .select("id,student_last_read_at").eq("student_id", userId).maybeSingle();
      if (!active) return;
      if (conversationError) { setError(conversationError.message); return; }
      const id = conversation?.id ?? null;
      setConversationId(id);
      if (!id) { setMessages([]); setUnread(false); return; }
      const { data, error: messageError } = await supabase.from("admin_chat_messages")
        .select("id,sender_id,content,created_at").eq("conversation_id", id)
        .order("created_at", { ascending: true }).limit(500);
      if (!active) return;
      if (messageError) { setError(messageError.message); return; }
      const rows = (data ?? []) as Message[];
      setMessages(rows); setError("");
      const latestAdminMessage = [...rows].reverse().find(message => message.sender_id !== userId);
      if (!conversation) return;
      const hasUnread = !!latestAdminMessage && (!conversation.student_last_read_at || new Date(latestAdminMessage.created_at).getTime() > new Date(conversation.student_last_read_at).getTime());
      setUnread(hasUnread && !open);
      if (open && hasUnread) {
        const { error: readError } = await supabase.rpc("mark_admin_chat_read", { p_conversation_id: id });
        if (active && readError) setError(readError.message);
      }
    }
    void load();
    const timer = window.setInterval(() => void load(), 8000);
    return () => { active = false; window.clearInterval(timer); };
  }, [open, userId, isAdmin]);

  useEffect(() => { if (open) bottom.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, open]);

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || !userId || busy || content.length > 2000) return;
    setBusy(true); setError("");
    try {
      let id = conversationId;
      if (!id) {
        const { data, error } = await supabase.from("admin_chat_conversations")
          .upsert({ student_id: userId }, { onConflict: "student_id", ignoreDuplicates: true })
          .select("id").maybeSingle();
        if (error) throw error;
        if (data?.id) id = data.id;
        else {
          const result = await supabase.from("admin_chat_conversations")
            .select("id").eq("student_id", userId).single();
          if (result.error) throw result.error;
          id = result.data.id;
        }
        setConversationId(id);
      }
      const { data, error } = await supabase.from("admin_chat_messages")
        .insert({ conversation_id: id, sender_id: userId, content })
        .select("id,sender_id,content,created_at").single();
      if (error) throw error;
      setMessages(previous => [...previous, data as Message]);
      setDraft("");
    } catch (caught) { setError(caught instanceof Error ? caught.message : "Unable to send message."); }
    finally { setBusy(false); }
  }

  if (!userId || isAdmin) return null;
  return <div className="fixed bottom-4 right-4 z-[80] flex max-w-[calc(100vw-2rem)] flex-col items-end gap-2">
    {open && <section aria-label="Private admin chat" className="flex h-[min(480px,70vh)] w-[min(360px,calc(100vw-2rem))] flex-col overflow-hidden rounded-[24px] border border-[#E4DDED] bg-[#F4F4FA] text-[#15111C] shadow-[0_18px_45px_rgba(76,29,149,0.20)] dark:border-[rgba(171,132,255,0.25)] dark:bg-[#17101F] dark:text-white">
      <div className="flex items-center justify-between bg-gradient-to-r from-[#2A0F50] via-[#4C1D95] to-[#6D28D9] px-4 py-3 text-white">
        <div><h2 className="text-sm font-extrabold">Message the Admin</h2><p className="text-xs text-violet-100">Private conversation with PrepPath support</p></div>
        <button type="button" onClick={() => setOpen(false)} aria-label="Close chat" className="rounded-lg px-2 py-1 text-xl hover:bg-white/20">×</button>
      </div>
      <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
        {messages.length === 0 && <p className="text-sm text-[#6E6476] dark:text-[#C8BCD3]">Found a mistake or need help? Send the admin a message here.</p>}
        {messages.map(message => <div key={message.id} className={`flex ${message.sender_id === userId ? "justify-end" : "justify-start"}`}>
          <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.sender_id === userId ? "bg-[#6D28D9] text-white" : "border border-[#E4DDED] bg-white text-[#15111C] dark:border-violet-500/20 dark:bg-[#322244] dark:text-white"}`}>
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
            <p className="mt-1 text-[10px] opacity-70">{message.sender_id === userId ? "You" : "Admin"} · {new Date(message.created_at).toLocaleString()}</p>
          </div>
        </div>)}
        <div ref={bottom} />
      </div>
      {error && <p role="alert" className="px-4 text-xs text-red-600 dark:text-red-300">{error}</p>}
      <form onSubmit={send} className="flex gap-2 border-t border-[#E4DDED] bg-white p-3 dark:border-violet-500/20 dark:bg-[#21152D]">
        <input aria-label="Your message" value={draft} onChange={event => setDraft(event.target.value)} maxLength={2000} placeholder="Write a message..." className="min-w-0 flex-1 rounded-xl border border-[#E4DDED] bg-[#FAF8FE] px-3 py-2 text-sm text-[#15111C] outline-none focus:border-violet-500 dark:border-violet-500/30 dark:bg-[#17101F] dark:text-white" />
        <button type="submit" disabled={busy || !draft.trim()} className="rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] px-3 py-2 text-sm font-bold text-white disabled:opacity-50">{busy ? "..." : "Send"}</button>
      </form>
    </section>}
    <button type="button" onClick={() => setOpen(value => !value)} aria-expanded={open} className="relative rounded-full bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] px-5 py-3 text-sm font-extrabold text-white shadow-[0_8px_18px_rgba(124,58,237,0.25)] hover:brightness-110">
      {open ? "Close chat" : "✉ Message the Admin"}
      {unread && !open && <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full border-2 border-white bg-red-500 dark:border-[#09070F]" aria-label="New admin message" title="New admin message" />}
    </button>
  </div>;
}
