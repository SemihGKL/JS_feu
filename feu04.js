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