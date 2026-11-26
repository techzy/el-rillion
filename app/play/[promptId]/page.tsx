"use client";
import { useParams } from "next/navigation";
import { Game } from "@/components/Game";

export default function PromptPage() {
  const { promptId } = useParams<{ promptId: string }>();
  return <Game mode="pack" promptId={promptId} />;
}
