interface Props {
  lines: string[];
}

export default function TreeView({ lines }: Props) {
  if (!lines.length) {
    return (
      <div className="text-zinc-400 italic text-center">
        No structure generated yet.
      </div>
    );
  }

  const renderLine = (line: string, index: number) => {
    const level = line.match(/^ */)?.[0].length ?? 0;
    const name = line.trim();
    const isFolder = name && !name.includes("."); 

    return (
      <div
        key={index}
        className={`px-2`}
        style={{ paddingLeft: `${level * 8}px` }}
      >
        <span className={isFolder ? "text-yellow-400 font-semibold" : "text-zinc-300"}>
          {isFolder ? "📁 " : "📄 "}
          {name}
        </span>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl bg-zinc-900 rounded-xl p-4 overflow-auto text-sm font-mono">
      {lines.map(renderLine)}
    </div>
  );
}
