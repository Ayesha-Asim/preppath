import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import MainLayout from "../components/MainLayout";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/supabase";

type ReportReason = "spam" | "inappropriate_content" | "misleading_information" | "personal_information" | "copyright" | "other";
type ReportTarget = { resourceId: string; commentId: string | null; label: string };
const reportReasons: { value: ReportReason; label: string }[] = [
  { value: "spam", label: "Spam" },
  { value: "inappropriate_content", label: "Inappropriate content" },
  { value: "misleading_information", label: "Misleading information" },
  { value: "personal_information", label: "Personal information" },
  { value: "copyright", label: "Copyright concern" },
  { value: "other", label: "Other" },
];
type ResourceType = "pdf" | "image" | "drive" | "youtube";
type Status = "pending" | "approved" | "rejected";
type Comment = { id: string; resource_id: string; user_id: string; content: string; created_at: string; parent_comment_id: string | null };
type Resource = {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  subject: string;
  resource_type: ResourceType;
  resource_url: string;
  status: Status;
  created_at: string;
};

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"];
const subjects = ["Mathematics", "Physics", "Computer Science", "English", "General", "Other"];

function validLink(value: string, type: ResourceType): boolean {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return false;
    const host = url.hostname.toLowerCase();
    if (type === "drive") return host === "drive.google.com" || host === "docs.google.com";
    if (type === "youtube") return host === "youtube.com" || host === "www.youtube.com" || host === "m.youtube.com" || host === "youtu.be";
    return false;
  } catch {
    return false;
  }
}

function youtubeEmbedUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    const host = url.hostname.toLowerCase();
    let id = "";
    if (host === "youtu.be") id = url.pathname.split("/")[1] ?? "";
    else if (["youtube.com", "www.youtube.com", "m.youtube.com"].includes(host)) {
      if (url.pathname === "/watch") id = url.searchParams.get("v") ?? "";
      else if (/^\/(shorts|embed|live)\//.test(url.pathname)) id = url.pathname.split("/")[2] ?? "";
    }
    return /^[a-zA-Z0-9_-]{11}$/.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  } catch { return null; }
}

function ResourcePreview({ resource, expanded = false, onOpen }: {
  resource: Resource;
  expanded?: boolean;
  onOpen?: () => void;
}) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState("");
  const [previewLoading, setPreviewLoading] = useState(false);
  const isFile = resource.resource_type === "pdf" || resource.resource_type === "image";

  useEffect(() => {
    if (!isFile || resource.status !== "approved") return;
    let active = true;
    let objectUrl: string | null = null;
    setPreviewLoading(true);
    setPreviewError("");
    setFileUrl(null);
    void (async () => {
      const { data, error } = await supabase.storage.from("study-resources").download(resource.resource_url);
      if (!active) return;
      if (error || !data) setPreviewError("Preview unavailable. Try opening the resource.");
      else {
        const mime = resource.resource_type === "pdf" ? "application/pdf" : data.type || (resource.resource_url.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg");
        objectUrl = URL.createObjectURL(new Blob([data], { type: mime }));
        setFileUrl(objectUrl);
      }
      setPreviewLoading(false);
    })();
    return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl); };
  }, [resource.id, resource.resource_url, resource.resource_type, resource.status, isFile]);

  const frameClass = "mt-4 overflow-hidden rounded-2xl border border-[#E4DDED] bg-[#FAF8FE] dark:border-violet-400/20 dark:bg-[#21152D]";
  if (resource.resource_type === "youtube") {
    const embed = youtubeEmbedUrl(resource.resource_url);
    return <div className={frameClass}>
      {embed ? <iframe title={`Video preview: ${resource.title}`} src={embed} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" className="aspect-video w-full" />
        : <p className="p-4 text-sm">Video preview unavailable. Use Open resource to watch on YouTube.</p>}
    </div>;
  }
  if (resource.resource_type === "drive") {
    return <div className={`${frameClass} p-4`}>
      <p className="text-sm font-bold">Google Drive document</p>
      <p className="mt-1 text-sm opacity-75">This file is hosted on Google Drive. Open it to see the preview and its sharing permissions.</p>
      <button type="button" onClick={onOpen} className="mt-3 rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white">Open in Google Drive ↗</button>
    </div>;
  }
  return <div className={frameClass}>
    {previewLoading && <p className="p-4 text-sm opacity-75">Loading file preview...</p>}
    {previewError && <p role="status" className="p-4 text-sm opacity-75">{previewError}</p>}
    {fileUrl && resource.resource_type === "image" && <button type="button" onClick={onOpen} className="block w-full" aria-label={`Open image: ${resource.title}`}><img src={fileUrl} alt={`Preview of ${resource.title}`} loading="lazy" className={`mx-auto w-full object-contain ${expanded ? "max-h-[75vh]" : "max-h-80"}`} /></button>}
    {fileUrl && resource.resource_type === "pdf" && <div>
      <iframe src={`${fileUrl}#toolbar=0&navpanes=0`} title={`PDF preview: ${resource.title}`} className={`w-full ${expanded ? "h-[70vh] min-h-[360px]" : "h-64"}`} />
      <p className="px-4 py-2 text-xs opacity-75">PDF preview · Use Download resource for a separate copy.</p>
    </div>}
  </div>;
}

export default function StudyResources() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const palette = {
    page: isDark ? "#09070F" : "#F4F4FA",
    card: isDark ? "#17101F" : "#FFFFFF",
    cardAlt: isDark ? "#21152D" : "#FAF8FE",
    text: isDark ? "#FFFFFF" : "#15111C",
    muted: isDark ? "#C8BCD3" : "#6E6476",
    border: isDark ? "rgba(171,132,255,.17)" : "#E4DDED",
    purple: "#7C3AED",
    purpleText: isDark ? "#A78BFA" : "#6D28D9",
    purpleSoft: isDark ? "rgba(124,58,237,.16)" : "#F0E9FF",
  };
  const [activeTab, setActiveTab] = useState<"mine" | "community">("mine");
  const [community, setCommunity] = useState<Resource[]>([]);
  const [liked, setLiked] = useState<Resource[]>([]);
  const [likedLoading, setLikedLoading] = useState(false);
  const [likedError, setLikedError] = useState("");
  const [likes, setLikes] = useState<{resource_id:string;user_id:string}[]>([]);
  const [names, setNames] = useState<Record<string,string>>({});
  const [selected, setSelected] = useState<Resource | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState("");
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [postError, setPostError] = useState("");
  const [postLoading, setPostLoading] = useState(false);
  const [posting, setPosting] = useState(false);
  const [busyLike, setBusyLike] = useState<string | null>(null);
  const [myId, setMyId] = useState<string | null>(null);
  const [communityLoading, setCommunityLoading] = useState(false);
  const [communityError, setCommunityError] = useState("");
  const [type, setType] = useState<ResourceType>("pdf");
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState<Resource[]>([]);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [reportTarget, setReportTarget] = useState<ReportTarget | null>(null);
  const [reportReason, setReportReason] = useState<ReportReason>("spam");
  const [reportDetails, setReportDetails] = useState("");
  const [reportError, setReportError] = useState("");
  const [reportNotice, setReportNotice] = useState("");
  const [reportSubmitting, setReportSubmitting] = useState(false);

  async function loadMine() {
    setLoading(true);
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) {
      setError("Please sign in again to view your submissions.");
      setLoading(false);
      return;
    }
    setMyId(auth.user.id);
    const { data, error: loadError } = await supabase
      .from("study_resources")
      .select("id,title,description,subject,resource_type,resource_url,status,created_at")
      .eq("user_id", auth.user.id)
      .order("created_at", { ascending: false });
    if (loadError) setError(loadError.message);
    else setResources((data ?? []) as Resource[]);
    setLoading(false);
  }

  async function loadCommunity() {
    setCommunityLoading(true);
    setCommunityError("");
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) {
      setCommunityError("Please sign in again to view community resources.");
      setCommunityLoading(false);
      return;
    }
    const { data, error: loadError } = await supabase
      .from("study_resources")
      .select("id,user_id,title,description,subject,resource_type,resource_url,status,created_at")
      .eq("status", "approved")
      .order("created_at", { ascending: false });
    if (loadError) setCommunityError(loadError.message);
    else {
      const approved = (data ?? []) as Resource[];
      setCommunity(approved);
      await loadSocial();
    }
    setCommunityLoading(false);
  }

  async function loadSocial() {
    const [likesResult, namesResult] = await Promise.all([
      supabase.from("study_resource_likes").select("resource_id,user_id"),
      supabase.rpc("get_study_resource_display_names"),
    ]);
    if (likesResult.error) setCommunityError(likesResult.error.message);
    else setLikes((likesResult.data ?? []) as {resource_id:string;user_id:string}[]);
    if (namesResult.error) setCommunityError(namesResult.error.message);
    else setNames(Object.fromEntries(((namesResult.data ?? []) as {user_id:string;display_name:string}[]).map(n => [n.user_id,n.display_name])));
  }

  async function loadLiked() {
    setLikedLoading(true);
    setLikedError("");
    const { data: auth, error: authError } = await supabase.auth.getUser();
    if (authError || !auth.user) { setLikedError("Please sign in again."); setLikedLoading(false); return; }
    setMyId(auth.user.id);
    const { data: myLikes, error: likeError } = await supabase.from("study_resource_likes")
      .select("resource_id").eq("user_id", auth.user.id);
    if (likeError) { setLikedError(likeError.message); setLikedLoading(false); return; }
    const ids = (myLikes ?? []).map(x => x.resource_id);
    if (!ids.length) { setLiked([]); setLikedLoading(false); return; }
    const { data, error: resourceError } = await supabase.from("study_resources")
      .select("id,user_id,title,description,subject,resource_type,resource_url,status,created_at")
      .eq("status","approved").in("id",ids).order("created_at",{ascending:false});
    if (resourceError) setLikedError(resourceError.message);
    else { const posts = (data ?? []) as Resource[]; setLiked(posts); await loadSocial(); }
    setLikedLoading(false);
  }

  async function toggleLike(resource: Resource) {
    if (!myId || busyLike) return;
    setBusyLike(resource.id);
    setPostError("");
    const alreadyLiked = likes.some(l => l.resource_id === resource.id && l.user_id === myId);
    const result = alreadyLiked
      ? await supabase.from("study_resource_likes").delete().eq("resource_id",resource.id).eq("user_id",myId)
      : await supabase.from("study_resource_likes").insert({resource_id:resource.id,user_id:myId});
    if (result.error) setPostError(result.error.message);
    else {
      setLikes(old => alreadyLiked ? old.filter(l => !(l.resource_id === resource.id && l.user_id === myId)) : [...old,{resource_id:resource.id,user_id:myId}]);
      if (activeTab === "mine") void loadLiked();
    }
    setBusyLike(null);
  }

  async function openPost(resource: Resource) {
    if (resource.status !== "approved") return;
    setSelected(resource);
    setPostError("");
    setCommentText("");
    setReplyTo(null);
    setPostLoading(true);
    const { data, error: commentsError } = await supabase.from("study_resource_comments")
      .select("id,resource_id,user_id,content,created_at,parent_comment_id")
      .eq("resource_id",resource.id).order("created_at",{ascending:true});
    if (commentsError) setPostError(commentsError.message);
    else setComments((data ?? []) as Comment[]);
    setPostLoading(false);
  }

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !myId || posting) return;
    const content = commentText.trim();
    if (!content || content.length > 1000) return;
    setPosting(true);
    setPostError("");
    const {error: insertError} = await supabase.from("study_resource_comments")
      .insert({resource_id:selected.id,user_id:myId,content,parent_comment_id:replyTo?.id ?? null});
    if (insertError) setPostError(insertError.message);
    else { setCommentText(""); setReplyTo(null); await openPost(selected); }
    setPosting(false);
  }

  async function deleteComment(comment: Comment) {
    if (!selected || comment.user_id !== myId) return;
    const {error: deleteError} = await supabase.from("study_resource_comments")
      .delete().eq("id",comment.id).eq("user_id",myId);
    if (deleteError) setPostError(deleteError.message);
    else setComments(old => old.filter(c => c.id !== comment.id && c.parent_comment_id !== comment.id));
  }

  function startReport(resource: Resource, comment?: Comment) {
    setReportTarget({ resourceId: resource.id, commentId: comment?.id ?? null, label: comment ? "comment or reply" : "resource" });
    setReportReason("spam");
    setReportDetails("");
    setReportError("");
    setReportNotice("");
  }

  async function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!reportTarget || reportSubmitting) return;
    setReportSubmitting(true);
    setReportError("");
    const target = reportTarget;
    try {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (authError || !auth.user) throw new Error("Please sign in again to report content.");
      const { error: insertError } = await supabase.from("study_resource_reports").insert({
        reporter_id: auth.user.id,
        resource_id: target.resourceId,
        comment_id: target.commentId,
        target_type: target.commentId ? "comment" : "resource",
        reason: reportReason,
        details: reportDetails.trim() || null,
      });
      if (insertError) {
        if (insertError.code === "23505") throw new Error("You have already submitted a pending report for this content.");
        throw insertError;
      }
      setReportTarget(null);
      setReportNotice("Report submitted for admin review. The content remains visible while it is reviewed.");
    } catch (caught) {
      setReportError(caught instanceof Error ? caught.message : "Could not submit your report. Please try again.");
    } finally {
      setReportSubmitting(false);
    }
  }

  function avatar(userId: string) {
    const name = names[userId] || "Student";
    return <span aria-hidden="true" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 font-extrabold text-white">{name.trim().charAt(0).toUpperCase() || "S"}</span>;
  }

  function commentThread(comment: Comment, depth = 0): ReactNode {
    const children = comments.filter(c => c.parent_comment_id === comment.id);
    return <div key={comment.id} className={`${depth ? "ml-3 border-l-2 border-violet-300 pl-3 dark:border-violet-700 sm:ml-6 sm:pl-4" : ""} mt-3`}>
      <div className="rounded-xl p-3" style={{ background: palette.cardAlt }}>
        <div className="flex items-center gap-2">{avatar(comment.user_id)}<div className="min-w-0"><p className="flex flex-wrap items-center gap-1 break-words text-sm font-extrabold">{names[comment.user_id] || "Student"}{selected?.user_id === comment.user_id && <span className="ml-2 text-xs font-normal text-violet-600 dark:text-violet-300">Post author</span>}</p><p className={`text-xs ${mutedClass}`}>{new Date(comment.created_at).toLocaleString()}</p></div></div>
        <p className="mt-2 whitespace-pre-wrap break-words text-sm">{comment.content}</p>
        <div className="mt-2 flex gap-4"><button type="button" onClick={() => {setReplyTo(comment); setCommentText("");}} className="text-xs font-bold text-violet-600 dark:text-violet-300">Reply</button>{comment.user_id === myId && <button type="button" onClick={() => void deleteComment(comment)} className="text-xs font-bold text-red-600 dark:text-red-300">Delete</button>}<button type="button" onClick={() => selected && startReport(selected, comment)} className="text-xs font-bold text-red-600 dark:text-red-300">Report</button></div>
      </div>
      {children.map(child => commentThread(child, depth + 1))}
    </div>;
  }

  function postCard(resource: Resource) {
    const count = likes.filter(l => l.resource_id === resource.id).length;
    const isLiked = likes.some(l => l.resource_id === resource.id && l.user_id === myId);
    return <article key={resource.id} className="rounded-[22px] border p-5 shadow-sm transition hover:border-violet-400" style={{ background: palette.card, borderColor: palette.border }}>
      <button type="button" onClick={() => void openPost(resource)} className="w-full text-left">
        <div className="flex items-center gap-3">{avatar(resource.user_id)}<p className="flex flex-wrap items-center gap-1 text-sm font-bold text-violet-600 dark:text-violet-300">{names[resource.user_id] || "Student"}</p></div>
        <p className={`mt-1 text-xs ${mutedClass}`}>{resource.subject} · {resource.resource_type.toUpperCase()} · {new Date(resource.created_at).toLocaleDateString()}</p>
        <h3 className="mt-3 break-words text-xl font-extrabold">{resource.title}</h3>
        {resource.description && <p className={`mt-2 whitespace-pre-wrap break-words ${mutedClass}`}>{resource.description.length > 240 ? resource.description.slice(0,240) + "…" : resource.description}</p>}
        <p className="mt-3 text-sm font-semibold text-violet-600 dark:text-violet-300">Open post and comments →</p>
      </button>
      <ResourcePreview resource={resource} onOpen={() => void openResource(resource)} />
      <div className="mt-4 flex flex-wrap items-center gap-3 border-t border-[#E4DDED] pt-3 dark:border-violet-400/20">
        <button type="button" disabled={busyLike !== null} onClick={() => void toggleLike(resource)} aria-pressed={isLiked} className={`rounded-xl px-3 py-2 text-sm font-bold ${isLiked ? "bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-300" : "bg-violet-50 text-violet-700 dark:bg-[#21152D] dark:text-violet-300"}`}>{isLiked ? "♥ Liked" : "♡ Like"} · {count}</button>
        <button type="button" onClick={() => void openPost(resource)} className="rounded-xl px-3 py-2 text-sm font-bold text-violet-600 dark:text-violet-300">💬 Comments</button>
        <button type="button" onClick={() => void openResource(resource)} className="rounded-xl px-3 py-2 text-sm font-bold text-violet-600 dark:text-violet-300">{resource.resource_type === "pdf" || resource.resource_type === "image" ? "Download resource" : "Open resource"}</button>
        <button type="button" onClick={() => startReport(resource)} className="rounded-xl px-3 py-2 text-sm font-bold text-red-600 dark:text-red-300">Report</button>
      </div>
    </article>;
  }

  useEffect(() => { void loadMine(); void loadLiked(); }, []);
  useEffect(() => {
    if (activeTab === "community") void loadCommunity();
    if (activeTab === "mine") void loadLiked();
  }, [activeTab]);

  function switchType(next: ResourceType) {
    setType(next);
    setFile(null);
    setLink("");
    setError("");
    setNotice("");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;
    setError("");
    setNotice("");
    const cleanTitle = title.trim();
    const cleanDescription = description.trim();
    if (!cleanTitle || cleanTitle.length > 150 || !subject || cleanDescription.length > 1000) {
      setError("Enter a title (up to 150 characters), subject, and a description of up to 1,000 characters.");
      return;
    }
    const uploading = type === "pdf" || type === "image";
    if (uploading) {
      if (!file || file.size > MAX_FILE_SIZE || !FILE_TYPES.includes(file.type) ||
        (type === "pdf" && file.type !== "application/pdf") ||
        (type === "image" && !["image/jpeg", "image/png"].includes(file.type))) {
        setError("Choose a valid PDF, JPG, or PNG matching the selected type (maximum 10 MB).");
        return;
      }
    } else if (!validLink(link.trim(), type)) {
      setError(type === "drive" ? "Enter a valid HTTPS Google Drive or Google Docs link." : "Enter a valid HTTPS YouTube link.");
      return;
    }

    setSubmitting(true);
    let uploadedPath: string | null = null;
    try {
      const { data: auth, error: authError } = await supabase.auth.getUser();
      if (authError || !auth.user) throw new Error("Please sign in again.");
      let resourceUrl = link.trim();
      if (uploading && file) {
        const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : "jpg";
        uploadedPath = `${auth.user.id}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("study-resources")
          .upload(uploadedPath, file, { contentType: file.type, upsert: false });
        if (uploadError) throw uploadError;
        resourceUrl = uploadedPath;
      }
      const { error: insertError } = await supabase.from("study_resources").insert({
        user_id: auth.user.id,
        title: cleanTitle,
        description: cleanDescription || null,
        subject,
        resource_type: type,
        resource_url: resourceUrl,
        status: "pending",
      });
      if (insertError) throw insertError;
      setTitle("");
      setDescription("");
      setSubject("");
      setLink("");
      setFile(null);
      const fileInput = document.getElementById("study-resource-file") as HTMLInputElement | null;
      if (fileInput) fileInput.value = "";
      setNotice("Resource submitted. It will be visible to other students after admin approval.");
      await loadMine();
    } catch (caught) {
      // An uploaded file may remain private if saving its database record fails.
      // Do not expose or delete it through an unapproved client-side permission.
      console.error("Resource submission failed:", caught, uploadedPath);
      setError(caught instanceof Error ? caught.message : "Could not submit this resource. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function openResource(resource: Resource) {
    setError("");
    setCommunityError("");
    if (resource.resource_type === "drive" || resource.resource_type === "youtube") {
      if (!validLink(resource.resource_url, resource.resource_type)) {
        if (selected) setPostError("This resource has an invalid link.");
        else if (activeTab === "community") setCommunityError("This resource has an invalid link.");
        else setError("This resource has an invalid link.");
        return;
      }
      window.open(resource.resource_url, "_blank", "noopener,noreferrer");
      return;
    }
    const { data, error: downloadError } = await supabase.storage
      .from("study-resources")
      .download(resource.resource_url);
    if (downloadError || !data) {
      if (selected) setPostError(downloadError?.message ?? "Unable to open this file.");
      else if (activeTab === "community") setCommunityError(downloadError?.message ?? "Unable to open this file.");
      else setError(downloadError?.message ?? "Unable to open this file.");
      return;
    }
    const objectUrl = URL.createObjectURL(data);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = `${resource.title.replace(/[^a-z0-9 _-]/gi, "").slice(0, 80) || "study-resource"}.${resource.resource_type === "pdf" ? "pdf" : data.type === "image/png" ? "png" : "jpg"}`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000);
  }

  const inputClass = "w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-violet-500";
  const mutedClass = "text-sm";

  return (
    <MainLayout>
      <main className="preppath-resources min-h-screen px-5 py-8 md:px-8 lg:px-10" style={{ background: palette.page, color: palette.text, ["--resource-card" as string]: palette.card, ["--resource-alt" as string]: palette.cardAlt, ["--resource-border" as string]: palette.border, ["--resource-muted" as string]: palette.muted, ["--resource-purple" as string]: palette.purpleText, ["--resource-soft" as string]: palette.purpleSoft, ["--resource-text" as string]: palette.text }}>
        <div className="mx-auto max-w-[1220px]">
          <header className="mb-7 rounded-[26px] border p-6 sm:p-8" style={{ background: isDark ? "linear-gradient(135deg,#171126 0%,#241647 58%,#182138 100%)" : "linear-gradient(135deg,#F3EEFF 0%,#ECE5FF 56%,#EBF4FF 100%)", borderColor: isDark ? "rgba(139,109,246,.23)" : "#E4DBFF" }}>
          <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: palette.purpleText }}>Community resources</p>
          <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">Share Study Resources</h1>
          <p className={`mt-2 ${mutedClass}`}>Share useful notes, images, Google Drive documents, and YouTube lessons. Every submission is reviewed before it appears in the student library.</p>
          </header>

          <div role="tablist" aria-label="Study resources sections" className="mt-7 flex flex-wrap gap-2 rounded-2xl border border-[#E4DDED] bg-white p-2 dark:border-violet-400/20 dark:bg-[#17101F]">
            <button type="button" role="tab" aria-selected={activeTab === "mine"} onClick={() => setActiveTab("mine")} className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition ${activeTab === "mine" ? "bg-violet-600 text-white" : "text-[#4C1D95] hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-[#21152D]"}`}>My Resources</button>
            <button type="button" role="tab" aria-selected={activeTab === "community"} onClick={() => setActiveTab("community")} className={`flex-1 rounded-xl px-4 py-3 text-sm font-extrabold transition ${activeTab === "community" ? "bg-violet-600 text-white" : "text-[#4C1D95] hover:bg-violet-50 dark:text-violet-300 dark:hover:bg-[#21152D]"}`}>Community Resources</button>
          </div>

                     {postError && !selected && <p role="alert" className="mt-4 text-sm text-red-600">{postError}</p>}
           {reportNotice && <p role="status" className="mt-4 rounded-xl bg-green-50 p-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">{reportNotice}</p>}
          {activeTab === "mine" ? <>
          <section className="mt-7 rounded-[26px] border border-[#E4DDED] bg-white p-5 shadow-sm dark:border-violet-400/20 dark:bg-[#17101F] md:p-7">
            <h2 className="mb-4 text-xl font-extrabold">Submit a resource</h2>
            <div className="mb-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {([
  ["pdf", "PDF"],
  ["image", "Image"],
  ["drive", "Google Drive"],
  ["youtube", "YouTube"],
] as const).map(([value, label]) => (
                <button key={value} type="button" onClick={() => switchType(value)} className={`rounded-xl border px-3 py-3 text-sm font-bold transition ${type === value ? "border-violet-600 bg-violet-600 text-white" : "border-[#E4DDED] bg-[#FAF8FE] text-[#4C1D95] dark:border-violet-400/20 dark:bg-[#21152D] dark:text-[#C4B5FD]"}`}>{label}</button>
              ))}
            </div>
            <form onSubmit={submit} className="space-y-4">
              <label className="block space-y-1.5"><span className="text-sm font-bold">Title *</span><input className={inputClass} value={title} onChange={e => setTitle(e.target.value)} maxLength={150} required placeholder="e.g. Physics chapter 3 revision notes" /></label>
              <label className="block space-y-1.5"><span className="text-sm font-bold">Subject *</span><select className={inputClass} value={subject} onChange={e => setSubject(e.target.value)} required><option value="">Select a subject</option>{subjects.map(item => <option key={item} value={item}>{item}</option>)}</select></label>
              <label className="block space-y-1.5"><span className="text-sm font-bold">Description (optional)</span><textarea className={inputClass} value={description} onChange={e => setDescription(e.target.value)} maxLength={1000} rows={3} placeholder="What will students learn from this resource?" /></label>
              {type === "pdf" || type === "image" ? (
                <label className="block space-y-1.5"><span className="text-sm font-bold">{type === "pdf" ? "Upload PDF *" : "Upload JPG or PNG *"}</span><input id="study-resource-file" className={inputClass} type="file" accept={type === "pdf" ? ".pdf,application/pdf" : ".jpg,.jpeg,.png,image/jpeg,image/png"} required onChange={e => setFile(e.target.files?.[0] ?? null)} /><span className={`block text-xs ${mutedClass}`}>Maximum file size: 10 MB. Do not upload personal information or copyrighted materials without permission.</span></label>
              ) : (
                <label className="block space-y-1.5"><span className="text-sm font-bold">{type === "drive" ? "Google Drive link *" : "YouTube link *"}</span><input className={inputClass} type="url" value={link} onChange={e => setLink(e.target.value)} required placeholder={type === "drive" ? "https://drive.google.com/..." : "https://www.youtube.com/watch?v=..."} /><span className={`block text-xs ${mutedClass}`}>{type === "drive" ? "Set the Drive file's sharing permission so intended viewers can open it. Avoid sharing private documents." : "Use a link to a video you have permission to share."}</span></label>
              )}
              {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{error}</p>}
              {notice && <p role="status" className="rounded-xl bg-green-50 p-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">{notice}</p>}
              <button type="submit" disabled={submitting} className="min-h-11 rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#4C1D95] px-6 py-3 text-sm font-extrabold text-white disabled:cursor-not-allowed disabled:opacity-50">{submitting ? "Submitting..." : "Submit for review"}</button>
            </form>
          </section>

          <section className="mt-8 rounded-[26px] border border-[#E4DDED] bg-white p-5 dark:border-violet-400/20 dark:bg-[#17101F] md:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-xl font-extrabold">My submissions</h2><button type="button" onClick={() => void loadMine()} disabled={loading} className="rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-bold text-violet-600 dark:text-violet-300">Refresh</button></div>
            {loading ? <p className={mutedClass}>Loading your submissions...</p> : resources.length === 0 ? <p className={mutedClass}>You have not submitted any resources yet.</p> : (
              <div className="space-y-3">{resources.map(resource => (
                <article key={resource.id} className="rounded-2xl border border-[#E4DDED] p-4 dark:border-violet-400/20">
                  <div className="flex flex-wrap items-start justify-between gap-2"><h3 className="font-extrabold break-words">{resource.title}</h3><span className={`rounded-full px-3 py-1 text-xs font-bold ${resource.status === "approved" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-300" : resource.status === "rejected" ? "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-300" : "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"}`}>{resource.status}</span></div>
                  <p className={`mt-1 text-xs ${mutedClass}`}>{resource.subject} · {resource.resource_type.toUpperCase()} · {new Date(resource.created_at).toLocaleDateString()}</p>
                  {resource.description && <p className={`mt-2 whitespace-pre-wrap break-words ${mutedClass}`}>{resource.description}</p>}
                  <button type="button" onClick={() => void openResource(resource)} className="mt-3 rounded-xl border border-violet-400/30 px-3 py-2 text-sm font-bold text-violet-600 dark:text-violet-300">{resource.resource_type === "pdf" || resource.resource_type === "image" ? "Download my file" : "Open link"}</button>
                </article>
              ))}</div>
            )}
          </section>
          <section className="mt-8 rounded-[26px] border border-[#E4DDED] bg-white p-5 dark:border-violet-400/20 dark:bg-[#17101F] md:p-7">
            <div className="mb-4 flex items-center justify-between gap-3"><h2 className="text-xl font-extrabold">Liked Resources</h2><button type="button" onClick={() => void loadLiked()} className="text-sm font-bold text-violet-600 dark:text-violet-300">Refresh</button></div>
            {likedError && <p role="alert" className="text-sm text-red-600">{likedError}</p>}
            {likedLoading ? <p className={mutedClass}>Loading liked resources...</p> : liked.length ? <div className="space-y-3">{liked.map(postCard)}</div> : <p className={mutedClass}>Resources you like will appear here.</p>}
          </section>
          </> : (
            <section className="mt-7 rounded-[26px] border border-[#E4DDED] bg-white p-5 shadow-sm dark:border-violet-400/20 dark:bg-[#17101F] md:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-extrabold">Community Resources</h2>
                  <p className={`mt-1 ${mutedClass}`}>All approved study materials, including your own submissions.</p>
                </div>
                <button type="button" onClick={() => void loadCommunity()} disabled={communityLoading} className="rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-bold text-violet-600 disabled:opacity-50 dark:text-violet-300">Refresh</button>
              </div>
              {communityError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{communityError}</p>}
              {communityLoading ? <p className={mutedClass}>Loading community resources...</p> : community.length === 0 ? <p className={mutedClass}>No approved resources yet.</p> : (
                <div className="space-y-3">
                  {community.filter(resource => resource.status === "approved").map(postCard)}
                </div>
              )}
            </section>
          )}

                     {selected && <div className="preppath-resources fixed inset-0 z-50 overflow-y-auto" style={{ background: palette.page, color: palette.text, ["--resource-card" as string]: palette.card, ["--resource-alt" as string]: palette.cardAlt, ["--resource-border" as string]: palette.border, ["--resource-muted" as string]: palette.muted, ["--resource-purple" as string]: palette.purpleText, ["--resource-soft" as string]: palette.purpleSoft, ["--resource-text" as string]: palette.text }} role="dialog" aria-modal="true" aria-label="Resource post">
             <div className="mx-auto max-w-3xl px-4 py-6 pb-16 sm:px-6">
               <button type="button" onClick={() => {setSelected(null); setReplyTo(null);}} className="mb-5 rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-bold text-violet-600 dark:text-violet-300">← Back to resources</button>
               <article className="rounded-[22px] border p-5 shadow-sm sm:p-7" style={{ background: palette.card, borderColor: palette.border }}>
                 <div className="flex items-center gap-3">{avatar(selected.user_id)}<div><p className="flex flex-wrap items-center gap-1 font-extrabold text-violet-600 dark:text-violet-300">{names[selected.user_id] || "Student"}</p><p className={`text-xs ${mutedClass}`}>{selected.subject} · {selected.resource_type.toUpperCase()} · {new Date(selected.created_at).toLocaleDateString()}</p></div></div>
                 <h2 className="mt-5 break-words text-2xl font-extrabold sm:text-3xl">{selected.title}</h2>
                 {selected.description && <p className={`mt-4 whitespace-pre-wrap break-words ${mutedClass}`}>{selected.description}</p>}
                 <ResourcePreview resource={selected} expanded onOpen={() => void openResource(selected)} />
                 <div className="mt-5 flex flex-wrap gap-2"><button type="button" onClick={() => void openResource(selected)} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white">{selected.resource_type === "pdf" || selected.resource_type === "image" ? "Download resource" : "Open resource"}</button><button type="button" disabled={busyLike !== null} onClick={() => void toggleLike(selected)} className="rounded-xl border border-violet-400/30 px-4 py-2 text-sm font-bold text-violet-600 dark:text-violet-300">{likes.some(l => l.resource_id === selected.id && l.user_id === myId) ? "♥ Liked" : "♡ Like"} · {likes.filter(l => l.resource_id === selected.id).length}</button></div>
                                   <button type="button" onClick={() => startReport(selected)} className="mt-3 rounded-xl border border-red-300/40 px-4 py-2 text-sm font-bold text-red-600 dark:text-red-300">Report resource</button>
                  <div className="mt-7 border-t border-[#E4DDED] pt-6 dark:border-violet-400/20"><h3 className="text-xl font-extrabold">Comments · {comments.length}</h3>
                                       {reportNotice && <p role="status" className="mt-3 rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">{reportNotice}</p>}
                    {postError && <p role="alert" className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{postError}</p>}
                   {postLoading ? <p className={`mt-3 ${mutedClass}`}>Loading comments...</p> : comments.length ? <div className="mt-3">{comments.filter(c => !c.parent_comment_id || !comments.some(parent => parent.id === c.parent_comment_id)).map(c => commentThread(c))}</div> : <p className={`mt-3 ${mutedClass}`}>No comments yet. Start the discussion.</p>}
                   <form onSubmit={addComment} className="mt-6 space-y-2 border-t border-[#E4DDED] pt-5 dark:border-violet-400/20">
                     {replyTo ? <div className="flex items-center justify-between gap-2 rounded-xl bg-violet-50 p-3 text-sm dark:bg-[#21152D]"><span>Replying to <strong>{names[replyTo.user_id] || "Student"}</strong></span><button type="button" onClick={() => {setReplyTo(null); setCommentText("");}} className="font-bold text-violet-600 dark:text-violet-300">Cancel reply</button></div> : <label className="block text-sm font-bold" htmlFor="resource-comment">Add a comment</label>}
                     <textarea id="resource-comment" className={inputClass} rows={3} maxLength={1000} required value={commentText} onChange={e => setCommentText(e.target.value)} placeholder={replyTo ? "Write a reply..." : "Share a helpful thought or question..."}/>
                     <button type="submit" disabled={posting || !commentText.trim()} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{posting ? "Posting..." : replyTo ? "Post reply" : "Post comment"}</button>
                   </form>
                 </div>
               </article>
             </div>
           </div>}
                 </div>
         {reportTarget && <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="report-dialog-title">
           <form onSubmit={submitReport} className="w-full max-w-md space-y-4 rounded-2xl border p-6 shadow-2xl" style={{ background: palette.card, borderColor: palette.border, color: palette.text }}>
             <h2 id="report-dialog-title" className="text-xl font-extrabold">Report {reportTarget.label}</h2>
             <p className="text-sm" style={{ color: palette.muted }}>Tell the admins why this content should be reviewed. Reporting does not automatically remove it.</p>
             <label className="block space-y-2 text-sm font-bold">Reason
               <select required value={reportReason} onChange={event => setReportReason(event.target.value as ReportReason)} className="w-full rounded-xl border p-3 text-sm" style={{ background: palette.cardAlt, color: palette.text, borderColor: palette.border }}>
                 {reportReasons.map(reason => <option key={reason.value} value={reason.value}>{reason.label}</option>)}
               </select>
             </label>
             <label className="block space-y-2 text-sm font-bold">Additional details (optional)
               <textarea rows={3} maxLength={500} value={reportDetails} onChange={event => setReportDetails(event.target.value)} placeholder="Describe the concern without sharing personal information." className="w-full rounded-xl border p-3 text-sm" style={{ background: palette.cardAlt, color: palette.text, borderColor: palette.border }} />
             </label>
             {reportError && <p role="alert" className="text-sm text-red-600 dark:text-red-300">{reportError}</p>}
             <div className="flex justify-end gap-2">
               <button type="button" disabled={reportSubmitting} onClick={() => setReportTarget(null)} className="rounded-xl border px-4 py-2 text-sm font-bold disabled:opacity-50" style={{ borderColor: palette.border }}>Cancel</button>
               <button type="submit" disabled={reportSubmitting} className="rounded-xl bg-violet-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50">{reportSubmitting ? "Submitting..." : "Submit report"}</button>
             </div>
           </form>
         </div>}
         <style>{`
          .preppath-resources .bg-white { background-color: var(--resource-card) !important; }
          .preppath-resources .bg-\[\#FAF8FE\], .preppath-resources .bg-\[\#F4F4FA\], .preppath-resources .bg-\[\#21152D\] { background-color: var(--resource-alt) !important; }
          .preppath-resources .border-\[\#E4DDED\] { border-color: var(--resource-border) !important; }
          .preppath-resources .text-\[\#6E6476\], .preppath-resources .text-\[\#C8BCD3\] { color: var(--resource-muted) !important; }
          .preppath-resources .text-violet-600, .preppath-resources .text-violet-300 { color: var(--resource-purple); }
          .preppath-resources input:not([type=file]), .preppath-resources select, .preppath-resources textarea { background: var(--resource-alt); color: var(--resource-text); border-color: var(--resource-border); }
          .preppath-resources input::placeholder, .preppath-resources textarea::placeholder { color: var(--resource-muted); opacity: .8; }
          .preppath-resources article { box-shadow: 0 12px 36px rgba(20,20,35,.045); }
          .preppath-resources button { transition: transform .18s ease, box-shadow .18s ease, opacity .18s ease; }
          .preppath-resources button:not(:disabled):hover { transform: translateY(-1px); }
          .preppath-resources .bg-violet-600 { background-color: #7C3AED; }
          .preppath-resources .bg-violet-50 { background-color: var(--resource-soft); }
        `}</style>
      </main>
    </MainLayout>
  );
}
