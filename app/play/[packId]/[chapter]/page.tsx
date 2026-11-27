"use client";
import { useParams } from "next/navigation";
import { Sheet } from "@/components/Sheet";

export default function ChapterPage() {
  const { packId, chapter } = useParams<{ packId: string; chapter: string }>();
  return <Sheet key={`${packId}:${chapter}`} mode="pack" packId={packId} chapter={Number(chapter)} />;
}
