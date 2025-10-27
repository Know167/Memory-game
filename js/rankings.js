// Mock leaderboard data
const players = [
    {
        id: "1",
        name: "Alex Chen",
        bestScore: 8,
        gamesPlayed: 156,
        rank: "Grandmaster",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        bestScore: 9,
        gamesPlayed: 142,
        rank: "Master",
    },
    {
        id: "3",
        name: "Mike Rodriguez",
        bestScore: 10,
        gamesPlayed: 98,
        rank: "Expert",
    },
    {
        id: "4",
        name: "Emma Wilson",
        bestScore: 11,
        gamesPlayed: 87,
        rank: "Advanced",
    },
    {
        id: "5",
        name: "David Kim",
        bestScore: 12,
        gamesPlayed: 76,
        rank: "Intermediate",
    },
    {
        id: "6",
        name: "Lisa Zhang",
        bestScore: 13,
        gamesPlayed: 65,
        rank: "Intermediate",
    },
    {
        id: "7",
        name: "Tom Anderson",
        bestScore: 14,
        gamesPlayed: 54,
        rank: "Beginner",
    },
    {
        id: "8",
        name: "Anna Petrov",
        bestScore: 15,
        gamesPlayed: 43,
        rank: "Beginner",
    },
    {
        id: "9",
        name: "Carlos Silva",
        bestScore: 16,
        gamesPlayed: 32,
        rank: "Novice",
    },
    {
        id: "10",
        name: "Maya Patel",
        bestScore: 17,
        gamesPlayed: 21,
        rank: "Novice",
    },
];

// Utility functions
const getRankStyles = (position) => {
    switch (position) {
        case 1:
            return {
                avatarBg: "bg-secondary text-primary",
                cardBg: "bg-primary text-secondary",
                titleBg: "bg-secondary text-primary",
                title: "Grandmaster",
            };
        case 2:
            return {
                avatarBg: "bg-primary text-secondary",
                cardBg: "bg-secondary text-primary",
                titleBg: "bg-primary text-secondary",
                title: "Master",
            };
        case 3:
            return {
                avatarBg: "bg-primary text-secondary",
                cardBg: "bg-white text-secondary",
                titleBg: "bg-primary text-secondary",
                title: "Expert",
            };
        default:
            return {
                avatarBg: "bg-gray-300 text-gray-700",
                cardBg: "bg-background border border-mediumgray",
                titleBg: "bg-gray-300 text-gray-700",
                title: "Player",
            };
    }
};

const getRankIcon = (position) => {
    switch (position) {
        case 1:
            return `<svg class="h-6 w-6 text-yellow-500"><use href="#crown-icon"></use></svg>`;
        case 2:
            return `<svg class="h-6 w-6 text-gray-400"><use href="#trophy-icon"></use></svg>`;
        case 3:
            return `<svg class="h-6 w-6 text-amber-600"><use href="#medal-icon"></use></svg>`;
        default:
            return `<svg class="h-5 w-5 text-mediumgray"><use href="#award-icon"></use></svg>`;
    }
};

const getInitials = (name) => {
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
};

// Render Top 3 Players
const renderTop3Players = () => {
    const top3Container = document.getElementById("top-three-players");
    top3Container.innerHTML = "";

    players.slice(0, 3).forEach((player, index) => {
        const rankStyles = getRankStyles(index + 1);

        const playerCard = document.createElement("div");
        playerCard.className = `${
            index === 0
                ? "md:order-2 md:scale-110"
                : index === 1
                ? "md:order-1"
                : "md:order-3"
        }`;

        playerCard.innerHTML = `
            <div class="${
                rankStyles.cardBg
            } p-8 rounded-3xl text-center relative overflow-hidden">
                ${
                    index === 0
                        ? `<div class="absolute top-4 right-4"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-crown-icon lucide-crown h-8 w-8 text-yellow-500"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z"/><path d="M5 21h14"/></svg>
                        </div>`
                        : ""
                }
                <div class="relative z-10">
                    <div class="w-20 h-20 mx-auto mb-4 border-4 border-current rounded-full overflow-hidden ${
                        rankStyles.avatarBg
                    }">
                        ${
                            player.avatar
                                ? `<img src="${player.avatar}" alt="${player.name}" class="w-full h-full object-cover" />`
                                : `<div class="w-full h-full flex items-center justify-center text-xl font-bold">
                                    ${getInitials(player.name)}
                                </div>`
                        }
                    </div>
                    <h3 class="font-heading text-2xl font-bold mb-2">${
                        player.name
                    }</h3>
                    <div class="${
                        rankStyles.titleBg
                    } px-3 py-1 rounded-full mb-4">
                        ${rankStyles.title}
                    </div>
                    <div class="space-y-2 font-paragraph text-sm">
                        <div class="flex justify-between">
                            <span>Best Score:</span>
                            <span class="font-bold">${
                                player.bestScore
                            } moves</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Games:</span>
                            <span class="font-bold">${player.gamesPlayed}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        top3Container.appendChild(playerCard);
    });
};

// Render Full Leaderboard
const renderLeaderboard = () => {
    const leaderboardContainer = document.getElementById("leaderboard");
    leaderboardContainer.innerHTML = "";

    players.forEach((player, index) => {
        const rankStyles = getRankStyles(index + 1);

        const playerCard = document.createElement("div");
        playerCard.className = `${rankStyles.cardBg} p-6 rounded-3xl flex items-center justify-between`;

        playerCard.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-2xl ${
                        rankStyles.avatarBg
                    } flex items-center justify-center font-heading text-xl font-bold">
                        ${index + 1}
                    </div>
                    ${getRankIcon(index + 1)}
                </div>
                <div>
                    <h3 class="font-heading text-xl font-bold">${
                        player.name
                    }</h3>
                    <p class="font-paragraph text-sm opacity-70">${
                        rankStyles.title
                    }</p>
                </div>
            </div>
            <div class="text-right">
                <div class="font-heading text-2xl font-bold">${
                    player.bestScore
                }</div>
                <div class="font-paragraph text-sm opacity-70">moves</div>
                <div class="font-paragraph text-xs opacity-50">${
                    player.gamesPlayed
                } games</div>
            </div>
        `;

        leaderboardContainer.appendChild(playerCard);
    });
};

// Initialize leaderboard on page load
document.addEventListener("DOMContentLoaded", () => {
    renderTop3Players();
    renderLeaderboard();
});
