// Hash password using SHA-256 (returns a Promise)
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    // Convert buffer to hex string
    return Array.from(new Uint8Array(hashBuffer))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
}

// Sign-in function (async)
async function signIn(username, password) {
    // Retrieve users array from localStorage
    const usersJSON = localStorage.getItem("users");
    if (!usersJSON) {
        return {
            success: false,
            message: "No users found. Please sign up first.",
        };
    }

    const users = JSON.parse(usersJSON);

    // Find the user with the matching username
    const user = users[username];
    if (!user) {
        return {
            success: false,
            message: "Username not found. Please sign up first.",
        };
    }

    // Hash the entered password and compare with the stored hash
    const enteredPasswordHash = await hashPassword(password);
    if (user.passwordHash !== enteredPasswordHash) {
        return {
            success: false,
            message: "Incorrect password. Please try again.",
        };
    }
    // Successful sign-in
    localStorage.setItem("isAuthenticated", "true");
    user.lastLoginDate = new Date().toISOString();
    users[username] = user;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));
    return { success: true, message: "Sign-in successful.", user };
}

// Handle form submission
document
    .getElementById("signin-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value;

        const result = await signIn(username, password);
        alert(result.message);
        if (result.success) {
            window.location.href = "./index.html"; // Redirect to homepage on successful sign-in
        }
    });
