// Mock data for the profile and game stats
const placeholdermember = {
    profile: {
        nickname: "Alex Chen",
    },
    contact: {
        firstName: "Alex",
        lastName: "Chen",
        loginEmail: "alex.chen@example.com",
    },
    _createdDate: "2023-01-15",
    lastLoginDate: "2023-10-10",
    gameStats: {
        gamesPlayed: 47,
        bestScore: 12,
        averageScore: 18,
        totalMatches: 234,
        winStreak: 5,
        rank: "Memory Master",
    },
};
const member =
    JSON.parse(localStorage.getItem("currentUser")) || placeholdermember;
// Utility functions
const getInitials = (nickname) => {
    if (nickname) return nickname.slice(0, 2).toUpperCase();

    return "U";
};

const formatDate = (date) => {
    if (!date) return "Unknown";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Render Profile Info
const renderProfileInfo = () => {
    const profileInfoContainer = document.getElementById("profile-info");
    profileInfoContainer.innerHTML = `
        <div class="bg-primary text-primary-foreground p-8 rounded-3xl border-0">
            <div class="text-center">
                <div class="w-24 h-24 mx-auto mb-4 border-4 border-black rounded-full overflow-hidden">
                    ${
                        member.profile.photo
                            ? `<img src="${member.profile.photo}" alt="${member.profile.nickname}" class="w-full h-full object-cover" />`
                            : `<div class="bg-primary text-secondary text-2xl font-bold flex items-center justify-center w-full h-full">
                                ${getInitials(member.profile.nickname)}
                            </div>`
                    }
                </div>
                <h1 class="font-heading text-3xl font-bold mb-2">
                    ${member.profile.nickname || "Player"}
                </h1>
                <div class="w-fit flex justify-center items-center mx-auto bg-secondary text-primary font-paragraph text-sm mb-4 px-3 py-1 rounded-lg">
                    ${member.gameStats.rank}
                </div>
                <div class="space-y-3 font-paragraph text-sm font-thin">
                    <div class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-icon lucide-calendar h-4 w-4"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>
                        <span>Joined ${formatDate(member._createdDate)}</span>
                    </div>
                    <div class="text-center opacity-90">${
                        member.contact.loginEmail
                    }</div>
                    <div class="flex items-center justify-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-icon lucide-target font-[1px] w-5 h-5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                        <span>  Last played ${formatDate(
                            member.lastLoginDate
                        )}</span>
                    </div>
                </div>
            </div>
        </div>
    `;
};

// Render Game Statistics
const renderGameStats = () => {
    const gameStatsContainer = document.getElementById("game-stats");
    gameStatsContainer.innerHTML = `
        <h2 class="font-heading text-4xl font-bold text-secondary mb-6">Game Statistics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="bg-secondary text-secondary-foreground p-6 rounded-3xl border-0">
                <div class="flex items-center gap-4">
                    <div class="bg-primary text-secondary rounded-2xl p-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy-icon lucide-trophy h-8 w-8"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/></svg>
                    </div>
                    <div>
                        <div class="font-heading text-3xl font-bold">${
                            member.gameStats.bestScore ||
                            "Play your first game!"
                        }</div>
                        <div class="font-paragraph text-sm opacity-90">Best Score (moves)</div>
                    </div>
                </div>
            </div>
            <div class="bg-background border-2 border-mediumgray p-6 rounded-3xl">
                <div class="flex items-center gap-4">
                    <div class="bg-primary text-primary-foreground rounded-2xl p-3"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-icon lucide-brain h-8 w-8"><path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/></svg>
                    </div>
                    <div>
                        <div class="font-heading text-3xl font-bold text-secondary">${
                            member.gameStats.gamesPlayed
                        }</div>
                        <div class="font-paragraph text-sm text-secondary opacity-70">Games Played</div>
                    </div>
                </div>
            </div>
            <div class="bg-background border-2 border-mediumgray p-6 rounded-3xl">
                <div class="text-center">
                    <div class="font-heading text-2xl font-bold text-secondary mb-1">${
                        member.gameStats.averageScore || "Nothing yet"
                    }</div>
                    <div class="font-paragraph text-sm text-secondary opacity-70">Average Score</div>
                </div>
            </div>
            <div class="bg-background border-2 border-mediumgray p-6 rounded-3xl">
                <div class="text-center">
                    <div class="font-heading text-2xl font-bold text-secondary mb-1">${
                        member.gameStats.winStreak
                    }</div>
                    <div class="font-paragraph text-sm text-secondary opacity-70">Current Streak</div>
                </div>
            </div>
            <div class="bg-primary text-primary-foreground p-6 rounded-3xl border-0 md:col-span-2">
                <div class="text-center">
                    <div class="font-heading text-4xl font-bold mb-2">${
                        member.gameStats.totalMatches
                    }</div>
                    <div class="font-paragraph text-lg">Total Matches Found</div>
                    <div class="font-paragraph text-sm opacity-90 mt-2">Keep playing to improve your memory skills!</div>
                </div>
            </div>
        </div>
    `;
};

// Render Achievements
const renderAchievements = () => {
    const hasFirstVictory =
        member.gameStats.achievements.includes("First Victory");
    const hasSpeedDemon = member.gameStats.achievements.includes("Speed Demon");
    const hasConsistency =
        member.gameStats.achievements.includes("Consistency");
    const achievementsContainer = document.getElementById("achievements");
    achievementsContainer.innerHTML = `
        <h2 class="font-heading text-4xl font-bold text-secondary mb-6">Achievements</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-background border-2 ${
                hasFirstVictory
                    ? "border-primary"
                    : "border-mediumgray opacity-60"
            } p-6 rounded-3xl">
                <div class="text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trophy-icon lucide-trophy h-12 w-12 ${
                    hasFirstVictory ? "text-primary" : "text-mediumgray"
                } mx-auto mb-3"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978"/><path d="M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978"/><path d="M18 9h1.5a1 1 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z"/><path d="M6 9H4.5a1 1 0 0 1 0-5H6"/></svg>
                    <h3 class="font-heading text-xl font-bold text-secondary mb-2">First Victory</h3>
                    <p class="font-paragraph text-sm text-secondary ${
                        hasFirstVictory ? "" : "opacity-70"
                    }">Complete your first game</p>
                    <div class="${
                        hasFirstVictory
                            ? "bg-primary text-primary-foreground"
                            : "bg-mediumgray text-gray-700"
                    } mt-3 px-3 py-1 rounded-full">${
        hasFirstVictory ? "Unlocked" : "Locked"
    }</div>
                </div>
            </div>
            <div class="bg-background border-2 ${
                hasSpeedDemon
                    ? "border-primary"
                    : "border-mediumgray opacity-60"
            } p-6 rounded-3xl">
                <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-brain-icon lucide-brain h-12 w-12 ${
                    hasSpeedDemon ? "text-primary" : "text-mediumgray"
                } mx-auto mb-3"><path d="M12 18V5"/><path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"/><path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"/><path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"/><path d="M18 18a4 4 0 0 0 2-7.464"/><path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"/><path d="M6 18a4 4 0 0 1-2-7.464"/><path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"/></svg>
                    <h3 class="font-heading text-xl font-bold text-secondary mb-2">Speed Demon</h3>
                    <p class="font-paragraph text-sm text-secondary ${
                        hasSpeedDemon ? "" : "opacity-70"
                    }">Complete a game in under 16 moves</p>
                    <div class="${
                        hasSpeedDemon
                            ? "bg-primary text-primary-foreground"
                            : "bg-mediumgray text-gray-700"
                    } mt-3 px-3 py-1 rounded-full">${
        hasSpeedDemon ? "Unlocked" : "Locked"
    }</div>
                </div>
            </div>
            <div class="bg-background border-2 ${
                hasConsistency
                    ? "border-primary"
                    : "border-mediumgray opacity-60"
            } p-6 rounded-3xl">
                <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-target-icon lucide-target h-12 w-12 ${
                    hasConsistency ? "text-primary" : "text-mediumgray"
                } mx-auto mb-3"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                    <h3 class="font-heading text-xl font-bold text-secondary mb-2">Consistency</h3>
                    <p class="font-paragraph text-sm text-secondary ${
                        hasConsistency ? "" : "opacity-70"
                    }">Play 10 games in a row</p>
                    <div class="${
                        hasConsistency
                            ? "bg-primary text-primary-foreground"
                            : "bg-mediumgray text-gray-700"
                    } mt-3 px-3 py-1 rounded-full">${
        hasConsistency ? "Unlocked" : "Locked"
    }</div>
                </div>
            </div>
        </div>
    `;
};

// Initialize the profile page
document.addEventListener("DOMContentLoaded", () => {
    renderProfileInfo();
    renderGameStats();
    renderAchievements();
});
