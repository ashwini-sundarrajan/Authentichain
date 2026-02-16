document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // VARIABLES
    // ==============================
    let contributorCount = 1;
    const maxContributors = 9;


    // ==============================
    // ADD CONTRIBUTOR
    // ==============================
    window.addContributor = function () {

        if (contributorCount >= maxContributors) {
            alert("You can add up to 9 contributors only.");
            return;
        }

        const container = document.getElementById("contributors-container");

        if (!container) {
            console.error("contributors-container not found");
            return;
        }

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
    // SAVE & CONTINUE (FORM SUBMIT)
    // ==============================
    const form = document.getElementById("bookForm");

    if (!form) {
        console.error("bookForm not found!");
    } else {

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            console.log("Save & Continue clicked"); // Debug

            const titleInput = document.querySelector("input[name='title']");
            const subtitleInput = document.querySelector("input[name='subtitle']");
            const authorInput = document.querySelector("input[name='author']");
            const descriptionInput = document.querySelector("textarea[name='description']");
            const rightsInput = document.querySelector("input[name='rights']:checked");

            const data = {
                title: titleInput ? titleInput.value : "",
                subtitle: subtitleInput ? subtitleInput.value : "",
                author: authorInput ? authorInput.value : "",
                description: descriptionInput ? descriptionInput.value : "",
                rights: rightsInput ? rightsInput.value : null,
                status: "in-progress"
            };

            console.log("Sending data:", data); // Debug

            try {

                const res = await fetch("http://localhost:3000/save-book", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                if (res.ok) {
                    console.log("Saved successfully");
                    window.location.href = "start2.html";
                } else {
                    console.error("Server error:", res.status);
                    alert("Failed to save. Try again.");
                }

            } catch (error) {

                console.error("Fetch error:", error);
                alert("Server not responding.");

            }

        });

    }


    // ==============================
    // SAVE AS DRAFT
    // ==============================
    const draftBtn = document.getElementById("saveDraftBtn");

    if (draftBtn) {

        draftBtn.addEventListener("click", () => {

            console.log("Save Draft clicked"); // Debug

            // Show message
            const message = document.getElementById("draftMessage");
            if (message) {
                message.style.display = "block";
            }

            // Redirect
            setTimeout(() => {
                window.location.href = "home.html";
            }, 800);


            // Save in background
            fetch("http://localhost:3000/save-book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "draft"
                })
            })
            .then(() => {
                console.log("Draft saved");
            })
            .catch(() => {
                console.log("Draft saved locally only");
            });

        });

    } else {
        console.warn("saveDraftBtn not found");
    }

});
