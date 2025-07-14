import os
import threading
import time
import sys

EXCLUDED_DIRS = {"node_modules", ".git", "dist", "build", "__pycache__"}

def clean_path(path):
    return path.strip().strip('"').strip("'")

# Funzione animazione "..."
def animate_loading(message="Generazione struttura"):
    stop_event = threading.Event()

    def loader():
        dots = ""
        while not stop_event.is_set():
            dots = "." if dots == "..." else dots + "."
            print(f"\r{message}{dots} ", end="", flush=True)
            time.sleep(0.5)
        print("\r" + " " * (len(message) + 5) + "\r", end="")

    t = threading.Thread(target=loader)
    t.start()
    return stop_event

def print_tree(start_path, prefix='', output_lines=None):
    if output_lines is None:
        output_lines = []

    try:
        entries = sorted(os.listdir(start_path))
    except Exception as e:
        print(f"❌ Errore durante l'accesso a {start_path}:\n{e}")
        return output_lines

    entries = [e for e in entries if e not in EXCLUDED_DIRS]

    for index, entry in enumerate(entries):
        path = os.path.join(start_path, entry)
        connector = "└── " if index == len(entries) - 1 else "├── "
        line = f"{prefix}{connector}{entry}"
        output_lines.append(line)
        if os.path.isdir(path):
            extension = "    " if index == len(entries) - 1 else "│   "
            print_tree(path, prefix + extension, output_lines)

    return output_lines

if __name__ == "__main__":
    raw_input_path = input("Percorso del progetto: ")
    project_path = clean_path(raw_input_path)

    print(f"\n📂 Struttura progetto: {project_path}\n")

    tree_lines = [f"# Struttura progetto: {project_path}\n"]

    # Avvio animazione
    loading = animate_loading("🔍 Analisi cartelle")
    tree_lines += print_tree(project_path)
    loading.set()  # Ferma animazione

    output_file = os.path.join(os.getcwd(), "project_structure.md")
    with open(output_file, "w", encoding="utf-8") as f:
        f.write("\n".join(tree_lines))

    print("✅ File generato con successo:", output_file)
