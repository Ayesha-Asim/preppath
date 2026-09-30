import type { Question } from "./types";

export const Questions: Question[] = [
  {
question: "If x = (0.125)^(2/3) and y = (0.015625)^(1/3), then x/y is:",
options: ["0.5", "1", "2", "4"],
answer: 1,
explanation: "0.125 = (1/2)^3, so x = (1/2)^2 = 1/4. Also, 0.015625 = (1/4)^3, so y = 1/4. Therefore, x/y = 1."
},

{
question: "A number when divided by 13 leaves remainder 7. If the number is greater than 7, less than 39, and divisible by 3, what is its remainder when divided by 39?",
options: ["7", "20", "33", "39"],
answer: 2,
explanation: "Numbers less than 39 that leave remainder 7 when divided by 13 are 7, 20, and 33. The number 33 is a multiple of 3 and is less than 39. Therefore, its remainder when divided by 39 is 33."
},

{
question: "If 30% of A = 45% of B = 60% of C, then A : B : C is:",
options: ["2 : 3 : 4", "3 : 2 : 1.5", "4 : 3 : 2", "6 : 4 : 3"],
answer: 3,
explanation: "Let the common value be k. Then A = k/0.3, B = k/0.45, and C = k/0.6. So A:B:C = 10/3 : 20/9 : 5/3 = 30:20:15 = 6:4:3."
},

{ "question": "The average of five consecutive odd numbers is 23. The largest of these numbers is:",
"options": ["25", "27", "29", "31"],
"answer": 1,
"explanation": "Let numbers be n, n+2, n+4, n+6, n+8. Average = (5n + 20)/5 = n + 4 = 23 ⇒ n = 19. Numbers: 19, 21, 23, 25, 27. Largest is 27."
},
{ "question": "A shopkeeper marks an article 25% above cost price and then gives a discount of 10% on the marked price. His net profit percent is:",
"options": ["10%", "12.5%", "15%", "17.5%"],
"answer": 1,
"explanation": "Let CP = 100. MP = 125. SP after 10% discount = 125 × 0.9 = 112.5. Profit = 12.5 ⇒ profit% = 12.5%."
},
{
question: "A sum of money at simple interest amounts to Rs. 1200 in 3 years and to Rs. 1320 in 5 years. The rate of interest per annum is approximately:",
options: ["4%", "5%", "6%", "8%"],
answer: 2,
explanation: "Interest for 2 years = 1320 − 1200 = Rs. 120, so yearly interest = Rs. 60. Principal = 1200 − 3(60) = Rs. 1020. Rate = (60/1020)×100 ≈ 5.88%, which is approximately 6%."
},

{ "question": "A train 150 m long passes a pole in 10 seconds. How long will it take to pass a platform 300 m long?",
"options": ["20 s", "25 s", "30 s", "35 s"],
"answer": 2,
"explanation": "Speed = 150/10 = 15 m/s. To pass platform, distance = 150 + 300 = 450 m. Time = 450/15 = 30 s."
},
{
question: "A can do a piece of work in 12 days, B in 15 days. They work together for 4 days and then A leaves. B will complete the remaining work in:",
options: ["4 days", "5 days", "6 days", "8 days"],
answer: 2,
explanation: "Together, A and B complete 1/12 + 1/15 = 3/20 of the work per day. In 4 days, they complete 4×3/20 = 3/5. Remaining work = 2/5. B alone takes (2/5)/(1/15) = 6 days."
},

{ "question": "A pipe can fill a tank in 12 hours, another can empty it in 18 hours. If both are opened together, the tank will be filled in:",
"options": ["18 h", "24 h", "30 h", "36 h"],
"answer": 3,
"explanation": "Net rate = 1/12 − 1/18 = (3−2)/36 = 1/36 tank/hour. Time = 36 hours."
},
{ "question": "A mixture contains milk and water in the ratio 5:3. If 8 liters of water is added, the ratio becomes 5:4. The quantity of milk in the original mixture is:",
"options": ["20 L", "30 L", "40 L", "50 L"],
"answer": 2,
"explanation": "Let milk = 5x, water = 3x. After adding 8 L water: 5x/(3x+8) = 5/4 ⇒ 4×5x = 5(3x+8) ⇒ 20x = 15x + 40 ⇒ 5x = 40 ⇒ x = 8. Milk = 5x = 40 L."
},
{
question: "Five years ago, the ratio of ages of A and B was 3:4. Five years hence, it will be 5:6. The present age of A is:",
options: ["20", "25", "30", "35"],
answer: 0,
explanation: "Let ages 5 years ago be 3k and 4k. Five years hence, ages will be 3k+10 and 4k+10. So (3k+10)/(4k+10)=5/6. Solving gives k=5. Present age of A = 3k+5 = 20."
},

{ "question": "A and B start a business with capitals Rs. 30,000 and Rs. 40,000. After 4 months, C joins with Rs. 50,000. If the annual profit is Rs. 84,000, B's share is approximately:",
"options": ["Rs. 24,000", "Rs. 28,000", "Rs. 32,000", "Rs. 36,000"],
"answer": 2,
"explanation": "Capital-time ratios are 30,000×12 : 40,000×12 : 50,000×8 = 360 : 480 : 400 = 9 : 12 : 10. Total parts = 31. Therefore, B's share = (12/31) × 84,000 ≈ Rs. 32,516, which is approximately Rs. 32,000."
},
{ "question": "At 3:20, the angle between the hour and minute hands of a clock is:",
"options": ["10°", "20°", "30°", "40°"],
"answer": 1,
"explanation": "Minute hand: 20 min ⇒ 20×6 = 120°. Hour hand: 3 hr 20 min ⇒ 3×30 + 20×0.5 = 90 + 10 = 100°. Angle = |120 − 100| = 20°."
},
{ "question": "How many 4-digit numbers can be formed using digits 1,2,3,4,5 without repetition such that the number is divisible by 4?",
"options": ["12", "18", "24", "30"],
"answer": 2,
"explanation": "A number is divisible by 4 if last two digits form a number divisible by 4. Possible endings from {1,2,3,4,5}: 12, 24, 32, 52. For each ending, first two digits can be any permutation of remaining 3 digits taken 2: P(3,2)=6. So total = 4×6 = 24."
},
{ "question": "A bag contains 4 red and 6 blue balls. Two balls are drawn at random. The probability that both are of the same color is:",
"options": ["1/3", "7/15", "8/15", "2/3"],
"answer": 1,
"explanation": "Total ways = C(10,2) = 45. Same color: C(4,2)+C(6,2) = 6+15=21. Probability = 21/45 = 7/15."
},
{ "question": "In a class, 60% students like Math, 50% like Physics, and 20% like both. The percentage of students who like neither is:",
"options": ["5%", "10%", "15%", "20%"],
"answer": 1,
"explanation": "Use inclusion-exclusion: P(M ∪ P) = 60 + 50 − 20 = 90%. Neither = 100 − 90 = 10%."
},
{ "question": "If f(x) = 2x + 3 and g(x) = x² − 1, then f(g(2)) is:",
"options": ["5", "7", "9", "11"],
"answer": 2,
"explanation": "g(2) = 2² − 1 = 3. f(3) = 2×3 + 3 = 9."
},
{ "question": "The sum of the first n terms of the sequence 2, 6, 12, 20, ... is:",
"options": ["n(n+1)(n+2)/3", "n(n+1)(2n+1)/6", "n(n+1)(n+2)/2", "n(n+1)(n+2)/6"],
"answer": 0,
"explanation": "General term T_k = k(k+1). Sum Σk(k+1) from 1 to n = Σ(k² + k) = n(n+1)(2n+1)/6 + n(n+1)/2 = n(n+1)[(2n+1)/6 + 1/2] = n(n+1)[(2n+1 + 3)/6] = n(n+1)(2n+4)/6 = n(n+1)(n+2)/3."
},
{ "question": "If log₂x + log₂(x − 2) = 3, then x is:",
"options": ["2", "3", "4", "6"],
"answer": 2,
"explanation": "Combine: log₂[x(x−2)] = 3 ⇒ x(x−2) = 8 ⇒ x² − 2x − 8 = 0 ⇒ (x−4)(x+2)=0 ⇒ x=4 (positive)."
},
{ "question": "If x + 1/x = 5, then x² + 1/x² is:",
"options": ["23", "24", "25", "27"],
"answer": 0,
"explanation": "Square: (x + 1/x)² = x² + 2 + 1/x² = 25 ⇒ x² + 1/x² = 23."
},
{ "question": "The equation 2x² − 5x + k = 0 has equal roots when k is:",
"options": ["15/4", "25/8", "25/4", "25/2"],
"answer": 1,
"explanation": "For equal roots, discriminant = 0: (−5)² − 4×2×k = 0 ⇒ 25 − 8k = 0 ⇒ k = 25/8."
},
{ "question": "The solution set of |2x − 3| < 5 is:",
"options": ["(−1, 4)", "(-1, 3)", "(−4, 1)", "(1, 4)"],
"answer": 0,
"explanation": "|2x−3| < 5 ⇒ −5 < 2x−3 < 5 ⇒ −2 < 2x < 8 ⇒ −1 < x < 4."
},
{ "question": "If x³ − 6x² + 11x − 6 = 0, one root is 1. The other two roots are:",
"options": ["1, 2", "2, 3", "−2, −3", "1, 3"],
"answer": 1,
"explanation": "Divide by (x−1): quadratic x² − 5x + 6 = 0 ⇒ (x−2)(x−3)=0 ⇒ roots 2 and 3."
},
{ "question": "The distance between points (1,2) and (4,6) is:",
"options": ["3", "4", "5", "7"],
"answer": 2,
"explanation": "d = √[(4−1)² + (6−2)²] = √[9 + 16] = √25 = 5."
},
{ "question": "The equation of the circle with center (2,−3) and radius 5 is:",
"options": ["(x−2)² + (y+3)² = 5", "(x−2)² + (y+3)² = 25", "(x+2)² + (y−3)² = 25", "(x−2)² + (y−3)² = 25"],
"answer": 1,
"explanation": "Circle: (x−h)² + (y−k)² = r² ⇒ (x−2)² + (y+3)² = 25."
},
{ "question": "In triangle ABC, AB = AC and ∠A = 40°. Then ∠B is:",
"options": ["40°", "50°", "70°", "80°"],
"answer": 2,
"explanation": "Isosceles: ∠B = ∠C. Sum: 40 + 2∠B = 180 ⇒ 2∠B = 140 ⇒ ∠B = 70°."
},
{ "question": "The area of a regular hexagon of side a is:",
"options": ["(3√3/2)a²", "3√3 a²", "(√3/4)a²", "6a²"],
"answer": 0,
"explanation": "Hexagon = 6 equilateral triangles of side a: 6 × (√3/4)a² = (3√3/2)a²."
},
{ "question": "A cylinder and a cone have the same base radius and same height. The ratio of their volumes is:",
"options": ["1:1", "2:1", "3:1", "1:3"],
"answer": 2,
"explanation": "V_cyl = πr²h, V_cone = (1/3)πr²h ⇒ ratio = 1 : 1/3 = 3:1."
},
{ "question": "If sinθ = 3/5 and θ is acute, then tanθ is:",
"options": ["3/4", "4/3", "5/3", "3/5"],
"answer": 0,
"explanation": "cosθ = 4/5 (3-4-5 triangle). tanθ = sin/cos = (3/5)/(4/5) = 3/4."
},
{ "question": "The mean of the data 2, 4, 6, 8, 10 is 6. If each value is increased by 3, the new mean is:",
"options": ["6", "7", "8", "9"],
"answer": 3,
"explanation": "Adding constant c to each value increases mean by c: 6 + 3 = 9."
},
{ "question": "The median of the data 3, 7, 9, 12, 15, 18, 20 is:",
"options": ["9", "10", "12", "15"],
"answer": 2,
"explanation": "Odd number of values (7), median is 4th value: 12."
},
{ "question": "A bar graph shows sales (in lakh) for 5 months: 10, 15, 20, 25, 30. The average monthly sales is:",
"options": ["18", "20", "22", "24"],
"answer": 1,
"explanation": "Sum = 10+15+20+25+30 = 100. Average = 100/5 = 20."
},
{ "question": "How many ways can 5 different books be arranged on a shelf if two particular books must always be together?",
"options": ["24", "48", "60", "120"],
"answer": 1,
"explanation": "Treat the pair as 1 unit: now 4 units ⇒ 4! arrangements. Within pair: 2! ways. Total = 4!×2! = 24×2 = 48."
},
{
question: "If 3x + 2y = 12 and 2x − y = 1, then x + y is:",
options: ["2", "3", "4", "5"],
answer: 3,
explanation: "From 2x − y = 1, y = 2x − 1. Substitute into 3x + 2y = 12: 3x + 2(2x−1)=12, so 7x=14 and x=2. Then y=3, so x+y=5."
},

{ "question": "A rectangle has length 3x and width x. If its area is 108, then its perimeter is:",
"options": ["36", "42", "48", "54"],
"answer": 2,
"explanation": "Area = 3x × x = 3x² = 108 ⇒ x² = 36 ⇒ x = 6. Length = 18, width = 6. Perimeter = 2(18+6) = 48."
},
{ "question": "If the standard deviation of a data set is 4, and each value is multiplied by 3, the new standard deviation is:",
"options": ["4", "7", "12", "16"],
"answer": 2,
"explanation": "Scaling by factor k multiplies SD by |k|: 4×3 = 12."
},
{ "question": "A pie chart shows expenditure: Rent 30%, Food 25%, Education 20%, Savings ?. If total income is Rs. 40,000, the amount saved is:",
"options": ["Rs. 8,000", "Rs. 10,000", "Rs. 12,000", "Rs. 15,000"],
"answer": 1,
"explanation": "Savings % = 100 − (30+25+20) = 25%. Amount = 25% of 40,000 = 10,000."
},
{ "question": "The value of 2³ × 2⁻⁵ is:",
"options": ["1/2", "1/4", "4", "8"],
"answer": 1,
"explanation": "2^(3−5) = 2^(−2) = 1/4."
},
{ "question": "If x : y = 2 : 3 and y : z = 4 : 5, then x : z is:",
"options": ["8:15", "2:5", "3:5", "6:5"],
"answer": 0,
"explanation": "Make y common: x:y = 8:12, y:z = 12:15 ⇒ x:z = 8:15."
},
{ "question": "A man travels 1/3 of a journey by car, 1/4 by bus, and the remaining 15 km by train. The total journey is:",
"options": ["30 km", "36 km", "40 km", "45 km"],
"answer": 1,
"explanation": "Let total = D. By car: D/3, by bus: D/4. Remaining = D − D/3 − D/4 = D(1 − 1/3 − 1/4) = D(12/12 − 4/12 − 3/12) = D(5/12) = 15 ⇒ D = 15×12/5 = 36 km."
},
{ "question": "The sum of interior angles of a polygon is 1440°. The number of sides is:",
"options": ["8", "9", "10", "11"],
"answer": 2,
"explanation": "Sum = (n−2)×180 = 1440 ⇒ n−2 = 8 ⇒ n = 10."
},
{
  question: "If 5 men or 8 women can complete a piece of work in 20 days, how long will 3 men and 4 women take to complete the same work?",
  options: ["15 days", "16 days", "200/11 days", "20 days"],
  answer: 2,
  explanation: "One man's daily work is 1/(5×20) = 1/100, and one woman's daily work is 1/(8×20) = 1/160. Therefore, 3 men and 4 women complete 3/100 + 4/160 = 3/100 + 1/40 = 11/200 of the work per day. Hence the required time is 200/11 days, approximately 18.18 days."
},

{
  question: "What least non-negative integer must be added to 1287 so that the result is exactly divisible by 9?",
  options: ["0", "1", "2", "3"],
  answer: 0,
  explanation: "The sum of the digits of 1287 is 1+2+8+7 = 18, which is divisible by 9. Therefore, 1287 is already divisible by 9, so the least number that must be added is 0."
},
{
  question: "The product of two positive numbers is 96 and the sum of their squares is 244. What is the square of their sum?",
  options: ["340", "388", "436", "484"],
  answer: 2,
  explanation: "Using (a+b)² = a²+b²+2ab, we get (a+b)² = 244 + 2(96) = 244 + 192 = 436."
},

{ "question": "The LCM of 12, 15 and 20 is:",
"options": ["40", "50", "60", "80"],
"answer": 2,
"explanation": "12=2²×3, 15=3×5, 20=2²×5. LCM = 2²×3×5 = 60."
},
{ "question": "If 2x − 3 < 5 and 3x + 1 > 10, then x lies in:",
"options": ["(3, 4)", "(4, 5)", "(2, 3)", "(1, 3)"],
"answer": 0,
"explanation": "2x − 3 < 5 ⇒ 2x < 8 ⇒ x < 4. 3x + 1 > 10 ⇒ 3x > 9 ⇒ x > 3. So 3 < x < 4."
},
{ "question": "The roots of x² − 7x + 12 = 0 are:",
"options": ["1, 12", "2, 6", "3, 4", "−3, −4"],
"answer": 2,
"explanation": "Factor: (x−3)(x−4)=0 ⇒ roots 3 and 4."
},
{ "question": "If the diagonal of a square is 10√2 cm, its area is:",
"options": ["50 cm²", "100 cm²", "150 cm²", "200 cm²"],
"answer": 1,
"explanation": "Diagonal d = a√2 ⇒ a = d/√2 = 10√2/√2 = 10. Area = a² = 100 cm²."
},
{ "question": "A car travels 60 km at 30 km/h and next 60 km at 60 km/h. The average speed for the whole journey is:",
"options": ["35 km/h", "40 km/h", "45 km/h", "50 km/h"],
"answer": 1,
"explanation": "Total distance = 120 km. Time = 60/30 + 60/60 = 2 + 1 = 3 h. Average speed = 120/3 = 40 km/h."
},
{ "question": "If the cost price of 12 pens equals the selling price of 15 pens, the loss percent is:",
"options": ["10%", "20%", "25%", "30%"],
"answer": 1,
"explanation": "Let CP of 1 pen = 1. CP of 12 = 12 = SP of 15 ⇒ SP of 1 = 12/15 = 0.8. Loss per pen = 1 − 0.8 = 0.2 ⇒ loss% = 20%."
},
{ "question": "A football team played P matches, won Q matches, and lost the remaining matches. The fraction representing the lost matches is:",
"options": ["\\frac{P-Q}{P}", "\\frac{Q}{P}", "\\frac{Q}{P-Q}", "\\frac{P}{P+Q}"],
"answer": 0,
"explanation": "Total matches = P, and won matches = Q. Therefore, lost matches = P − Q. So, fraction of lost matches = \frac{P-Q}{P}."
},
{
  "question": "If m and n are odd numbers, which of the following is always even?",
  "options": ["m+n", "m+n+1", "mn", "mn+2"],
  "answer": 0,
  "explanation": "The sum of two odd numbers is always even. Therefore, m+n is always even."
},
{
  question: "What least positive integer must be added to 1435 so that the result is exactly divisible by 9?",
  options: ["1", "4", "5", "8"],
  answer: 1,
  explanation: "The sum of the digits of 1435 is 1+4+3+5 = 13. Since 13 leaves remainder 4 when divided by 9, we must add 5 to the digit sum to reach 18. However, adding 5 to 1435 gives 1440, which is divisible by 9. Therefore, the required number is 5."
},
{
  "question": "\\frac{5}{4} of a certain number is 80. Half of that number is:",
  "options": ["24", "32", "40", "64"],
  "answer": 1,
  "explanation": "The number is 80 \\times \\frac{4}{5} = 64. Half of 64 is 32."
},
{
  "question": "In a division sum, the quotient is 85, the divisor is 324, and the remainder is 17. Find the dividend.",
  "options": ["27557", "27540", "27567", "27707"],
  "answer": 0,
  "explanation": "Dividend = Divisor \\times Quotient + Remainder = 324 \\times 85 + 17 = 27557."
},
{
  question: "For what value of K is the number 563K4 divisible by 8?",
  options: ["2", "4", "5", "6"],
  answer: 1,
  explanation: "A number is divisible by 8 if its last three digits are divisible by 8. For K=4, the last three digits are 344, and 344 ÷ 8 = 43. The other choices do not produce a number divisible by 8. Therefore, K = 4."
},
{
  "question": "If x and y are prime numbers greater than 2, which of the following must be true?\n1. x+y is even\n2. xy is odd\n3. x^2-y^2 is even",
  "options": ["1 only", "2 only", "1 and 2 only", "1, 2 and 3"],
  "answer": 3,
  "explanation": "Every prime number greater than 2 is odd. Therefore, all three statements must be true."
},
{
  "question": "How many natural numbers up to 400 are divisible by 17?",
  "options": ["21", "22", "23", "24"],
  "answer": 2,
  "explanation": "400 \\div 17 = 23 remainder 9. Therefore, there are 23 multiples of 17 up to 400."
},
{
  "question": "If n>0, which of the following must be true?\n1. n^2>1\n2. n-n^2<0\n3. 2n-1>0",
  "options": ["1 only", "3 only", "1 and 2 only", "None of these"],
  "answer": 3,
  "explanation": "Since n can be any positive number, such as \\frac{1}{2}, none of the three statements is always true."
},
{
  "question": "If p is an odd integer and 5p>40 and 2p<20, then p is:",
  "options": ["7", "9", "11", "13"],
  "answer": 1,
  "explanation": "The conditions give p>8 and p<10. The only odd integer between 8 and 10 is 9."
},
{
  question: "Two positive numbers have a product of 72 and the sum of their squares is 145. What is their sum?",
  options: ["15", "17", "19", "21"],
  answer: 1,
  explanation: "Using (a+b)² = a²+b²+2ab, we get (a+b)² = 145 + 2(72) = 145 + 144 = 289. Therefore, a+b = √289 = 17. Since the numbers are positive, their sum is 17."
},
{
  "question": "Two-thirds of one-fourth of a number is 50. The number is:",
  "options": ["200", "300", "400", "600"],
  "answer": 1,
  "explanation": "Two-thirds of one-fourth is \\frac{1}{6}. Therefore, the number is 50 \\times 6 = 300."
},
{
  "question": "Which one of the following is the largest three-digit prime number?",
  "options": ["997", "999", "991", "993"],
  "answer": 0,
  "explanation": "999 and 993 are divisible by 3, while 997 is prime and is greater than 991. Therefore, 997 is the largest."
},
{
  "question": "106 \\times 106 + 94 \\times 94 =",
  "options": ["21032", "20032", "20072", "23032"],
  "answer": 2,
  "explanation": "106^2=11236 and 94^2=8836. Their sum is 20072."
},
{
  "question": "The smallest five-digit number beginning with 4 and ending with 7 is:",
  "options": ["40007", "41007", "40017", "40107"],
  "answer": 0,
  "explanation": "The smallest five-digit number beginning with 4 is 40000. Changing its last digit to 7 gives 40007."
},

//stop

{
  question: "A student spends 2/5 of her monthly allowance. She then spends 1/4 of the remaining amount. What fraction of the original allowance is left?",
  options: ["3/10", "9/20", "1/2", "11/20"],
  answer: 1,
  explanation: "After spending 2/5, she has 3/5 left. She then spends 1/4 of 3/5 = 3/20. Amount left = 3/5 - 3/20 = 12/20 - 3/20 = 9/20."
},

{
  question: "The ratio of boys to girls in a group is 2:3. If 8 more boys join, the ratio becomes 4:3. How many students were originally in the group?",
  options: ["16", "20", "24", "30"],
  answer: 1,
  explanation: "Let boys = 2k and girls = 3k. Then (2k+8)/(3k) = 4/3. So 6k+24 = 12k, giving k=4. Original total = 2k+3k = 5k = 20."
},

{
  question: "A price is reduced by 15% and then the reduced price is increased by 20%. Compared with the original price, the final price is:",
  options: ["2% higher", "2% lower", "5% higher", "5% lower"],
  answer: 0,
  explanation: "Take the original price as 100. After a 15% reduction it becomes 85. Increasing 85 by 20% gives 85×1.20 = 102. The final price is therefore 2% higher than the original."
},

{
  question: "The average of 8 numbers is 15. If one of the numbers, 12, is replaced by 20, what is the new average?",
  options: ["15.5", "16", "16.5", "17"],
  answer: 1,
  explanation: "The original total is 8×15 = 120. Replacing 12 by 20 increases the total by 8, giving 128. New average = 128/8 = 16."
},

{
  question: "A tank is 2/3 full. After 18 liters are added, it becomes 5/6 full. What is the capacity of the tank?",
  options: ["72 L", "90 L", "108 L", "120 L"],
  answer: 2,
  explanation: "The increase is 5/6 - 2/3 = 5/6 - 4/6 = 1/6 of the tank. If 1/6 equals 18 liters, the full capacity is 18×6 = 108 liters."
},

{
  question: "A person's income increases by 25% while expenditure increases by 20%. Originally, the person spent 80% of the income. By what percentage do the savings increase?",
  options: ["25%", "35%", "40%", "45%"],
  answer: 3,
  explanation: "Let original income be 100. Expenditure = 80 and savings = 20. New income = 125 and new expenditure = 80×1.20 = 96. New savings = 29. Increase in savings = 9, so percentage increase = (9/20)×100 = 45%."
},

{
  question: "Three consecutive positive integers have a product of 336. What is their sum?",
  options: ["20", "21", "22", "24"],
  answer: 1,
  explanation: "The consecutive integers are 6, 7, and 8 because 6×7×8 = 336. Their sum is 6+7+8 = 21."
},

{
  question: "When a positive integer n is divided by 7, the remainder is 4. What is the remainder when 3n + 5 is divided by 7?",
  options: ["1", "2", "3", "5"],
  answer: 2,
  explanation: "Since n leaves remainder 4 modulo 7, 3n+5 leaves the same remainder as 3(4)+5 = 17. Since 17 = 2×7+3, the remainder is 3."
},

{
  question: "What is the units digit of 7^2026?",
  options: ["1", "3", "7", "9"],
  answer: 3,
  explanation: "The units digits of powers of 7 repeat every 4 terms: 7, 9, 3, 1. Since 2026 leaves remainder 2 when divided by 4, the units digit is the second number in the cycle, 9."
},

{
  question: "The sum of three consecutive multiples of 7 is 126. What is the largest of the three numbers?",
  options: ["42", "49", "56", "63"],
  answer: 1,
  explanation: "Let the numbers be 7n, 7(n+1), and 7(n+2). Their sum is 21n+21 = 126, so n=5. The numbers are 35, 42, and 49. The largest is 49."
},

{
  question: "If 2^(x+1) = 8^(x-1), then x is:",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "Since 8 = 2^3, we have 2^(x+1) = 2^(3x-3). Therefore x+1 = 3x-3. Hence 4 = 2x and x = 2."
},

{
  question: "If a + b = 12 and ab = 32, what is the value of a² + b²?",
  options: ["64", "72", "80", "96"],
  answer: 2,
  explanation: "Using (a+b)² = a²+b²+2ab, we get 144 = a²+b²+64. Therefore a²+b² = 80."
},

{
  question: "If x - y = 4 and xy = 21, what is the value of x² + y²?",
  options: ["42", "52", "58", "64"],
  answer: 2,
  explanation: "(x-y)² = x²+y²-2xy. Therefore 16 = x²+y²-42, so x²+y² = 58."
},

{
  question: "For what value of k does the system x + 2y = 7 and 3x + ky = 15 have the solution x = 3?",
  options: ["2", "3", "4", "6"],
  answer: 1,
  explanation: "Substitute x=3 into x+2y=7: 3+2y=7, so y=2. Now use 3x+ky=15: 9+2k=15, giving 2k=6 and k=3."
},

{
  question: "The arithmetic sequence 11, 17, 23, 29, ... has which term equal to 101?",
  options: ["14th", "15th", "16th", "17th"],
  answer: 2,
  explanation: "The nth term is 11+(n-1)6. Set it equal to 101: 11+6(n-1)=101. Thus 6(n-1)=90, so n-1=15 and n=16."
},

{
  question: "The third term of a geometric sequence is 12 and the fourth term is 36. If all terms are positive, what is the first term?",
  options: ["4/3", "2", "3", "4"],
  answer: 0,
  explanation: "The common ratio is 36/12 = 3. If the first term is a, then the third term is a×3² = 9a. Since 9a=12, a=12/9=4/3."
},

{
  question: "A two-digit number is 4 times the sum of its digits. If the tens digit is 3 less than the units digit, what is the number?",
  options: ["24", "36", "48", "63"],
  answer: 1,
  explanation: "Let the tens digit be t, so the units digit is t+3. The number is 10t+(t+3)=11t+3. The digit sum is 2t+3. Since 11t+3=4(2t+3), we get 11t+3=8t+12, so 3t=9 and t=3. The units digit is 6, so the number is 36."
},

{
  question: "A rectangle has a perimeter of 50 cm. Its length is 5 cm greater than its width. What is its area?",
  options: ["125 cm²", "150 cm²", "175 cm²", "200 cm²"],
  answer: 1,
  explanation: "Let width = w and length = w+5. Since 2(l+w)=50, l+w=25. Thus (w+5)+w=25, giving w=10 and l=15. Area = 10×15 = 150 cm²."
},

{
  question: "The sides of a right triangle are in the ratio 3:4:5. If its perimeter is 48 cm, what is its area?",
  options: ["72 cm²", "84 cm²", "96 cm²", "120 cm²"],
  answer: 2,
  explanation: "The ratio parts total 12, so each part is 48/12 = 4. The sides are 12, 16, and 20 cm. Area = 1/2 × 12 × 16 = 96 cm²."
},

{
  question: "A circle has circumference 44 cm. Using π = 22/7, what is its area?",
  options: ["77 cm²", "132 cm²", "154 cm²", "308 cm²"],
  answer: 2,
  explanation: "2πr=44, so 2×(22/7)×r=44, giving r=7 cm. Area = πr² = (22/7)×49 = 154 cm²."
},

{
  question: "A cube has total surface area 216 cm². What is its volume?",
  options: ["125 cm³", "180 cm³", "216 cm³", "343 cm³"],
  answer: 2,
  explanation: "For side length a, total surface area = 6a². Thus 6a²=216, so a²=36 and a=6. Volume = a³ = 216 cm³."
},

{
  question: "A point P divides the line segment joining A(2, 3) and B(8, 15) in the ratio 1:2 internally, so that AP:PB = 1:2. What are the coordinates of P?",
  options: ["(4, 7)", "(6, 9)", "(4, 9)", "(6, 11)"],
  answer: 0,
  explanation: "Since AP:PB=1:2, P lies one-third of the way from A to B. The change from A to B is (6,12), and one-third is (2,4). Therefore P=(2+2,3+4)=(4,7)."
},

{
  question: "A fair die is rolled twice. What is the probability that the sum of the two results is 9?",
  options: ["1/12", "1/9", "5/36", "1/6"],
  answer: 1,
  explanation: "There are 36 equally likely ordered outcomes. A sum of 9 occurs with (3,6), (4,5), (5,4), and (6,3): 4 outcomes. Probability = 4/36 = 1/9."
},

{
  question: "Two cards are chosen at random without replacement from cards numbered 1 through 5. What is the probability that their sum is even?",
  options: ["2/5", "1/2", "3/5", "7/10"],
  answer: 0,
  explanation: "The sum is even when both numbers have the same parity. There are 3 odd cards and 2 even cards. Favorable pairs = C(3,2)+C(2,2)=3+1=4. Total pairs = C(5,2)=10. Probability = 4/10 = 2/5."
},

{
  question: "A box contains 5 defective and 15 non-defective components. If one component is selected at random, what are the odds in favor of selecting a non-defective component?",
  options: ["1:3", "3:1", "1:4", "4:1"],
  answer: 1,
  explanation: "There are 15 favorable outcomes and 5 unfavorable outcomes. Odds in favor = 15:5 = 3:1."
},

{
  question: "How many different three-letter arrangements can be formed from the letters A, B, C, D, and E if repetition is not allowed and the arrangement must begin with A?",
  options: ["6", "12", "20", "24"],
  answer: 1,
  explanation: "A is fixed in the first position. The second position can be filled in 4 ways and the third in 3 ways. Total arrangements = 4×3 = 12."
},

{
  question: "A class has 12 students. In how many ways can a president and a vice-president be selected if one student cannot hold both positions?",
  options: ["66", "120", "132", "144"],
  answer: 2,
  explanation: "There are 12 choices for president and then 11 remaining choices for vice-president. Since the positions are different, total ways = 12×11 = 132."
},

{
  question: "If 40% of a number is 24 less than the number itself, what is the number?",
  options: ["30", "40", "50", "60"],
  answer: 1,
  explanation: "Let the number be x. Since 40% of x is 24 less than x, 0.4x = x - 24. Thus 0.6x = 24, giving x = 40."
},

{
  question: "A number is divided in the ratio 2:3:5. If the difference between the largest and smallest parts is 36, what is the original number?",
  options: ["90", "100", "120", "150"],
  answer: 2,
  explanation: "Let the parts be 2k, 3k, and 5k. The difference between largest and smallest is 3k = 36, so k = 12. The total is 10k = 120."
},

{
  question: "The average score of 12 students is 68. After the score of one additional student is included, the average becomes 70. What is the additional student's score?",
  options: ["82", "88", "94", "96"],
  answer: 2,
  explanation: "The original total is 12×68 = 816. The new total is 13×70 = 910. The additional student's score is 910 - 816 = 94."
},

{
  question: "A store offers a 20% discount on a Rs. 2,500 item and then charges 5% sales tax on the discounted price. What is the final price?",
  options: ["Rs. 2,000", "Rs. 2,050", "Rs. 2,100", "Rs. 2,125"],
  answer: 2,
  explanation: "After the 20% discount, the price is 2500×0.80 = Rs. 2,000. Sales tax is 5% of 2,000 = Rs. 100. Final price = Rs. 2,100."
},

{
  question: "A salary is increased from Rs. 48,000 to Rs. 54,000. What is the percentage increase?",
  options: ["10%", "12.5%", "15%", "16.67%"],
  answer: 1,
  explanation: "Increase = 54,000 - 48,000 = 6,000. Percentage increase = (6,000/48,000)×100 = 12.5%."
},

{
  question: "If 3^(x+2) = 27^(x-1), then x is:",
  options: ["2", "2.5", "3", "4"],
  answer: 1,
  explanation: "Since 27 = 3³, 3^(x+2) = 3^(3x-3). Equating exponents gives x+2 = 3x-3. Thus 5 = 2x and x = 2.5."
},

{
  question: "If x + y = 14 and x - y = 6, what is the value of xy?",
  options: ["32", "36", "40", "48"],
  answer: 2,
  explanation: "Adding the equations gives 2x = 20, so x = 10. Then y = 4. Therefore xy = 10×4 = 40."
},

{
  question: "If a/b = 3/5 and (a + 6)/(b + 6) = 2/3, what is the value of b?",
  options: ["15", "20", "25", "30"],
  answer: 3,
  explanation: "Let a=3k and b=5k. Then (3k+6)/(5k+6)=2/3. Cross-multiplying gives 9k+18=10k+12, so k=6. Therefore b=5×6=30."
},

{
  question: "The larger root of x² - 10x + 21 = 0 is:",
  options: ["3", "5", "7", "9"],
  answer: 2,
  explanation: "Factor the quadratic: x²-10x+21 = (x-3)(x-7). The roots are 3 and 7, so the larger root is 7."
},

{
  question: "If x² - 4x - 5 = 0, what is the sum of the reciprocals of its roots?",
  options: ["-4/5", "-1/5", "1/5", "4/5"],
  answer: 0,
  explanation: "If the roots are α and β, then α+β=4 and αβ=-5. Therefore 1/α + 1/β = (α+β)/(αβ) = 4/(-5) = -4/5."
},

{
  question: "The value of (√50 - √8)/√2 is:",
  options: ["1", "2", "3", "4"],
  answer: 2,
  explanation: "√50 = 5√2 and √8 = 2√2. Their difference is 3√2. Dividing by √2 gives 3."
},

{
  question: "If 4^x = 8, what is the value of 2^x?",
  options: ["√2", "2", "2√2", "4"],
  answer: 2,
  explanation: "4^x = (2²)^x = 2^(2x) = 2³, so 2x=3 and x=3/2. Therefore 2^x = 2^(3/2) = 2√2."
},

{
  question: "The first term of an arithmetic progression is 7 and its common difference is 5. What is the sum of its first 10 terms?",
  options: ["275", "285", "295", "305"],
  answer: 2,
  explanation: "S₁₀ = 10/2 × [2(7) + 9(5)] = 5×(14+45) = 5×59 = 295."
},

{
  question: "In a geometric progression, the first term is 2 and the common ratio is 3. What is the sum of the first 5 terms?",
  options: ["120", "162", "242", "486"],
  answer: 2,
  explanation: "The terms are 2, 6, 18, 54, and 162. Their sum is 242. Equivalently, S₅ = 2(3⁵-1)/(3-1) = 242."
},

{
  question: "A square and an equilateral triangle have equal perimeters. If the side of the square is 9 cm, what is the side of the triangle?",
  options: ["9 cm", "10 cm", "12 cm", "15 cm"],
  answer: 2,
  explanation: "The square's perimeter is 4×9 = 36 cm. An equilateral triangle with the same perimeter has side 36/3 = 12 cm."
},

{
  question: "The length of a rectangle is increased by 20% while its width is decreased by 10%. What is the percentage change in its area?",
  options: ["8% increase", "10% increase", "8% decrease", "10% decrease"],
  answer: 0,
  explanation: "The area is multiplied by 1.20×0.90 = 1.08. Therefore the new area is 108% of the original, an 8% increase."
},

{
  question: "The area of a sector with central angle 90° in a circle of radius 8 cm is:",
  options: ["8π cm²", "16π cm²", "24π cm²", "32π cm²"],
  answer: 1,
  explanation: "Sector area = (90/360)×π×8² = (1/4)×64π = 16π cm²."
},

{
  question: "A rectangular box has dimensions 3 cm, 4 cm, and 12 cm. What is the length of its space diagonal?",
  options: ["12 cm", "13 cm", "14 cm", "15 cm"],
  answer: 1,
  explanation: "The space diagonal is √(3²+4²+12²) = √(9+16+144) = √169 = 13 cm."
},

{
  question: "The midpoint of the line segment joining (-4, 6) and (8, -2) is:",
  options: ["(2, 2)", "(4, 2)", "(2, 4)", "(6, 2)"],
  answer: 0,
  explanation: "Midpoint = ((-4+8)/2, (6-2)/2) = (4/2, 4/2) = (2,2)."
},

{
  question: "What is the slope of the line passing through the points (2, -1) and (6, 7)?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "Slope = (7-(-1))/(6-2) = 8/4 = 2."
},

{
  question: "A fair coin is tossed three times. What is the probability of getting exactly two heads?",
  options: ["1/8", "1/4", "3/8", "1/2"],
  answer: 2,
  explanation: "There are 2³=8 equally likely outcomes. Exactly two heads occur in HHT, HTH, and THH, giving 3 favorable outcomes. Probability = 3/8."
},

{
  question: "A bag contains 3 red, 4 blue, and 5 green balls. One ball is selected at random. What is the probability that it is not blue?",
  options: ["1/3", "1/2", "2/3", "3/4"],
  answer: 2,
  explanation: "There are 12 balls in total. Non-blue balls = 3+5 = 8. Probability = 8/12 = 2/3."
},

{
  question: "How many diagonals does a regular octagon have?",
  options: ["16", "20", "24", "28"],
  answer: 1,
  explanation: "An n-sided polygon has n(n-3)/2 diagonals. For n=8, the number is 8×5/2 = 20."
},

{
  question: "How many different committees of 3 students can be selected from 7 students?",
  options: ["21", "28", "35", "42"],
  answer: 2,
  explanation: "Order does not matter, so use combinations: C(7,3) = 7!/(3!4!) = 35."
},

{
  question: "The mean of 6 numbers is 18. If the mean of the first 4 numbers is 15, what is the mean of the remaining 2 numbers?",
  options: ["21", "22", "23", "24"],
  answer: 3,
  explanation: "The total of all 6 numbers is 6×18 = 108. The first 4 total 4×15 = 60. The remaining two total 48, so their mean is 48/2 = 24."
},

{
  question: "A number is increased by 30% and becomes 91. What was the original number?",
  options: ["60", "65", "70", "75"],
  answer: 2,
  explanation: "Let the original number be x. Then 1.30x = 91, so x = 91/1.30 = 70."
},

{
  question: "In a class, the ratio of students who passed to those who failed is 7:2. If 6 more students had passed instead of failed, the ratio would become 5:1. How many students are in the class?",
  options: ["72", "90", "108", "126"],
  answer: 2,
  explanation: "Let passed = 7k and failed = 2k. If 6 students are shifted from the failed group to the passed group, then (7k+6)/(2k-6)=5. Thus 7k+6=10k-30, giving k=12. Total students = 9k = 108."
},

{
  question: "A merchant mixes 20 kg of rice costing Rs. 150 per kg with 30 kg of rice costing Rs. 200 per kg. What is the average cost per kg of the mixture?",
  options: ["Rs. 170", "Rs. 175", "Rs. 180", "Rs. 185"],
  answer: 2,
  explanation: "Total cost = 20×150 + 30×200 = 3000 + 6000 = Rs. 9000. Total weight = 50 kg. Average cost = 9000/50 = Rs. 180 per kg."
},

{
  question: "A quantity is divided between A and B so that A receives 40% more than B. If their total is 240, how much does A receive?",
  options: ["120", "130", "140", "150"],
  answer: 2,
  explanation: "Let B receive x. Then A receives 1.4x. Thus 2.4x=240, so x=100. Therefore A receives 140."
},

{
  question: "If 75% of x equals 60% of 150, what is x?",
  options: ["100", "110", "120", "125"],
  answer: 2,
  explanation: "60% of 150 = 90. Therefore 0.75x=90, giving x=120."
},

{
  question: "A three-digit number has hundreds digit 4. Its tens digit is twice its units digit, and the sum of its digits is 10. What is the number?",
  options: ["424", "442", "451", "460"],
  answer: 1,
  explanation: "Let the units digit be u. Then the tens digit is 2u. Since 4+2u+u=10, 3u=6 and u=2. The tens digit is 4, so the number is 442."
},

{
  question: "A positive integer leaves remainder 2 when divided by 5. What remainder does its square leave when divided by 5?",
  options: ["0", "1", "3", "4"],
  answer: 3,
  explanation: "Write the integer as 5k+2. Its square is 25k²+20k+4, which leaves remainder 4 when divided by 5."
},

{
  question: "What is the smallest positive integer that leaves remainder 1 when divided by 3 and remainder 2 when divided by 5?",
  options: ["7", "11", "17", "22"],
  answer: 0,
  explanation: "Numbers leaving remainder 2 when divided by 5 are 2, 7, 12, 17, .... Of these, 7 leaves remainder 1 when divided by 3. Therefore the smallest such integer is 7."
},

{
  question: "How many integers from 1 through 100 are divisible by 4 but not divisible by 8?",
  options: ["10", "12", "13", "25"],
  answer: 2,
  explanation: "There are floor(100/4)=25 multiples of 4 and floor(100/8)=12 multiples of 8. Therefore 25-12=13 integers are divisible by 4 but not by 8."
},

{
  question: "If n is an integer and n² is odd, which statement must be true?",
  options: [
    "n is even",
    "n is odd",
    "n is prime",
    "n is positive"
  ],
  answer: 1,
  explanation: "The square of an even integer is even. Therefore, if n² is odd, n itself must be odd. It need not be prime or positive."
},

{
  question: "If 5^(2x-1) = 125, then x is:",
  options: ["1", "2", "2.5", "3"],
  answer: 1,
  explanation: "Since 125=5³, equate exponents: 2x-1=3. Thus 2x=4 and x=2."
},

{
  question: "If √(x + 9) = 5, what is the value of x?",
  options: ["14", "16", "18", "25"],
  answer: 1,
  explanation: "Squaring both sides gives x+9=25. Therefore x=16."
},

{
  question: "If 1/x + 1/6 = 1/4, what is x?",
  options: ["8", "10", "12", "24"],
  answer: 2,
  explanation: "1/x = 1/4 - 1/6 = (3-2)/12 = 1/12. Therefore x=12."
},

{
  question: "If x/y = 4/7 and x + y = 55, what is the value of x?",
  options: ["15", "20", "25", "35"],
  answer: 1,
  explanation: "Let x=4k and y=7k. Then 11k=55, so k=5. Therefore x=20."
},

{
  question: "If x² + 6x + 9 = 49, what is the sum of all possible values of x?",
  options: ["-12", "-6", "0", "6"],
  answer: 1,
  explanation: "x²+6x+9=(x+3)². Thus (x+3)²=49, so x+3=±7. Therefore x=4 or x=-10. Their sum is -6."
},

{
  question: "The sum of the first 15 terms of an arithmetic sequence is 300. If the first term is 6, what is the 15th term?",
  options: ["30", "32", "34", "36"],
  answer: 2,
  explanation: "For an arithmetic sequence, Sₙ=n(a₁+aₙ)/2. Thus 300=15(6+a₁₅)/2. So 40=6+a₁₅, giving a₁₅=34."
},

{
  question: "In a geometric sequence, the second term is 6 and the fifth term is 162. If the common ratio is positive, what is the common ratio?",
  options: ["2", "3", "4", "6"],
  answer: 1,
  explanation: "If the first term is a and ratio is r, then ar=6 and ar⁴=162. Dividing gives r³=162/6=27. Therefore r=3."
},

{
  question: "A regular polygon has each exterior angle equal to 24°. How many sides does it have?",
  options: ["12", "15", "18", "20"],
  answer: 1,
  explanation: "The exterior angles of any polygon sum to 360°. Therefore the number of sides is 360/24=15."
},

{
  question: "A rectangle is inscribed in a circle. If the rectangle has sides 6 cm and 8 cm, what is the radius of the circle?",
  options: ["4 cm", "5 cm", "6 cm", "10 cm"],
  answer: 1,
  explanation: "The diagonal of an inscribed rectangle is the diameter of the circle. The diagonal is √(6²+8²)=10 cm. Therefore the radius is 10/2=5 cm."
},

{
  question: "The area of a trapezium with parallel sides 8 cm and 14 cm and height 6 cm is:",
  options: ["54 cm²", "60 cm²", "66 cm²", "72 cm²"],
  answer: 2,
  explanation: "Area = 1/2 × (sum of parallel sides) × height = 1/2×(8+14)×6 = 66 cm²."
},

{
  question: "A solid cube of side 6 cm is cut into smaller cubes of side 2 cm. How many smaller cubes are formed?",
  options: ["9", "18", "27", "36"],
  answer: 2,
  explanation: "Each edge is divided into 6/2=3 parts. Therefore the number of smaller cubes is 3³=27."
},

{
  question: "The line 2x + 3y = 12 crosses the y-axis at which point?",
  options: ["(0, 2)", "(0, 3)", "(0, 4)", "(0, 6)"],
  answer: 2,
  explanation: "On the y-axis, x=0. Then 3y=12, so y=4. Therefore the y-intercept is (0,4)."
},

{
  question: "What is the equation of the line with slope 3 passing through the point (2, 5)?",
  options: [
    "y = 3x - 1",
    "y = 3x + 1",
    "y = 2x + 3",
    "y = 5x - 3"
  ],
  answer: 0,
  explanation: "Using point-slope form, y-5=3(x-2). Thus y-5=3x-6, so y=3x-1."
},

{
  question: "A fair die is rolled once. Given that the result is greater than 2, what is the probability that it is even?",
  options: ["1/4", "1/3", "1/2", "3/4"],
  answer: 2,
  explanation: "Given that the result is greater than 2, the possible outcomes are {3,4,5,6}. The even outcomes are {4,6}, so the probability is 2/4=1/2."
},

{
  question: "A box contains 4 white and 6 black balls. Two balls are drawn without replacement. What is the probability that the first is white and the second is black?",
  options: ["2/15", "4/15", "1/3", "8/15"],
  answer: 1,
  explanation: "Probability of white first = 4/10. After that, 6 black balls remain among 9 balls, so probability of black second = 6/9. Thus probability = (4/10)(6/9)=24/90=4/15."
},

{
  question: "How many four-digit numbers can be formed using the digits 1, 2, 3, 4, and 5 without repetition if the number must begin with an odd digit?",
  options: ["48", "60", "72", "96"],
  answer: 2,
  explanation: "The first digit can be one of 1,3,5: 3 choices. The remaining three positions are filled from the remaining 4 digits without repetition: 4×3×2=24 ways. Total = 3×24=72."
},

{
  question: "From 8 students, how many different groups of 2 students can be formed?",
  options: ["16", "24", "28", "32"],
  answer: 2,
  explanation: "Since order does not matter, use combinations: C(8,2)=8×7/2=28."
},

{
  question: "The average of 10 observations is 24. It is later discovered that one observation was recorded as 35 instead of 53. What is the correct average?",
  options: ["24.8", "25.2", "25.8", "26.0"],
  answer: 2,
  explanation: "The recorded total was 10×24=240. Correcting 35 to 53 increases the total by 18, giving 258. Correct average = 258/10=25.8."
},

{
  question: "Three notebooks and two pens cost Rs. 460 altogether. If each notebook costs Rs. 120, what is the cost of one pen?",
  options: ["Rs. 40", "Rs. 50", "Rs. 60", "Rs. 70"],
  answer: 1,
  explanation: "Three notebooks cost 3×120 = Rs. 360. Therefore the two pens cost 460-360 = Rs. 100, so one pen costs Rs. 50."
},

{
  question: "Five identical machines produce 600 components in 8 hours. At the same rate, how many components will 8 machines produce in 6 hours?",
  options: ["640", "680", "720", "768"],
  answer: 2,
  explanation: "Five machines working for 8 hours give 40 machine-hours and produce 600 components, so the rate is 600/40 = 15 components per machine-hour. Eight machines for 6 hours give 48 machine-hours, producing 48×15 = 720 components."
},

{
  question: "If y varies directly as x and y = 18 when x = 6, what is y when x = 14?",
  options: ["36", "40", "42", "48"],
  answer: 2,
  explanation: "For direct variation, y=kx. Since 18=6k, k=3. Therefore when x=14, y=3×14=42."
},

{
  question: "If y varies inversely as x and y = 12 when x = 5, what is y when x = 8?",
  options: ["6", "7.5", "8", "9.6"],
  answer: 1,
  explanation: "For inverse variation, xy is constant. Thus 5×12 = 60. When x=8, y=60/8=7.5."
},

{
  question: "A 40-liter solution contains 30% acid. How many liters of water must be added so that acid becomes 20% of the resulting solution?",
  options: ["10 L", "15 L", "20 L", "24 L"],
  answer: 2,
  explanation: "The solution contains 0.30×40 = 12 liters of acid. Adding water does not change the acid amount. For 12 liters to be 20% of the final mixture, total volume must be 12/0.20 = 60 liters. Therefore 60-40 = 20 liters of water must be added."
},

{
  question: "The population of a town increases by 10% in one year and decreases by 10% the next year. Compared with the original population, the final population is:",
  options: ["1% lower", "Unchanged", "1% higher", "2% lower"],
  answer: 0,
  explanation: "Take the original population as 100. After a 10% increase it becomes 110. A 10% decrease then gives 110×0.90 = 99. Therefore the final population is 1% lower than the original."
},

{
  question: "If (x - 2)/3 + (x + 1)/2 = 13/2, what is x?",
  options: ["6", "7", "8", "9"],
  answer: 2,
  explanation: "Multiply by 6: 2(x-2)+3(x+1)=39. Thus 2x-4+3x+3=39, so 5x-1=39. Hence 5x=40 and x=8."
},

{
  question: "The equation |3x - 7| = 5 has two solutions. What is the sum of those solutions?",
  options: ["10/3", "4", "14/3", "5"],
  answer: 2,
  explanation: "Either 3x-7=5, giving x=4, or 3x-7=-5, giving x=2/3. Their sum is 4+2/3 = 14/3."
},

{
  question: "Which interval represents the solution of 2(3x - 1) ≤ 4x + 10?",
  options: ["x ≤ 6", "x ≥ 6", "x < 4", "x ≥ 4"],
  answer: 0,
  explanation: "Expand: 6x-2 ≤ 4x+10. Therefore 2x ≤ 12, giving x ≤ 6."
},

{
  question: "When f(x) = 2x³ - 3x² + 4x - 5 is divided by x - 2, what is the remainder?",
  options: ["3", "5", "7", "9"],
  answer: 2,
  explanation: "By the Remainder Theorem, the remainder is f(2). Thus f(2)=2(8)-3(4)+4(2)-5=16-12+8-5=7."
},

{
  question: "If f(x) = 3x - 4, what is f⁻¹(11)?",
  options: ["3", "4", "5", "7"],
  answer: 2,
  explanation: "To find f⁻¹(11), solve 3x-4=11. Then 3x=15, so x=5. Therefore f⁻¹(11)=5."
},

{
  question: "In an arithmetic sequence, the 5th term is 18 and the 9th term is 34. What is the first term?",
  options: ["2", "4", "6", "8"],
  answer: 0,
  explanation: "Let the first term be a and common difference d. Then a+4d=18 and a+8d=34. Subtracting gives 4d=16, so d=4. Therefore a+16=18 and a=2."
},

{
  question: "A sequence is defined by a₁ = 2 and aₙ = 2aₙ₋₁ + 1 for n > 1. What is a₅?",
  options: ["23", "31", "47", "63"],
  answer: 2,
  explanation: "Starting from 2: a₂=2(2)+1=5, a₃=11, a₄=23, and a₅=47."
},

{
  question: "Two similar triangles have corresponding side lengths in the ratio 3:5. What is the ratio of their areas?",
  options: ["3:5", "6:10", "9:25", "27:125"],
  answer: 2,
  explanation: "For similar figures, areas are proportional to the squares of corresponding lengths. Therefore the area ratio is 3²:5² = 9:25."
},

{
  question: "An exterior angle of a triangle is 125°. One of its two remote interior angles is 48°. What is the other remote interior angle?",
  options: ["67°", "72°", "77°", "83°"],
  answer: 2,
  explanation: "An exterior angle equals the sum of the two remote interior angles. Therefore 125° = 48° + x, giving x = 77°."
},

{
  question: "A semicircle has radius 7 cm. Using π = 22/7, what is its perimeter including the diameter?",
  options: ["22 cm", "28 cm", "36 cm", "44 cm"],
  answer: 2,
  explanation: "The curved part of the semicircle is πr = (22/7)×7 = 22 cm. The diameter is 14 cm. Total perimeter = 22+14 = 36 cm."
},

{
  question: "A closed cylinder has radius 3 cm and height 5 cm. What is its total surface area?",
  options: ["30π cm²", "39π cm²", "48π cm²", "60π cm²"],
  answer: 2,
  explanation: "Total surface area of a closed cylinder is 2πr(r+h). Substituting r=3 and h=5 gives 2π×3×8 = 48π cm²."
},

{
  question: "What is the distance of the point (-5, 7) from the y-axis?",
  options: ["5", "7", "12", "√74"],
  answer: 0,
  explanation: "The distance of a point (x,y) from the y-axis is |x|. Here |-5|=5."
},

{
  question: "Which equation represents a line parallel to y = 4x - 7 and passing through (2, 3)?",
  options: [
    "y = 4x - 5",
    "y = 4x + 5",
    "y = -4x + 11",
    "y = 2x - 1"
  ],
  answer: 0,
  explanation: "Parallel lines have the same slope, so the required slope is 4. Using y-3=4(x-2) gives y-3=4x-8, hence y=4x-5."
},

{
  question: "Two fair dice are rolled. What is the probability that at least one die shows a 6?",
  options: ["1/6", "5/18", "11/36", "1/3"],
  answer: 2,
  explanation: "It is easier to use the complement. The probability that neither die shows 6 is (5/6)²=25/36. Therefore the probability of at least one 6 is 1-25/36=11/36."
},

{
  question: "An integer is chosen at random from 1 through 30. What is the probability that it is divisible by 2 or by 5?",
  options: ["1/2", "3/5", "2/3", "7/10"],
  answer: 1,
  explanation: "There are 15 multiples of 2 and 6 multiples of 5. Multiples of both 2 and 5 are multiples of 10, of which there are 3. By inclusion-exclusion, favorable integers = 15+6-3=18. Probability = 18/30=3/5."
},

{
  question: "How many four-digit positive integers can be formed if repetition of digits is allowed?",
  options: ["1000", "8100", "9000", "10000"],
  answer: 2,
  explanation: "The first digit has 9 choices, from 1 through 9. Each of the remaining three digits has 10 choices, from 0 through 9. Therefore the total is 9×10×10×10 = 9000."
},

{
  question: "How many distinct arrangements can be made using all the letters of the word LEVEL?",
  options: ["20", "30", "60", "120"],
  answer: 1,
  explanation: "LEVEL has 5 letters, with L repeated twice and E repeated twice. The number of distinct arrangements is 5!/(2!×2!) = 120/4 = 30."
},

{
  question: "Group A contains 20 students with an average score of 70. Group B contains 30 students with an average score of 80. What is the average score of all 50 students?",
  options: ["74", "75", "76", "78"],
  answer: 2,
  explanation: "Group A's total score is 20×70=1400. Group B's total is 30×80=2400. Combined total = 3800. Combined average = 3800/50 = 76."
},

{
  question: "The values 4, 7, 9, 11, and 14 have a mean of 9. If a sixth value is added and the new mean becomes 10, what is the sixth value?",
  options: ["12", "13", "14", "15"],
  answer: 3,
  explanation: "The original total is 5×9=45. For six values to have mean 10, their total must be 60. Therefore the new value is 60-45=15."
},
{
  question: "A school has 480 students. If 35% are in the science group, how many students are not in the science group?",
  options: ["168", "288", "312", "336"],
  answer: 2,
  explanation: "If 35% are in the science group, then 65% are not. Therefore 0.65×480 = 312 students are not in the science group."
},

{
  question: "A quantity is increased from 160 to 200. By what percentage must 200 be decreased to return to 160?",
  options: ["16%", "20%", "25%", "40%"],
  answer: 1,
  explanation: "The required decrease is 200-160 = 40. As a percentage of 200, this is (40/200)×100 = 20%."
},

{
  question: "A total of Rs. 7,200 is divided among A, B, and C in the ratio 2:3:4. How much more does C receive than A?",
  options: ["Rs. 800", "Rs. 1,200", "Rs. 1,600", "Rs. 2,400"],
  answer: 2,
  explanation: "The ratio contains 2+3+4=9 parts. Each part is 7200/9 = Rs. 800. C receives 4×800=3200 and A receives 2×800=1600. The difference is Rs. 1,600."
},

{
  question: "The average of 7 numbers is 18. If the largest number, 30, is removed, what is the average of the remaining 6 numbers?",
  options: ["14", "15", "16", "17"],
  answer: 2,
  explanation: "The original total is 7×18 = 126. Removing 30 leaves 96. The new average is 96/6 = 16."
},

{
  question: "A worker's hourly wage rises by 15%, while the number of hours worked falls by 20%. What is the percentage change in total earnings?",
  options: ["8% decrease", "5% decrease", "5% increase", "8% increase"],
  answer: 0,
  explanation: "Total earnings are multiplied by 1.15×0.80 = 0.92. Therefore the worker earns 92% of the previous amount, an 8% decrease."
},

{
  question: "If a:b = 5:7 and b:c = 14:9, what is a:b:c?",
  options: ["5:7:9", "10:14:9", "10:7:9", "5:14:9"],
  answer: 1,
  explanation: "Make the b terms equal. Multiplying 5:7 by 2 gives a:b = 10:14. Since b:c = 14:9, the combined ratio is 10:14:9."
},

{
  question: "The difference between two positive numbers is 8 and their product is 105. What is their sum?",
  options: ["19", "21", "22", "23"],
  answer: 2,
  explanation: "The numbers are 15 and 7 because 15-7=8 and 15×7=105. Their sum is 22."
},

{
  question: "If 2x + 3y = 19 and x - y = 2, what is the value of x?",
  options: ["3", "4", "5", "6"],
  answer: 2,
  explanation: "From x-y=2, x=y+2. Substitute into 2x+3y=19: 2(y+2)+3y=19, so 5y+4=19 and y=3. Therefore x=5."
},

{
  question: "If (x + 2)(x - 5) = 0, what is the product of all possible values of x?",
  options: ["-10", "-7", "7", "10"],
  answer: 0,
  explanation: "The possible values are x=-2 and x=5. Their product is (-2)(5)=-10."
},

{
  question: "For what value of k is x = 4 a root of the equation x² - kx + 8 = 0?",
  options: ["4", "5", "6", "8"],
  answer: 2,
  explanation: "Substitute x=4: 16-4k+8=0. Thus 24-4k=0, so k=6."
},

{
  question: "If x is positive and x² = 12x, what is x?",
  options: ["0", "6", "12", "24"],
  answer: 2,
  explanation: "x²=12x gives x(x-12)=0. Thus x=0 or x=12. Since x is positive, x=12."
},

{
  question: "Simplify (3² × 3⁵) / 3⁴.",
  options: ["3", "9", "27", "81"],
  answer: 2,
  explanation: "Using exponent laws, 3²×3⁵/3⁴ = 3^(2+5-4) = 3³ = 27."
},

{
  question: "If √3 × √12 = k, what is k?",
  options: ["3", "6", "9", "12"],
  answer: 1,
  explanation: "√3×√12 = √36 = 6."
},

{
  question: "The 12th term of an arithmetic sequence is 41 and the common difference is 3. What is the first term?",
  options: ["5", "8", "11", "14"],
  answer: 1,
  explanation: "Using aₙ=a₁+(n-1)d, 41=a₁+11(3). Therefore a₁=41-33=8."
},

{
  question: "The first three terms of a geometric sequence are 81, 27, and 9. What is the sixth term?",
  options: ["1/9", "1/3", "1", "3"],
  answer: 1,
  explanation: "The common ratio is 1/3. The terms continue 81, 27, 9, 3, 1, 1/3. Therefore the sixth term is 1/3."
},

{
  question: "A square has the same area as a rectangle measuring 16 cm by 9 cm. What is the perimeter of the square?",
  options: ["36 cm", "42 cm", "48 cm", "52 cm"],
  answer: 2,
  explanation: "The rectangle's area is 16×9=144 cm². A square of area 144 has side √144=12 cm. Its perimeter is 4×12=48 cm."
},

{
  question: "A triangle has sides 7 cm, 24 cm, and 25 cm. What is its area?",
  options: ["72 cm²", "84 cm²", "96 cm²", "120 cm²"],
  answer: 1,
  explanation: "Since 7²+24²=49+576=625=25², the triangle is right-angled. Its area is 1/2×7×24=84 cm²."
},

{
  question: "The circumference of a circle is numerically equal to its area. What is its radius?",
  options: ["1", "2", "π", "4"],
  answer: 1,
  explanation: "Set circumference equal to area: 2πr=πr². For r>0, divide by πr to get r=2."
},

{
  question: "A cone has radius 3 cm and height 12 cm. What is its volume?",
  options: ["24π cm³", "36π cm³", "72π cm³", "108π cm³"],
  answer: 1,
  explanation: "Volume of a cone = (1/3)πr²h = (1/3)π×9×12 = 36π cm³."
},

{
  question: "The point (3, k) lies on the line y = 2x + 5. What is k?",
  options: ["8", "9", "10", "11"],
  answer: 3,
  explanation: "Substitute x=3 into y=2x+5: y=2(3)+5=11. Therefore k=11."
},

{
  question: "A line has slope -2 and y-intercept 6. At what x-coordinate does it cross the x-axis?",
  options: ["2", "3", "4", "6"],
  answer: 1,
  explanation: "The equation is y=-2x+6. At the x-axis, y=0. Thus 0=-2x+6, giving x=3."
},

{
  question: "A card is selected at random from cards numbered 1 through 20. What is the probability that the number is a multiple of 3 or 4?",
  options: ["2/5", "9/20", "1/2", "11/20"],
  answer: 2,
  explanation: "There are 6 multiples of 3 and 5 multiples of 4. The number 12 is a multiple of both, so by inclusion-exclusion there are 6+5-1=10 favorable numbers. Therefore the probability is 10/20=1/2."
},

{
  question: "Three fair coins are tossed. What is the probability of getting at least one tail?",
  options: ["1/8", "3/8", "7/8", "1"],
  answer: 2,
  explanation: "The complement of getting at least one tail is getting all heads. P(all heads)=(1/2)³=1/8. Therefore P(at least one tail)=1-1/8=7/8."
},

{
  question: "A password consists of one letter followed by two digits. The letter can be A, B, C, or D, and each digit can be 0 through 9. Repetition of digits is allowed. How many passwords are possible?",
  options: ["40", "100", "400", "4000"],
  answer: 2,
  explanation: "There are 4 choices for the letter, 10 choices for the first digit, and 10 choices for the second digit. Total passwords = 4×10×10=400."
},

{
  question: "How many ways can 4 students be selected from a group of 9 students?",
  options: ["84", "126", "252", "3024"],
  answer: 1,
  explanation: "Order does not matter, so use combinations: C(9,4)=9!/(4!5!)=(9×8×7×6)/(4×3×2×1)=126."
},

{
  question: "The numbers 5, 8, 8, 10, 14, 15, and 17 are arranged in ascending order. What is the difference between their median and their mode?",
  options: ["1", "2", "3", "4"],
  answer: 1,
  explanation: "There are 7 values, so the median is the 4th value, 10. The mode is 8 because it occurs twice. Difference = 10-8=2."
},

{
  question: "A data set has mean 20. If every value in the data set is transformed using y = 2x + 5, what is the mean of the transformed data?",
  options: ["25", "40", "45", "50"],
  answer: 2,
  explanation: "A linear transformation y=2x+5 transforms the mean in the same way. New mean = 2(20)+5=45."
},
{
  question: "A salesperson averages 36 sales per day for the first 4 days of a week. How many sales must be made on the fifth day to increase the 5-day average to 40?",
  options: ["48", "52", "56", "60"],
  answer: 2,
  explanation: "The first 4 days total 4×36 = 144 sales. To average 40 over 5 days, the total must be 5×40 = 200. Therefore the fifth-day sales must be 200-144 = 56."
},

{
  question: "How many positive integers less than or equal to 250 are multiples of 7?",
  options: ["34", "35", "36", "37"],
  answer: 1,
  explanation: "250/7 = 35 remainder 5. Therefore the multiples are 7, 14, ..., 245, giving 35 positive multiples of 7."
},

{
  question: "A positive integer leaves remainder 3 when divided by 8. What remainder will twice that integer plus 5 leave when divided by 8?",
  options: ["1", "2", "3", "5"],
  answer: 2,
  explanation: "Let the integer be 8k+3. Then 2(8k+3)+5 = 16k+11 = 8(2k+1)+3. Therefore the remainder is 3."
},

{
  question: "The ratio of the areas of two squares is 49:81. What is the ratio of their perimeters?",
  options: ["7:9", "7:81", "49:9", "49:81"],
  answer: 0,
  explanation: "The ratio of corresponding side lengths is the square root of the area ratio: √49:√81 = 7:9. Since the perimeter of a square is directly proportional to its side length, the ratio of their perimeters is also 7:9."
},

{
  question: "The point P(-3, 5) is reflected across the x-axis. What are the coordinates of its image?",
  options: ["(3, 5)", "(-3, -5)", "(3, -5)", "(-5, 3)"],
  answer: 1,
  explanation: "Reflection across the x-axis keeps the x-coordinate unchanged and changes the sign of the y-coordinate. Therefore (-3,5) becomes (-3,-5)."
},

{
  question: "A fair die is rolled three times. What is the probability that all three results are even?",
  options: ["1/6", "1/8", "1/4", "3/8"],
  answer: 1,
  explanation: "A die has 3 even outcomes out of 6, so the probability of an even result is 1/2. For three independent rolls, the probability that all are even is (1/2)³ = 1/8."
},

{
  question: "How many different arrangements of the letters A, B, C, D, and E are possible if A and B must not be next to each other?",
  options: ["48", "72", "96", "120"],
  answer: 1,
  explanation: "There are 5! = 120 total arrangements. If A and B are together, treat them as one block. The block and the other 3 letters can be arranged in 4! ways, and A and B can switch positions in 2 ways, giving 2×4! = 48 arrangements. Therefore the required number is 120-48 = 72."
},

{
  question: "The range of a data set is 12. If every value is multiplied by 3 and then increased by 5, what is the range of the new data set?",
  options: ["17", "31", "36", "41"],
  answer: 2,
  explanation: "Adding the same number to every value does not change the range. Multiplying every value by 3 multiplies the range by 3. Therefore the new range is 12×3 = 36."
},

{
  question: "A university received 800 applications. Of these, 520 applicants met the academic requirement, and 65% of those applicants passed the entrance test. How many applicants both met the academic requirement and passed the entrance test?",
  options: ["312", "338", "420", "520"],
  answer: 1,
  explanation: "The relevant group contains 520 applicants. Of these, 65% passed the entrance test. Therefore 0.65×520 = 338 applicants satisfied both conditions."
},

{
  question: "Two positive numbers have a sum of 20. What is the greatest possible value of their product?",
  options: ["80", "90", "100", "120"],
  answer: 2,
  explanation: "For two positive numbers with a fixed sum, the product is greatest when the numbers are equal. Therefore the numbers are 10 and 10, giving a maximum product of 10×10 = 100."
}
];