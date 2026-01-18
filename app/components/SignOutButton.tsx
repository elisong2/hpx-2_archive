// app/components/SignOutButton.tsx
"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function SignOutButton() {
  const supabase = createClient();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleSignOut() {
    await supabase.auth.signOut();

    // revalidate and redirect (Next 15-style)
    startTransition(() => {
      router.refresh(); // refresh server components (like Navbar)
      router.push("/"); // optional redirect
    });
  }

  return (
    <button
      onClick={handleSignOut}
      disabled={isPending}
      className="btn btn-ghost"
    >
      {isPending ? "Signing out…" : "Sign Out"}
    </button>
  );
}

// "use client";

// import { useRouter } from "next/navigation";

// export default function SignOutButton() {
//   const router = useRouter();

//   const handleSignOut = async () => {
//     // Call your server signout route
//     const res = await fetch("/auth/signout", { method: "POST" });

//     if (res.ok) {
//       // Optionally clear local storage or anything custom if needed
//       router.refresh(); // Refresh the navbar layout
//       router.push("/"); // Go back home
//     } else {
//       console.error("Sign out failed");
//     }
//   };

//   return (
//     <button onClick={handleSignOut} className="btn btn-ghost text-l">
//       Sign Out
//     </button>
//   );
// }
