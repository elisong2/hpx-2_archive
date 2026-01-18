import React from "react";
import Link from "next/link";

export default function UserBuilds({
  params,
}: {
  params: { username: string };
}) {
  const { username } = params;
  return (
    <>
      <h1>User builds page!</h1>
      <Link href={`/user/${username}/my-builds/new`}>
        <button className="btn">New Build</button>
      </Link>
    </>
  );
}
