/* ---SUDOKU---


Créez un programme qui trouve et affiche la solution d’un Sudoku.


Exemples d’utilisation :
$> cat s.txt
1957842..
3.6529147
4721.3985
637852419
8596.1732
214397658
92.418576
5.8976321
7612358.4

$> ruby exo.rb s.txt
195784263
386529147
472163985
637852419
859641732
214397658
923418576
548976321
761235894

Afficher error et quitter le programme en cas de problèmes d’arguments.


1- Commencez par représenter le sudoku sous forme d'un tableau à deux dimensions contenant des chiffres de 1 à 9. Si une case est vide, utilisez la valeur 0. > FAIT

2- Écrivez une fonction qui prend en entrée le tableau du sudoku et qui retourne un booléen indiquant si la grille est valide ou non. Pour vérifier la validité, vous pouvez vérifier que chaque ligne, chaque colonne et chaque région 3x3 contient tous les chiffres de 1 à 9.
> FAIS

3- Écrivez une fonction récursive qui essaie de remplir la grille de sudoku de manière récursive en testant chaque valeur possible pour chaque case vide. Si la grille est valide après avoir rempli une case, passez à la case suivante et continuez à remplir la grille de manière récursive. Si la grille devient invalide à un certain point, revenez en arrière et essayez une autre valeur pour la case précédemment remplie.

4- Appelez la fonction récursive avec le tableau du sudoku en entrée. Si la fonction retourne true, cela signifie que le sudoku a été résolu avec succès. Si la fonction retourne false, cela signifie qu'il n'est pas possible de résoudre le sudoku avec les données fournies.

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

//f() qui découpe le sudoku en ligne
function twoDimensionArrSudoku(arr) {
    //on découpe en ligne de 9 char
    let lignesArr = arr.split("\n")

    let sudokuArr = []

    //on met en place notre tableau à 2 dimensions
    for (const ligne of lignesArr) {
        //on remplace les . par des 0
        let sdkLine = ligne.split('').map( x => {
            return x.replace('.', '0')
        })
        sudokuArr.push(sdkLine)
    }
    return sudokuArr
}

//Permet de vérifier les les lignes
function verifLigne(arr) {

    //----Première verification sur les lignes----

    // let isSDK = true
    // // for (const ligne of arr) {
    for (let i = 0; i < arr.length; i++) {
        let ligne = arr[i]
         let testLigneSudoku = verifNumbers(ligne)
         if (testLigneSudoku) {
            //on continue les verifs > sudoku valide
            // console.log("valid verifNb #0");

         } else {
            // console.log("ligne verifs NB NON");
            return false
         }
    }

    let testColonne = verifColonne(arr)
    if (testColonne) {
        //on continue les verifs > sudoku valide
        // console.log("valid  #0");

    } else {
        // console.log("colonne = "+ testColonne);
        return false
    }

    return true

}

function verifColonne(arr) {

    //----vérification sur les colonnes----

    //On boucle 9 fois pour chaque colonne
    for (let y = 0; y < 9; y++) {
        let tempArr = []

        //pour chaque ligne
        for (let i = 0; i < arr.length; i++) {
            //remplir le tableau avec les élément qui sont l'un au dessus de l'autre
            tempArr.push(arr[i][y])
        }

        let testSudoku = verifNumbers(tempArr)
        if (testSudoku) {
            //on continue les vérifs > sudoku valide
            // console.log("valid verifNb #1");
        } else {
            // console.log("colonne verifs NB NON");
            return false
        }

    }
    //tester les carrés 3x3
    let testCarre = verifCarre(arr)
    if (testCarre) {
        //notre sudoku est parfaitement valide
        // console.log("valid  #1");

        return true
    } else {
        // console.log("carré = "+ testCarre);
        return false
    }
}

function verifCarre(arr) {
    //----vérification sur les carrés de 3x3 ----
    let tempArrGroupe = []


    //On forme 3 sous groupe avec les tableaux pour parcours 3 lignes / 3 lignes par la suite
    for (let i = 0; i < arr.length; i += 3) {
        let tempGroupe = arr.slice(i, i+3)
        tempArrGroupe.push(tempGroupe)
    }

    let tempArr =[]
    let tempLigne
    let indexStart = 0
    let carreLigneArr = []

    //pour traiter toutes les colonnes de sous groupes
    for (let a = 0; a < tempArrGroupe.length; a++) {
        
        //Pour chaque sous groupe créé,
        for (let y = 0; y < tempArrGroupe.length; y++) {
            //on prends un sous tableau et on extrait les 3 premier éléments
            for (let z=0; z < tempArrGroupe[y].length; z++) {
                
                let indexEnd =indexStart+3
    
                tempLigne = tempArrGroupe[y][z].slice(indexStart, indexEnd);
                tempArr.push(tempLigne)
    
            }
            tempArr = tempArr.flat(1);
            carreLigneArr.push(tempArr)
            tempArr= []
        }


        indexStart += 3
    }


    //On a dans carreLigneArr un tableau avec des sous tableau contenant nos carrées de 3x3
    
    //pour chaque ligne
    for (let i = 0; i < carreLigneArr.length; i++) {
        //On fait vérifier chaque ligne (ligne contenant nos carrés)
        let testSudoku = verifNumbers(carreLigneArr[i])
        if (testSudoku) {
            //Good on fait rien on continue de boucler
            // console.log("valid verifNb #2");

        } else {
            // console.log("cube verifs NB NON");

            return false
        }
    }
    //on a donc un sudoku valide pour cette partie

    return true

}


//Vérifie si dans la ligne donnée on à les chiffres de 1 à 9
function verifNumbers(ligne) {

    // console.log("ligne ici : ");
    // console.log(ligne);

    // Crée un tableau de compteurs à 0
    const counters = new Array(9).fill(0);

    // Parcours chaque élément du sudoku
    for (const element of ligne) {
        // Récupère le chiffre de la case
        const number = parseInt(element, 10);

        // Incrémente le compteur du chiffre
        counters[number - 1]++;
    }

    // Vérifie que chaque compteur a la valeur 1
    for (let y = 0; y < counters.length; y++) {
        
        if (counters[y] !== 1) {
            console.log("l'elem qui n'apparait pas est : " + (y+1));
            //ce n'est pas un sudoku valide
            //il faudra return un indicateur pour stopper les tests
            return false 
        }
    }

    return true
}


function calculSudoku(arr) {

    //tableau qui contiendra tous les éléments manquant pour les ré-insérer
    let missingNbArr = []

    //prendre le tableau et remplacer tous les . par le chiffres manquant de 1 à 9
    console.log(arr);
    //tester le sudoku
    for (let i = 0; i < arr.length; i++) {

        // Crée un tableau de compteurs à 0
        const counters = new Array(9).fill(0);

        // Parcours chaque élément du sudoku
        for (const element of arr[i]) {
            // Récupère le chiffre de la case
            const number = parseInt(element, 10);
            // console.warn("elem :" +element);
            

            // Incrémente le compteur du chiffre
            counters[number - 1]++;
        }


        // Vérifie que chaque compteur a la valeur 1
        for (let y = 0; y < counters.length; y++) {
            
            if (counters[y] !== 1) {
                console.log("l'elem qui n'apparait pas est : " + (y+1));
                missingNbArr.push(y+1)

            }
        }
        
    }

    //à ce stade on a un tableau qui comprends tous les éléments manquants on va parcourir les 0 et les remplacer par nos chiffres

    let indexMissingNb = 0
    for (let i = 0; i < arr.length; i++) {

        for (let y = 0; y < arr.length; y++) {
            if (arr[i][y] == 0) {
                // console.log(arr[i][y]);
                arr[i][y] = missingNbArr[indexMissingNb]
                indexMissingNb++
            }
        }

    }

    return arr

}

//main f()
function resolveSudo(sdkFile) {
    let arrayBase = getFileContent(sdkFile)
    let twoDimArray = twoDimensionArrSudoku(arrayBase)
    let isSudokuArr = verifLigne(twoDimArray)

    if (isSudokuArr) {
        //le sudoku est valide pas besoin d'aller plus loin
        console.log("sudoku is ok");
        return
    } else {
        //il n'est pas valide on va essayer de trouver une solution
        console.log("sudoku DONT");
    }
    
    let finalSudoku = calculSudoku(twoDimArray)

    let sudoku = ""

    for (let i = 0; i < finalSudoku.length; i++) {
        for (let y = 0; y < 9; y++) {
            sudoku += finalSudoku[i][y]
        }
        sudoku += '\n'
        
    }

    console.log(sudoku);

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

//resultat
resolveSudo(arg1)