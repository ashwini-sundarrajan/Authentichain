async function login() {

    // Get values (clean email)
    const email = document
        .getElementById("email")
        .value
        .trim()
        .toLowerCase();

    const password = document.getElementById("password").value;


    // Validation
    if (!email || !password) {
        alert("Please fill all fields");
        return;
    }


    try {

        // Send to backend
        const res = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const data = await res.json();

        console.log("Login response:", data);


        if (res.ok) {

            alert("Login successful!");

            // Save user info
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect
            window.location.href = "home.html";

        } else {

            alert(data.msg || "Login failed");

        }

    } catch (error) {

        console.error("Login error:", error);
        alert("Server not responding");

    }
}
