document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const name     = document.querySelectorAll(".input")[0].value.trim();
    const email    = document.querySelectorAll(".input")[1].value.trim();
    const password = document.querySelectorAll(".input")[2].value;

    if (!name || !email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch("https://your-backend.onrender.com/api/auth/register", ...) {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();

        if (response.ok) {
            alert("Signup successful! Please log in.");
            window.location.href = "login.html";
        } else {
            alert(data.message || "Signup failed. Please try again.");
        }

    } catch (err) {
        console.error("Signup error:", err);
        alert("Could not connect to the server. Make sure the backend is running on port 8080.");
    }
});
