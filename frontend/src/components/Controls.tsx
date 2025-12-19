import { useState, useCallback } from "react";

interface Props {
    onGenerate: (path: string, depth?: number) => void;
    onReset: () => void;
    onToggleTheme: () => void;
}

const normalizePath = (input: string): string => {
    return input
        .trim()
        .replace(/["']/g, "")
        .replace(/\\/g, "/");
};


export default function Controls({ onGenerate, onReset, onToggleTheme }: Props) {
    const [path, setPath] = useState("");
    const [depth, setDepth] = useState<number | undefined>();

    const handlePathChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const normalized = normalizePath(e.target.value);
        setPath(normalized);
    }, []);

    return (
        <div
            className="
                flex flex-col gap-4 p-6 w-full max-w-lg rounded-2xl shadow-lg transition-colors
                bg-zinc-100 text-zinc-900
                dark:bg-zinc-800 dark:text-zinc-100
            "
        >
            <input
                type="text"
                placeholder="Full folder path (e.g. C:/Users/.../project)"
                value={path}
                onChange={handlePathChange}
                className="
                    px-4 py-3 rounded-xl text-center transition
                    bg-zinc-200 border border-zinc-300 text-zinc-900 placeholder-zinc-500
                    focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500
                "
            />

            <input
                type="number"
                placeholder="Max depth (optional)"
                value={depth ?? ""}
                onChange={(e) =>
                    setDepth(e.target.value ? Number(e.target.value) : undefined)
                }
                className="
                    px-4 py-3 rounded-xl w-40 mx-auto text-center transition
                    bg-zinc-200 border border-zinc-300 text-zinc-900 placeholder-zinc-500
                    focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500
                    dark:bg-zinc-900 dark:border-zinc-700 dark:text-zinc-100 dark:placeholder-zinc-500
                "
            />

            <div className="flex gap-3">
                <button
                    onClick={() => onGenerate(path, depth)}
                    className="
                        flex-1 px-6 py-3 rounded-xl font-semibold shadow-md transition
                        bg-indigo-600 text-white hover:bg-indigo-500 active:bg-indigo-700
                    "
                >
                    Generate tree
                </button>

                <button
                    onClick={onReset}
                    className="
                        px-6 py-3 rounded-xl font-semibold shadow-md flex items-center gap-2 transition
                        bg-zinc-300 text-zinc-800 hover:bg-zinc-200 active:bg-zinc-400
                        dark:bg-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-600 dark:active:bg-zinc-500
                    "
                    title="Reset tree view"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                    Clear
                </button>
            </div>

            <button
                onClick={onToggleTheme}
                className="
                    px-6 py-2 rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-md
                    transition-all duration-200 border
                    bg-zinc-200 text-zinc-800 border-zinc-300 hover:bg-zinc-300
                    dark:bg-zinc-700 dark:text-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-600
                "
                title="Toggle light/dark theme"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
                Theme
            </button>
        </div>
    );
}
