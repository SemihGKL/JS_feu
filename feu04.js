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
let arg3 = args[4]
const fs = require('fs');
const encodage = 'utf8'
let datas

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



// main f()
function biggestCarre() {
    //récupérer le plateau
    const plateauAll = getFileContent(arg1)

    console.log(plateauAll);

    //récupérer la partie des différents indicateurs

    //récupérer le plateau de jeu uniquement


    //dans le tableau trouver un obstable

    //ajouter +1 à droite et +1 en bas jusqu'à retomber sur un obstable

    //conserver le nombre de +1 fait & stocker ses coordonnées dans un objet avec colonnes - lignes - progression

    //faire ça pour tous les obstacles en partant de la droite et de la gauche


    //comparer les progressions pour voir le quel est le plus grand 

    //se positionner dessus et dessiner le carré

    //afficher le résultat
}


//gestion des erreurs
if (arg1 == undefined || arg2 == undefined || arg3 !== undefined) {
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
