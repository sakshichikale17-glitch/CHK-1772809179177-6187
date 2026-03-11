const API_BASE = "http://localhost:5000/api/story";

const fallbackStories = [
  {
    storyId: "rama-1",
    slug: "birth-of-lord-rama",
    title: "Birth of Lord Rama",
    realm: "Ramayan Realm",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/32/Rama_in_the_forest.jpg",
    difficulty: "Easy",
    value: "Truth",
    progress: 60
  },
  {
    storyId: "rama-2",
    slug: "sita-swayamvar",
    title: "Sita Swayamvar",
    realm: "Ramayan Realm",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/56/Ram-Sita.jpg",
    difficulty: "Medium",
    value: "Courage",
    progress: 0
  },
  {
    storyId: "krishna-1",
    slug: "krishna-butter-leela",
    title: "Krishna Butter Leela",
    realm: "Krishna Leela Realm",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fd/Krishna_butter.jpg",
    difficulty: "Easy",
    value: "Joy",
    progress: 20
  },
  {
    storyId: "abhimanyu-1",
    slug: "abhimanyu",
    title: "Abhimanyu and the Chakravyuh",
    realm: "Mahabharat Realm",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kurukshetra_battle.jpg",
    difficulty: "Hard",
    value: "Courage",
    progress: 40
  }
];

function showStatus(message, isError = false) {
  const statusBox = document.getElementById("statusBox");
  statusBox.style.display = "block";
  statusBox.style.background = isError ? "#ffe5e5" : "#eefcf1";
  statusBox.style.color = isError ? "#c62828" : "#2e7d32";
  statusBox.textContent = message;
}

function getRealmIcon(realm) {
  const value = (realm || "").toLowerCase();

  if (value.includes("ramayan")) return "🏹";
  if (value.includes("krishna")) return "🦚";
  if (value.includes("mahabharat")) return "⚔️";
  if (value.includes("moral")) return "✨";
  if (value.includes("sanskrit")) return "🕉️";
  return "📚";
}

function groupStories(stories) {
  const groupedStories = {};

  stories.forEach((story) => {
    const realm = story.realm || "Story Realm";

    if (!groupedStories[realm]) {
      groupedStories[realm] = [];
    }

    groupedStories[realm].push(story);
  });

  return groupedStories;
}

function renderStories(stories) {
  const storyLibrary = document.getElementById("storyLibrary");

  if (!stories || stories.length === 0) {
    storyLibrary.innerHTML = `
      <div class="empty-box">
        No stories available right now.
      </div>
    `;
    return;
  }

  const groupedStories = groupStories(stories);

  let html = "";

  for (const realm in groupedStories) {
    html += `
      <section class="realm-section">
        <h2 class="realm-title">${getRealmIcon(realm)} ${realm}</h2>
        <div class="story-grid">
    `;

    groupedStories[realm].forEach((story) => {
      html += `
        <div class="story-card">
          <img
            class="story-image"
            src="${story.image || "https://upload.wikimedia.org/wikipedia/commons/3/3c/Kurukshetra_battle.jpg"}"
            alt="${story.title || "Story"}"
            onerror="this.src='https://upload.wikimedia.org/wikipedia/commons/3/3c/Kurukshetra_battle.jpg'"
          >

          <h3>${story.title || "Untitled Story"}</h3>
          <p>Difficulty: ${story.difficulty || "Easy"}</p>
          <p class="value-text">Value: ${story.value || "Wisdom"}</p>

          <a class="enter-btn" href="storyplayer.html?story=${story.slug || "abhimanyu"}">Enter Story</a>

          <div class="progress-bar">
            <div class="progress-fill" style="width:${story.progress || 0}%"></div>
          </div>
        </div>
      `;
    });

    html += `
        </div>
      </section>
    `;
  }

  storyLibrary.innerHTML = html;
}

async function loadStories() {
  try {
    const response = await fetch(API_BASE);
    const text = await response.text();

    let data = {};
    try {
      data = JSON.parse(text);
    } catch (error) {
      throw new Error("Invalid backend response");
    }

    if (!response.ok) {
      throw new Error(data.message || "Failed to load stories");
    }

    renderStories(data.stories || []);
    showStatus("Stories loaded successfully.");
  } catch (error) {
    console.log("Story load error:", error.message);
    renderStories(fallbackStories);
    showStatus("Backend not connected. Demo stories are shown now.", true);
  }
}

document.addEventListener("DOMContentLoaded", loadStories);