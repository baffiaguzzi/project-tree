import { useEffect, useState  } from "react";
import Controls from "./components/Controls";
import TreeView from "./components/TreeView";


export default function App() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [treeLines, setTreeLines] = useState<string[]>([]);
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } 
        else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    const handleReset = () => {
        setTreeLines([]);
    };

    const handleToggleTheme = () => {
        setDarkMode((prev) => !prev);
    };

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
            setTreeLines(data.structure);
        } catch (err) {
            console.error(err);
            setError("Unable to generate project tree");
            setTreeLines([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-6 max-w-4xl mx-auto flex flex-col gap-6 items-center justify-center align-center text-center">
            <h1 className="text-3xl font-bold">📂 Project Tree Generator</h1>
            <Controls 
                onGenerate={handleGenerate} 
                onReset={handleReset}
                onToggleTheme={handleToggleTheme}
            />
            {loading && <p className="text-indigo-400">Scanning…</p>}
            {error && <p className="text-red-400">{error}</p>}
            <TreeView lines={treeLines} />
        </div>
    );
}
