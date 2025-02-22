// app/post/[id]/page.tsx
import { Metadata } from "next";
import { PostService } from "@/services/postService";
import PostDetailClient from "@/components/PostDetailClient"; // Client component

interface Props {
  params: { id: string };
}

// Server-side metadata generation
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await PostService.getById(Number(params.id)); // Post verisini al
  const postTitle = post ? post.title : "Post Detail";

  return {
    description: postTitle, // Açıklama
  };
}

// Server-side rendering done by the server, returns PostDetailClient component for the client
export default function PostDetail({ params }: Props) {
  return <PostDetailClient id={params.id} />; // ID ile client component çağırıyoruz
}
