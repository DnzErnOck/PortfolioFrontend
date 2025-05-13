// app/post/[id]/page.tsx
import { Metadata } from "next";
import { PostResponse, PostService } from "@/services/postService";
import PostDetailClient from "@/components/PostDetailClient"; // Client component
import { PagedResponse } from "@/app/utils/PagedResponse";
export const dynamic = "force-dynamic"
interface Props {
  params: { id: string };
}
export async function generateStaticParams() {
  // 'getAll' fonksiyonunu çağırarak tüm postları alıyoruz
  const response: PagedResponse<PostResponse> = await PostService.getAll();

  // 'content' özelliği üzerinden map fonksiyonu ile id'leri alıyoruz
  return response.content.map((post) => ({
    id: post.id.toString(),  // Her post'un ID'sini döndürüyoruz
  }));
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
export const revalidate = 60;