// Mindmap nodes
const nodes = new vis.DataSet([
  {
    id: 1,
    label: "Hwanhee Lee\nFrontend Developer",
    shape: "circle",
    color: "#d9ead3",
    font: { size: 22, color: "#2f4f36", face: "IBM Plex Sans KR" },
    borderWidth: 2,
  },
  { id: 2, label: "Skills", shape: "circle", color: "#e6f4e6" },
  { id: 3, label: "Projects", shape: "circle", color: "#e0f1e8" },
  { id: 4, label: "About Me", shape: "circle", color: "#f2f6e9" },
  { id: 5, label: "UI Works", shape: "circle", color: "#f6efe9" },
  { id: 6, label: "Contact", shape: "circle", color: "#e8efe6" },
]);

// Links
const edges = new vis.DataSet([
  { from: 1, to: 2, color: "#c8dcc0" },
  { from: 1, to: 3, color: "#c8dcc0" },
  { from: 1, to: 4, color: "#c8dcc0" },
  { from: 1, to: 5, color: "#c8dcc0" },
  { from: 1, to: 6, color: "#c8dcc0" },
]);

// Initialize
const container = document.getElementById("mindmap");

const data = { nodes, edges };

const options = {
  physics: {
    stabilization: false,
    barnesHut: {
      gravitationalConstant: -2000,
      springLength: 180,
      springConstant: 0.03,
      centralGravity: 0.4,
    },
  },
  nodes: {
    borderWidth: 1,
    shadow: true,
    font: {
      multi: true,
      size: 16,
    },
  },
  edges: {
    smooth: {
      type: "curvedCW",
      roundness: 0.4,
    },
    width: 2,
  },
  interaction: {
    hover: true,
  },
};

const network = new vis.Network(container, data, options);

// 클릭 이벤트 → 각 섹션으로 이동
network.on("click", function (params) {
  if (params.nodes.length === 0) return;
  const id = params.nodes[0];

  const sectionMap = {
    2: "#skills",
    3: "#projects",
    4: "#about",
    5: "#ui-works",
    6: "#contact",
  };

  if (sectionMap[id]) {
    document.querySelector(sectionMap[id]).scrollIntoView({
      behavior: "smooth",
    });
  }
});
network.on("click", function (params) {
  if (params.nodes.length === 0) return;
  const nodeId = params.nodes[0];

  animateNode(nodeId);
  showDetail(nodeId);
});
function animateNode(id) {
  // 1) 모든 노드 투명하게
  nodes.forEach((node) => {
    if (node.id !== id) {
      nodes.update({ id: node.id, opacity: 0.2 });
    }
  });

  // 2) 클릭된 노드만 scale-up
  nodes.update({
    id,
    size: 50, // 기본보다 크게
    font: { size: 26 },
  });
}
function showDetail(id) {
  const detail = document.getElementById("detail-card");
  const title = document.getElementById("detail-title");
  const content = document.getElementById("detail-content");

  const map = {
    2: {
      title: "Skills",
      content: "HTML/CSS, JavaScript, React, UI/UX...",
    },
    3: {
      title: "Projects",
      content: "공방 클래스 플랫폼, 리뷰/QnA UI, 반응형 UI...",
    },
    4: {
      title: "About Me",
      content: "수학 마인드맵 연구, 에듀테크 경험...",
    },
    5: {
      title: "UI Works",
      content: "UI 카드, 슬라이더, 검색/필터, 모달 등...",
    },
    6: {
      title: "Contact",
      content: "메일, GitHub, 노션 링크 등...",
    },
  };

  title.innerText = map[id].title;
  content.innerText = map[id].content;

  detail.classList.remove("hidden");

  setTimeout(() => {
    detail.classList.add("show");
  }, 30);
}
