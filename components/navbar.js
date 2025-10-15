// app.js

let isAuthenticated = localStorage.getItem("isAuthenticated") || false; // Initial authentication state
const user = JSON.parse(localStorage.getItem("currentUser")) || null;
const nickname = user?.profile?.nickname || "Player"; // User's nickname
const headerElement = document.getElementById("main-header");

// Function to handle login/logout and re-render the navbar
const actions = {
    login: () => {
        // isAuthenticated = true;
        // localStorage.setItem("isAuthenticated", "true");

        window.location.href = "signin.html";
        renderNavbar();
    },
    logout: () => {
        localStorage.removeItem("isAuthenticated");
        window.location.href = "./index.html";
        isAuthenticated = false;
        renderNavbar();
        alert("You have been signed out.");
    },
    signup: () => {
        window.location.href = "./signup.html";
        renderNavbar();
    },
};

// Function to generate the navigation links with active state hover effect
const generateNavLink = (text, href) => `
  <a href="${href}" class="font-paragraph text-lg font-[100] text-primary-200  transition-colors relative group">
    ${text}
    <span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
  </a>
`;

// Function to generate the correct navbar HTML
const renderNavbar = () => {
    let userControls;

    if (isAuthenticated) {
        userControls = `
      <div class="flex items-center gap-6">
        ${generateNavLink("Game", "./game.html")}
        ${generateNavLink("Profile", "./profile.html")}        
        ${generateNavLink("Rankings", "./rankings.html")}

        <div class="flex items-center gap-4 bg-background-green rounded-2xl px-4 py-2 ">
          <span class="font-paragraph text-sm text-primary">
            ${nickname || "Player"}
          </span>
          <button id="signOutButton"
                  class="border border-primary  h-8 w-18  text-primary text-xs  hover:bg-primary hover:text-secondary hover:cursor-pointer px-2 py-2 rounded-md transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    `;
    } else {
        userControls = `
      <div class="flex items-center gap-4">
      ${generateNavLink("Rankings", "./rankings.html")}

        <button id="signInButton"
                class="border  font-bold px-4 py-2 rounded-md transition-colors text-sm hover:bg-primary hover:text-secondary">
          Sign In
        </button>
        <button id="signUpButton"
                class="bg-primary text-secondary hover:bg-primary/20 font-medium px-6 py-2 rounded-md transition-colors">
          Sign Up
        </button>
      </div>
    `;
    }

    const navbarHTML = `
    <div class="max-w-[120rem] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <nav class="flex justify-between items-center">
        <a href="./index.html"
           class="font-heading text-3xl font-bold text-primary  transition-colors">
          MemoryMaster
        </a>
        <div class="flex items-center gap-3">
        ${userControls}
        </div>
      </nav>
    </div>
  `;

    headerElement.innerHTML = navbarHTML;

    // Add event listeners after the HTML is rendered
    if (isAuthenticated) {
        document
            .getElementById("signOutButton")
            .addEventListener("click", actions.logout);
    } else {
        document
            .getElementById("signInButton")
            .addEventListener("click", actions.login);
        document
            .getElementById("signUpButton")
            .addEventListener("click", actions.signup);
    }
};

// Initial render
document.addEventListener("DOMContentLoaded", renderNavbar);
