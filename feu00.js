/* ---ECHAUFFEMENT---
Créez un programme qui affiche un rectangle dans le terminal.


Exemples d’utilisation :
$> python exo.py 5 3
o---o
|   |
o---o

$> python exo.py 5 1
o---o

$> python exo.py 1 1
o


Gérer les problèmes potentiels d’arguments.

*/

//initalisation des variables
const args = process.argv.slice(2)
const arg1 = process.argv[2]
const arg2 = process.argv[3]
const arg3 = process.argv[4]
const nbRegex = /^-?[0-9]\d*(\.\d+)?$/

const coin = "o"
const segmentLarge = "-"
const segmentBarre = "|"
let ligne = ""
const space = " "


//fonctions utilisées

//Number test
function isNotNumber(args){
    let counter = 0
    for (let i = 0; i < args.length; i++) {
        if (args[i].match(nbRegex)) {

        } else {
            counter ++
        }        
    }
    return counter
}

function generateLigne(nbLarge) {
    //on commence par un coin
    ligne+= coin

    //on ajoute la ligne
    for (let i = 0; i < nbLarge-2; i++) {
        ligne += segmentLarge
    }
    //pour ne pas ajouter 2 coin si il n'a qu'une colonne 
    if (nbLarge > 1) {
        ligne+= coin 
    }
    ligne += "\n"
    
}

function generatCotes(nbHaut, nbLarge) {

    //pour chaque segment (sans les coins)
    for (let y = 0; y < nbHaut-2; y++) {
        //on ajoute une barre
        ligne += segmentBarre
        
        //et pour chaque largeur on ajoute un espace
        for (let i = 0; i < nbLarge-2; i++) {
            ligne += space
        }

        //Pour ne pas ajouter 2 barres si on a qu'une seule colonne
        if (nbLarge > 1) {
            ligne+= segmentBarre 
        }
        ligne += "\n"
    }
}

function generateCarre(nbLarge, nbHaut) {

    //génération de la première ligne
    generateLigne(nbLarge)

    //on ajoute les cotés 
    generatCotes(nbHaut, nbLarge)

    //si c'est =1 on veut alors qu'une seule ligne
    if (nbHaut < 2) {
        return ligne
    }

    //génération de la dernière ligne
    generateLigne(nbLarge)
    return ligne

}


//gestion d'erreurs
if (arg1 == undefined || arg2 == undefined || arg3 !== undefined) {
    console.log("Merci d'entrer 2 arguments valables");
    return
}

if (isNotNumber(args) > 0) {
    console.log("Ce script ne peut prendre que des chiffres en arguments");
    return
}


//traitement
let resultFinal = generateCarre(arg1, arg2)


//affichage
console.log(resultFinal);