# 📂 Project Tree Generator

![Python](https://img.shields.io/badge/python-3.10+-blue)
![React](https://img.shields.io/badge/react-18.2+-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Version](https://img.shields.io/badge/version-1.2.0-blue)

A simple **project folder tree generator** with a modern **React + TailwindCSS frontend** and **FastAPI backend**.  
Paste a folder path, optionally set a max depth, and get a **tree-like structure** of your project that you can **copy with one click**.

---

## 🚀 Features

* Full **React + TailwindCSS frontend** with:
  * Folder path input with **automatic Windows path normalization** (`\` → `/`, rimozione delle virgolette)
  * Max depth option
  * Loading indicator e gestione errori
  * Scrollable tree display con struttura ad albero (indentazione, icone 📁/📄)
  * **Copy to clipboard** del tree con stato `Copied ✅`
  * **Light/Dark theme toggle** con Tailwind dark mode
* Recursive scanning of project directories via **FastAPI backend**
* Excludes common bulky directories automatically: `node_modules`, `.git`, `dist`, `build`, `__pycache__`
* Outputs tree as JSON via API
* Handles invalid paths and permission errors gracefully

Optional enhancements:

* Can extend to Markdown or other formats
* Frontend styling easily customizable (TailwindCSS)

---

## 🛠️ Installation

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
# or source venv/bin/activate  # Linux/macOS
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend (React + TailwindCSS) will run on `http://localhost:5173` by default.

---

## ⚙️ Usage

### Frontend UI

1. Open the app in the browser (`http://localhost:5173`).
2. Enter **full folder path** (e.g., `C:/Users/gabri/OneDrive/Desktop/server-api_bot`).
   * Backslashes `\` and quotes are **automatically normalized**.
3. Optionally, set **max depth**.
4. Click **Generate tree**.
5. Use the **Copy** button above the tree to copy the structure to the clipboard (button changes to `Copied ✅`).
6. Use the **Theme** button to toggle between **light** and **dark** modes.

### Backend API

POST request to `http://127.0.0.1:8000/api/tree` with JSON body:

```json
{
  "path": "C:/Users/gabri/OneDrive/Desktop/server-api_bot",
  "depth": 3
}
```

Response:

```json
{
  "structure": [
    "cli",
    "  api_check.py",
    "  server_check.py",
    "configs",
    "  config_apis.json",
    "LICENSE",
    "README.md"
  ]
}
```

---

## 📁 Example Output

```bash
cli
  api_check.py
  server_check.py
configs
  config_apis.json
LICENSE
README.md
```

Folders shown in **yellow**, files in **grey** in the frontend tree.

---

## 🧰 Technical Details

* **Backend**: Python 3.10+, FastAPI, recursive folder traversal with max depth
* **Frontend**: React 18 + TypeScript + Vite + TailwindCSS (dark mode with `dark` class)
* Tree view:
  * Indentation-based rendering
  * Folders in yellow, files in grey
  * Copy-to-clipboard via `navigator.clipboard.writeText`
* Input path normalization: trims, removes quotes, replaces `\` with `/`

---

## 📜 License

MIT License © 2025 Gabriele A. Tambellini
See the [LICENSE](LICENSE) file for details.
