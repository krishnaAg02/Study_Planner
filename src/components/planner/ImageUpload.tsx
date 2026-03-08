"use client";
import { useState } from "react";

interface Props {
  onTextExtracted: (text: string) => void;
}

export default function ImageUpload({ onTextExtracted }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const upload = async () => {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/planner/parse", { method: "POST", body: form });
    const data = await res.json();
    setLoading(false);
    if (data.text) {
      onTextExtracted(data.text);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        disabled={!file || loading}
        onClick={upload}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? "Extracting…" : "Upload & Extract Text"}
      </button>
    </div>
  );
}
