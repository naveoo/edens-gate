// Liste des fichiers texte avec leurs titres correspondants
const chapters = [
    { title: 'Chapitre 1', file: '../assets/chapters/chapitre1.txt' , "image": "../assets/images/chaptersimgs/chpt1.jpg"},
    { title: 'Chapitre 2', file: '../assets/chapters/chapitre2.txt' , "image": "../assets/images/chaptersimgs/chpt2.png"},
    { title: 'Chapitre 3', file: '../assets/chapters/chapitre3.txt' },
    { title: 'Chapitre 4', file: '../assets/chapters/chapitre4.txt' },
    { title: 'Chapitre 5', file: '../assets/chapters/chapitre5.txt' }
];

// Fonction pour charger et afficher un chapitre spécifique
function loadChapter(index) {
    const chapterTitleElement = document.getElementById('chapterTitle');
    const chapterContentElement = document.getElementById('chapterContent');
    
    fetch(chapters[index].file)
        .then(response => response.text())
        .then(text => {
            chapterTitleElement.textContent = chapters[index].title;
            chapterContentElement.textContent = text;
            generateImages(chapters[index])
            // Met à jour la classe active sur les boutons
            const buttons = document.querySelectorAll('#buttonsContainer button');
            buttons.forEach((button, i) => {
                button.classList.toggle('active', i === index);
            });
        })
        .catch(error => console.error('Erreur de chargement du fichier:', error));
}
function generateImages(unit) {
    const imageContainer = document.getElementById('image');
    imageContainer.innerHTML = ''; // Réinitialiser les boutons
    const image = document.createElement('img');
    image.src = unit.image;
    imageContainer.appendChild(image);
}

// Fonction pour générer les boutons de navigation
function generateButtons() {
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = ''; // Réinitialiser les boutons
    chapters.forEach((chapter, index) => {
        const button = document.createElement('button');
        button.textContent = chapter.title;
        button.addEventListener('click', () => loadChapter(index));
        buttonsContainer.appendChild(button);
    });
    // Charger le premier chapitre par défaut
    if (chapters.length > 0) {
        loadChapter(0);
    }
}


// Générer les boutons lorsque la page est prête
document.addEventListener('DOMContentLoaded', generateButtons);
