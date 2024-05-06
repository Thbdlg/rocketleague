document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registration-form");
    const terrainsList = document.getElementById("terrains-list");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const terrainNameInput = document.getElementById("terrain-name");
        const terrainName = terrainNameInput.value.trim();

        if (terrainName !== "") {
            addTerrain(terrainName);
            terrainNameInput.value = "";

            // Stocker le nom du terrain dans le session storage
            const terrains = JSON.parse(sessionStorage.getItem("terrains")) || [];
            terrains.push(terrainName);
            sessionStorage.setItem("terrains", JSON.stringify(terrains));
        }
    });

    // Fonction pour ajouter un terrain à la liste
    function addTerrain(terrainName) {
        const li = document.createElement("li");
        li.textContent = terrainName;
        terrainsList.appendChild(li);
    }

    // Au chargement de la page, vérifier s'il y a des terrains dans le session storage
    const storedTerrains = JSON.parse(sessionStorage.getItem("terrains")) || [];
    storedTerrains.forEach(function(terrainName) {
        addTerrain(terrainName);
    });
});
