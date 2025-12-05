/* 0) DOM 로드 후 실행 */
document.addEventListener("DOMContentLoaded", () => {
  initSmoothScroll();
  initMindmapHoverMotion();
  initSectionObserver();
});

/* 1) 부드러운 스크롤 이동 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") return;
      if (!href.startsWith("#")) return;

      e.preventDefault();
      const target = document.querySelector(href);
      if (!target) return;

      const offsetTop = target.offsetTop - 70; // 헤더 높이만큼 보정

      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    });
  });
}

/* 2) 마인드맵 노드 호버 모션 (살짝 흔들리는 느낌) */
function initMindmapHoverMotion() {
  const nodes = document.querySelectorAll(".mindmap__node");

  nodes.forEach((node) => {
    node.addEventListener("mouseenter", () => {
      node.animate(
        [
          { transform: "scale(1) translateY(0px)" },
          { transform: "scale(1.05) translateY(-3px)" },
          { transform: "scale(1.05) translateY(0px)" },
        ],
        {
          duration: 250,
          easing: "ease-out",
        }
      );
    });
  });
}

/* 3) 현재 섹션에 따라 메뉴 하이라이트 */
function initSectionObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".main-nav a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute("id");
        const nav = document.querySelector(`.main-nav a[href="#${id}"]`);

        if (entry.isIntersecting && nav) {
          navLinks.forEach((item) => item.classList.remove("active"));
          nav.classList.add("active");
        }
      });
    },
    {
      threshold: 0.5, // 화면 절반 정도 보이면 active로 인식
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

document.querySelector(".logo").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Top Button
const topBtn = document.getElementById("topButton");

// 누르면 부드럽게 최상단 이동
topBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// 모달 요소들
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");
const closeBtn = document.querySelector(".modal-close");

// 모든 preview 이미지에 이벤트 추가
document.querySelectorAll(".preview-img").forEach((img) => {
  img.addEventListener("click", () => {
    modal.style.display = "block";
    modalImg.src = img.src;
    captionText.innerHTML = img.alt || "";
    document.body.style.overflow = "hidden"; // 모달 열릴 때 스크롤 잠금
  });
});

// 닫기 버튼 기능
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// 모달 영역 클릭 시 닫기
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// 전화번호 복사 기능
document.addEventListener("DOMContentLoaded", () => {
  const phoneEl = document.querySelector(".copy-phone");
  const messageEl = document.getElementById("copyMessage");

  if (phoneEl) {
    phoneEl.addEventListener("click", function () {
      const textToCopy = this.dataset.text;

      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          messageEl.textContent = `"${textToCopy}" 복사됨`;
          messageEl.style.opacity = 1;

          // 1.5초 뒤 메시지 숨김
          setTimeout(() => {
            messageEl.style.opacity = 0;
          }, 1500);
        })
        .catch(() => {
          alert("복사를 지원하지 않는 브라우저입니다.");
        });
    });
  }
});
