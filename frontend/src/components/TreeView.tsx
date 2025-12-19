import { useState } from "react";

interface Props {
    lines: string[];
}


export default function TreeView({ lines }: Props) {
    const [copied, setCopied] = useState(false);

    if (!lines.length) {
        return (
            <div className="text-zinc-400 italic text-center py-10">
                No structure generated yet
            </div>
        );
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(lines.join("\n"));
            setCopied(true);
        } catch (e) {
            console.error("Copy failed", e);
        }
    };

    const renderLine = (line: string, index: number) => {
        const level = line.match(/^ */)?.[0].length ?? 0;
        const name = line.trim();
        const isFolder = name && !name.includes(".");

        return (
            <div
                key={index}
                className="flex items-center py-1"
                style={{ paddingLeft: `${level * 12}px` }}
            >
                <span
                    className={
                        isFolder
                            ? "text-yellow-400 font-semibold"
                            : "text-zinc-300 font-mono"
                    }
                >
                    {isFolder ? "📁 " : "📄 "}
                    {name}
                </span>
            </div>
        );
    };

    return (
        <div className="w-full max-w-4xl bg-zinc-900 rounded-2xl p-6 overflow-auto text-sm font-mono shadow-inner border border-zinc-800">
            <div className="flex justify-between items-center mb-4">
                <span className="text-zinc-400 text-xs">
                    {lines.length} lines
                </span>
                <button
                    onClick={handleCopy}
                    className={`
                        px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-2 transition border
                        ${copied
                            ? "bg-emerald-600 text-white border-emerald-500 hover:bg-emerald-600"
                            : "bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600"
                        }
                    `}
                >
                    {copied ? (
                        <>
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            Copied
                        </>
                    ) : (
                        <>
                            <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 16h8M8 12h8m-6-8h10v16H6V4h6z"
                                />
                            </svg>
                            Copy
                        </>
                    )}
                </button>
            </div>
            {lines.map(renderLine)}
        </div>
    );
}
