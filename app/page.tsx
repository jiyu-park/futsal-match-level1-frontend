"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { api, ApiError, formatDate, formatFee, Post } from "@/lib/api";
import { ErrorBox, primaryBtn } from "@/components/ui";

export default function HomePage() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Post[]>("/posts").then(setPosts).catch((e: ApiError) => setError(e.message));
  }, []);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">풋살 모집글</h1>
        <Link href="/posts/new" className={primaryBtn}>글 올리기</Link>
      </div>

      {error && <ErrorBox>{error}</ErrorBox>}
      {!posts && !error && <p className="text-slate-500">불러오는 중...</p>}
      {posts && posts.length === 0 && (
        <p className="rounded-lg bg-white p-6 text-center text-slate-500">아직 올라온 글이 없어요. 첫 글을 올려 보세요!</p>
      )}

      <ul className="space-y-3">
        {posts?.map((p) => (
          <li key={p.id}>
            <Link href={`/posts/${p.id}`} className="block rounded-xl border border-slate-200 bg-white p-4 hover:border-emerald-500">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-semibold">{p.title}</h2>
                <span className="shrink-0 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">{p.sport}</span>
              </div>
              <p className="mt-1 text-sm text-slate-600">
                📍 {p.stadium_district} · {p.stadium_name}
              </p>
              <p className="mt-1 text-sm text-slate-600">
                🗓 {formatDate(p.play_date)} {p.play_time} · 👥 {p.capacity}명 · 💰 {formatFee(p.fee)} · {p.skill_level}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
