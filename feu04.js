/* ---TROUVER LE PLUS GRAND CARRÉ---

Créez un programme qui remplace les caractères vides par des caractères plein pour représenter le plus grand carré possible sur un plateau. Le plateau sera transmis dans un fichier. La première ligne du fichier contient les informations pour lire la carte : nombre de lignes du plateau, caractères pour “vide”, “obstacle” et “plein”.


Exemples d’utilisation :
$> cat plateau
9.xo
...........................
....x......................
............x..............
...........................
....x......................
...............x...........
...........................
......x..............x.....
..x.......x................
$> ruby exo.rb plateau
.....ooooooo...............
....xooooooo...............
.....ooooooox..............
.....ooooooo...............
....xooooooo...............
.....ooooooo...x...........
.....ooooooo...............
......x..............x.....
..x.......x................

Vous devez gérer les potentiels problèmes d’arguments, de fichiers, ou de carte invalide.

Une carte est valide uniquement si : les lignes ont toute la même longueur, il y a au moins une ligne d’une case, les lignes sont séparées d’un retour à la ligne, les caractères présents dans la carte sont uniquement ceux de la première ligne

En cas de plusieurs solutions, le carré le plus en haut à gauche sera choisi.

Vous trouverez un générateur de plateau sur la feuille suivante.


--- ANNEXE : ----

Voici un générateur de plateau écrit en Ruby :


if ARGV.count != 3
    puts "params needed: x y density"
    exit
end

x = ARGV[0].to_i
y = ARGV[1].to_i
density = ARGV[2].to_i

puts "#{y}.xo"
for i in 0..y do
    for j in 0..x do
        print ((rand(y) * 2 < density) ? 'x' : '.')
    end
    print "\n"
end

*/

//initialisation des variables
let args = process.argv
let arg1 = args[2]
let arg2 = args[3]

const fs = require('fs');
const encodage = 'utf8'
let datas
let allSquares = []
let max

//f() utilisées

//permet de recup le contenu d'un fichier
function getFileContent(fileName){
    datas = fs.readFileSync(fileName, encodage)
    return datas
}

//vérifier la présence d'un fichier dans l'arborescence
function isNotFile(args) {
    for (let i = 0; i < args.length; i++) {
        if (fs.existsSync(args[i]) == true) {
            //on fait r
        } else {
            return false
        }
    }
    return true
}


/**
 * Permet de tester et enregistrer les différentes possibilitées de carré pour chaque obstacle
 */
function testCarre(board, i, j, objName) {

    for (let squareSize = 1; squareSize < board.length + 1; squareSize++) {

        for (let lgn = i; lgn < i + squareSize; lgn++) {
            for (let cln = j; cln < j + squareSize; cln++) {
              if (lgn == board.length || cln == board[lgn].length || board[lgn][cln] == 'x') {
                    console.log("stop ici max = " + squareSize);
                    allSquares[objName].max = parseInt(squareSize - 1)
                    return
                }
            }
        }
    }
}


function findBiggestOne(arrQuareSize) {
    let squarBasicArray = []
    for (let i = 0; i >= 0; i++) {
        if (allSquares["obstacle"+i] == undefined) {
            break
        } else {
            squarBasicArray.push(allSquares["obstacle"+i])
        }
    }

    //il faut récupérer l'élément de squarBasicArray qui a la valeur max la plus élevée pour ensuite dessiner notre réponse
    console.log(squarBasicArray)

    let maxLine = squarBasicArray.reduce((maxLine, item) => {
        return item.max > maxLine.max ? item : maxLine;
    });
    console.log(maxLine);
    return maxLine
}

function drawSquare(ligne, plateau) {
    let plat = [...plateau]
    let column = ligne.posColonne
    let line = ligne.posLigne
    let size = ligne.max-1 //car valeur réel et pas la valeur pour array
    console.log(column, line, size);

    for (let i = 0; i < plat.length; i++) {
        for (let j = 0; j < plat[i].length; j++) {
          if (i >= line && i <= line+size && j >= column && j <= column+size) {
            if (plat[i][j] === '.') {
              plat[i] = plat[i].substring(0, j) + 'o' + plat[i].substring(j + 1);
            }
          } 
        }
    }

    console.log(plat);
}

// main f()
function biggestCarre(file) {
    //récupérer le plateau
    const plateauAll = getFileContent(file)

    //récupérer la partie des différents indicateurs
    const indicateur = plateauAll.split("\n")

    const nbLigne = indicateur[0][0]
    const ptnMap = indicateur[0][1]
    const obstacle = indicateur[0][2]
    const markCarre = indicateur[0][3]

    //récupérer le plateau de jeu uniquement
    const plateau = indicateur.slice(1)

    let idxObstcl= 0

    //dans le tableau trouver un obstable et tester ses carrés
    for (let i = 0; i < plateau.length; i++) {

        //traiter sur chaque élément de chaque ligne
        for (let j = 0; j < plateau[i].length; j++) {

            //je vais remplir un tableau d'objet avec le progression max de chaque case
            let carreCordObj = {posLigne : i, posColonne: j, max }
            let objArrName = "obstacle"+idxObstcl
            allSquares[objArrName] = carreCordObj

            testCarre(plateau, i, j, objArrName)

            idxObstcl++
        }
    }

    let bigSquare = findBiggestOne()

    drawSquare(bigSquare, plateau)
}


//gestion des erreurs
if (arg1 == undefined || arg2 !== undefined) {
    console.log("Merci d'entrer que 2 arguments valables");
    return
}

if (isNotFile(args)) {
    //good on fait rien
} else {
    console.log("Aucun fichier trouvé");
    return
}


//traitement du résultat
console.log(biggestCarre(arg1));