async function signup() {

    // Get values
    const name = document.getElementById("name").value.trim();
    const lname = document.getElementById("lname").value.trim();
    const email = document.getElementById("email").value.trim();

    const password = document.getElementById("password").value;
    const password1 = document.getElementById("password1").value;


    // Validation
    if (!name || !lname || !email || !password || !password1) {
        alert("Please fill all fields");
        return;
    }

    if (password !== password1) {
        alert("Passwords do not match");
        return;
    }


    try {

        // Send to backend
        const res = await fetch("http://localhost:3000/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name + " " + lname, // combine both names
                email: email,
                password: password
            })
        });

        const data = await res.json();

        console.log("Signup response:", data);


        if (res.ok) {
            alert("Signup successful!");
            window.location.href = "signin.html"; // go to login
        } else {
            alert(data.msg || "Signup failed");
        }

    } catch (error) {

        console.error("Signup error:", error);
        alert("Server not responding");

    }
}
