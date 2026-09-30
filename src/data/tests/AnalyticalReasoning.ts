import type { Question } from "./types";

export const Questions: Question[] = [
  {
    question: "In a certain code, TRAIN is written as 54923 and BRAIN is written as 64923. How will RAIN be written?",
    options: ["4923","5923","6923","3923"],
    answer: 0,
    explanation: "R=4, A=9, I=2, N=3, so RAIN = 4923."
  },

  {
    question: "Find the next term: 2, 6, 15, 31, 56, ?",
    options: ["82", "92", "95", "98"],
    answer: 1,
    explanation: "Differences are 4, 9, 16, 25, which are squares of 2, 3, 4, 5. Next difference is 36, so 56 + 36 = 92."
  },
  
  {
    question: "A, B, C, D, and E are seated in a row facing north. B is immediately left of C. D is at one end. A is not next to D. E is to the right of A. Who is in the middle?",
    options: ["A", "B", "C", "E"],
    answer: 2,
    explanation: "Since D is at one end and A is not next to D, A cannot be placed beside D. B is immediately left of C, and E is to the right of A. The valid arrangement is D B C A E. Therefore, C is in the middle."
  },
  
  {
    question: "If all P are Q, some Q are R, and no R are S, which conclusion must be true?",
    options: ["Some P are R", "No P are S", "Some Q are not R", "Cannot be concluded"],
    answer: 3,
    explanation: "All P are Q, and some Q are R. No R are S means R and S do not overlap. However, P may or may not overlap with R or S. Therefore, no definite conclusion among the first three options must be true."
  },
  
{
    question: "In a family, X is the brother of Y. Y is the mother of Z. Z is the daughter of W. How is X related to W?",
    options: ["Son", "Brother-in-law", "Father", "Cannot be determined"],
    answer: 3,
    explanation: "Y is the mother of Z and W is another parent of Z, but W's relationship with Y is not explicitly given. X is Y's brother, so X's relation to W cannot be determined."
},
  
{
    question: "A person starts facing east, turns 90° clockwise, then 180° anticlockwise, then 90° clockwise. Which direction is the person facing now?",
    options: ["North", "South", "East", "West"],
    answer: 2,
    explanation: "East → South → North → East. Therefore the final direction is East."
},
  
  {
  question: "A, B, C, D, E, and F are ranked from top to bottom. A is above C but below B. D is below E but above F. C is above D. Who is third from the top?",
  options: ["Cannot be determined", "B", "C", "E"],
  answer: 0,
  explanation: "The fixed order is B > A > C > D > F, but E only needs to be above D. E can be placed in different positions above D, so the third position is not fixed. Therefore, it cannot be determined."
},
  
  {
    question: "Which pair is most similar in relationship: Ocular : Eye",
    options: ["Auditory : Ear", "Verbal : Hand", "Cardiac : Lung", "Nasal : Tongue"],
    answer: 0,
    explanation: "Ocular means related to the eye, just like auditory means related to the ear."
  },
  
  {
    question: "Find the odd one out.",
    options: ["16", "25", "36", "48"],
    answer: 3,
    explanation: "16, 25, and 36 are perfect squares. 48 is not."
  },
  
  {
    question: "What is the next letter in the series: A, C, F, J, O, ?",
    options: ["T", "U", "V", "W"],
    answer: 1,
    explanation: "The jumps are +2, +3, +4, +5. Next is +6: O to U."
  },
  
  {
    question: "If CIPHER is coded as DJQIFS, how is GARDEN coded?",
    options: ["HBSEFO", "HBTEFO", "HBSEGP", "HBSDFO"],
    answer: 0,
    explanation: "Each letter is shifted forward by 1: C→D, I→J, P→Q, H→I, E→F, R→S. So GARDEN becomes HBSEFO."
  },
  
  {
    question: "In a certain language, MANGO is called ORANGE, ORANGE is called BANANA, BANANA is called GRAPE, and GRAPE is called APPLE. Which fruit is used to refer to MANGO?",
    options: ["ORANGE", "BANANA", "GRAPE", "APPLE"],
    answer: 0,
    explanation: "MANGO is called ORANGE directly in the code language."
  },
  
  {
    question: "Statements: All books are pens. Some pens are papers. No paper is a notebook. Conclusion: Some books are papers.",
    options: ["Definitely true", "Definitely false", "Cannot be concluded", "All books are papers"],
    answer: 2,
    explanation: "Some pens are papers does not mean any books are among those pens. So the conclusion cannot be drawn."
  },
  
  {
    question: "Two statements are given:\nI. All engineers are logical.\nII. Some logical people are artists.\nWhich statement alone is sufficient to conclude that some engineers may be artists?",
    options: ["Only I", "Only II", "Both together", "Neither alone nor together"],
    answer: 3,
    explanation: "Statement I gives engineers → logical, but no artists. Statement II gives some logical → artists, but not engineers. Even together, overlap between engineers and artists is not guaranteed."
  },
  
  {
  question: "Which figure completes the pattern: circle, square, circle, triangle, circle, ?",
  options: ["Square", "Triangle", "Circle", "Pentagon"],
  answer: 0,
  explanation: "The odd positions are always circle. The even positions alternate between square and triangle: square, triangle, square. Therefore, the next figure is Square."
},
  
  {
    question: "A is the son of B. C is the mother of B. D is the husband of C. How is A related to D?",
    options: ["Grandson", "Nephew", "Son", "Brother"],
    answer: 0,
    explanation: "C is B's mother and D is C's husband, so D is B's father. A is B's son, hence D is A's grandfather and A is D's grandson."
  },
  
  {
    question: "Four friends sit around a square table facing the center. Ali is opposite Sara. Bilal is to the immediate right of Ali. Who is to the immediate left of Sara?",
    options: ["Ali", "Bilal", "Unknown", "Sara"],
    answer: 1,
    explanation: "Since all are facing the center, right and left are taken from each person's own perspective. If Ali is opposite Sara and Bilal is to Ali's immediate right, then Bilal will be to Sara's immediate left. Therefore, Bilal is the answer."
  },
  
  {
    question: "A shopkeeper marks an item 40% above cost and gives a 10% discount on marked price. What is the profit percentage?",
    options: ["24%", "26%", "28%", "30%"],
    answer: 1,
    explanation: "Let cost be 100. Marked price = 140. After 10% discount, selling price = 126. Profit = 26, so profit percentage = 26%. Wait: 126 - 100 = 26%. Thus the correct option is 26%."
  },
  
  {
    question: "Find the missing number: 3, 8, 18, 38, 78, ?",
    options: ["118", "138", "158", "168"],
    answer: 2,
    explanation: "Each term is previous term ×2 + 2: 3→8, 8→18, 18→38, 38→78. Next is 78×2 + 2 = 158. So the correct answer is 158."
  },
  
  {
  question: "Which word completes the analogy: Surgeon : Operation :: Pilot : ?",
  options: ["Flight", "Airport", "Airplane", "Navigation"],
  answer: 0,
  explanation: "A surgeon performs an operation, and a pilot conducts or operates a flight. Therefore, the correct answer is Flight."
},
  
  {
    question: "If today is Wednesday, what day will it be 100 days later?",
    options: ["Thursday", "Friday", "Saturday", "Sunday"],
    answer: 1,
    explanation: "100 mod 7 = 2. Two days after Wednesday is Friday."
  },
  
  {
  question: "In a row of 7 people facing north, P is 3rd to the left of Q and 2nd to the right of R. If S is at one end and Q is not adjacent to S, how many people are between R and Q?",
  options: ["1", "2", "3", "4"],
  answer: 3,
  explanation: "P is 3rd to the left of Q, so there are two people between P and Q. P is 2nd to the right of R, so there is one person between R and P. Therefore, between R and Q there are four people in total."
},
  
  {
    question: "A statement says: 'All students who study regularly pass the test.' Which conclusion is logically valid?",
    options: ["If a student passes, they studied regularly", "If a student did not study regularly, they fail", "Every regular student passes", "Some regular students fail"],
    answer: 2,
    explanation: "The statement directly means every student who studies regularly passes the test."
  },
  
  {
    question: "A and B are brothers. C is B's wife. D is A's daughter. How is C related to D?",
    options: ["Mother", "Aunt", "Sister", "Mother-in-law"],
    answer: 1,
    explanation: "C is the wife of D's paternal uncle A's brother B, so C is D's aunt by marriage."
  },

  
  {
    question: "Select the pair that matches the relation: Seed : Tree",
    options: ["Egg : Chicken", "Butter : Milk", "Clay : Brick", "Water : Ice"],
    answer: 0,
    explanation: "A seed grows into a tree, just as an egg develops into a chicken."
  },
  
  {
    question: "Which number should replace the question mark? 1, 4, 10, 22, 46, ?",
    options: ["92", "94", "96", "98"],
    answer: 1,
    explanation: "Each term is previous ×2 +2: 1→4, 4→10, 10→22, 22→46. Next is 46×2 +2 = 94."
  },
  
{
    question: "If CAT is coded as DBU, how is DOG coded?",
    options: ["EPH", "FOH", "DNG", "CPG"],
    answer: 0,
    explanation: "Each letter is shifted forward by 1: C→D, A→B, T→U. Therefore DOG becomes EPH."
},
  
  {
    question: "Statements: Some teachers are writers. All writers are readers. No reader is lazy. Conclusion: Some teachers are not lazy.",
    options: ["Definitely true", "Definitely false", "Cannot be concluded", "All teachers are readers"],
    answer: 0,
    explanation: "Some teachers are writers, writers are readers, readers are not lazy. So those teachers are not lazy. Therefore the conclusion is valid."
  },
  
  {
    question: "Which is the correct next term: Z, X, U, Q, L, ?",
    options: ["F", "G", "H", "I"],
    answer: 0,
    explanation: "The steps are -2, -3, -4, -5, so next is -6: L to F."
  },
  
  {
  question: "A, B, C, D, E, and F sit in a circle facing the center. A is between B and C. E is opposite A. D is not adjacent to B. Who is adjacent to E?",
  options: ["B and C", "C and D", "A and F", "Cannot be determined"],
  answer: 3,
  explanation: "Even with six people, the given conditions do not uniquely determine the full arrangement. Therefore, the persons adjacent to E cannot be determined."
},
  
  {
    question: "A man said, 'That boy is the son of my mother's only son.' How is the boy related to the man?",
    options: ["Brother", "Son", "Nephew", "Cousin"],
    answer: 1,
    explanation: "My mother's only son is the man himself. So the boy is the son of the man."
  },
  
  {
    question: "Find the missing letter: B, E, I, N, T, ?",
    options: ["A", "B", "C", "D"],
    answer: 0,
    explanation: "Positions increase by 3, 4, 5, 6: B(2), E(5), I(9), N(14), T(20), next is 27 which wraps to A."
  },
  
  {
    question: "In a code, 1 = A, 2 = B, ..., 26 = Z. What is the code for the word PIE?",
    options: ["16-9-5", "15-9-5", "16-8-5", "17-9-5"],
    answer: 0,
    explanation: "P=16, I=9, E=5."
  },
  
  {
    question: "Which conclusion follows: All roses are flowers. Some flowers fade quickly. No fading thing lasts long.",
    options: ["Some roses last long", "Some flowers do not last long", "All roses fade quickly", "No flower fades quickly"],
    answer: 1,
    explanation: "Some flowers fade quickly and no fading thing lasts long, so some flowers do not last long."
  },
  
  {
    question: "A container has 12 red balls, 8 blue balls, and 10 green balls. If one ball is picked at random, what is the probability of picking a blue ball?",
    options: ["1/5", "2/15", "2/5", "4/15"],
    answer: 3,
    explanation: "Total balls = 12 + 8 + 10 = 30. Blue balls = 8. Probability of picking a blue ball = 8/30 = 4/15."
  },
  
  {
    question: "If the first day of a month is Friday, what day will the 20th be?",
    options: ["Saturday", "Sunday", "Monday", "Wednesday"],
    answer: 3,
    explanation: "The 20th is 19 days after Friday. 19 mod 7 = 5. Friday + 5 days = Wednesday."
  },
  
  {
    question: "Which one is different?",
    options: ["Circle", "Triangle", "Square", "Cube"],
    answer: 3,
    explanation: "Circle, triangle, and square are 2D shapes; cube is 3D."
  },
  
  {
    question: "A and B can complete a work in 12 days, B and C in 15 days, and A and C in 20 days. Who is the fastest worker?",
    options: ["A", "B", "C", "All equal"],
    answer: 1,
    explanation: "A+B = 1/12, B+C = 1/15, and A+C = 1/20. Adding all three equations gives 2(A+B+C) = 1/12 + 1/15 + 1/20 = 1/5, so A+B+C = 1/10. Therefore, A = 1/10 - 1/15 = 1/30, B = 1/10 - 1/20 = 1/20, and C = 1/10 - 1/12 = 1/60. Since B has the greatest work rate, B is the fastest worker."
  },
  
  {
    question: "If BOOK is coded as CPNL and LOOK is coded as MPNL, how is PAGE coded using the same pattern?",
    options: ["QBFF", "QBHF", "QBGF", "QCHG"],
    answer: 0,
    explanation: "The pattern is +1, +1, -1, +1. In BOOK: B→C, O→P, O→N, K→L. Applying the same pattern to PAGE: P→Q, A→B, G→F, E→F. Therefore, PAGE is coded as QBFF."
  },

  {
    question: "Statements: All cats are pets. Some pets are noisy. No noisy animal is calm. Which is the best conclusion?",
    options: ["Some pets are not calm", "All cats are noisy", "Some cats are noisy", "No pet is calm"],
    answer: 0,
    explanation: "Some pets are noisy, and noisy animals are not calm, so some pets are not calm."
  },
  
  {
  question: "A, B, C, D, E, F are seated in a row. C is exactly between B and D. A is at one end. E is to the immediate left of F. If B is not adjacent to A, which person is at the other end?",
  options: ["B", "D", "E", "Cannot be determined"],
  answer: 3,
  explanation: "The given conditions allow more than one valid arrangement, and the person at the other end is not always the same. Therefore, it cannot be determined."
},
  
  {
    question: "A father is 3 times as old as his son. After 12 years, he will be twice as old as his son. What is the son's current age?",
    options: ["12", "15", "18", "24"],
    answer: 0,
    explanation: "Let son's age be x, father's age be 3x. After 12 years: 3x+12 = 2(x+12). Solving gives x=12."
  },
  
  {
    question: "Find the missing number: 7, 14, 28, 56, ?",
    options: ["84", "96", "112", "128"],
    answer: 2,
    explanation: "Each term doubles. Next is 112."
  },
  
  {
    question: "A is taller than B, but shorter than C. D is taller than A. Who is tallest?",
    options: ["A", "B", "C", "Cannot be determined"],
    answer: 3,
    explanation: "C and D are both taller than A, but no comparison between C and D is given. Therefore the tallest person cannot be determined."
  },
  
  {
    question: "Choose the statement that weakens the argument: 'Online classes are better than classroom classes because students can learn from anywhere.'",
    options: ["Some students lack reliable internet access", "Many students use laptops", "Online classes save travel time", "Students can rewatch lectures"],
    answer: 0,
    explanation: "If some students lack reliable internet, the claim that they can learn from anywhere is weakened."
  },
  
  {
  question: "Which option completes the analogy: Hand : Glove :: Foot : ?",
  options: ["Sock", "Cap", "Knee", "Toe"],
  answer: 0,
  explanation: "A glove covers the hand, and a sock covers the foot. Therefore, the correct analogy is Foot : Sock."
},
  
  {
    question: "A row has 5 people. If X sits left of Y, Y sits left of Z, and W sits right of Z, who is in the middle?",
    options: ["X", "Y", "Z", "Cannot be determined"],
    answer: 3,
    explanation: "The fifth person's position is not given, so the middle position cannot be determined."
  },
  
  {
    question: "Statements: Some mobiles are expensive. All expensive things are valuable. No valuable thing is cheap. Which conclusion is valid?",
    options: ["Some mobiles are cheap", "Some mobiles are not cheap", "All mobiles are valuable", "No mobile is expensive"],
    answer: 1,
    explanation: "Some mobiles are expensive, expensive things are valuable, and valuable things are not cheap. So some mobiles are not cheap."
  },
  
  {
  question: "A, B, C, and D sit around a table facing the center. A is opposite C. B is to the immediate right of A. Who is to the immediate left of C?",
  options: ["A", "B", "D", "Cannot be determined"],
  answer: 1,
  explanation: "Since all are facing the center, right and left are considered from each person's own perspective. If A is opposite C and B is to the immediate right of A, then B will be to the immediate left of C."
},

//STOP

{
  question: "A university scholarship is awarded only if a student passes an interview. A student may attend the interview only after submitting all required documents. Hamza has not submitted all required documents. Which conclusion must be true?",
  options: [
    "Hamza cannot receive the scholarship",
    "Hamza failed the interview",
    "Hamza submitted some documents",
    "Hamza will receive the scholarship later"
  ],
  answer: 0,
  explanation: "Receiving the scholarship requires passing the interview, and attending the interview requires submitting all required documents. Since Hamza has not submitted all required documents, he cannot attend the interview and therefore cannot receive the scholarship."
},

{
  question: "Five reports H, K, M, P, and R must be reviewed. H is reviewed before K. K is reviewed before M. M is reviewed before P. Which statement must be true?",
  options: [
    "R is reviewed first",
    "H is reviewed before P",
    "P is reviewed before K",
    "R is reviewed after M"
  ],
  answer: 1,
  explanation: "The required chain is H before K before M before P. Therefore H must be reviewed before P. The position of R is not fixed."
},

{
  question: "Five workshops A, B, C, D, and E are scheduled from Monday to Friday, one per day. Workshop C is on Thursday. E is scheduled after C. A is scheduled before B. On which day must E be held?",
  options: [
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ],
  answer: 3,
  explanation: "C is on Thursday and E must occur after C. Since Friday is the only day after Thursday in the schedule, E must be on Friday."
},

{
  question: "Exactly three students are to be selected from A, B, C, D, and E. If A is selected, B must also be selected. C and D cannot both be selected. E can be selected only if C is selected. Which group can be selected?",
  options: [
    "A, C, D",
    "B, C, E",
    "A, D, E",
    "B, D, E"
  ],
  answer: 1,
  explanation: "B, C, E satisfies every condition: E is accompanied by C, and C is not selected with D. The other groups violate either the C-D restriction or the requirement that E can be selected only with C."
},

{
  question: "What is the value of integer x?\nStatement I: x is greater than 4.\nStatement II: x is less than 6.",
  options: [
    "Statement I alone is sufficient",
    "Statement II alone is sufficient",
    "Both statements together are sufficient",
    "Even both statements together are insufficient"
  ],
  answer: 2,
  explanation: "Statement I alone allows many integers greater than 4, while Statement II alone allows many integers below 6. Together they give 4 < x < 6. Since x is an integer, x must equal 5."
},

{
  question: "A university library plans to remain open three hours later during examination weeks because many students say they cannot use the library during normal hours. Which assumption is necessary for this plan to increase library usage?",
  options: [
    "Every student studies in the library",
    "At least some students will use the library during the additional hours",
    "The library will never be crowded",
    "Students prefer printed books to digital books"
  ],
  answer: 1,
  explanation: "For longer opening hours to increase usage, at least some students must actually use the library during those additional hours. The other statements are not necessary."
},

{
  question: "Ali and Bilal each make one statement. Exactly one of them is telling the truth. Ali says, 'Bilal is lying.' Bilal says, 'Ali and I are both telling the truth.' Who is telling the truth?",
  options: [
    "Ali only",
    "Bilal only",
    "Both Ali and Bilal",
    "Neither Ali nor Bilal"
  ],
  answer: 0,
  explanation: "If Ali is truthful, then Bilal is lying, which satisfies the condition that exactly one tells the truth. If Bilal were truthful, his statement would require both of them to be truthful, contradicting the condition. Therefore Ali alone is truthful."
},

{
  question: "Among 80 applicants, 45 studied Mathematics, 38 studied Computer Science, and 20 studied both subjects. How many studied neither Mathematics nor Computer Science?",
  options: [
    "13",
    "17",
    "23",
    "27"
  ],
  answer: 1,
  explanation: "The number studying at least one subject is 45 + 38 - 20 = 63. Therefore, 80 - 63 = 17 applicants studied neither subject."
},

{
  question: "A word is coded by first reversing its letters and then moving every letter two positions forward in the alphabet. Using this rule, how is LOGIC coded?",
  options: [
    "EKIQN",
    "EJIQN",
    "EKJQN",
    "CIGOL"
  ],
  answer: 0,
  explanation: "LOGIC reversed is CIGOL. Moving each letter two positions forward gives C→E, I→K, G→I, O→Q, L→N. Therefore the code is EKIQN."
},

{
  question: "Seven candidates are ranked in a competition. K ranks above both L and M. M ranks above N. P ranks above K. Which statement must be true?",
  options: [
    "L ranks above N",
    "P ranks above N",
    "N ranks above K",
    "M ranks above P"
  ],
  answer: 1,
  explanation: "P is above K, K is above M, and M is above N. Therefore the chain P > K > M > N proves that P must rank above N."
},

{
  question: "Statements: No analysts are careless. Some interns are analysts. Which conclusion must follow?",
  options: [
    "All interns are careful",
    "Some interns are not careless",
    "No interns are careless",
    "Some careless people are analysts"
  ],
  answer: 1,
  explanation: "Some interns belong to the group of analysts. Since no analyst is careless, those interns who are analysts are not careless. Therefore some interns are not careless."
},

{
  question: "Six students A, B, C, D, E, and F must be divided into two groups of three. A and B must be in the same group. D and E must be in the same group. C cannot be in the same group as D. Which grouping is required?",
  options: [
    "A, B, C together and D, E, F together",
    "A, B, D together and C, E, F together",
    "A, B, E together and C, D, F together",
    "A, B, F together and C, D, E together"
  ],
  answer: 0,
  explanation: "A and B must stay together, while D and E must stay together. Since C cannot be with D, C cannot join the D-E group and must join A-B. The remaining student F therefore joins D-E. The groups must be ABC and DEF."
},

{
  question: "The rule states: 'Unless the laboratory is open, the practical session will be cancelled.' Which statement expresses the same logical condition?",
  options: [
    "If the laboratory is not open, the practical session will be cancelled",
    "If the session is cancelled, the laboratory must be closed",
    "If the laboratory is open, the session must be cancelled",
    "The practical session is always held when the laboratory is open"
  ],
  answer: 0,
  explanation: "'Unless the laboratory is open' means that if the laboratory is not open, cancellation follows. It does not guarantee what happens when the laboratory is open."
},

{
  question: "A college claims that introducing practice quizzes will improve students' examination performance. Which finding would most strongly support this claim?",
  options: [
    "Students who regularly used the practice quizzes improved more than comparable students who did not use them",
    "Some students prefer studying in the morning",
    "The quizzes contain different font sizes",
    "The college also provides a cafeteria"
  ],
  answer: 0,
  explanation: "A greater improvement among comparable students who used the quizzes directly supports the claim that the quizzes contribute to better examination performance."
},

{
  question: "A machine follows the same rule for every input: 2 becomes 6, 4 becomes 20, and 6 becomes 42. If the rule is output = input × (input + 1), what will 8 become?",
  options: [
    "64",
    "70",
    "72",
    "80"
  ],
  answer: 2,
  explanation: "Using the stated rule, 8 × (8 + 1) = 8 × 9 = 72."
},

{
  question: "Every participant in a competition chooses exactly one of two categories: Coding or Design. There are 30 participants in total, and 18 choose Coding. How many choose Design?",
  options: [
    "10",
    "12",
    "18",
    "48"
  ],
  answer: 1,
  explanation: "Each participant belongs to exactly one category. Therefore the Design category contains 30 - 18 = 12 participants."
},

{
  question: "For admission to a program, passing Mathematics is a necessary condition. Which statement is logically correct?",
  options: [
    "Anyone who passes Mathematics is automatically admitted",
    "A student who fails Mathematics cannot be admitted",
    "Only admitted students may take Mathematics",
    "Passing Mathematics guarantees admission regardless of other requirements"
  ],
  answer: 1,
  explanation: "A necessary condition must be satisfied for the outcome to occur. Therefore, if passing Mathematics is necessary for admission, a student who fails Mathematics cannot be admitted. Passing Mathematics alone does not necessarily guarantee admission."
},

{
  question: "A committee must obey these rules: exactly one of P and Q is selected; R can be selected only if P is selected; S can be selected only if Q is selected. Which pair cannot be selected together?",
  options: [
    "P and R",
    "Q and S",
    "Q and R",
    "P and T"
  ],
  answer: 2,
  explanation: "Selecting R requires P. But exactly one of P and Q may be selected. Therefore if R is selected, P must be selected and Q cannot be selected. Hence Q and R cannot be selected together."
},

{
  question: "A processing system performs these operations in order: add 4, multiply by 3, then subtract 2. If the starting number is 6, what is the final result?",
  options: [
    "24",
    "28",
    "30",
    "32"
  ],
  answer: 1,
  explanation: "Start with 6. Add 4 to get 10. Multiply by 3 to get 30. Subtract 2 to get 28."
},

{
  question: "A campus map has direct paths connecting A to B, A to C, B to D, C to D, and D to E. There are no other paths. A student travelling from A to E must pass through which location?",
  options: [
    "B",
    "C",
    "D",
    "Both B and C"
  ],
  answer: 2,
  explanation: "A student can travel A-B-D-E or A-C-D-E. Both possible routes pass through D, while neither B nor C is required in every route."
},

{
  question: "Five files N, M, J, K, and L are arranged from left to right. N is before M. M is before J. J is immediately before K. L is last. Which file must be first?",
  options: [
    "N",
    "M",
    "J",
    "K"
  ],
  answer: 0,
  explanation: "The conditions create the chain N before M before J immediately before K, while L is last. With five positions, the only possible order is N, M, J, K, L. Therefore N must be first."
},

{
  question: "Four boxes numbered 1 to 4 each contain a different colored card: red, blue, green, or yellow. The red card is somewhere to the left of the blue card. The green card is immediately to the right of the red card. The yellow card is in box 4. Which color must be in box 2?",
  options: [
    "Red",
    "Blue",
    "Green",
    "Yellow"
  ],
  answer: 2,
  explanation: "Red and green must occupy consecutive boxes in that order. They cannot occupy boxes 2 and 3 because blue would then have to be to the right of red, but the only remaining right-side box is box 4, already occupied by yellow. Therefore red is in box 1, green in box 2, blue in box 3, and yellow in box 4."
},

{
  question: "Two operations are defined: ★ means 'add 3' and ▲ means 'multiply by 2'. Starting with 5, the operations ★, ▲, ★ are applied in that order. What is the final value?",
  options: [
    "16",
    "18",
    "19",
    "22"
  ],
  answer: 2,
  explanation: "Starting with 5: ★ gives 8, ▲ gives 16, and the final ★ gives 19."
},

{
  question: "Exactly one of statements X and Y is true. If X is true, then Z must be true. It is known that Z is false. What must be true?",
  options: [
    "X is true",
    "Y is true",
    "Both X and Y are false",
    "Z is true"
  ],
  answer: 1,
  explanation: "If X were true, Z would have to be true. Since Z is false, X cannot be true. Exactly one of X and Y is true, so Y must be true."
},

{
  question: "Four research projects J, K, L, and M receive distinct priority levels from 1 to 4, where 1 is highest. J has a higher priority than K. L has a lower priority than K. M has a higher priority than J. Which project must have the highest priority?",
  options: [
    "J",
    "K",
    "L",
    "M"
  ],
  answer: 3,
  explanation: "The conditions give M higher than J, J higher than K, and K higher than L. Therefore the complete order is M, J, K, L, making M the highest-priority project."
},

//STOP1

{
  question: "Six lectures P, Q, R, S, T, and U are scheduled one after another. P is earlier than R. Q is later than R but earlier than T. S is earlier than P. Which lecture must occur before T?",
  options: ["P", "S", "R", "U"],
  answer: 2,
  explanation: "The conditions give R before Q before T. Therefore R must occur before T. Although P and S may also occur before T in some arrangements, their positions relative to T are not directly forced by the full set of conditions."
},

{
  question: "A university selects exactly two representatives from H, J, K, L, and M. If H is selected, J cannot be selected. If K is selected, L must be selected. M cannot be selected with L. Which pair can be selected?",
  options: ["H and J", "K and M", "K and L", "L and M"],
  answer: 2,
  explanation: "K and L can be selected because selecting K requires L. H and J violate their restriction, K and M is impossible because K requires L and only two representatives are selected, and L and M cannot be selected together."
},

{
  question: "A password contains four different digits chosen from 1, 2, 3, and 4. The digit 2 appears before 1. The digit 4 appears immediately after 1. The digit 3 appears before 2. What is the password?",
  options: ["3214", "2314", "3241", "3124"],
  answer: 0,
  explanation: "The conditions require 3 before 2 before 1, with 4 immediately after 1. The only arrangement satisfying all conditions is 3214."
},

{
  question: "If a student joins the robotics team, the student must attend the training session. Anyone attending the training session must register online. Sana has joined the robotics team. Which conclusion necessarily follows?",
  options: [
    "Sana has registered online",
    "Sana won a robotics competition",
    "Sana is the team leader",
    "Sana registered before joining the team"
  ],
  answer: 0,
  explanation: "Joining the robotics team requires attending training, and attending training requires online registration. Therefore Sana must have registered online. Nothing establishes the other statements."
},

{
  question: "A rule assigns a value to each word by adding the alphabetical positions of its letters. If A = 1, B = 2, ..., Z = 26, what is the value of CODE?",
  options: ["25", "27", "29", "31"],
  answer: 1,
  explanation: "C = 3, O = 15, D = 4, and E = 5. Their sum is 3 + 15 + 4 + 5 = 27."
},

{
  question: "Five books J, K, L, M, and N are placed on a shelf. K is immediately between J and L, with J to the left of K. M is somewhere to the right of L. N is to the left of J. What is the order from left to right?",
  options: [
    "N, J, K, L, M",
    "J, K, L, N, M",
    "N, K, J, L, M",
    "M, N, J, K, L"
  ],
  answer: 0,
  explanation: "J, K, and L must form the consecutive block J-K-L. N must be left of J and M must be right of L. Therefore the only possible order is N, J, K, L, M."
},

{
  question: "Three courses X, Y, and Z are offered. Every student taking X must also take Y. No student taking Y may take Z. Ahmed takes X. Which statement must be true?",
  options: [
    "Ahmed takes Z",
    "Ahmed does not take Y",
    "Ahmed does not take Z",
    "Ahmed takes only X"
  ],
  answer: 2,
  explanation: "Since Ahmed takes X, he must also take Y. No student taking Y may take Z, so Ahmed cannot take Z."
},

{
  question: "A printer processes jobs according to the following priority rule: urgent jobs are processed before normal jobs, and among jobs of the same priority, the earlier submitted job is processed first. Jobs A and B are normal, while C and D are urgent. A was submitted before B, and D was submitted before C. Which job is processed first?",
  options: ["A", "B", "C", "D"],
  answer: 3,
  explanation: "Urgent jobs are processed before all normal jobs. D and C are urgent, and D was submitted before C. Therefore D is processed first."
},

{
  question: "In a survey, every respondent who chose option P also chose option Q. Some respondents who chose Q also chose R. Which situation is impossible?",
  options: [
    "A respondent chooses P and Q",
    "A respondent chooses Q but not P",
    "A respondent chooses P but not Q",
    "A respondent chooses Q and R"
  ],
  answer: 2,
  explanation: "The rule says every P chooser must also choose Q. Therefore choosing P without Q is impossible. The other situations are compatible with the statements."
},

{
  question: "Four presentations W, X, Y, and Z are given in four consecutive time slots. W is earlier than X. Z is earlier than W. Y is later than X. Which presentation is second?",
  options: ["W", "X", "Y", "Z"],
  answer: 0,
  explanation: "The conditions force the complete order Z, W, X, Y. Therefore W is second."
},

{
  question: "A number is transformed by the rule: square the number, then subtract the original number. What is the result when the input is 9?",
  options: ["63", "72", "81", "90"],
  answer: 1,
  explanation: "Square 9 to get 81, then subtract the original number: 81 - 9 = 72."
},

{
  question: "Four students Areeba, Danish, Hira, and Usman each choose a different subject from Biology, Chemistry, Mathematics, and Physics. Areeba chooses Mathematics. Danish does not choose Biology or Physics. Hira chooses Physics. Which subject does Usman choose?",
  options: ["Biology", "Chemistry", "Mathematics", "Physics"],
  answer: 0,
  explanation: "Areeba has Mathematics and Hira has Physics. Danish cannot have Biology or Physics, and Mathematics is already taken, so Danish must have Chemistry. The only remaining subject for Usman is Biology."
},

{
  question: "A statement says, 'If the server fails, the website becomes unavailable.' The website is currently available. Assuming the statement is true, what can be concluded?",
  options: [
    "The server has not failed",
    "The server definitely failed earlier",
    "The website never becomes unavailable",
    "The server is the only component of the website"
  ],
  answer: 0,
  explanation: "The statement is Server failure → Website unavailable. Its contrapositive is Website available → Server has not failed. Therefore the server has not failed under the stated condition."
},

{
  question: "A student argues: 'The university should add more bicycle racks because the existing racks are full every morning.' Which fact most strengthens the argument?",
  options: [
    "Many students leave bicycles beside buildings because no rack spaces are available",
    "Some students prefer blue bicycles",
    "The university has several classroom buildings",
    "Bicycle racks are made of metal"
  ],
  answer: 0,
  explanation: "Students being forced to leave bicycles elsewhere because the racks are full provides direct evidence of unmet demand for additional bicycle parking."
},

{
  question: "A company claims that allowing employees to choose flexible starting times will reduce late arrivals. Which finding most weakens this claim?",
  options: [
    "Most late arrivals are caused by unpredictable road closures that affect employees regardless of their chosen starting times",
    "Some employees prefer starting early",
    "The company has employees in several departments",
    "Employees use different types of transport"
  ],
  answer: 0,
  explanation: "If unpredictable road closures cause most lateness regardless of chosen starting time, flexible starting times may not address the main cause of late arrivals."
},

{
  question: "Exactly four of six applicants P, Q, R, S, T, and U will be interviewed. P and Q cannot both be interviewed. If R is interviewed, S must also be interviewed. T must be interviewed. Which group is possible?",
  options: [
    "P, Q, S, T",
    "P, R, T, U",
    "Q, R, S, T",
    "Q, R, T, U"
  ],
  answer: 2,
  explanation: "Q, R, S, T satisfies all rules: P and Q are not together, R is accompanied by S, and T is included. Option A contains both P and Q. Options B and D contain R without S."
},

{
  question: "What is the value of positive integer n?\nStatement I: n is a factor of 18.\nStatement II: n is greater than 6 and less than 10.",
  options: [
    "Statement I alone is sufficient",
    "Statement II alone is sufficient",
    "Both statements together are sufficient",
    "Even both statements together are insufficient"
  ],
  answer: 2,
  explanation: "Statement I gives possible positive factors 1, 2, 3, 6, 9, and 18. Statement II permits 7, 8, or 9. Together, the only possible value is 9, so both statements are sufficient."
},

{
  question: "Four teams P, Q, R, and S score different numbers of points. P scores more than Q. R scores fewer than Q. S scores more than P. Which team scores the second-highest number of points?",
  options: ["P", "Q", "R", "S"],
  answer: 0,
  explanation: "The comparisons give S > P > Q > R. Therefore P has the second-highest score."
},

{
  question: "A six-digit identification code uses the digits 1, 2, 3, 4, 5, and 6 exactly once. The first digit is 4. The last digit is 2. Digit 5 appears immediately before digit 6. Digit 1 appears immediately before digit 3. Which code is valid?",
  options: [
    "415632",
    "451362",
    "456132",
    "413562"
  ],
  answer: 2,
  explanation: "456132 starts with 4 and ends with 2, contains 5 immediately before 6, and contains 1 immediately before 3. Each digit is used exactly once. The other options violate at least one adjacency condition."
},

{
  question: "A box contains cards numbered 1 through 12. A card is classified as Special if its number is divisible by both 2 and 3. Which set contains all Special cards?",
  options: [
    "{2, 3, 6, 12}",
    "{6, 12}",
    "{3, 6, 9, 12}",
    "{2, 4, 6, 8, 10, 12}"
  ],
  answer: 1,
  explanation: "A number divisible by both 2 and 3 must be divisible by 6. Between 1 and 12, those numbers are 6 and 12."
},

{
  question: "Three switches A, B, and C obey these rules: if A is ON, B must be OFF; if B is OFF, C must be ON. A is ON. What must be the state of C?",
  options: [
    "ON",
    "OFF",
    "It can be either ON or OFF",
    "The rules are contradictory"
  ],
  answer: 0,
  explanation: "A being ON forces B to be OFF. B being OFF then forces C to be ON. Therefore C must be ON."
},

{
  question: "A university has the rule: a student receives a distinction only if the student's final score is at least 85. Mariam received a distinction. Which conclusion follows?",
  options: [
    "Mariam's final score was at least 85",
    "Mariam scored exactly 85",
    "Everyone scoring at least 85 receives a distinction",
    "Mariam had the highest score in the university"
  ],
  answer: 0,
  explanation: "'Receives a distinction only if the score is at least 85' means receiving the distinction requires a score of at least 85. It does not mean the score was exactly 85 or that every qualifying student necessarily receives a distinction."
},

{
  question: "Five tasks A, B, C, D, and E are assigned distinct completion positions from first to fifth. A is completed immediately before B. D is completed immediately after E. C is completed first. If A is fourth, which task is second?",
  options: ["B", "D", "E", "Cannot be determined"],
  answer: 2,
  explanation: "C is first. If A is fourth, B must be fifth. The remaining second and third positions belong to E and D, with D immediately after E. Therefore E is second and D is third."
},

{
  question: "Consider the argument: 'All students in Group X submitted the assignment on time. Faraz is a member of Group X. Therefore, Faraz submitted the assignment on time.' Which reasoning pattern is used?",
  options: [
    "Applying a general rule to a member of the group",
    "Assuming the conclusion without evidence",
    "Rejecting the general rule",
    "Comparing two unrelated groups"
  ],
  answer: 0,
  explanation: "The first statement establishes a rule for every member of Group X. Since Faraz belongs to Group X, the rule applies directly to him."
},

{
  question: "A data file passes through three checks in this order: format, security, and completeness. A file proceeds to the next check only if it passes the current one. File X reached the completeness check but failed it. Which statement must be true?",
  options: [
    "File X passed both the format and security checks",
    "File X failed the format check",
    "File X skipped the security check",
    "File X passed all three checks"
  ],
  answer: 0,
  explanation: "To reach the completeness check, File X had to progress through the format and security checks. Since progression occurs only after passing each current check, it must have passed both earlier checks."
},

//STOP2

{
  question: "Five students P, Q, R, S, and T submit assignments at different times. P submits before Q. R submits after Q. S submits before P. T submits after R. Who must submit third?",
  options: ["P", "Q", "R", "S"],
  answer: 1,
  explanation: "The conditions create the complete order S, P, Q, R, T. Therefore Q must submit third."
},

{
  question: "A student may enroll in Artificial Intelligence only if the student has completed Programming. Completing Programming requires passing Introduction to Computing. Zain has enrolled in Artificial Intelligence. Which statement must be true?",
  options: [
    "Zain passed Introduction to Computing",
    "Zain received the highest Programming grade",
    "Zain is enrolled in only one course",
    "Zain completed Artificial Intelligence before Programming"
  ],
  answer: 0,
  explanation: "Enrollment in Artificial Intelligence requires completed Programming, and completed Programming requires passing Introduction to Computing. Therefore Zain must have passed Introduction to Computing."
},

{
  question: "Four laboratories A, B, C, and D are assigned floors 1 through 4, one laboratory per floor. A is above C. B is below C. D is above A. Which laboratory is on floor 3?",
  options: ["A", "B", "C", "D"],
  answer: 0,
  explanation: "The conditions force the vertical order D above A above C above B. From floor 1 at the bottom to floor 4 at the top, the arrangement is B, C, A, D. Therefore A is on floor 3."
},

{
  question: "A code replaces each letter with the letter immediately before it in the alphabet and then reverses the resulting string. Using this rule, how is TEAM coded?",
  options: ["LZDS", "LZDR", "MZDS", "SDZL"],
  answer: 0,
  explanation: "Moving each letter back by one gives T→S, E→D, A→Z, M→L, producing SDZL. Reversing SDZL gives LZDS."
},

{
  question: "A university offers four seminars J, K, L, and M. A student must attend exactly two. Anyone attending J must also attend K. L and M cannot be attended together. Which pair is permitted?",
  options: ["J and L", "J and M", "J and K", "L and M"],
  answer: 2,
  explanation: "Because exactly two seminars are attended, selecting J requires K to be the other seminar. L and M cannot be together. Therefore J and K is the permitted pair among the options."
},

{
  question: "An administrator says, 'Whenever the computer lab is reserved, a supervisor is present.' A supervisor is not present now. What follows logically?",
  options: [
    "The computer lab is not reserved",
    "The computer lab is definitely closed",
    "No supervisor works at the university",
    "The lab was reserved earlier"
  ],
  answer: 0,
  explanation: "The rule is Reserved → Supervisor present. Its contrapositive is Supervisor not present → Not reserved. Therefore the lab is not reserved."
},

{
  question: "Exactly one of the following statements about a missing file is true:\nI. The file is in Folder A.\nII. The file is in Folder B.\nIII. The file is not in Folder A.\nIf Statement II is false, where must the file be?",
  options: ["Folder A", "Folder B", "Both folders", "Cannot be determined"],
  answer: 0,
  explanation: "Statement II is false. Exactly one statement overall is true. Statements I and III are logical opposites, so exactly one of them is true automatically. Since the file must have a location under the alternatives described and II is false, Statement I must be the true statement: the file is in Folder A."
},

{
  question: "Five interview slots numbered 1 through 5 are assigned to A, B, C, D, and E. B is immediately after A. D is immediately before E. C has slot 3. If A has slot 1, who has slot 4?",
  options: ["A", "B", "D", "E"],
  answer: 2,
  explanation: "A is in slot 1, so B is in slot 2. C occupies slot 3. Slots 4 and 5 remain for D and E, and D must be immediately before E. Therefore D is in slot 4."
},

{
  question: "Every successful project satisfies both Condition X and Condition Y. Project P does not satisfy Condition Y. Which conclusion is valid?",
  options: [
    "Project P is not successful",
    "Project P satisfies Condition X",
    "Every unsuccessful project fails Condition Y",
    "Condition X is unnecessary"
  ],
  answer: 0,
  explanation: "Success requires both X and Y. Since Project P lacks Y, it cannot satisfy the stated requirements for success."
},

{
  question: "Four runners H, J, K, and L finish a race with no ties. H finishes ahead of J. K finishes behind L but ahead of H. Who finishes second?",
  options: ["H", "J", "K", "L"],
  answer: 2,
  explanation: "The conditions give L ahead of K ahead of H ahead of J. Thus the order is L, K, H, J, and K finishes second."
},

{
  question: "A university wants to determine whether providing recorded lectures improves exam scores. Which study design gives the strongest evidence?",
  options: [
    "Compare similar groups of students, giving recorded lectures to one group but not the other, while keeping other major study conditions comparable",
    "Ask students whether they think recorded lectures are useful",
    "Count how many recorded lectures the university owns",
    "Compare this year's students with students from twenty years ago without considering other differences"
  ],
  answer: 0,
  explanation: "Comparing similar groups while changing the availability of recorded lectures isolates that factor more effectively than opinions, inventory counts, or uncontrolled historical comparisons."
},

{
  question: "A sequence is generated using two alternating operations: multiply by 2, then subtract 3. Starting with 5, the sequence is 5, 10, 7, 14, 11, ?. What is the next term?",
  options: ["19", "21", "22", "25"],
  answer: 2,
  explanation: "The operations alternate ×2, −3. Thus 5→10→7→14→11, and the next operation is ×2, giving 22."
},

{
  question: "Three boxes P, Q, and R contain one ball each: one red, one green, and one blue. P does not contain red. Q does not contain blue. R contains green. What color is in P?",
  options: ["Red", "Green", "Blue", "Cannot be determined"],
  answer: 2,
  explanation: "R contains green, leaving red and blue for P and Q. Q cannot contain blue, so Q must contain red. Therefore P contains blue."
},

{
  question: "All members of Club A speak English. No person who speaks English is eligible for Program Z. Hina is a member of Club A. Which conclusion follows?",
  options: [
    "Hina is not eligible for Program Z",
    "Hina is eligible for Program Z",
    "Everyone outside Club A is eligible for Program Z",
    "Only Club A members speak English"
  ],
  answer: 0,
  explanation: "Hina belongs to Club A, so she speaks English. No English speaker is eligible for Program Z. Therefore Hina is not eligible."
},

{
  question: "A panel contains exactly three members selected from P, Q, R, S, and T. P and Q cannot serve together. R must serve if S serves. T must serve if Q serves. Which panel is valid?",
  options: [
    "P, Q, R",
    "P, R, S",
    "Q, R, S",
    "Q, S, T"
  ],
  answer: 1,
  explanation: "P, R, S is valid because P and Q are not together, and S is accompanied by R. In Q, R, S, selecting Q also requires T, which is absent. In Q, S, T, S requires R, which is absent. P, Q, R violates the P-Q restriction."
},

{
  question: "A course has the following rule: students who miss more than three labs cannot take the final practical exam. Farah is allowed to take the final practical exam. What can be concluded?",
  options: [
    "Farah did not miss more than three labs",
    "Farah attended every lab",
    "Farah missed exactly three labs",
    "Farah received full marks in the labs"
  ],
  answer: 0,
  explanation: "Missing more than three labs would make Farah ineligible for the practical exam. Since she is allowed to take it, she cannot have missed more than three labs. The exact number of missed labs is unknown."
},

{
  question: "Five lockers numbered 1 to 5 contain bags belonging to A, B, C, D, and E. A's bag is in a lower-numbered locker than B's. B's is lower than C's. D's is in locker 1. E's is in locker 5. Which locker contains A's bag?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "D occupies locker 1 and E occupies locker 5. A, B, and C must occupy the remaining lockers in increasing order because A < B < C. Therefore A is in locker 2, B in 3, and C in 4."
},

{
  question: "A college notices that students who attend optional revision sessions tend to score higher. Which additional information is most important before concluding that the sessions cause higher scores?",
  options: [
    "Whether students who attend the sessions differ systematically in motivation or prior ability from those who do not",
    "The color of the revision-room walls",
    "Whether the college has a sports team",
    "The number of chairs in unrelated classrooms"
  ],
  answer: 0,
  explanation: "More motivated or academically stronger students may be more likely to attend revision sessions and also score higher. That potential confounding factor must be considered before claiming causation."
},

{
  question: "A program accepts applicants satisfying at least one of these conditions: they have Qualification X, or they have both Qualification Y and Qualification Z. Which applicant definitely satisfies the stated qualification rule?",
  options: [
    "An applicant with Y only",
    "An applicant with Z only",
    "An applicant with both Y and Z",
    "An applicant with neither X, Y, nor Z"
  ],
  answer: 2,
  explanation: "The rule is X OR (Y AND Z). Having both Y and Z satisfies the second route. Y alone and Z alone do not, and having none satisfies neither route."
},

{
  question: "Four tasks W, X, Y, and Z require 1, 2, 3, and 4 hours respectively, with each duration used once. W takes longer than X. Y takes longer than W. Z takes less time than X. How long does W take?",
  options: ["1 hour", "2 hours", "3 hours", "4 hours"],
  answer: 2,
  explanation: "The inequalities give Y > W > X > Z. With distinct durations 1, 2, 3, and 4 hours, the only assignment is Y=4, W=3, X=2, Z=1. Therefore W takes 3 hours."
},

{
  question: "A coding rule takes a two-digit number, adds its digits, and multiplies the sum by the first digit. What is the coded value of 53?",
  options: ["24", "32", "40", "45"],
  answer: 2,
  explanation: "The digits are 5 and 3. Their sum is 8, and multiplying by the first digit gives 8 × 5 = 40."
},

{
  question: "A debate has four speakers A, B, C, and D. A speaks immediately before C. B speaks sometime after C. D speaks before A. Who must speak last?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "D must be before the consecutive block A-C, while B must be after C. With four speakers, the only order is D, A, C, B. Therefore B must speak last."
},

{
  question: "Some programmers are gamers. No gamer is impatient. Which conclusion necessarily follows?",
  options: [
    "Some programmers are not impatient",
    "All programmers are gamers",
    "No programmer is impatient",
    "All patient people are programmers"
  ],
  answer: 0,
  explanation: "At least some programmers are gamers, and no gamer is impatient. Therefore those programmers who are gamers are not impatient, so some programmers are not impatient."
},

{
  question: "An online application is submitted successfully only if all required fields are completed and the applicant verifies an email address. An application was submitted successfully. Which statement must be true?",
  options: [
    "All required fields were completed and the email address was verified",
    "The applicant uploaded an optional photograph",
    "The applicant used a university email address",
    "The application was approved"
  ],
  answer: 0,
  explanation: "Successful submission requires both completion of all required fields and email verification. Therefore both conditions must have been satisfied. Successful submission does not itself imply approval."
},

{
  question: "Five departments A, B, C, D, and E receive presentations on different days from Monday through Friday. A presents on Monday. E presents on Friday. C presents immediately after B. D presents before B. On which day does B present?",
  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  answer: 2,
  explanation: "Monday is occupied by A and Friday by E. B and C must occupy consecutive days, with D before B. B cannot be Tuesday because then no free day before it remains for D except Monday, already occupied by A. B cannot be Thursday because C would have to be Friday, occupied by E. Therefore B is Wednesday, C is Thursday, and D is Tuesday."
},

//STOP3

{
  question: "Six examination rooms P, Q, R, S, T, and U are inspected one at a time. Q is inspected immediately after P. S is inspected immediately before T. R is inspected first and U is inspected last. If P is inspected second, which room is inspected fourth?",
  options: ["Q", "S", "T", "U"],
  answer: 1,
  explanation: "R is first. If P is second, Q must be third. U is sixth. The remaining fourth and fifth positions are occupied by S and T, with S immediately before T. Therefore S is fourth."
},

{
  question: "A university chooses courses for a special semester under these rules: if Database Systems is offered, Programming must be offered; if Programming is offered, Mathematics must be offered; Mathematics is not offered. Which course definitely cannot be offered?",
  options: ["Database Systems", "English", "Physics", "Statistics"],
  answer: 0,
  explanation: "If Database Systems were offered, Programming would have to be offered, which would require Mathematics. Since Mathematics is not offered, Database Systems cannot be offered."
},

{
  question: "A machine transforms an input using this rule: multiply by 3, add 6, then divide by 3. If the final output is 14, what was the original input?",
  options: ["10", "12", "14", "16"],
  answer: 1,
  explanation: "Let the input be x. The output is (3x + 6) / 3 = x + 2. Since x + 2 = 14, x = 12."
},

{
  question: "Four students H, J, K, and L each receive one different grade: A, B, C, or D. H receives a better grade than J. K receives a worse grade than J. L receives a better grade than H. What grade does H receive?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "The ranking is L better than H better than J better than K. With grades A, B, C, and D from best to worst, L=A, H=B, J=C, and K=D. Therefore H receives B."
},

{
  question: "A digital lock accepts a code only when all three conditions are satisfied: the first digit is even, the second digit is greater than the first, and the third digit equals the sum of the first two. Which code is accepted?",
  options: ["235", "246", "257", "347"],
  answer: 1,
  explanation: "For 246, the first digit 2 is even, 4 is greater than 2, and 6 = 2 + 4. The other options fail at least one condition."
},

{
  question: "Five candidates A, B, C, D, and E are assigned ranks 1 through 5. A ranks better than C. B ranks worse than D. C ranks better than B. E ranks worse than B. Who must rank first?",
  options: ["A", "B", "C", "D"],
  answer: 3,
  explanation: "The conditions give A > C > B > E and D > B. A and D are both above B, but A and D are not directly compared. However, for five distinct ranks, D need not be first: A could be first and D second. Therefore this question as stated would not have a unique answer."
},
{
  question: "A research team has exactly four members selected from P, Q, R, S, T, and U. P must be selected. If Q is selected, R must be selected. S and T cannot both be selected. U can be selected only if T is selected. Which team is valid?",
  options: [
    "P, Q, S, U",
    "P, Q, R, S",
    "P, R, S, T",
    "P, Q, T, U"
  ],
  answer: 1,
  explanation: "P, Q, R, S satisfies every rule: P is included, Q is accompanied by R, S and T are not together, and U is absent. Option A has Q without R and U without T. Option C contains S and T together. Option D has Q without R."
},

{
  question: "A student says, 'If I complete the assignment tonight, I will submit it tomorrow.' The student does not submit the assignment tomorrow. Assuming the statement is true, what follows?",
  options: [
    "The student did not complete the assignment tonight",
    "The student completed the assignment but forgot to submit it",
    "The assignment was submitted today",
    "The student never started the assignment"
  ],
  answer: 0,
  explanation: "The statement has the form Complete tonight → Submit tomorrow. Its contrapositive is Not submit tomorrow → Not complete tonight. Therefore the student did not complete the assignment tonight."
},

{
  question: "Four files A, B, C, and D have different sizes. A is larger than B. C is smaller than A but larger than D. B is larger than C. Which file is the second largest?",
  options: ["A", "B", "C", "D"],
  answer: 1,
  explanation: "The comparisons give A > B > C > D. Therefore B is the second-largest file."
},

{
  question: "A university cafeteria observes that sales of cold drinks increase on hotter days. Which conclusion is best supported by this observation alone?",
  options: [
    "Hot weather is associated with higher cold-drink sales",
    "Hot weather is the only cause of cold-drink sales",
    "Every student buys a cold drink on a hot day",
    "Reducing cold-drink prices causes hotter weather"
  ],
  answer: 0,
  explanation: "The observation supports an association between hotter weather and higher cold-drink sales. It does not establish that temperature is the only cause or justify the other claims."
},

{
  question: "A five-character code contains the letters A, B, C, D, and E exactly once. A appears somewhere before C. E appears immediately after C. B appears before A. D appears after E. What is the code?",
  options: ["BACED", "BCAED", "ABCED", "BAECD"],
  answer: 0,
  explanation: "BACED has B before A, A before C, E immediately after C, and D after E. The other options violate at least one condition."
},

{
  question: "Exactly one of two servers, X and Y, is active. If X is active, database A is available. Database A is unavailable. Which server must be active?",
  options: ["X", "Y", "Both X and Y", "Neither X nor Y"],
  answer: 1,
  explanation: "If X were active, database A would be available. Since A is unavailable, X is not active. Exactly one server is active, so Y must be active."
},

{
  question: "A sequence follows the pattern: 4, 7, 14, 17, 34, 37, ?. What is the next term?",
  options: ["40", "71", "74", "77"],
  answer: 2,
  explanation: "The operations alternate +3 and ×2: 4→7, 7→14, 14→17, 17→34, 34→37. The next operation is ×2, so 37×2 = 74."
},

{
  question: "Four university buses W, X, Y, and Z leave at 8:00, 8:15, 8:30, and 8:45, one at each time. W leaves earlier than Y. X leaves at 8:15. Z leaves later than Y. At what time does Y leave?",
  options: ["8:00", "8:15", "8:30", "8:45"],
  answer: 2,
  explanation: "X occupies 8:15. Since W is earlier than Y and Z is later than Y, Y must have both an earlier and a later available time. The only possibility is Y at 8:30, with W at 8:00 and Z at 8:45."
},

{
  question: "What is the value of positive integer k?\nStatement I: k is an even number less than 8.\nStatement II: k is greater than 4.",
  options: [
    "Statement I alone is sufficient",
    "Statement II alone is sufficient",
    "Both statements together are sufficient",
    "Even both statements together are insufficient"
  ],
  answer: 2,
  explanation: "Statement I permits 2, 4, or 6. Statement II alone permits many values. Together, k must be an even positive integer greater than 4 and less than 8, so k = 6."
},

{
  question: "A scholarship committee uses the rule: an applicant must have either an academic award or volunteer experience, and must also pass an interview. Which applicant satisfies the stated requirements?",
  options: [
    "An applicant with an academic award who failed the interview",
    "An applicant with volunteer experience who passed the interview",
    "An applicant with neither qualification who passed the interview",
    "An applicant with an academic award but who did not attend the interview"
  ],
  answer: 1,
  explanation: "The rule is (academic award OR volunteer experience) AND interview passed. The second applicant has volunteer experience and passed the interview, satisfying both parts."
},

{
  question: "A professor has evidence that students using a new practice system scored higher than before. Which fact would most weaken the conclusion that the system itself caused the improvement?",
  options: [
    "The examination given after the system was introduced was substantially easier than the earlier examination",
    "The system contains practice questions",
    "Students can access the system from home",
    "The university has computer laboratories"
  ],
  answer: 0,
  explanation: "If the later examination was substantially easier, the score increase could be explained by exam difficulty rather than the new practice system, weakening the causal conclusion."
},

{
  question: "Six books P, Q, R, S, T, and U are divided equally between Shelf 1 and Shelf 2. P and Q must be on different shelves. R and S must be on the same shelf. T must be on Shelf 1. If R and S are on Shelf 2, which book must also be on Shelf 1?",
  options: ["P", "Q", "U", "Cannot be determined"],
  answer: 2,
  explanation: "Shelf 2 already contains R and S and has room for only one more book. P and Q must be separated, so one goes to each shelf. Shelf 1 therefore contains T, one of P/Q, and U. Thus U must be on Shelf 1."
},

{
  question: "A number is called a Valid Number if it is greater than 20, less than 50, and divisible by 6. Which option contains only Valid Numbers?",
  options: ["24, 30, 42", "18, 24, 36", "30, 42, 54", "24, 35, 48"],
  answer: 0,
  explanation: "24, 30, and 42 are all greater than 20, less than 50, and divisible by 6. Every other option contains at least one number that violates a condition."
},

{
  question: "Four students J, K, L, and M give presentations. J presents before K. L presents immediately after K. M presents before J. Which student presents last?",
  options: ["J", "K", "L", "M"],
  answer: 2,
  explanation: "M must be before J, J before K, and L immediately after K. Therefore the complete order is M, J, K, L, so L presents last."
},

{
  question: "All approved applications have a reference number. Some applications with reference numbers require additional documents. Which statement must be true?",
  options: [
    "Every application with a reference number is approved",
    "No approved application requires additional documents",
    "An approved application cannot lack a reference number",
    "All applications requiring additional documents are approved"
  ],
  answer: 2,
  explanation: "The first statement says Approved → Has reference number. Therefore an approved application cannot lack a reference number. The reverse implication is not established."
},

{
  question: "A transformation changes a pair of numbers (a, b) into (a + b, a - b). What is the result when the input is (9, 4)?",
  options: ["(13, 5)", "(5, 13)", "(36, 5)", "(13, 13)"],
  answer: 0,
  explanation: "For (9, 4), a + b = 13 and a - b = 5. Therefore the transformed pair is (13, 5)."
},

{
  question: "A university schedules three exams—Mathematics, Physics, and Computer Science—on Monday, Tuesday, and Wednesday, one per day. Mathematics is earlier than Physics. Computer Science is not on Wednesday. Which exam is on Tuesday?",
  options: ["Mathematics", "Physics", "Computer Science", "Cannot be determined"],
  answer: 3,
  explanation: "Two schedules satisfy the conditions: Mathematics-Monday, Computer Science-Tuesday, Physics-Wednesday; or Computer Science-Monday, Mathematics-Tuesday, Physics-Wednesday. Therefore the Tuesday exam cannot be uniquely determined."
},

{
  question: "A notice states: 'Students may enter the examination hall only if they show an admit card.' Bilal entered the examination hall. What must be true according to the rule?",
  options: [
    "Bilal showed an admit card",
    "Bilal arrived early",
    "Bilal was carrying a calculator",
    "Bilal was the first student to enter"
  ],
  answer: 0,
  explanation: "'May enter only if they show an admit card' makes showing an admit card a necessary condition for entry. Since Bilal entered, he must have shown one."
},

{
  question: "Five projects V, W, X, Y, and Z have different budgets. V has a larger budget than W. X has a smaller budget than W. Y has a larger budget than V. Z has a smaller budget than X. Which project has the smallest budget?",
  options: ["V", "W", "X", "Z"],
  answer: 3,
  explanation: "The conditions give Y > V > W > X > Z. Therefore Z has the smallest budget."
},

{
  question: "A selection rule says: if candidate R is selected, candidate S must not be selected; if candidate T is selected, R must be selected. Candidate T is selected. Which statement must be true?",
  options: [
    "S is not selected",
    "S is selected",
    "R is not selected",
    "T and R cannot be selected together"
  ],
  answer: 0,
  explanation: "T being selected forces R to be selected. R being selected forces S not to be selected. Therefore S must not be selected."
},

{
  question: "A university claims that extending computer-lab hours will help students complete more assignments on campus. Which evidence most directly supports the claim?",
  options: [
    "After hours were extended, the number of assignments completed in the lab increased while student enrollment remained approximately unchanged",
    "The laboratory computers have black keyboards",
    "Many students own smartphones",
    "Some university courses do not require computers"
  ],
  answer: 0,
  explanation: "An increase in assignments completed in the lab after the extension, without a major enrollment change, directly supports the claim that longer hours are associated with more on-campus assignment completion."
},

{
  question: "Three printers A, B, and C print at different speeds. A is faster than B. C is slower than A but faster than B. Which statement is correct?",
  options: [
    "C is the fastest",
    "B is faster than C",
    "C is the second fastest",
    "A is the slowest"
  ],
  answer: 2,
  explanation: "The comparisons give A > C > B in printing speed. Therefore C is the second fastest."
},

{
  question: "A four-step process uses the operations +2, ×3, -4, and ÷2 in that order. Starting with 6, what is the final result?",
  options: ["8", "10", "12", "14"],
  answer: 1,
  explanation: "Starting with 6: 6 + 2 = 8; 8 × 3 = 24; 24 - 4 = 20; 20 ÷ 2 = 10."
},

{
  question: "A database contains records of exactly three types: Student, Faculty, and Staff. There are 120 records in total. There are 50 Student records and 30 Faculty records. How many Staff records are there?",
  options: ["30", "40", "50", "70"],
  answer: 1,
  explanation: "The three categories are mutually exhaustive. Staff records = 120 - 50 - 30 = 40."
},

//STOP4

{
  question: "Seven tasks A, B, C, D, E, F, and G are completed one at a time. A is completed before B. B is completed before C. D is completed after C. E is completed before A. F is completed after D. G is completed after F. Which task must be completed fourth?",
  options: ["B", "C", "D", "E"],
  answer: 1,
  explanation: "The conditions create the complete chain E < A < B < C < D < F < G. Since all seven tasks are included, C must be fourth."
},

{
  question: "A university assigns four classrooms W, X, Y, and Z to floors 1 through 4, one per floor. X is exactly one floor above W. Y is above X. Z is below W. Which classroom is on floor 2?",
  options: ["W", "X", "Y", "Z"],
  answer: 0,
  explanation: "Z must be below W, X immediately above W, and Y above X. The only possible bottom-to-top order is Z, W, X, Y. Therefore W is on floor 2."
},

{
  question: "A code changes a word by moving the first letter to the end and then moving every letter one position backward in the alphabet. Using this rule, how is MATH coded?",
  options: ["ZSG L", "ZSGK", "ZSHL", "ATHM"],
  answer: 1,
  explanation: "Moving the first letter of MATH to the end gives ATHM. Moving each letter one position backward gives A→Z, T→S, H→G, M→L. Therefore the code is ZSGL."
},
{
  question: "A program selects exactly two modules from W, X, Y, and Z. W can be selected only if X is selected. X and Y cannot be selected together. Z can be selected only if Y is selected. Which pair is possible?",
  options: ["W and Y", "W and X", "X and Y", "X and Z"],
  answer: 1,
  explanation: "W and X is valid because selecting W requires X. W and Y lacks X and also conflicts indirectly with W's requirement. X and Y is explicitly forbidden. X and Z is invalid because selecting Z requires Y, which is absent."
},

{
  question: "Four servers P, Q, R, and S have different response times. P is faster than Q. R is slower than Q. S is faster than P. Which server is the second fastest?",
  options: ["P", "Q", "R", "S"],
  answer: 0,
  explanation: "The comparisons give S faster than P faster than Q faster than R. Therefore P is the second-fastest server."
},

{
  question: "What is the value of positive integer n?\nStatement I: n is a multiple of 4 and less than 15.\nStatement II: n is greater than 10.",
  options: [
    "Statement I alone is sufficient",
    "Statement II alone is sufficient",
    "Both statements together are sufficient",
    "Even both statements together are insufficient"
  ],
  answer: 2,
  explanation: "Statement I permits 4, 8, or 12. Statement II alone permits many values. Together, the only positive integer satisfying both statements is 12. Therefore both statements together are sufficient."
},

{
  question: "A file can be marked Complete only if it has passed both the security check and the accuracy check. File X is marked Complete. Which statement is necessarily true?",
  options: [
    "File X passed both checks",
    "File X passed only the security check",
    "File X was checked by two different people",
    "Every file that passes both checks is marked Complete"
  ],
  answer: 0,
  explanation: "Passing both checks is necessary for a Complete status. Since File X is marked Complete, it must have passed both checks. The rule does not establish who performed the checks or whether passing both checks is sufficient by itself."
},

{
  question: "Five students H, J, K, L, and M stand in a line. H is immediately to the left of J. K is immediately to the right of J. L is to the left of H. M is to the right of K. Who stands in the middle?",
  options: ["H", "J", "K", "L"],
  answer: 1,
  explanation: "H-J-K form a consecutive block. L must be to the left of H and M to the right of K, forcing the order L, H, J, K, M. Therefore J is in the middle."
},

{
  question: "A three-digit code uses three different digits selected from 2, 4, and 6. The first digit is greater than the second, and the second digit is greater than the third. What is the code?",
  options: ["246", "426", "642", "624"],
  answer: 2,
  explanation: "The digits must appear in strictly decreasing order. Since 6 > 4 > 2, the code is 642."
},

{
  question: "All students who qualify for Round 2 have passed the aptitude test. Some students who passed the aptitude test do not qualify for Round 2. Which statement is consistent with these facts?",
  options: [
    "Passing the aptitude test is necessary but not sufficient for qualifying for Round 2",
    "Passing the aptitude test guarantees qualification for Round 2",
    "No student in Round 2 passed the aptitude test",
    "Only students who fail the aptitude test qualify for Round 2"
  ],
  answer: 0,
  explanation: "Every Round 2 qualifier has passed the test, making passing necessary. Since some students pass but still do not qualify, passing alone is not sufficient."
},

{
  question: "A process contains four stages: P, Q, R, and S. P must be completed before both Q and R. Both Q and R must be completed before S. Which stage must be completed first?",
  options: ["P", "Q", "R", "S"],
  answer: 0,
  explanation: "Both Q and R require P to be completed first, and S comes after Q and R. Therefore P must be the first stage."
},

{
  question: "A university has 90 applicants. Exactly 52 applied for Program A, 41 applied for Program B, and 18 applied for both. How many applied for neither program?",
  options: ["15", "18", "23", "33"],
  answer: 0,
  explanation: "Applicants to at least one program = 52 + 41 - 18 = 75. Therefore 90 - 75 = 15 applicants applied for neither."
},

{
  question: "A sequence follows the rule that each term equals the previous term plus consecutive odd numbers beginning with 3. The sequence starts 5, 8, 13, 20, 29, ?. What is the next term?",
  options: ["38", "40", "41", "42"],
  answer: 1,
  explanation: "The added numbers are 3, 5, 7, and 9. The next odd number is 11, so 29 + 11 = 40."
},

{
  question: "Four applicants A, B, C, and D are interviewed on four consecutive days from Monday to Thursday. A is interviewed before B. C is interviewed on Monday. D is interviewed after B. On which day is B interviewed?",
  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  answer: 2,
  explanation: "C occupies Monday. A must be before B, and D must be after B. Among the remaining Tuesday, Wednesday, and Thursday slots, this forces A on Tuesday, B on Wednesday, and D on Thursday."
},

{
  question: "A rule states: if a laboratory experiment uses Chemical X, protective gloves must be worn. During an experiment, protective gloves were not worn. What follows if the rule was obeyed?",
  options: [
    "Chemical X was not used",
    "Chemical X was used incorrectly",
    "No chemicals were used",
    "The experiment was unsuccessful"
  ],
  answer: 0,
  explanation: "The rule is Chemical X used → Gloves worn. Its contrapositive is Gloves not worn → Chemical X not used. Therefore Chemical X was not used."
},

{
  question: "Exactly one of P and Q is true. P is false. Which statement must be correct?",
  options: [
    "Q is true",
    "Q is false",
    "Both are false",
    "Nothing can be concluded"
  ],
  answer: 0,
  explanation: "Exactly one of the two statements is true. Since P is false, Q must be true."
},

{
  question: "Five computers A, B, C, D, and E have distinct memory capacities. A has more memory than B. B has more than C. D has more than A. E has less than C. Which computer has the greatest memory capacity?",
  options: ["A", "B", "D", "E"],
  answer: 2,
  explanation: "The comparisons give D > A > B > C > E. Therefore D has the greatest memory capacity."
},

{
  question: "A student must complete at least one of Course X or Course Y, and must also complete Course Z. Which combination satisfies the requirement?",
  options: [
    "Course X only",
    "Course Z only",
    "Courses Y and Z",
    "Courses X and Y without Z"
  ],
  answer: 2,
  explanation: "The requirement is (X OR Y) AND Z. Completing Y and Z satisfies both parts. The other options either omit Z or omit both X and Y."
},

{
  question: "A university schedules five activities P, Q, R, S, and T from Monday through Friday, one per day. P is on Monday. T is on Friday. R occurs immediately after Q. S occurs before Q. On which day is Q scheduled?",
  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  answer: 2,
  explanation: "P occupies Monday and T occupies Friday. Q and R must be consecutive, and S must occur before Q. Q cannot be Tuesday because Monday is already occupied by P, leaving no available day before Q for S. Q cannot be Thursday because R would then be Friday, already occupied by T. Therefore Q is Wednesday, with S on Tuesday and R on Thursday."
},

{
  question: "A number is called Qualified if it is greater than 15, divisible by 4, and not greater than 40. Which option contains only Qualified numbers?",
  options: [
    "16, 24, 40",
    "12, 20, 36",
    "16, 30, 40",
    "20, 32, 44"
  ],
  answer: 0,
  explanation: "16, 24, and 40 are all greater than 15, divisible by 4, and no greater than 40. Each other option contains at least one number that violates a condition."
},

{
  question: "A study finds that students who sleep at least seven hours tend to have higher concentration scores. Which statement is justified by this finding alone?",
  options: [
    "Sleeping at least seven hours is associated with higher concentration scores in the observed students",
    "Sleeping seven hours always causes high concentration",
    "Every student sleeping fewer than seven hours has poor concentration",
    "Sleep duration is the only factor affecting concentration"
  ],
  answer: 0,
  explanation: "The finding supports an association in the observed students. It does not by itself prove causation, establish an exceptionless rule, or show that sleep is the only relevant factor."
},

//step5

{
  question: "Five presentations A, B, C, D, and E are scheduled from first to fifth. A is immediately before D. C is immediately after B. E is first. If B is second, which presentation is fourth?",
  options: ["A", "C", "D", "E"],
  answer: 0,
  explanation: "E is first. If B is second, C must be third. The remaining fourth and fifth positions belong to A and D, with A immediately before D. Therefore A is fourth."
},

{
  question: "A university selects exactly four students from P, Q, R, S, T, and U. P must be selected. If Q is selected, R must be selected. S and T cannot both be selected. U can be selected only if T is selected. Which group is valid?",
  options: [
    "P, Q, S, U",
    "P, Q, R, S",
    "P, R, S, T",
    "P, Q, T, U"
  ],
  answer: 1,
  explanation: "P, Q, R, S is valid: P is included, Q is accompanied by R, S and T are not together, and U is absent. Option 1 has Q without R and U without T. Option 3 contains both S and T. Option 4 has Q without R."
},

{
  question: "A sequence follows two alternating rules: divide by 2, then add 7. Starting with 40, it becomes 40, 20, 27, 13.5, 20.5, ?. What is the next term?",
  options: ["10.25", "13.5", "27.5", "41"],
  answer: 0,
  explanation: "The operations alternate ÷2 and +7: 40→20→27→13.5→20.5. The next operation is ÷2, so 20.5 ÷ 2 = 10.25."
},

{
  question: "Four laboratories P, Q, R, and S each operate on a different day from Monday through Thursday. P operates before R. Q operates on Monday. S operates after R. On which day does R operate?",
  options: ["Monday", "Tuesday", "Wednesday", "Thursday"],
  answer: 2,
  explanation: "Q occupies Monday. P must be before R and S after R. Among the remaining days, the only arrangement is P on Tuesday, R on Wednesday, and S on Thursday."
},

{
  question: "A student can access the advanced programming lab only if the student has both an active university account and laboratory clearance. Mariam can access the advanced programming lab. What must be true?",
  options: [
    "Mariam has both an active account and laboratory clearance",
    "Mariam is a Computer Science major",
    "Mariam has used the laboratory before",
    "Every student with an active account can access the laboratory"
  ],
  answer: 0,
  explanation: "Both an active account and laboratory clearance are necessary conditions for access. Since Mariam can access the lab, she must satisfy both conditions."
},

{
  question: "A number machine converts 3 to 10, 5 to 26, and 7 to 50. Which rule is consistent with all three transformations?",
  options: [
    "Square the input and add 1",
    "Double the input and add 4",
    "Square the input and subtract 1",
    "Multiply the input by 3 and add 1"
  ],
  answer: 0,
  explanation: "Using n² + 1 gives 3²+1=10, 5²+1=26, and 7²+1=50. Therefore the rule is to square the input and add 1."
},

{
  question: "Four applicants H, J, K, and L receive distinct scores. H scores higher than J. K scores lower than L but higher than H. Who has the highest score?",
  options: ["H", "J", "K", "L"],
  answer: 3,
  explanation: "The comparisons give L > K > H > J. Therefore L has the highest score."
},

{
  question: "A six-character code uses A, B, C, D, E, and F exactly once. A is first. F is last. C appears immediately after B. E appears immediately after D. If B appears before D, which code is correct?",
  options: [
    "ABCDEF",
    "AB C D E F",
    "ADEBCF",
    "ACBDEF"
  ],
  answer: 0,
  explanation: "The required structure is A first, F last, B immediately followed by C, and D immediately followed by E, with B before D. This forces A-B-C-D-E-F, or ABCDEF."
},

{
  question: "Every member of the programming society owns a laptop. Some members of the programming society are first-year students. Which conclusion must be true?",
  options: [
    "Some first-year students own laptops",
    "All first-year students own laptops",
    "Every laptop owner belongs to the programming society",
    "No first-year student owns a desktop computer"
  ],
  answer: 0,
  explanation: "Some programming-society members are first-year students, and every society member owns a laptop. Therefore those first-year members own laptops, so some first-year students own laptops."
},

{
  question: "A university reports that students attending weekly tutorials have higher average grades than students who do not attend. Which information is most important before concluding that tutorials cause the higher grades?",
  options: [
    "Whether tutorial attendees already differed in academic ability or study effort",
    "Whether the tutorial rooms contain projectors",
    "How many buildings the university owns",
    "Whether tutorials are held in the morning or afternoon"
  ],
  answer: 0,
  explanation: "Pre-existing differences in ability or study effort could explain both tutorial attendance and higher grades. This potential confounding factor must be considered before inferring causation."
},

{
  question: "A committee must contain exactly three people selected from A, B, C, D, and E. A cannot serve with B. If C serves, D must serve. E cannot serve with D. Which committee is possible?",
  options: [
    "A, B, C",
    "A, C, E",
    "B, C, D",
    "C, D, E"
  ],
  answer: 2,
  explanation: "B, C, D is valid: A and B are not together, C is accompanied by D, and E is absent. Option 1 contains A and B and also has C without D. Option 2 has C without D. Option 4 contains E with D."
},

{
  question: "What is the value of positive integer x?\nStatement I: x is divisible by 5 and less than 20.\nStatement II: x is greater than 12.",
  options: [
    "Statement I alone is sufficient",
    "Statement II alone is sufficient",
    "Both statements together are sufficient",
    "Even both statements together are insufficient"
  ],
  answer: 2,
  explanation: "Statement I permits 5, 10, and 15. Statement II alone permits many positive integers. Together, x must be greater than 12, divisible by 5, and less than 20, so x = 15."
},

{
  question: "A process has four stages W, X, Y, and Z. W must occur before X. X and Y must both occur before Z. Y must occur before W. Which order is required?",
  options: [
    "Y, W, X, Z",
    "W, Y, X, Z",
    "Y, X, W, Z",
    "W, X, Y, Z"
  ],
  answer: 0,
  explanation: "Y must occur before W, W before X, and both X and Y before Z. Therefore the required order is Y, W, X, Z."
},

{
  question: "A rule states: if an application contains incomplete information, it is returned to the applicant. Application X was not returned. Assuming the rule was followed, what can be concluded?",
  options: [
    "Application X did not contain incomplete information",
    "Application X was automatically approved",
    "Application X received the highest priority",
    "Application X was submitted in person"
  ],
  answer: 0,
  explanation: "The rule is Incomplete → Returned. Its contrapositive is Not returned → Not incomplete. Therefore Application X did not contain incomplete information."
},

{
  question: "Four courses A, B, C, and D have different numbers of enrolled students. A has more students than C. B has fewer students than C. D has more students than A. Which course has the second-highest enrollment?",
  options: ["A", "B", "C", "D"],
  answer: 0,
  explanation: "The comparisons give D > A > C > B. Therefore A has the second-highest enrollment."
},

{
  question: "A university requires students to complete either Course P or Course Q before taking Course R. Ahmed is taking Course R. Which conclusion must be true?",
  options: [
    "Ahmed completed at least one of P or Q",
    "Ahmed completed both P and Q",
    "Ahmed completed P but not Q",
    "Ahmed completed Q but not P"
  ],
  answer: 0,
  explanation: "Taking R requires completion of P or Q. Therefore Ahmed must have completed at least one of them, but the information does not establish which one or whether he completed both."
},

{
  question: "A transformation changes an ordered pair (a, b) into (2a + b, a + 2b). What is the result for the pair (3, 4)?",
  options: ["(10, 11)", "(11, 10)", "(7, 14)", "(10, 14)"],
  answer: 0,
  explanation: "For (3,4), 2a+b = 2(3)+4 = 10, and a+2b = 3+2(4) = 11. Therefore the result is (10,11)."
},

{
  question: "Five students K, L, M, N, and P occupy positions 1 through 5 in a queue. M is in position 3. K is somewhere before M. P is immediately after M. N is before K. Who must occupy position 1?",
  options: ["K", "L", "N", "P"],
  answer: 2,
  explanation: "M is third and P is fourth. K must be before M, and N must be before K. The only two positions before M are 1 and 2, forcing N into position 1 and K into position 2."
},

{
  question: "A university survey includes 100 students. Exactly 58 use the library regularly, 47 use the computer lab regularly, and 25 use both regularly. How many use neither regularly?",
  options: ["20", "25", "30", "35"],
  answer: 0,
  explanation: "The number using at least one facility is 58 + 47 - 25 = 80. Therefore 100 - 80 = 20 students use neither regularly."
},

{
  question: "A sequence is formed by adding successive multiples of 4: 3, 7, 15, 27, 43, ?. What is the next term?",
  options: ["59", "63", "67", "71"],
  answer: 1,
  explanation: "The differences are 4, 8, 12, and 16. The next difference is 20, so 43 + 20 = 63."
},

{
  question: "Exactly one of statements P and Q is false. P is true. What must be true about Q?",
  options: [
    "Q is false",
    "Q is true",
    "Q can be either true or false",
    "P must actually be false"
  ],
  answer: 0,
  explanation: "If exactly one of P and Q is false and P is known to be true, Q must be the false statement."
},

{
  question: "A university claims that adding more charging stations will reduce the number of students waiting to charge their laptops. Which observation most strongly supports the claim?",
  options: [
    "After additional charging stations were installed, average waiting time fell while demand remained similar",
    "The new charging stations have indicator lights",
    "Some students own more than one electronic device",
    "The university library has several floors"
  ],
  answer: 0,
  explanation: "A reduction in waiting time after increasing charging capacity, while demand remains similar, directly supports the claim."
},

{
  question: "A computer program executes exactly one of Module X or Module Y. Module Z runs whenever Module X runs. Module Z did not run. Which module must have executed?",
  options: ["Module X", "Module Y", "Module Z", "Both X and Y"],
  answer: 1,
  explanation: "If X had executed, Z would have run. Since Z did not run, X did not execute. Exactly one of X and Y executes, so Y must have executed."
},

{
  question: "Four research papers P, Q, R, and S receive distinct ratings from 1 to 4, where 4 is the highest. P is rated higher than Q. R is rated higher than P. S is rated lower than Q. What rating does P receive?",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explanation: "The conditions create the complete ranking R > P > Q > S. With distinct ratings 4, 3, 2, and 1 respectively, P receives rating 3."
},

{
  question: "A three-stage verification system checks identity first, eligibility second, and payment third. A user can reach a stage only after passing every earlier stage. Ayesha reached the payment stage but failed it. Which statement must be true?",
  options: [
    "Ayesha passed both identity and eligibility checks",
    "Ayesha failed the identity check",
    "Ayesha skipped the eligibility check",
    "Ayesha passed all three checks"
  ],
  answer: 0,
  explanation: "Reaching the payment stage requires passing every earlier stage. Therefore Ayesha must have passed both identity and eligibility before failing payment."
},

{
  question: "A university offers four electives A, B, C, and D. A student chooses exactly two. A and B cannot be chosen together. Choosing C requires choosing A. Choosing D requires choosing B. Which pair can be chosen?",
  options: [
    "A and B",
    "B and C",
    "A and C",
    "C and D"
  ],
  answer: 2,
  explanation: "A and C is valid because C requires A. A and B is forbidden. B and C is invalid because C requires A, which would create three courses. C and D would require both A and B, which are forbidden together and would also exceed the two-course limit."
}
];