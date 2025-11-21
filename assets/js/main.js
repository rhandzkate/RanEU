document.addEventListener("DOMContentLoaded", () => {
    // ==========================
    // Mobile Navigation Toggle
    // ==========================
    const navToggle = document.querySelector(".nav-toggle");
    const siteNav = document.querySelector(".site-nav");

    if (navToggle && siteNav) {
        navToggle.addEventListener("click", () => {
            siteNav.classList.toggle("nav-open");
            navToggle.classList.toggle("open");
        });

        // Close nav when clicking a link
        document.querySelectorAll(".site-nav a").forEach(link => {
            link.addEventListener("click", () => {
                siteNav.classList.remove("nav-open");
                navToggle.classList.remove("open");
            });
        });
    }

    // ==========================
    // Background Music Control
    // ==========================
    const bgMusic = document.getElementById("bg-music");
    if (bgMusic) {
        // Try autoplay, fallback to user interaction
        bgMusic.play().catch(() => {
            document.body.addEventListener("click", () => {
                bgMusic.play();
            }, { once: true });
        });

        // Add toggle button
        const musicBtn = document.createElement("button");
        musicBtn.textContent = "🔊 Music On";
        musicBtn.className = "music-toggle";
        document.body.appendChild(musicBtn);

        musicBtn.addEventListener("click", () => {
            bgMusic.muted = !bgMusic.muted;
            musicBtn.textContent = bgMusic.muted ? "🔇 Music Off" : "🔊 Music On";
        });
    }

    // ==========================
    // Gallery Lightbox
    // ==========================
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.querySelector(".lightbox-img");
    const lightboxClose = document.querySelector(".lightbox-close");

    if (lightbox && lightboxImg && lightboxClose) {
        document.querySelectorAll(".gallery-grid img").forEach(img => {
            img.addEventListener("click", () => {
                lightboxImg.src = img.src;
                lightbox.classList.add("active");
                lightbox.setAttribute("aria-hidden", "false");
            });
        });

        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
        });

        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
                lightbox.setAttribute("aria-hidden", "true");
            }
        });
    }

    // ==========================
    // Lazy Loading Videos
    // ==========================
    document.querySelectorAll("iframe").forEach(iframe => {
        iframe.setAttribute("loading", "lazy");
    });

    // ==========================
    // Scroll To Top Button
    // ==========================
    const scrollBtn = document.createElement("button");
    scrollBtn.textContent = "⬆ Top";
    scrollBtn.className = "scroll-top";
    document.body.appendChild(scrollBtn);

    scrollBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add("visible");
        } else {
            scrollBtn.classList.remove("visible");
        }
    });
});

// ==========================
// Load More News Section
// ==========================
const loadMoreBtn = document.getElementById("loadMoreNews");
const newsList = document.querySelector(".news-list");

if (loadMoreBtn && newsList) {
    loadMoreBtn.addEventListener("click", () => {
        // Example: dynamically add more news items
        const newArticle = document.createElement("article");
        newArticle.className = "news-item";
        newArticle.innerHTML = `
      <time datetime="2025-12-01">Dec 1, 2025</time>
      <h3>Holiday Event</h3>
      <p>Celebrate the season with double EXP and exclusive rewards!</p>
    `;
        newsList.appendChild(newArticle);
    });
}




document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const chatMessages = document.getElementById("chat-messages");
    const chatInput = document.getElementById("chat-input");
    const chatSend = document.getElementById("chat-send");
    const chatToggle = document.getElementById("chat-toggle");
    const chatClear = document.getElementById("chat-clear");

    // Load saved messages from localStorage
    let savedMessages = JSON.parse(localStorage.getItem("chatHistory")) || [];
    savedMessages.forEach(msg => {
        addMessage(msg.text, msg.type);
    });

    function addMessage(text, type = "chat-user") {
        const div = document.createElement("div");
        div.className = "chat-message " + type;
        div.textContent = text;
        chatMessages.appendChild(div);
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Save to localStorage
        savedMessages.push({ text, type });
        localStorage.setItem("chatHistory", JSON.stringify(savedMessages));
    }

    if (chatSend && chatInput && chatMessages) {
        chatSend.addEventListener("click", () => {
            const msg = chatInput.value.trim();
            if (msg) {
                addMessage("You: " + msg, "chat-user");
                chatInput.value = "";

                // Demo bot reply
                setTimeout(() => {
                    addMessage("Bot: This is an offline demo reply.", "chat-bot");
                }, 800);
            }
        });

        chatInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                chatSend.click();
            }
        });
    }

    // Toggle minimize/maximize
    if (chatToggle) {
        chatToggle.addEventListener("click", () => {
            chatBox.classList.toggle("collapsed");
            chatToggle.textContent = chatBox.classList.contains("collapsed") ? "+" : "−";
        });
    }

    // Clear chat history
    if (chatClear) {
        chatClear.addEventListener("click", () => {
            chatMessages.innerHTML = "";
            savedMessages = [];
            localStorage.removeItem("chatHistory");
        });
    }
});



