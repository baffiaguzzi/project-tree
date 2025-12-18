# 📂 Project Tree Generator

![Python](https://img.shields.io/badge/python-3.10+-blue)
![License](https://img.shields.io/badge/license-MIT-green)

A simple Python utility to generate a **tree-like structure** of any project folder,  
excluding common bulky or irrelevant directories, and outputting the hierarchy in Markdown. Perfect for documentation or sharing your project structure.

---

## 🚀 Features

- Recursive scanning of project directories  
- Automatic exclusion of common unnecessary folders: `node_modules`, `.git`, `dist`, `build`, `__pycache__`  
- Loading animation in console while scanning  
- Outputs Markdown file (`project_structure.md`)  
- Handles errors gracefully and continues scanning  

Optional enhancements:
- Can be extended to JSON output
- Customizable excluded folders  

---

## 🛠️ Usage

### Interactive mode

```bash
python project-tree.py
```

1. Enter the path to your project folder when prompted (e.g., /home/user/my-project).

2. Wait for analysis to complete with loading animation.

3. The generated project_structure.md file will appear in the folder where you ran the script.

### CLI argument mode

```bash
python project-tree.py /path/to/your/project
```

---

## Useful for automation or scripts

### 📁 Sample Output

Example Markdown content generated in project_structure.md:
├── src
│   ├── components
│   └── utils
├── public
└── package.json

## ⚙️ Technical Details

Excluded directories defined in EXCLUDED_DIRS (modifiable in the code).
Uses threading for smooth console loading animation.
Compatible with Python 3.10+.

## 📜 License

MIT License © 2025 Gabriele A. Tambellini  
See the [LICENSE](LICENSE) file for details.
