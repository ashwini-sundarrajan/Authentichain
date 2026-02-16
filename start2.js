const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");


// Back button
document.getElementById("backBtn").addEventListener("click", () => {

    if (!bookId) {
        window.location.href = "start.html";
        return;
    }

    window.location.href =
      `start.html?id=${bookId}`;
});
