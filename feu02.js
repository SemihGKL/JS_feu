/* ---TROUVER UNE FORME---

Créez un programme qui affiche la position de l’élément le plus en haut à droite (dans l’ordre) d’une forme au sein d’un plateau.


Exemples d’utilisation :
$> cat board.txt
0000
1111
2331
$> cat to_find.txt
11
 1
$> cat unfindable.txt
00
00

$> ruby exo.rb board.txt to_find.txt
Trouvé !
Coordonnées : 2,1
----
--11
---1

$> ruby exo.rb board.txt unfindable.txt
Introuvable

Vous devez gérer les potentiels problèmes d’arguments et de lecture de fichiers.

*/

//Import de dépendances
const spawn = require('child_process').spawnSync;

//Initialisation des variables
let args = process.argv
let arg1 = args[2]
let arg2 = args[3]
let arg3 = args[4]
const encodage = 'utf8'
let datas

//f() utlisées
function getFileContent(fileName){
    console.log(fileName);
    const fs = require('fs');

    datas = fs.readFileSync(fileName, encodage)
    return datas
}

//main f()
function getTheForm(gameBoardFile, toFindFile) {

    //récupération et stockage du contenu du plateau de base
    let gameBoard = getFileContent(gameBoardFile);
    console.log(gameBoard);

    //récupération et stockage du contenu de ce qui est cherché
    let toFind = getFileContent(toFindFile);
    console.log(toFind);
}


// gestion d'erreurs
if (arg1 == undefined || arg2 == undefined || arg3 !== undefined) {
    console.log("Merci d'entrer seulement 2 arguments valables");
    return
}

//Traitement
let resultFinal = getTheForm(arg1, arg2)

console.log(resultFinal);