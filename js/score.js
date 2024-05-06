document.addEventListener("DOMContentLoaded", function() {
    const matchResultsList = document.getElementById("match-results-list");
    const scoreResultsList = document.getElementById("score-results-list");

    // Récupérer les matchs enregistrés depuis le sessionStorage
    const storedMatches = JSON.parse(sessionStorage.getItem("matches")) || [];

    // Afficher les matchs dans la liste des résultats
    storedMatches.forEach(function(match) {
        addMatchResult(match);
    });

    // Fonction pour afficher un résultat de match et saisir le score
    function addMatchResult(match) {
        const li = document.createElement("li");
        li.textContent = `${match.joueur1} VS ${match.joueur2}`;
        matchResultsList.appendChild(li);
        
        // Ajouter des champs pour saisir le score du match
        const scoreInput = document.createElement("input");
        scoreInput.setAttribute("type", "text");
        scoreInput.setAttribute("placeholder", "Format chiffre-chiffre");
        li.appendChild(scoreInput);

        // Ajouter un bouton pour enregistrer le score
        const saveButton = document.createElement("button");
        saveButton.textContent = "Enregistrer";
        li.appendChild(saveButton);

        // Écouter l'événement de clic sur le bouton d'enregistrement
        saveButton.addEventListener("click", function() {
            const score = scoreInput.value.trim();
            if (score !== "") {
                saveScore(match, score);
                scoreInput.value = ""; // Effacer le champ de saisie après l'enregistrement
            }
        });
    }

    function isValidScore(score) {
        const regex = /^[0-9-]+$/; // Expression régulière pour vérifier les chiffres et le caractère '-'
        return regex.test(score);
    }

    // Fonction pour enregistrer le score dans le sessionStorage
    function saveScore(match, score) {
        if (isValidScore(score)) {
            const scoreData = {
                joueur1: match.joueur1,
                joueur2: match.joueur2,
                score: score
            };
            const scores = JSON.parse(sessionStorage.getItem("scores")) || [];
            scores.push(scoreData);
            sessionStorage.setItem("scores", JSON.stringify(scores));
        
            // Supprimer le match enregistré une fois que le score est enregistré
            const storedMatches = JSON.parse(sessionStorage.getItem("matches")) || [];
            const updatedMatches = storedMatches.filter(m => !(m.joueur1 === match.joueur1 && m.joueur2 === match.joueur2));
            sessionStorage.setItem("matches", JSON.stringify(updatedMatches));
        
            // Rafraîchir la liste des scores affichés
            refreshScoreList();
        }
        else alert("Le score doit contenir uniquement des chiffres et le caractère '-' !");
    }   
    

    // Fonction pour rafraîchir la liste des scores affichés
    function refreshScoreList() {
        scoreResultsList.innerHTML = ""; // Effacer la liste des scores actuelle

        // Récupérer les scores enregistrés depuis le sessionStorage
        const storedScores = JSON.parse(sessionStorage.getItem("scores")) || [];

        // Afficher les scores dans la liste des scores
        storedScores.forEach(function(scoreData) {
            const li = document.createElement("li");
            li.textContent = `${scoreData.joueur1} VS ${scoreData.joueur2}: ${scoreData.score}`;
            scoreResultsList.appendChild(li);
        });
    }

    // Rafraîchir la liste des scores affichés au chargement de la page
    refreshScoreList();
});
