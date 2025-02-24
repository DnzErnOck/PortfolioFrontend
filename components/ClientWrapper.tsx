"use client";
import { usePathname } from "next/navigation";
import Header from "./header";
 
export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSpecialRoute = pathname.startsWith("/auth") || pathname.startsWith("/admin");
 
  return (
    <>
        {!isSpecialRoute && (
          <>
            <div className="blob blob-1"></div>
            <div className="blob blob-2"></div>
            <div className="blob blob-3"></div>
          </>
        )}
        {/* Header sadece özel olmayan rotalarda */}
        {!isSpecialRoute && <Header />}
        <main>{children}</main>
    </>
  );
}