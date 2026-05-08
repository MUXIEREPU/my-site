let notes = [];
let currentPath = "";

const noteList = document.getElementById("noteList");
const viewer = document.getElementById("viewer");
const search = document.getElementById("search");

async function loadNotes() {
  try {
    const response = await fetch("notes.json");

    if (!response.ok) {
      throw new Error("notes.json 加载失败");
    }

    notes = await response.json();
    renderList(notes);
  } catch (error) {
    viewer.innerHTML = `
      <h1>加载失败</h1>
      <p>请检查 notes.json 是否存在，路径是否正确。</p>
    `;
    console.error(error);
  }
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
    <h1>不支持的文件类型</h1>
    <p>${note.title}</p>
  `;
}

async function openMarkdown(note) {
  try {
    const response = await fetch(note.path);

    if (!response.ok) {
      throw new Error("Markdown 文件加载失败");
    }

    const text = await response.text();
    viewer.classList.add("markdown-body");
    viewer.innerHTML = marked.parse(text);
  } catch (error) {
    viewer.innerHTML = `
      <h1>Markdown 加载失败</h1>
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
    <iframe class="pdf-frame" src="${encodeURI(note.path)}"></iframe>
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

search.addEventListener("input", () => {
  renderList(getFilteredNotes());
});

loadNotes();