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
const signePrioRgx = /\*|\/|\%/ //expression permettant de reconnaitre un signe opérateur prioritaire (* / et %)
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

    //boucle sur le tableau 
    for (let i = 0; i < arr.length; i++) {
        console.log("on recommence dans le FOR ! on compare : " + arr[i]);

        //permet de vérifier que le calcul ne comporte plus de ()
        let countComa = 0
        arr.forEach(char => {
            if (char.includes("(")) countComa ++
            console.log("count ( : "+ char);
            console.log(countComa);
        });
        console.log("finalCount in for : " + countComa );

        let indexComaStart = 0
        let comaCalculLength = 0
        let arrSansPrio
        let arrSansBasic

        //on trouve la parenthèse ouvrante, on sotck son index on truve la parenthèse fermante, on stock son index et on définit la taille de l'expression dans la paranthèse pour la calculer et la retourner
        if (arr[i].includes("(")) {

            console.log("il y a une ( dans : "+ arr);

            indexComaStart = i
            for (let y = indexComaStart; y < arr.length; y++) {
                if (arr[y].includes(")")) {
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
            console.log("sansComa :" +arraySansComa);

            //On fais les calculs des opérateurs prioritaires
            arrSansPrio = calculSignePrio(arraySansComa)
            console.log("prio :"+ arrSansPrio);

            //on fait les derniers calculs
            arrSansBasic = calculSigneBasic(arrSansPrio);
            console.log("1)basic :  "+arrSansBasic);

            //si notre retour fais length = 1 on return sinon on recommence
            if (countComa > 1) {

                console.log("encore des parenthèse ?");
                
                console.log("1)état tableau avant splice : "+arr);
                //on remplace la partie qu'on vient de calculer et on passe à l'autre parenthese
                console.log("elem à remplacer dans arr: "+ arr[i] + " > à emplacement : "+ i);
                arr.splice(i, 0, arrSansBasic.toString())
                console.log("1)état tableau APRÈS splice : "+arr);

                console.log("on reboucle !!!");
                //donc pour ça on rappelle la f() elle meme
                isolationParenthese(arr);
            }
            
            console.log("pour : "+  countComa);
            console.log("2)état tableau avant splice : "+arr);

            console.log("élém remplacé: "+arrSansBasic +" , à l'index : "+ i);
            //on return le tableau de base simplifié par les parenthèse
            arr.splice(i, 0, arrSansBasic.toString());

            console.log("2)état tableau APRÈS splice : "+arr);

            return arr;
        }
        console.log("hors du if : "+arr);
    }
    //pas de () donc on renvois au code de base
    return arr

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

                    //On supprime le bloc qu'on a calculé et on remplace par notre résultat
                    arr.splice(i-1, 3, resultF)
                    console.log("res multiplication:  "+arr);

                    //si dernier calcul on retourn la valeur
                    if (arr.length == 1) {
                        return resultF
                    } else {
                    //Sinon on va voir remplacer par un chiffre
                        return arr
                    }

                case "/":
                    //On fait le calcul
                    resultF = nombrePreced / nombreSuiv

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

                case "%":
                    //on fait le calcul
                    resultF = nombrePreced % nombreSuiv

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

                default:
                    break;
            }
        } 
    }
    //si aucun on return pour traiter le cas suivant
    return arr 
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
                    console.log("res addition: "+arr);
                    
                    //si dernier calcul on retourn la valeur
                    if (arr.length == 1) {
                        return resultF
                    } else {
                    //Sinon on va voir remplacer par un chiffre
                        return arr
                    }

                case "-":
                    //on fait le calcul
                    resultF = nombrePreced - nombreSuiv

                    //On supprime le bloc qu'on a calculé et on remplace par notre résultat
                    arr.splice(i-1, 3, resultF)

                    //si dernier calcul on retourn la valeur
                    if (arr.length == 1) {
                        return resultF
                    } else {
                    //Sinon on va voir remplacer par un chiffre
                        return arr
                    }

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
        console.log("on relance car soucis");
        operation(strArr.join().replaceAll(",", " "));
    } 
    // else {
    //     resultCalcul = strArr
    //     console.log("res : "+resultCalcul);
    //     return resultCalcul
    // }
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