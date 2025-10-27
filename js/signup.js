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

// Sign-up function (async)
async function signUp(username, email, password) {
    // Validate input
    if (!username || !email || !password) {
        return { success: false, message: "All fields are required." };
    }

    // Hash the password
    const passwordHash = await hashPassword(password);

    // Check if the username already exists
    let users = JSON.parse(localStorage.getItem("users") || "{}");
    if (users[username]) {
        return {
            success: false,
            message: "Username already exists. Please choose another.",
        };
    }

    // Create a new user object
    const user = {
        profile: {
            nickname: username,
            avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
                username
            )}`,
        },
        contact: {
            loginEmail: email,
        },
        _createdDate: new Date().toISOString(),
        lastLoginDate: new Date().toISOString(),
        gameStats: {
            gamesPlayed: 0,
            bestScore: null,
            averageScore: null,
            totalMatches: 0,
            winStreak: 0,
            achievements: [],
            rank: "Beginner",
        },
        passwordHash,
    };

    // Save the user to localStorage
    users[username] = user;
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    // Successful sign-up
    return { success: true, message: "Sign-up successful.", user };
}

// Handle form submission
document
    .getElementById("signup-form")
    .addEventListener("submit", async function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        // console.log(username, email, password);
        const result = await signUp(username, email, password);
        alert(result.message);

        if (result.success) {
            localStorage.setItem("isAuthenticated", true);

            window.location.href = "./";
        }
    });
