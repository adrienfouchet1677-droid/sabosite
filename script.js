// CONSIGNES:
// # Consignes détaillées pour le JavaScript - Exercice 2

// ## Jeu de saisie rapide

// 1. **Sélectionner les éléments nécessaires :**
//    - Récupérer les éléments du jeu : `letter-display`, `score`, `timer`, `start-game`
//    - Récupérer les éléments d'affichage clavier : `current-key`, `current-code`, `current-keycode`, `result-status`
//    - Récupérer l'élément `target-letter` pour les animations

// 2. **Initialiser les variables du jeu :**
//    - Créer les variables : `gameScore = 0`, `timeLeft = 30`, `currentLetter = 'A'`, `gameActive = false`
//    - Créer une variable `gameTimer` pour stocker l'ID du timer
//    - Créer un tableau `letters` avec toutes les lettres de A à Z : `['A', 'B', 'C', ...]`

// 3. **Créer une fonction pour générer une lettre aléatoire :**
//    - Fonction `generateRandomLetter()` qui utilise `Math.random()` et `Math.floor()`
//    - Formule : `letters[Math.floor(Math.random() * letters.length)]`
//    - Stocker le résultat dans `currentLetter`
//    - Mettre à jour `letterDisplay.textContent` avec la nouvelle lettre

// 4. **Créer une fonction pour démarrer le jeu :**
//    - Fonction `startGameFunction()` qui remet à zéro toutes les variables
//    - Mettre `gameScore = 0`, `timeLeft = 30`, `gameActive = true`
//    - Mettre à jour l'affichage du score et du timer avec `textContent`
//    - Appeler `generateRandomLetter()` pour la première lettre
//    - Créer le timer avec `setInterval` qui se déclenche toutes les 1000ms
//    - Dans le timer : décrémenter `timeLeft`, mettre à jour l'affichage, vérifier si `timeLeft <= 0`

// 5. **Créer une fonction pour arrêter le jeu :**
//    - Fonction `stopGameFunction()` qui met `gameActive = false`
//    - Arrêter le timer avec `clearInterval(gameTimer)`
//    - Afficher un message de fin avec `alert()` incluant le score final

// 6. **Ajouter un event listener keydown sur le document :**
//    - Vérifier d'abord si `gameActive` est `true`, sinon utiliser `return` pour sortir
//    - Récupérer `event.key`, `event.code` et `event.keyCode`
//    - Afficher ces valeurs dans la console
//    - Mettre à jour tous les éléments d'affichage clavier avec `textContent`

// 7. **Logique de vérification de la lettre :**
//    - Comparer `event.key.toUpperCase()` avec `currentLetter`
//    - Si correct : incrémenter `gameScore`, mettre à jour l'affichage du score
//    - Si correct : mettre à jour `resultStatus` avec '✅ Correct !' et `className = 'correct'`
//    - Si correct : ajouter la classe `correct` à `targetLetter` et appeler `generateRandomLetter()`
//    - Si incorrect : mettre à jour `resultStatus` avec '❌ Raté !' et `className = 'wrong'`
//    - Si incorrect : ajouter la classe `wrong` à `targetLetter`

// 8. **Retirer les animations :**
//    - Utiliser `setTimeout` avec un délai de 300ms
//    - Dans le timeout : retirer les classes `correct` et `wrong` de `targetLetter` avec `classList.remove`

// 9. **Event listener pour le bouton démarrer :**
//    - Ajouter un event listener `click` sur `startGame`
//    - Appeler la fonction `startGameFunction()`

// 10. **Initialisation :**
//     - Appeler `generateRandomLetter()` au chargement pour afficher la première lettre




const letterDisplay = document.getElementById('letter-display');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const startGame = document.getElementById('start-game');
const targetLetter = document.getElementById('target-letter');
const currentKey = document.getElementById('current-key');
const currentCode = document.getElementById('current-code');
const currentKeycode = document.getElementById('current-keycode');
const resultStatus = document.getElementById('result-status');
 
let gameScore = 0;
let timeLeft = 30;
let currentLetter = 'A';
let gameActive = false;
let gameTimer;
 
const letters = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
 
function generateRandomLetter() {
    currentLetter = letters[Math.floor(Math.random() * letters.length)];
    letterDisplay.textContent = currentLetter;
}
 
function startGameFunction() {
    gameScore = 0;
    timeLeft = 30;
    gameActive = true;
    scoreDisplay.textContent = gameScore;
    timerDisplay.textContent = timeLeft;
    generateRandomLetter();
    clearInterval(gameTimer);
    gameTimer = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            stopGameFunction();
        }
    }, 1000);
}
 
function stopGameFunction() {
    gameActive = false;
    clearInterval(gameTimer);
    alert('Fin du jeu ! Score final : ' + gameScore);
}
 
document.addEventListener('keydown', function(event) {
    if (gameActive == false) {
        return;
    }
    var key = event.key;
    var code = event.code;
    var keyCode = event.keyCode;
    console.log(key, code, keyCode);
    currentKey.textContent = key;
    currentCode.textContent = code;
    currentKeycode.textContent = keyCode;
    if (event.key.toUpperCase() == currentLetter) {
        gameScore++;
        scoreDisplay.textContent = gameScore;
        resultStatus.textContent = '✅ Correct !';
        resultStatus.className = 'correct';
        targetLetter.classList.add('correct');
        generateRandomLetter();
    } else {
        resultStatus.textContent = '❌ Raté !';
        resultStatus.className = 'wrong';
        targetLetter.classList.add('wrong');
    }
    setTimeout(function() {
        targetLetter.classList.remove('correct');
        targetLetter.classList.remove('wrong');
    }, 300);
});
 
startGame.addEventListener('click', function() {
    startGameFunction();
});
 
generateRandomLetter();