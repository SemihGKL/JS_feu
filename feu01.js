/* ---EVALUER UNE EXPRESSION---

Créez un programme qui reçoit une expression arithmétique dans une chaîne de caractères et en retourne le résultat après l’avoir calculé.

Vous devez gérer les 5 opérateurs suivants : “+” pour l’addition, “-” pour la soustraction, “*” la multiplication, “/” la division et “%” le modulo.

Exemple d’utilisation :


$> ruby exo.rb “4 + 21 * (1 - 2 / 2) + 38”
42


Vous pouvez partir du principe que la chaîne de caractères donnée en argument sera valide.

*/

//initalisation des variables
const args = process.argv.slice(2)
const arg1 = process.argv[2]
const arg2 = process.argv[3]
const arg3 = process.argv[4]
const nbRegex = /^-?[0-9]\d*(\.\d+)?$/ //Expression permettant de trouver un nombre décimal
const signePrioRgx = /[\*\/\%]+/ //expression permettant de reconnaitre un signe opérateur prioritaire (* / et %)
const signeBasicRgx = /\+|\-/ //expression permettant de reconnaitre un signe opérateur basique (+ et -)
let resultF= 0
let arraySimplifie = []
let resultCalcul


//fonctions utilisées

//Number test
function isNotNumber(args){
    let counter = 0
    for (let i = 0; i < args.length; i++) {
        if (args[i].match(nbRegex)) {
            counter ++
        } else {

        }        
    }
    return counter
}

//Fonction permettant d'isoler les parenthèse de calculer ce qu'elles contiennent et de réinjecter au bon index le resultat dans l'opération de base. 
function isolationParenthese(array) {

    arr = [...array]
    //boucle sur le tableau de base 
    for (let i = 0; i < arr.length; i++) {

        let indexComaStart = 0
        let comaCalculLength = 0
        let arrSansPrio
        let arrSansBasic

        //on trouve la parenthèse ouvrante, on sotck son index on truve la parenthèse fermante, on stock son index et on définit la taille de l'expression dans la paranthèse pour la calculer et la retourner
        if (arr[i].includes("(")) {
            console.log(arr);

            indexComaStart = i
            for (let y = indexComaStart; y < arr.length; y++) {
                if (array[y].includes(")")) {
                    comaCalculLength = y - i
                    break
                }
            }
            
            //On stock ici notre morceau de tableau tronqué
            let comaArray = arr.splice(i, comaCalculLength+1)

            //on supprime les ( ) pour le calcul
            let stringSansComa = comaArray.join();
            stringSansComa = stringSansComa.replace("(", "");
            stringSansComa = stringSansComa.replace(")", "");

            //on refait notre arr pour la suite : 
            let arraySansComa = stringSansComa.split(",")

            //On fais les calculs des opérateurs prioritaires
            arrSansPrio = calculSignePrio(arraySansComa)

            //on fait les derniers calculs
            arrSansBasic = calculSigneBasic(arrSansPrio)
            console.log("ici:  "+arrSansBasic);

            //si notre retour fais length = 1 on return sinon on recommence
            if (arrSansBasic.length > 1) {
                isolationParenthese(arrSansBasic)
            }

            //on return le tableau de base simplifié par les parenthèse
            // //si le signe précédent est un sign prio et que notre resultat ==0 alors retourner 1
            // if (arr[i-1].match(signePrioRgx) && arrSansBasic[0] == 0) {
            //     arr.splice(i, 0, 1)
            //     return arr
            // } 
            
            // let resultArr = arr.splice(i, 0, arrSansBasic[0])
            // console.log(resultArr);
            arr.splice(i, 0, arrSansBasic[0])

            return arr
        }
        //pas de () donc on renvois au code de base
        else return arr
    }

}


//Fonction permettant de chercher les opérateurs prioritaires et de faire le calcul puis de réinjecter le resultat au bon index
function calculSignePrio(arr) {
    for (let i = 0; i < arr.length; i++) {

        //on identifie les signe prio pour le calcul
        if (arr[i].match(signePrioRgx)) {

            //on définit les nombres qui l'entoure pour le calcul
            let nombrePreced = parseInt(arr[i-1])
            let nombreSuiv = parseInt(arr[i+1])

            switch (arr[i]) {
                case "*":
                    //On fait le calcul
                    resultF = nombrePreced * nombreSuiv
                    //On supprime le bloc qu'on vient de calculer du arr
                    arr.splice(i-1, i+1)
                    //on réinsère la valeur à l'endroit du calcul
                    arr[i] = resultF

                    return arr;

                case "/":
                    //On fait le calcul
                    resultF = nombrePreced / nombreSuiv
                    //On supprime le bloc du arr
                    arr.splice(i-1, i+1)
                    //on réinsère la valeur à l'endroit du calcul
                    arr[i-1] = resultF

                    return arr;

                case "%":
                    resultF = nombrePreced % nombreSuiv
                    //On supprime le bloc du arr
                    arr.splice(i-1, i+1)
                    //on réinsère la valeur à l'endroit du calcul
                    arr[i-1] = resultF
                    // console.log(arr)
                    return arr;

                default:

                    break;
            }
        } 
        //si aucun on return pour traiter le cas suivant
        else return arr 
    }
    
}


//Calcul avec le + et -
function calculSigneBasic(arr) {
    for (let i = 0; i < arr.length; i++) {

        //on identifie les signe basiques pour le calcul
        if (arr[i].match(signeBasicRgx)) {

            //on définit les nombres qui l'entoure
            let nombrePreced = parseInt(arr[i-1])
            let nombreSuiv = parseInt(arr[i+1])

            switch (arr[i]) {
                case "+":
                    //on fait le calcul
                    resultF = nombrePreced + nombreSuiv

                    //On supprime le bloc qu'on a calculé et on remplace par notre résultat
                    arr.splice(i-1, 3, resultF)
                    console.log(arr);
                    
                    //si dernier calcul on retourn la valeur
                    if (arr.length == 1) {
                        return resultF
                    } else {
                    //Sinon on va voir remplacer par un chiffre
                        return arr
                    }

                    break;

                case "-":
                    resultF = nombrePreced - nombreSuiv
                    //On supprime le bloc du arr
                    arr.splice(i-1, i+1)

                    //on réinsère la valeur à l'endroit du calcul (si plus assez délément on return la réponse)
                    if (arr.length < 4) {
                        return arr = [resultF]
                    }

                    //on affecte la valeur au tableau
                    arr[i-1] = resultF
                    // console.log(arr)
                    return arr;

                default:

                    break;
            }
        }
    }
}

//main f()
function operation(calcul){
    console.log(calcul);
    let strArr = calcul.split(" ")



    //etape 1 suppression parenthèse
    strArr = isolationParenthese(strArr)
    console.log("1 :"+strArr);
    

    //etape 2 : suppression des opérateurs prioritaires
    strArr = calculSignePrio(strArr)
    console.log("2 :"+strArr);

    //etape 3 : suppression des opérateurs basiques
    strArr = calculSigneBasic(strArr)
    console.log("3 :"+strArr);
    

    //si on a pas encore de résultat on reboucle en passant un argument conforme
    if (strArr.length >1) {
        operation(strArr.join().replaceAll(",", " "));
    } else {
        resultCalcul = strArr
        console.log("res : "+resultCalcul);
        return resultCalcul
    }
}


//gestion d'erreurs
if (arg1 == undefined || arg2 !== undefined) {
    console.log("Merci d'entrer 1 arguments valables");
    return
}

if (isNotNumber(args) > 0) {
    console.log("Ce script ne peut prendre que des chiffres en arguments");
    return
}


//traitement
let resultFinal = operation(arg1)


//affichage
console.log("fini :"+resultFinal);