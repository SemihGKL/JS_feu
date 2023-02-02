/* ---LABIRYNTHE---

Créez un programme qui trouve le plus court chemin entre l’entrée et la sortie d’un labyrinthe en évitant les obstacles.


Le labyrinthe est transmis en argument du programme. La première ligne du labyrinthe contient les informations pour lire la carte : LIGNESxCOLS, caractère plein, vide, chemin, entrée et sortie du labyrinthe. 


Le but du programme est de remplacer les caractères “vide” par des caractères “chemin” pour représenter le plus court chemin pour traverser le labyrinthe. Un déplacement ne peut se faire que vers le haut, le bas, la droite ou la gauche.

Exemples d’utilisation :
$> cat -e example.map
10x10* o12$
*****2****$
* *   ****$
*   **** *$
* ****   *$
*  *     2$
*  ** *  *$
*     * **$
***  **  *$
1     ****$
**********$

$> ruby exo.rb example.map
10x10* o12
*****2****
* *   **** 
*   **** *
* ****   * 
*  * oooo2
*  **o*  *
*  ooo* **
***o **  *
1ooo  ****
**********
=> SORTIE ATTEINTE EN 12 COUPS !


Vous devez gérer les erreurs / Vous trouverez un générateur de labyrinthe en annexe de cet exercice.

---- ANNEXE : ----

Voici un générateur de labyrinthe écrit en Ruby :


if ARGV.count < 3 || ARGV[2].length < 5
  puts “params needed: height width characters”
else
  height, width, chars, gates = ARGV[0].to_i, ARGV[1].to_i, ARGV[2], ARGV[3].to_i
  entry = rand(width - 4) + 2
  entry2 = rand(width - 4) + 2
  puts("#{height}x#{width}#{ARGV[2]}")
  height.times do |y|
    width.times do |x|
      if y == 0 && x == entry
        print chars[3].chr
      elsif y == height - 1 && x == entry2
        print chars[4].chr
      elsif y.between?(1, height - 2) && x.between?(1, width - 2) && rand(100) > 20
        print chars[1].chr
      else
        print chars[0].chr
      end
    end
    print "\n"
  end
end

*/

//initalize variables
let args = process.argv
let arg1 = args[2]
let arg2 = args[3]

const fs = require('fs');
const encodage = 'utf8'
let datas
let begin = []
let exit = []
const labCln = 10
const labLgn = 10
const labEnd = '2'
const labStart = '1'
let historiqueCoord = []



//used f()

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

function directionPossibilities(plat, lgn, cln) {
  let down, top, right, left
  let direction = []
  down = [plat[lgn+1][cln], lgn+1, cln]
  top = [plat[lgn-1][cln], lgn-1, cln]
  right = [plat[lgn][cln+1], lgn, cln+1]
  left = [plat[lgn][cln-1], lgn, cln-1]

  direction.push(right, top, left, down)

  //finir le jeu
  if (down == '2' || top== '2' || right == '2' || left== '2') {
    return 'stop'
  }

  return direction
}

function directionChoice(plat, dir) {

  for (let i = 0; i < dir.length-1; i++) {
    if (dir[i][0] == " ") {
      let lgn = dir[i][1], cln = dir[i][2]
      //alors on avance dans la dir en question dans l'ordre
      console.log(dir[i]);
      historiqueCoord.push(lgn, cln)
      return dir[i]
    }
  }

}


function findPath(plat, start) {

  let lgnStart = start[0], clnStart = start[1]
  let resDirection

  while (resDirection !== 'stop') {

    resDirection = directionPossibilities(plat, lgnStart, clnStart)

    let choice = directionChoice(plat, resDirection)

    lgnStart = choice[1]
    clnStart = choice[2]
    console.log(lgnStart,clnStart);
  }

  return
}

//mainf()
function labyr(file) {
  let fileContent = getFileContent(file)

  //get all variables we need
  const allElems = fileContent.split("\n")

  // const nbLgn = allElems[0][0]
  // const nbCln = allElems[0][1]
  // const labStart = allElems[0][2]
  // const labEnd = allElems[0][3]

  // //récupérer le plateau de jeu uniquement
  const plateau = allElems.slice(1)
  console.log(plateau);
  //each row
  for (let i = 0; i < plateau.length; i++) {
    //each element
    for (let j = 0; j < plateau[i].length; j++) {
      //we find the start
      if (plateau[i][j] == labStart) {
        begin.push(i,j)
        findPath(plateau, begin)
      }
    }
  }

}





//error management
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

//result

labyr(arg1);