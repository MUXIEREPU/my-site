let notes = [];
let currentPath = "";

const noteList = document.getElementById("noteList");
const viewer = document.getElementById("viewer");
const search = document.getElementById("search");

const sidebar = document.getElementById("sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const homeBtn = document.getElementById("homeBtn");

async function loadNotes() {
  try {
    const response = await fetch("notes.json");

    if (!response.ok) {
      throw new Error("notes.json 加载失败");
    }

    notes = await response.json();
    renderList(notes);
    renderMath();
  } catch (error) {
    viewer.innerHTML = `
      <h1 class="error">加载失败</h1>
      <p>请检查 notes.json 是否存在，路径是否正确。</p>
    `;
    console.error(error);
  }
}

function renderHome() {
  currentPath = "";

  viewer.classList.add("markdown-body");

  viewer.innerHTML = `
    <h1>OneOcean Notes</h1>
    <p>欢迎来到你的课程笔记网站。</p>

    <h2>Discrete Mathematics</h2>
    <p>请从左侧选择 Markdown 或 PDF 笔记进行查看。</p>

    <h3>当前功能</h3>
    <ul>
      <li>Markdown 在线阅读</li>
      <li>PDF 在线预览</li>
      <li>数学公式渲染</li>
      <li>笔记搜索</li>
      <li>侧边栏收折</li>
    </ul>

    <h3>公式示例</h3>

    <p>行内公式：$P \\rightarrow Q$</p>

    <p>块级公式：</p>

    $$
    (P \\vee Q) \\vee R = P \\vee (Q \\vee R)
    $$
  `;

  renderList(getFilteredNotes());
  renderMath();
}

function renderList(items) {
  noteList.innerHTML = "";

  if (items.length === 0) {
    noteList.innerHTML = `<p class="empty">没有找到相关笔记</p>`;
    return;
  }

  items.forEach((note) => {
    const button = document.createElement("button");
    button.className = "note-item";

    if (note.path === currentPath) {
      button.classList.add("active");
    }

    button.innerHTML = `
      ${note.title}
      <span class="note-type">${note.type.toUpperCase()}</span>
    `;

    button.addEventListener("click", () => {
      currentPath = note.path;
      openNote(note);
      renderList(getFilteredNotes());
      closeMobileSidebar();
    });

    noteList.appendChild(button);
  });
}

async function openNote(note) {
  if (note.type === "markdown") {
    await openMarkdown(note);
    return;
  }

  if (note.type === "pdf") {
    openPdf(note);
    return;
  }

  viewer.innerHTML = `
    <h1 class="error">不支持的文件类型</h1>
    <p>${note.title}</p>
  `;
}

async function openMarkdown(note) {
  try {
    const response = await fetch(encodeURI(note.path));

    if (!response.ok) {
      throw new Error("Markdown 文件加载失败");
    }

    const text = await response.text();

    viewer.classList.add("markdown-body");
    viewer.innerHTML = marked.parse(text);

    renderMath();
  } catch (error) {
    viewer.classList.add("markdown-body");
    viewer.innerHTML = `
      <h1 class="error">Markdown 加载失败</h1>
      <p>请检查文件路径：</p>
      <code>${note.path}</code>
    `;
    console.error(error);
  }
}

function openPdf(note) {
  viewer.classList.remove("markdown-body");

  viewer.innerHTML = `
    <h1>${note.title}</h1>
    <iframe
      class="pdf-frame"
      src="${encodeURI(note.path)}"
    ></iframe>
  `;
}

function getFilteredNotes() {
  const keyword = search.value.trim().toLowerCase();

  return notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(keyword) ||
      note.path.toLowerCase().includes(keyword) ||
      note.type.toLowerCase().includes(keyword)
    );
  });
}

function renderMath() {
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise([viewer]).catch((error) => {
      console.error("MathJax 渲染失败：", error);
    });
  }
}

function closeMobileSidebar() {
  sidebar.classList.remove("mobile-open");
}

collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

mobileMenuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("mobile-open");
});

homeBtn.addEventListener("click", () => {
  renderHome();
  closeMobileSidebar();
});

search.addEventListener("input", () => {
  renderList(getFilteredNotes());
});

loadNotes();