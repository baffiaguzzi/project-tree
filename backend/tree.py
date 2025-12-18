import os

DEFAULT_EXCLUDED_DIRS = {"node_modules", ".git", "dist", "build", "__pycache__"}


def generate_tree(
    path: str,
    excluded_dirs=None,
    max_depth=None,
    prefix="",
    current_depth=0,
    output=None,
):
    if output is None:
        output = []

    if excluded_dirs is None:
        excluded_dirs = DEFAULT_EXCLUDED_DIRS

    if max_depth is not None and current_depth >= max_depth:
        return output

    try:
        entries = sorted(os.listdir(path))
    except Exception:
        return output

    entries = [e for e in entries if e not in excluded_dirs]

    for index, entry in enumerate(entries):
        full_path = os.path.join(path, entry)
        is_last = index == len(entries) - 1
        connector = "└── " if is_last else "├── "
        icon = "📁" if os.path.isdir(full_path) else "📄"

        output.append(f"{prefix}{connector}{icon} {entry}")

        if os.path.isdir(full_path):
            extension = "    " if is_last else "│   "
            generate_tree(
                full_path,
                excluded_dirs,
                max_depth,
                prefix + extension,
                current_depth + 1,
                output,
            )

    return output
