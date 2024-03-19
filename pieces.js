// Récupération des pièces depuis le fichier JSON
fetch('pieces-autos.json')
    .then(response => response.json())
    .then(pieces => {
        genererPieces(pieces);

        // Gestion des boutons 
        const boutonTrier = document.querySelector(".btn-trier");
        boutonTrier.addEventListener("click", function () {
            const piecesOrdonnees = Array.from(pieces);
            piecesOrdonnees.sort((a, b) => a.prix - b.prix);
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesOrdonnees);
        });

        const boutonFiltrer = document.querySelector(".btn-filtrer");
        boutonFiltrer.addEventListener("click", function () {
            const piecesFiltrees = pieces.filter(piece => piece.prix <= 35);
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesFiltrees);
        });

        const boutonDecroissant = document.querySelector(".btn-decroissant");
        boutonDecroissant.addEventListener("click", function () {
            const piecesOrdonnees = Array.from(pieces);
            piecesOrdonnees.sort((a, b) => b.prix - a.prix);
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesOrdonnees);
        });

        const boutonNoDesc = document.querySelector(".btn-nodesc");
        boutonNoDesc.addEventListener("click", function () {
            const piecesSansDesc = pieces.filter(piece => !piece.description);
            document.querySelector(".fiches").innerHTML = "";
            genererPieces(piecesSansDesc);
        });

        let range = document.querySelector("input")
        range.addEventListener("change", function(){
            let piecesrange = pieces.filter(piece => piece.prix <= 1*range.value)
            document.querySelector(".fiches").innerHTML = ""
            genererPieces(piecesrange)
        })
    })
    .catch(error => console.error('Erreur lors du chargement des pièces:', error));

function genererPieces(pieces) {
    const sectionFiches = document.querySelector(".fiches");

    pieces.forEach(article => {
        const pieceElement = document.createElement("article");
        const imageElement = document.createElement("img");
        imageElement.src = article.image;
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "Pas de description pour le moment.";
        const stockElement = document.createElement("p");
        stockElement.innerText = article.disponibilite ? "En stock" : "Rupture de stock";

        sectionFiches.appendChild(pieceElement);
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement);
    });
}
