import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Conversation = { id: string; student_id: string; updated_at: string; admin_last_read_at: string | null };
type Message = { id: string; sender_id: string; content: string; created_at: string };

export default function AdminChatInbox() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [studentNames, setStudentNames] = useState<Record<string, string>>({});
  const [lastMessages, setLastMessages] = useState<Record<string, Message>>({});
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void supabase.auth.getUser().then(({ data }) => { if (active) setAdminId(data.user?.id ?? null); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadConversations() {
      const { data, error: fetchError } = await supabase.from("admin_chat_conversations")
        .select("id,student_id,updated_at,admin_last_read_at").order("updated_at", { ascending: false });
      if (!active) return;
      if (fetchError) { setError(fetchError.message); return; }
      const rows = (data ?? []) as Conversation[];
      setConversations(rows);
      if (!rows.length) { setLastMessages({}); return; }
      const { data: profiles, error: profileError } = await supabase
        .from("profiles")
        .select("id,name,display_name,email")
        .in("id", rows.map(row => row.student_id));

      if (active && !profileError && profiles) setStudentNames(Object.fromEntries(profiles.map(profile =>
        [profile.id, profile.name?.trim() || profile.email || "Student"])));
      // Get each conversation's latest message to identify unread student messages.
      const { data: latest, error: latestError } = await supabase.from("admin_chat_messages")
        .select("id,conversation_id,sender_id,content,created_at")
        .in("conversation_id", rows.map(row => row.id))
        .order("created_at", { ascending: false }).limit(1000);
      if (active && !latestError) {
        const map: Record<string, Message> = {};
        for (const message of latest ?? []) if (!map[message.conversation_id]) map[message.conversation_id] = message;
        setLastMessages(map);
      }
    }
    void loadConversations();
    const timer = window.setInterval(() => void loadConversations(), 8000);
    return () => { active = false; window.clearInterval(timer); };
  }, []);

  useEffect(() => {
    if (!selected) { setMessages([]); return; }
    let active = true;
    async function loadMessages() {
      const { data, error: fetchError } = await supabase.from("admin_chat_messages")
        .select("id,sender_id,content,created_at").eq("conversation_id", selected)
        .order("created_at", { ascending: true }).limit(500);
      if (!active) return;
      if (fetchError) { setError(fetchError.message); return; }
      const rows = (data ?? []) as Message[];
      setMessages(rows); setError("");
      const latestStudentMessage = [...rows].reverse().find(message => message.sender_id !== adminId);
      const current = conversations.find(conversation => conversation.id === selected);
      if (latestStudentMessage && (!current?.admin_last_read_at || new Date(latestStudentMessage.created_at).getTime() > new Date(current.admin_last_read_at).getTime())) {
        const { error: readError } = await supabase.rpc("mark_admin_chat_read", { p_conversation_id: selected });
        if (active && !readError) setConversations(previous => previous.map(conversation => conversation.id === selected ? { ...conversation, admin_last_read_at: new Date().toISOString() } : conversation));
      }
    }
    void loadMessages();
    const timer = window.setInterval(() => void loadMessages(), 8000);
    return () => { active = false; window.clearInterval(timer); };
  }, [selected, adminId]);

  async function send(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = draft.trim();
    if (!selected || !adminId || !content || sending || content.length > 2000) return;
    setSending(true); setError("");
    const { data, error: sendError } = await supabase.from("admin_chat_messages")
      .insert({ conversation_id: selected, sender_id: adminId, content })
      .select("id,sender_id,content,created_at").single();
    if (sendError) setError(sendError.message);
    else { setMessages(previous => [...previous, data as Message]); setDraft(""); }
    setSending(false);
  }

  return (
    <section className="mb-9">
      <h2 className="mb-2 text-2xl font-extrabold">Student Messages</h2>
      <p className="mb-4 text-sm text-[#6E6476] dark:text-[#C8BCD3]">Private conversations with students. New messages appear automatically.</p>
      <div className="grid min-h-[380px] overflow-hidden rounded-[26px] border border-[#E4DDED] bg-white dark:border-violet-500/20 dark:bg-[#17101F] md:grid-cols-[minmax(190px,1fr)_minmax(0,2fr)]">
        <div className="max-h-[460px] overflow-y-auto border-b border-[#E4DDED] dark:border-violet-500/20 md:border-b-0 md:border-r">
          {conversations.length === 0 && <p className="p-4 text-sm text-[#6E6476] dark:text-[#C8BCD3]">No student messages yet.</p>}
          {conversations.map(conversation => {
            const last = lastMessages[conversation.id];
            const unread = !!last && last.sender_id === conversation.student_id && (!conversation.admin_last_read_at || new Date(last.created_at).getTime() > new Date(conversation.admin_last_read_at).getTime());
            return <button key={conversation.id} type="button" onClick={() => { setSelected(conversation.id); setError(""); }}
              className={`block w-full border-b border-[#E4DDED] p-4 text-left text-sm dark:border-violet-500/20 ${selected === conversation.id ? "bg-violet-100 dark:bg-[#322244]" : "hover:bg-violet-50 dark:hover:bg-[#21152D]"}`}>
              <span className="flex items-center justify-between gap-2"><span className="break-words font-bold">{studentNames[conversation.student_id] ?? "Student"}</span>{unread && <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-violet-600" title="New student message" aria-label="New student message" />}</span>
              <span className="mt-1 block truncate text-xs opacity-70">{last?.content ?? "No messages yet"}</span>
              <span className="mt-1 block text-xs opacity-70">Updated {new Date(conversation.updated_at).toLocaleString()}</span>
            </button>;
          })}
        </div>
        <div className="flex min-h-[380px] flex-col">
          {!selected ? <p className="m-auto p-4 text-sm text-[#6E6476] dark:text-[#C8BCD3]">Select a student conversation.</p> : <>
            <div className="flex-1 space-y-3 overflow-y-auto p-4 md:max-h-[380px]">
              {messages.map(message => <div key={message.id} className={`flex ${message.sender_id === adminId ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.sender_id === adminId ? "bg-violet-600 text-white" : "bg-violet-100 text-slate-900 dark:bg-[#322244] dark:text-white"}`}>
                  <p className="whitespace-pre-wrap break-words">{message.content}</p>
                  <p className="mt-1 text-[10px] opacity-70">{message.sender_id === adminId ? "You" : "Student"} · {new Date(message.created_at).toLocaleString()}</p>
                </div>
              </div>)}
            </div>
            <form onSubmit={send} className="flex gap-2 border-t border-[#E4DDED] p-3 dark:border-violet-500/20">
              <input aria-label="Reply to student" value={draft} onChange={event => setDraft(event.target.value)} maxLength={2000} placeholder="Write a reply..." className="min-w-0 flex-1 rounded-xl border border-violet-200 bg-white px-3 py-2 text-sm text-slate-900 dark:border-violet-700 dark:bg-[#21152D] dark:text-white" />
              <button type="submit" disabled={sending || !draft.trim()} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{sending ? "..." : "Send"}</button>
            </form>
          </>}
          {error && <p role="alert" className="p-3 text-sm text-red-600 dark:text-red-300">{error}</p>}
        </div>
      </div>
    </section>
  );
}
