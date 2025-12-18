import { useState } from "react";
import Controls from "./components/Controls";
import TreeView from "./components/TreeView";

export default function App() {
  const [tree, setTree] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (path: string, depth?: number) => {
    if (!path) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/tree", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, depth }),
      });

      if (!res.ok) throw new Error("Failed to generate tree");

      const data = await res.json();
      setTree(data.structure);
    } catch (err) {
      console.error(err);
      setError("Unable to generate project tree");
      setTree([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col gap-6 items-center justify-center align-center text-center">
      <h1 className="text-3xl font-bold">📂 Project Tree Generator</h1>
      <Controls onGenerate={handleGenerate} />
      {loading && <p className="text-indigo-400">Scanning…</p>}
      {error && <p className="text-red-400">{error}</p>}
      <TreeView lines={tree} />
    </div>
  );
}
