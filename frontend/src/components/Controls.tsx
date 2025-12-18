import { useState } from "react";

interface Props {
  onGenerate: (path: string, depth?: number) => void;
}

export default function Controls({ onGenerate }: Props) {
  const [path, setPath] = useState("");
  const [depth, setDepth] = useState<number | undefined>();

  return (
    <div className="flex flex-col gap-4 p-4 bg-zinc-800 rounded-xl items-center w-full max-w-lg">
      <input
        type="text"
        placeholder="Full folder path (e.g. C:/Users/.../project)"
        value={path}
        onChange={(e) => setPath(e.target.value)}
        className="px-3 py-2 rounded bg-zinc-900 border border-zinc-700 w-full text-center"
      />
      <input
        type="number"
        placeholder="Max depth (optional)"
        value={depth ?? ""}
        onChange={(e) =>
          setDepth(e.target.value ? Number(e.target.value) : undefined)
        }
        className="px-3 py-2 rounded bg-zinc-900 border border-zinc-700 w-40 text-center"
      />
      <button
        onClick={() => onGenerate(path, depth)}
        className="ml-2 bg-indigo-600 hover:bg-indigo-500 transition px-4 py-2 rounded font-semibold"
      >
        Generate tree
      </button>
    </div>
  );
}
