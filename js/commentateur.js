document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration-form");
    const commentateursList = document.getElementById("commentateurs-list");

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
            addCommentateur(prenom, nom, genre, nationalite);
            // Réinitialiser les champs du formulaire après l'inscription
            prenomInput.value = "";
            nomInput.value = "";
            genreInput.value = "homme"; // Remettre la valeur par défaut
            nationaliteInput.value = "";

            // Stocker les informations du commentateur dans le session storage
            const commentateur = { prenom, nom, genre, nationalite };
            const commentateurs = JSON.parse(sessionStorage.getItem("commentateurs")) || [];
            commentateurs.push(commentateur);
            sessionStorage.setItem("commentateurs", JSON.stringify(commentateurs));
        }
    });

    // Fonction pour ajouter un commentateur à la liste
    function addCommentateur(prenom, nom, genre, nationalite) {
        const li = document.createElement("li");
        li.textContent = `${prenom} ${nom}, ${genre}, ${nationalite}`;
        commentateursList.appendChild(li);
    }

    // Au chargement de la page, vérifier s'il y a des commentateurs dans le session storage
    const storedCommentateurs = JSON.parse(sessionStorage.getItem("commentateurs")) || [];
    storedCommentateurs.forEach(function(commentateur) {
        addCommentateur(commentateur.prenom, commentateur.nom, commentateur.genre, commentateur.nationalite);
    });
});
