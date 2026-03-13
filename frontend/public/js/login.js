document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const email    = document.querySelectorAll(".input")[0].value.trim();
    const password = document.querySelectorAll(".input")[1].value;

    if (!email || !password) {
        alert("Please enter your email and password.");
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
            // Store user info in localStorage so home.js can display the username
            localStorage.setItem("loggedUser", JSON.stringify({
                id:    data.id,
                name:  data.name,
                email: data.email
            }));

            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert(data.message || "Invalid email or password.");
        }

    } catch (err) {
        console.error("Login error:", err);
        alert("Could not connect to the server. Make sure the backend is running on port 8080.");
    }
});