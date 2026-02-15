document.addEventListener("DOMContentLoaded", () => {

    let contributorCount = 1;
    const maxContributors = 9;

    // ADD CONTRIBUTOR
    window.addContributor = function () {
        if (contributorCount >= maxContributors) {
            alert("You can add up to 9 contributors only.");
            return;
        }

        const container = document.getElementById("contributors-container");

        const row = document.createElement("div");
        row.className = "contributor-row";

        row.innerHTML = `
            <select class="role-select">
                <option>Author</option>
                <option>Illustrator</option>
                <option>Editor</option>
                <option>Translator</option>
            </select>
            <input type="text" placeholder="Contributor name">
        `;

        container.appendChild(row);
        contributorCount++;
    };

    // ==============================
    // SAVE & CONTINUE
    // ==============================
    document.getElementById("bookForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            title: document.querySelector("input[name='title']").value,
            subtitle: document.querySelector("input[name='subtitle']").value,
            author: document.querySelector("input[name='author']").value,
            description: document.querySelector("textarea[name='description']").value,
            rights: document.querySelector("input[name='rights']:checked")?.value,
            status: "in-progress"
        };

        try {
            const res = await fetch("http://localhost:3000/save-book", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });

            if (res.ok) {
                window.location.href = "start2.html";
            } else {
                alert("Failed to save.");
            }

        } catch (error) {
            console.log(error);
            alert("Server error.");
        }
    });

document.getElementById("saveDraftBtn").addEventListener("click", () => {

    // SHOW MESSAGE IMMEDIATELY
    const message = document.getElementById("draftMessage");
    message.style.display = "block";

    // START REDIRECT TIMER IMMEDIATELY
    setTimeout(() => {
        window.location.href = "home.html";
    }, 800);

    // SAVE IN BACKGROUND (do NOT await)
    fetch("http://localhost:3000/save-book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "draft" })
    }).catch(() => {
        console.log("Saved locally only.");
    });

});

});
