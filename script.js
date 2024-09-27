const chapters = [
    { title: 'Chapitre 1', file: '../assets/chapters/chapitre1.txt' , "image": "../assets/images/chaptersimgs/chpt1.jpg"},
    { title: 'Chapitre 2', file: '../assets/chapters/chapitre2.txt' , "image": "../assets/images/chaptersimgs/chpt2.png"},
    { title: 'Chapitre 3', file: '../assets/chapters/chapitre3.txt' },
    { title: 'Chapitre 4', file: '../assets/chapters/chapitre4.txt' },
    { title: 'Chapitre 5', file: '../assets/chapters/chapitre5.txt' }
];
var currentChapter = 0

function loadChapter(index) {
    const chapterTitleElement = document.getElementById('chapterTitle');
    const chapterContentElement = document.getElementById('chapterContent');
    
    currentChapter = index;
    fetch(chapters[index].file)
        .then(response => response.text())
        .then(text => {
            chapterTitleElement.textContent = chapters[index].title;
            chapterContentElement.textContent = text;
            generateImages(chapters[index]);

            const buttons = document.querySelectorAll('#buttonsContainer button');
            buttons.forEach((button, i) => {
                button.classList.toggle('active', i === index);
            });

            const nextChapterButton = document.getElementById('nextChapter');
            if (index === chapters.length - 1) {
                nextChapterButton.removeEventListener('click', nextChapterHandler);
            } else {
                nextChapterButton.removeEventListener('click', nextChapterHandler);
                nextChapterButton.addEventListener('click', nextChapterHandler);
            }

            
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 100);
        })
        .catch(error => console.error('Erreur de chargement du fichier:', error));
}
function nextChapterHandler() {
    loadChapter(currentChapter + 1);
}
function generateImages(unit) {
    const imageContainer = document.getElementById('image');
    imageContainer.innerHTML = '';
    const image = document.createElement('img');
    image.src = unit.image;
    imageContainer.appendChild(image);
}

function generateButtons() {
    const buttonsContainer = document.getElementById('buttonsContainer');
    buttonsContainer.innerHTML = '';
    chapters.forEach((chapter, index) => {
        const button = document.createElement('button');
        button.textContent = chapter.title;
        button.addEventListener('click', () => loadChapter(index));
        buttonsContainer.appendChild(button);
    });
    if (chapters.length > 0) {
        loadChapter(0);
    }
}

document.addEventListener('DOMContentLoaded', generateButtons);
