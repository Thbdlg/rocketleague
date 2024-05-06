document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration-form");
    const participantsList = document.getElementById("participants-list");

    // Récupérer les joueurs enregistrés depuis le sessionStorage
    const storedParticipants = JSON.parse(sessionStorage.getItem("participants")) || [];

    // Ajouter chaque joueur enregistré à la liste des participants
    storedParticipants.forEach(function(participant) {
        addParticipant(participant.prenom, participant.nom, participant.genre, participant.nationalite);
    });


    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const prenomInput = document.getElementById("prenom");
        const nomInput = document.getElementById("nom");
        const genreInput = document.getElementById("genre");
        const nationaliteInput = document.getElementById("nationalite");

        const prenom = prenomInput.value.trim();
        const nom = nomInput.value.trim();
        const genre = genreInput.value;
        const nationalite = nationaliteInput.value.trim();

        if (prenom !== "" && nom !== "" && nationalite !== "") {
            addParticipant(prenom, nom, genre, nationalite);
            // Réinitialiser les champs du formulaire après l'inscription
            prenomInput.value = "";
            nomInput.value = "";
            genreInput.value = "homme"; // Remettre la valeur par défaut
            nationaliteInput.value = "";

            // Stocker les informations du participant dans le session storage
            const participant = { prenom, nom, genre, nationalite };
            const participants = JSON.parse(sessionStorage.getItem("participants")) || [];
            participants.push(participant);
            sessionStorage.setItem("participants", JSON.stringify(participants));
        }
    });

    // Fonction pour ajouter un participant à la liste
    function addParticipant(prenom, nom, genre, nationalite) {
        const li = document.createElement("li");
        li.textContent = `${prenom} ${nom}, ${genre}, ${nationalite}`;
        participantsList.appendChild(li);
    }
});
