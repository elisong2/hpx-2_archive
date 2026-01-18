"use client";

import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) {
      alert("Post created!");
    } else {
      alert("Error creating post");
    }
  };

  return (
    <>
      <h1>new post page!</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-10 space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          className="input input-bordered w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="textarea textarea-bordered w-full"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="btn btn-primary w-full">
          Post
        </button>
      </form>
    </>
  );
}
