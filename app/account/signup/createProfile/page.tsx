"use client";

// import { createProfile } from "../../actions";

// export default function createProfilePage() {
//   return (
//     <form className="card bg-base-100 w-96 shadow-sm">
//       <label className="input validator">
//         <svg
//           className="h-[1em] opacity-50"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 24 24"
//         >
//           <g
//             strokeLinejoin="round"
//             strokeLinecap="round"
//             strokeWidth="2.5"
//             fill="none"
//             stroke="currentColor"
//           >
//             <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
//             <circle cx="12" cy="7" r="4"></circle>
//           </g>
//         </svg>
//         <input
//           id="username"
//           name="username"
//           type="text"
//           required
//           placeholder="Username"
//           pattern="[A-Za-z][A-Za-z0-9\-]*"
//           // minLength="3"
//           // maxlength="30"
//           title="Only letters, numbers or dash"
//         />
//       </label>
//       <p className="validator-hint">
//         Must be 3 to 30 characters
//         <br />
//         containing only letters, numbers or dash
//       </p>

//       <fieldset className="fieldset">
//         <legend className="fieldset-legend">Tell us about you!</legend>
//         <textarea
//           className="textarea h-24"
//           id="bio"
//           name="bio"
//           placeholder="bio"
//         ></textarea>
//         <div className="label">Optional</div>
//       </fieldset>

//       <button className="btn" formAction={createProfile}>
//         Start
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateProfilePage() {
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      alert("You must be logged in");
      return;
    }

    const { error } = await supabase.from("profiles").insert({
      user_id: user.id,
      username: username,
      bio: bio || "Hello world!",
    });

    if (error) {
      console.error(error);
      alert("Error creating profile.");
    } else {
      // router.push(`/user/${username}`);
      window.location.href = `/user/${username}`;
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered"
      />

      {/* <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        className="input input-bordered"
      /> */}
      <button className="btn btn-primary" type="submit">
        Create Profile
      </button>
    </form>
  );
}
