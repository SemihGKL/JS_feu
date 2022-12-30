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


1- Commencez par représenter le sudoku sous forme d'un tableau à deux dimensions contenant des chiffres de 1 à 9. Si une case est vide, utilisez la valeur 0.

2- Écrivez une fonction qui prend en entrée le tableau du sudoku et qui retourne un booléen indiquant si la grille est valide ou non. Pour vérifier la validité, vous pouvez vérifier que chaque ligne, chaque colonne et chaque région 3x3 contient tous les chiffres de 1 à 9.

3- Écrivez une fonction récursive qui essaie de remplir la grille de sudoku de manière récursive en testant chaque valeur possible pour chaque case vide. Si la grille est valide après avoir rempli une case, passez à la case suivante et continuez à remplir la grille de manière récursive. Si la grille devient invalide à un certain point, revenez en arrière et essayez une autre valeur pour la case précédemment remplie.

4- Appelez la fonction récursive avec le tableau du sudoku en entrée. Si la fonction retourne true, cela signifie que le sudoku a été résolu avec succès. Si la fonction retourne false, cela signifie qu'il n'est pas possible de résoudre le sudoku avec les données fournies.

*/


//initialisation des variables
let args = process.argv
let arg1 = args[2]
let arg2 = args[3]
let arg3 = args[4]
let datas


//f() utilisées

//permet de recup le contenu d'un fichier
function getFileContent(fileName){
    datas = fs.readFileSync(fileName, encodage)
    return datas
}

//f() qui découpe le sudoku en ligne
function twoDimensionArrSudoku() {

}

//main f()
function resolveSudo(sdkFile) {
    

}


//gestion des erreurs



//resultat