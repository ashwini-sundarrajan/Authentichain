let allDrafts = [];

document.addEventListener("DOMContentLoaded", () => {
    loadDrafts();
});


// Load drafts
async function loadDrafts() {

    try {

        const res = await fetch("http://localhost:3000/drafts");

        allDrafts = await res.json();

        displayDrafts(allDrafts);

    } catch (err) {
        console.error(err);
        alert("Failed to load drafts");
    }
}


// Show drafts
function displayDrafts(drafts) {

    const container = document.getElementById("draftList");
    container.innerHTML = "";

    if (drafts.length === 0) {
        container.innerHTML = "<p>No drafts found.</p>";
        return;
    }

    drafts.forEach(book => {

        const card = document.createElement("div");
        card.className = "draft-card";

        card.innerHTML = `
          <div class="draft-item">

            <img src="book.jpg" alt="Book">

            <div class="draft-info">
              <p class="date">
                Saved on ${new Date(book.createdAt).toDateString()}
              </p>

              <h3>${book.title || "Untitled"}</h3>

              <p class="author">
                Authored by ${book.author || "Unknown"}
              </p>
            </div>

            <i class="fa-solid fa-chevron-right arrow"></i>

          </div>
        `;

        card.onclick = () => {
            window.location.href =
              `start2.html?id=${book._id}`;
        };

        container.appendChild(card);
    });
}


// Search filter
document.addEventListener("input", (e) => {

    if (!e.target.matches(".search-box input")) return;

    const value = e.target.value.toLowerCase();

    const filtered = allDrafts.filter(book =>

        (book.title &&
         book.title.toLowerCase().includes(value)) ||

        (book.author &&
         book.author.toLowerCase().includes(value))

    );

    displayDrafts(filtered);

});
