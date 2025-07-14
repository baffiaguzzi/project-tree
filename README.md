# project-tree.py

📂 project-tree.py

A simple Python utility to generate a tree-like structure of a project folder,  
excluding common bulky or irrelevant directories like node_modules, .git, dist, build, and __pycache__.

It outputs a markdown file representing the folder hierarchy.

---

🚀 Features

- Recursive scanning of the project directory
- Automatic exclusion of common unnecessary folders
- Loading animation in the console during processing
- Outputs to `project_structure.md` in markdown format

---

🛠️ How to Use

1. Run the Python script: `python project-tree.py`

2. Enter the path to your project folder when prompted (e.g., `/home/user/my-project`)

3. Wait for the analysis to complete with a loading animation in the console

4. Find the generated `project_structure.md` file in the folder where you ran the script, containing your project’s folder tree

---

📁 Output File Sample

Example content generated inside `project_structure.md`:

Project structure: /path/to/your/project
├── src
│ ├── components
│ └── utils
├── public
└── package.json

---

⚙️ Technical Details

- Excludes directories defined in `EXCLUDED_DIRS`
- Uses threading for a smooth console loading animation
- Handles directory read errors gracefully with user-friendly messages
- Compatible with Python 3.x

---

🔗 Notes

- You can customize excluded folders by editing the `EXCLUDED_DIRS` variable in the code
- Great tool to document project structure before sharing or publishing

---

📜 License

Open-source MIT License © Gabriele Tambellini

---

✨ Thanks for using project-tree.py!
