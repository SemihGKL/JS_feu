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
let allBoards = []

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
 * Permet de remplir un objet avec les coordonnées des différents obstacles
 * 
 * @param {*} indicateurs 
 * @returns 
 */
function saveObstacle(indicateurs) {
    //ancien if/else dans
    // if (plateau[i][y] == "x") {
    //     console.log("obstacle here");
        
    //     let posColonne = y
    //     let posLigne = i
    //     console.log(plateau[i][y]);

    //     //trouver chaque obstacle et sauvegarder les coordonnées dans un tableau
    //     let carreCordObj = {posColonne: posColonne, posLigne : posLigne}
    //     let objArrName = "obstacle"+idxObstcl
    //     console.log(objArrName);
    //     allObstacleCoords[objArrName] = carreCordObj

    //     idxObstcl++
        
    // } else {
    //     //il ne se passe actuellement rien
    // }
}


/**
 * Permet de tester et enregistrer les différentes possibilitées de carré pour chaque obstacle
 */
function testCarre(board, i, j) {
    // //on vérifie qu'on déborde pas du tableau et que se sont des fausses coordonnées 
    boardTemp = [...board]
    if (i < 0 || i >= boardTemp.length || j < 0 || j >= boardTemp[i].length) {
        return 0;
    }

    //si on tombe sur un x on arrete le traitement


    let up = testCarre(boardTemp, i - 1, j);
    let left = testCarre(boardTemp, i, j - 1);
    let diagonal = testCarre(boardTemp, i - 1, j - 1);
    let squareSize = Math.min(up, left, diagonal) + 1;

    if (board[i][j] == "x") {
        

    }

    boardTemp[i][j] = 'o';



    // allBoards.push(boardTemp)
    return squareSize;
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

    //dans le tableau trouver un obstable et tester ses carrés
    for (let i = 0; i < plateau.length; i++) {

        //traiter sur chaque élément de chaque ligne
        for (let j = 0; j < plateau[i].length; j++) {

            if (plateau[i][j] == "x") {
                console.log("obstacle here");
                //pour chaque obstacle on va calculer ses carrés adjacents et retourner le plus grand
                let tailleCarre = testCarre(plateau,i, j)

                // on va comparer les tailles de carrés et retourner le plus grand
                carreMax = Math.max(carreMax, tailleCarre)
                
            }
        }
    }
    console.log(allBoards);

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