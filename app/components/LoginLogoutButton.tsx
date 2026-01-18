"use client";
import React, { useEffect, useMemo, useState } from "react";
// import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { signout } from "@/utils/auth-actions";
import type { AuthChangeEvent, Session, User } from "@supabase/supabase-js";

// const LoginButton = () => {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();
//   const supabase = createClient();
//   useEffect(() => {
//     const fetchUser = async () => {
//       const {
//         data: { user },
//       } = await supabase.auth.getUser();
//       setUser(user);
//     };
//     fetchUser();
//   }, []);
//   if (user) {
//     return (
//       <button
//         onClick={() => {
//           signout();
//           setUser(null);
//         }}
//       >
//         Log out
//       </button>
//     );
//   }
//   return (
//     <button
//       //   variant="outline"
//       onClick={() => {
//         router.push("/account/login");
//       }}
//     >
//       Login
//     </button>
//   );
// };

// export default LoginButton;

// const LoginButton = () => {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();
//   const supabase = createClient();

//   useEffect(() => {
//     // initial check
//     let mounted = true;
//     supabase.auth.getUser().then(({ data: { user } }) => {
//       if (mounted) setUser(user);
//     });

//     // subscribe to auth changes so UI updates instantly
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange((_event, session) =>
//       setUser(session?.user ?? null)
//     );

//     return () => {
//       mounted = false;
//       subscription.unsubscribe();
//     };
//   }, [supabase]);

//   if (user) {
//     return (
//       <button
//         onClick={async () => {
//           // sign out client-side so state & UI update immediately
//           await supabase.auth.signOut();
//           setUser(null);
//           router.push("/account/logout");
//         }}
//       >
//         Log out
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={() => {
//         router.push("/account/login");
//       }}
//     >
//       Login
//     </button>
//   );
// };

// export default LoginButton;

// const LoginButton = () => {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();
//   const supabase = useMemo(() => createClient(), []);

//   useEffect(() => {
//     let mounted = true;

//     // initial check
//     supabase.auth.getUser().then(({ data: { user } }) => {
//       if (mounted) setUser(user);
//     });

//     // subscribe to auth changes and log events
//     const result = supabase.auth.onAuthStateChange((event, session) => {
//       console.log("auth event:", event, session);
//       if (mounted) setUser(session?.user ?? null);
//     });

//     // handle different return shapes for unsubscribe
//     const subscription = (result as any)?.data?.subscription ?? (result as any);

//     return () => {
//       mounted = false;
//       if (subscription?.unsubscribe) subscription.unsubscribe();
//       else if (typeof subscription === "function") subscription();
//     };
//   }, [supabase]);

//   if (user) {
//     return (
//       <button
//         onClick={async () => {
//           await supabase.auth.signOut(); // client sign-out updates UI immediately
//           setUser(null);
//           router.push("/account/logout");
//         }}
//       >
//         Log out
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={() => {
//         router.push("/account/login");
//       }}
//     >
//       Login
//     </button>
//   );
// };

// export default LoginButton;

// const LoginButton = () => {
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();
//   const supabase = useMemo(() => createClient(), []);

//   useEffect(() => {
//     let mounted = true;
//     // initial session check
//     supabase.auth
//       .getSession()
//       .then(({ data: { session } }: { data: { session: Session | null } }) => {
//         if (mounted) setUser(session?.user ?? null);
//       });

//     // subscribe to auth changes
//     const {
//       data: { subscription },
//     } = supabase.auth.onAuthStateChange(
//       (event: AuthChangeEvent, session: Session | null) => {
//         console.log("auth event:", event, session);
//         if (mounted) setUser(session?.user ?? null);
//       }
//     );

//     return () => {
//       mounted = false;
//       subscription?.unsubscribe?.();
//     };
//   }, [supabase]);
//   if (user) {
//     return (
//       <button
//         onClick={async () => {
//           await supabase.auth.signOut(); // client signout keeps UI in sync
//           console.log("You signed out bruh");
//           setUser(null);
//           router.push("/account/logout");
//         }}
//       >
//         Log out
//       </button>
//     );
//   }

//   return (
//     <button
//       onClick={() => {
//         router.push("/account/login");
//       }}
//     >
//       Login
//     </button>
//   );
// };

// export default LoginButton;

const LoginButton = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
    let mounted = true;

    // initial session check
    supabase.auth
      .getSession()
      .then(({ data: { session } }: { data: { session: Session | null } }) => {
        if (mounted) setUser(session?.user ?? null);
      });

    // subscribe to auth changes and refresh server data when it happens
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event: AuthChangeEvent, session: Session | null) => {
        console.log("auth event:", event, session);
        if (mounted) setUser(session?.user ?? null);

        // update server-rendered data/UI
        if (event === "SIGNED_IN" || event === "SIGNED_OUT") {
          try {
            // soft refresh (re-fetch server components)
            // router.refresh();
            window.location.reload();
          } catch {
            // fallback to a full reload if needed
            window.location.reload();
          }
        }
      }
    );

    return () => {
      mounted = false;
      subscription?.unsubscribe?.();
    };
  }, [supabase, router]);

  if (user) {
    return (
      <button
        onClick={async () => {
          await supabase.auth.signOut();
          setUser(null);
          router.push("/account/logout");
        }}
      >
        Log out
      </button>
    );
  }

  return (
    <button
      onClick={() => {
        router.push("/account/login");
      }}
    >
      Login
    </button>
  );
};

export default LoginButton;
