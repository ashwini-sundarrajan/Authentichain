document.addEventListener("DOMContentLoaded", () => {

    let contributorCount = 1;
    const maxContributors = 9;

    // Add Contributor
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

    // Save & Continue
    document.getElementById("bookForm").addEventListener("submit", async (e) => {
        e.preventDefault();

        const contributors = [];

        document.querySelectorAll(".contributor-row").forEach(row => {
            const role = row.querySelector("select").value;
            const name = row.querySelector("input").value;

            if (name.trim() !== "") {
                contributors.push({ role, name });
            }
        });

        const data = {
            title: document.querySelector("input[name='title']").value,
            subtitle: document.querySelector("input[name='subtitle']").value,
            author: document.querySelector("input[name='author']").value,
            description: document.querySelector("textarea[name='description']").value,
            rights: document.querySelector("input[name='rights']:checked")?.value,
            contributors,
            status: "in-progress"
        };

        const res = await fetch("http://localhost:3000/save-book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (result.message === "Saved Successfully") {
            window.location.href = "content.html";
        }
    });


    // Save as Draft
document.getElementById("saveDraftBtn").addEventListener("click", async () => {

    const contributors = [];

    document.querySelectorAll(".contributor-row").forEach(row => {
        const role = row.querySelector("select").value;
        const name = row.querySelector("input").value;

        if (name.trim() !== "") {
            contributors.push({ role, name });
        }
    });

    const data = {
        title: document.querySelector("input[name='title']").value,
        subtitle: document.querySelector("input[name='subtitle']").value,
        author: document.querySelector("input[name='author']").value,
        description: document.querySelector("textarea[name='description']").value,
        rights: document.querySelector("input[name='rights']:checked")?.value,
        contributors,
        status: "draft"   // 👈 IMPORTANT
    };

    await fetch("http://localhost:3000/save-book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

    // Go to home page
    window.location.href = "home.html";
});


});
