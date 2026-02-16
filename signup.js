async function signup() {

    // Get values (MATCH HTML IDs)
    const fname = document.getElementById("fname").value.trim();
    const lname = document.getElementById("lname").value.trim();

    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;


    // Validation
    if (!fname || !lname || !email || !password || !password1) {
        alert("Please fill all fields");
        return;
    }

    if (password !== password1) {
        alert("Passwords do not match");
        return;
    }


    try {

        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: fname + " " + lname, // combine name
                email: email,
                password: password
            })
        });

        const data = await res.json();

        console.log("Signup response:", data);


        if (res.ok) {

            // Show success message
            const message = document.getElementById("draftMessage");
            if (message) {
                message.style.display = "block";
            }

            // Redirect after 1 second
            setTimeout(() => {
                window.location.href = "signin.html";
            }, 1000);

        } else {

            alert(data.msg || "Signup failed");

        }

    } catch (error) {

        console.error("Signup error:", error);

        alert("Server not responding");

    }
}
