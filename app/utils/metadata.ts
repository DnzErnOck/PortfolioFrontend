/* import { UserService } from "@/services/userService";
 
export async function generateMetadata(pageMetadata?: { title?: string, description?: string, tags?: string[] }) {
  const userData = await UserService.getUser();
  const fullName = userData ? `${userData.name} ${userData.surname}` : "Unknown User";
 
  console.log("deneme (pageMetadata.description):", pageMetadata?.description);
 
  if (!pageMetadata?.description) {
    console.error("❌ HATA: generateMetadata() içinde description undefined geldi!");
  }
 
  const defaultMetadata = {
    title: `${fullName} - Portfolio`,
    description: `Welcome to ${fullName}'s portfolio. Explore my projects and skills as a Full-Stack Developer.`,
    tags: ["portfolio", "developer", "full-stack", "frontend", "backend"],
  };
 
  return {
    title: pageMetadata?.title || defaultMetadata.title,
    description: pageMetadata?.description?.trim() || defaultMetadata.description,
    tags: pageMetadata?.tags?.length ? pageMetadata.tags : defaultMetadata.tags,
  };
} */