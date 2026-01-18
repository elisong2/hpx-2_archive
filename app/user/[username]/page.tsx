// import { createClient } from "@/lib/supabase/server";
// import AccountForm from "@/app/account/account-form";

export default async function AccountOverview({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  return (
    <>
      <h1>Welcome {username}!</h1>

      <ul className="menu">
        <li>Account</li>
        <li>Builds</li>
        <li>Pictures</li>
        <li>Wishlist</li>
      </ul>
    </>
  );
}

// // export default async function UserPage({
// //   params,
// // }: {
// //   params: { username: string };
// // }) {
// //   const supabase = await createClient();

// //   const { data: profile } = await supabase
// //     .from("profiles")
// //     .select("*")
// //     .eq("username", params.username)
// //     .single();

// //   if (!profile) {
// //     return <p>User not found</p>;
// //   }

// //   return (
// //     <div>
// //       <h1>test</h1>
// //       <h1>{profile.username}</h1>
// //       <p>{profile.bio}</p>
// //     </div>
// //   );
// // }

// export default async function Account() {
//   const supabase = await createClient();

//   const {
//     data: { user },
//   } = await supabase.auth.getUser();

//   return (
//     <>
//       <h1>this is the signed in user page</h1>
//       <AccountForm user={user} />
//     </>
//   );
// }
