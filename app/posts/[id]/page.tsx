"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { api, ApiError, formatDate, formatFee, Post } from "@/lib/api";
import { dangerBtn, ErrorBox, inputClass, subBtn } from "@/components/ui";

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [post, setPost] = useState<Post | null>(null);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [password, setPassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    api<Post>(`/posts/${id}`).then(setPost).catch((e: ApiError) => setError(e.message));
  }, [id]);

  async function remove() {
    setDeleteError("");
    try {
      await api(`/posts/${id}`, { method: "DELETE", body: { password } });
      router.push("/");
    } catch (e) {
      const err = e as ApiError;
      setDeleteError(err.errors.password ?? err.message);
    }
  }

  if (error) return <ErrorBox>{error}</ErrorBox>;
  if (!post) return <p className="text-slate-500">불러오는 중...</p>;

  const rows: [string, string][] = [
    ["경기장", `${post.stadium_district} · ${post.stadium_name}`],
    ["주소", post.stadium_address],
    ["날짜·시간", `${formatDate(post.play_date)} ${post.play_time}`],
    ["모집 인원", `${post.capacity}명`],
    ["실력 수준", post.skill_level],
    ["참가비", formatFee(post.fee)],
    ["작성자", post.author_name],
    ["연락 방법", post.contact],
  ];

  return (
    <div className="space-y-4">
      <Link href="/" className="text-sm text-slate-500 hover:underline">← 목록으로</Link>
      <article className="space-y-4 rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-xl font-bold">{post.title}</h1>
          <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">{post.sport}</span>
        </div>
        <dl className="grid grid-cols-[6rem_1fr] gap-y-2 text-sm">
          {rows.map(([k, v]) => (
            <div key={k} className="contents">
              <dt className="text-slate-500">{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <a href={post.stadium_map_url} target="_blank" rel="noreferrer" className={subBtn}>🗺 지도에서 보기</a>
        {post.description && (
          <div>
            <h2 className="mb-1 text-sm font-semibold">설명</h2>
            <p className="whitespace-pre-wrap text-sm">{post.description}</p>
          </div>
        )}
      </article>

      <div className="flex flex-wrap items-start gap-2">
        <Link href={`/posts/${post.id}/edit`} className={subBtn}>수정</Link>
        {!deleting ? (
          <button className={dangerBtn} onClick={() => setDeleting(true)}>삭제</button>
        ) : (
          <div className="space-y-2">
            <div className="flex gap-2">
              <input type="password" inputMode="numeric" maxLength={4} placeholder="비밀번호 4자리" value={password} onChange={(e) => setPassword(e.target.value)} className={inputClass + " w-40"} />
              <button className={dangerBtn} onClick={remove}>삭제하기</button>
              <button className={subBtn} onClick={() => { setDeleting(false); setPassword(""); setDeleteError(""); }}>취소</button>
            </div>
            {deleteError && <p className="text-sm font-medium text-red-600">{deleteError}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
