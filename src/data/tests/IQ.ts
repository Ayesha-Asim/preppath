import type { Question } from "./types";

export const Questions: Question[] = [
{
question: "What is the next term in the series: 2, 6, 12, 20, 30, ?",
options: ["40", "41", "42", "44"],
answer: 2,
explanation: "The differences are +4, +6, +8, +10, so the next difference is +12. Therefore, 30 + 12 = 42."
},
{
question: "Find the missing letter: A, C, F, J, O, ?",
options: ["T", "U", "V", "W"],
answer: 1,
explanation: "The jumps are +2, +3, +4, +5 letters. The next jump is +6, so O + 6 = U."
},
{
question: "Which number replaces the question mark: 3, 7, 15, 31, ?",
options: ["61", "62", "63", "64"],
answer: 2,
explanation: "Each term is doubled and 1 is added: 3→7→15→31. So next is 31 × 2 + 1 = 63."
},
{
question: "If CAT is coded as DBU, how is DOG coded?",
options: ["EPH", "EPI", "FQH", "EQH"],
answer: 0,
explanation: "Each letter is shifted forward by 1: C→D, A→B, T→U. So DOG becomes EPH."
},
{
question: "Which is the odd one out?",
options: ["Square", "Rectangle", "Triangle", "Parallelogram"],
answer: 2,
explanation: "Square, rectangle, and parallelogram are all quadrilaterals; triangle has only three sides."
},
{
question: "If in a certain code LANGUAGE is written as NCPIWCIG, how is COMPUTER written?",
options: ["EQORWVGT", "FRPSXWHU", "EQNQWVGT", "DPNQWVFS"],
answer: 0,
explanation: "Each letter is shifted forward by 2 positions in the alphabet. So COMPUTER becomes EQORWVGT."
},
{
question: "A man walks 4 km north, then 3 km east. How far is he from the starting point?",
options: ["5 km", "6 km", "7 km", "8 km"],
answer: 0,
explanation: "This forms a right triangle with legs 4 and 3. Distance = √(4² + 3²) = 5 km."
},
{
question: "If A is the brother of B, B is the sister of C, and C is the father of D, what is A to D?",
options: ["Uncle", "Brother", "Father", "Grandfather"],
answer: 0,
explanation: "A is sibling of B, and B is sibling of C, so A and C are siblings. Since C is D's father, A is D's uncle."
},
{
  question: "Find the missing number: 4, 9, 19, 39, ?",
  options: ["69", "77", "79", "81"],
  answer: 2,
  explanation: "Each term is obtained by multiplying the previous term by 2 and adding 1: 4×2+1=9, 9×2+1=19, 19×2+1=39. Therefore, 39×2+1=79."
},
{
question: "Choose the related pair: Bird : Nest :: Bee : ?",
options: ["Hive", "Web", "Burrow", "Den"],
answer: 0,
explanation: "A bird lives in a nest; a bee lives in a hive."
},
{
question: "What is the mirror image of the word 'FAST' if written normally and viewed in a vertical mirror?",
options: ["TSAF", "AFST", "SFAT", "FSAT"],
answer: 0,
explanation: "A vertical mirror reverses the order of letters, so FAST becomes TSAF."
},
{
question: "Which direction will a person face if he starts facing north, turns right, then left, then left?",
options: ["North", "South", "East", "West"],
answer: 3,
explanation: "North → right = East → left = North → left = West. Therefore the final direction is West."
},
{
question: "A woman introduces a man and says, 'He is the son of the only son of my grandfather.' How is the man related to the woman?",
options: ["Brother", "Father", "Cousin", "Uncle"],
answer: 0,
explanation: "The only son of her grandfather is her father. The son of her father is her brother. Therefore, the man is her brother."
},
{
question: "Two statements are given: All pens are books. Some books are papers. What can be concluded?",
options: ["Some pens are papers", "No pen is paper", "Some books are pens", "All papers are pens"],
answer: 2,
explanation: "If all pens are books, then every pen is a book. So some books can be pens, but not necessarily papers."
},
{
question: "Which conclusion follows: All athletes are fit. Some fit people are students. Therefore:",
options: ["All students are athletes", "Some athletes are students", "No athlete is a student", "Some fit people may be athletes"],
answer: 3,
explanation: "The premises do not prove athletes are students, but they do allow that some fit people may be athletes. This is the only safe conclusion among the options."
},
{
question: "A clock shows 3:20. What is the angle between the hour and minute hands?",
options: ["10°", "20°", "30°", "40°"],
answer: 1,
explanation: "Minute hand at 20 minutes = 120°. Hour hand at 3:20 = 90° + 10° = 100°. Difference = 20°."
},
{
question: "What day of the week was 14 August 2025?",
options: ["Thursday", "Friday", "Saturday", "Sunday"],
answer: 0,
explanation: "14 August 2025 was Thursday."
},
{
question: "If x = 2y and y = 3z, then x : z = ?",
options: ["2:3", "3:2", "6:1", "5:1"],
answer: 2,
explanation: "x = 2y and y = 3z, so x = 2 × 3z = 6z. Therefore x:z = 6:1."
},
{
question: "Which figure completes the pattern: circle, square, circle+square, circle, square, ?",
options: ["Circle", "Square", "Circle+Square", "Triangle"],
answer: 2,
explanation: "The sequence repeats every three terms: circle, square, circle+square. The next term is circle+square."
},
{
question: "If 1, 8, 27, 64, ? are given, what comes next?",
options: ["100", "125", "144", "216"],
answer: 1,
explanation: "These are cubes: 1³, 2³, 3³, 4³. Next is 5³ = 125."
},
{
question: "How many rectangles are there in a 2×2 grid?",
options: ["5", "6", "8", "9"],
answer: 3,
explanation: "A 2×2 grid has 9 rectangles in total."
},
{
question: "Three friends A, B, and C sit in a row. B is in the middle. A is left of B. Where is C?",
options: ["Left of A", "Right of B", "Middle", "Cannot be determined"],
answer: 1,
explanation: "Since B is in the middle and A is left of B, C must be right of B."
},
{
question: "A train 180 m long passes a pole in 9 seconds. What is its speed?",
options: ["54 km/h", "60 km/h", "72 km/h", "80 km/h"],
answer: 2,
explanation: "Speed = distance/time = 180/9 = 20 m/s = 72 km/h."
},
{
question: "If the word 'MATH' is encoded as 'NBUI', what is 'TEST'?",
options: ["UFTU", "TFUU", "UFST", "VGUV"],
answer: 0,
explanation: "Each letter is shifted forward by 1. So TEST becomes UFTU."
},
{
  question: "Find the missing term: AZ, BY, CX, DW, ?",
  options: ["EV", "EU", "FV", "EW"],
  answer: 0,
  explanation: "The first letters move forward A, B, C, D, E, while the second letters move backward Z, Y, X, W, V. Therefore, the next term is EV."
},

{
question: "Which is the least like the others?",
options: ["Mercury", "Venus", "Earth", "Moon"],
answer: 3,
explanation: "Mercury, Venus, and Earth are planets; Moon is a natural satellite."
},
{
question: "A man said, 'That boy is the son of my mother's only son.' Who is the boy to the man?",
options: ["Son", "Brother", "Nephew", "Cousin"],
answer: 0,
explanation: "My mother's only son means the man himself. So the boy is his son."
},
{
question: "If all roses are flowers and some flowers fade quickly, which statement is valid?",
options: ["All roses fade quickly", "Some roses may fade quickly", "No rose fades quickly", "All flowers are roses"],
answer: 1,
explanation: "Since some flowers fade quickly and roses are flowers, some roses may fade quickly is logically possible, but not guaranteed. In standard reasoning tests, this is the safest valid option."
},
{
question: "Which number should replace the question mark: 11, 13, 17, 19, 23, ?",
options: ["24", "25", "27", "29"],
answer: 3,
explanation: "These are consecutive prime numbers. The next prime after 23 is 29."
},
{
question: "A person is facing south. He turns 90° clockwise, then 180° anticlockwise. Final direction?",
options: ["North", "East", "West", "South"],
answer: 1,
explanation: "South → clockwise 90° = West. West → anticlockwise 180° = East."
},
{
question: "Which number does not belong in the series: 3, 6, 12, 24, 50, 96?",
options: ["24", "50", "96", "12"],
answer: 1,
explanation: "The pattern is multiplying by 2: 3, 6, 12, 24, 48, 96. Therefore, 50 does not fit the pattern."
},
{
question: "Which option best completes the analogy: Hand : Glove :: Foot : ?",
options: ["Sock", "Shoe", "Cap", "Belt"],
answer: 1,
explanation: "A glove covers the hand; a shoe covers the foot."
},
{
  question: "If yesterday was Tuesday, what day will it be after 10 days?",
  options: ["Friday", "Saturday", "Sunday", "Monday"],
  answer: 1,
  explanation: "If yesterday was Tuesday, today is Wednesday. Since 10 days is 7 days plus 3 days, 10 days after Wednesday is Saturday."
},
{
question: "A, B, C, D sit in a row. A is to the left of B, C is to the right of D, and B is not adjacent to C. Which arrangement is possible?",
options: ["A B D C", "D A B C", "A D B C", "C B A D"],
answer: 0,
explanation: "A B D C satisfies all conditions: A is left of B, C is right of D, and B is not adjacent to C."
},

{
question: "How many 3-digit numbers can be formed using digits 1, 2, 3, 4 without repetition?",
options: ["12", "16", "24", "36"],
answer: 2,
explanation: "3 positions from 4 digits without repetition: 4 × 3 × 2 = 24."
},
{
question: "If a cube is painted on all faces and cut into 27 equal smaller cubes, how many small cubes have exactly 2 painted faces?",
options: ["8", "12", "6", "0"],
answer: 1,
explanation: "For a 3×3×3 cube, edge cubes excluding corners have exactly 2 painted faces. There are 12 such cubes."
},
{
  question: "Statement: 'No hard worker is lazy.' Which conclusion follows logically?",
  options: [
    "No lazy person is a hard worker",
    "All lazy people are hard workers",
    "Some hard workers are lazy",
    "All workers are hard workers"
  ],
  answer: 0,
  explanation: "The statement says that the sets of hard workers and lazy people do not overlap. Therefore, if no hard worker is lazy, it is equally true that no lazy person is a hard worker."
},
{
question: "Find the missing number in the matrix row: 2, 6, 12 / 3, 12, 27 / 4, 20, ?",
options: ["40", "44", "48", "52"],
answer: 2,
explanation: "Each row follows the pattern n×1, n×(n+1), n×(2n+1). For the third row: 4×1=4, 4×5=20, and 4×12=48. Therefore, the missing number is 48."
},
{
question: "Which term completes the sequence: 2, 3, 5, 8, 13, 21, ?",
options: ["31", "32", "33", "34"],
answer: 3,
explanation: "Each term is the sum of the previous two. So 13 + 21 = 34."
},
{
question: "If 'Every engineer is smart' and 'Some smart people are creative,' what can be said?",
options: ["Some engineers are creative", "All engineers are creative", "No engineer is creative", "Some creative people are smart"],
answer: 3,
explanation: "The second premise directly states some smart people are creative, so some creative people are smart."
},
{
question: "Which is the mirror image of the numeral 3 in a vertical mirror?",
options: ["3", "Ɛ", "E", "Ʒ"],
answer: 1,
explanation: "A vertical mirror reverses the shape left-right, producing the reversed 3-like symbol Ɛ."
},
{
question: "A calendar month has 31 days and starts on Friday. What day is the 20th?",
options: ["Saturday", "Sunday", "Monday", "Tuesday"],
answer: 1,
explanation: "If the 1st is Friday, then the 8th, 15th, and 22nd are Fridays. So the 20th is Sunday."
},
{
question: "Which pair is analogous: Seed : Tree :: Egg : ?",
options: ["Bird", "Nest", "Shell", "Wing"],
answer: 0,
explanation: "A seed grows into a tree; an egg develops into a bird."
},
{
question: "If 6 workers complete a job in 12 days, how long will 8 workers take, assuming same efficiency?",
options: ["6 days", "8 days", "9 days", "10 days"],
answer: 2,
explanation: "Work is constant: 6 × 12 = 72 worker-days. With 8 workers, time = 72/8 = 9 days."
},
{
question: "Choose the correct classification: Apple, Mango, Banana, Carrot",
options: ["Apple", "Mango", "Banana", "Carrot"],
answer: 3,
explanation: "Apple, mango, and banana are fruits; carrot is a vegetable."
},
{
question: "Which option best completes the pattern: ▲, ▲▲, ▲▲▲, ▲▲▲▲, ?",
options: ["▲", "▲▲", "▲▲▲", "▲▲▲▲▲"],
answer: 3,
explanation: "The number of triangles increases by one each step. Therefore, the next term is ▲▲▲▲▲."
},
{
question: "Which number replaces the question mark: 1, 4, 9, 16, 25, ?",
options: ["30", "35", "36", "49"],
answer: 2,
explanation: "These are perfect squares: 1², 2², 3², 4², 5². The next term is 6² = 36."
},
{
question: "Find the missing letter: Z, X, U, Q, L, ?",
options: ["F", "G", "H", "I"],
answer: 0,
explanation: "The jumps are −2, −3, −4, −5. The next jump is −6. Therefore, L − 6 = F."
},
{
question: "Which sentence is a cause-and-effect relation?",
options: ["The sky is blue.", "Because the power failed, the computer shut down.", "He is tall and smart.", "The book is on the table."],
answer: 1,
explanation: "This explicitly states a cause and its effect."
},
{
question: "A boy is facing East. He turns 90° clockwise, then 180° clockwise, and finally 90° anticlockwise. Which direction is he facing now?",
options: ["North", "South", "East", "West"],
answer: 3,
explanation: "Start facing East. After a 90° clockwise turn, he faces South. After a 180° clockwise turn, he faces North. Finally, a 90° anticlockwise turn makes him face West. Therefore, the final direction is West."
},
{
  question: "A person says, 'All that glitters is not gold.' Which logical idea is expressed?",
  options: ["Appearance can be deceptive", "Gold does not glitter", "Everything shiny is false", "Nothing valuable shines"],
  answer: 0,
  explanation: "The statement means that something may appear attractive or valuable without actually being so. Therefore, appearance can be deceptive."
},
{
  question: "If P = 16 and Q = 17, what is P + Q in alphabetical position terms?",
  options: ["32", "33", "34", "35"],
  answer: 1,
  explanation: "P is the 16th letter and Q is the 17th letter. Therefore, 16+17=33."
},
{
question: "A girl starts walking towards North. She turns right, then right again, and finally left. Which direction is she facing now?",
options: ["North", "South", "East", "West"],
answer: 2,
explanation: "Start facing North. After the first right turn, she faces East. After the second right turn, she faces South. Finally, a left turn makes her face East. Therefore, she is facing East."
},


{
  "question": "CX, FU, IR, LO, ?",
  "options": ["RM", "RO", "RN", "SM"],
  "answer": 1,
  "explanation": "The first letters move forward by 3, while the second letters move backward by 3. Therefore, the next pair is RO."
},
{
  "question": "YXX, VUS, SRN, POI, ?",
  "options": ["LKE", "MLF", "MKG", "NLE"],
  "answer": 1,
  "explanation": "Each letter in the sequence moves backward by 3 positions from the corresponding letter of the previous group. Therefore, the next group is MLF."
},
{
  "question": "BCDE, CEGI, DFIL, EIMQ, ?",
  "options": ["FJNV", "FKPV", "GJOU", "FJOW"],
  "answer": 0,
  "explanation": "The letters in each position follow increasing step patterns. Continuing the same pattern gives FJNV."
},
{
  "question": "Find the odd one out:",
  "options": ["Timid", "Courageous", "Brave", "Fearless"],
  "answer": 0,
  "explanation": "Courageous, brave, and fearless describe someone who shows courage. Timid describes someone who lacks confidence or courage."
},
{
  "question": "Find the odd one out:",
  "options": ["Follower", "Devotee", "Supporter", "Opponent"],
  "answer": 3,
  "explanation": "Follower, devotee, and supporter indicate someone who supports another person or cause. Opponent indicates someone who is against it."
},
{
  "question": "Find the odd one out:",
  "options": ["Lake", "Pond", "River", "Well"],
  "answer": 3,
  "explanation": "A lake, pond, and river are natural or surface bodies of water. A well is a structure dug to obtain underground water."
},
{
  "question": "Find the odd one out:",
  "options": ["Virtuous", "Moral", "Sinful", "Righteous"],
  "answer": 2,
  "explanation": "Virtuous, moral, and righteous describe good or ethical behavior. Sinful describes behavior considered morally wrong."
},
{
  "question": "Find the odd one out:",
  "options": ["Ribbon", "Scarf", "Belt", "Necklace"],
  "answer": 3,
  "explanation": "A ribbon, scarf, and belt can be worn or tied around the body. A necklace is specifically worn around the neck as an ornament."
},
{
  "question": "Find the odd one out:",
  "options": ["Tree", "Flower", "Mushroom", "Eagle"],
  "answer": 3,
  "explanation": "A tree, flower, and mushroom are stationary organisms that do not move from place to place. An eagle is an animal that can move freely."
},
{
  "question": "Find the odd one out:",
  "options": ["France and Paris", "England and Yorkshire", "Japan and Tokyo", "Australia and Sydney"],
  "answer": 1,
  "explanation": "Paris, Tokyo, and Sydney are cities that serve as national capitals or major capital cities in the given pairs. Yorkshire is a region of England, not a city."
},
{
  "question": "Find the odd one out:",
  "options": ["France", "Nepal", "Switzerland", "Bhutan"],
  "answer": 0,
  "explanation": "Nepal, Switzerland, and Bhutan are landlocked countries. France has a coastline and is not landlocked."
},
{
  "question": "Find the odd one out:",
  "options": ["Horse", "Parrot", "Sheep", "Tiger"],
  "answer": 1,
  "explanation": "Horse, sheep, and tiger are mammals. A parrot is a bird."
},
{
  "question": "Find the odd one out:",
  "options": ["Wrench", "Screwdriver", "Hammer", "Chair"],
  "answer": 3,
  "explanation": "A wrench, screwdriver, and hammer are tools used for mechanical or construction work. A chair is a piece of furniture."
},
{
  question: "What is the digit at the 60th place to the right of the decimal point when 22/7 is written as a decimal?",
  options: ["7", "1", "2", "8"],
  answer: 0,
  explanation: "22/7 = 3.142857142857... The repeating block 142857 has 6 digits. Since 60 is divisible by 6, the 60th decimal digit is the 6th digit of the block, which is 7."
},
{
  "question": "R, the daughter of M, is married to T. S and T are brothers. How is R related to T?",
  "options": ["Daughter", "Wife", "Sister", "Cousin"],
  "answer": 1,
  "explanation": "The statement directly says that R is married to T. Therefore, R is T's wife."
},

// STOP

{
  question: "What is the next term in the series: 3, 8, 15, 24, 35, ?",
  options: ["46", "47", "48", "49"],
  answer: 2,
  explanation: "The pattern is n² - 1: 2²-1=3, 3²-1=8, 4²-1=15, 5²-1=24, 6²-1=35. Next is 7²-1 = 48."
},
{
  question: "Find the missing number: 5, 11, 23, 47, 95, ?",
  options: ["189", "190", "191", "192"],
  answer: 2,
  explanation: "Each term is multiplied by 2 and 1 is added: 5×2+1=11, 11×2+1=23, etc. So 95×2+1 = 191."
},
{
  question: "Complete the sequence: 7, 10, 16, 28, 52, ?",
  options: ["94", "96", "98", "100"],
  answer: 3,
  explanation: "The differences are +3, +6, +12, +24 (doubling each time). Next difference is +48. So 52 + 48 = 100."
},
{
  question: "What comes next: 1, 3, 7, 15, 31, 63, ?",
  options: ["125", "126", "127", "128"],
  answer: 2,
  explanation: "Each term is 2ⁿ - 1: 2¹-1=1, 2²-1=3, 2³-1=7, etc. Next is 2⁷-1 = 127."
},
{
  question: "Find the next term: 2, 5, 11, 23, 47, ?",
  options: ["93", "94", "95", "96"],
  answer: 2,
  explanation: "Pattern: multiply by 2 and add 1. 2×2+1=5, 5×2+1=11, etc. So 47×2+1 = 95."
},
{
  question: "Complete the series: 4, 7, 13, 22, 34, ?",
  options: ["47", "48", "49", "50"],
  answer: 2,
  explanation: "The differences increase by 3 each time: +3, +6, +9, +12. Next difference is +15. So 34 + 15 = 49."
},
{
  question: "What is the next number: 6, 13, 27, 55, 111, ?",
  options: ["221", "222", "223", "224"],
  answer: 2,
  explanation: "Each term is multiplied by 2 and 1 is added: 6×2+1=13, 13×2+1=27, etc. So 111×2+1 = 223."
},
{
  question: "Find the missing term: 8, 15, 29, 57, 113, ?",
  options: ["224", "225", "226", "227"],
  answer: 2,
  explanation: "Pattern: ×2-1, ×2-1, ×2-1... 8×2-1=15, 15×2-1=29, etc. So 113×2-1 = 225."
},
{
  question: "Complete: 3, 10, 29, 66, 127, ?",
  options: ["216", "217", "218", "219"],
  answer: 2,
  explanation: "The pattern is n³ + 2: 1³+2=3, 2³+2=10, 3³+2=29, 4³+2=66, 5³+2=127. Next is 6³+2 = 218."
},
{
  question: "What comes next: 9, 16, 25, 36, 49, ?",
  options: ["60", "62", "64", "66"],
  answer: 2,
  explanation: "These are perfect squares starting from 3²: 3²=9, 4²=16, 5²=25, 6²=36, 7²=49. Next is 8² = 64."
},

// Letter Series
{
  question: "Find the missing letter: B, E, H, K, N, ?",
  options: ["O", "P", "Q", "R"],
  answer: 2,
  explanation: "Each letter advances by 3 positions: B(+3)=E, E(+3)=H, H(+3)=K, K(+3)=N, N(+3)=Q."
},
{
  question: "Complete the sequence: D, G, K, N, R, ?",
  options: ["S", "T", "U", "V"],
  answer: 2,
  explanation: "The pattern alternates +3, +4: D(+3)=G, G(+4)=K, K(+3)=N, N(+4)=R, R(+3)=U."
},
{
  question: "What is the next letter: M, O, R, V, A, ?",
  options: ["G", "H", "I", "J"],
  answer: 2,
  explanation: "The jumps are +2, +3, +4, +5, +6: M(+2)=O, O(+3)=R, R(+4)=V, V(+5)=A (wrapping), A(+6)=G."
},
{
  question: "Find the missing term: P, N, L, J, H, ?",
  options: ["E", "F", "G", "H"],
  answer: 1,
  explanation: "Each letter moves backward by 2: P(-2)=N, N(-2)=L, L(-2)=J, J(-2)=H, H(-2)=F."
},
{
  question: "Complete the sequence: A, D, I, P, Y, ?",
  options: ["F", "G", "H", "J"],
  answer: 3,
  explanation: "The alphabetical positions are 1, 4, 9, 16, 25, which are 1², 2², 3², 4², 5². The next position is 6²=36. After wrapping around the 26-letter alphabet, 36-26=10, which is J."
},
{
  question: "Find the next letter: C, F, J, O, U, ?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "The jumps are +3, +4, +5, +6 and then +7. Starting from U, moving forward 7 letters and wrapping around the alphabet gives B."
},
{
  question: "What comes next: Z, Y, W, T, P, ?",
  options: ["J", "K", "L", "M"],
  answer: 1,
  explanation: "The pattern is -1, -2, -3, -4, -5: Z(-1)=Y, Y(-2)=W, W(-3)=T, T(-4)=P, P(-5)=K."
},
{
  question: "Complete the series: E, J, O, T, Y, ?",
  options: ["D", "E", "F", "G"],
  answer: 0,
  explanation: "Each letter advances by 5: E(+5)=J, J(+5)=O, O(+5)=T, T(+5)=Y, Y(+5)=D (wrapping: 25+5=30, 30-26=4=D)."
},
{
  question: "Find the missing letter: Q, O, M, K, I, ?",
  options: ["F", "G", "H", "I"],
  answer: 1,
  explanation: "Each letter moves backward by 2: Q(-2)=O, O(-2)=M, M(-2)=K, K(-2)=I, I(-2)=G."
},
{
  question: "What is the next term: H, K, N, Q, T, ?",
  options: ["U", "V", "W", "X"],
  answer: 2,
  explanation: "Each letter advances by 3: H(+3)=K, K(+3)=N, N(+3)=Q, Q(+3)=T, T(+3)=W."
},

// Coding-Decoding
{
  question: "If BOOK is coded as CPPL, how is PEN coded?",
  options: ["QFO", "QFP", "RGO", "QEO"],
  answer: 0,
  explanation: "Each letter is shifted forward by one position: B→C, O→P, O→P, K→L. Applying the same rule, P→Q, E→F and N→O. Therefore, PEN becomes QFO."
},
{
  question: "In a code, MATH is written as OCVJ. How is CODE written?",
  options: ["EQFG", "EQGE", "FQEG", "EPGE"],
  answer: 0,
  explanation: "Each letter is shifted forward by 2 positions. C→E, O→Q, D→F and E→G. Therefore, CODE becomes EQFG."
},
{
  question: "If SCHOOL is coded as TDIPPM, how is COLLEGE coded?",
  options: ["DPMMFHF", "DPMNFGF", "DPMNFHF", "DQMMFHF"],
  answer: 0,
  explanation: "Each letter is shifted forward by one position. C→D, O→P, L→M, L→M, E→F, G→H and E→F. Therefore, COLLEGE becomes DPMMFHF."
},
{
  question: "If TEACHER is coded as VGCEJGT, how is STUDENT coded?",
  options: ["UWVFGPV", "UVWFGPV", "UWVFGPU", "UVWFGPU"],
  answer: 1,
  explanation: "Each letter is shifted forward by 2 positions. S→U, T→V, U→W, D→F, E→G, N→P and T→V. Therefore, STUDENT becomes UVWFGPV."
},
{
  question: "In a certain code, FLOWER is written as GMPXFS. How is GARDEN coded?",
  options: ["HBSFEO", "HBSFEN", "HASFEO", "HBSGEO"],
  answer: 0,
  explanation: "Each letter is shifted forward by 1: F→G, L→M, O→P, W→X, E→F, R→S. So G→H, A→B, R→S, D→E, E→F, N→O. GARDEN becomes HBSFEO."
},
{
  question: "If COMPUTER is coded as DPNQVUFS, how is KEYBOARD coded?",
  options: ["LFZCPBSE", "LFZCPSEB", "LFZCPSDB", "LGZCPBSE"],
  answer: 0,
  explanation: "Each letter is shifted forward by one position. K→L, E→F, Y→Z, B→C, O→P, A→B, R→S and D→E. Therefore, KEYBOARD becomes LFZCPBSE."
},
{
  question: "If DESK is coded as EFTL, how is CHAIR coded?",
  options: ["DIBJS", "DIBKS", "DJBJR", "DIBJR"],
  answer: 0,
  explanation: "Each letter is shifted forward by 1: D→E, E→F, S→T, K→L. So C→D, H→I, A→B, I→J, R→S. CHAIR becomes DIBJS."
},
{
  question: "In a code language, RAIN is written as TCKP. How is SNOW coded?",
  options: ["UOQY", "UPQX", "UOQX", "UPQY"],
  answer: 3,
  explanation: "Each letter is shifted forward by 2 positions. S→U, N→P, O→Q and W→Y. Therefore, SNOW becomes UPQY."
},
{
  question: "If BRIGHT is coded as CSJHIU, how is DARK coded?",
  options: ["EBSL", "EBSK", "FBSL", "ECSL"],
  answer: 0,
  explanation: "Each letter is shifted forward by 1: B→C, R→S, I→J, G→H, H→I, T→U. So D→E, A→B, R→S, K→L. DARK becomes EBSL."
},
{
  question: "If TABLE is coded as UBGMF, how is CHAIR coded?",
  options: ["DIBJS", "DIBKS", "DJBJR", "EJCKS"],
  answer: 0,
  explanation: "Each letter is shifted forward by 1: T→U, A→B, B→C, L→M, E→F. So C→D, H→I, A→B, I→J, R→S. CHAIR becomes DIBJS."
},

// Blood Relations
{
  question: "Pointing to a photograph, a man said, 'I have no brother or sister, but that man's father is my father's son.' Whose photograph was it?",
  options: ["His own", "His son's", "His father's", "His nephew's"],
  answer: 1,
  explanation: "The man has no siblings, so 'my father's son' refers to himself. Therefore, 'that man's father' is the speaker himself, meaning the photograph is of his son."
},
{
  question: "A is the father of B. C is the daughter of D. B is the sister of C. How is D related to A?",
  options: ["Wife", "Sister", "Daughter", "Mother"],
  answer: 0,
  explanation: "B and C are sisters (both daughters). A is B's father, so A is also C's father. Since C is D's daughter, D must be A's wife."
},
{
  question: "X is the brother of Y. Y is the brother of Z. Z is the father of W. How is X related to W?",
  options: ["Uncle", "Father", "Grandfather", "Brother"],
  answer: 0,
  explanation: "X and Y are brothers, and Y is Z's brother, so X and Z are brothers. Since Z is W's father, X is W's uncle."
},
{
  question: "M is the sister of N. O is the brother of P. N is the son of O. How is M related to P?",
  options: ["Niece", "Daughter", "Sister", "Aunt"],
  answer: 0,
  explanation: "M and N are siblings. N is O's son, so M is O's daughter. O is P's brother, making M P's niece."
},
{
  question: "P is the mother of Q. R is the son of S. Q is the sister of R. How is S related to P?",
  options: ["Husband", "Brother", "Father", "Son"],
  answer: 0,
  explanation: "Q and R are siblings (Q is R's sister). P is Q's mother, so P is also R's mother. Since R is S's son, S must be P's husband."
},
{
  question: "A woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
  options: ["Mother", "Sister", "Aunt", "Grandmother"],
  answer: 0,
  explanation: "The only daughter of her mother is herself. So 'his mother' is the woman herself, meaning she is the man's mother."
},
{
  question: "K is the brother of L. M is the sister of K. N is the brother of P. P is the daughter of L. Who is the uncle of P?",
  options: ["K", "L", "M", "N"],
  answer: 0,
  explanation: "P is L's daughter. K is L's brother, so K is P's uncle."
},
{
  question: "R is the father of S. T is the son of U. S is the sister of T. How is U related to R?",
  options: ["Wife", "Sister", "Daughter", "Mother"],
  answer: 0,
  explanation: "S and T are siblings. R is S's father, so R is also T's father. Since T is U's son, U must be R's wife."
},
{
  question: "A man said to a woman, 'Your mother's husband's sister is my aunt.' How is the woman related to the man?",
  options: ["Sister", "Cousin", "Aunt", "Niece"],
  answer: 1,
  explanation: "Your mother's husband is your father. Your father's sister is your aunt. If she is also the man's aunt, they are cousins."
},
{
  question: "V is the daughter of W. X is the son of Y. V is the sister of X. How is Y related to W?",
  options: ["Husband", "Brother", "Father", "Son"],
  answer: 0,
  explanation: "V and X are siblings. W is V's parent, so W is also X's parent. Since X is Y's son, Y must be W's husband."
},

// Direction & Distance
{
  question: "A person walks 8 km north, then 6 km east, then 8 km south. How far is he from the starting point?",
  options: ["4 km", "6 km", "8 km", "10 km"],
  answer: 1,
  explanation: "After walking 8 km north and 8 km south, he's back at the original latitude. He's 6 km east from the start. Distance = 6 km."
},
{
  question: "Rahul starts from point A, walks 10 m north, turns right and walks 24 m. What is the shortest distance back to A?",
  options: ["24 m", "25 m", "26 m", "28 m"],
  answer: 2,
  explanation: "This forms a right triangle with sides 10 m and 24 m. Distance = √(10² + 24²) = √(100 + 576) = √676 = 26 m."
},
{
  question: "A car travels 15 km west, then 20 km north, then 15 km east. How far is it from the starting point?",
  options: ["15 km", "20 km", "25 km", "35 km"],
  answer: 1,
  explanation: "After 15 km west and 15 km east, the car is back at the original longitude. It's 20 km north from the start. Distance = 20 km."
},
{
  question: "Priya walks 12 m south, turns left and walks 16 m, then turns left again and walks 12 m. How far is she from the start?",
  options: ["12 m", "16 m", "20 m", "28 m"],
  answer: 1,
  explanation: "After walking 12 m south and 12 m north (second left turn), she's back at the original latitude. She's 16 m east from the start. Distance = 16 m."
},
{
  question: "A boy walks 9 km east, then 12 km north. What is the straight-line distance from his starting point?",
  options: ["15 km", "18 km", "20 km", "21 km"],
  answer: 0,
  explanation: "This forms a right triangle with legs 9 km and 12 km. Distance = √(9² + 12²) = √(81 + 144) = √225 = 15 km."
},
{
  question: "Starting from home, Ravi walks 5 km north, 12 km east, then 5 km south. How far is he from home?",
  options: ["5 km", "12 km", "13 km", "17 km"],
  answer: 1,
  explanation: "After 5 km north and 5 km south, he's back at the original latitude. He's 12 km east from home. Distance = 12 km."
},
{
  question: "A person faces north, walks 7 m, turns right and walks 24 m. What is the minimum distance to return to the start?",
  options: ["24 m", "25 m", "30 m", "31 m"],
  answer: 1,
  explanation: "This forms a right triangle with sides 7 m and 24 m. Distance = √(7² + 24²) = √(49 + 576) = √625 = 25 m."
},
{
  question: "Neha walks 20 m west, turns left and walks 15 m, then turns left and walks 20 m. How far is she from the starting point?",
  options: ["15 m", "20 m", "25 m", "35 m"],
  answer: 0,
  explanation: "After 20 m west and 20 m east (second left turn), she's back at the original longitude. She's 15 m south from the start. Distance = 15 m."
},
{
  question: "A cyclist rides 8 km south, then 15 km west. What is the direct distance from the starting point?",
  options: ["15 km", "17 km", "20 km", "23 km"],
  answer: 1,
  explanation: "This forms a right triangle with legs 8 km and 15 km. Distance = √(8² + 15²) = √(64 + 225) = √289 = 17 km."
},
{
  question: "From point P, a man walks 10 m east, 24 m north, then 10 m west. How far is he from P?",
  options: ["10 m", "24 m", "26 m", "34 m"],
  answer: 1,
  explanation: "After 10 m east and 10 m west, he's back at the original longitude. He's 24 m north from P. Distance = 24 m."
},

// Analogies
{
  question: "Complete the analogy: Doctor : Hospital :: Teacher : ?",
  options: ["Student", "School", "Book", "Class"],
  answer: 1,
  explanation: "A doctor works in a hospital; a teacher works in a school."
},
{
  question: "Book : Pages :: Wall : ?",
  options: ["Bricks", "Paint", "House", "Door"],
  answer: 0,
  explanation: "A book is made up of pages; a wall is made up of bricks."
},
{
  question: "Pen : Write :: Knife : ?",
  options: ["Sharp", "Cut", "Metal", "Kitchen"],
  answer: 1,
  explanation: "A pen is used to write; a knife is used to cut."
},
{
  question: "Water : Thirst :: Food : ?",
  options: ["Cook", "Eat", "Hunger", "Taste"],
  answer: 2,
  explanation: "Water quenches thirst; food satisfies hunger."
},
{
  question: "Eye : See :: Ear : ?",
  options: ["Listen", "Sound", "Hear", "Noise"],
  answer: 2,
  explanation: "An eye is used to see; an ear is used to hear."
},
{
  question: "Fish : Water :: Bird : ?",
  options: ["Nest", "Sky", "Air", "Tree"],
  answer: 2,
  explanation: "Fish live in water; birds live in air (fly in air)."
},
{
  question: "Hot : Cold :: Day : ?",
  options: ["Sun", "Night", "Moon", "Dark"],
  answer: 1,
  explanation: "Hot is the opposite of cold; day is the opposite of night."
},
{
  question: "Car : Road :: Train : ?",
  options: ["Station", "Track", "Engine", "Wheel"],
  answer: 1,
  explanation: "A car runs on a road; a train runs on a track."
},
{
  question: "Happy : Sad :: Win : ?",
  options: ["Game", "Lose", "Prize", "Play"],
  answer: 1,
  explanation: "Happy is the opposite of sad; win is the opposite of lose."
},
{
  question: "Moon : Satellite :: Earth : ?",
  options: ["Sun", "Planet", "Star", "Solar System"],
  answer: 1,
  explanation: "The moon is a satellite; the earth is a planet."
},

// Odd One Out
{
  question: "Find the odd one out:",
  options: ["Apple", "Orange", "Banana", "Potato"],
  answer: 3,
  explanation: "Apple, orange, and banana are fruits. Potato is a vegetable."
},
{
  question: "Find the odd one out:",
  options: ["Cat", "Dog", "Lion", "Parrot"],
  answer: 3,
  explanation: "Cat, dog, and lion are mammals. Parrot is a bird."
},
{
  question: "Find the odd one out:",
  options: ["Car", "Bus", "Train", "Boat"],
  answer: 3,
  explanation: "Car, bus, and train run on land. Boat runs on water."
},
{
  question: "Find the odd one out:",
  options: ["Pen", "Pencil", "Eraser", "Book"],
  answer: 3,
  explanation: "Pen, pencil, and eraser are writing instruments/accessories. A book is for reading."
},
{
  question: "Find the odd one out:",
  options: ["Rose", "Lotus", "Marigold", "Oak"],
  answer: 3,
  explanation: "Rose, lotus, and marigold are flowers. Oak is a tree."
},
{
  question: "Find the odd one out:",
  options: ["Square", "Circle", "Triangle", "Rectangle"],
  answer: 1,
  explanation: "Square, triangle, and rectangle have straight sides. Circle is curved."
},
{
  question: "Find the odd one out:",
  options: ["Gold", "Silver", "Iron", "Diamond"],
  answer: 3,
  explanation: "Gold, silver, and iron are metals. Diamond is a mineral/gemstone."
},
{
  question: "Find the odd one out:",
  options: ["Lion", "Tiger", "Bear", "Cow"],
  answer: 3,
  explanation: "Lion, tiger, and bear are wild animals. Cow is a domestic animal."
},
{
  question: "Find the odd one out:",
  options: ["Monday", "Tuesday", "Wednesday", "January"],
  answer: 3,
  explanation: "Monday, Tuesday, and Wednesday are days of the week. January is a month."
},
{
  question: "Find the odd one out:",
  options: ["Hindi", "Urdu", "English", "Pakistan"],
  answer: 3,
  explanation: "Hindi, Urdu, and English are languages. Pakistan is a country."
},

// Syllogism & Logical Reasoning
{
  question: "Statements: All cats are animals. Some animals are pets. Conclusions: I. Some cats are pets. II. Some pets are animals.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'All cats are animals' and 'Some animals are pets,' we cannot conclude that some cats are pets. However, 'Some animals are pets' directly implies 'Some pets are animals.' Only II follows."
},
{
  question: "Statements: No dog is a cat. All cats are mammals. Conclusions: I. No dog is a mammal. II. Some mammals are cats.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'No dog is a cat' and 'All cats are mammals,' we cannot conclude that no dog is a mammal. However, 'All cats are mammals' implies 'Some mammals are cats.' Only II follows."
},
{
  question: "Statements: Some books are pens. All pens are papers. Conclusions: I. Some books are papers. II. All papers are books.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 0,
  explanation: "From 'Some books are pens' and 'All pens are papers,' we can conclude 'Some books are papers.' However, we cannot conclude 'All papers are books.' Only I follows."
},
{
  question: "Statements: All flowers are plants. Some plants are trees. Conclusions: I. All flowers are trees. II. Some trees are plants.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'All flowers are plants' and 'Some plants are trees,' we cannot conclude 'All flowers are trees.' However, 'Some plants are trees' implies 'Some trees are plants.' Only II follows."
},
{
  question: "Statements: No pen is a pencil. Some pencils are erasers. Conclusions: I. No pen is an eraser. II. Some erasers are pencils.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'No pen is a pencil' and 'Some pencils are erasers,' we cannot conclude 'No pen is an eraser.' However, 'Some pencils are erasers' implies 'Some erasers are pencils.' Only II follows."
},
{
  question: "Statements: All students are learners. Some learners are teachers. Conclusions: I. All students are teachers. II. Some teachers are learners.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'All students are learners' and 'Some learners are teachers,' we cannot conclude 'All students are teachers.' However, 'Some learners are teachers' implies 'Some teachers are learners.' Only II follows."
},
{
  question: "Statements: Some cars are buses. All buses are vehicles. Conclusions: I. Some cars are vehicles. II. All vehicles are buses.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 0,
  explanation: "From 'Some cars are buses' and 'All buses are vehicles,' we can conclude 'Some cars are vehicles.' However, we cannot conclude 'All vehicles are buses.' Only I follows."
},
{
  question: "Statements: No bird is a fish. All fish are aquatic. Conclusions: I. No bird is aquatic. II. Some aquatic animals are fish.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'No bird is a fish' and 'All fish are aquatic,' we cannot conclude 'No bird is aquatic.' However, 'All fish are aquatic' implies 'Some aquatic animals are fish.' Only II follows."
},
{
  question: "Statements: All doctors are professionals. Some professionals are honest. Conclusions: I. All doctors are honest. II. Some honest people are professionals.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 1,
  explanation: "From 'All doctors are professionals' and 'Some professionals are honest,' we cannot conclude 'All doctors are honest.' However, 'Some professionals are honest' implies 'Some honest people are professionals.' Only II follows."
},
{
  question: "Statements: Some apples are fruits. All fruits are healthy. Conclusions: I. Some apples are healthy. II. All healthy things are fruits.",
  options: ["Only I follows", "Only II follows", "Both I and II follow", "Neither follows"],
  answer: 0,
  explanation: "From 'Some apples are fruits' and 'All fruits are healthy,' we can conclude 'Some apples are healthy.' However, we cannot conclude 'All healthy things are fruits.' Only I follows."
},

// Mathematical Reasoning
{
  question: "If 5 men can complete a work in 12 days, how many days will 10 men take?",
  options: ["4 days", "5 days", "6 days", "8 days"],
  answer: 2,
  explanation: "Work is constant: 5 × 12 = 60 man-days. With 10 men, time = 60/10 = 6 days."
},
{
  question: "A number is increased by 20% and then decreased by 20%. What is the net percentage change?",
  options: ["0%", "2% decrease", "4% decrease", "4% increase"],
  answer: 2,
  explanation: "Let the number be 100. After 20% increase: 120. After 20% decrease: 120 - 24 = 96. Net change = 96 - 100 = -4, which is 4% decrease."
},
{
  question: "The average of 5 numbers is 20. If one number is excluded, the average becomes 18. What is the excluded number?",
  options: ["26", "28", "30", "32"],
  answer: 1,
  explanation: "Sum of 5 numbers = 5 × 20 = 100. Sum of 4 numbers = 4 × 18 = 72. Excluded number = 100 - 72 = 28."
},
{
  question: "If x : y = 3 : 4 and y : z = 2 : 5, find x : z.",
  options: ["3:10", "6:5", "5:6", "10:3"],
  answer: 0,
  explanation: "x : y = 3 : 4 and y : z = 2 : 5. Making y common: x : y = 3 : 4 = 3 : 4, y : z = 4 : 10. So x : y : z = 3 : 4 : 10. Therefore x : z = 3 : 10."
},
{
  question: "A train covers 240 km in 4 hours. What is its speed in m/s?",
  options: ["15 m/s", "16.67 m/s", "18 m/s", "20 m/s"],
  answer: 1,
  explanation: "Speed = 240/4 = 60 km/h. Converting to m/s: 60 × (5/18) = 300/18 = 16.67 m/s."
},
{
  question: "The sum of three consecutive even numbers is 72. What is the largest number?",
  options: ["22", "24", "26", "28"],
  answer: 2,
  explanation: "Let the numbers be x, x+2, x+4. Sum = 3x + 6 = 72. So 3x = 66, x = 22. The numbers are 22, 24, 26. Largest is 26."
},
{
  question: "If 15% of a number is 45, what is 60% of that number?",
  options: ["150", "160", "170", "180"],
  answer: 3,
  explanation: "15% = 45, so 1% = 3. Therefore 60% = 60 × 3 = 180."
},
{
  question: "A rectangle has length 12 cm and width 8 cm. What is the ratio of its area to its perimeter?",
  options: ["12:5", "5:12", "3:2", "2:3"],
  answer: 0,
  explanation: "Area = 12×8 = 96 cm². Perimeter = 2(12+8) = 40 cm. Therefore, the ratio is 96:40 = 12:5."
},
{
  question: "The product of two numbers is 120 and their sum is 22. What are the numbers?",
  options: ["10 and 12", "8 and 15", "6 and 20", "5 and 24"],
  answer: 0,
  explanation: "Let the numbers be x and y. xy = 120 and x + y = 22. Solving: x(22-x) = 120, so 22x - x² = 120, x² - 22x + 120 = 0. Factoring: (x-10)(x-12) = 0. So x = 10 or 12. The numbers are 10 and 12."
},
{
  question: "If the cost price of 12 pens equals the selling price of 10 pens, what is the profit percentage?",
  options: ["10%", "15%", "20%", "25%"],
  answer: 2,
  explanation: "Let CP of 1 pen = 1. CP of 12 pens = 12. SP of 10 pens = 12, so SP of 1 pen = 1.2. Profit = 1.2 - 1 = 0.2. Profit% = (0.2/1) × 100 = 20%."
},

// Clock & Calendar
{
  question: "What is the angle between the hour and minute hands at 4:30?",
  options: ["30°", "45°", "60°", "75°"],
  answer: 1,
  explanation: "At 4:30, minute hand is at 180°. Hour hand is at 4×30 + 30×0.5 = 120 + 15 = 135°. Angle = |180 - 135| = 45°."
},
{
  question: "At what time between 3 and 4 o'clock will the hands of a clock coincide?",
  options: ["3:15", "3:16 4/11", "3:17", "3:18"],
  answer: 1,
  explanation: "The formula for coincidence is (60/11) × H minutes past H o'clock. For H=3: (60/11) × 3 = 180/11 = 16 4/11 minutes. So the time is 3:16 4/11."
},
{
  question: "How many times do the hour and minute hands of a clock form a right angle in 12 hours?",
  options: ["22", "24", "44", "48"],
  answer: 0,
  explanation: "In a 12-hour period, the hour and minute hands are at right angles 22 times. Therefore, the correct answer is 22."
},
{
  question: "If today is Monday, what day will it be after 100 days?",
  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  answer: 2,
  explanation: "100 ÷ 7 = 14 remainder 2. So 100 days = 14 weeks + 2 days. Monday + 2 days = Wednesday."
},
{
  question: "What was the day on 15 August 1947?",
  options: ["Friday", "Saturday", "Sunday", "Monday"],
  answer: 0,
  explanation: "15 August 1947 was a Friday (historical fact - Independence Day of India/Pakistan)."
},
{
  question: "At 6:15, what is the angle between the hour and minute hands?",
  options: ["82.5°", "90°", "97.5°", "105°"],
  answer: 2,
  explanation: "At 6:15, minute hand is at 15×6 = 90°. Hour hand is at 6×30 + 15×0.5 = 180 + 7.5 = 187.5°. Angle = |187.5 - 90| = 97.5°."
},
{
  question: "How many times in a day do the clock hands overlap?",
  options: ["22", "23", "24", "25"],
  answer: 0,
  explanation: "The hands overlap 22 times in 24 hours (11 times in 12 hours, as they don't overlap at 12:00 twice in the counting)."
},
{
  question: "If 1 January 2024 was a Monday, what day was 1 January 2025?",
  options: ["Tuesday", "Wednesday", "Thursday", "Friday"],
  answer: 1,
  explanation: "2024 is a leap year (366 days). 366 ÷ 7 = 52 remainder 2. So Monday + 2 = Wednesday."
},
{
  question: "At what angle are the hands of a clock at 9:00?",
  options: ["60°", "90°", "120°", "180°"],
  answer: 1,
  explanation: "At 9:00, hour hand is at 9×30 = 270° and minute hand is at 0°. Angle = |270 - 0| = 270°, or the smaller angle is 360 - 270 = 90°."
},
{
  question: "If a clock shows 2:40, what is the reflex angle between the hands?",
  options: ["140°", "160°", "200°", "220°"],
  answer: 2,
  explanation: "At 2:40, minute hand is at 40×6 = 240°. Hour hand is at 2×30 + 40×0.5 = 60 + 20 = 80°. Smaller angle = |240 - 80| = 160°. Reflex angle = 360 - 160 = 200°."
},

// Pattern Completion
{
  question: "Complete the pattern: 2, 6, 18, 54, ?",
  options: ["108", "144", "162", "216"],
  answer: 2,
  explanation: "Each term is multiplied by 3: 2×3=6, 6×3=18, 18×3=54, 54×3=162."
},
{
  question: "Find the next term: 1, 4, 9, 16, 25, 36, ?",
  options: ["42", "45", "48", "49"],
  answer: 3,
  explanation: "These are perfect squares: 1², 2², 3², 4², 5², 6². Next is 7² = 49."
},
{
  question: "Complete: 3, 6, 12, 24, 48, ?",
  options: ["72", "84", "96", "108"],
  answer: 2,
  explanation: "Each term is doubled: 3×2=6, 6×2=12, 12×2=24, 24×2=48, 48×2=96."
},
{
  question: "What comes next: 5, 10, 20, 40, 80, ?",
  options: ["120", "140", "160", "180"],
  answer: 2,
  explanation: "Each term is multiplied by 2: 5×2=10, 10×2=20, 20×2=40, 40×2=80, 80×2=160."
},
{
  question: "Find the missing number: 7, 14, 28, 56, ?",
  options: ["84", "98", "112", "126"],
  answer: 2,
  explanation: "Each term is doubled: 7×2=14, 14×2=28, 28×2=56, 56×2=112."
},
{
  question: "Complete the series: 10, 20, 40, 80, 160, ?",
  options: ["240", "280", "320", "360"],
  answer: 2,
  explanation: "Each term is multiplied by 2: 10×2=20, 20×2=40, 40×2=80, 80×2=160, 160×2=320."
},
{
  question: "What is the next term: 4, 12, 36, 108, ?",
  options: ["216", "288", "324", "432"],
  answer: 2,
  explanation: "Each term is multiplied by 3: 4×3=12, 12×3=36, 36×3=108, 108×3=324."
},
{
  question: "Find the next number: 6, 18, 54, 162, ?",
  options: ["324", "432", "486", "648"],
  answer: 2,
  explanation: "Each term is multiplied by 3: 6×3=18, 18×3=54, 54×3=162, 162×3=486."
},
{
  question: "Complete: 8, 16, 32, 64, 128, ?",
  options: ["192", "224", "256", "384"],
  answer: 2,
  explanation: "Each term is doubled: 8×2=16, 16×2=32, 32×2=64, 64×2=128, 128×2=256."
},
{
  question: "What comes next: 9, 27, 81, 243, ?",
  options: ["486", "648", "729", "972"],
  answer: 2,
  explanation: "Each term is multiplied by 3: 9×3=27, 27×3=81, 81×3=243, 243×3=729."
},

// Seating Arrangement
{
  question: "Five friends A, B, C, D, E sit in a row facing north. A is to the immediate left of B. C is at the right end. D is between E and A. If E is at the left end, who sits in the middle?",
  options: ["A", "B", "D", "E"],
  answer: 0,
  explanation: "The arrangement is E-D-A-B-C. Therefore, A occupies the middle position."
},
{
  question: "Six people P, Q, R, S, T, U sit around a circular table facing the center. P is opposite Q. R is between P and S. T is to the immediate right of Q. Who is to the immediate left of Q?",
  options: ["P", "R", "U", "S"],
  answer: 2,
  explanation: "P is opposite Q. R is between P and S, so arrangement is P-R-S or S-R-P. T is immediate right of Q. If we place Q at bottom, P at top, T to Q's right. R between P and S means going clockwise: P-R-S or S-R-P. The person to Q's left must be U (the only one left)."
},
{
  question: "Four friends W, X, Y, Z sit in a row. W is not at either end. X is to the immediate right of W. Y is at the left end. Who is at the right end?",
  options: ["W", "X", "Y", "Z"],
  answer: 3,
  explanation: "Y is at left end (position 1). W is not at ends, so W is at position 2 or 3. X is immediate right of W. If W is at 2, X is at 3, leaving Z at 4 (right end). If W is at 3, X is at 4, but then W would be at position 3 (not end, OK). Arrangement: Y-W-X-Z or Y-Z-W-X. Since X is right of W: Y-W-X-Z. Z is at right end."
},
{
  question: "Five students M, N, O, P, Q sit in a row. M is at the left end. N is second from the right. O sits immediately between M and P. Who is in the middle?",
  options: ["M", "N", "O", "P"],
  answer: 3,
  explanation: "M is first and N is fourth. Since O sits immediately between M and P, the first three positions must be M-O-P. Therefore, P is in the middle."
},
{
  question: "Seven people A, B, C, D, E, F, G sit in a row. A is at the center. B is at the left end. C is between A and D. E is at the right end. Who is to the immediate right of A?",
  options: ["C", "D", "F", "G"],
  answer: 0,
  explanation: "Positions 1-7. B is at 1 (left end). A is at 4 (center). E is at 7 (right end). C is between A and D, so either A-C-D or D-C-A. Since we need to fill positions 2,3,5,6 with C,D,F,G and C is between A(4) and D, arrangement could be: B(1), F(2), G(3), A(4), C(5), D(6), E(7). Immediate right of A is C."
},
{
  question: "Eight people sit around a square table, two on each side facing the center. J is opposite K. L is to the immediate right of J. M is between K and N. Who is opposite L?",
  options: ["J", "K", "M", "N"],
  answer: 3,
  explanation: "J is opposite K. L is immediate right of J. M is between K and N. If J is at position 1, K at 5 (opposite), L at 2 (right of J). M between K and N means K-M-N or N-M-K around the table. The person opposite L (position 2) would be at position 6. Working through the arrangement, N ends up opposite L."
},
{
  question: "Six friends sit in two rows of three each, facing each other. A, B, C in row 1 facing south. D, E, F in row 2 facing north. A is opposite D. B is in the middle of row 1. C is opposite E. Who is opposite F?",
  options: ["A", "B", "C", "Cannot be determined"],
  answer: 1,
  explanation: "Row 1 (facing south): positions 1,2,3 with B in middle (position 2). Row 2 (facing north): positions 1,2,3. A is opposite D, so if A is at position 1, D is at position 1 of row 2. C is opposite E, so C at position 3, E at position 3 of row 2. B is at position 2 of row 1, so F must be at position 2 of row 2. B is opposite F."
},
{
  question: "Five people P, Q, R, S, T sit in a row facing north. P is not at either end. Q is to the immediate left of P. R is at the right end. S is between P and T. Who is at the left end?",
  options: ["P", "Q", "S", "T"],
  answer: 3,
  explanation: "R is at right end (position 5). P is not at ends, so P is at 2, 3, or 4. Q is immediate left of P. S is between P and T. If P is at 3, Q is at 2. S between P and T means P-S-T or T-S-P. Arrangement: T(1), Q(2), P(3), S(4), R(5). T is at left end."
},
{
  question: "Four people W, X, Y, Z sit around a circular table facing the center. W is opposite X. Y is to the immediate right of W. Who is to the immediate left of X?",
  options: ["W", "X", "Y", "Z"],
  answer: 2,
  explanation: "W is opposite X. Y is immediate right of W. Going clockwise: W-Y-X-Z or W-Y-Z-X. Since W is opposite X, arrangement is W-Y-X-Z (clockwise). Immediate left of X is Y."
},
{
  question: "Seven students A, B, C, D, E, F, G sit in a row facing south. A is at the left end. B is second from the right. C is between A and D. E is at the center. Who is at the right end?",
  options: ["B", "D", "F", "G"],
  answer: 3,
  explanation: "Positions 1-7. A is at 1 (left end). B is second from right (position 6). E is at center (position 4). C is between A and D, so A-C-D. Arrangement: A(1), C(2), D(3), E(4), F(5), B(6), G(7). G is at right end."
},

// Matrix & Grid Patterns
{
  question: "Find the missing number in the matrix:\n| 3 | 6 | 9 |\n| 4 | 8 | 12 |\n| 5 | 10 | ? |",
  options: ["13", "14", "15", "16"],
  answer: 2,
  explanation: "Each row follows the pattern: first number × 2 = second, first × 3 = third. Row 1: 3×2=6, 3×3=9. Row 2: 4×2=8, 4×3=12. Row 3: 5×2=10, 5×3=15."
},
{
  question: "Complete the matrix:\n| 2 | 4 | 6 |\n| 3 | 6 | 9 |\n| 4 | 8 | ? |",
  options: ["10", "11", "12", "13"],
  answer: 2,
  explanation: "Each row: first × 2 = second, first × 3 = third. Row 1: 2×2=4, 2×3=6. Row 2: 3×2=6, 3×3=9. Row 3: 4×2=8, 4×3=12."
},
{
  question: "Find the missing term:\n| 5 | 10 | 15 |\n| 6 | 12 | 18 |\n| 7 | 14 | ? |",
  options: ["19", "20", "21", "22"],
  answer: 2,
  explanation: "Pattern: first × 2 = second, first × 3 = third. Row 1: 5×2=10, 5×3=15. Row 2: 6×2=12, 6×3=18. Row 3: 7×2=14, 7×3=21."
},
{
  question: "Complete the grid:\n| 8 | 16 | 24 |\n| 9 | 18 | 27 |\n| 10 | 20 | ? |",
  options: ["28", "29", "30", "31"],
  answer: 2,
  explanation: "Each row: first × 2 = second, first × 3 = third. Row 1: 8×2=16, 8×3=24. Row 2: 9×2=18, 9×3=27. Row 3: 10×2=20, 10×3=30."
},
{
  question: "Find the missing number:\n| 1 | 3 | 5 |\n| 2 | 6 | 10 |\n| 3 | 9 | ? |",
  options: ["12", "13", "14", "15"],
  answer: 3,
  explanation: "Column pattern: Col 1: 1,2,3. Col 2: 3,6,9 (×3 of col 1). Col 3: 5,10,15 (×5 of col 1). So 3×5=15."
},
{
  question: "Complete the matrix:\n| 4 | 8 | 12 |\n| 5 | 10 | 15 |\n| 6 | 12 | ? |",
  options: ["16", "17", "18", "19"],
  answer: 2,
  explanation: "Pattern: first × 2 = second, first × 3 = third. Row 1: 4×2=8, 4×3=12. Row 2: 5×2=10, 5×3=15. Row 3: 6×2=12, 6×3=18."
},
{
  question: "Find the missing term:\n| 7 | 14 | 21 |\n| 8 | 16 | 24 |\n| 9 | 18 | ? |",
  options: ["25", "26", "27", "28"],
  answer: 2,
  explanation: "Each row: first × 2 = second, first × 3 = third. Row 1: 7×2=14, 7×3=21. Row 2: 8×2=16, 8×3=24. Row 3: 9×2=18, 9×3=27."
},
{
  question: "Complete the grid:\n| 10 | 20 | 30 |\n| 11 | 22 | 33 |\n| 12 | 24 | ? |",
  options: ["34", "35", "36", "37"],
  answer: 2,
  explanation: "Pattern: first × 2 = second, first × 3 = third. Row 1: 10×2=20, 10×3=30. Row 2: 11×2=22, 11×3=33. Row 3: 12×2=24, 12×3=36."
},
{
  question: "Find the missing number:\n| 2 | 5 | 8 |\n| 4 | 10 | 16 |\n| 6 | 15 | ? |",
  options: ["20", "22", "24", "26"],
  answer: 2,
  explanation: "Column pattern: Col 1: 2,4,6. Col 2: 5,10,15 (2.5× of col 1). Col 3: 8,16,24 (4× of col 1). So 6×4=24."
},
{
  question: "Complete the matrix:\n| 3 | 7 | 11 |\n| 4 | 9 | 14 |\n| 5 | 11 | ? |",
  options: ["15", "16", "17", "18"],
  answer: 2,
  explanation: "Row pattern: first + 4 = second, first + 8 = third doesn't work. Checking: Row 1: 3,7,11 (diff 4,4). Row 2: 4,9,14 (diff 5,5). Row 3: 5,11,17 (diff 6,6). So 11+6=17."
},

// Mirror & Water Images
{
  question: "What is the water image of the number 6?",
  options: ["6", "9", "∂", "6 inverted"],
  answer: 1,
  explanation: "The water image (vertical flip) of 6 appears as 9."
},
{
  question: "Which is the mirror image of the letter 'b' in a vertical mirror?",
  options: ["b", "d", "p", "q"],
  answer: 1,
  explanation: "A vertical mirror reverses left-right. The mirror image of 'b' is 'd'."
},
{
  question: "What is the water image of the word 'MOM'?",
  options: ["MOM", "WOW", "MOM inverted", "WOW inverted"],
  answer: 2,
  explanation: "The water image flips the word vertically. M becomes W-like shape, O stays O, M becomes W-like. The word appears inverted."
},
{
  question: "Find the mirror image of 'L' in a horizontal mirror (water image):",
  options: ["L", "⅃", "L upside down", "7"],
  answer: 2,
  explanation: "A horizontal mirror (water image) flips the letter vertically. L becomes L upside down (like ⅃ rotated 180°)."
},
{
  question: "What is the mirror image of '8' in a vertical mirror?",
  options: ["8", "3", "∞", "B"],
  answer: 0,
  explanation: "The number 8 is symmetrical vertically, so its mirror image is also 8."
},
{
  question: "Which letter has the same vertical mirror image?",
  options: ["A", "B", "C", "D"],
  answer: 0,
  explanation: "The letter A is symmetrical about a vertical axis, so its mirror image is the same as itself."
},
{
  question: "What is the water image of 'SWIMS'?",
  options: ["SWIMS", "SWIMS inverted", "SMIWS", "Cannot be determined"],
  answer: 1,
  explanation: "The water image flips the entire word vertically. Each letter is inverted: S stays S-like, W becomes M-like, I stays I, M becomes W-like, S stays S-like. The word appears upside down."
},
{
  question: "Find the mirror image of 'E' in a vertical mirror:",
  options: ["E", "Ǝ", "M", "W"],
  answer: 1,
  explanation: "A vertical mirror reverses left-right. The mirror image of E is Ǝ (reversed E)."
},
{
  question: "What is the water image of the number 9?",
  options: ["6", "9", "9 inverted", "P"],
  answer: 0,
  explanation: "The water image (vertical flip) of 9 appears as 6."
},
{
  question: "Which of these letters remains unchanged in a vertical mirror?",
  options: ["M", "N", "O", "P"],
  answer: 2,
  explanation: "The letter O is symmetrical about both vertical and horizontal axes, so its mirror image is the same."
},

// Dice & Cubes
{
  question: "If a standard die has 1 opposite 6, 2 opposite 5, and 3 opposite 4, what is the sum of numbers on opposite faces?",
  options: ["5", "6", "7", "8"],
  answer: 2,
  explanation: "In a standard die, opposite faces always sum to 7: 1+6=7, 2+5=7, 3+4=7."
},
{
  question: "A cube is painted on all faces and cut into 64 smaller cubes. How many small cubes have exactly one face painted?",
  options: ["8", "16", "24", "32"],
  answer: 2,
  explanation: "For a 4×4×4 cube, cubes with exactly one face painted are on the faces but not on edges or corners. Each face has (4-2)² = 4 such cubes. Total = 6 faces × 4 = 24."
},
{
  question: "If two positions of a die show: Position 1: 1,2,3 visible; Position 2: 1,4,5 visible. Which number is opposite 2?",
  options: ["3", "4", "5", "6"],
  answer: 1,
  explanation: "In position 1, 2 is adjacent to 1 and 3. In position 2, 1 is adjacent to 4 and 5. Since 1 is common, the faces adjacent to 1 are 2,3,4,5. Therefore, 6 must be opposite 1. The remaining pairs are 2-5 and 3-4 or 2-4 and 3-5. From the positions, 2 and 4 never appear together, so they could be opposite. Answer: 4."
},
{
  question: "A cube has faces numbered 1 to 6. If 1 is adjacent to 2,3,4,5, which number is opposite 1?",
  options: ["2", "3", "5", "6"],
  answer: 3,
  explanation: "If 1 is adjacent to 2,3,4,5, then the only number not adjacent to 1 is 6. Therefore, 6 is opposite 1."
},
{
  question: "How many small cubes have three faces painted when a painted cube is cut into 27 equal cubes?",
  options: ["4", "6", "8", "12"],
  answer: 2,
  explanation: "For a 3×3×3 cube, only the corner cubes have three faces painted. A cube has 8 corners, so 8 small cubes have three faces painted."
},
{
  question: "If a die shows 3 on top and 1 on front, what number is on the bottom?",
  options: ["2", "3", "4", "Cannot be determined"],
  answer: 3,
  explanation: "In a standard die, opposite faces sum to 7. If 3 is on top, the bottom face is 7-3=4."
},
{
  question: "A cube is cut into 125 smaller cubes. How many have no faces painted?",
  options: ["8", "16", "27", "64"],
  answer: 2,
  explanation: "For a 5×5×5 cube, unpainted cubes are in the interior: (5-2)³ = 3³ = 27."
},
{
  question: "Two positions of a die show: 2,3,6 and 2,4,5. What is opposite 3?",
  options: ["2", "4", "5", "6"],
  answer: 2,
  explanation: "Common face is 2. Adjacent to 2 are 3,6,4,5. So 1 is opposite 2. From standard die rules, if 2 is adjacent to 3,4,5,6, then 3 must be opposite either 4 or 5. Since 3 and 5 never appear together in the given positions, 5 could be opposite 3."
},
{
  question: "A painted cube is cut into 8 smaller cubes. How many have exactly two faces painted?",
  options: ["0", "4", "6", "8"],
  answer: 0,
  explanation: "For a 2×2×2 cube, all 8 small cubes are corner cubes with 3 faces painted. None have exactly 2 faces painted."
},
{
  question: "If opposite faces of a die sum to 7, and 5 is on top, what is on the bottom?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "Opposite faces sum to 7. If 5 is on top, bottom = 7-5 = 2."
},

// Advanced Series
{
  question: "Complete the series: 1, 1, 2, 3, 5, 8, 13, ?",
  options: ["18", "20", "21", "24"],
  answer: 2,
  explanation: "This is the Fibonacci sequence: each term is the sum of the previous two. 8+13=21."
},
{
  question: "Find the next term: 2, 3, 5, 7, 11, 13, ?",
  options: ["15", "16", "17", "19"],
  answer: 2,
  explanation: "These are consecutive prime numbers. The next prime after 13 is 17."
},
{
  question: "Complete: 1, 8, 27, 64, 125, ?",
  options: ["196", "216", "243", "256"],
  answer: 1,
  explanation: "These are perfect cubes: 1³, 2³, 3³, 4³, 5³. Next is 6³ = 216."
},
{
  question: "What comes next: 0, 3, 8, 15, 24, ?",
  options: ["32", "33", "35", "36"],
  answer: 2,
  explanation: "Pattern: n²-1 where n=1,2,3,4,5,6. So 1²-1=0, 2²-1=3, 3²-1=8, 4²-1=15, 5²-1=24, 6²-1=35."
},
{
  question: "Find the missing number: 2, 6, 12, 20, 30, 42, ?",
  options: ["54", "56", "58", "60"],
  answer: 1,
  explanation: "Pattern: n(n+1) where n=1,2,3,4,5,6,7. So 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30, 6×7=42, 7×8=56."
},
{
  question: "Complete the series: 3, 10, 21, 36, 55, ?",
  options: ["72", "75", "78", "81"],
  answer: 2,
  explanation: "Differences: +7, +11, +15, +19 (increasing by 4 each time). Next difference: +23. So 55+23=78."
},
{
  question: "What is the next term: 4, 10, 22, 46, 94, ?",
  options: ["180", "186", "190", "192"],
  answer: 2,
  explanation: "Pattern: ×2+2. 4×2+2=10, 10×2+2=22, 22×2+2=46, 46×2+2=94, 94×2+2=190."
},
{
  question: "Find the next number: 5, 13, 25, 41, 61, ?",
  options: ["81", "83", "85", "87"],
  answer: 2,
  explanation: "Differences: +8, +12, +16, +20 (increasing by 4). Next difference: +24. So 61+24=85."
},
{
  question: "Complete: 7, 13, 21, 31, 43, ?",
  options: ["55", "57", "59", "61"],
  answer: 1,
  explanation: "Differences: +6, +8, +10, +12 (increasing by 2). Next difference: +14. So 43+14=57."
},
{
  question: "What comes next: 1, 5, 14, 30, 55, ?",
  options: ["85", "90", "91", "95"],
  answer: 2,
  explanation: "Differences: +4, +9, +16, +25 (perfect squares: 2²,3²,4²,5²). Next difference: 6²=36. So 55+36=91."
},

// Word Formation & Letter Pairs
{
  question: "How many meaningful English words can be formed using the letters A, E, T exactly once?",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explanation: "The words are: EAT, TEA, ATE. Total = 3 words."
},
{
  question: "If the letters of 'LIST' are rearranged, how many meaningful words can be formed?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "The meaningful words are: LIST, SILT, SLIT, TILS (tils is not common). Common words: LIST, SILT, SLIT. Total = 3 words."
},
{
  question: "How many pairs of letters in the word 'BEAUTY' have as many letters between them in the word as in the alphabet?",
  options: ["0", "1", "2", "3"],
  answer: 1,
  explanation: "Checking pairs: B-E (2 letters between in alphabet C,D; 2 letters between in word E,A - positions don't match). E-A (3 letters between in alphabet B,C,D; 0 in word). A-U (19 letters; 1 in word). U-T (0; 0 in word - but U and T are adjacent in both). T-Y (3 letters between in alphabet U,V,W,X; 0 in word). Only U-T has 0 letters between in both. Answer: 1 pair."
},
{
  question: "In the word 'MARKET', how many pairs of letters have the same number of letters between them in the word as in the alphabet?",
  options: ["0", "1", "2", "3"],
  answer: 0,
  explanation: "Checking the possible letter pairs shows that none has the same number of intervening letters in both the word and the alphabet. Therefore, the answer is 0."
},
{
  question: "How many meaningful words can be formed from the letters of 'EARTH' using each letter once?",
  options: ["1", "2", "3", "More than 3"],
  answer: 3,
  explanation: "Meaningful words: EARTH, HEART, HATER, RATEH (not common), THEAR (not common). Common words: EARTH, HEART, HATER, RATHE (archaic). At least 3 common words exist."
},
{
  question: "If the first and third letters of 'PLANE' are interchanged, and the second and fourth letters are also interchanged, what word is formed?",
  options: ["ANPLE", "ALPNE", "NAPLE", "APNLE"],
  answer: 0,
  explanation: "PLANE has positions P-L-A-N-E. Interchanging the first and third letters gives A-L-P-N-E. Interchanging the second and fourth letters then gives A-N-P-L-E. Therefore, the result is ANPLE."
},
{
  question: "How many pairs in 'COMPUTER' have as many letters between them in the word as in the alphabet?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "Checking adjacent pairs that are also adjacent in alphabet: C-D (not in word), O-P (yes! O and P are adjacent in word and alphabet), M-N (not adjacent in word), P-Q (not in word), U-V (not in word), T-U (T and U are in word but not adjacent), E-F (not in word), R-S (not in word). O-P is one pair. Also checking C-O: 11 letters between in alphabet, 1 in word. Not matching. Answer: 1 pair (O-P)."
},
{
  question: "Using the letters A, C, T exactly once, how many meaningful English words can be formed?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "The words are: CAT, ACT. Total = 2 words."
},
{
  question: "In 'STUDENT', how many letter pairs have the same spacing in the word as in the alphabet?",
  options: ["0", "1", "2", "3"],
  answer: 0,
  explanation: "Checking: S-T (adjacent in both - yes!), T-U (adjacent in alphabet, but in word T is at position 2, U at position 6 - 3 letters between, not 0). S-U: 1 letter between in alphabet (T), 4 in word. T-D: 16 letters; 4 in word. U-D: 16; 3. D-E: 0; 0 (adjacent in both - yes!). E-N: 8; 0. N-T: 6; 0. So S-T and D-E are adjacent in both. Answer: 2 pairs."
},
{
  question: "How many words can be formed from 'NOTE' using each letter once?",
  options: ["2", "3", "4", "5"],
  answer: 2,
  explanation: "Meaningful words: NOTE, TONE, ONET (not common), ETON (proper noun). Common words: NOTE, TONE. Some dictionaries include ETON. Answer: 2-3 words depending on dictionary."
},

// Mixed Patterns
{
  question: "Find the next term: A2, D4, G8, J16, ?",
  options: ["K24", "L32", "M32", "N32"],
  answer: 2,
  explanation: "Letters: A(+3)=D, D(+3)=G, G(+3)=J, J(+3)=M. Numbers: 2,4,8,16 (doubling). Next: M32."
},
{
  question: "Complete the series: Z1, Y4, X9, W16, ?",
  options: ["V20", "V25", "U25", "U36"],
  answer: 1,
  explanation: "Letters: Z,Y,X,W,V (going backward). Numbers: 1²,2²,3²,4²,5²=25. Next: V25."
},
{
  question: "What comes next: B3, E6, H12, K24, ?",
  options: ["L36", "M48", "N48", "O48"],
  answer: 1,
  explanation: "Letters: B(+3)=E, E(+3)=H, H(+3)=K, K(+3)=N. Numbers: 3,6,12,24 (doubling). Next: N48."
},
{
  question: "Find the missing term: C1, F4, I9, L16, ?",
  options: ["M20", "N25", "O25", "P25"],
  answer: 1,
  explanation: "Letters: C(+3)=F, F(+3)=I, I(+3)=L, L(+3)=O. Numbers: 1²,2²,3²,4²,5²=25. Next: O25."
},
{
  question: "Complete: P2, R6, T12, V20, ?",
  options: ["W28", "X30", "Y30", "X28"],
  answer: 2,
  explanation: "Letters: P(+2)=R, R(+2)=T, T(+2)=V, V(+2)=X. Numbers: 1×2=2, 2×3=6, 3×4=12, 4×5=20, 5×6=30. Next: X30."
},
{
  question: "What is the next term: M5, O10, Q20, S40, ?",
  options: ["T60", "U80", "V80", "W80"],
  answer: 1,
  explanation: "Letters: M(+2)=O, O(+2)=Q, Q(+2)=S, S(+2)=U. Numbers: 5,10,20,40 (doubling). Next: U80."
},
{
  question: "Find the next: A1, C3, E7, G15, ?",
  options: ["H31", "I31", "J31", "K31"],
  answer: 1,
  explanation: "Letters: A(+2)=C, C(+2)=E, E(+2)=G, G(+2)=I. Numbers: 2¹-1=1, 2²-1=3, 2³-1=7, 2⁴-1=15, 2⁵-1=31. Next: I31."
},
{
  question: "Complete the series: D2, G5, J10, M17, ?",
  options: ["N24", "O26", "P26", "Q26"],
  answer: 1,
  explanation: "Letters: D(+3)=G, G(+3)=J, J(+3)=M, M(+3)=P. Numbers: 1²+1=2, 2²+1=5, 3²+1=10, 4²+1=17, 5²+1=26. Next: P26."
},
{
  question: "What comes next: S10, Q20, O40, M80, ?",
  options: ["L160", "K160", "J160", "I160"],
  answer: 1,
  explanation: "Letters: S(-2)=Q, Q(-2)=O, O(-2)=M, M(-2)=K. Numbers: 10,20,40,80 (doubling). Next: K160."
},
{
  question: "Find the missing term: B4, E9, H16, K25, ?",
  options: ["L36", "M36", "N36", "O36"],
  answer: 1,
  explanation: "Letters: B(+3)=E, E(+3)=H, H(+3)=K, K(+3)=N. Numbers: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36. Next: N36."
},

// Decision Making & Critical Thinking
{
  question: "Statement: Should students be allowed to use calculators in exams? Argument I: Yes, it saves time. Argument II: No, it reduces mental calculation ability.",
  options: ["Only I is strong", "Only II is strong", "Both are strong", "Neither is strong"],
  answer: 2,
  explanation: "Both arguments present valid points. Argument I highlights efficiency, while Argument II emphasizes skill development. Both are strong arguments."
},
{
  question: "Statement: Should mobile phones be banned in schools? Argument I: Yes, they distract students. Argument II: No, they can be used for educational purposes.",
  options: ["Only I is strong", "Only II is strong", "Both are strong", "Neither is strong"],
  answer: 2,
  explanation: "Both arguments are valid. Argument I addresses distraction concerns, while Argument II highlights potential educational benefits. Both are strong."
},
{
  question: "Statement: Should homework be eliminated? Argument I: Yes, it reduces stress. Argument II: No, it reinforces learning.",
  options: ["Only I is strong", "Only II is strong", "Both are strong", "Neither is strong"],
  answer: 2,
  explanation: "Both arguments present important perspectives. Argument I focuses on student well-being, while Argument II emphasizes academic reinforcement. Both are strong."
},
{
  question: "Statement: Should online classes replace traditional classrooms? Argument I: Yes, they are more flexible. Argument II: No, they lack personal interaction.",
  options: ["Only I is strong", "Only II is strong", "Both are strong", "Neither is strong"],
  answer: 2,
  explanation: "Both arguments have merit. Argument I highlights flexibility benefits, while Argument II emphasizes the importance of face-to-face interaction. Both are strong."
},
{
  question: "Statement: Should exams be conducted in multiple languages? Argument I: Yes, it ensures fair assessment. Argument II: No, it complicates evaluation.",
  options: ["Only I is strong", "Only II is strong", "Both are strong", "Neither is strong"],
  answer: 2,
  explanation: "Both arguments are valid. Argument I promotes inclusivity and fairness, while Argument II raises practical concerns about implementation. Both are strong."
},
{
  question: "Course of Action: The city is facing severe water shortage. I. Implement rainwater harvesting. II. Import water from neighboring cities.",
  options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
  answer: 2,
  explanation: "Both courses of action are practical. Rainwater harvesting is a sustainable long-term solution, while importing water addresses immediate needs. Both follow."
},
{
  question: "Statement: Traffic accidents have increased by 30%. Course of Action: I. Stricter traffic rules enforcement. II. Public awareness campaigns.",
  options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
  answer: 2,
  explanation: "Both actions are appropriate. Stricter enforcement deters violations, while awareness campaigns educate the public. Both follow."
},
{
  question: "Statement: Unemployment is rising among graduates. Course of Action: I. Skill development programs. II. Encourage entrepreneurship.",
  options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
  answer: 2,
  explanation: "Both actions address the problem effectively. Skill development improves employability, while entrepreneurship creates job opportunities. Both follow."
},
{
  question: "Statement: Air pollution levels are dangerously high. Course of Action: I. Ban old vehicles. II. Promote public transport.",
  options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
  answer: 2,
  explanation: "Both measures help reduce pollution. Banning old vehicles removes high-emission sources, while promoting public transport reduces individual vehicle use. Both follow."
},
{
  question: "Statement: Student performance in mathematics is declining. Course of Action: I. Hire more math teachers. II. Introduce interactive teaching methods.",
  options: ["Only I follows", "Only II follows", "Both follow", "Neither follows"],
  answer: 2,
  explanation: "Both actions can improve performance. More teachers reduce student-teacher ratio, while interactive methods enhance engagement. Both follow."
},

// Input-Output Patterns
{
  question: "If INPUT is coded as 9-14-7-21-20, how is OUTPUT coded?",
  options: ["15-21-20-7-21-20", "15-21-20-16-21-20", "15-21-20-16-21-19", "15-21-20-16-21-18"],
  answer: 1,
  explanation: "Each letter is replaced by its position in the alphabet: O=15, U=21, T=20, P=16, U=21, T=20. So OUTPUT = 15-21-20-16-21-20."
},
{
  question: "If BOOK is written as 2-15-15-11, how is PAGE written?",
  options: ["16-1-7-5", "16-1-6-5", "15-1-7-5", "16-2-7-5"],
  answer: 0,
  explanation: "Each letter is replaced by its alphabetical position: P=16, A=1, G=7, E=5. So PAGE = 16-1-7-5."
},
{
  question: "In a code, CAT = 3120, DOG = 4157. How is BAT coded?",
  options: ["2120", "2119", "2019", "2121"],
  answer: 0,
  explanation: "Each letter is replaced by its position: C=3, A=1, T=20 → 3120. D=4, O=15, G=7 → 4157. So B=2, A=1, T=20 → 2120."
},
{
  question: "If FISH = 69198, what is BIRD?",
  options: ["29184", "29183", "29174", "29185"],
  answer: 0,
  explanation: "F=6, I=9, S=19, H=8 → 69198. B=2, I=9, R=18, D=4 → 29184."
},
{
  question: "If RED = 1854, BLUE = 212155, what is GREEN?",
  options: ["7185514", "7185513", "7185414", "7185515"],
  answer: 0,
  explanation: "R=18, E=5, D=4 → 1854. B=2, L=12, U=21, E=5 → 212155. G=7, R=18, E=5, E=5, N=14 → 7185514."
},
{
  question: "In a code, SUN = 192114, MOON = 13151514. How is STAR coded?",
  options: ["1920118", "1920119", "1920117", "1921118"],
  answer: 0,
  explanation: "S=19, U=21, N=14 → 192114. M=13, O=15, O=15, N=14 → 13151514. S=19, T=20, A=1, R=18 → 1920118."
},
{
  question: "If APPLE = 11616125, how is GRAPE coded?",
  options: ["7181165", "7181164", "7181265", "7181175"],
  answer: 0,
  explanation: "A=1, P=16, P=16, L=12, E=5 → 11616125. G=7, R=18, A=1, P=16, E=5 → 7181165."
},
{
  question: "If TABLE = 2012125, CHAIR = 381918, what is DESK?",
  options: ["451911", "451910", "451811", "451912"],
  answer: 0,
  explanation: "T=20, A=1, B=2, L=12, E=5 → 2012125. C=3, H=8, A=1, I=9, R=18 → 381918. D=4, E=5, S=19, K=11 → 451911."
},
{
  question: "In a code, LAMP = 1211316, FAN = 6114. How is CAMP coded?",
  options: ["311316", "311315", "311416", "311317"],
  answer: 0,
  explanation: "L=12, A=1, M=13, P=16 → 1211316. F=6, A=1, N=14 → 6114. C=3, A=1, M=13, P=16 → 311316."
},
{
  question: "If MATH = 131208, SCIENCE = 193951435, what is PHYSICS?",
  options: ["16825199319", "16825199318", "16825199219", "16825199320"],
  answer: 0,
  explanation: "M=13, A=1, T=20, H=8 → 131208. S=19, C=3, I=9, E=5, N=14, C=3, E=5 → 193951435. P=16, H=8, Y=25, S=19, I=9, C=3, S=19 → 16825199319."
},

// Ranking & Position
{
  question: "In a class of 50 students, Ali is 15th from the top. What is his rank from the bottom?",
  options: ["35th", "36th", "37th", "38th"],
  answer: 1,
  explanation: "Rank from bottom = Total - Rank from top + 1 = 50 - 15 + 1 = 36th."
},
{
  question: "Sara is 8th from the left and 12th from the right in a row. How many students are there?",
  options: ["18", "19", "20", "21"],
  answer: 1,
  explanation: "Total = Position from left + Position from right - 1 = 8 + 12 - 1 = 19 students."
},
{
  question: "In a queue of 40 people, Ahmed is 25th from the front. What is his position from the back?",
  options: ["15th", "16th", "17th", "18th"],
  answer: 1,
  explanation: "Position from back = Total - Position from front + 1 = 40 - 25 + 1 = 16th."
},
{
  question: "Fatima is 10th from the top and 30th from the bottom in her class. How many students are there?",
  options: ["38", "39", "40", "41"],
  answer: 1,
  explanation: "Total = Rank from top + Rank from bottom - 1 = 10 + 30 - 1 = 39 students."
},
{
  question: "In a row of trees, one tree is 14th from the left and 17th from the right. How many trees are there?",
  options: ["29", "30", "31", "32"],
  answer: 1,
  explanation: "Total = Position from left + Position from right - 1 = 14 + 17 - 1 = 30 trees."
},
{
  question: "Hassan is 20th in a class of 60 students. What is his rank from the last?",
  options: ["40th", "41st", "42nd", "43rd"],
  answer: 1,
  explanation: "Rank from last = Total - Rank from first + 1 = 60 - 20 + 1 = 41st."
},
{
  question: "In a line of 35 people, Zainab is 18th from the front. What is her position from the back?",
  options: ["17th", "18th", "19th", "20th"],
  answer: 1,
  explanation: "Position from back = Total - Position from front + 1 = 35 - 18 + 1 = 18th."
},
{
  question: "Bilal is 5th from the left and 25th from the right. How many people are in the row?",
  options: ["28", "29", "30", "31"],
  answer: 1,
  explanation: "Total = Position from left + Position from right - 1 = 5 + 25 - 1 = 29 people."
},
{
  question: "In a class of 45 students, Aisha is 12th from the top. What is her rank from the bottom?",
  options: ["33rd", "34th", "35th", "36th"],
  answer: 1,
  explanation: "Rank from bottom = Total - Rank from top + 1 = 45 - 12 + 1 = 34th."
},
{
  question: "Omar is 7th from the front and 14th from the back in a queue. How many people are there?",
  options: ["19", "20", "21", "22"],
  answer: 1,
  explanation: "Total = Position from front + Position from back - 1 = 7 + 14 - 1 = 20 people."
},

// Advanced Coding
{
  question: "If REASON is coded as 5 and BELIEVED is coded as 7, how is GOVERNMENT coded?",
  options: ["8", "9", "10", "11"],
  answer: 2,
  explanation: "The code represents the number of letters minus 1. REASON has 6 letters → 6-1=5. BELIEVED has 8 letters → 8-1=7. GOVERNMENT has 11 letters → 11-1=10."
},
{
  question: "If WATER is coded as 23120518, how is FIRE coded?",
  options: ["69185", "69184", "69175", "69186"],
  answer: 0,
  explanation: "Each letter is replaced by its position: W=23, A=1, T=20, E=5, R=18 → 23120518. F=6, I=9, R=18, E=5 → 69185."
},
{
  question: "In a code, MOTHER = 13-15-20-8-5-18. How is FATHER coded?",
  options: ["6-1-20-8-5-18", "6-1-20-7-5-18", "5-1-20-8-5-18", "6-1-19-8-5-18"],
  answer: 0,
  explanation: "Each letter is replaced by its alphabetical position: M=13, O=15, T=20, H=8, E=5, R=18. F=6, A=1, T=20, H=8, E=5, R=18 → 6-1-20-8-5-18."
},
{
  question: "If SCHOOL = 19-3-8-15-15-12, how is COLLEGE coded?",
  options: ["3-15-12-12-5-7-5", "3-15-12-12-6-7-5", "3-15-11-12-5-7-5", "3-15-12-11-5-7-5"],
  answer: 0,
  explanation: "S=19, C=3, H=8, O=15, O=15, L=12. C=3, O=15, L=12, L=12, E=5, G=7, E=5 → 3-15-12-12-5-7-5."
},
{
  question: "If TEACHER = 20-5-1-3-8-5-18, how is DOCTOR coded?",
  options: ["4-15-3-20-15-18", "4-15-2-20-15-18", "4-15-3-19-15-18", "4-15-3-20-14-18"],
  answer: 0,
  explanation: "T=20, E=5, A=1, C=3, H=8, E=5, R=18. D=4, O=15, C=3, T=20, O=15, R=18 → 4-15-3-20-15-18."
},
{
  question: "In a code, UNIVERSE = 21-14-9-22-5-18-19-5. How is PLANET coded?",
  options: ["16-12-1-14-5-20", "16-12-1-13-5-20", "16-11-1-14-5-20", "16-12-1-14-6-20"],
  answer: 0,
  explanation: "U=21, N=14, I=9, V=22, E=5, R=18, S=19, E=5. P=16, L=12, A=1, N=14, E=5, T=20 → 16-12-1-14-5-20."
},
{
  question: "If SCIENCE = 19-3-9-5-14-3-5, how is MATHS coded?",
  options: ["13-1-20-8-19", "13-1-20-7-19", "12-1-20-8-19", "13-1-19-8-19"],
  answer: 0,
  explanation: "S=19, C=3, I=9, E=5, N=14, C=3, E=5. M=13, A=1, T=20, H=8, S=19 → 13-1-20-8-19."
},
{
  question: "If HISTORY = 8-9-19-20-15-18-25, how is GEOGRAPHY coded?",
  options: ["7-5-15-7-18-1-16-8-25", "7-5-15-7-18-1-15-8-25", "7-5-14-7-18-1-16-8-25", "7-5-15-6-18-1-16-8-25"],
  answer: 0,
  explanation: "H=8, I=9, S=19, T=20, O=15, R=18, Y=25. G=7, E=5, O=15, G=7, R=18, A=1, P=16, H=8, Y=25 → 7-5-15-7-18-1-16-8-25."
},
{
  question: "In a code, PHYSICS = 16-8-25-19-9-3-19. How is CHEMISTRY coded?",
  options: ["3-8-5-13-9-19-20-18-25", "3-8-5-12-9-19-20-18-25", "3-8-5-13-9-18-20-18-25", "3-8-6-13-9-19-20-18-25"],
  answer: 0,
  explanation: "P=16, H=8, Y=25, S=19, I=9, C=3, S=19. C=3, H=8, E=5, M=13, I=9, S=19, T=20, R=18, Y=25 → 3-8-5-13-9-19-20-18-25."
},
{
  question: "If BIOLOGY = 2-9-15-12-15-7-25, how is ZOOLOGY coded?",
  options: ["26-15-15-12-15-7-25", "26-15-15-11-15-7-25", "26-15-14-12-15-7-25", "26-15-15-12-14-7-25"],
  answer: 0,
  explanation: "B=2, I=9, O=15, L=12, O=15, G=7, Y=25. Z=26, O=15, O=15, L=12, O=15, G=7, Y=25 → 26-15-15-12-15-7-25."
},

// Number Operations
{
  question: "If 5 + 3 = 28, 9 + 1 = 810, 8 + 6 = 214, then 7 + 4 = ?",
  options: ["311", "411", "310", "410"],
  answer: 0,
  explanation: "Pattern: (first - second)(first + second). 5-3=2, 5+3=8 → 28. 9-1=8, 9+1=10 → 810. 8-6=2, 8+6=14 → 214. 7-4=3, 7+4=11 → 311."
},
{
  question: "If 3 × 2 = 13, 4 × 3 = 25, 5 × 4 = 41, then 6 × 5 = ?",
  options: ["51", "61", "71", "81"],
  answer: 1,
  explanation: "Pattern: first² + second². 3²+2²=9+4=13. 4²+3²=16+9=25. 5²+4²=25+16=41. 6²+5²=36+25=61."
},
{
  question: "If 8 @ 3 = 524, 9 @ 4 = 536, and 7 @ 2 = 514, then 6 @ 1 = ?",
  options: ["56", "65", "512", "636"],
  answer: 0,
  explanation: "The result is formed by writing the difference followed by the product. For 8 and 3: 8-3=5 and 8×3=24, giving 524. For 6 and 1: 6-1=5 and 6×1=6, giving 56."
},
{
  question: "If 4 @ 5 = 41, 6 @ 3 = 45, 8 @ 2 = 68, then 9 @ 4 = ?",
  options: ["87", "97", "107", "117"],
  answer: 1,
  explanation: "Pattern: first² + second. 4²+5=16+5=21 (not 41). Let me try: 4×5+21=41. 6×3+27=45. 8×2+52=68. Not consistent. Alternative: 4²+5²=16+25=41. 6²+3²=36+9=45. 8²+2²=64+4=68. 9²+4²=81+16=97."
},
{
  question: "If 2 # 3 = 18, 3 # 4 = 32, and 4 # 5 = 50, then 5 # 6 = ?",
  options: ["72", "78", "84", "90"],
  answer: 0,
  explanation: "The rule is a # b = ab + b(b+1). Thus 5 # 6 = 5×6 + 6×7 = 30+42 = 72."
},
{
  question: "If 7 $ 4 = 328, 9 $ 5 = 445, and 6 $ 3 = 318, then 8 $ 2 = ?",
  options: ["616", "626", "636", "646"],
  answer: 0,
  explanation: "The result is formed by writing the difference followed by the product. For 7 and 4: 7-4=3 and 7×4=28, giving 328. Therefore, for 8 and 2: 8-2=6 and 8×2=16, giving 616."
},
{
  question: "If 5 % 3 = 34, 8 % 5 = 89, and 6 % 2 = 40, then 9 % 4 = ?",
  options: ["85", "89", "97", "105"],
  answer: 2,
  explanation: "The rule is a % b = a² + b². Thus 5²+3²=25+9=34, 8²+5²=64+25=89, and 6²+2²=36+4=40. Therefore, 9²+4²=81+16=97."
},
{
  question: "If 3 & 5 = 16, 4 & 6 = 20, 5 & 7 = 24, then 6 & 8 = ?",
  options: ["26", "28", "30", "32"],
  answer: 1,
  explanation: "Pattern: first + second + (second - first) × 3 or first × 2 + second × 2. 3+5+8=16. 4+6+10=20. 5+7+12=24. 6+8+14=28. Or: 3×2+5×2=16, 4×2+6×2=20, 5×2+7×2=24, 6×2+8×2=28."
},
{
  question: "If 9 * 2 = 92, 8 * 3 = 83, 7 * 4 = 74, then 6 * 5 = ?",
  options: ["56", "65", "66", "75"],
  answer: 1,
  explanation: "Pattern: concatenate first and second digits. 9 and 2 → 92. 8 and 3 → 83. 7 and 4 → 74. 6 and 5 → 65."
},
{
  question: "If 4 @ 6 = 2410, 5 @ 7 = 3512, 6 @ 8 = 4814, then 7 @ 9 = ?",
  options: ["6316", "6416", "6315", "6415"],
  answer: 0,
  explanation: "Pattern: (first×second)(first+second). 4×6=24, 4+6=10 → 2410. 5×7=35, 5+7=12 → 3512. 6×8=48, 6+8=14 → 4814. 7×9=63, 7+9=16 → 6316."
},

// Logical Deduction
{
  question: "Five friends are sitting in a row. A is to the left of B but right of C. D is to the right of B but left of E. Who is in the middle?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "From the conditions: C-A-B-D-E. B is in the middle (position 3 of 5)."
},
{
  question: "In a family of six, A is the father of B. C is the brother of A. D is the sister of B. E is the mother of C. F is the wife of A. How is D related to E?",
  options: ["Daughter", "Granddaughter", "Niece", "Sister"],
  answer: 1,
  explanation: "A and C are brothers. E is their mother. A is B's father, so B is E's grandchild. D is B's sister, so D is also E's granddaughter."
},
{
  question: "Three boxes are labeled 'Apples', 'Oranges', and 'Mixed'. All labels are wrong. You can pick one fruit from one box. Which box should you choose?",
  options: ["Apples", "Oranges", "Mixed", "Any box"],
  answer: 2,
  explanation: "Pick from the 'Mixed' box. Since all labels are wrong, 'Mixed' must contain only apples or only oranges. If you get an apple, 'Mixed' is actually 'Apples'. The box labeled 'Oranges' can't be oranges (wrong label) and can't be apples (already found), so it's 'Mixed'. The box labeled 'Apples' must be 'Oranges'."
},
{
  question: "A, B, C, D, E are five different heights. A is taller than B but shorter than C. D is taller than E but shorter than B. Who is the tallest?",
  options: ["A", "B", "C", "D"],
  answer: 2,
  explanation: "From the conditions: C > A > B > D > E. C is the tallest."
},
{
  question: "Four people P, Q, R, S have different ages. P is older than Q. R is younger than S. Q is older than R. Who is the youngest?",
  options: ["P", "Q", "R", "S"],
  answer: 2,
  explanation: "From the conditions: P > Q > R and S > R. We know R is younger than Q and S. We don't know P vs S, but R is definitely younger than Q and S. Since P > Q > R, R is the youngest."
},
{
  question: "Five cities A, B, C, D, E are in a row. A is west of B. C is east of B but west of D. E is east of D. Which city is in the middle?",
  options: ["A", "B", "C", "D"],
  answer: 2,
  explanation: "Arrangement from west to east: A-B-C-D-E. C is in the middle (position 3 of 5)."
},
{
  question: "In a race, A finished before B but after C. D finished before A but after E. Who won the race?",
  options: ["A", "C", "D", "E"],
  answer: 3,
  explanation: "Order of finishing: E-D-C-A-B. E finished first, so E won."
},
{
  question: "Six books are arranged on a shelf. Math is above Science. English is below Math but above History. Physics is above English. Chemistry is at the bottom. Which book is at the top?",
  options: ["Math", "Physics", "Science", "English"],
  answer: 1,
  explanation: "From top to bottom: Physics-Math-English-Science-History-Chemistry. Physics is at the top."
},
{
  question: "Five students scored different marks. Ali scored more than Sara but less than Ahmed. Fatima scored more than Ahmed. Hassan scored less than Sara. Who scored the highest?",
  options: ["Ali", "Ahmed", "Fatima", "Sara"],
  answer: 2,
  explanation: "Order: Fatima > Ahmed > Ali > Sara > Hassan. Fatima scored the highest."
},
{
  question: "Four houses are in a row. Red house is to the left of Blue. Green is to the right of Blue. Yellow is between Red and Blue. What is the order from left to right?",
  options: ["Red-Yellow-Blue-Green", "Red-Blue-Yellow-Green", "Yellow-Red-Blue-Green", "Red-Yellow-Green-Blue"],
  answer: 0,
  explanation: "Red is left of Blue. Yellow is between Red and Blue, so Red-Yellow-Blue. Green is right of Blue. Order: Red-Yellow-Blue-Green."
},

// Advanced Analogies
{
  question: "Complete: Pen : Write :: Brush : ?",
  options: ["Paint", "Color", "Draw", "Art"],
  answer: 2,
  explanation: "A pen is used to write; a brush is used to paint (or draw, but paint is more specific to brush)."
},
{
  question: "Doctor : Stethoscope :: Carpenter : ?",
  options: ["Wood", "Hammer", "House", "Build"],
  answer: 1,
  explanation: "A stethoscope is a tool used by a doctor; a hammer is a tool used by a carpenter."
},
{
  question: "Ocean : Water :: Desert : ?",
  options: ["Hot", "Sand", "Dry", "Cactus"],
  answer: 1,
  explanation: "An ocean is characterized by water; a desert is characterized by sand."
},
{
  question: "Clock : Time :: Thermometer : ?",
  options: ["Heat", "Temperature", "Fever", "Mercury"],
  answer: 1,
  explanation: "A clock measures time; a thermometer measures temperature."
},
{
  question: "Author : Book :: Composer : ?",
  options: ["Song", "Music", "Instrument", "Melody"],
  answer: 1,
  explanation: "An author creates a book; a composer creates music."
},
{
  question: "Eye : Vision :: Ear : ?",
  options: ["Sound", "Hearing", "Listen", "Noise"],
  answer: 1,
  explanation: "An eye provides vision; an ear provides hearing."
},
{
  question: "Tree : Forest :: Star : ?",
  options: ["Sky", "Galaxy", "Night", "Space"],
  answer: 1,
  explanation: "A forest is a collection of trees; a galaxy is a collection of stars."
},
{
  question: "Wheat : Bread :: Grape : ?",
  options: ["Juice", "Wine", "Fruit", "Vine"],
  answer: 1,
  explanation: "Bread is made from wheat; wine is made from grapes."
},
{
  question: "Pilot : Airplane :: Captain : ?",
  options: ["Ship", "Sea", "Sail", "Port"],
  answer: 0,
  explanation: "A pilot operates an airplane; a captain operates a ship."
},
{
  question: "Seed : Plant :: Egg : ?",
  options: ["Bird", "Chicken", "Nest", "Shell"],
  answer: 0,
  explanation: "A seed grows into a plant; an egg develops into a bird (or chicken, but bird is more general and correct)."
},

// Complex Series
{
  question: "Find the next: 1, 2, 6, 24, 120, ?",
  options: ["360", "480", "600", "720"],
  answer: 3,
  explanation: "Pattern: factorial sequence. 1!=1, 2!=2, 3!=6, 4!=24, 5!=120, 6!=720."
},
{
  question: "Complete: 2, 5, 11, 23, 47, 95, ?",
  options: ["189", "190", "191", "192"],
  answer: 2,
  explanation: "Pattern: ×2+1. 2×2+1=5, 5×2+1=11, 11×2+1=23, 23×2+1=47, 47×2+1=95, 95×2+1=191."
},
{
  question: "What comes next: 3, 8, 18, 38, 78, ?",
  options: ["148", "158", "168", "178"],
  answer: 1,
  explanation: "Pattern: ×2+2. 3×2+2=8, 8×2+2=18, 18×2+2=38, 38×2+2=78, 78×2+2=158."
},
{
  question: "Find the missing term: 4, 9, 19, 39, 79, ?",
  options: ["157", "158", "159", "160"],
  answer: 2,
  explanation: "Pattern: ×2+1. 4×2+1=9, 9×2+1=19, 19×2+1=39, 39×2+1=79, 79×2+1=159."
},
{
  question: "Complete the series: 5, 12, 26, 54, 110, ?",
  options: ["218", "220", "222", "224"],
  answer: 2,
  explanation: "Pattern: ×2+2. 5×2+2=12, 12×2+2=26, 26×2+2=54, 54×2+2=110, 110×2+2=222."
},
{
  question: "What is the next number: 7, 15, 31, 63, 127, ?",
  options: ["253", "254", "255", "256"],
  answer: 2,
  explanation: "Pattern: 2ⁿ-1. 2³-1=7, 2⁴-1=15, 2⁵-1=31, 2⁶-1=63, 2⁷-1=127, 2⁸-1=255."
},
{
  question: "Find the next: 6, 14, 30, 62, 126, ?",
  options: ["250", "252", "254", "256"],
  answer: 2,
  explanation: "Pattern: ×2+2. 6×2+2=14, 14×2+2=30, 30×2+2=62, 62×2+2=126, 126×2+2=254."
},
{
  question: "Complete: 8, 17, 35, 71, 143, ?",
  options: ["285", "286", "287", "288"],
  answer: 2,
  explanation: "Pattern: ×2+1. 8×2+1=17, 17×2+1=35, 35×2+1=71, 71×2+1=143, 143×2+1=287."
},
{
  question: "What comes next: 9, 19, 39, 79, 159, ?",
  options: ["317", "318", "319", "320"],
  answer: 2,
  explanation: "Pattern: ×2+1. 9×2+1=19, 19×2+1=39, 39×2+1=79, 79×2+1=159, 159×2+1=319."
},
{
  question: "Find the missing number: 10, 21, 43, 87, 175, ?",
  options: ["349", "350", "351", "352"],
  answer: 2,
  explanation: "Pattern: ×2+1. 10×2+1=21, 21×2+1=43, 43×2+1=87, 87×2+1=175, 175×2+1=351."
},

// Alphabet Patterns
{
  question: "Complete: A, C, F, J, O, U, ?",
  options: ["A", "B", "C", "D"],
  answer: 2,
  explanation: "Pattern: +2, +3, +4, +5, +6, +7. A(+2)=C, C(+3)=F, F(+4)=J, J(+5)=O, O(+6)=U, U(+7)=B (wrapping: 21+7=28, 28-26=2=B)."
},
{
  question: "Find the next: Z, X, T, N, F, ?",
  options: ["V", "W", "X", "Y"],
  answer: 2,
  explanation: "Pattern: -2, -4, -6, -8, -10. Z(-2)=X, X(-4)=T, T(-6)=N, N(-8)=F, F(-10)=V (wrapping backward: 6-10=-4, 26-4=22=V)."
},
{
  question: "What comes next: B, E, I, N, T, ?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "Pattern: +3, +4, +5, +6, +7. B(+3)=E, E(+4)=I, I(+5)=N, N(+6)=T, T(+7)=A (wrapping: 20+7=27, 27-26=1=A)."
},
{
  question: "Complete the series: D, H, L, P, T, ?",
  options: ["U", "V", "W", "X"],
  answer: 2,
  explanation: "Pattern: +4 each time. D(+4)=H, H(+4)=L, L(+4)=P, P(+4)=T, T(+4)=X."
},
{
  question: "Find the missing letter: E, J, O, T, Y, D, ?",
  options: ["G", "H", "I", "J"],
  answer: 2,
  explanation: "Each letter advances by 5 positions, wrapping around the alphabet when necessary: E→J→O→T→Y→D→I. Therefore, the next letter is I."
},
{
  question: "What is the next: G, K, O, S, W, ?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "Pattern: +4 each time. G(+4)=K, K(+4)=O, O(+4)=S, S(+4)=W, W(+4)=A (wrapping: 23+4=27, 27-26=1=A)."
},
{
  question: "Complete: H, K, N, Q, T, W, ?",
  options: ["X", "Y", "Z", "A"],
  answer: 2,
  explanation: "Pattern: +3 each time. H(+3)=K, K(+3)=N, N(+3)=Q, Q(+3)=T, T(+3)=W, W(+3)=Z (23+3=26=Z)."
},
{
  question: "Find the next: I, L, P, S, W, Z, ?",
  options: ["C", "D", "E", "F"],
  answer: 1,
  explanation: "Pattern: +3, +4, +3, +4, +3, +4. I(+3)=L, L(+4)=P, P(+3)=S, S(+4)=W, W(+3)=Z, Z(+4)=D (wrapping: 26+4=30, 30-26=4=D)."
},
{
  question: "What comes next: J, M, Q, T, X, A, ?",
  options: ["D", "E", "F", "G"],
  answer: 1,
  explanation: "The jumps alternate +3 and +4: J→M (+3), M→Q (+4), Q→T (+3), T→X (+4), X→A (+3, wrapping), and A→E (+4). Therefore, the next letter is E."
},
{
  question: "Complete the series: K, N, R, U, Y, B, ?",
  options: ["E", "F", "G", "H"],
  answer: 1,
  explanation: "Pattern: +3, +4, +3, +4, +3, +4. K(+3)=N, N(+4)=R, R(+3)=U, U(+4)=Y, Y(+3)=B (wrapping: 25+3=28, 28-26=2=B), B(+4)=F (2+4=6=F)."
},

// Visual Reasoning (Described)
{
  question: "If a square is rotated 90° clockwise four times, what is its final orientation?",
  options: ["Same as original", "90° from original", "180° from original", "270° from original"],
  answer: 0,
  explanation: "Rotating 90° four times = 360°, which brings the square back to its original orientation."
},
{
  question: "A triangle is reflected in a vertical mirror, then the image is reflected in a horizontal mirror. What is the final image?",
  options: ["Same as original", "Rotated 90°", "Rotated 180°", "Rotated 270°"],
  answer: 2,
  explanation: "A vertical reflection followed by a horizontal reflection is equivalent to a 180° rotation."
},
{
  question: "If you fold a square paper in half twice and cut one corner, how many holes will there be when unfolded?",
  options: ["1", "2", "3", "4"],
  answer: 3,
  explanation: "Folding twice creates 4 layers. Cutting one corner creates 4 holes when unfolded."
},
{
  question: "A clock shows 3:00. What time will it show in the mirror?",
  options: ["3:00", "6:00", "9:00", "12:00"],
  answer: 2,
  explanation: "In a vertical mirror, 3:00 appears as 9:00 (the mirror image reverses left-right)."
},
{
  question: "How many lines of symmetry does a regular hexagon have?",
  options: ["3", "4", "5", "6"],
  answer: 3,
  explanation: "A regular hexagon has 6 lines of symmetry: 3 through opposite vertices and 3 through midpoints of opposite sides."
},
{
  question: "If a cube is viewed from the front, top, and right side, how many different views are possible?",
  options: ["1", "2", "3", "6"],
  answer: 0,
  explanation: "A cube looks the same (a square) from all orthogonal views (front, top, right side). So only 1 distinct view."
},
{
  question: "A rectangle is rotated 180°. How does it compare to the original?",
  options: ["Different", "Same", "Flipped", "Inverted"],
  answer: 1,
  explanation: "A rectangle rotated 180° looks identical to the original (it has 180° rotational symmetry)."
},
{
  question: "How many triangles are formed by drawing all diagonals from one vertex of a hexagon?",
  options: ["3", "4", "5", "6"],
  answer: 1,
  explanation: "From one vertex of a hexagon, you can draw 3 diagonals, creating 4 triangles."
},
{
  question: "If a circular disc is cut along a diameter and the halves are separated, what shape is each half?",
  options: ["Circle", "Semicircle", "Quarter circle", "Ellipse"],
  answer: 1,
  explanation: "Cutting a circle along a diameter produces two semicircles."
},
{
  question: "A square has how many diagonals?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "A square has 2 diagonals connecting opposite corners."
},

// Percentage & Ratio
{
  question: "If the price of an item increases by 25%, by what percentage should consumption be reduced to keep expenditure the same?",
  options: ["20%", "25%", "30%", "33.33%"],
  answer: 0,
  explanation: "Let original price = 100, consumption = 100. Expenditure = 10000. New price = 125. To keep expenditure 10000, new consumption = 10000/125 = 80. Reduction = 20%."
},
{
  question: "A number is increased by 10% and then decreased by 10%. What is the net change?",
  options: ["0%", "1% decrease", "1% increase", "2% decrease"],
  answer: 1,
  explanation: "Let number = 100. After 10% increase: 110. After 10% decrease: 110-11=99. Net change = -1% (1% decrease)."
},
{
  question: "If A:B = 2:3 and B:C = 4:5, find A:B:C.",
  options: ["2:3:5", "8:12:15", "2:4:5", "8:9:15"],
  answer: 1,
  explanation: "A:B = 2:3 = 8:12. B:C = 4:5 = 12:15. So A:B:C = 8:12:15."
},
{
  question: "The ratio of boys to girls in a class is 3:2. If there are 30 students, how many are boys?",
  options: ["15", "18", "20", "24"],
  answer: 1,
  explanation: "Total parts = 3+2=5. Each part = 30/5=6. Boys = 3×6=18."
},
{
  question: "If 40% of a number is 80, what is 60% of that number?",
  options: ["100", "120", "140", "160"],
  answer: 1,
  explanation: "40% = 80, so 1% = 2. Therefore 60% = 60×2 = 120."
},
{
  question: "A salary is increased by 20% and then by 10%. What is the total percentage increase?",
  options: ["30%", "32%", "33%", "35%"],
  answer: 1,
  explanation: "Let salary = 100. After 20% increase: 120. After 10% increase: 120+12=132. Total increase = 32%."
},
{
  question: "If x:y = 5:3 and x+y = 80, find x.",
  options: ["40", "45", "50", "55"],
  answer: 2,
  explanation: "Let x=5k, y=3k. Then 5k+3k=80, so 8k=80, k=10. Therefore x=5×10=50."
},
{
  question: "The price of sugar decreases by 20%. By what percentage should consumption increase to keep expenditure the same?",
  options: ["20%", "25%", "30%", "33.33%"],
  answer: 1,
  explanation: "Let original price = 100, consumption = 100. Expenditure = 10000. New price = 80. To keep expenditure 10000, new consumption = 10000/80 = 125. Increase = 25%."
},
{
  question: "If A is 20% more than B, what is B as a percentage of A?",
  options: ["75%", "80%", "83.33%", "85%"],
  answer: 2,
  explanation: "Let B = 100. Then A = 120. B as % of A = (100/120)×100 = 83.33%."
},
{
  question: "Three numbers are in the ratio 2:3:5 and their sum is 100. What is the largest number?",
  options: ["40", "45", "50", "55"],
  answer: 2,
  explanation: "Total parts = 2+3+5=10. Each part = 100/10=10. Largest = 5×10=50."
},

// Time & Work
{
  question: "A can do a work in 10 days, B in 15 days. How long will they take together?",
  options: ["5 days", "6 days", "7 days", "8 days"],
  answer: 1,
  explanation: "A's 1 day work = 1/10, B's = 1/15. Together = 1/10+1/15 = 3/30+2/30 = 5/30 = 1/6. So 6 days."
},
{
  question: "If 8 men can do a work in 12 days, how many days will 6 men take?",
  options: ["14 days", "15 days", "16 days", "18 days"],
  answer: 2,
  explanation: "Total work = 8×12 = 96 man-days. With 6 men: 96/6 = 16 days."
},
{
  question: "A and B together can do a work in 12 days. A alone can do it in 20 days. How long will B take alone?",
  options: ["25 days", "28 days", "30 days", "32 days"],
  answer: 2,
  explanation: "(A+B)'s 1 day = 1/12, A's = 1/20. B's = 1/12-1/20 = 5/60-3/60 = 2/60 = 1/30. So B takes 30 days."
},
{
  question: "10 workers can complete a job in 18 days. How many workers are needed to complete it in 12 days?",
  options: ["12", "14", "15", "16"],
  answer: 2,
  explanation: "Total work = 10×18 = 180 worker-days. For 12 days: 180/12 = 15 workers."
},
{
  question: "A is twice as efficient as B. Together they finish a work in 10 days. How long will A take alone?",
  options: ["12 days", "15 days", "18 days", "20 days"],
  answer: 1,
  explanation: "Let B's rate = 1 unit/day, A's = 2 units/day. Together = 3 units/day. Total work = 3×10 = 30 units. A alone: 30/2 = 15 days."
},
{
  question: "8 men or 12 women can complete a work in 15 days. How long will 6 men and 8 women take to complete the same work?",
  options: ["10 days", "180/17 days", "12 days", "15 days"],
  answer: 1,
  explanation: "Since 8 men are equivalent to 12 women, 1 man is equivalent to 3/2 women. Thus 6 men and 8 women are equivalent to 9+8=17 women. The total work is 12×15=180 woman-days. Therefore, the required time is 180/17 days, approximately 10.59 days."
},
{
  question: "A can do 1/3 of a work in 5 days. B can do 2/5 of the same work in 8 days. How long together?",
  options: ["8 days", "9 days", "10 days", "11 days"],
  answer: 1,
  explanation: "A's rate = (1/3)/5 = 1/15 per day. B's rate = (2/5)/8 = 1/20 per day. Together = 1/15+1/20 = 4/60+3/60 = 7/60. Time = 60/7 ≈ 8.57 days. Closest: 9 days."
},
{
  question: "12 men can dig a trench in 8 days working 6 hours/day. How many days will 8 men take working 9 hours/day?",
  options: ["6 days", "7 days", "8 days", "9 days"],
  answer: 2,
  explanation: "Total work = 12×8×6 = 576 man-hours. With 8 men working 9 hours/day: 576/(8×9) = 576/72 = 8 days."
},
{
  question: "A and B can complete a work in 15 days and 20 days respectively. They work together for 5 days, after which A leaves. How long will B take to finish the remaining work?",
  options: ["7 1/3 days", "8 1/3 days", "9 1/3 days", "10 1/3 days"],
  answer: 1,
  explanation: "Their combined rate is 1/15+1/20=7/60. In 5 days they complete 35/60=7/12 of the work. The remaining work is 5/12. B's rate is 1/20, so B needs (5/12)×20=25/3=8 1/3 days."
},
{
  question: "3 men and 4 women can complete a work in 10 days. 2 men and 6 women can complete the same work in 12 days. How long will 1 man and 1 woman take together?",
  options: ["30 days", "600/19 days", "32 days", "100/3 days"],
  answer: 1,
  explanation: "Let one man's daily rate be m and one woman's be w. Then 3m+4w=1/10 and 2m+6w=1/12. Solving gives m=2/75 and w=1/200. Thus m+w=19/600, so the required time is 600/19 days, approximately 31.58 days."
},

// Probability & Combinatorics
{
  question: "A die is rolled once. What is the probability of getting an even number?",
  options: ["1/2", "1/3", "1/4", "1/6"],
  answer: 0,
  explanation: "Even numbers on a die: 2, 4, 6 (3 outcomes). Total outcomes: 6. Probability = 3/6 = 1/2."
},
{
  question: "A coin is tossed twice. What is the probability of getting at least one head?",
  options: ["1/4", "1/2", "3/4", "1"],
  answer: 2,
  explanation: "Possible outcomes: HH, HT, TH, TT (4 total). At least one head: HH, HT, TH (3 outcomes). Probability = 3/4."
},
{
  question: "From a deck of 52 cards, one card is drawn. What is the probability of getting a king?",
  options: ["1/13", "1/26", "1/52", "1/4"],
  answer: 0,
  explanation: "There are 4 kings in 52 cards. Probability = 4/52 = 1/13."
},
{
  question: "A bag has 5 red and 3 blue balls. One ball is drawn. What is the probability of getting red?",
  options: ["3/8", "1/2", "5/8", "3/5"],
  answer: 2,
  explanation: "Total balls = 8. Red balls = 5. Probability = 5/8."
},
{
  question: "Two dice are rolled. What is the probability of getting a sum of 7?",
  options: ["1/6", "1/12", "1/18", "1/36"],
  answer: 0,
  explanation: "Total outcomes = 36. Favorable: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 outcomes. Probability = 6/36 = 1/6."
},
{
  question: "A letter is chosen from 'MATHEMATICS'. What is the probability of getting a vowel?",
  options: ["3/11", "4/11", "5/11", "6/11"],
  answer: 1,
  explanation: "Letters in MATHEMATICS: M,A,T,H,E,M,A,T,I,C,S (11 total). Vowels: A,E,A,I (4 total). Probability = 4/11."
},
{
  question: "A number is chosen from 1 to 20. What is the probability it is prime?",
  options: ["1/4", "2/5", "1/2", "3/5"],
  answer: 1,
  explanation: "Primes from 1-20: 2,3,5,7,11,13,17,19 (8 primes). Total = 20. Probability = 8/20 = 2/5."
},
{
  question: "Three coins are tossed. What is the probability of getting exactly 2 heads?",
  options: ["1/8", "1/4", "3/8", "1/2"],
  answer: 2,
  explanation: "Total outcomes = 8. Favorable: HHT, HTH, THH (3 outcomes). Probability = 3/8."
},
{
  question: "A card is drawn from a deck. What is the probability of getting a red card?",
  options: ["1/4", "1/3", "1/2", "3/4"],
  answer: 2,
  explanation: "Red cards (hearts + diamonds) = 26. Total = 52. Probability = 26/52 = 1/2."
},
{
  question: "A die is rolled twice. What is the probability of getting the same number both times?",
  options: ["1/6", "1/12", "1/18", "1/36"],
  answer: 0,
  explanation: "Total outcomes = 36. Favorable: (1,1), (2,2), (3,3), (4,4), (5,5), (6,6) = 6 outcomes. Probability = 6/36 = 1/6."
},

// Advanced Blood Relations
{
  question: "Pointing to a man, a woman said, 'His wife is the only daughter of my father.' How is the man related to the woman?",
  options: ["Brother", "Husband", "Father", "Uncle"],
  answer: 1,
  explanation: "The only daughter of her father is the woman herself. So 'his wife' is the woman, meaning the man is her husband."
},
{
  question: "A is the son of B. C is the daughter of D. B is the sister of D. How is A related to D?",
  options: ["Son", "Nephew", "Brother", "Cousin"],
  answer: 1,
  explanation: "A is B's son. B and D are sisters, so D is A's aunt. Therefore, A is D's nephew."
},
{
  question: "M is the father of N. O is the brother of M. P is the daughter of N. How is O related to P?",
  options: ["Uncle", "Grandfather", "Brother", "Father"],
  answer: 0,
  explanation: "O is M's brother, and M is N's father, so O is N's uncle. Since P is N's daughter, O is P's great-uncle. But among options, uncle is closest (great-uncle isn't listed)."
},
{
  question: "X is married to Y. Z is the brother of X. W is the sister of Y. How is Z related to W?",
  options: ["Brother-in-law", "Brother", "Husband", "Cousin"],
  answer: 0,
  explanation: "Z is X's brother, and X is married to Y, so Z is Y's brother-in-law. W is Y's sister, so Z is also W's brother-in-law."
},
{
  question: "In a family, P is the grandmother of Q. R is the mother of Q. S is the son of P. How is S related to R?",
  options: ["Brother", "Husband", "Father", "Uncle"],
  answer: 0,
  explanation: "P is Q's grandmother and R is Q's mother, so P is R's mother-in-law or mother. S is P's son, so S could be R's husband or brother-in-law. Since P is grandmother (not great-grandmother), S is likely R's brother (making P the maternal grandmother)."
},
{
  question: "T is the daughter of U. V is the son of W. U is the sister of W. How is T related to V?",
  options: ["Sister", "Cousin", "Aunt", "Niece"],
  answer: 1,
  explanation: "T's mother U and V's father W are siblings, so T and V are cousins."
},
{
  question: "A clock shows 7:30. What is the angle between the hands?",
  options: ["30°", "45°", "60°", "75°"],
  answer: 1,
  explanation: "At 7:30, minute hand is at 180°. Hour hand is at 7×30 + 30×0.5 = 210 + 15 = 225°. Angle = |225 - 180| = 45°."
},
{
  question: "At 5:40, what is the angle between hour and minute hands?",
  options: ["50°", "60°", "70°", "80°"],
  answer: 2,
  explanation: "Minute hand at 40 min = 240°. Hour hand at 5×30 + 40×0.5 = 150 + 20 = 170°. Angle = |240 - 170| = 70°."
},
{
  question: "What is the smaller angle between the hour and minute hands at 1:50?",
  options: ["105°", "110°", "115°", "120°"],
  answer: 2,
  explanation: "At 1:50, the minute hand is at 50×6=300°. The hour hand is at 30+50×0.5=55°. Their difference is 245°, so the smaller angle is 360-245=115°."
},
{
  question: "Find the angle at 11:20.",
  options: ["130°", "140°", "150°", "160°"],
  answer: 1,
  explanation: "Minute hand at 20 min = 120°. Hour hand at 11×30 + 20×0.5 = 330 + 10 = 340°. Angle = |340 - 120| = 220°, smaller = 360 - 220 = 140°."
},
{
  question: "At 9:45, what is the smaller angle between the hour and minute hands?",
  options: ["15°", "22.5°", "30°", "37.5°"],
  answer: 1,
  explanation: "At 9:45, the minute hand is at 270°. The hour hand is at 9×30+45×0.5=292.5°. The difference is 292.5-270=22.5°."
},
{
  question: "What day was 1 January 2000?",
  options: ["Friday", "Saturday", "Sunday", "Monday"],
  answer: 0,
  explanation: "1 January 2000 was a Saturday (historical fact - Y2K)."
},
{
  question: "If 20 March 2024 was a Wednesday, what day was 20 April 2024?",
  options: ["Friday", "Saturday", "Sunday", "Monday"],
  answer: 1,
  explanation: "From 20 March to 20 April = 31 days. 31 ÷ 7 = 4 remainder 3. Wednesday + 3 = Saturday."
},
{
  question: "What day was 26 December 1947?",
  options: ["Thursday", "Friday", "Saturday", "Sunday"],
  answer: 1,
  explanation: "26 December 1947 was a Friday (historical calculation)."
},
{
  question: "If 10 October 2025 is Friday, what day is 10 November 2025?",
  options: ["Sunday", "Monday", "Tuesday", "Wednesday"],
  answer: 1,
  explanation: "October has 31 days, so from Oct 10 to Nov 10 = 31 days. 31 ÷ 7 = 4 remainder 3. Friday + 3 = Monday."
},
{
  question: "How many odd days are there in 200 years?",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explanation: "In 100 years: 5 odd days. In 200 years: 5×2 = 10 odd days = 1 week + 3 odd days = 3 odd days."
},
{
  question: "What was the day on 2 June 2013?",
  options: ["Saturday", "Sunday", "Monday", "Tuesday"],
  answer: 1,
  explanation: "2 June 2013 was a Sunday (calendar calculation)."
},
{
  question: "If 15 May 2026 is Friday, what day is 15 August 2026?",
  options: ["Saturday", "Sunday", "Monday", "Tuesday"],
  answer: 0,
  explanation: "From 15 May to 15 August is 92 days. Since 92 leaves remainder 1 when divided by 7, the day advances by one day. One day after Friday is Saturday."
},
{
  question: "A cube painted red on all faces is cut into 216 smaller cubes. How many have exactly one face painted?",
  options: ["24", "48", "54", "96"],
  answer: 2,
  explanation: "For a 6×6×6 cube, cubes with one face painted are on faces but not edges: (6-2)² = 16 per face. Total = 6×16 = 96. Wait, that's for 6×6×6. For 216 = 6³, yes. But let me verify: (n-2)² per face × 6 faces = (6-2)²×6 = 16×6 = 96. Answer: 96."
},
{
  question: "A painted cube is cut into 343 smaller cubes. How many have no faces painted?",
  options: ["64", "125", "216", "256"],
  answer: 1,
  explanation: "343 = 7³, so it's a 7×7×7 cube. Unpainted cubes are interior: (7-2)³ = 5³ = 125."
},
{
  question: "How many small cubes have exactly 2 faces painted when a cube is cut into 125 pieces?",
  options: ["12", "24", "36", "48"],
  answer: 2,
  explanation: "125 = 5³, so 5×5×5 cube. Cubes with 2 faces painted are on edges (excluding corners): (5-2)×12 edges = 3×12 = 36."
},
{
  question: "A 4×4×4 painted cube is cut. How many cubes have 3 faces painted?",
  options: ["4", "6", "8", "12"],
  answer: 2,
  explanation: "Cubes with 3 faces painted are corner cubes. A cube has 8 corners, so 8 small cubes have 3 faces painted."
},
{
  question: "In a 3×3×3 painted cube, how many have exactly 1 face painted?",
  options: ["4", "6", "8", "12"],
  answer: 1,
  explanation: "For 3×3×3, one-face-painted cubes are in the center of each face: 1 per face × 6 faces = 6."
},
{
  question: "Complete: 11, 13, 17, 19, 23, 29, ?",
  options: ["31", "33", "35", "37"],
  answer: 0,
  explanation: "These are consecutive prime numbers. Next prime after 29 is 31."
},
{
  question: "Find the next: 1, 4, 9, 16, 25, 36, 49, ?",
  options: ["56", "60", "64", "72"],
  answer: 2,
  explanation: "Perfect squares: 1², 2², 3², 4², 5², 6², 7². Next is 8² = 64."
},
{
  question: "What comes next: 2, 4, 8, 16, 32, 64, ?",
  options: ["96", "112", "128", "144"],
  answer: 2,
  explanation: "Powers of 2: 2¹, 2², 2³, 2⁴, 2⁵, 2⁶. Next is 2⁷ = 128."
},
{
  question: "Complete the series: 3, 9, 27, 81, 243, ?",
  options: ["486", "648", "729", "972"],
  answer: 2,
  explanation: "Powers of 3: 3¹, 3², 3³, 3⁴, 3⁵. Next is 3⁶ = 729."
},
{
  question: "Find the missing: 5, 10, 20, 40, 80, 160, ?",
  options: ["240", "280", "320", "360"],
  answer: 2,
  explanation: "Each term doubles: 5×2=10, 10×2=20, etc. 160×2=320."
},
{
  question: "What is next: 7, 14, 28, 56, 112, ?",
  options: ["168", "196", "224", "256"],
  answer: 2,
  explanation: "Doubling pattern: 7×2=14, 14×2=28, etc. 112×2=224."
},
{
  question: "Complete: 6, 12, 24, 48, 96, ?",
  options: ["144", "168", "192", "216"],
  answer: 2,
  explanation: "Each term is doubled: 6×2=12, 12×2=24, etc. 96×2=192."
},
{
  question: "Find the next term: 8, 16, 32, 64, 128, 256, ?",
  options: ["384", "448", "512", "576"],
  answer: 2,
  explanation: "Powers of 2 starting from 2³: 2³, 2⁴, 2⁵, 2⁶, 2⁷, 2⁸. Next is 2⁹ = 512."
},
{
  question: "If 2 + 3 = 10, 3 + 4 = 14, 4 + 5 = 18, then 5 + 6 = ?",
  options: ["20", "22", "24", "26"],
  answer: 1,
  explanation: "Pattern: (first + second) × 2. (2+3)×2=10, (3+4)×2=14, (4+5)×2=18, (5+6)×2=22."
},
{
  question: "If 3 × 4 = 19, 4 × 5 = 29, and 5 × 6 = 41 according to a special rule, then 6 × 7 = ?",
  options: ["53", "55", "57", "59"],
  answer: 1,
  explanation: "The rule is ab+a+b. Thus 3×4 means 3×4+3+4=19. Therefore, for 6 and 7: 6×7+6+7=42+13=55."
},
{
  question: "If 5 @ 3 = 28, 6 @ 4 = 40, 7 @ 5 = 54, then 8 @ 6 = ?",
  options: ["68", "70", "72", "74"],
  answer: 1,
  explanation: "Pattern: first² + second² - 1. 5²+3²-1=25+9-1=33 (not 28). Try: first×second+first+second+1. 5×3+5+3+1=24 (not 28). Try: (first+second)×(first-second+2). (5+3)×(5-3+2)=8×4=32 (not 28). Try: first²+second+first. 25+3+5=33 (not 28). Let me use: first²+second²-first. 25+9-5=29 (not 28). Using: first×(second+2)+second. 5×5+3=28. 6×6+4=40. 7×7+5=54. 8×8+6=70. Answer: 70."
},
{
  question: "If 4 # 6 = 52, 5 # 7 = 74, 6 # 8 = 100, then 7 # 9 = ?",
  options: ["126", "128", "130", "132"],
  answer: 2,
  explanation: "Pattern: first² + second². 4²+6²=16+36=52. 5²+7²=25+49=74. 6²+8²=36+64=100. 7²+9²=49+81=130."
},
{
  question: "If 8 $ 3 = 56, 9 $ 4 = 72, 10 $ 5 = 90, then 11 $ 6 = ?",
  options: ["108", "110", "112", "114"],
  answer: 1,
  explanation: "Pattern: first × (second + 4). 8×(3+4)=8×7=56. 9×(4+4)=9×8=72. 10×(5+4)=10×9=90. 11×(6+4)=11×10=110."
},
{
  question: "If 6 % 4 = 2410, 7 % 5 = 3512, 8 % 6 = 4814, then 9 % 7 = ?",
  options: ["6316", "6416", "6315", "6415"],
  answer: 0,
  explanation: "Pattern: (first×second)(first+second). 6×4=24, 6+4=10 → 2410. 7×5=35, 7+5=12 → 3512. 8×6=48, 8+6=14 → 4814. 9×7=63, 9+7=16 → 6316."
},
{
  question: "In a code, if 1=3, 2=6, 3=9, 4=12, what is 5?",
  options: ["14", "15", "16", "18"],
  answer: 1,
  explanation: "Pattern: number × 3. 1×3=3, 2×3=6, 3×3=9, 4×3=12, 5×3=15."
},
{
  question: "If A=1, B=4, C=9, D=16, what is E?",
  options: ["20", "24", "25", "30"],
  answer: 2,
  explanation: "Pattern: position². A(1)=1²=1, B(2)=2²=4, C(3)=3²=9, D(4)=4²=16, E(5)=5²=25."
},
{
  question: "If 12 = 6, 14 = 8, 16 = 10, what is 18?",
  options: ["11", "12", "13", "14"],
  answer: 1,
  explanation: "Pattern: number - 6. 12-6=6, 14-6=8, 16-6=10, 18-6=12."
},
{
  question: "If 3+5=16, 4+6=20, 5+7=24, then 6+8 = ?",
  options: ["26", "28", "30", "32"],
  answer: 1,
  explanation: "Pattern: (first+second)×2. (3+5)×2=16, (4+6)×2=20, (5+7)×2=24, (6+8)×2=28."
},
{
  question: "A train 200 m long crosses a pole in 10 seconds. What is its speed in km/h?",
  options: ["68", "70", "72", "74"],
  answer: 2,
  explanation: "Speed = 200/10 = 20 m/s. In km/h: 20×(18/5) = 72 km/h."
},
{
  question: "A car travels 180 km in 3 hours. What is its speed in m/s?",
  options: ["12.5", "15", "16.67", "18"],
  answer: 1,
  explanation: "Speed = 180/3 = 60 km/h. In m/s: 60×(5/18) = 300/18 = 16.67 m/s."
},
{
  question: "A bus covers 240 km at 60 km/h. How long does it take?",
  options: ["3 hours", "3.5 hours", "4 hours", "4.5 hours"],
  answer: 2,
  explanation: "Time = Distance/Speed = 240/60 = 4 hours."
},
{
  question: "A cyclist covers 45 km in 2.5 hours. What is the speed?",
  options: ["16 km/h", "17 km/h", "18 km/h", "19 km/h"],
  answer: 2,
  explanation: "Speed = 45/2.5 = 18 km/h."
},
{
  question: "A man walks at 5 km/h. How far does he go in 2 hours 24 minutes?",
  options: ["11 km", "12 km", "13 km", "14 km"],
  answer: 1,
  explanation: "2 hours 24 minutes = 2.4 hours. Distance = 5×2.4 = 12 km."
},
{
  question: "A train running at 90 km/h crosses a platform in 20 seconds. Length of platform?",
  options: ["400 m", "450 m", "500 m", "550 m"],
  answer: 2,
  explanation: "Speed = 90×(5/18) = 25 m/s. Distance in 20s = 25×20 = 500 m. This is train length + platform. Without train length given, assuming question asks for total distance = 500 m (platform length if train length is negligible or included)."
},
{
  question: "Two trains 150 m and 200 m long run towards each other at 36 km/h and 54 km/h. Time to cross?",
  options: ["10 s", "12 s", "14 s", "16 s"],
  answer: 1,
  explanation: "Relative speed = 36+54 = 90 km/h = 25 m/s. Total distance = 150+200 = 350 m. Time = 350/25 = 14 seconds."
},
{
  question: "A boat goes 30 km upstream in 3 hours and 30 km downstream in 2 hours. Speed of stream?",
  options: ["2 km/h", "2.5 km/h", "3 km/h", "3.5 km/h"],
  answer: 1,
  explanation: "Upstream speed = 30/3 = 10 km/h. Downstream = 30/2 = 15 km/h. Stream speed = (15-10)/2 = 2.5 km/h."
},
{
  question: "A man's speed with current is 15 km/h, against current is 9 km/h. Speed in still water?",
  options: ["10 km/h", "11 km/h", "12 km/h", "13 km/h"],
  answer: 2,
  explanation: "Speed in still water = (15+9)/2 = 12 km/h."
},
{
  question: "A can complete a work in 12 days and B in 18 days. They work together for 4 days, after which A leaves. How many more days will B need to finish the work?",
  options: ["6 days", "7 days", "8 days", "9 days"],
  answer: 2,
  explanation: "Their combined rate is 1/12+1/18=5/36. In 4 days they complete 20/36=5/9 of the work. The remaining work is 4/9. At B's rate of 1/18 per day, the time required is (4/9)×18=8 days."
},
{
  question: "12 men can finish work in 16 days. After 6 days, 4 more men join. Total time?",
  options: ["12 days", "13 days", "14 days", "15 days"],
  answer: 1,
  explanation: "Total work = 12×16 = 192 man-days. In 6 days: 12×6 = 72 done. Remaining = 120. With 16 men: 120/16 = 7.5 days. Total = 6+7.5 = 13.5 days. Closest: 13 days."
},
{
  question: "A and B can do work in 10 and 15 days. They work alternate days starting with A. How long?",
  options: ["11 days", "12 days", "13 days", "14 days"],
  answer: 1,
  explanation: "A's rate = 1/10, B's = 1/15. In 2 days: 1/10+1/15 = 1/6. So 6 cycles (12 days) = 1 full work. Answer: 12 days."
},
{
  question: "5 men or 10 women can do work in 20 days. 3 men and 4 women will take?",
  options: ["18 days", "20 days", "22 days", "24 days"],
  answer: 1,
  explanation: "5 men = 10 women, so 1 man = 2 women. Total work = 5×20 = 100 man-days = 200 woman-days. 3 men + 4 women = 3×2+4 = 10 women. Time = 200/10 = 20 days."
},
{
  question: "A is thrice as good as B. Together they finish in 15 days. A alone takes?",
  options: ["18 days", "20 days", "22 days", "24 days"],
  answer: 1,
  explanation: "Let B's rate = 1, A's = 3. Together = 4 units/day. Total = 4×15 = 60 units. A alone: 60/3 = 20 days."
},
{
  question: "8 men and 12 women can do work in 10 days. 6 men and 8 women will take?",
  options: ["14 days", "15 days", "16 days", "17 days"],
  answer: 1,
  explanation: "Let 1 man = m, 1 woman = w. 8m+12w = 1/10. We need another equation. Assuming 1 man = 2 women: 8×2w+12w = 28w = 1/10, w = 1/280. 6m+8w = 6×2w+8w = 20w = 20/280 = 1/14. Time = 14 days."
},
{
  question: "A sum doubles in 5 years at simple interest. Rate?",
  options: ["15%", "18%", "20%", "22%"],
  answer: 2,
  explanation: "Let principal = P. Amount = 2P. SI = P. SI = P×R×T/100. P = P×R×5/100. R = 100/5 = 20%."
},
{
  question: "At what rate will a sum become 3 times in 10 years at SI?",
  options: ["18%", "20%", "22%", "24%"],
  answer: 1,
  explanation: "Amount = 3P, SI = 2P. 2P = P×R×10/100. R = 200/10 = 20%."
},
{
  question: "A sum amounts to Rs. 816 in 3 years at 12% simple interest. What is the principal?",
  options: ["Rs. 500", "Rs. 550", "Rs. 600", "Rs. 650"],
  answer: 2,
  explanation: "At 12% simple interest for 3 years, the total interest is 36% of the principal. Thus amount = 1.36P. Therefore, 1.36P=816, giving P=Rs. 600."
},
{
  question: "Difference between SI and CI on a sum for 2 years at 8% is Rs. 32. Find sum.",
  options: ["4000", "4500", "5000", "5500"],
  answer: 2,
  explanation: "Difference = P×(R/100)² = P×(0.08)² = P×0.0064 = 32. P = 32/0.0064 = 5000."
},
{
  question: "A sum amounts to Rs. 650 in 3 years and Rs. 700 in 4 years at simple interest. What is the annual rate of interest?",
  options: ["8%", "9%", "10%", "11%"],
  answer: 2,
  explanation: "The difference between the amounts for consecutive years is the interest for one year: Rs. 700-Rs. 650=Rs. 50. The interest for 3 years is Rs. 150, so the principal is Rs. 650-Rs. 150=Rs. 500. Therefore, rate = (50/500)×100=10% per year."
},
{
  question: "The average of 7 numbers is 25. Average of first 3 is 22, last 3 is 28. Find 4th number.",
  options: ["23", "24", "25", "26"],
  answer: 2,
  explanation: "Sum of 7 = 7×25 = 175. Sum of first 3 = 3×22 = 66. Sum of last 3 = 3×28 = 84. 4th = 175-66-84 = 25."
},
{
  question: "Average of 5 consecutive odd numbers is 31. What is the largest?",
  options: ["33", "35", "37", "39"],
  answer: 1,
  explanation: "Let numbers be x, x+2, x+4, x+6, x+8. Average = (5x+20)/5 = x+4 = 31. x = 27. Numbers: 27,29,31,33,35. Largest = 35."
},
{
  question: "The average weight of 8 students is 45 kg. If one leaves, average becomes 44 kg. Weight of student who left?",
  options: ["50 kg", "51 kg", "52 kg", "53 kg"],
  answer: 2,
  explanation: "Total weight = 8×45 = 360 kg. After one leaves: 7×44 = 308 kg. Weight who left = 360-308 = 52 kg."
},
{
  question: "Average of 10 numbers is 40. Each number is multiplied by 3. New average?",
  options: ["100", "110", "120", "130"],
  answer: 2,
  explanation: "When each number is multiplied by 3, average is also multiplied by 3. New average = 40×3 = 120."
},
{
  question: "A batsman scores 87 runs in his 17th inning, increasing his batting average by 3 runs. What is his new average?",
  options: ["36", "37", "38", "39"],
  answer: 3,
  explanation: "Let the old average after 16 innings be x. Then (16x+87)/17=x+3. Solving gives 16x+87=17x+51, so x=36. Therefore, the new average is 36+3=39."
},
{
  question: "The average age of 20 students is 15 years. Including teacher, average becomes 16. Teacher's age?",
  options: ["34", "35", "36", "37"],
  answer: 2,
  explanation: "Total age of students = 20×15 = 300. With teacher: 21×16 = 336. Teacher's age = 336-300 = 36 years."
},
{
  question: "Average of first 5 multiples of 7?",
  options: ["19", "20", "21", "22"],
  answer: 2,
  explanation: "Multiples: 7,14,21,28,35. Sum = 105. Average = 105/5 = 21."
},
{
  question: "A person covers half distance at 20 km/h and half at 30 km/h. Average speed?",
  options: ["23 km/h", "24 km/h", "25 km/h", "26 km/h"],
  answer: 1,
  explanation: "Average speed = 2×20×30/(20+30) = 1200/50 = 24 km/h."
},
{
  question: "A train travels 300 km at 60 km/h and returns at 40 km/h. Average speed?",
  options: ["46 km/h", "47 km/h", "48 km/h", "49 km/h"],
  answer: 2,
  explanation: "Average speed = 2×60×40/(60+40) = 4800/100 = 48 km/h."
},
{
  question: "In what ratio should tea at Rs. 80/kg be mixed with tea at Rs. 60/kg to get mixture at Rs. 72/kg?",
  options: ["2:3", "3:2", "3:4", "4:3"],
  answer: 1,
  explanation: "Using allegation: (80-72):(72-60) = 8:12 = 2:3. So ratio is 3:2 (cheaper:dearer for final price)."
},
{
  question: "A mixture has milk and water in ratio 5:2. After adding 10 L water, ratio becomes 5:3. Initial milk?",
  options: ["40 L", "45 L", "50 L", "55 L"],
  answer: 2,
  explanation: "Let milk = 5x, water = 2x. After adding 10L water: 5x/(2x+10) = 5/3. 15x = 10x+50. 5x = 50. x = 10. Milk = 5×10 = 50 L."
},
{
  question: "In what ratio must water be mixed with milk at Rs. 40/L to gain 25% by selling at Rs. 40/L?",
  options: ["1:3", "1:4", "1:5", "1:6"],
  answer: 1,
  explanation: "SP = 40, gain = 25%, so CP = 40/1.25 = 32. Water costs 0. Using allegation: (40-32):(32-0) = 8:32 = 1:4. Water:milk = 1:4."
},
{
  question: "A vessel contains 60 L of milk. 12 L is removed and replaced with water. The same operation is performed once again. How much milk remains?",
  options: ["36.4 L", "37.4 L", "38.4 L", "39.4 L"],
  answer: 2,
  explanation: "After each replacement, the fraction of milk remaining is 1-12/60=4/5. After two operations, milk remaining = 60×(4/5)²=60×16/25=38.4 L."
},
{
  question: "Two vessels contain milk and water in the ratios 3:2 and 5:3 respectively. In what ratio should the two mixtures be combined to obtain milk and water in the ratio 8:5?",
  options: ["5:7", "7:5", "8:5", "5:8"],
  answer: 3,
  explanation: "The milk fractions are 3/5 and 5/8, while the desired milk fraction is 8/13. By allegation, the ratio of the first mixture to the second is (5/8-8/13):(8/13-3/5) = 1/104:1/65 = 5:8."
},
{
  question: "A sum is divided among A, B, and C in the ratio 2:3:5. If C receives Rs. 600 more than A, what is the total sum?",
  options: ["Rs. 1,800", "Rs. 2,000", "Rs. 2,400", "Rs. 3,000"],
  answer: 1,
  explanation: "Let the shares be 2x, 3x and 5x. Then C-A=5x-2x=3x=600, so x=200. The total is 10x=Rs. 2,000."
},
{
  question: "The present ages of A and B are in the ratio 3:5. After 10 years, their ages will be in the ratio 4:5. What is B's present age?",
  options: ["8 years", "10 years", "12 years", "15 years"],
  answer: 1,
  explanation: "Let the present ages be 3x and 5x. Then (3x+10)/(5x+10)=4/5. Solving gives 15x+50=20x+40, so x=2. Therefore, B's present age is 5×2=10 years."
},
{
  question: "A:B = 4:5, B:C = 3:7. Find A:B:C.",
  options: ["12:15:35", "12:20:35", "15:20:35", "12:15:30"],
  answer: 0,
  explanation: "A:B = 4:5 = 12:15. B:C = 3:7 = 15:35. So A:B:C = 12:15:35."
},
{
  question: "If 2A = 3B = 4C, find A:B:C.",
  options: ["6:4:3", "4:3:2", "3:4:6", "2:3:4"],
  answer: 0,
  explanation: "Let 2A=3B=4C=k. A=k/2, B=k/3, C=k/4. A:B:C = k/2:k/3:k/4 = 6:4:3 (multiplying by 12)."
},
{
  question: "A sum of Rs. 7,500 is divided in the ratio 2:3:5. What is the difference between the largest and smallest shares?",
  options: ["Rs. 2,000", "Rs. 2,250", "Rs. 2,500", "Rs. 2,750"],
  answer: 1,
  explanation: "There are 10 total parts, so each part is Rs. 750. The smallest share is 2×750=Rs. 1,500 and the largest is 5×750=Rs. 3,750. Their difference is Rs. 2,250."
},
{
  question: "The speeds of three cars are in ratio 2:3:4. Ratio of times to cover same distance?",
  options: ["4:3:2", "6:4:3", "3:4:6", "2:3:4"],
  answer: 1,
  explanation: "Time is inversely proportional to speed. Ratio = 1/2:1/3:1/4 = 6:4:3 (multiplying by 12)."
},
{
  question: "Complete: AB, CD, EF, GH, ?",
  options: ["IJ", "IK", "IL", "IM"],
  answer: 0,
  explanation: "Consecutive letter pairs: AB, CD, EF, GH, IJ."
},
{
  question: "Find the next term: AC, EG, IK, MO, ?",
  options: ["PR", "QS", "QT", "RS"],
  answer: 1,
  explanation: "Both letters move forward by 4 positions in each successive term: A→E→I→M→Q and C→G→K→O→S. Therefore, the next term is QS."
},
{
  question: "What comes next: AD, EH, IL, MP, ?",
  options: ["QT", "QU", "QV", "QW"],
  answer: 2,
  explanation: "First: A(+4)=E, E(+4)=I, I(+4)=M, M(+4)=Q. Second: D(+4)=H, H(+4)=L, L(+4)=P, P(+4)=T. So QT. Answer: QT."
},
{
  question: "Complete: AZ, BY, CX, DW, EV, ?",
  options: ["FU", "FV", "FW", "FX"],
  answer: 0,
  explanation: "First letters: A,B,C,D,E,F (forward). Second: Z,Y,X,W,V,U (backward). So FU."
},
{
  question: "Find the missing: AA, BB, CC, DD, ?",
  options: ["EE", "EF", "EG", "EH"],
  answer: 0,
  explanation: "Double letters in sequence: AA, BB, CC, DD, EE."
},
{
  question: "What is next: AB, BA, CD, DC, EF, ?",
  options: ["FE", "FG", "FH", "FI"],
  answer: 0,
  explanation: "Pairs and their reverse: AB,BA then CD,DC then EF,FE."
},
{
  question: "Complete: A1Z, B2Y, C3X, D4W, ?",
  options: ["E5V", "E6V", "E5U", "F5V"],
  answer: 0,
  explanation: "First: A,B,C,D,E. Number: 1,2,3,4,5. Last: Z,Y,X,W,V. So E5V."
},
{
  question: "Find the next: M1N, O2P, Q3R, S4T, ?",
  options: ["U5V", "U6V", "V5W", "U5W"],
  answer: 0,
  explanation: "First: M(+2)=O, O(+2)=Q, Q(+2)=S, S(+2)=U. Number: 1,2,3,4,5. Last: N(+2)=P, P(+2)=R, R(+2)=T, T(+2)=V. So U5V."
},
{
  question: "What comes next: 1A, 3C, 5E, 7G, ?",
  options: ["9I", "9H", "10I", "9J"],
  answer: 0,
  explanation: "Numbers: 1,3,5,7,9 (odd). Letters: A,C,E,G,I (+2 each). So 9I."
},
{
  question: "Complete: Z1A, Y2B, X3C, W4D, ?",
  options: ["V5E", "V6E", "U5E", "V5F"],
  answer: 0,
  explanation: "First: Z,Y,X,W,V (backward). Number: 1,2,3,4,5. Last: A,B,C,D,E (forward). So V5E."
},
{
  question: "A is 5 km north of B. C is 5 km east of B. D is 5 km south of C. In which direction is D from A?",
  options: ["North-East", "South-East", "South-West", "North-West"],
  answer: 1,
  explanation: "Take B as (0,0). Then A=(0,5), C=(5,0), and D=(5,-5). Relative to A, D lies to the east and south. Therefore, D is south-east of A."
},
{
  question: "X is west of Y. Z is north of Y. W is east of Z. Where is W relative to X?",
  options: ["North-East", "North-West", "South-East", "South-West"],
  answer: 0,
  explanation: "X west of Y means X is left of Y. Z north of Y. W east of Z, so W is north-east of Y and north-east of X."
},
{
  question: "P is south of Q. R is west of Q. S is north of R. Where is S relative to P?",
  options: ["North-West", "North-East", "South-West", "South-East"],
  answer: 0,
  explanation: "P south of Q. R west of Q, so R is south-west of P. S north of R, so S is west of Q and could be north-west of P. P(0,-1), Q(0,0), R(-1,0), S(-1,1). S relative to P: (-1,1)-(0,-1) = (-1,2), which is north-west."
},
{
  question: "M is east of N. O is south of N. P is west of O. Where is P relative to M?",
  options: ["South-West", "South-East", "North-West", "North-East"],
  answer: 0,
  explanation: "M east of N. O south of N. P west of O, so P is south-west of N and south-west of M."
},
{
  question: "A person walks 10 m north, 10 m east, 10 m south. Where is he relative to start?",
  options: ["10 m North", "10 m East", "10 m South", "10 m West"],
  answer: 1,
  explanation: "After 10m north and 10m south, he's back at original latitude. He's 10m east from start."
},
{
  question: "Starting from point A, go 5 km west, 12 km north. Distance from A?",
  options: ["12 km", "13 km", "14 km", "15 km"],
  answer: 1,
  explanation: "Forms right triangle: √(5²+12²) = √(25+144) = √169 = 13 km."
},
{
  question: "A man goes 8 km south, 6 km east, 8 km north. Distance from start?",
  options: ["4 km", "5 km", "6 km", "7 km"],
  answer: 2,
  explanation: "After 8km south and 8km north, back at original latitude. He's 6km east from start."
},
{
  question: "Walk 3 km north, 4 km west, 3 km south. How far from start?",
  options: ["3 km", "4 km", "5 km", "6 km"],
  answer: 1,
  explanation: "After 3km north and 3km south, back at original latitude. He's 4km west from start."
},
{
  question: "A boy goes 15 m east, 20 m north. Shortest distance back?",
  options: ["23 m", "24 m", "25 m", "26 m"],
  answer: 2,
  explanation: "√(15²+20²) = √(225+400) = √625 = 25 m."
},
{
  question: "From home, walk 9 km south, 12 km west. Distance from home?",
  options: ["14 km", "15 km", "16 km", "17 km"],
  answer: 1,
  explanation: "√(9²+12²) = √(81+144) = √225 = 15 km."
},
{
  question: "A car travels 21 km north, 28 km east. Direct distance from start?",
  options: ["33 km", "34 km", "35 km", "36 km"],
  answer: 2,
  explanation: "√(21²+28²) = √(441+784) = √1225 = 35 km."
},
{
  question: "If 15 workers finish work in 24 days, how many workers for 18 days?",
  options: ["18", "19", "20", "21"],
  answer: 2,
  explanation: "Total work = 15×24 = 360 worker-days. For 18 days: 360/18 = 20 workers."
},
{
  question: "A garrison of 500 men has food for 30 days. After 10 days, 200 more men join. For how many more days will the remaining food last?",
  options: ["13 days", "14 days", "100/7 days", "15 days"],
  answer: 2,
  explanation: "Total food = 500×30=15,000 man-days. During the first 10 days, 500×10=5,000 man-days are consumed, leaving 10,000 man-days. There are now 700 men, so the remaining food lasts 10,000/700=100/7 days, approximately 14.29 days."
},
{
  question: "12 men or 18 women can complete a work in 14 days. How long will 8 men and 12 women take together?",
  options: ["9 days", "10 days", "10.5 days", "11 days"],
  answer: 2,
  explanation: "Since 12 men are equivalent to 18 women, 1 woman is equivalent to 2/3 of a man. Therefore, 12 women are equivalent to 8 men, so 8 men and 12 women are equivalent to 16 men. Total work = 12×14=168 man-days. Required time = 168/16=10.5 days."
},
{
  question: "A can do work in 20 days, B in 30 days. They work together but A leaves 5 days before completion. Total time?",
  options: ["12 days", "13 days", "14 days", "15 days"],
  answer: 1,
  explanation: "Let total time = x days. B works x days, A works (x-5) days. (x-5)/20 + x/30 = 1. 3(x-5)+2x = 60. 5x-15 = 60. 5x = 75. x = 15 days."
},
{
  question: "P is 50% more efficient than Q. Working together, they complete a job in 18 days. How long would Q alone take?",
  options: ["40 days", "45 days", "50 days", "54 days"],
  answer: 1,
  explanation: "If Q's rate is 2 units per day, P's rate is 3 units per day. Together they work at 5 units per day. In 18 days the total work is 90 units. Q alone would require 90/2=45 days."
},
{
  question: "A and B together do work in 12 days. B and C in 15 days. A and C in 20 days. All three together take?",
  options: ["8 days", "9 days", "10 days", "11 days"],
  answer: 2,
  explanation: "(A+B) = 1/12, (B+C) = 1/15, (A+C) = 1/20. Adding: 2(A+B+C) = 1/12+1/15+1/20 = 5/60+4/60+3/60 = 12/60 = 1/5. A+B+C = 1/10. Time = 10 days."
},
{
  question: "A does half the work B does in 3/4 of the time. Together they finish in 18 days. B alone takes?",
  options: ["28 days", "30 days", "32 days", "35 days"],
  answer: 1,
  explanation: "Let B do work w in time t. A does w/2 in 3t/4. A's rate = (w/2)/(3t/4) = 2w/3t. B's rate = w/t. Ratio A:B = 2/3:1 = 2:3. Together rate = 5 units. Total = 5×18 = 90. B's rate = 3, so B alone = 90/3 = 30 days."
},
{
  question: "10 men, 15 women, or 20 boys can each complete a job in 100 days. How long will 2 men, 5 women, and 4 boys take together?",
  options: ["125 days", "1500/11 days", "140 days", "150 days"],
  answer: 1,
  explanation: "Let one man's rate be 6 units, one woman's 4 units and one boy's 3 units. The total work is 10×6×100=6000 units. The combined daily rate of 2 men, 5 women and 4 boys is 2×6+5×4+4×3=44 units. Time = 6000/44 = 1500/11 days, approximately 136.36 days."
},
{
  question: "A pipe fills tank in 12 hours, another empties in 18 hours. Both open, tank fills in?",
  options: ["32 hours", "34 hours", "36 hours", "38 hours"],
  answer: 2,
  explanation: "Fill rate = 1/12, empty = 1/18. Net = 1/12-1/18 = 1/36. Time = 36 hours."
},
{
  question: "Two pipes fill in 15 and 20 hours. Third empties in 30 hours. All three open, time to fill?",
  options: ["10 hours", "11 hours", "12 hours", "13 hours"],
  answer: 2,
  explanation: "Rates: 1/15, 1/20, -1/30. Net = 1/15+1/20-1/30 = 4/60+3/60-2/60 = 5/60 = 1/12. Time = 12 hours."
},
{
  question: "A tap fills in 8 hours. Due to leak, it takes 12 hours. Leak alone empties in?",
  options: ["20 hours", "22 hours", "24 hours", "26 hours"],
  answer: 2,
  explanation: "Tap rate = 1/8. With leak = 1/12. Leak rate = 1/8-1/12 = 1/24. Leak empties in 24 hours."
},
{
  question: "Pipe A fills in 10 hours, B in 15 hours. Both open for 4 hours, then A closes. Time to finish?",
  options: ["4 hours", "5 hours", "6 hours", "7 hours"],
  answer: 1,
  explanation: "Together rate = 1/10+1/15 = 1/6. In 4 hours: 4/6 = 2/3 filled. Remaining = 1/3. B alone: (1/3)/(1/15) = 5 hours."
},
{
  question: "Three pipes A, B, and C can fill a tank in 6, 8, and 12 hours respectively. All three are opened for 2 hours, after which C is closed. How much additional time will A and B need to fill the tank?",
  options: ["6/7 hour", "1 hour", "8/7 hours", "3/2 hours"],
  answer: 0,
  explanation: "The combined rate of all three pipes is 1/6+1/8+1/12=3/8 tank per hour. In 2 hours they fill 3/4 of the tank, leaving 1/4. A and B together fill at 1/6+1/8=7/24 tank per hour. Therefore, the additional time is (1/4)/(7/24)=6/7 hour."
},
{
  question: "A cistern has two filling pipes that can fill it in 12 hours and 16 hours respectively, and one waste pipe. If all three pipes together fill the cistern in 48 hours, how long would the waste pipe alone take to empty it?",
  options: ["8 hours", "10 hours", "12 hours", "16 hours"],
  answer: 0,
  explanation: "The filling rates are 1/12 and 1/16. If the waste pipe's rate is 1/x, then 1/12+1/16-1/x=1/48. Since 1/12+1/16=7/48, we get 1/x=6/48=1/8. Therefore, the waste pipe empties the cistern in 8 hours."
},
{
  question: "Two pipes fill in 20 and 30 minutes. How long together?",
  options: ["10 min", "11 min", "12 min", "13 min"],
  answer: 2,
  explanation: "Together rate = 1/20+1/30 = 1/12. Time = 12 minutes."
},
{
  question: "A pipe fills 2/5 of tank in 12 hours. Time to fill completely?",
  options: ["28 hours", "29 hours", "30 hours", "31 hours"],
  answer: 2,
  explanation: "2/5 in 12 hours, so 1/5 in 6 hours. Full tank = 5×6 = 30 hours."
},
{
  question: "Pipe A is 3 times faster than B. Together they fill in 15 hours. A alone takes?",
  options: ["18 hours", "20 hours", "22 hours", "24 hours"],
  answer: 1,
  explanation: "Let B's rate = 1, A's = 3. Together = 4. Total = 4×15 = 60. A alone = 60/3 = 20 hours."
},
{
  question: "A pump fills in 4 hours. Due to leak, 5 hours. Leak empties in?",
  options: ["18 hours", "19 hours", "20 hours", "21 hours"],
  answer: 2,
  explanation: "Pump rate = 1/4. With leak = 1/5. Leak = 1/4-1/5 = 1/20. Leak empties in 20 hours."
},
{
  question: "If 3x + 2y = 14 and x - y = 3, find x + y.",
  options: ["4", "5", "6", "7"],
  answer: 1,
  explanation: "From x-y=3, x=y+3. Substituting gives 3(y+3)+2y=14, so 5y=5 and y=1. Therefore x=4 and x+y=5."
},
{
  question: "Solve: 2x + 3y = 12, 4x - y = 10. Find x.",
  options: ["2", "3", "4", "5"],
  answer: 1,
  explanation: "From second: y=4x-10. Substitute: 2x+3(4x-10)=12. 2x+12x-30=12. 14x=42, x=3."
},
{
  question: "If x + y = 10 and x² - y² = 40, find x - y.",
  options: ["3", "4", "5", "6"],
  answer: 1,
  explanation: "x²-y² = (x+y)(x-y). 40 = 10(x-y). x-y = 4."
},
{
  question: "Find x: 3(x - 2) + 4 = 2(x + 5).",
  options: ["9", "10", "11", "12"],
  answer: 3,
  explanation: "Expanding gives 3x-6+4=2x+10. Therefore, 3x-2=2x+10, so x=12."
},
{
  question: "Find x: 3(x - 2) + 4 = 2(x + 5).",
  options: ["9", "10", "11", "12"],
  answer: 3,
  explanation: "Expanding gives 3x-6+4=2x+10. Therefore, 3x-2=2x+10, so x=12."
},
{
  question: "Solve for y: 5y - 3 = 2y + 12.",
  options: ["4", "5", "6", "7"],
  answer: 1,
  explanation: "5y-2y = 12+3. 3y = 15. y = 5."
},
{
  question: "If 4a + 7 = 31, find 2a + 3.",
  options: ["13", "14", "15", "16"],
  answer: 2,
  explanation: "4a = 24, a = 6. 2a+3 = 12+3 = 15."
},
{
  question: "Find x: x/3 + x/4 = 14.",
  options: ["22", "23", "24", "25"],
  answer: 2,
  explanation: "4x/12 + 3x/12 = 14. 7x/12 = 14. 7x = 168. x = 24."
},
{
  question: "If 3x - 7 = 2x + 8, what is x/2?",
  options: ["7", "7.5", "8", "8.5"],
  answer: 1,
  explanation: "3x-2x = 8+7. x = 15. x/2 = 7.5."
},
{
  question: "Solve: 2(x+3) - 5 = 3(x-1).",
  options: ["3", "4", "5", "6"],
  answer: 1,
  explanation: "2x+6-5 = 3x-3. 2x+1 = 3x-3. x = 4."
},
{
  question: "Complete the sequence: 100, 97, 91, 82, 70, ?",
  options: ["55", "56", "57", "58"],
  answer: 0,
  explanation: "The successive differences are -3, -6, -9 and -12. The next difference is -15, so 70-15=55."
},
{
  question: "Find next: 2, 7, 17, 37, 77, ?",
  options: ["147", "157", "167", "177"],
  answer: 1,
  explanation: "Pattern: ×2+3. 2×2+3=7, 7×2+3=17, 17×2+3=37, 37×2+3=77, 77×2+3=157."
},
{
  question: "What comes next: 4, 11, 25, 53, 109, ?",
  options: ["215", "219", "221", "225"],
  answer: 2,
  explanation: "Each term is obtained by multiplying the previous term by 2 and adding 3: 4×2+3=11, 11×2+3=25, 25×2+3=53, and 53×2+3=109. Therefore, 109×2+3=221."
},
{
  question: "Complete: 5, 11, 23, 47, 95, 191, ?",
  options: ["381", "382", "383", "384"],
  answer: 2,
  explanation: "Pattern: ×2+1. 5×2+1=11, 11×2+1=23, etc. 191×2+1=383."
},
{
  question: "Find the next: 6, 13, 27, 55, 111, 223, ?",
  options: ["445", "446", "447", "448"],
  answer: 2,
  explanation: "Pattern: ×2+1. 6×2+1=13, 13×2+1=27, etc. 223×2+1=447."
},
{
  question: "What is next: 7, 15, 31, 63, 127, ?",
  options: ["253", "254", "255", "256"],
  answer: 2,
  explanation: "Pattern: 2ⁿ-1. 2³-1=7, 2⁴-1=15, 2⁵-1=31, 2⁶-1=63, 2⁷-1=127, 2⁸-1=255."
},
{
  question: "Complete: 8, 17, 35, 71, 143, 287, ?",
  options: ["573", "574", "575", "576"],
  answer: 2,
  explanation: "Pattern: ×2+1. 8×2+1=17, 17×2+1=35, etc. 287×2+1=575."
},
{
  question: "Find next: 9, 19, 39, 79, 159, ?",
  options: ["317", "318", "319", "320"],
  answer: 2,
  explanation: "Pattern: ×2+1. 9×2+1=19, 19×2+1=39, etc. 159×2+1=319."
},
{
  question: "What comes next: 10, 21, 43, 87, 175, ?",
  options: ["349", "350", "351", "352"],
  answer: 2,
  explanation: "Pattern: ×2+1. 10×2+1=21, 21×2+1=43, etc. 175×2+1=351."
},
{
  question: "Complete: 1, 3, 7, 15, 31, 63, 127, ?",
  options: ["254", "255", "256", "257"],
  answer: 1,
  explanation: "Pattern: 2ⁿ-1. 2¹-1=1, 2²-1=3, 2³-1=7, etc. 2⁸-1=255."
},
];
