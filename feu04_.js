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
let max = 0
let maxElement = []

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
    let lgn = i, cln = j
    let down, right, diagonal

    for (let squareSize = 0; lgn < board.length-1; squareSize++) {
        down = board[lgn+1][cln]
        right = board[lgn][cln+1]
        diagonal = board[lgn+1][cln+1]

        cln++, lgn++
        if (down == "x" || right == "x" || diagonal == "x") {
            allSquares[objName].max = squareSize
        }
    }
    return
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

    console.log(Math.max(...squarBasicArray.map(o => o.y)))
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
    console.log(nbLigne, ptnMap, obstacle, markCarre);

    //récupérer le plateau de jeu uniquement
    // const arrPlateau = indicateur.slice(1).join("")
    const plateau = indicateur.slice(1)
    console.log(plateau);
    let carreMax = 0
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

    findBiggestOne()
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