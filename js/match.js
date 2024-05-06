document.addEventListener("DOMContentLoaded", function () {
    const dateInput = document.getElementById("date");
    dateInput.type = "text";
    dateInput.addEventListener("click", function () {
        dateInput.setAttribute("type", "date");
    });

    const form = document.getElementById("registration-form");
    const matchsList = document.getElementById("matchs-list");
    const typeMatchInput = document.getElementById("type-match");
    const joueur1Input = document.getElementById("joueur1");
    const joueur2Input = document.getElementById("joueur2");
    const commentateurInput = document.getElementById("commentateur");
    const terrainInput = document.getElementById("terrain");

    // Récupérer les données
    const storedMatches = JSON.parse(sessionStorage.getItem("matches")) || [];
    const storedPlayers = JSON.parse(sessionStorage.getItem("participants")) || [];
    const storedTerrains = JSON.parse(sessionStorage.getItem("terrains")) || [];
    const storedCommentateurs = JSON.parse(sessionStorage.getItem("commentateurs")) || [];

    // Mettre à jour les options des champs joueurs, terrains et commentateurs
    updatePlayersList(typeMatchInput.value);
    updateTerrainsList();
    updateCommentateursList();
    displaySavedMatches(); // Afficher les matchs enregistrés

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const typeMatch = typeMatchInput.value;

        const joueur1 = joueur1Input.value.trim();
        const joueur2 = joueur2Input.value.trim();
        const commentateur = commentateurInput.value;
        const terrain = terrainInput.value.trim();
        const date = dateInput.value.trim();

        if (joueur1 !== "" && joueur2 !== "" && commentateur !== "" && terrain !== "" && date !== "") {
            addMatch(joueur1, joueur2, commentateur, terrain, date);
            saveMatch(joueur1, joueur2, commentateur, terrain, date); // Enregistrer le match dans le session storage
            joueur1Input.value = "";
            joueur2Input.value = "";
            commentateurInput.value = "";
            terrainInput.value = "";
            dateInput.value = "";
        }
    });

    function addMatch(joueur1, joueur2, commentateur, terrain, date) {
        const matchDate = new Date(date);
        const day = matchDate.getDate();
        const month = matchDate.getMonth() + 1;
        const year = matchDate.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;
        const li = document.createElement("li");
        li.textContent = `${joueur1} VS ${joueur2}, arbitré par ${commentateur}, au ${terrain}, le ${formattedDate}`;
        matchsList.appendChild(li);
    }

    function saveMatch(joueur1, joueur2, commentateur, terrain, date) {
        const match = {
            joueur1: joueur1,
            joueur2: joueur2,
            commentateur: commentateur,
            terrain: terrain,
            date: date
        };
        storedMatches.push(match);
        sessionStorage.setItem("matches", JSON.stringify(storedMatches));
    }

    typeMatchInput.addEventListener("change", function() {
        const selectedTypeMatch = typeMatchInput.value;
        updatePlayersList(selectedTypeMatch);
    });

    function updatePlayersList(typeMatch) {
        const storedPlayers = JSON.parse(sessionStorage.getItem("participants")) || [];
        const filteredPlayers = storedPlayers.filter(player => {
            return typeMatch === "homme" ? player.genre === "homme" : player.genre === "femme";
        });
        
        // Réinitialiser les champs joueurs
        joueur1Input.innerHTML = "";
        joueur2Input.innerHTML = "";
    
        filteredPlayers.forEach(function(player) {
            const option1 = document.createElement("option");
            option1.value = `${player.prenom} ${player.nom}`;
            option1.textContent = `${player.prenom} ${player.nom}`;
            joueur1Input.appendChild(option1);
    
            const option2 = document.createElement("option");
            option2.value = `${player.prenom} ${player.nom}`;
            option2.textContent = `${player.prenom} ${player.nom}`;
            joueur2Input.appendChild(option2);
        });
    
        // Désactiver l'option sélectionnée dans le joueur 1 dans le joueur 2 et vice versa
        joueur1Input.addEventListener("change", function() {
            const selectedPlayer1 = joueur1Input.value;
            for (let i = 0; i < joueur2Input.options.length; i++) {
                const option = joueur2Input.options[i];
                if (option.value === selectedPlayer1) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            }
        });
    
        joueur2Input.addEventListener("change", function() {
            const selectedPlayer2 = joueur2Input.value;
            for (let i = 0; i < joueur1Input.options.length; i++) {
                const option = joueur1Input.options[i];
                if (option.value === selectedPlayer2) {
                    option.disabled = true;
                } else {
                    option.disabled = false;
                }
            }
        });
    }

    function updateTerrainsList() {
        terrainInput.innerHTML = "";
        storedTerrains.forEach(function(terrain) {
            const option = document.createElement("option");
            option.value = terrain;
            option.textContent = terrain;
            terrainInput.appendChild(option);
        });
    }

    function updateCommentateursList() {
        commentateurInput.innerHTML = "";
        storedCommentateurs.forEach(function(commentateur) {
            const option = document.createElement("option");
            option.value = commentateur.prenom + " " + commentateur.nom;
            option.textContent = commentateur.prenom  + " " + commentateur.nom; // Assurez-vous de récupérer le nom du commentateur
            commentateurInput.appendChild(option);
        });
    }

    function displaySavedMatches() {
        storedMatches.forEach(function(match) {
            addMatch(match.joueur1, match.joueur2, match.commentateur, match.terrain, match.date);
        });
    }
});
