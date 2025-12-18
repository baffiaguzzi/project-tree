import os
import threading
import time
import argparse
import json
import datetime
import sys

EXCLUDED_DIRS = {"node_modules", ".git", "dist", "build", "__pycache__"}


def clean_path(path: str) -> str:
    """Clean user input path by stripping spaces and quotes"""
    return path.strip().strip('"').strip("'")


def animate_loading(message="Scanning folders"):
    """Display a console spinner while scanning directories"""
    stop_event = threading.Event()
    spinner = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"]

    def loader():
        i = 0
        while not stop_event.is_set():
            print(f"\r{message} {spinner[i % len(spinner)]}", end="", flush=True)
            i += 1
            time.sleep(0.1)
        print("\r" + " " * (len(message) + 2) + "\r", end="")

    t = threading.Thread(target=loader)
    t.start()
    return stop_event


def format_line(entry: str, is_dir: bool, prefix: str, is_last: bool) -> str:
    """Format a single tree line with icons for Markdown output"""
    connector = "└── " if is_last else "├── "
    icon = "📁" if is_dir else "📄"
    return f"{prefix}{connector}{icon} {entry}"


def scan_tree(path: str, prefix="", output_lines=None, max_depth=None, current_depth=0):
    """Recursively scan the directory tree"""
    if output_lines is None:
        output_lines = []

    if max_depth is not None and current_depth >= max_depth:
        return output_lines

    try:
        entries = sorted(os.listdir(path))
    except Exception as e:
        print(f"❌ Error accessing {path}:\n{e}")
        return output_lines

    entries = [e for e in entries if e not in EXCLUDED_DIRS]

    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        is_last = index == len(entries) - 1
        output_lines.append(
            format_line(entry, os.path.isdir(full_path), prefix, is_last)
        )

        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            scan_tree(
                full_path,
                prefix + extension,
                output_lines,
                max_depth,
                current_depth + 1,
            )

    return output_lines


def save_markdown(output_file: str, path: str, lines: list):
    """Save project structure as a Markdown file"""
    header = f"# Project Structure: {path}\n"
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(header + "\n".join(lines))
    print(f"✅ Markdown saved: {output_file}")


def save_json(output_file: str, path: str, lines: list):
    """Save project structure as a JSON file"""
    json_file = output_file.replace(".md", ".json")
    data = {
        "project": path,
        "generated_at": datetime.datetime.now().isoformat(),
        "structure": lines,
    }

    with open(json_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    print(f"✅ JSON saved: {json_file}")


def log_action(path: str):
    """Append a generation log entry"""
    log_file = os.path.join(os.getcwd(), "project_tree.log")
    with open(log_file, "a", encoding="utf-8") as log:
        log.write(
            f"{datetime.datetime.now().isoformat()} - Generated tree for {path}\n"
        )


def main():
    parser = argparse.ArgumentParser(
        description="Generate a project folder tree in Markdown or JSON format"
    )
    parser.add_argument("path", nargs="?", help="Path to the project folder")
    parser.add_argument(
        "-o", "--output", default="project_structure.md", help="Output Markdown file"
    )
    parser.add_argument(
        "-d", "--depth", type=int, help="Maximum folder depth to scan"
    )
    parser.add_argument(
        "-e",
        "--exclude",
        help="Additional folders to exclude (comma separated)",
    )
    parser.add_argument(
        "--json", action="store_true", help="Also generate JSON output"
    )

    args = parser.parse_args()

    project_path = clean_path(args.path) if args.path else input("Project path: ")

    if args.exclude:
        extras = [e.strip() for e in args.exclude.split(",")]
        EXCLUDED_DIRS.update(extras)

    print(f"\n📂 Project: {project_path}\n")

    loading = animate_loading("🔍 Scanning folders")
    tree_lines = scan_tree(project_path, max_depth=args.depth)
    loading.set()

    save_markdown(args.output, project_path, tree_lines)

    if args.json:
        save_json(args.output, project_path, tree_lines)

    log_action(project_path)


if __name__ == "__main__":
    main()
