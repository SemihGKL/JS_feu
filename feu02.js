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
const fs = require('fs');

//f() utlisées
function getFileContent(fileName){
    datas = fs.readFileSync(fileName, encodage)
    return datas
}

function decoupageTableau(array) {
    let splitedArr = array.split("\n")
    //On découpe les lignes du plateau sur chaque éléments
    for (let i = 0; i < splitedArr.length; i++) {
        splitedArr[i] = splitedArr[i].split('')
    }
    return splitedArr
}

//main f()
function getTheForm(gameBoardFile, toFindFile) {

    //récupération et stockage du contenu du plateau de base
    let gameBoard = getFileContent(gameBoardFile);
    //récupération et stockage du contenu de ce qui est cherché
    let toFind = getFileContent(toFindFile);

    //decoupage game board
    let splitedGB = decoupageTableau(gameBoard);

    //decoupage forme recherchée
    let splitedToFind = decoupageTableau(toFind);


    //Début recherches
    let arrTemp = []

    //Pour chaque sous tableau de la forme recherché
    for (let y = 0; y < splitedToFind.length; y++) {
        let z = 0
        // console.log("On est dans cette partie de ce qu'on recherche : " + splitedToFind[y]);
        let lengthLigneToFind = splitedToFind[y].length

        //Pour chaque valeur dans chaque sous tableau de la forme recherché
        for (let a = 0; a < splitedToFind[y].length; a++) {
            // console.log("pour cette valeur : " + splitedToFind[y][a]);

            
            //On recherche dans chaque ligne de notre GB
            for (let i = 0; i < splitedGB.length; i++) {
                // console.log(splitedGB[i]);
    
                let posLigneGB
                let posColonneGB
                let posLigneTF
                let posColonneTF

                //Dans chaque élément de chaque ligne de notre GB
                for (let x = 0; x < splitedGB[i].length; x++) {

                    //Si l'élement est égale à celui recherché 
                    if (splitedGB[i][x] == splitedToFind[y][a]) {
                        
                        //c'est égal donc : 
                        // console.log("c'est égal à l'index : " + x + " du GB de la ligne : " + i);

                        //on se situe ici : 
                        posLigneGB = i
                        posColonneGB = x
                        posLigneTF = y
                        posColonneTF = a

                        arrLigneTemp.push(splitedGB[i][x])

                        //ici je dois sauvegarder mes coordonnées et comparer maintenant les coordonnées suivantes

                        //on supprime le dernier sous tableau du array TF
                        splitedToFind.pop()

                        let verif = verificationForme(splitedToFind, splitedGB, posLigneGB, posColonneGB, posLigneTF, posColonneTF)

                        if (verif) {
                            //finis !
                            return
                        } else {
                            //ce n'est pas égale
                            arrLigneTemp = []
                            // console.log("Pas bon. on reboucle.");
                            // console.log("-------");


                            //on implémente les curseurs colonnes
                        }
                        
                    }
                }
            }
        }
    }
    console.log("Introuvable.");
}
let arrLigneTemp = []
let arrFinalTest = []

function verificationForme(arrTF, arrGB, posLigneGB,  posColonneGB, posLigneTF, posColonneTF) {
    
    let indexColonneGBOrigin = posColonneGB;
    // console.log(indexColonneGBOrigin);
    let indexColonneTFOrigin = posColonneTF;

    //on met les positions à +1 pour l'élément suivant
    posColonneTF ++
    posColonneGB ++

    //ici on boucle sur l'array de gb pour comparer avec l'elem du arrTF jusqu'au max de la taille de la ligne d'arrTF
    for (let n = 0; n < (arrGB[posLigneGB].length); n++) {
        let nextElemGB = arrGB[posLigneGB][posColonneGB]
        // console.log("nextGB : "+nextElemGB);
        // return true

        let nextElemTF = arrTF[posLigneTF][posColonneTF]
        // console.log("nextTF : "+nextElemTF);

        //Si les éléments suivant correspondent ou que vide
        if (nextElemGB == nextElemTF || nextElemTF == " ") {

            //on continue
            // console.log("ON EST EGAL avec GB : " + nextElemGB + " --et TF : " + nextElemTF);

            //on ajoute l'élement à la ligne
            if (nextElemTF == " ") {
                arrLigneTemp.push(" ")
                // console.log("on passe à la suite");
            } else {
                arrLigneTemp.push(arrGB[posLigneGB][posColonneGB])
            }

            //on incrémente pour passer à l'élément suivant
            posColonneTF++
            posColonneGB++

            //si on dépasse le tableau on passe à la ligne d'en dessous
            if (posColonneTF ==  (arrTF[posLigneTF].length)) {
                // console.log("retour à la ligne");
                //on reprendre le compteur

                posLigneGB++
                posLigneTF++

                //et on remet le curseur au début
                posColonneTF =0
                posColonneGB = indexColonneGBOrigin

                //Comme on est au bout de la ligne
                //on sauvegarde la ligne de l'arr de test 
                arrFinalTest.push(arrLigneTemp)
                //On remet à 0 l'array
                arrLigneTemp=[]
            }

            //on compare les 2 arr si ok on return les coordonnées et c'est good
            let testFinishAlgo = JSON.stringify(arrFinalTest) === JSON.stringify(arrTF)

            if (testFinishAlgo) {
                console.log("Trouvé !");
                console.log("Coordonnées : " + posLigneGB +","+ posColonneGB);
                return true
            }


        } else {
            //ce n'est pas égale donc on fait elemColonne+1 et on recommence
            // console.log("On est != avec GB : " + nextElemGB + "et TF : " + nextElemTF);

            //on reset les arr
            arrLigneTemp=[]
            arrFinalTest=[]
            return false
        }
    }
    // console.log("taille max : "+arrTF[posLigneTF].length);
    // console.log(arrFinalTest);

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

// gestion d'erreurs
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


//Traitement
getTheForm(arg1, arg2)