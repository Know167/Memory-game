const gameBoard = document.getElementById("game-board");
const movesCount = document.getElementById("moves-count");
const matchesCount = document.getElementById("matches-count");
const finalScore = document.getElementById("final-score");
const gameCompleteModal = document.getElementById("game-complete-modal");

const cardSymbols = [
    "🎮",
    "🎲",
    "🎪",
    "🎨",
    "🎭",
    "🎸",
    "🎺",
    "🎵",
    "🎬",
    "🎯",
    "🎧",
    "🎷",
];

let cards = [];
let flippedCards = [];
let moves = 0;
let matches = 0;
let gameComplete = false;

const initializeGame = () => {
    // Reset game state
    const isAuthenticated = localStorage.getItem("isAuthenticated") || false; // Initial authentication state
    if (!isAuthenticated) {
        alert("Please sign in to play the game.");
        window.location.href = "./signin.html"; // Redirect to sign-in page
        return;
    }
    cards = [...cardSymbols, ...cardSymbols]
        .sort(() => Math.random() - 0.5)
        .map((symbol, index) => ({
            id: index,
            value: symbol,
            isFlipped: false,
            isMatched: false,
        }));
    flippedCards = [];
    moves = 0;
    matches = 0;
    gameComplete = false;

    // Update UI
    movesCount.textContent = moves;
    matchesCount.textContent = matches + "/" + cardSymbols.length;
    renderGameBoard();
    gameCompleteModal.style.display = "none";
};

const handleCardClick = (cardId) => {
    if (
        flippedCards.length === 2 ||
        cards[cardId].isFlipped ||
        cards[cardId].isMatched
    ) {
        return;
    }

    // Flip the clicked card
    cards[cardId].isFlipped = true;
    flippedCards.push(cardId);
    renderGameBoard();

    // Check for a match if two cards are flipped
    if (flippedCards.length === 2) {
        moves++;
        movesCount.textContent = moves;

        const [firstCard, secondCard] = flippedCards;

        if (cards[firstCard].value === cards[secondCard].value) {
            // Match found
            setTimeout(() => {
                cards[firstCard].isMatched = true;
                cards[secondCard].isMatched = true;
                flippedCards = [];
                matches++;
                matchesCount.textContent = matches + "/" + cardSymbols.length;

                // Check if the game is complete
                if (matches === cardSymbols.length) {
                    gameComplete = true;
                    const user =
                        JSON.parse(localStorage.getItem("currentUser")) || null;
                    if (user) {
                        // Update user basic stats

                        if (
                            user.gameStats.bestScore === null ||
                            moves < user.gameStats.bestScore
                        ) {
                            user.gameStats.bestScore = moves;
                        }
                        if (user.gameStats.averageScore === null) {
                            user.gameStats.averageScore = moves;
                        }
                        if (user.gameStats.averageScore !== null) {
                            user.gameStats.averageScore = Math.round(
                                (user.gameStats.averageScore *
                                    user.gameStats.gamesPlayed +
                                    moves) /
                                    (user.gameStats.gamesPlayed + 1)
                            );
                        }
                        // Update other stats
                        user.gameStats.gamesPlayed += 1;
                        user.gameStats.totalMatches += matches;
                        user.gameStats.winStreak += 1;

                        // Update rank based on games played
                        if (user.gameStats.gamesPlayed >= 100) {
                            user.gameStats.rank = "Master";
                        }
                        if (user.gameStats.gamesPlayed >= 50) {
                            user.gameStats.rank = "Expert";
                        }
                        if (user.gameStats.gamesPlayed >= 20) {
                            user.gameStats.rank = "Pro Gamer";
                        } else if (user.gameStats.gamesPlayed >= 10) {
                            user.gameStats.rank = "Advanced";
                        } else if (user.gameStats.gamesPlayed >= 5) {
                            user.gameStats.rank = "Intermediate";
                        } else {
                            user.gameStats.rank = "Beginner";
                        }

                        if (user.gameStats.gamesPlayed === 1) {
                            user.gameStats.achievements.push("First Victory");
                        }
                        if (moves <= 16) {
                            user.gameStats.achievements.push("Speed Demon");
                        }
                        if (user.gameStats.gamesPlayed % 10 === 0) {
                            user.gameStats.achievements.push("Consistency");
                        }
                        localStorage.setItem(
                            "currentUser",
                            JSON.stringify(user)
                        );
                        let users = JSON.parse(
                            localStorage.getItem("users") || "{}"
                        );
                        users[user.profile.nickname] = user;
                        localStorage.setItem("users", JSON.stringify(users));
                    }

                    finalScore.textContent = moves;
                    gameCompleteModal.style.display = "flex";
                }

                renderGameBoard();
            }, 1000);
        } else {
            // No match
            setTimeout(() => {
                cards[firstCard].isFlipped = false;
                cards[secondCard].isFlipped = false;
                flippedCards = [];
                renderGameBoard();
            }, 1000);
        }
    }
};

const renderGameBoard = () => {
    gameBoard.innerHTML = ""; // Clear the board
    cards.forEach((card) => {
        const cardElement = document.createElement("div");
        cardElement.className = `w-32 h-32 rounded-md border mx-auto bg-secondary text-primary cursor-pointer flex items-center justify-center text-lg md:text-2xl font-bold transition-all duration-300 ${
            card.isFlipped || card.isMatched
                ? "text-white border-green-500 shadow-lg text-4xl lg:text-5xl"
                : " text-primary border-gray-300  hover:shadow-lg"
        } ${card.isMatched ? "ring-1 ring-green-500 ring-opacity-30" : ""}`;
        cardElement.textContent =
            card.isFlipped || card.isMatched ? card.value : "?";
        cardElement.onclick = () => handleCardClick(card.id);
        gameBoard.appendChild(cardElement);
    });
};

// Initialize the game on page load
initializeGame();
