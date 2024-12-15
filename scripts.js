let games = [
    { name: "The Witcher 3", platform: "PC, PS4, Xbox", publisher: "CD Projekt Red", category: "RPG", releaseDate: "19-05-2015", coverURL: "https://image.api.playstation.com/vulcan/ap/rnd/202211/0711/kh4MUIuMmHlktOHar3lVl6rY.png?w=440&thumb=false", additionalImages: [ "https://www.campustech.fr/wp-content/uploads/2023/05/the-witcher-3.jpg"], youtubeURL: "https://www.youtube.com/watch?v=N3IuxMLINiw" },
    { name: "Minecraft", platform: "PC, PS4, Xbox, Switch", publisher: "Mojang", category: "Sandbox", releaseDate: "18-11-2011", coverURL: "https://laboutiquedestoons.com/42430-large_default/plaid-polaire-minecraft-100-x-140-cm-couverture.jpg", additionalImages: ["https://www.1001-nuits-enchantees.fr/5931-large_default/minecraft-plaid-polaire-enfant-couverture-110x140-cm.jpg"], youtubeURL: "https://www.dailymotion.com/video/x2cwc3n" },
    {name: "Indiana Jones",platform: "PC, PlayStation 5, Xbox Series X",publisher: "Lucasfilm Games", category: "Aventure", releaseDate: "09-12-2024",coverURL: "https://chocobonplan.com/wp-content/uploads/2024/02/Indiana-Jones-et-le-Cercle-Ancien-ps5-visuel-provisoire-produit-300x300.png", additionalImages: ["https://images.mweb.bethesda.net/_images/relic-gizeh-feature-4.webp?c=true&f=jpg&h=401&w=712&s=GwcJVSUEEVw62ltOIxgOQjDnMbHaATWFoDyWbRac2gU"],youtubeURL: "https://www.youtube.com/watch?v=FIEEE63d_qM" },
    { name: "The Legend of Zelda: Breath of the Wild", platform: "Switch", publisher: "Nintendo", category: "Adventure", releaseDate: "03-03-2017", coverURL: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg", additionalImages: ["https://sm.ign.com/t/ign_ap/lists/h/how-to-pla/how-to-play-the-legend-of-zelda-games-in-chronological-order_4gqw.1200.jpg"], youtubeURL: "https://www.youtube.com/watch?v=6eyqkz5q3To" },
    { name: "Animal Crossing: New Horizons", platform: "Switch", publisher: "Nintendo", category: "Simulation", releaseDate: "20-03-2020", coverURL: "https://m.media-amazon.com/images/I/81s8etnYPrL._AC_UF1000,1000_QL80_.jpg", additionalImages: ["https://media.wired.com/photos/5fa5be20daa25f804cdbd2d9/16:9/w_1615,h_908,c_limit/games_culture_anch-fall.jpg"], youtubeURL: "https://www.youtube.com/watch?v=BwgSbyMLYJs" },
    { name: "Red Dead Redemption 2", platform: "PS4, Xbox, PC", publisher: "Rockstar Games", category: "Action-Adventure", releaseDate: "26-10-2018", coverURL: "https://image.api.playstation.com/cdn/UP1004/CUSA03041_00/Hpl5MtwQgOVF9vJqlfui6SDB5Jl4oBSq.png", additionalImages: ["https://images.ctfassets.net/wn7ipiv9ue5v/4c41lXEzQ57OGnrzbOZjVb/5a0d3bf9594f8f31db4da0793a60e5ea/RDR2_Screenshot_022.jpg"], youtubeURL: "https://www.youtube.com/watch?v=94IUmqvGkeg" },
];

let currentPage = 1;
let itemsPerPage = 3;  // Valeur par défaut

// Ajout d'un champ pour modifier itemsPerPage
document.getElementById("itemsPerPage").addEventListener("change", function() {
    itemsPerPage = parseInt(this.value, 10);
    displayGames();  // Redessiner la table
});

let filteredGames = [...games];  // Store a filtered list of games for search

function displayGames() {
    const gamesTable = document.getElementById("gamesTable");
    let tableHTML = `
        <table class='games-table'>
            <thead>
                <tr>
                    <th>Nom du jeu</th>
                    <th>Plateforme</th>
                    <th>Éditeur</th>
                    <th>Catégorie</th>
                    <th>Date de sortie</th>
                    <th>Couverture</th>
                    <th>YouTube URL</th>
                    <th>Images supplémentaires</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>`;

    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const currentGames = filteredGames.slice(start, end);

    currentGames.forEach((game, index) => {
        // Vérification pour éviter les données manquantes et afficher des valeurs par défaut

    // Si le jeu possède une URL de couverture, on crée une balise <img> pour l'afficher
    // Sinon, on affiche le texte "Pas d'image" pour indiquer l'absence d'image de couverture
        const coverImage = game.coverURL
            ? `<img src="${game.coverURL}" alt="Cover Image" class="cover-image">`
            : "Pas d'image";
        const youtubeLink = game.youtubeURL
            ? `<a href="${game.youtubeURL}" target="_blank">Bande annonce</a>`
            : "Non disponible";
        const additionalImagesHTML = Array.isArray(game.additionalImages)
           ? game.additionalImages.map(
                (imageURL) => `<img src="${imageURL}" alt="Additional Image" class="additional-images">`
            ).join("<br>")// Utilise <br> pour séparer les images
            : "Aucune image supplémentaire";// Valeur par défaut si additionalImages est manquant ou non un tableau

        tableHTML += `
            <tr>
                <td>${game.name}</td>
                <td>${game.platform}</td>
                <td>${game.publisher}</td>
                <td>${game.category}</td>
                <td>${game.releaseDate}</td>
                <td>${coverImage}</td>
                <td>${youtubeLink}</td>
                <td>${additionalImagesHTML}</td>
                <td>
                    <button onclick="editGame(${index})">Modifier</button>
                    <button class="delete-button" onclick="deleteGame(${index})">🗑️</button>
                </td>
            </tr>`;
    });

    tableHTML += "</tbody></table>";
    gamesTable.innerHTML = tableHTML;

    document.getElementById("prevPage").disabled = currentPage === 1;
    document.getElementById("nextPage").disabled = currentPage * itemsPerPage >= filteredGames.length;
}


function changePage(direction) {
    currentPage += direction;
    displayGames();
}

let editingIndex = -1;  // Variable globale pour savoir quel jeu est modifié

function addGame(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const platform = document.getElementById("platform").value;
    const publisher = document.getElementById("publisher").value;
    const category = document.getElementById("category").value;
    const releaseDate = document.getElementById("releaseDate").value;
    const coverURL = document.getElementById("coverURL").value;
    const additionalImages = document.getElementById("additionalImages").value.split(",");
    const youtubeURL = document.getElementById("youtubeURL").value;
 // Vérification si tous les champs obligatoires sont remplis
    if (!name || !platform || !publisher || !category || !coverURL || !youtubeURL) {
        alert("Tous les champs sont obligatoires !");
        return;// Arrête l'exécution de la fonction si les champs obligatoires sont vides
    }

    const newGame = { name, platform, publisher, category, releaseDate, coverURL, additionalImages, youtubeURL };
    if (editingIndex === -1) {
        games.push(newGame);
    } else {
        games[editingIndex] = newGame;// Si on modifie un jeu existant, on remplace l'ancien jeu par le nouveau
        editingIndex = -1;  // Réinitialiser l'index de modification
    }

    filteredGames = [...games];  // Créer une nouvelle copie de la liste des jeux
    displayGames();
    document.getElementById("gameForm").reset();// Remet les champs du formulaire à leur état initial

}

function editGame(index) {
    const game = filteredGames[index];
    document.getElementById("name").value = game.name;
    document.getElementById("platform").value = game.platform;
    document.getElementById("publisher").value = game.publisher;
    document.getElementById("category").value = game.category;
    document.getElementById("releaseDate").value = game.releaseDate;
    document.getElementById("coverURL").value = game.coverURL;
    document.getElementById("additionalImages").value = game.additionalImages.join(",");
    document.getElementById("youtubeURL").value = game.youtubeURL;

    editingIndex = index;  // Enregistrer l'index du jeu à modifier
}



function deleteGame(index) {
    // Calculate the real index in the filteredGames array
    const realIndex = (currentPage - 1) * itemsPerPage + index;

    // Remove the game from the filteredGames array
    filteredGames.splice(realIndex, 1);

    // Update the page if the last game on the current page is deleted
    if (filteredGames.length < currentPage * itemsPerPage) {
        currentPage--;  // Go to the previous page if necessary
    }

    // Update the table by re-rendering
    displayGames();
}


function searchGames() {
    const searchTerm = document.getElementById("search").value.toLowerCase();

    // Filtrer la liste des jeux selon plusieurs critères
    filteredGames = games.filter(game =>
        game.name.toLowerCase().includes(searchTerm) ||
        game.platform.toLowerCase().includes(searchTerm) ||
        game.publisher.toLowerCase().includes(searchTerm) ||
        game.category.toLowerCase().includes(searchTerm)
    );
    displayGames();  // Redessiner la table après filtrage
}

document.getElementById("gameForm").addEventListener("submit", addGame);

displayGames();  // Initial call to display games