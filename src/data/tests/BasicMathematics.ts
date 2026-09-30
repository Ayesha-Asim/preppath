import type { Question } from "./types";

export const Questions: Question[] = [
{
"question": "A pipe can fill a tank in 12 hours while another pipe can fill the same tank in 18 hours. If both pipes are opened together but the second pipe is closed after 6 hours, how much total time will it take to fill the tank?",
"options": ["8 hours", "9 hours", "7 hours", "10 hours"],
"answer": 0,
"explanation": "Together, the pipes fill 1/12 + 1/18 = 5/36 of the tank per hour. In 6 hours they fill 6 × 5/36 = 5/6 of the tank, leaving 1/6. The first pipe alone fills 1/12 of the tank per hour, so it needs (1/6) ÷ (1/12) = 2 more hours. Total time = 6 + 2 = 8 hours."
},
{
"question": "A sum of money doubles itself in 8 years under simple interest. In how many years will it become 3 times itself at the same rate?",
"options": ["12 years", "16 years", "20 years", "24 years"],
"answer": 1,
"explanation": "If the money doubles in 8 years, then the interest earned in 8 years equals the principal. So the yearly simple interest is P/8. To become 3 times, the interest must equal 2P, which takes 2P ÷ (P/8) = 16 years."
},
{
"question": "If log2(x) + log2(x - 2) = 3, what is the value of x?",
"options": ["4", "6", "8", "10"],
"answer": 0,
"explanation": "Combine the logs: log2(x(x - 2)) = 3. So x(x - 2) = 2^3 = 8. This gives x^2 - 2x - 8 = 0, or (x - 4)(x + 2) = 0. Since x must be positive and x - 2 > 0, the valid solution is x = 4."
},
{
"question": "The HCF of two numbers is 6 and their LCM is 270. If one number is 54, what is the other?",
"options": ["30", "36", "45", "54"],
"answer": 0,
"explanation": "Use HCF × LCM = product of the two numbers. So 6 × 270 = 54 × x. Therefore x = 1620 ÷ 54 = 30."
},
{
"question": "An article is marked 40% above cost price and then sold after successive discounts of 10% and 20% on the marked price. What is the final profit or loss percentage?",
"options": ["Profit 0.8%", "Profit 4%", "Loss 2%", "Profit 8%"],
"answer": 0,
"explanation": "Let cost price be 100. Marked price becomes 140. After 10% discount, price is 126. After another 20% discount, selling price becomes 100.8. So profit = 0.8 on 100, which is 0.8%."
},
{
"question": "If a, b, c are in arithmetic progression, a + b + c = 27 and ab + bc + ca = 243, what is b?",
"options": ["7", "8", "9", "10"],
"answer": 2,
"explanation": "In an AP, the middle term is b and a + b + c = 3b. Since 3b = 27, we get b = 9. The second condition is consistent with this value."
},
{
"question": "The diagonal of a rectangle is 10 cm and one side is 6 cm. What is the area of the rectangle?",
"options": ["48 cm^2", "50 cm^2", "60 cm^2", "64 cm^2"],
"answer": 0,
"explanation": "Let the other side be x. By Pythagoras, x^2 + 6^2 = 10^2. So x^2 = 64 and x = 8. Area = 6 × 8 = 48 cm^2."
},
{
"question": "A bag contains red, blue and green balls in the ratio 3:4:5. If there are 36 balls in total, how many blue balls are there?",
"options": ["10", "12", "14", "16"],
"answer": 1,
"explanation": "Total parts = 3 + 4 + 5 = 12. Blue balls = 4/12 of 36 = 12."
},
{
"question": "If 3^x = 81, what is x?",
"options": ["2", "3", "4", "5"],
"answer": 2,
"explanation": "81 = 3^4, so 3^x = 3^4. Therefore x = 4."
},
{
  "question": "A train 240 m long crosses a man standing on a platform in 18 seconds. What is the speed of the train?",
  "options": ["13.33 m/s", "14 m/s", "15 m/s", "16 m/s"],
  "answer": 0,
  "explanation": "When a train crosses a man, it covers its own length. So speed = 240/18 = 13.33 m/s."
},
{
"question": "If (x + 1)/(x - 1) = 3/2, what is x?",
"options": ["3", "4", "5", "6"],
"answer": 2,
"explanation": "Cross-multiply: 2(x + 1) = 3(x - 1). So 2x + 2 = 3x - 3, giving x = 5."
},
{
"question": "The probability of getting a sum of 7 when two fair dice are rolled is:",
"options": ["1/6", "1/8", "1/9", "1/12"],
"answer": 0,
"explanation": "There are 6 favorable outcomes for sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total outcomes are 36. So probability = 6/36 = 1/6."
},
{
"question": "If x^2 - 5x + 6 = 0, what is the sum of the roots?",
"options": ["5", "6", "7", "8"],
"answer": 0,
"explanation": "For ax^2 + bx + c = 0, sum of roots = -b/a. Here a = 1 and b = -5, so sum = 5."
},
{
"question": "How many integers from 1 to 100 are divisible by 6?",
"options": ["15", "16", "17", "18"],
"answer": 1,
"explanation": "The number of multiples of 6 up to 100 is floor(100/6) = 16."
},
{
"question": "If the sum of the first n natural numbers is 210, what is n?",
"options": ["19", "20", "21", "22"],
"answer": 1,
"explanation": "Use n(n + 1)/2 = 210. So n(n + 1) = 420. Testing n = 20 gives 20 × 21 = 420, so n = 20."
},
{
"question": "Two angles of a triangle are in the ratio 2:3 and the third angle is 60°. What are the other two angles?",
"options": ["36° and 54°", "40° and 80°", "45° and 75°", "48° and 72°"],
"answer": 3,
"explanation": "Let the angles be 2k and 3k. Then 2k + 3k + 60 = 180. So 5k = 120 and k = 24. The angles are 48° and 72°."
},
{
"question": "A number leaves remainder 5 when divided by 7 and remainder 1 when divided by 9. What is the smallest such positive number?",
"options": ["19", "29", "39", "49"],
"answer": 0,
"explanation": "Test numbers congruent to 1 mod 9: 1, 10, 19, 28, ... Among these, 19 leaves remainder 5 when divided by 7. So the smallest number is 19."
},
{
"question": "If 1/(x + 1) + 1/(x + 2) = 1/2, what is the positive value of x?",
"options": [
  "(1 + √17)/2",
  "(1 - √17)/2",
  "1",
  "2"
],
"answer": 0,
"explanation": "Combining the fractions gives (2x+3)/[(x+1)(x+2)] = 1/2. This simplifies to x² − x − 4 = 0. The roots are (1 ± √17)/2. The positive root is (1 + √17)/2."
},
{
"question": "A shopkeeper uses a weight marked 1 kg, but the actual weight is 900 g. If he charges for 1 kg, what is his gain percentage?",
"options": ["10%", "11.11%", "12.5%", "9.09%"],
"answer": 1,
"explanation": "He gives 900 g but charges for 1000 g. Gain = (1000 - 900)/900 × 100 = 100/900 × 100 = 11.11%."
},
{
"question": "Solve: 2x - 3 < 5 and x + 4 >= 1.",
"options": ["x < 4", "-3 <= x < 4", "x >= -3", "-4 <= x < 4"],
"answer": 1,
"explanation": "From 2x - 3 < 5, we get x < 4. From x + 4 >= 1, we get x >= -3. Their intersection is -3 <= x < 4."
},
{
"question": "If a^3 + b^3 = 35 and a + b = 5, what is ab?",
"options": ["4", "5", "6", "7"],
"answer": 2,
"explanation": "Use a^3 + b^3 = (a + b)^3 - 3ab(a + b). So 35 = 125 - 15ab. Therefore 15ab = 90 and ab = 6."
},
{
"question": "The area of a circle is 154π cm^2. What is its radius?",
"options": ["√154 cm", "11 cm", "12 cm", "14 cm"],
"answer": 0,
"explanation": "Area = πr² = 154π. Therefore r² = 154 and r = √154 cm ≈ 12.41 cm."
},
{
"question": "A and B can complete a job in 12 and 15 days respectively. They work together for 4 days, then A leaves. How many more days will B take to finish the remaining work?",
"options": ["1 day", "2 days", "3 days", "4 days"],
"answer": 1,
"explanation": "A's rate = 1/12 and B's rate = 1/15. Together for 4 days, they finish 4(1/12 + 1/15) = 13/15 of the work. Remaining work = 2/15. B alone takes (2/15)/(1/15) = 2 days."
},
{
"question": "If the geometric mean of two positive numbers is 12 and their arithmetic mean is 13, what are the numbers?",
"options": ["8 and 18", "9 and 17", "10 and 16", "11 and 15"],
"answer": 0,
"explanation": "Let the numbers be x and y. Then x + y = 26 and xy = 144. Solving t^2 - 26t + 144 = 0 gives t = 8 and 18."
},
{
"question": "If 2/3 of a number is 24, what is 40% of that number?",
"options": ["12", "14.4", "16", "18"],
"answer": 1,
"explanation": "If 2/3 of the number is 24, the number is 24 × 3/2 = 36. Then 40% of 36 = 14.4."
},
{
"question": "The sum of interior angles of a polygon is 1260°. How many sides does it have?",
"options": ["8", "9", "10", "11"],
"answer": 1,
"explanation": "Use (n - 2) × 180 = 1260. Then n - 2 = 7 and n = 9."
},
{
"question": "If a^2 - b^2 = 21 and a - b = 3, what is a + b?",
"options": ["5", "6", "7", "8"],
"answer": 2,
"explanation": "a^2 - b^2 = (a - b)(a + b). So 3(a + b) = 21, which gives a + b = 7."
},
{
"question": "What is the probability of drawing a red card from a standard deck of 52 cards?",
"options": ["1/2", "1/3", "1/4", "1/13"],
"answer": 0,
"explanation": "There are 26 red cards in a 52-card deck. So probability = 26/52 = 1/2."
},
{
"question": "If the sides of a triangle are in the ratio 3:4:5 and its perimeter is 72, what is its area?",
"options": ["144", "180", "216", "240"],
"answer": 2,
"explanation": "The sides are 18, 24, and 30. Since it is a 3-4-5 right triangle, area = 1/2 × 18 × 24 = 216."
},
{
"question": "The sum of the digits of a two-digit number is 9. If the reversed number is 27 less than the original, what is the number?",
"options": ["54", "63", "72", "81"],
"answer": 1,
"explanation": "Let the number be 10x + y. Then x + y = 9 and (10x + y) - (10y + x) = 27. So 9x - 9y = 27, giving x - y = 3. Solving with x + y = 9 gives x = 6 and y = 3. The number is 63."
},
{
"question": "If (x - 2)(x - 3) = x, what are the values of x?",
"options": ["3 ± √3", "2 and 3", "1 and 6", "-1 and 6"],
"answer": 0,
"explanation": "Expand: x^2 - 5x + 6 = x. So x^2 - 6x + 6 = 0. Using the quadratic formula gives x = [6 ± √(36 - 24)]/2 = [6 ± √12]/2 = 3 ± √3."
},
{
"question": "A number is decreased by 30% and then increased by 30%. What is the final effect?",
"options": ["No change", "Decrease by 9%", "Increase by 9%", "Decrease by 6%"],
"answer": 1,
"explanation": "Take 100. After decreasing by 30%, it becomes 70. Increasing 70 by 30% gives 91. So the final value is 9% less than the original."
},
{
"question": "Two numbers are in the ratio 5:7 and their LCM is 175, with HCF 5. What are the numbers?",
"options": ["5 and 7", "10 and 14", "25 and 35", "35 and 49"],
"answer": 2,
"explanation": "Let the numbers be 5k and 7k. Since HCF is 5, k = 5 gives LCM = 35k = 175. Thus the numbers are 25 and 35."
},
{
"question": "What is the derivative of y = x^3 - 5x + 4 at x = 2?",
"options": ["5", "6", "7", "8"],
"answer": 2,
"explanation": "dy/dx = 3x^2 - 5. At x = 2, dy/dx = 3(4) - 5 = 7."
},
{
"question": "If sin θ = 3/5 and θ is in the first quadrant, what is cos θ?",
"options": ["3/5", "4/5", "5/3", "-4/5"],
"answer": 1,
"explanation": "Use sin^2 θ + cos^2 θ = 1. So cos θ = √(1 - 9/25) = √(16/25) = 4/5. In the first quadrant, cosine is positive."
},
{
"question": "If a biased coin has P(head) = 2/3, what is the probability of exactly two heads in three tosses?",
"options": ["4/27", "8/27", "12/27", "16/27"],
"answer": 2,
"explanation": "Use the binomial formula: C(3,2)(2/3)^2(1/3) = 3 × 4/9 × 1/3 = 12/27 = 4/9."
},
{
"question": "If set A = {1,2,3,4,5} and B = {4,5,6,7}, how many elements are in A ∩ B?",
"options": ["1", "2", "3", "4"],
"answer": 1,
"explanation": "The common elements are {4,5}. So |A ∩ B| = 2."
},
{
"question": "The average of five numbers is 12. If one number is removed and the new average becomes 11, what was the removed number?",
"options": ["14", "15", "16", "17"],
"answer": 2,
"explanation": "Original sum = 5 × 12 = 60. New sum after removing one number = 4 × 11 = 44. So the removed number = 60 - 44 = 16."
},
{
"question": "If (1/2)^x = 8, what is x?",
"options": ["-3", "3", "-4", "4"],
"answer": 0,
"explanation": "8 = 2^3. So (1/2)^x = 2^(-x) = 2^3. Therefore -x = 3 and x = -3."
},
{
"question": "A solid cylinder has radius 3 cm and height 10 cm. What is its volume in terms of π?",
"options": ["30π", "60π", "90π", "120π"],
"answer": 2,
"explanation": "Volume of a cylinder = πr^2h = π × 3^2 × 10 = 90π cm^3."
},
{
"question": "If x + y = 10 and xy = 21, what is x^2 + y^2?",
"options": ["52", "58", "60", "64"],
"answer": 1,
"explanation": "Use x^2 + y^2 = (x + y)^2 - 2xy = 10^2 - 2(21) = 100 - 42 = 58."
},
{
"question": "Solve 4^(x - 1) = 8.",
"options": ["1.5", "2", "2.5", "3"],
"answer": 2,
"explanation": "Write both sides in base 2: 4 = 2^2 and 8 = 2^3. Then 4^(x - 1) = (2^2)^(x - 1) = 2^(2x - 2). Equate exponents: 2x - 2 = 3, so x = 2.5."
},
{
"question": "The mean of six numbers is 15. If each number is increased by 10%, what is the new mean?",
"options": ["16", "16.5", "17", "17.5"],
"answer": 1,
"explanation": "If every number increases by 10%, the mean also increases by 10%. So new mean = 15 × 1.1 = 16.5."
},
{
"question": "If the area ratio of two similar triangles is 9:16 and a side of the smaller triangle is 6 cm, what is the corresponding side of the larger triangle?",
"options": ["7 cm", "8 cm", "9 cm", "12 cm"],
"answer": 1,
"explanation": "For similar triangles, side ratio is the square root of area ratio. So side ratio = 3:4. If 6 cm corresponds to the smaller triangle, the larger side = 6 × 4/3 = 8 cm."
},
{
"question": "A geometric sequence has first term 2 and common ratio 3. What is the sum of the first 4 terms?",
"options": ["80", "82", "84", "86"],
"answer": 0,
"explanation": "The first four terms are 2, 6, 18, 54. Their sum is 2 + 6 + 18 + 54 = 80."
},
{
"question": "If 5 workers complete a job in 12 days, how many workers are needed to complete it in 8 days?",
"options": ["6", "7", "8", "9"],
"answer": 2,
"explanation": "Workers and days are inversely proportional. Required workers = 5 × 12/8 = 7.5, so 8 workers are needed."
},
{
"question": "If the sum of reciprocals of two consecutive positive integers is 5/6, what are the integers?",
"options": ["1 and 2", "2 and 3", "3 and 4", "4 and 5"],
"answer": 1,
"explanation": "Let the integers be n and n + 1. Then 1/n + 1/(n + 1) = 5/6. Testing n = 2 gives 1/2 + 1/3 = 5/6. So the integers are 2 and 3."
},
{
"question": "If a die is rolled twice, what is the probability that the sum is 7?",
"options": ["1/6", "1/8", "1/9", "1/12"],
"answer": 0,
"explanation": "There are 6 favorable outcomes out of 36 possible outcomes. So probability = 6/36 = 1/6."
},
{
"question": "If |A| = 20, |B| = 15, and |A ∪ B| = 28, what is |A ∩ B|?",
"options": ["5", "6", "7", "8"],
"answer": 2,
"explanation": "Use |A ∪ B| = |A| + |B| - |A ∩ B|. So 28 = 20 + 15 - x. Hence x = 7."
},
{
    "question": "A car covers the first half of a journey at 14 km/h and the second half at 35 km/h. What is its average speed for the whole journey?",
    "options": ["24.5 km/h", "20 km/h", "17 km/h", "10 km/h"],
    "answer": 1,
    "explanation": "For equal distances, average speed = 2v1v2/(v1 + v2) = 2 × 14 × 35/(14 + 35) = 20 km/h."
},
  {
    "question": "What is the difference between the compound interest and the simple interest on Rs. 5200 for 2 years at 15% per annum?",
    "options": ["Rs. 897", "Rs. 58.5", "Rs. 234", "Rs. 117"],
    "answer": 3,
    "explanation": "For 2 years, CI − SI = P(r/100)^2 = 5200 × (15/100)^2 = 5200 × 225/10000 = Rs. 117."
  },
  {
    "question": "Two fair dice are rolled together. What is the probability that the sum of the two numbers is a multiple of 4?",
    "options": ["2/9", "5/18", "0.25", "1/3"],
    "answer": 2,
    "explanation": "Counting the outcomes among the 36 equally likely ones for which the sum of the two numbers is a multiple of 4 gives 9 favourable outcomes. Probability = 9/36 = 0.25."
  },
  {
    "question": "The side of a rhombus is 15 cm and one diagonal is 18 cm. Find its area.",
    "options": ["225 cm^2", "144 cm^2", "216 cm^2", "432 cm^2"],
    "answer": 2,
    "explanation": "Half of the known diagonal = 9 cm, so half of the other = √(15² − 9²) = 12 cm and the other diagonal = 24 cm. Area = ½ × 18 × 24 = 216 cm²."
  },
  {
    "question": "One root of the equation x^2 + kx + 28 = 0 is -7. Find the value of k.",
    "options": ["11", "-10", "28", "35"],
    "answer": 0,
    "explanation": "The product of roots = 28, so the other root = 28/-7 = -4. The sum of roots = −k, so k = −(-7 + -4) = 11."
  },
  {
    "question": "If 5x + 4y = 53 and 1x + 2y = 13, find the value of 4x - 1y.",
    "options": ["38", "35", "-1", "34"],
    "answer": 3,
    "explanation": "Solving the two equations (eliminating one variable) gives x = 9 and y = 2. Therefore 4x - 1y = 4(9) - 1(2) = 34."
  },
  {
    "question": "Find the length of an arc that subtends an angle of 150° at the centre of a circle of radius 9 cm. (Give the answer in terms of π.)",
    "options": ["15π cm", "7.5π cm", "33.75π cm", "18π cm"],
    "answer": 1,
    "explanation": "Arc length = (θ/360) × 2πr = (150/360) × 2π × 9 = 7.5π cm."
  },
  {
    "question": "If log2(x) + log2(x − 28) = 7, what is the value of x?",
    "options": ["4", "128", "60", "32"],
    "answer": 3,
    "explanation": "Combine: log2[x(x − 28)] = 7, so x(x − 28) = 2^7 = 128. Then x^2 − 28x − 128 = 0, i.e. (x − 32)(x + 4) = 0. Since x > 28, the valid root is x = 32."
  },
  {
    "question": "Find the fourth proportional to 5, 6 and 10.",
    "options": ["3", "12", "15", "10"],
    "answer": 1,
    "explanation": "a : b = c : x gives x = bc/a = 6×10/5 = 12."
  },
  {
    "question": "The length of a rectangle is increased by 40% and its breadth is decreased by 30%. What is the net effect on its area?",
    "options": ["Increase of 5%", "Increase of 10%", "Decrease of 2%", "Increase of 2%"],
    "answer": 2,
    "explanation": "Take original area = 100. New area = 100 × 140/100 × 70/100 = 98. Hence the area shows a decrease of 2%."
  },
  {
    "question": "Two fair dice are rolled together. What is the probability that the product of the two numbers is even?",
    "options": ["0.75", "0.25", "13/18", "7/9"],
    "answer": 0,
    "explanation": "Counting the outcomes among the 36 equally likely ones for which the product of the two numbers is even gives 27 favourable outcomes. Probability = 27/36 = 0.75."
  },
  {
    "question": "How many terms of the geometric series 1 + 4 + 16 + ... must be taken to get a sum of 5461?",
    "options": ["7", "6", "8", "9"],
    "answer": 0,
    "explanation": "S_n = a(r^n − 1)/(r − 1) = 1(r^n − 1)/3 = 5461, so 4^n = 16384 = 4^7. Hence n = 7."
  },
  {
    "question": "Find the length of an arc that subtends an angle of 120° at the centre of a circle of radius 18 cm. (Give the answer in terms of π.)",
    "options": ["24π cm", "108π cm", "12π cm", "36π cm"],
    "answer": 2,
    "explanation": "Arc length = (θ/360) × 2πr = (120/360) × 2π × 18 = 12π cm."
  },
  {
    "question": "The two legs of a right-angled triangle measure 12 cm and 5 cm. Find the radius of its inscribed circle.",
    "options": ["6.5 cm", "7.5 cm", "2 cm", "5 cm"],
    "answer": 2,
    "explanation": "The hypotenuse is √(12² + 5²) = 13 cm. Inradius = (a + b − c)/2 = (12 + 5 − 13)/2 = 2 cm."
  },
  {
    "question": "A can finish a piece of work in 18 days and B can finish it in 36 days. They work on alternate days, beginning with A. In how many days will the work be completed?",
    "options": ["25 days", "24 days", "12 days", "26 days"],
    "answer": 1,
    "explanation": "In every 2-day cycle they complete 1/18 + 1/36 = 1/12 of the work. After 12 cycles (24 days) 1 is done, leaving 0. Nothing remains, so the work ends on day 24."
  },
  {
    "question": "A starts a business with Rs. 20000. After 3 months, B joins with Rs. 90000. At the end of the year the total profit is Rs. 17500. What is B's share of the profit?",
    "options": ["Rs. 4000", "Rs. 14500", "Rs. 13500", "Rs. 8750"],
    "answer": 2,
    "explanation": "A's capital-time = 20000 × 12 and B's = 90000 × 9. Ratio A : B = 8 : 27. B's share = 17500 × 27/35 = Rs. 13500."
  },
  {
    "question": "A convex polygon has 209 diagonals. How many sides does it have?",
    "options": ["23", "22", "20", "21"],
    "answer": 1,
    "explanation": "n(n − 3)/2 = 209, so n² − 3n − 418 = 0, i.e. (n − 22)(n + 19) = 0. Hence n = 22."
  },
  {
    "question": "Find the remainder when x^3 - x^2 + 4x + 4 is divided by (x + 2).",
    "options": ["16", "4", "-18", "-16"],
    "answer": 3,
    "explanation": "By the remainder theorem, the remainder is f(-2) = 1(-2)³ + (-1)(-2)² + (4)(-2) + (4) = -16."
  },
  {
    "question": "A is 2 times as efficient as B, so A alone can finish a job 12 days sooner than B alone. In how many days can they finish it together?",
    "options": ["10 days", "8 days", "24 days", "12 days"],
    "answer": 1,
    "explanation": "A takes B/2 days. B − B/2 = 12 gives B = 24 days and A = 12 days. Together: 24/(2+1) = 8 days."
  },
  {
    "question": "If 2^(x + 1) + 2^x = 48, find the value of x.",
    "options": ["4", "6", "5", "3"],
    "answer": 0,
    "explanation": "Factor out 2^x: 2^x(2^1 + 1) = 2^x × 3 = 48. So 2^x = 16, giving x = 4."
  },
  {
    "question": "In a class of 72 students, 24 study Computer Science, 24 study Chemistry and 31 study Biology. 10 study both Computer Science and Chemistry, 10 study both Chemistry and Biology, 10 study both Biology and Computer Science, and 5 study all three subjects. How many students study exactly two of the subjects?",
    "options": ["15", "30", "12", "20"],
    "answer": 0,
    "explanation": "Exactly two = (pairwise intersections) − 3(triple intersection) = (10 + 10 + 10) − 3(5) = 15."
  },
  {
    "question": "If sin θ + cos θ = 1.25, find the value of sin⁴θ + cos⁴θ.",
    "options": ["431/512", "7/16", "593/512", "943/1024"],
    "answer": 0,
    "explanation": "sinθ cosθ = (25/16 − 1)/2 = 9/32. Then sin⁴θ + cos⁴θ = 1 − 2(sinθ cosθ)² = 1 − 2(81/1024) = 431/512."
  },
  {
    "question": "How many trailing zeros does 587! have?",
    "options": ["117", "58", "145", "144"],
    "answer": 3,
    "explanation": "Trailing zeros = number of factors of 5 = ⌊587/5⌋ + ⌊587/25⌋ + ... = 117 + 23 + 4 = 144."
  },
  {
    "question": "In an election between two candidates, 8% of the votes cast were invalid. The winner secured 75% of the valid votes and won by a margin of 4600 votes. How many votes were cast in total?",
    "options": ["10000", "20000", "9200", "11000"],
    "answer": 0,
    "explanation": "Let the total be T. Valid votes = 92% of T. Margin = (75 − 25)% of valid votes = 50% × 92% × T = 4600. Solving gives T = 10000."
  },
  {
    "question": "y varies directly as the square of x and inversely as z. If y = 196 when x = 7 and z = 1, find y when x = 4 and z = 1.",
    "options": ["112", "64", "16", "68"],
    "answer": 1,
    "explanation": "y = kx²/z. From the first case k = y·z/x² = 196×1/49 = 4. Then y = 4×16/1 = 64."
  },
  {
    "question": "Find the amount on Rs. 40000 after 2 years at 20% per annum compounded half-yearly.",
    "options": ["Rs. 58564", "Rs. 57600", "Rs. 82944", "Rs. 56000"],
    "answer": 0,
    "explanation": "Rate per half-year = 10% and number of half-years = 4. Amount = 40000 × (1 + 0.1)^4 = Rs. 58564."
  },
  {
    "question": "If (x + 3) is a factor of x^3 + px^2 + 7x - 6, find the value of p.",
    "options": ["4", "6", "-18", "7"],
    "answer": 1,
    "explanation": "By the factor theorem, substituting x = -3: (-3)³ + p(-3)² + (7)(-3) + (-6) = 0, so 9p = 54 and p = 6."
  },
  {
    "question": "For what value of k is the line 6x + 1y = 13 parallel to the line kx + 1y = 7?",
    "options": ["8", "-6", "1", "6"],
    "answer": 3,
    "explanation": "Slopes must be equal: −6/(1) = −k/(1), so k = 6(1)/(1) = 6."
  },
  {
    "question": "If sin θ + cos θ = 2/3, find the value of sin θ cos θ.",
    "options": ["5/18", "-5/18", "-5/9", "13/18"],
    "answer": 1,
    "explanation": "Square both sides: 1 + 2 sinθ cosθ = 4/9, so sinθ cosθ = (4/9 − 1)/2 = -5/18."
  },
  {
    "question": "If log3(x) + log3(x − 8) = 2, what is the value of x?",
    "options": ["1", "9", "17", "8"],
    "answer": 1,
    "explanation": "Combine: log3[x(x − 8)] = 2, so x(x − 8) = 3^2 = 9. Then x^2 − 8x − 9 = 0, i.e. (x − 9)(x + 1) = 0. Since x > 8, the valid root is x = 9."
  },
  {
    "question": "A straight line passes through the points (7, 10) and (10, 13). What is its y-intercept?",
    "options": ["17", "4", "-3", "3"],
    "answer": 3,
    "explanation": "Slope = (13 − 10)/(10 − 7) = 1. Using y = 1x + c at (7, 10): c = 10 − (1)(7) = 3."
  },
  {
    "question": "If 25 April 2008 was a Friday, what day of the week will 12 November 2025 be?",
    "options": ["Tuesday", "Wednesday", "Saturday", "Sunday"],
    "answer": 1,
    "explanation": "The number of days between the two dates is 6410, which leaves remainder 5 when divided by 7 (leap years included). Counting 5 day(s) forward from Friday gives Wednesday."
  },
  {
    "question": "If 3^(x + 3) + 3^x = 6804, find the value of x.",
    "options": ["5", "6", "3", "7"],
    "answer": 0,
    "explanation": "Factor out 3^x: 3^x(3^3 + 1) = 3^x × 28 = 6804. So 3^x = 243, giving x = 5."
  },
  {
    "question": "Find the perpendicular distance of the point (7, -3) from the line 3x + 4y - 14 = 0.",
    "options": ["5/7 units", "5 units", "1 unit", "2 units"],
    "answer": 2,
    "explanation": "Distance = |ax0 + by0 + c|/√(a² + b²) = |3(7) + (4)(-3) + (-14)|/√(3² + 4²) = 5/5 = 1 units."
  },
  {
    "question": "Three positive numbers are in geometric progression. Their sum is 78 and their product is 5832. Find the largest of the three numbers.",
    "options": ["60", "18", "54", "48"],
    "answer": 2,
    "explanation": "Write the numbers as a/r, a, ar. Product a³ = 5832, so a = 18. Then 18(1/r + 1 + r) = 78 gives r = 3. The numbers are 6, 18, 54, and the largest is 54."
  },
  {
    "question": "Given log 2 = 0.3010 and log 3 = 0.4771 (base 10), find log 8100. Use log 5 = 1 − log 2.",
    "options": ["3.9084", "3.5562", "2.5104", "3.1124"],
    "answer": 0,
    "explanation": "8100 = 2^2 × 3^4 × 5^2. So log 8100 = 2(0.3010) + 4(0.4771) + 2(0.6990) = 3.9084."
  },
  {
    "question": "The length of a rectangle is increased by 50% and its breadth is decreased by 50%. What is the net effect on its area?",
    "options": ["Increase of 0%", "Decrease of 22%", "Decrease of 25%", "Increase of 25%"],
    "answer": 2,
    "explanation": "Take original area = 100. New area = 100 × 150/100 × 50/100 = 75. Hence the area shows a decrease of 25%."
  },
  {
    "question": "Evaluate: 1 sin^2 60° + 2 cos^2 45° + 3 tan^2 30°",
    "options": ["2.5", "2.75", "3.25", "3.75"],
    "answer": 1,
    "explanation": "sin²60° = 3/4, cos²45° = 1/2, tan²30° = 1/3. Value = 1(3/4) + 2(1/2) + 3(1/3) = 2.75."
  },
  {
    "question": "A train takes 20 seconds to pass a signal pole and 40 seconds to cross a platform 300 m long. What is the length of the train?",
    "options": ["150 m", "338 m", "300 m", "600 m"],
    "answer": 2,
    "explanation": "The extra 40 − 20 = 20 s is spent covering the platform's 300 m, so speed = 300/20 = 15 m/s. Length of train = 15 × 20 = 300 m."
  },
  {
    "question": "A solid metal cylinder of radius 9 cm and height 15 cm is melted and recast into identical cones, each of radius 3 cm and height 5 cm. How many cones are obtained?",
    "options": ["84", "27", "162", "81"],
    "answer": 3,
    "explanation": "Number = volume of cylinder ÷ volume of a cone = π(9)²(15) ÷ [(1/3)π(3)²(5)] = 3 × 1215/45 = 81."
  },
  {
    "question": "If α and β are the roots of x^2 + 12x + 35 = 0, find α² + β².",
    "options": ["214", "74", "109", "4"],
    "answer": 1,
    "explanation": "α + β = -12 and αβ = 35. So α² + β² = (α + β)² − 2αβ = -12² − 2(35) = 74."
  },
  {
    "question": "A is 4 times as efficient as B. Working together they finish a task in 12 days. How many days will A alone take?",
    "options": ["10 days", "60 days", "48 days", "15 days"],
    "answer": 3,
    "explanation": "Let B alone take x days; then A takes x/4 days. 1/x + 4/x = 1/12 gives x = 60. So A alone takes 60/4 = 15 days."
  },
  {
    "question": "Three positive numbers are in geometric progression. Their sum is 105 and their product is 8000. Find the largest of the three numbers.",
    "options": ["80", "20", "75", "85"],
    "answer": 0,
    "explanation": "Write the numbers as a/r, a, ar. Product a³ = 8000, so a = 20. Then 20(1/r + 1 + r) = 105 gives r = 4. The numbers are 5, 20, 80, and the largest is 80."
  },
  {
    "question": "How many trailing zeros does 1036! have?",
    "options": ["207", "257", "258", "103"],
    "answer": 1,
    "explanation": "Trailing zeros = number of factors of 5 = ⌊1036/5⌋ + ⌊1036/25⌋ + ... = 207 + 41 + 8 + 1 = 257."
  },
  {
    "question": "A solid metal cylinder of radius 2 cm and height 3 cm is melted and recast into identical cones, each of radius 1 cm and height 1 cm. How many cones are obtained?",
    "options": ["12", "72", "36", "18"],
    "answer": 2,
    "explanation": "Number = volume of cylinder ÷ volume of a cone = π(2)²(3) ÷ [(1/3)π(1)²(1)] = 3 × 12/1 = 36."
  },
  {
    "question": "How many trailing zeros does 629! have?",
    "options": ["157", "62", "156", "125"],
    "answer": 2,
    "explanation": "Trailing zeros = number of factors of 5 = ⌊629/5⌋ + ⌊629/25⌋ + ... = 125 + 25 + 5 + 1 = 156."
  },
  {
    "question": "A circle has radius 15 cm. Find the length of a chord that lies 9 cm from the centre.",
    "options": ["18 cm", "24 cm", "21 cm", "12 cm"],
    "answer": 1,
    "explanation": "Half the chord = √(15² − 9²) = √144 = 12 cm. The chord is 2 × 12 = 24 cm."
  },
  {
    "question": "A car covers the first half of a journey at 60 km/h and the second half at 120 km/h. What is its average speed for the whole journey?",
    "options": ["77 km/h", "80 km/h", "82 km/h", "90 km/h"],
    "answer": 1,
    "explanation": "For equal distances, average speed = 2v1v2/(v1 + v2) = 2 × 60 × 120/(60 + 120) = 80 km/h."
  },
  {
    "question": "A solid metallic sphere of radius 15 cm is melted and drawn into a wire of circular cross-section with radius 6 cm. What is the length of the wire?",
    "options": ["750 cm", "93.75 cm", "125 cm", "250 cm"],
    "answer": 2,
    "explanation": "Volume is conserved: (4/3)π(15)³ = π(6)² × L. So L = 4 × 3375/(3 × 36) = 125 cm."
  },
  {
    "question": "How many terms of the geometric series 2 + 8 + 32 + ... must be taken to get a sum of 682?",
    "options": ["7", "6", "4", "5"],
    "answer": 3,
    "explanation": "S_n = a(r^n − 1)/(r − 1) = 2(r^n − 1)/3 = 682, so 4^n = 1024 = 4^5. Hence n = 5."
  },
  {
    "question": "If 7x + 4y = -23 and 7x - 5y = 13, find the value of 1x - 1y.",
    "options": ["3", "-5", "-3", "4"],
    "answer": 0,
    "explanation": "Solving the two equations (eliminating one variable) gives x = -1 and y = -4. Therefore 1x - 1y = 1(-1) - 1(-4) = 3."
  },
  {
    "question": "In how many ways can the letters of the word LOGARITHM be arranged so that all the vowels come together?",
    "options": ["362880", "30240", "4320", "60480"],
    "answer": 1,
    "explanation": "Treat the 3 vowels as one block. Arrange the block with the 6 consonants: 5040 ways. Arrange the vowels inside the block: 6 ways. Total = 5040 × 6 = 30240."
  },
  {
    "question": "What is the sum of all 3-digit numbers that are divisible by 9?",
    "options": ["54351", "55458", "54796", "55350"],
    "answer": 3,
    "explanation": "The multiples form an AP from 108 to 999 with common difference 9. Number of terms = (999 − 108)/9 + 1 = 100. Sum = 100/2 × (108 + 999) = 55350."
  },
  {
    "question": "If α and β are the roots of x^2 - 4x - 45 = 0, find α/β + β/α.",
    "options": ["-4/45", "106/45", "106", "-106/45"],
    "answer": 3,
    "explanation": "α/β + β/α = (α² + β²)/(αβ) = ((4)² − 2(-45))/(-45) = -106/45."
  },
  {
    "question": "y varies directly as the cube of x and inversely as the square root of z. If y = 36 when x = 3 and z = 9, find y when x = 4 and z = 4.",
    "options": ["132", "128", "48", "64"],
    "answer": 1,
    "explanation": "y = kx³/√z. From the first case k = y√z/x³ = 36×3/27 = 4. Then y = 4×64/2 = 128."
  },
  {
    "question": "The side of a rhombus is 25 cm and one diagonal is 14 cm. Find its area.",
    "options": ["336 cm^2", "343 cm^2", "672 cm^2", "576 cm^2"],
    "answer": 0,
    "explanation": "Half of the known diagonal = 7 cm, so half of the other = √(25² − 7²) = 24 cm and the other diagonal = 48 cm. Area = ½ × 14 × 48 = 336 cm²."
  },
  {
    "question": "Find the remainder when 4^381 is divided by 13.",
    "options": ["7", "4", "12", "5"],
    "answer": 2,
    "explanation": "Since gcd(4, 13) = 1, 4^6 ≡ 1 (mod 13). Now 381 = 6 × 63 + 3, so 4^381 ≡ 4^3 ≡ 12 (mod 13)."
  },
  {
    "question": "Find the coordinates of the point that divides the line segment joining A(1, -5) and B(16, -20) internally in the ratio 1:4.",
    "options": ["(-8, 4)", "(8.5, -12.5)", "(5, -9)", "(4, -8)"],
    "answer": 3,
    "explanation": "Section formula: x = (1×16 + 4×1)/5 = 4, y = (1×-20 + 4×-5)/5 = -8. The point is (4, -8)."
  },
  {
    "question": "If A : B = 9 : 8 and B : C = 5 : 6, find A : B : C.",
    "options": ["45:40:48", "9:8:6", "27:24:20", "45:48:40"],
    "answer": 0,
    "explanation": "Make B equal in both ratios: A : B = 45 : 40 and B : C = 40 : 48. So A : B : C = 45 : 40 : 48 = 45:40:48."
  },
  {
    "question": "What is the smallest positive integer by which 3267 must be divided to obtain a perfect cube?",
    "options": ["123", "242", "363", "121"],
    "answer": 3,
    "explanation": "3267 = 3^3 × 11^2. Remove the leftover exponents modulo 3: 11^2 = 121."
  },
  {
    "question": "Find the remainder when x^3 - 4x^2 + 8x - 3 is divided by (x + 2).",
    "options": ["-3", "-43", "5", "-45"],
    "answer": 1,
    "explanation": "By the remainder theorem, the remainder is f(-2) = 1(-2)³ + (-4)(-2)² + (8)(-2) + (-3) = -43."
  },
  {
    "question": "Find the compound interest on Rs. 78300 for 2 years at 10% per annum, compounded annually.",
    "options": ["Rs. 94743", "Rs. 15660", "Rs. 8613", "Rs. 16443"],
    "answer": 3,
    "explanation": "Amount = 78300 × (1 + 10/100)^2 = Rs. 94743. Compound interest = 94743 − 78300 = Rs. 16443."
  },
  {
    "question": "Find the area of the triangle with vertices (-5, -1), (-5, -4) and (-4, -2).",
    "options": ["2.5 square units", "1.5 square units", "3 square units", "2 square units"],
    "answer": 1,
    "explanation": "Area = ½|x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| = ½|3| = 1.5 square units."
  },
  {
    "question": "If (x + 3) is a factor of x^3 + px^2 + 3x + 0, find the value of p.",
    "options": ["2", "-12", "5", "4"],
    "answer": 3,
    "explanation": "By the factor theorem, substituting x = -3: (-3)³ + p(-3)² + (3)(-3) + (0) = 0, so 9p = 36 and p = 4."
  },
  {
    "question": "A machine costing Rs. 55296 depreciates at 25% per annum. What will its value be after 3 years?",
    "options": ["Rs. 31968", "Rs. 23328", "Rs. 108000", "Rs. 37152"],
    "answer": 1,
    "explanation": "Value = 55296 × (1 − 25/100)^3 = 55296 × (75/100)^3 = Rs. 23328."
  },
  {
    "question": "In how many distinct ways can the letters of the word ASSOCIATION be arranged?",
    "options": ["39916800", "1247400", "4989600", "2494800"],
    "answer": 3,
    "explanation": "The word has 11 letters with repeated letters (A ×2, S ×2, O ×2, I ×2). Arrangements = 11!/(2! × 2! × 2! × 2!) = 2494800."
  },
  {
    "question": "Find the area of the triangle with vertices (2, 0), (-1, 3) and (-1, -1).",
    "options": ["12 square units", "6 square units", "7 square units", "6.5 square units"],
    "answer": 1,
    "explanation": "Area = ½|x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| = ½|12| = 6 square units."
  },
  {
    "question": "In how many distinct ways can the letters of the word ENTRANCE be arranged?",
    "options": ["5040", "40320", "10080", "20160"],
    "answer": 2,
    "explanation": "The word has 8 letters with repeated letters (E ×2, N ×2). Arrangements = 8!/(2! × 2!) = 10080."
  },
  {
    "question": "The diagonals of a rhombus are 8 cm and 6 cm. Find the length of one side.",
    "options": ["1 cm", "5 cm", "7 cm", "6 cm"],
    "answer": 1,
    "explanation": "Half-diagonals are 4 and 3, so side = √(4² + 3²) = 5 cm."
  },
  {
    "question": "A square is inscribed in a circle whose circumference is 28π cm. What is the area of the square?",
    "options": ["406 cm^2", "196 cm^2", "392 cm^2", "784 cm^2"],
    "answer": 2,
    "explanation": "Circumference = 2πr = 28π, so r = 14 cm. The diagonal of the square = diameter = 28 cm, so area = (diagonal)²/2 = 784/2 = 392 cm²."
  },
  {
    "question": "Solve for x: 5^(3x + 7) = 25^(2x + 2)",
    "options": ["3", "4", "5", "-3/7"],
    "answer": 0,
    "explanation": "Write 25 = 5^2, so the right side is 5^(2(2x + 2)). Equating exponents: 3x + 7 = 4x + 4, so (3 − 4)x = -3, giving x = 3."
  },
  {
    "question": "A bag contains 4 red, 7 blue and 3 green balls. Two balls are drawn at random without replacement. What is the probability that both are of the same colour?",
    "options": ["30/91", "6/91", "61/91", "37/98"],
    "answer": 0,
    "explanation": "Favourable = C(4,2) + C(7,2) + C(3,2) = 30; total = C(14,2) = 91. Probability = 30/91."
  },
  {
    "question": "Pipe A can fill a tank in 60 hours and pipe B can fill it in 15 hours. Both are opened together, but pipe B is closed after 4 hours. How long will it take in total to fill the tank?",
    "options": ["44 hours", "43 hours", "12 hours", "14 hours"],
    "answer": 0,
    "explanation": "Together they fill 1/60 + 1/15 = 1/12 of the tank per hour. In 4 hours they fill 1/3, leaving 2/3. Pipe A alone then needs 2/3 ÷ (1/60) = 40 hours. Total time = 4 + 40 = 44 hours."
  },
  {
    "question": "The angle of elevation of the top of a tower from a point 37 m from its base is 60°. Find the height of the tower.",
    "options": ["74 m", "37√3 m", "37√3/3 m", "37 m"],
    "answer": 1,
    "explanation": "tan 60° = h/37, so h = 37√3 m."
  },
  {
    "question": "If A is a 3 × 3 matrix with |A| = -2, find |A² · Aᵀ · Aᵀ|.",
    "options": ["4", "-8", "-32", "16"],
    "answer": 3,
    "explanation": "|A²| = -2², |Aᵀ| = |A| = -2 each, so the product = -2² × -2 × -2 = 16."
  },
  {
    "question": "The sum to infinity of a geometric series is 12 and its first term is 4. What is the common ratio?",
    "options": ["1/3", "1", "2/3", "2"],
    "answer": 2,
    "explanation": "S∞ = a/(1 − r), so 1 − r = 4/12 = 1/3. Therefore r = 2/3."
  },
  {
    "question": "A boat takes 11 hours to travel 231 km downstream and 21 hours to return the same distance upstream. What is the speed of the stream?",
    "options": ["32 km/h", "5 km/h", "6 km/h", "10 km/h"],
    "answer": 1,
    "explanation": "Downstream speed = 231/11 = 21 km/h; upstream speed = 231/21 = 11 km/h. Speed of stream = (21 − 11)/2 = 5 km/h."
  },
  {
    "question": "If α and β are the roots of x^2 - 14x + 48 = 0, find (α − β)².",
    "options": ["196", "148", "388", "4"],
    "answer": 3,
    "explanation": "(α − β)² = (α + β)² − 4αβ = 14² − 4(48) = 4."
  },
  {
    "question": "What is the least number which leaves a remainder of 3 when divided by 12, 54 or 18?",
    "options": ["108", "105", "111", "114"],
    "answer": 2,
    "explanation": "The number is LCM + remainder. LCM(12, 54, 18) = 108, so the number is 108 + 3 = 111."
  },
  {
    "question": "Two numbers are in the ratio 12:13 and their HCF is 5. What is their LCM?",
    "options": ["3900", "125", "65", "780"],
    "answer": 3,
    "explanation": "The numbers are 60 and 65. Since 12 and 13 are co-prime, LCM = 5 × 12 × 13 = 780."
  },
  {
    "question": "y varies directly as the cube of x and inversely as the square root of z. If y = 12 when x = 2 and z = 16, find y when x = 5 and z = 4.",
    "options": ["375", "381", "750", "187.5"],
    "answer": 0,
    "explanation": "y = kx³/√z. From the first case k = y√z/x³ = 12×4/8 = 6. Then y = 6×125/2 = 375."
  },
  {
    "question": "If a + b + c = -7 and a² + b² + c² = 25, find the value of ab + bc + ca.",
    "options": ["-12", "37", "12", "24"],
    "answer": 2,
    "explanation": "(a + b + c)² = a² + b² + c² + 2(ab + bc + ca), so 49 = 25 + 2(ab + bc + ca), giving ab + bc + ca = 12."
  },
  {
    "question": "In how many ways can the letters of the word TRIANGLE be arranged so that all the vowels come together?",
    "options": ["4320", "40320", "8640", "720"],
    "answer": 0,
    "explanation": "Treat the 3 vowels as one block. Arrange the block with the 5 consonants: 720 ways. Arrange the vowels inside the block: 6 ways. Total = 720 × 6 = 4320."
  },
  {
    "question": "A circle is inscribed in a square whose diagonal is 24√2 cm. What is the area of the circle?",
    "options": ["576π cm^2", "24π cm^2", "144π cm^2", "288π cm^2"],
    "answer": 2,
    "explanation": "Side of the square = diagonal/√2 = 24 cm. The inscribed circle has diameter 24 cm, so r = 12 and area = π(12)² = 144π cm²."
  },
  {
    "question": "Find the coordinates of the point that divides the line segment joining A(5, 8) and B(-7, 12) internally in the ratio 3:1.",
    "options": ["(-3, 10)", "(11, -4)", "(-4, 11)", "(2, 9)"],
    "answer": 2,
    "explanation": "Section formula: x = (3×-7 + 1×5)/4 = -4, y = (3×12 + 1×8)/4 = 11. The point is (-4, 11)."
  },
  {
    "question": "A committee of 5 is to be formed from 6 men and 8 women. In how many ways can it be formed if it must include at least 3 women?",
    "options": ["3080", "1316", "476", "2002"],
    "answer": 1,
    "explanation": "Add the cases: C(8,3)×C(6,2) + C(8,4)×C(6,1) + C(8,5)×C(6,0) = 1316."
  },
  {
    "question": "A cone has a radius of 12 cm and a height of 16 cm. Find its total surface area.",
    "options": ["560π cm^2", "336π cm^2", "384π cm^2", "240π cm^2"],
    "answer": 2,
    "explanation": "Slant height = √(12² + 16²) = 20 cm. Total surface area = πr(r + l) = π × 12 × (12 + 20) = 384π cm²."
  },
  {
    "question": "If log2(x) + log2(x − 15) = 4, what is the value of x?",
    "options": ["31", "1", "15", "16"],
    "answer": 3,
    "explanation": "Combine: log2[x(x − 15)] = 4, so x(x − 15) = 2^4 = 16. Then x^2 − 15x − 16 = 0, i.e. (x − 16)(x + 1) = 0. Since x > 15, the valid root is x = 16."
  },
  {
    "question": "The price of sugar rises by 400%. By what percentage must a household reduce its consumption so that its expenditure remains unchanged?",
    "options": ["80%", "200%", "85%", "410%"],
    "answer": 0,
    "explanation": "Reduction% = r/(100 + r) × 100 = 400/500 × 100 = 80%."
  },
  {
    "question": "For what value of k is the line 1x + 5y = 8 parallel to the line kx - 5y = 8?",
    "options": ["1", "0", "-25", "-1"],
    "answer": 3,
    "explanation": "Slopes must be equal: −1/(5) = −k/(-5), so k = 1(-5)/(5) = -1."
  },
  {
    "question": "How many positive divisors of 405 are perfect squares?",
    "options": ["3", "6", "5", "4"],
    "answer": 0,
    "explanation": "405 = 3^4 × 5. A square divisor uses even exponents only: (2+1) × (0+1) = 3."
  },
  {
    "question": "The sum of the first 5 terms of an AP is equal to the sum of its first 13 terms. If the first term is 34, find the common difference.",
    "options": ["-5", "-4", "4", "-6.8"],
    "answer": 1,
    "explanation": "S_5 = S_13 means the terms from 6 to 13 sum to 0, so 2a + (5+13−1)d = 0. Hence d = −2(34)/17 = -4."
  },
  {
    "question": "How many 4-digit numbers are divisible by 17?",
    "options": ["529", "530", "588", "531"],
    "answer": 1,
    "explanation": "The smallest is 1003 and the largest is 9996. Count = (9996 − 1003)/17 + 1 = 530."
  },
  {
    "question": "The diagonals of a rhombus are 20 cm and 48 cm. Find the length of one side.",
    "options": ["34 cm", "26 cm", "14 cm", "27 cm"],
    "answer": 1,
    "explanation": "Half-diagonals are 10 and 24, so side = √(10² + 24²) = 26 cm."
  },
  {
    "question": "If 5x - 6y = -13 and 2x + 3y = 38, find the value of 3x + 1y.",
    "options": ["28", "15", "29", "32"],
    "answer": 2,
    "explanation": "Solving the two equations (eliminating one variable) gives x = 7 and y = 8. Therefore 3x + 1y = 3(7) + 1(8) = 29."
  },
  {
    "question": "A train crosses a pole in 7 seconds and a bridge 360 m long in 25 seconds. What is its speed in km/h?",
    "options": ["81 km/h", "20 km/h", "72 km/h", "20.16 km/h"],
    "answer": 2,
    "explanation": "Time on the bridge portion = 25 − 7 = 18 s for 360 m, so speed = 20 m/s = 20 × 18/5 = 72 km/h."
  },
  {
    "question": "A shopkeeper mixes 40 kg of flour costing Rs. 65/kg with 40 kg of flour costing Rs. 75/kg. At what price per kg must he sell the mixture to earn a profit of 20%?",
    "options": ["Rs. 56", "Rs. 70", "Rs. 84", "Rs. 89"],
    "answer": 2,
    "explanation": "Total cost = 40×65 + 40×75 = 5600, cost per kg = 70. Selling price = 70 × 120/100 = Rs. 84 per kg."
  },
  {
    "question": "Pipe A can fill a tank in 60 hours and pipe B can fill it in 16 hours. Both are opened together, but pipe B is closed after 2 hours. How long will it take in total to fill the tank?",
    "options": ["232/15 hours", "52.5 hours", "240/19 hours", "51.5 hours"],
    "answer": 1,
    "explanation": "Together they fill 1/60 + 1/16 = 19/240 of the tank per hour. In 2 hours they fill 19/120, leaving 101/120. Pipe A alone then needs 101/120 ÷ (1/60) = 50.5 hours. Total time = 2 + 50.5 = 52.5 hours."
  },
  {
    "question": "In an arithmetic progression, the 3rd term is 17 and the 10th term is 52. Find the sum of its first 15 terms.",
    "options": ["630", "525", "705", "645"],
    "answer": 0,
    "explanation": "Subtracting: 7d = 52 − 17 gives d = 5. Then a = 17 − 2(5) = 7. S_15 = 15/2 × [2(7) + 14(5)] = 630."
  },
  {
    "question": "Solve for x: 5^(4x - 7) = 125^(x - 1)",
    "options": ["3", "4", "5", "4/7"],
    "answer": 1,
    "explanation": "Write 125 = 5^3, so the right side is 5^(3(x - 1)). Equating exponents: 4x - 7 = 3x - 3, so (4 − 3)x = 4, giving x = 4."
  },
  {
    "question": "If x = 7 + √48, find the value of x³ + 1/x³.",
    "options": ["2786", "2716", "194", "2702"],
    "answer": 3,
    "explanation": "x + 1/x = 14. So x³ + 1/x³ = (14)³ − 3(14) = 2702."
  },
  {
    "question": "What is the angle between the hour hand and the minute hand of a clock at 2:20?",
    "options": ["57.5°", "45°", "50°", "310°"],
    "answer": 2,
    "explanation": "Hour hand angle from 12 = 30(2) + 0.5(20) = 70°. Minute hand angle = 6(20) = 120°. Difference = 50°, so the smaller angle is 50°."
  },
  {
    "question": "If x² + 1/x² = 79 and x > 0, find the value of x + 1/x.",
    "options": ["9", "8", "10", "79"],
    "answer": 0,
    "explanation": "(x + 1/x)² = x² + 1/x² + 2 = 79 + 2 = 81. Since x > 0, x + 1/x = 9."
  },
  {
    "question": "A car covers the first half of a journey at 36 km/h and the second half at 45 km/h. What is its average speed for the whole journey?",
    "options": ["40.5 km/h", "37 km/h", "42 km/h", "40 km/h"],
    "answer": 3,
    "explanation": "For equal distances, average speed = 2v1v2/(v1 + v2) = 2 × 36 × 45/(36 + 45) = 40 km/h."
  },
  {
    "question": "A can finish a piece of work in 30 days and B can finish it in 60 days. They work on alternate days, beginning with A. In how many days will the work be completed?",
    "options": ["20 days", "40 days", "41 days", "39 days"],
    "answer": 1,
    "explanation": "In every 2-day cycle they complete 1/30 + 1/60 = 1/20 of the work. After 20 cycles (40 days) 1 is done, leaving 0. Nothing remains, so the work ends on day 40."
  },
  {
    "question": "Find the product of all real solutions of |2x + 9| = 15.",
    "options": ["-36", "4", "-9", "36"],
    "answer": 0,
    "explanation": "The equation splits into 2x + 9 = 15 and 2x + 9 = −15, giving x = 3 and x = -12. Product = 3 × (-12) = -36."
  },
  {
    "question": "A chord 18 cm long is drawn in a circle of radius 15 cm. How far is the chord from the centre?",
    "options": ["13 cm", "12 cm", "24 cm", "9 cm"],
    "answer": 1,
    "explanation": "Half the chord = 9 cm, so the distance = √(15² − 9²) = √144 = 12 cm."
  },
  {
    "question": "If 14 February 2008 was a Thursday, what day of the week will 27 July 2025 be?",
    "options": ["Wednesday", "Sunday", "Saturday", "Friday"],
    "answer": 1,
    "explanation": "The number of days between the two dates is 6373, which leaves remainder 3 when divided by 7 (leap years included). Counting 3 day(s) forward from Thursday gives Sunday."
  },
  {
    "question": "Two fair dice are rolled together. What is the probability that the larger number is exactly double the smaller?",
    "options": ["5/6", "1/6", "7/36", "5/36"],
    "answer": 1,
    "explanation": "Counting the outcomes among the 36 equally likely ones for which the larger number is exactly double the smaller gives 6 favourable outcomes. Probability = 6/36 = 1/6."
  },
  {
    "question": "A shopkeeper mixes 30 kg of flour costing Rs. 50/kg with 50 kg of flour costing Rs. 55/kg. At what price per kg must he sell the mixture to earn a profit of 20%?",
    "options": ["Rs. 63.75", "Rs. 425/8", "Rs. 68.75", "Rs. 63"],
    "answer": 0,
    "explanation": "Total cost = 30×50 + 50×55 = 4250, cost per kg = 425/8. Selling price = 425/8 × 120/100 = Rs. 63.75 per kg."
  },
  {
    "question": "For what value of k does the equation kx^2 + 28x + 14 = 0 have equal roots?",
    "options": ["28", "2", "14", "15"],
    "answer": 2,
    "explanation": "Equal roots require the discriminant to be zero: 28² − 4k(14) = 0, so k = 784/56 = 14."
  },
  {
    "question": "Find the sum of the squares of the first 11 even natural numbers.",
    "options": ["2145", "506", "2024", "264"],
    "answer": 2,
    "explanation": "Sum = 4Σk² = 4 × 506 = 2024."
  },
  {
    "question": "In an arithmetic progression, the 5th term is 29 and the 9th term is 57. Find the sum of its first 23 terms.",
    "options": ["3565", "1771", "1794", "1817"],
    "answer": 2,
    "explanation": "Subtracting: 4d = 57 − 29 gives d = 7. Then a = 29 − 4(7) = 1. S_23 = 23/2 × [2(1) + 22(7)] = 1794."
  },
  {
    "question": "How many 3-digit numbers are divisible by 37?",
    "options": ["25", "2", "27", "24"],
    "answer": 0,
    "explanation": "The smallest is 111 and the largest is 999. Count = (999 − 111)/37 + 1 = 25."
  },
  {
    "question": "A sum of money becomes 4 times itself in 25 years at simple interest. What is the annual rate of interest?",
    "options": ["16%", "6%", "24%", "12%"],
    "answer": 3,
    "explanation": "Interest earned = 3P in 25 years. Rate = (3P × 100)/(P × 25) = 12% per annum."
  },
  {
    "question": "The length of a rectangle is increased by 60% and its breadth is decreased by 10%. What is the net effect on its area?",
    "options": ["Increase of 50%", "Decrease of 44%", "Increase of 25%", "Increase of 44%"],
    "answer": 3,
    "explanation": "Take original area = 100. New area = 100 × 160/100 × 90/100 = 144. Hence the area shows a increase of 44%."
  },
  {
    "question": "In a class of 66 students, 32 study Chemistry, 23 study Computer Science and 33 study Biology. 13 study both Chemistry and Computer Science, 13 study both Computer Science and Biology, 14 study both Biology and Chemistry, and 8 study all three subjects. How many students study exactly two of the subjects?",
    "options": ["16", "40", "24", "13"],
    "answer": 0,
    "explanation": "Exactly two = (pairwise intersections) − 3(triple intersection) = (13 + 13 + 14) − 3(8) = 16."
  },
  {
    "question": "For what value of k is the line 1x - 7y = 5 perpendicular to the line kx - 3y = 5?",
    "options": ["21", "1", "-19", "-21"],
    "answer": 3,
    "explanation": "The product of slopes must be −1: (−1/(-7))(−k/(-3)) = −1, so 1k = −(-7)(-3), giving k = -21."
  },
  {
    "question": "If cos θ = 8/17 and θ is an acute angle, find the value of tan θ + cot θ.",
    "options": ["29/12", "289/120", "23/17", "120/289"],
    "answer": 1,
    "explanation": "With sin θ = 15/17, cos θ = 8/17 and tan θ = 15/8 (from a 15-8-17 right triangle), tan θ + cot θ = 289/120."
  },
  {
    "question": "If x² + 1/x² = 34 and x > 0, find the value of x + 1/x.",
    "options": ["5", "36", "6", "7"],
    "answer": 2,
    "explanation": "(x + 1/x)² = x² + 1/x² + 2 = 34 + 2 = 36. Since x > 0, x + 1/x = 6."
  },
  {
    "question": "A shopkeeper mixes 40 kg of flour costing Rs. 90/kg with 40 kg of flour costing Rs. 60/kg. At what price per kg must he sell the mixture to earn a profit of 25%?",
    "options": ["Rs. 98.75", "Rs. 56.25", "Rs. 93.75", "Rs. 75"],
    "answer": 2,
    "explanation": "Total cost = 40×90 + 40×60 = 6000, cost per kg = 75. Selling price = 75 × 125/100 = Rs. 93.75 per kg."
  },
  {
    "question": "A sum of money becomes 5 times itself in 8 years at simple interest. What is the annual rate of interest?",
    "options": ["100%", "60%", "50%", "62.5%"],
    "answer": 2,
    "explanation": "Interest earned = 4P in 8 years. Rate = (4P × 100)/(P × 8) = 50% per annum."
  },
  {
    "question": "Find the greatest number that divides 253, 309 and 669 leaving the same remainder 5 in each case.",
    "options": ["8", "13", "3", "4"],
    "answer": 0,
    "explanation": "The required number divides the differences: 56, 360 and 416. Their HCF is 8, and since 8 > 5 it is a valid divisor. Answer: 8."
  },
  {
    "question": "Evaluate: 4 sin^2 60° + 4 cos^2 45° + 1 tan^2 30°",
    "options": ["16/3", "19/3", "61/12", "35/6"],
    "answer": 0,
    "explanation": "sin²60° = 3/4, cos²45° = 1/2, tan²30° = 1/3. Value = 4(3/4) + 4(1/2) + 1(1/3) = 16/3."
  },
  {
    "question": "A and B together can complete a job in 60 days, B and C together in 36 days, and C and A together in 45 days. How many days will A, B and C take to complete it working together?",
    "options": ["29 days", "32 days", "30 days", "47 days"],
    "answer": 2,
    "explanation": "Adding the three rates: 2(A + B + C) = 1/60 + 1/36 + 1/45 = 1/15. So A + B + C = 1/30 per day, and the time is 30 days."
  },
  {
    "question": "In an arithmetic progression, the 4th term is 27 and the 11th term is 62. Find the sum of its first 24 terms.",
    "options": ["1668", "3048", "1380", "1728"],
    "answer": 0,
    "explanation": "Subtracting: 7d = 62 − 27 gives d = 5. Then a = 27 − 3(5) = 12. S_24 = 24/2 × [2(12) + 23(5)] = 1668."
  },
  {
    "question": "A and B together can complete a job in 18 days, B and C together in 12 days, and C and A together in 36 days. How many days will A, B and C take to complete it working together?",
    "options": ["11 days", "14 days", "6 days", "12 days"],
    "answer": 3,
    "explanation": "Adding the three rates: 2(A + B + C) = 1/18 + 1/12 + 1/36 = 1/6. So A + B + C = 1/12 per day, and the time is 12 days."
  },
  {
    "question": "Find the product of all real solutions of |3x - 8| = 14.",
    "options": ["-44/3", "25/3", "44/3", "16/3"],
    "answer": 0,
    "explanation": "The equation splits into 3x - 8 = 14 and 3x - 8 = −14, giving x = 22/3 and x = -2. Product = 22/3 × (-2) = -44/3."
  },
  {
    "question": "If f(x) = 4x^2 - 5x + 1 and g(x) = x + 1, find f(g(1)) − g(f(1)).",
    "options": ["-6", "7", "8", "6"],
    "answer": 3,
    "explanation": "f(g(1)) = f(2) = 7 and g(f(1)) = g(0) = 1. Difference = 7 − (1) = 6."
  },
  {
    "question": "If A : B = 6 : 5, B : C = 2 : 7 and C : D = 9 : 2, find A : D.",
    "options": ["109:70", "35:54", "12:35", "54:35"],
    "answer": 3,
    "explanation": "A/D = (A/B)(B/C)(C/D) = (6/5)(2/7)(9/2) = 108/70, i.e. A : D = 54:35."
  },
  {
    "question": "A bag contains 3 red, 4 blue and 8 green balls. Three balls are drawn at random without replacement. Find the probability that one ball of each colour is drawn.",
    "options": ["96/455", "32/1125", "359/455", "48/455"],
    "answer": 0,
    "explanation": "Favourable ways = 3 × 4 × 8 = 96; total ways = C(15,3) = 455. Probability = 96/455."
  },
  {
    "question": "Three positive numbers are in geometric progression. Their sum is 39 and their product is 729. Find the largest of the three numbers.",
    "options": ["9", "24", "27", "30"],
    "answer": 2,
    "explanation": "Write the numbers as a/r, a, ar. Product a³ = 729, so a = 9. Then 9(1/r + 1 + r) = 39 gives r = 3. The numbers are 3, 9, 27, and the largest is 27."
  },
  {
    "question": "In how many ways can a committee of 6 be chosen from 9 men and 6 women if one particular woman must be on the committee?",
    "options": ["3003", "5005", "2002", "3289"],
    "answer": 2,
    "explanation": "Once she is fixed, choose the remaining 5 members from the other 14 people: C(14,5) = 2002."
  },
  {
    "question": "What is the angle between the hour hand and the minute hand of a clock at 9:10?",
    "options": ["152.5°", "140°", "145°", "215°"],
    "answer": 2,
    "explanation": "Hour hand angle from 12 = 30(9) + 0.5(10) = 275°. Minute hand angle = 6(10) = 60°. Difference = 215°, so the smaller angle is 145°."
  },
  {
    "question": "The sum to infinity of a geometric series is 12 and its first term is 8. What is the common ratio?",
    "options": ["1/3", "2/3", "1", "0.5"],
    "answer": 0,
    "explanation": "S∞ = a/(1 − r), so 1 − r = 8/12 = 2/3. Therefore r = 1/3."
  },
  {
    "question": "If sin θ + cos θ = 0.75, find the value of sin³θ + cos³θ.",
    "options": ["117/128", "27/64", "31/32", "75/128"],
    "answer": 0,
    "explanation": "sinθ cosθ = -7/32. sin³θ + cos³θ = (sinθ + cosθ)(1 − sinθ cosθ) = 0.75 × 39/32 = 117/128."
  },
  {
    "question": "If x = 9 + √80, find the value of x³ + 1/x³.",
    "options": ["5886", "5778", "5796", "322"],
    "answer": 1,
    "explanation": "x + 1/x = 18. So x³ + 1/x³ = (18)³ − 3(18) = 5778."
  },
  {
    "question": "If A : B = 9 : 2, B : C = 5 : 2 and C : D = 7 : 4, find A : D.",
    "options": ["63:8", "315:16", "45:4", "16:315"],
    "answer": 1,
    "explanation": "A/D = (A/B)(B/C)(C/D) = (9/2)(5/2)(7/4) = 315/16, i.e. A : D = 315:16."
  },
  {
    "question": "The two legs of a right-angled triangle measure 4 cm and 3 cm. Find the radius of its inscribed circle.",
    "options": ["2.5 cm", "12/7 cm", "1 cm", "3 cm"],
    "answer": 2,
    "explanation": "The hypotenuse is √(4² + 3²) = 5 cm. Inradius = (a + b − c)/2 = (4 + 3 − 5)/2 = 1 cm."
  },
  {
    "question": "Rice costing Rs. 75 per kg is mixed with rice costing Rs. 100 per kg. In what ratio (cheaper : dearer) should they be mixed so that the mixture is worth Rs. 90 per kg?",
    "options": ["3:5", "2:3", "2:5", "3:2"],
    "answer": 1,
    "explanation": "By alligation, cheaper : dearer = (dearer price − mean) : (mean − cheaper price) = (100 − 90) : (90 − 75) = 10:15 = 2:3."
  },
  {
    "question": "Find the greatest number that divides 715, 865 and 895 leaving the same remainder 10 in each case.",
    "options": ["15", "30", "60", "40"],
    "answer": 1,
    "explanation": "The required number divides the differences: 150, 30 and 180. Their HCF is 30, and since 30 > 10 it is a valid divisor. Answer: 30."
  },
  {
    "question": "How many positive divisors does 19600 have?",
    "options": ["45", "8", "44", "90"],
    "answer": 0,
    "explanation": "19600 = 2^4 × 5^2 × 7^2. Number of divisors = (4+1) × (2+1) × (2+1) = 45."
  },
  {
    "question": "A starts a business with Rs. 40000. After 3 months, B joins with Rs. 75000. At the end of the year the total profit is Rs. 15400. What is B's share of the profit?",
    "options": ["Rs. 9000", "Rs. 6400", "Rs. 10000", "Rs. 7700"],
    "answer": 0,
    "explanation": "A's capital-time = 40000 × 12 and B's = 75000 × 9. Ratio A : B = 32 : 45. B's share = 15400 × 45/77 = Rs. 9000."
  },
  {
    "question": "A tap can fill a tank in 12 hours. Because of a leak at the bottom, the tank takes longer to fill. If the leak alone can empty the full tank in 28 hours, how many hours will the tank take to fill with the leak present?",
    "options": ["8.4 hours", "21 hours", "16 hours", "33 hours"],
    "answer": 1,
    "explanation": "Net filling rate = 1/12 − 1/28 = 16/336 of the tank per hour. So time = 336/16 = 21 hours."
  },
  {
    "question": "Find the sum to infinity of the geometric series with first term 20 and common ratio 3/7.",
    "options": ["35", "55", "140", "14"],
    "answer": 0,
    "explanation": "S∞ = a/(1 − r) = 20/(1 − 3/7) = 20/(4/7) = 35."
  },
  {
    "question": "A train takes 6 seconds to pass a signal pole and 20 seconds to cross a platform 420 m long. What is the length of the train?",
    "options": ["420 m", "180 m", "240 m", "126 m"],
    "answer": 1,
    "explanation": "The extra 20 − 6 = 14 s is spent covering the platform's 420 m, so speed = 420/14 = 30 m/s. Length of train = 30 × 6 = 180 m."
  },
  {
    "question": "In how many ways can a committee of 4 be chosen from 9 men and 8 women so that it has exactly 3 women?",
    "options": ["1008", "504", "65", "2380"],
    "answer": 1,
    "explanation": "Choose 3 women in C(8,3) = 56 ways and 1 men in C(9,1) = 9 ways. Total = 504."
  },
  {
    "question": "The sum of the first 10 terms of an AP is equal to the sum of its first 12 terms. If the first term is 21, find the common difference.",
    "options": ["-2.1", "-2", "-1", "-3"],
    "answer": 1,
    "explanation": "S_10 = S_12 means the terms from 11 to 12 sum to 0, so 2a + (10+12−1)d = 0. Hence d = −2(21)/21 = -2."
  },
  {
    "question": "Two trains of lengths 180 m and 110 m run on parallel tracks in opposite directions at 72 km/h and 102 km/h respectively. In how many seconds will they completely cross each other?",
    "options": ["12 seconds", "6 seconds", "5/3 seconds", "34.8 seconds"],
    "answer": 1,
    "explanation": "Relative speed = 72 + 102 = 174 km/h = 145/3 m/s. Distance = 180 + 110 = 290 m. Time = 290 ÷ 145/3 = 6 s."
  },
  {
    "question": "How many positive divisors does 147 have?",
    "options": ["3", "8", "12", "6"],
    "answer": 3,
    "explanation": "147 = 3 × 7^2. Number of divisors = (1+1) × (2+1) = 6."
  },
  {
    "question": "Find the product of all real solutions of |x + 3| = 4.",
    "options": ["-7", "2", "-6", "7"],
    "answer": 0,
    "explanation": "The equation splits into x + 3 = 4 and x + 3 = −4, giving x = 1 and x = -7. Product = 1 × (-7) = -7."
  },
  {
    "question": "The two legs of a right-angled triangle measure 42 cm and 40 cm. Find the radius of its inscribed circle.",
    "options": ["35 cm", "840/41 cm", "29 cm", "12 cm"],
    "answer": 3,
    "explanation": "The hypotenuse is √(42² + 40²) = 58 cm. Inradius = (a + b − c)/2 = (42 + 40 − 58)/2 = 12 cm."
  },
  {
    "question": "A starts a business with Rs. 50000. After 3 months, B joins with Rs. 45000. At the end of the year the total profit is Rs. 33500. What is B's share of the profit?",
    "options": ["Rs. 13500", "Rs. 20000", "Rs. 14500", "Rs. 301500/19"],
    "answer": 0,
    "explanation": "A's capital-time = 50000 × 12 and B's = 45000 × 9. Ratio A : B = 40 : 27. B's share = 33500 × 27/67 = Rs. 13500."
  },
  {
    "question": "Find the coordinates of the point that divides the line segment joining A(-6, -5) and B(4, 0) internally in the ratio 3:2.",
    "options": ["(0, -2)", "(1, -3)", "(-1, -2.5)", "(-2, -3)"],
    "answer": 0,
    "explanation": "Section formula: x = (3×4 + 2×-6)/5 = 0, y = (3×0 + 2×-5)/5 = -2. The point is (0, -2)."
  },
  {
    "question": "What is the least number which leaves a remainder of 6 when divided by 84, 12 or 60?",
    "options": ["414", "432", "846", "426"],
    "answer": 3,
    "explanation": "The number is LCM + remainder. LCM(84, 12, 60) = 420, so the number is 420 + 6 = 426."
  },
  {
    "question": "A square is inscribed in a circle whose circumference is 38π cm. What is the area of the square?",
    "options": ["741 cm^2", "722 cm^2", "76 cm^2", "1444 cm^2"],
    "answer": 1,
    "explanation": "Circumference = 2πr = 38π, so r = 19 cm. The diagonal of the square = diameter = 38 cm, so area = (diagonal)²/2 = 1444/2 = 722 cm²."
  },
  {
    "question": "Find the compound interest on Rs. 22336 for 3 years at 25% per annum, compounded annually.",
    "options": ["Rs. 26873", "Rs. 21289", "Rs. 15705", "Rs. 16752"],
    "answer": 1,
    "explanation": "Amount = 22336 × (1 + 25/100)^3 = Rs. 43625. Compound interest = 43625 − 22336 = Rs. 21289."
  },
  {
    "question": "The radius of a circle is increased by 50%. What is the percentage increase in its area?",
    "options": ["2500%", "50%", "125%", "100%"],
    "answer": 2,
    "explanation": "New area/old area = (1 + 50/100)² = 2.25. Increase = 125%."
  },
  {
    "question": "What is the difference between the compound interest and the simple interest on Rs. 35000 for 2 years at 4% per annum?",
    "options": ["Rs. 1400", "Rs. 28", "Rs. 56", "Rs. 1456"],
    "answer": 2,
    "explanation": "For 2 years, CI − SI = P(r/100)^2 = 35000 × (4/100)^2 = 35000 × 16/10000 = Rs. 56."
  },
  {
    "question": "A straight line passes through the points (7, -5) and (11, -25). What is its y-intercept?",
    "options": ["30", "-40", "-30", "25"],
    "answer": 0,
    "explanation": "Slope = (-25 − -5)/(11 − 7) = -5. Using y = -5x + c at (7, -5): c = -5 − (-5)(7) = 30."
  },
  {
    "question": "If log5(x) + log5(x − 120) = 4, what is the value of x?",
    "options": ["120", "125", "245", "5"],
    "answer": 1,
    "explanation": "Combine: log5[x(x − 120)] = 4, so x(x − 120) = 5^4 = 625. Then x^2 − 120x − 625 = 0, i.e. (x − 125)(x + 5) = 0. Since x > 120, the valid root is x = 125."
  },
  {
    "question": "If sin θ + cos θ = 1.4, find the value of sin⁴θ + cos⁴θ.",
    "options": ["913/625", "337/625", "0.04", "481/625"],
    "answer": 1,
    "explanation": "sinθ cosθ = (1.96 − 1)/2 = 0.48. Then sin⁴θ + cos⁴θ = 1 − 2(sinθ cosθ)² = 1 − 2(144/625) = 337/625."
  },
  {
    "question": "In an arithmetic progression, the 4th term is 14 and the 9th term is 49. Find the sum of its first 28 terms.",
    "options": ["5096", "2450", "2646", "2548"],
    "answer": 1,
    "explanation": "Subtracting: 5d = 49 − 14 gives d = 7. Then a = 14 − 3(7) = -7. S_28 = 28/2 × [2(-7) + 27(7)] = 2450."
  },
  {
    "question": "Two runners start together from the same point of a circular track 800 m long and run in the same direction at 8 m/s and 3 m/s. After how many seconds will the faster runner first lap the slower one?",
    "options": ["210 seconds", "160 seconds", "320 seconds", "180 seconds"],
    "answer": 1,
    "explanation": "They meet again when the faster gains one full lap on the slower. Relative speed = 8 − 3 = 5 m/s, so time = 800/5 = 160 s."
  },
  {
    "question": "What is the highest power of 7 that divides 206! exactly?",
    "options": ["34", "32", "33", "36"],
    "answer": 2,
    "explanation": "Exponent of 7 in 206! = ⌊206/7⌋ + ⌊206/7²⌋ + ... = 29 + 4 = 33."
  },
  {
    "question": "Pipe A can fill a tank in 45 hours and pipe B can fill it in 20 hours. Both are opened together, but pipe B is closed after 4 hours. How long will it take in total to fill the tank?",
    "options": ["35 hours", "36 hours", "37 hours", "180/13 hours"],
    "answer": 1,
    "explanation": "Together they fill 1/45 + 1/20 = 13/180 of the tank per hour. In 4 hours they fill 13/45, leaving 32/45. Pipe A alone then needs 32/45 ÷ (1/45) = 32 hours. Total time = 4 + 32 = 36 hours."
  },
  {
    "question": "If x = 6 + √35, find the value of x⁴ + 1/x⁴.",
    "options": ["20736", "20162", "20166", "20164"],
    "answer": 1,
    "explanation": "x + 1/x = 12, so x² + 1/x² = 142 and x⁴ + 1/x⁴ = (142)² − 2 = 20162."
  },
  {
    "question": "Rice costing Rs. 20 per kg is mixed with rice costing Rs. 55 per kg. In what ratio (cheaper : dearer) should they be mixed so that the mixture is worth Rs. 50 per kg?",
    "options": ["6:1", "1:6", "4:11", "6:7"],
    "answer": 1,
    "explanation": "By alligation, cheaper : dearer = (dearer price − mean) : (mean − cheaper price) = (55 − 50) : (50 − 20) = 5:30 = 1:6."
  },
  {
    "question": "The present ages of Ali and Sara are in the ratio 3:4. After 6 years their ages will be in the ratio 11:14. What is Sara's present age?",
    "options": ["63 years", "30 years", "36 years", "27 years"],
    "answer": 2,
    "explanation": "Let the ages be 3k and 4k. Then (3k + 6)/(4k + 6) = 11/14, so 14(3k + 6) = 11(4k + 6). This gives k = 9, so Sara's age = 4 × 9 = 36 years."
  },
  {
    "question": "A vessel contains 100 litres of a mixture of milk and water in the ratio 3:2. 40 litres of the mixture are drawn out and replaced by water. How many litres of milk are in the vessel now?",
    "options": ["56 litres", "36 litres", "24 litres", "40 litres"],
    "answer": 1,
    "explanation": "Initial milk = 100 × 3/5 = 60 L. Removing 40 L of mixture leaves milk × (100 − 40)/100 = 60 × 60/100 = 36 L."
  },
  {
    "question": "For what value of k is the line 5x + 5y = 11 perpendicular to the line kx - 8y = 4?",
    "options": ["5", "10", "8", "-8"],
    "answer": 2,
    "explanation": "The product of slopes must be −1: (−5/(5))(−k/(-8)) = −1, so 5k = −(5)(-8), giving k = 8."
  },
  {
    "question": "A car covers the first half of a journey at 108 km/h and the second half at 135 km/h. What is its average speed for the whole journey?",
    "options": ["120 km/h", "121.5 km/h", "117 km/h", "122 km/h"],
    "answer": 0,
    "explanation": "For equal distances, average speed = 2v1v2/(v1 + v2) = 2 × 108 × 135/(108 + 135) = 120 km/h."
  },
  {
    "question": "Two fair dice are rolled together. What is the probability that the sum of the two numbers is less than 6?",
    "options": ["13/36", "5/18", "11/36", "13/18"],
    "answer": 1,
    "explanation": "Counting the outcomes among the 36 equally likely ones for which the sum of the two numbers is less than 6 gives 10 favourable outcomes. Probability = 10/36 = 5/18."
  },
  {
    "question": "At simple interest, a sum of money becomes 3 times itself in 12 years. In how many years will it become 6 times itself at the same rate?",
    "options": ["24 years", "30 years", "36 years", "60 years"],
    "answer": 1,
    "explanation": "Becoming 3 times means interest = 2P in 12 years, so yearly interest = 2P/12. To become 6 times the interest needed is 5P, which takes 5P ÷ (2P/12) = 30 years."
  },
  {
    "question": "A convex polygon has 135 diagonals. How many sides does it have?",
    "options": ["18", "17", "20", "19"],
    "answer": 0,
    "explanation": "n(n − 3)/2 = 135, so n² − 3n − 270 = 0, i.e. (n − 18)(n + 15) = 0. Hence n = 18."
  },
  {
    "question": "If α and β are the roots of x^2 - x - 2 = 0, find (α − β)².",
    "options": ["5", "3", "9", "1"],
    "answer": 2,
    "explanation": "(α − β)² = (α + β)² − 4αβ = 1² − 4(-2) = 9."
  },
  {
    "question": "What is the least number which leaves a remainder of 17 when divided by 72, 60 or 30?",
    "options": ["394", "343", "737", "377"],
    "answer": 3,
    "explanation": "The number is LCM + remainder. LCM(72, 60, 30) = 360, so the number is 360 + 17 = 377."
  },
  {
    "question": "A tower casts a shadow 57 m long when the angle of elevation of the sun is 30°. Find the height of the tower.",
    "options": ["57√3 m", "28 m", "38√3 m", "19√3 m"],
    "answer": 3,
    "explanation": "tan 30° = h/57 = 1/√3, so h = 57/√3 = 19√3 m."
  },
  {
    "question": "A trader marks his goods 40% above the cost price and then allows successive discounts of 10% and 20% on the marked price. Find his net profit or loss percent.",
    "options": ["Profit 0.8%", "Profit 5%", "Profit 10%", "Loss 0.8%"],
    "answer": 0,
    "explanation": "Take cost = 100. Marked price = 140. After 10% discount: 126. After 20% discount: 100.8. So profit = 0.8%."
  },
  {
    "question": "Two trains of lengths 390 m and 240 m run on parallel tracks in opposite directions at 48 km/h and 78 km/h respectively. In how many seconds will they completely cross each other?",
    "options": ["75.6 seconds", "78/7 seconds", "18 seconds", "36 seconds"],
    "answer": 2,
    "explanation": "Relative speed = 48 + 78 = 126 km/h = 35 m/s. Distance = 390 + 240 = 630 m. Time = 630 ÷ 35 = 18 s."
  },
  {
    "question": "Rice costing Rs. 45 per kg is mixed with rice costing Rs. 90 per kg. In what ratio (cheaper : dearer) should they be mixed so that the mixture is worth Rs. 70 per kg?",
    "options": ["4:9", "4:5", "1:2", "5:4"],
    "answer": 1,
    "explanation": "By alligation, cheaper : dearer = (dearer price − mean) : (mean − cheaper price) = (90 − 70) : (70 − 45) = 20:25 = 4:5."
  },
  {
    "question": "If x + 1/x = 4, find the value of x⁴ + 1/x⁴.",
    "options": ["196", "14", "194", "198"],
    "answer": 2,
    "explanation": "x² + 1/x² = 4² − 2 = 14. So x⁴ + 1/x⁴ = (14)² − 2 = 194."
  },
  {
    "question": "What is the unit digit of 37^1520?",
    "options": ["3", "6", "5", "1"],
    "answer": 3,
    "explanation": "The unit digits of powers of 37 repeat in a cycle of length 4: 7, 9, 3, 1. Since 1520 leaves position 4 in the cycle, the unit digit is 1."
  },
  {
    "question": "A train 120 m long moving at 60 km/h overtakes another train 240 m long moving in the same direction at 30 km/h. How many seconds does it take to completely pass the slower train?",
    "options": ["86.4 seconds", "14.4 seconds", "43.2 seconds", "12 seconds"],
    "answer": 2,
    "explanation": "Relative speed = 60 − 30 = 30 km/h = 25/3 m/s. Distance = 120 + 240 = 360 m. Time = 43.2 s."
  },
  {
    "question": "What is the difference between the compound interest and the simple interest on Rs. 36875 for 2 years at 4% per annum?",
    "options": ["Rs. 59", "Rs. 29.5", "Rs. 1475", "Rs. 1534"],
    "answer": 0,
    "explanation": "For 2 years, CI − SI = P(r/100)^2 = 36875 × (4/100)^2 = 36875 × 16/10000 = Rs. 59."
  },
  {
    "question": "How many positive divisors does 1296 have?",
    "options": ["24", "8", "27", "25"],
    "answer": 3,
    "explanation": "1296 = 2^4 × 3^4. Number of divisors = (4+1) × (4+1) = 25."
  },
  {
    "question": "If A is a 3 × 3 matrix with |A| = 5, find |A² · Aᵀ · Aᵀ|.",
    "options": ["3125", "625", "25", "-625"],
    "answer": 1,
    "explanation": "|A²| = 5², |Aᵀ| = |A| = 5 each, so the product = 5² × 5 × 5 = 625."
  },
  {
    "question": "The side of a rhombus is 5 cm and one diagonal is 8 cm. Find its area.",
    "options": ["9 cm^2", "48 cm^2", "40 cm^2", "24 cm^2"],
    "answer": 3,
    "explanation": "Half of the known diagonal = 4 cm, so half of the other = √(5² − 4²) = 3 cm and the other diagonal = 6 cm. Area = ½ × 8 × 6 = 24 cm²."
  },
  {
    "question": "For what value of k is the line 1x + 7y = 7 perpendicular to the line kx + 1y = 15?",
    "options": ["-7", "7", "-5", "1"],
    "answer": 0,
    "explanation": "The product of slopes must be −1: (−1/(7))(−k/(1)) = −1, so 1k = −(7)(1), giving k = -7."
  },
  {
    "question": "The sum to infinity of a geometric series is 6 and its first term is 2. What is the common ratio?",
    "options": ["1", "2/3", "1/3", "2"],
    "answer": 1,
    "explanation": "S∞ = a/(1 − r), so 1 − r = 2/6 = 1/3. Therefore r = 2/3."
  },
  {
    "question": "What will Rs. 53500 amount to after 2 years at 10% per annum compound interest?",
    "options": ["Rs. 11235", "Rs. 64200", "Rs. 64735", "Rs. 69550"],
    "answer": 2,
    "explanation": "Amount = P(1 + r/100)^n = 53500 × (110/100)^2 = Rs. 64735."
  },
  {
    "question": "In how many distinct ways can the letters of the word ENGINEERING be arranged?",
    "options": ["554400", "277200", "138600", "39916800"],
    "answer": 1,
    "explanation": "The word has 11 letters with repeated letters (E ×3, N ×3, G ×2, I ×2). Arrangements = 11!/(3! × 3! × 2! × 2!) = 277200."
  },
  {
    "question": "A sum of money becomes 3 times itself in 4 years at simple interest. What is the annual rate of interest?",
    "options": ["60%", "50%", "100%", "75%"],
    "answer": 1,
    "explanation": "Interest earned = 2P in 4 years. Rate = (2P × 100)/(P × 4) = 50% per annum."
  },
  {
    "question": "Find the sum of the squares of the first 13 even natural numbers.",
    "options": ["364", "3276", "819", "3445"],
    "answer": 1,
    "explanation": "Sum = 4Σk² = 4 × 819 = 3276."
  },
  {
    "question": "A right circular cone has a base radius of 7 cm and a slant height of 25 cm. What is its volume?",
    "options": ["1400π cm^3", "392π cm^3", "784π cm^3", "1225/3π cm^3"],
    "answer": 1,
    "explanation": "Height = √(25² − 7²) = 24 cm. Volume = (1/3)πr²h = (1/3)π(7)²(24) = 392π cm³."
  },
  {
    "question": "How many integers x satisfy |2x − 3| ≤ 22?",
    "options": ["22", "23", "21", "24"],
    "answer": 0,
    "explanation": "|2x − 3| ≤ 22 means -19 ≤ 2x ≤ 25, i.e. -9.5 ≤ x ≤ 12.5. Integers in this range: 22."
  },
  {
    "question": "Find the remainder when 4^483 is divided by 7.",
    "options": ["2", "4", "1", "5"],
    "answer": 2,
    "explanation": "Since gcd(4, 7) = 1, 4^3 ≡ 1 (mod 7). Now 483 = 3 × 161 + 0, so 4^483 ≡ 4^0 ≡ 1 (mod 7)."
  },
  {
    "question": "Find the area of a sector of angle 60° in a circle of radius 18 cm. (Give the answer in terms of π.)",
    "options": ["6π cm^2", "108π cm^2", "54π cm^2", "324π cm^2"],
    "answer": 2,
    "explanation": "Area = (θ/360) × πr² = (60/360) × π × 324 = 54π cm²."
  },
  {
    "question": "A car covers the first half of a journey at 90 km/h and the second half at 210 km/h. What is its average speed for the whole journey?",
    "options": ["128 km/h", "126 km/h", "150 km/h", "123 km/h"],
    "answer": 1,
    "explanation": "For equal distances, average speed = 2v1v2/(v1 + v2) = 2 × 90 × 210/(90 + 210) = 126 km/h."
  },
  {
    "question": "Find the greatest number that divides 213, 633 and 813 leaving the same remainder 3 in each case.",
    "options": ["120", "57", "60", "63"],
    "answer": 2,
    "explanation": "The required number divides the differences: 420, 180 and 600. Their HCF is 60, and since 60 > 3 it is a valid divisor. Answer: 60."
  },
  {
    "question": "The sum of the first 11 terms of an AP is equal to the sum of its first 16 terms. If the first term is 39, find the common difference.",
    "options": ["3", "-1.5", "-39/11", "-3"],
    "answer": 3,
    "explanation": "S_11 = S_16 means the terms from 12 to 16 sum to 0, so 2a + (11+16−1)d = 0. Hence d = −2(39)/26 = -3."
  },
  {
    "question": "Find the determinant of the matrix with rows [1, 1, 0], [1, 6, -1], [1, 3, 0].",
    "options": ["-2", "3", "5", "2"],
    "answer": 3,
    "explanation": "Expanding along the first row: 1(3) − (1)(1) + (0)(-3) = 2."
  },
  {
    "question": "If a + b + c = 2 and a² + b² + c² = 6, find the value of ab + bc + ca.",
    "options": ["5", "2", "-1", "1"],
    "answer": 2,
    "explanation": "(a + b + c)² = a² + b² + c² + 2(ab + bc + ca), so 4 = 6 + 2(ab + bc + ca), giving ab + bc + ca = -1."
  },
  {
    "question": "Find the perpendicular distance of the point (2, -7) from the line 7x - 24y + 18 = 0.",
    "options": ["200/31 units", "16 units", "8 units", "9 units"],
    "answer": 2,
    "explanation": "Distance = |ax0 + by0 + c|/√(a² + b²) = |7(2) + (-24)(-7) + (18)|/√(7² + -24²) = 200/25 = 8 units."
  },
  {
    "question": "If sin θ + cos θ = 0.8, find the value of sin⁴θ + cos⁴θ.",
    "options": ["1331/1250", "1.36", "2419/2500", "1169/1250"],
    "answer": 3,
    "explanation": "sinθ cosθ = (0.64 − 1)/2 = -0.18. Then sin⁴θ + cos⁴θ = 1 − 2(sinθ cosθ)² = 1 − 2(81/2500) = 1169/1250."
  },
  {
    "question": "The price of sugar rises by 150%. By what percentage must a household reduce its consumption so that its expenditure remains unchanged?",
    "options": ["160%", "60%", "65%", "150%"],
    "answer": 1,
    "explanation": "Reduction% = r/(100 + r) × 100 = 150/250 × 100 = 60%."
  },
  {
    "question": "At a meeting, every person shakes hands exactly once with every other person. If there were 378 handshakes in total, how many people attended?",
    "options": ["27", "30", "28", "29"],
    "answer": 2,
    "explanation": "C(n,2) = n(n − 1)/2 = 378, so n² − n − 756 = 0, giving (n − 28)(n + 27) = 0. Hence n = 28."
  },
  {
    "question": "A bag contains 4 red, 7 blue and 7 green balls. Three balls are drawn at random without replacement. Find the probability that one ball of each colour is drawn.",
    "options": ["155/204", "49/408", "49/1458", "49/204"],
    "answer": 3,
    "explanation": "Favourable ways = 4 × 7 × 7 = 196; total ways = C(18,3) = 816. Probability = 49/204."
  },
  {
    "question": "Given log 2 = 0.3010 and log 3 = 0.4771 (base 10), find log 480. Use log 5 = 1 − log 2.",
    "options": ["2.2831", "1.9821", "3.3855", "2.6811"],
    "answer": 3,
    "explanation": "480 = 2^5 × 3^1 × 5^1. So log 480 = 5(0.3010) + 1(0.4771) + 1(0.6990) = 2.6811."
  },
  {
    "question": "A vessel contains 150 litres of a mixture of milk and water in the ratio 7:3. 40 litres of the mixture are drawn out and replaced by water. How many litres of milk are in the vessel now?",
    "options": ["97 litres", "45 litres", "77 litres", "65 litres"],
    "answer": 2,
    "explanation": "Initial milk = 150 × 7/10 = 105 L. Removing 40 L of mixture leaves milk × (150 − 40)/150 = 105 × 110/150 = 77 L."
  },
  {
    "question": "A boat takes 7 hours to travel 105 km downstream and 15 hours to return the same distance upstream. What is the speed of the stream?",
    "options": ["11 km/h", "5 km/h", "22 km/h", "4 km/h"],
    "answer": 3,
    "explanation": "Downstream speed = 105/7 = 15 km/h; upstream speed = 105/15 = 7 km/h. Speed of stream = (15 − 7)/2 = 4 km/h."
  },
  {
    "question": "If 24 November 2001 was a Saturday, what day of the week will 23 April 2025 be?",
    "options": ["Wednesday", "Friday", "Tuesday", "Saturday"],
    "answer": 0,
    "explanation": "The number of days between the two dates is 8551, which leaves remainder 4 when divided by 7 (leap years included). Counting 4 day(s) forward from Saturday gives Wednesday."
  },
  {
    "question": "A right circular cone has a base radius of 8 cm and a slant height of 17 cm. What is its volume?",
    "options": ["640π cm^3", "1088/3π cm^3", "320π cm^3", "680π cm^3"],
    "answer": 2,
    "explanation": "Height = √(17² − 8²) = 15 cm. Volume = (1/3)πr²h = (1/3)π(8)²(15) = 320π cm³."
  },
  {
    "question": "A machine costing Rs. 231808 depreciates at 25% per annum. What will its value be after 3 years?",
    "options": ["Rs. 97794", "Rs. 155746", "Rs. 57952", "Rs. 134014"],
    "answer": 0,
    "explanation": "Value = 231808 × (1 − 25/100)^3 = 231808 × (75/100)^3 = Rs. 97794."
  },
  {
    "question": "Solve for x: 2^(3x - 1) = 4^(2x - 2)",
    "options": ["4", "-3/7", "3", "5"],
    "answer": 2,
    "explanation": "Write 4 = 2^2, so the right side is 2^(2(2x - 2)). Equating exponents: 3x - 1 = 4x - 4, so (3 − 4)x = -3, giving x = 3."
  },
  {
    "question": "A circle is inscribed in a square whose diagonal is 18√2 cm. What is the area of the circle?",
    "options": ["18π cm^2", "81π cm^2", "324π cm^2", "162π cm^2"],
    "answer": 1,
    "explanation": "Side of the square = diagonal/√2 = 18 cm. The inscribed circle has diameter 18 cm, so r = 9 and area = π(9)² = 81π cm²."
  },
  {
    "question": "Two numbers are in the ratio 8:11 and their HCF is 5. What is their LCM?",
    "options": ["55", "440", "88", "2200"],
    "answer": 1,
    "explanation": "The numbers are 40 and 55. Since 8 and 11 are co-prime, LCM = 5 × 8 × 11 = 440."
  },
  {
    "question": "What is the unit digit of 37^2182 + 9^904?",
    "options": ["5", "4", "6", "0"],
    "answer": 3,
    "explanation": "Unit digit of 37^2182 is 9 (cycle of length 4). Unit digit of 9^904 is 1. Their sum ends in 0."
  },
  {
    "question": "Find the fourth proportional to 12, 18 and 20.",
    "options": ["42", "28", "10.8", "30"],
    "answer": 3,
    "explanation": "a : b = c : x gives x = bc/a = 18×20/12 = 30."
  },
  {
    "question": "If log3(x) + log3(x − 242) = 5, what is the value of x?",
    "options": ["485", "1", "242", "243"],
    "answer": 3,
    "explanation": "Combine: log3[x(x − 242)] = 5, so x(x − 242) = 3^5 = 243. Then x^2 − 242x − 243 = 0, i.e. (x − 243)(x + 1) = 0. Since x > 242, the valid root is x = 243."
  },
  {
    "question": "If x + 1/x = 8, find the value of x³ + 1/x³.",
    "options": ["488", "62", "512", "496"],
    "answer": 0,
    "explanation": "x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x) = 8³ − 3(8) = 488."
  },
  {
    "question": "A tap can fill a tank in 12 hours. Because of a leak at the bottom, the tank takes longer to fill. If the leak alone can empty the full tank in 14 hours, how many hours will the tank take to fill with the leak present?",
    "options": ["96 hours", "2 hours", "83 hours", "84 hours"],
    "answer": 3,
    "explanation": "Net filling rate = 1/12 − 1/14 = 2/168 of the tank per hour. So time = 168/2 = 84 hours."
  },
  {
    "question": "Find the area of the triangle with vertices (-2, -2), (6, -5) and (-3, -4).",
    "options": ["19 square units", "20 square units", "10.5 square units", "9.5 square units"],
    "answer": 3,
    "explanation": "Area = ½|x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| = ½|-19| = 9.5 square units."
  },
  {
    "question": "Find the area of a sector of angle 240° in a circle of radius 21 cm. (Give the answer in terms of π.)",
    "options": ["441π cm^2", "588π cm^2", "294π cm^2", "28π cm^2"],
    "answer": 2,
    "explanation": "Area = (θ/360) × πr² = (240/360) × π × 441 = 294π cm²."
  },
  {
    "question": "In an election between two candidates, 20% of the votes cast were invalid. The winner secured 55% of the valid votes and won by a margin of 2400 votes. How many votes were cast in total?",
    "options": ["30000", "60000", "27000", "24000"],
    "answer": 0,
    "explanation": "Let the total be T. Valid votes = 80% of T. Margin = (55 − 45)% of valid votes = 10% × 80% × T = 2400. Solving gives T = 30000."
  },
  {
    "question": "If x − 1/x = 6, find the value of x² + 1/x².",
    "options": ["14", "38", "44", "34"],
    "answer": 1,
    "explanation": "x² + 1/x² = (x − 1/x)² + 2 = 6² + 2 = 38."
  },
  {
    "question": "After 2 years of depreciation at 30% per annum, the value of a machine is Rs. 73304. What was its original price?",
    "options": ["Rs. 183260", "Rs. 117286.4", "Rs. 149600", "Rs. 146608"],
    "answer": 2,
    "explanation": "Original × (70/100)^2 = 73304, so original = 73304 ÷ 0.49 = Rs. 149600."
  },
  {
    "question": "What is the unit digit of 3^2751 + 7^889?",
    "options": ["3", "7", "4", "0"],
    "answer": 2,
    "explanation": "Unit digit of 3^2751 is 7 (cycle of length 4). Unit digit of 7^889 is 7. Their sum ends in 4."
  },
  {
    "question": "y varies directly as the square of x and inversely as z. If y = 64 when x = 8 and z = 4, find y when x = 6 and z = 6.",
    "options": ["48", "4", "28", "24"],
    "answer": 3,
    "explanation": "y = kx²/z. From the first case k = y·z/x² = 64×4/64 = 4. Then y = 4×36/6 = 24."
  },
  {
    "question": "What is the difference between the compound interest and the simple interest on Rs. 18000 for 2 years at 5% per annum?",
    "options": ["Rs. 45", "Rs. 900", "Rs. 945", "Rs. 22.5"],
    "answer": 0,
    "explanation": "For 2 years, CI − SI = P(r/100)^2 = 18000 × (5/100)^2 = 18000 × 25/10000 = Rs. 45."
  },
  {
    "question": "The price of sugar rises by 300%. By what percentage must a household reduce its consumption so that its expenditure remains unchanged?",
    "options": ["75%", "150%", "80%", "300%"],
    "answer": 0,
    "explanation": "Reduction% = r/(100 + r) × 100 = 300/400 × 100 = 75%."
  },
  {
    "question": "What is the sum of all 3-digit numbers that are divisible by 29?",
    "options": ["17197", "17081", "17110", "16095"],
    "answer": 1,
    "explanation": "The multiples form an AP from 116 to 986 with common difference 29. Number of terms = (986 − 116)/29 + 1 = 31. Sum = 31/2 × (116 + 986) = 17081."
  },
  {
    "question": "A can finish a piece of work in 30 days and B can finish it in 6 days. They work on alternate days, beginning with A. In how many days will the work be completed?",
    "options": ["5 days", "10 days", "12 days", "9 days"],
    "answer": 1,
    "explanation": "In every 2-day cycle they complete 1/30 + 1/6 = 1/5 of the work. After 5 cycles (10 days) 1 is done, leaving 0. Nothing remains, so the work ends on day 10."
  },
  {
    "question": "How many integers x satisfy x^2 + 5x < 0?",
    "options": ["5", "4", "3", "6"],
    "answer": 1,
    "explanation": "The quadratic factors as (x − -5)(x − 0) < 0, so -5 < x < 0. The integers strictly between are 4."
  },
  {
    "question": "If x = 9 + √80, find the value of x² + 1/x².",
    "options": ["18", "324", "322", "160"],
    "answer": 2,
    "explanation": "1/x = 1/(9 + √80) = 9 − √80 (since 9² − 80 = 1). So x + 1/x = 18 and x² + 1/x² = 18² − 2 = 322."
  },
  {
    "question": "From two points on the same straight line through the foot of a tower, the angles of elevation of its top are 30° and 60°. If the points are 70 m apart, what is the height of the tower?",
    "options": ["70√3 m", "70/√3 m", "35√3 m", "70√3/3 m"],
    "answer": 2,
    "explanation": "If the height is h, the distances from the foot are h√3 (30°) and h/√3 (60°). Their difference is 2h/√3 = 70, so h = 70√3/2 = 35√3 m."
  },
  {
    "question": "Find the perpendicular distance of the point (-4, -6) from the line 5x - 12y + 13 = 0.",
    "options": ["5 units", "65/17 units", "65 units", "6 units"],
    "answer": 0,
    "explanation": "Distance = |ax0 + by0 + c|/√(a² + b²) = |5(-4) + (-12)(-6) + (13)|/√(5² + -12²) = 65/13 = 5 units."
  },
  {
    "question": "Find the remainder when 13^154 is divided by 7.",
    "options": ["6", "4", "1", "5"],
    "answer": 2,
    "explanation": "Since gcd(13, 7) = 1, 13^2 ≡ 1 (mod 7). Now 154 = 2 × 77 + 0, so 13^154 ≡ 13^0 ≡ 1 (mod 7)."
  },
  {
    "question": "If the equation x^2 + (m − 4)x + 64 = 0 has equal roots, find the larger value of m.",
    "options": ["-12", "20", "12", "16"],
    "answer": 1,
    "explanation": "Discriminant = 0: (m − 4)² − 4(64) = 0, so m − 4 = ±16. The larger value is m = 4 + 16 = 20."
  },
  {
    "question": "A trader marks his goods 20% above the cost price and then allows successive discounts of 10% and 5% on the marked price. Find his net profit or loss percent.",
    "options": ["Profit 5%", "Profit 2.6%", "Profit 2.5%", "Profit 3.1%"],
    "answer": 1,
    "explanation": "Take cost = 100. Marked price = 120. After 10% discount: 108. After 5% discount: 102.6. So profit = 2.6%."
  },
  {
    "question": "In how many ways can the letters of the word PROBABILITY be arranged so that no two vowels are adjacent?",
    "options": ["176400", "1058400", "7862400", "2116800"],
    "answer": 3,
    "explanation": "Arrange the 7 consonants first: 2520 ways. This creates 8 gaps; choose 4 of them for the vowels: C(8,4) = 70. Arrange the vowels: 12 ways. Total = 2520 × 70 × 12 = 2116800."
  },
  {
    "question": "The parallel sides of an isosceles trapezium are 5 cm and 23 cm, and each non-parallel side is 15 cm. Find its area.",
    "options": ["168 cm^2", "210 cm^2", "126 cm^2", "336 cm^2"],
    "answer": 0,
    "explanation": "Each triangle cut off at the ends has base (23 − 5)/2 = 9 cm and hypotenuse 15 cm, so the height is √(15² − 9²) = 12 cm. Area = ½(5 + 23) × 12 = 168 cm²."
  },
  {
    "question": "Evaluate: 4 sin^2 30° + 1 cos^2 30° + 1 tan^2 45°",
    "options": ["4.25", "2.75", "2.5", "3.25"],
    "answer": 1,
    "explanation": "sin²30° = 1/4, cos²30° = 3/4, tan²45° = 1. Value = 4(1/4) + 1(3/4) + 1(1) = 2.75."
  },
  {
    "question": "A can finish a piece of work in 24 days and B can finish it in 12 days. They work on alternate days, beginning with A. In how many days will the work be completed?",
    "options": ["15 days", "17 days", "16 days", "8 days"],
    "answer": 2,
    "explanation": "In every 2-day cycle they complete 1/24 + 1/12 = 1/8 of the work. After 8 cycles (16 days) 1 is done, leaving 0. Nothing remains, so the work ends on day 16."
  },
  {
    "question": "Find the third proportional to 9 and 27.",
    "options": ["36", "3", "81", "90"],
    "answer": 2,
    "explanation": "If a : b = b : c, then c = b²/a = 27²/9 = 81."
  },
  {
    "question": "For what value of k is the line 2x + 8y = 14 perpendicular to the line kx - 3y = 9?",
    "options": ["-24", "12", "-12", "2"],
    "answer": 1,
    "explanation": "The product of slopes must be −1: (−2/(8))(−k/(-3)) = −1, so 2k = −(8)(-3), giving k = 12."
  },
  {
    "question": "A bag contains 3 red, 8 blue and 8 green balls. Two balls are drawn at random without replacement. What is the probability that both are of the same colour?",
    "options": ["137/361", "59/171", "112/171", "1/57"],
    "answer": 1,
    "explanation": "Favourable = C(3,2) + C(8,2) + C(8,2) = 59; total = C(19,2) = 171. Probability = 59/171."
  },
  {
    "question": "Rice costing Rs. 75 per kg is mixed with rice costing Rs. 110 per kg. In what ratio (cheaper : dearer) should they be mixed so that the mixture is worth Rs. 85 per kg?",
    "options": ["5:7", "2:5", "15:22", "5:2"],
    "answer": 3,
    "explanation": "By alligation, cheaper : dearer = (dearer price − mean) : (mean − cheaper price) = (110 − 85) : (85 − 75) = 25:10 = 5:2."
  },
  {
    "question": "Find the sum to infinity of the geometric series with first term 3 and common ratio 3/4.",
    "options": ["9", "15", "12", "12/7"],
    "answer": 2,
    "explanation": "S∞ = a/(1 − r) = 3/(1 − 3/4) = 3/(1/4) = 12."
  },
  {
    "question": "Rice costing Rs. 50 per kg is mixed with rice costing Rs. 65 per kg. In what ratio (cheaper : dearer) should they be mixed so that the mixture is worth Rs. 60 per kg?",
    "options": ["2:1", "2:3", "1:3", "1:2"],
    "answer": 3,
    "explanation": "By alligation, cheaper : dearer = (dearer price − mean) : (mean − cheaper price) = (65 − 60) : (60 − 50) = 5:10 = 1:2."
  },
  {
    "question": "A convex polygon has 27 diagonals. How many sides does it have?",
    "options": ["11", "9", "10", "7"],
    "answer": 1,
    "explanation": "n(n − 3)/2 = 27, so n² − 3n − 54 = 0, i.e. (n − 9)(n + 6) = 0. Hence n = 9."
  },
  {
    "question": "If 3^(x + 3) − 3^x = 2106, find the value of x.",
    "options": ["6", "3", "5", "4"],
    "answer": 3,
    "explanation": "Factor out 3^x: 3^x(3^3 − 1) = 3^x × 26 = 2106. So 3^x = 81, giving x = 4."
  },
  {
    "question": "A triangle has a perimeter of 80 cm and an area of 240 cm². What is the radius of its incircle?",
    "options": ["40 cm", "6 cm", "3 cm", "12 cm"],
    "answer": 1,
    "explanation": "Area = r × s where s is the semi-perimeter = 40 cm. So r = 240/40 = 6 cm."
  },
  {
    "question": "In an election between two candidates, 10% of the votes cast were invalid. The winner secured 70% of the valid votes and won by a margin of 7200 votes. How many votes were cast in total?",
    "options": ["40000", "22000", "18000", "20000"],
    "answer": 3,
    "explanation": "Let the total be T. Valid votes = 90% of T. Margin = (70 − 30)% of valid votes = 40% × 90% × T = 7200. Solving gives T = 20000."
  },
  {
    "question": "6 fair coins are tossed. Given that at least one head appears, what is the probability that exactly 3 heads appear?",
    "options": ["10/31", "10/3", "20/63", "5/16"],
    "answer": 2,
    "explanation": "P(exactly 3) = C(6,3)/2^6 = 20/64; P(at least one head) = 1 − 1/64 = 63/64. Conditional probability = 20/63 = 20/63."
  },
  {
    "question": "What is the smallest 4-digit number exactly divisible by 20, 90 and 36?",
    "options": ["1000", "1260", "180", "1080"],
    "answer": 3,
    "explanation": "LCM(20, 90, 36) = 180. The smallest 4-digit multiple of 180 is 6 × 180 = 1080."
  },
  {
    "question": "What is the unit digit of 9^242?",
    "options": ["8", "2", "6", "1"],
    "answer": 3,
    "explanation": "The unit digits of powers of 9 repeat in a cycle of length 2: 9, 1. Since 242 leaves position 2 in the cycle, the unit digit is 1."
  },
  {
    "question": "In how many ways can the letters of the word INTEGRAL be arranged so that all the vowels come together?",
    "options": ["4320", "8640", "40320", "720"],
    "answer": 0,
    "explanation": "Treat the 3 vowels as one block. Arrange the block with the 5 consonants: 720 ways. Arrange the vowels inside the block: 6 ways. Total = 720 × 6 = 4320."
  },
  {
    "question": "A boat takes 1 hours to travel 21 km downstream and 3 hours to return the same distance upstream. What is the speed of the stream?",
    "options": ["28 km/h", "8 km/h", "7 km/h", "14 km/h"],
    "answer": 2,
    "explanation": "Downstream speed = 21/1 = 21 km/h; upstream speed = 21/3 = 7 km/h. Speed of stream = (21 − 7)/2 = 7 km/h."
  },
  {
    "question": "If x = 5 + √24, find the value of x² + 1/x².",
    "options": ["100", "48", "102", "98"],
    "answer": 3,
    "explanation": "1/x = 1/(5 + √24) = 5 − √24 (since 5² − 24 = 1). So x + 1/x = 10 and x² + 1/x² = 10² − 2 = 98."
  },
  {
    "question": "Two trains of lengths 180 m and 370 m run on parallel tracks in opposite directions at 90 km/h and 60 km/h respectively. In how many seconds will they completely cross each other?",
    "options": ["11/3 seconds", "13.2 seconds", "66 seconds", "4.32 seconds"],
    "answer": 1,
    "explanation": "Relative speed = 90 + 60 = 150 km/h = 125/3 m/s. Distance = 180 + 370 = 550 m. Time = 550 ÷ 125/3 = 13.2 s."
  },
  {
    "question": "What is the mean proportional between 32 and 8?",
    "options": ["15", "18", "16", "20"],
    "answer": 2,
    "explanation": "Mean proportional = √(32 × 8) = √256 = 16."
  },
  {
    "question": "A can finish a piece of work in 20 days and B can finish it in 18 days. They work on alternate days, beginning with A. In how many days will the work be completed?",
    "options": ["20 days", "18 days", "180/19 days", "19 days"],
    "answer": 3,
    "explanation": "In every 2-day cycle they complete 1/20 + 1/18 = 19/180 of the work. After 9 cycles (18 days) 0.95 is done, leaving 1/20. A does 1/20 on the next day and finishes it. Total = 19 days."
  },
  {
    "question": "Three positive numbers are in geometric progression. Their sum is 21 and their product is 64. Find the largest of the three numbers.",
    "options": ["4", "15", "17", "16"],
    "answer": 3,
    "explanation": "Write the numbers as a/r, a, ar. Product a³ = 64, so a = 4. Then 4(1/r + 1 + r) = 21 gives r = 4. The numbers are 1, 4, 16, and the largest is 16."
  },
  {
    "question": "If f(x) = 4x^2 - 5x + 6 and g(x) = x + 2, find f(g(1)).",
    "options": ["31", "27", "8", "21"],
    "answer": 1,
    "explanation": "g(1) = 3, so f(g(1)) = f(3) = 27."
  },
  {
    "question": "A batsman scores 89 runs in his 10th innings and thereby increases his average by 4 runs. What is his average after the 10th innings?",
    "options": ["57", "49", "53", "59"],
    "answer": 2,
    "explanation": "Let the old average be A. Then ((10−1)A + 89)/10 = A + 4, giving A = 89 − 10(4) = 49. New average = 49 + 4 = 53."
  },
  {
    "question": "In a class of 64 students, 22 study Chemistry, 31 study Physics and 23 study English. 6 study both Chemistry and Physics, 10 study both Physics and English, 4 study both English and Chemistry, and 2 study all three subjects. How many students study only Chemistry?",
    "options": ["16", "12", "14", "20"],
    "answer": 2,
    "explanation": "Only Chemistry = 22 − 6 − 4 + 2 = 14."
  },
  {
    "question": "Evaluate: 3 sin^2 30° + 1 cos^2 60° + 1 tan^2 45°",
    "options": ["1.75", "4", "3", "2"],
    "answer": 3,
    "explanation": "sin²30° = 1/4, cos²60° = 1/4, tan²45° = 1. Value = 3(1/4) + 1(1/4) + 1(1) = 2."
  },
  {
    "question": "A shopkeeper mixes 50 kg of flour costing Rs. 45/kg with 50 kg of flour costing Rs. 75/kg. At what price per kg must he sell the mixture to earn a profit of 25%?",
    "options": ["Rs. 60", "Rs. 45", "Rs. 80", "Rs. 75"],
    "answer": 3,
    "explanation": "Total cost = 50×45 + 50×75 = 6000, cost per kg = 60. Selling price = 60 × 125/100 = Rs. 75 per kg."
  },
  {
    "question": "In a class of 80 students, 28 study English, 33 study Physics and 27 study Biology. 11 study both English and Physics, 10 study both Physics and Biology, 9 study both Biology and English, and 3 study all three subjects. How many students study exactly one subject?",
    "options": ["58", "31", "37", "29"],
    "answer": 2,
    "explanation": "Exactly one = n(A ∪ B ∪ C) − (exactly two) − (all three) = 61 − 21 − 3 = 37."
  },
  {
    "question": "A starts a business with Rs. 60000. After 3 months, B joins with Rs. 75000. At the end of the year the total profit is Rs. 15500. What is B's share of the profit?",
    "options": ["Rs. 7500", "Rs. 8500", "Rs. 7750", "Rs. 77500/9"],
    "answer": 0,
    "explanation": "A's capital-time = 60000 × 12 and B's = 75000 × 9. Ratio A : B = 16 : 15. B's share = 15500 × 15/31 = Rs. 7500."
  },
  {
    "question": "What is the unit digit of 4^2625?",
    "options": ["5", "0", "7", "4"],
    "answer": 3,
    "explanation": "The unit digits of powers of 4 repeat in a cycle of length 2: 4, 6. Since 2625 leaves position 1 in the cycle, the unit digit is 4."
  },
  {
    "question": "The present ages of Ali and Sara are in the ratio 7:8. After 4 years their ages will be in the ratio 15:17. What is Sara's present age?",
    "options": ["64 years", "120 years", "60 years", "56 years"],
    "answer": 0,
    "explanation": "Let the ages be 7k and 8k. Then (7k + 4)/(8k + 4) = 15/17, so 17(7k + 4) = 15(8k + 4). This gives k = 8, so Sara's age = 8 × 8 = 64 years."
  },
  {
    "question": "Find the product of all real solutions of |x - 6| = 1.",
    "options": ["8", "-35", "35", "12"],
    "answer": 2,
    "explanation": "The equation splits into x - 6 = 1 and x - 6 = −1, giving x = 7 and x = 5. Product = 7 × (5) = 35."
  },
  {
    "question": "A cone has a height of 16 cm and a slant height of 20 cm. Find its curved surface area.",
    "options": ["384π cm^2", "240π cm^2", "320π cm^2", "192π cm^2"],
    "answer": 1,
    "explanation": "Radius = √(20² − 16²) = 12 cm. Curved surface area = πrl = π × 12 × 20 = 240π cm²."
  },
  {
    "question": "A train takes 16 seconds to pass a signal pole and 29 seconds to cross a platform 260 m long. What is the length of the train?",
    "options": ["260 m", "320 m", "580 m", "4160/29 m"],
    "answer": 1,
    "explanation": "The extra 29 − 16 = 13 s is spent covering the platform's 260 m, so speed = 260/13 = 20 m/s. Length of train = 20 × 16 = 320 m."
  },
  {
    "question": "A and B together can complete a job in 15 days, B and C together in 12 days, and C and A together in 60 days. How many days will A, B and C take to complete it working together?",
    "options": ["12 days", "29 days", "14 days", "6 days"],
    "answer": 0,
    "explanation": "Adding the three rates: 2(A + B + C) = 1/15 + 1/12 + 1/60 = 1/6. So A + B + C = 1/12 per day, and the time is 12 days."
  },
  {
    "question": "Find the greatest number that divides 565, 2085 and 2645 leaving the same remainder 5 in each case.",
    "options": ["80", "40", "75", "85"],
    "answer": 0,
    "explanation": "The required number divides the differences: 1520, 560 and 2080. Their HCF is 80, and since 80 > 5 it is a valid divisor. Answer: 80."
  },
  {
    "question": "Find the coordinates of the point that divides the line segment joining A(-5, 1) and B(-11, 19) internally in the ratio 2:4.",
    "options": ["(-7, 7)", "(-8, 10)", "(-6, 6)", "(7, -7)"],
    "answer": 0,
    "explanation": "Section formula: x = (2×-11 + 4×-5)/6 = -7, y = (2×19 + 4×1)/6 = 7. The point is (-7, 7)."
  },
  {
    "question": "A chord 84 cm long is drawn in a circle of radius 58 cm. How far is the chord from the centre?",
    "options": ["40 cm", "16 cm", "42 cm", "41 cm"],
    "answer": 0,
    "explanation": "Half the chord = 42 cm, so the distance = √(58² − 42²) = √1600 = 40 cm."
  },
  {
    "question": "If sin θ + cos θ = 2/3, find the value of sin³θ + cos³θ.",
    "options": ["23/27", "17/18", "13/27", "8/27"],
    "answer": 0,
    "explanation": "sinθ cosθ = -5/18. sin³θ + cos³θ = (sinθ + cosθ)(1 − sinθ cosθ) = 2/3 × 23/18 = 23/27."
  },
  {
    "question": "A trader marks his goods 60% above the cost price and then allows successive discounts of 15% and 15% on the marked price. Find his net profit or loss percent.",
    "options": ["Profit 15%", "Profit 15.6%", "Profit 17.85%", "Profit 30%"],
    "answer": 1,
    "explanation": "Take cost = 100. Marked price = 160. After 15% discount: 136. After 15% discount: 115.6. So profit = 15.6%."
  },
  {
    "question": "A and B together can complete a job in 60 days, B and C together in 36 days, and C and A together in 15 days. How many days will A, B and C take to complete it working together?",
    "options": ["9 days", "18 days", "37 days", "20 days"],
    "answer": 1,
    "explanation": "Adding the three rates: 2(A + B + C) = 1/60 + 1/36 + 1/15 = 1/9. So A + B + C = 1/18 per day, and the time is 18 days."
  },
  {
    "question": "If tan θ = 7/24 and θ is an acute angle, find the value of (1 + sin θ)/(1 − sin θ).",
    "options": ["16/9", "17/9", "9/16", "1.24"],
    "answer": 0,
    "explanation": "With sin θ = 7/25, cos θ = 24/25 and tan θ = 7/24 (from a 7-24-25 right triangle), (1 + sin θ)/(1 − sin θ) = 16/9."
  },
  {
    "question": "Three positive numbers are in geometric progression. Their sum is 7 and their product is 8. Find the largest of the three numbers.",
    "options": ["5", "2", "4", "3"],
    "answer": 2,
    "explanation": "Write the numbers as a/r, a, ar. Product a³ = 8, so a = 2. Then 2(1/r + 1 + r) = 7 gives r = 2. The numbers are 1, 2, 4, and the largest is 4."
  },
  {
    "question": "The parallel sides of an isosceles trapezium are 17 cm and 33 cm, and each non-parallel side is 17 cm. Find its area.",
    "options": ["750 cm^2", "375 cm^2", "425 cm^2", "390 cm^2"],
    "answer": 1,
    "explanation": "Each triangle cut off at the ends has base (33 − 17)/2 = 8 cm and hypotenuse 17 cm, so the height is √(17² − 8²) = 15 cm. Area = ½(17 + 33) × 15 = 375 cm²."
  },
  {
    "question": "If x + 1/x = 7, find the value of x³ + 1/x³.",
    "options": ["322", "47", "329", "343"],
    "answer": 0,
    "explanation": "x³ + 1/x³ = (x + 1/x)³ − 3(x + 1/x) = 7³ − 3(7) = 322."
  },
  {
    "question": "How many integers x satisfy x^2 - 9 < 0?",
    "options": ["7", "6", "4", "5"],
    "answer": 3,
    "explanation": "The quadratic factors as (x − -3)(x − 3) < 0, so -3 < x < 3. The integers strictly between are 5."
  },
  {
    "question": "A boat takes 5 hours to travel 105 km downstream and 7 hours to travel the same distance upstream. What is the speed of the boat in still water?",
    "options": ["18 km/h", "15 km/h", "3 km/h", "20 km/h"],
    "answer": 0,
    "explanation": "Downstream speed = 21 km/h and upstream speed = 15 km/h. Speed in still water = (21 + 15)/2 = 18 km/h."
  },
  {
    "question": "If (x + 1) is a factor of x^3 + px^2 - 6x - 11, find the value of p.",
    "options": ["6", "-6", "4", "7"],
    "answer": 0,
    "explanation": "By the factor theorem, substituting x = -1: (-1)³ + p(-1)² + (-6)(-1) + (-11) = 0, so 1p = 6 and p = 6."
  },
  {
    "question": "In how many ways can a committee of 6 be chosen from 6 men and 4 women if one particular woman must be on the committee?",
    "options": ["182", "56", "84", "126"],
    "answer": 3,
    "explanation": "Once she is fixed, choose the remaining 5 members from the other 9 people: C(9,5) = 126."
  },
  {
    "question": "If a + b + c = 1 and a² + b² + c² = 49, find the value of a³ + b³ + c³ − 3abc.",
    "options": ["25", "73", "97", "49"],
    "answer": 1,
    "explanation": "ab + bc + ca = ((1)² − 49)/2 = -24. Then a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca) = 1(49 − -24) = 73."
  },
  {
    "question": "After 3 years of depreciation at 25% per annum, the value of a machine is Rs. 75789. What was its original price?",
    "options": ["Rs. 303156", "Rs. 93753", "Rs. 132630.75", "Rs. 179648"],
    "answer": 3,
    "explanation": "Original × (75/100)^3 = 75789, so original = 75789 ÷ 27/64 = Rs. 179648."
  },
  {
    "question": "A fair coin is tossed 6 times. What is the probability of getting at least 3 heads?",
    "options": ["41/64", "21/32", "5/16", "11/32"],
    "answer": 1,
    "explanation": "Favourable outcomes = C(6,3) + C(6,4) + C(6,5) + C(6,6) = 42. Total = 2^6 = 64. Probability = 21/32."
  },
  {
    "question": "Find the greatest number that divides 452, 1577 and 1677 leaving the same remainder 2 in each case.",
    "options": ["26", "50", "27", "25"],
    "answer": 3,
    "explanation": "The required number divides the differences: 1125, 100 and 1225. Their HCF is 25, and since 25 > 2 it is a valid divisor. Answer: 25."
  },
  {
    "question": "The average marks of 31 students of section A is 80 and that of 19 students of section B is 54. What is the average marks of all the students taken together?",
    "options": ["67.12", "72.12", "70.12", "3506/51"],
    "answer": 2,
    "explanation": "Combined average = (31×80 + 19×54)/(31+19) = 3506/50 = 70.12."
  },
  {
    "question": "If 5^(x + 3) + 5^x = 3150, find the value of x.",
    "options": ["2", "1", "4", "3"],
    "answer": 0,
    "explanation": "Factor out 5^x: 5^x(5^3 + 1) = 5^x × 126 = 3150. So 5^x = 25, giving x = 2."
  },
  {
    "question": "Two runners start together from the same point of a circular track 300 m long and run in the same direction at 12 m/s and 8 m/s. After how many seconds will the faster runner first lap the slower one?",
    "options": ["25 seconds", "125 seconds", "150 seconds", "75 seconds"],
    "answer": 3,
    "explanation": "They meet again when the faster gains one full lap on the slower. Relative speed = 12 − 8 = 4 m/s, so time = 300/4 = 75 s."
  },
  {
    "question": "What is the smallest positive integer by which 405 must be divided to obtain a perfect cube?",
    "options": ["17", "30", "16", "15"],
    "answer": 3,
    "explanation": "405 = 3^4 × 5. Remove the leftover exponents modulo 3: 3^1 × 5^1 = 15."
  },
  {
    "question": "A solid metal cylinder of radius 2 cm and height 9 cm is melted and recast into identical cones, each of radius 1 cm and height 1 cm. How many cones are obtained?",
    "options": ["54", "111", "216", "108"],
    "answer": 3,
    "explanation": "Number = volume of cylinder ÷ volume of a cone = π(2)²(9) ÷ [(1/3)π(1)²(1)] = 3 × 36/1 = 108."
  },
  {
    "question": "If the equation x^2 + (m − 3)x + 9 = 0 has equal roots, find the larger value of m.",
    "options": ["12", "6", "-3", "9"],
    "answer": 3,
    "explanation": "Discriminant = 0: (m − 3)² − 4(9) = 0, so m − 3 = ±6. The larger value is m = 3 + 6 = 9."
  },
  {
    "question": "Find the third proportional to 5 and 20.",
    "options": ["80", "1.25", "85", "25"],
    "answer": 0,
    "explanation": "If a : b = b : c, then c = b²/a = 20²/5 = 80."
  },
  {
    "question": "A is 2 times as efficient as B. Working together they finish a task in 12 days. How many days will A alone take?",
    "options": ["18 days", "36 days", "9 days", "24 days"],
    "answer": 0,
    "explanation": "Let B alone take x days; then A takes x/2 days. 1/x + 2/x = 1/12 gives x = 36. So A alone takes 36/2 = 18 days."
  },
  {
    "question": "A starts a business with Rs. 80000. After 4 months, B joins with Rs. 75000. At the end of the year the total profit is Rs. 13000. What is B's share of the profit?",
    "options": ["Rs. 5000", "Rs. 6500", "Rs. 8000", "Rs. 6000"],
    "answer": 0,
    "explanation": "A's capital-time = 80000 × 12 and B's = 75000 × 8. Ratio A : B = 8 : 5. B's share = 13000 × 5/13 = Rs. 5000."
  },
  {
    "question": "From two points on the same straight line through the foot of a tower, the angles of elevation of its top are 30° and 60°. If the points are 100 m apart, what is the height of the tower?",
    "options": ["50 m", "50√3 m", "100√3/3 m", "100/√3 m"],
    "answer": 1,
    "explanation": "If the height is h, the distances from the foot are h√3 (30°) and h/√3 (60°). Their difference is 2h/√3 = 100, so h = 100√3/2 = 50√3 m."
  },
  {
    "question": "Find the product of all real solutions of |x + 8| = 3.",
    "options": ["-55", "-4", "-16", "55"],
    "answer": 3,
    "explanation": "The equation splits into x + 8 = 3 and x + 8 = −3, giving x = -5 and x = -11. Product = -5 × (-11) = 55."
  },
  {
    "question": "How many positive divisors does 4802 have?",
    "options": ["10", "12", "5", "20"],
    "answer": 0,
    "explanation": "4802 = 2 × 7^4. Number of divisors = (1+1) × (4+1) = 10."
  },
  {
    "question": "Two trains of lengths 260 m and 280 m run on parallel tracks in opposite directions at 84 km/h and 96 km/h respectively. In how many seconds will they completely cross each other?",
    "options": ["21.6 seconds", "3 seconds", "10.8 seconds", "5.2 seconds"],
    "answer": 2,
    "explanation": "Relative speed = 84 + 96 = 180 km/h = 50 m/s. Distance = 260 + 280 = 540 m. Time = 540 ÷ 50 = 10.8 s."
  },
  {
    "question": "Given log 2 = 0.3010 and log 3 = 0.4771 (base 10), find log 1800. Use log 5 = 1 − log 2.",
    "options": ["3.4313", "3.2552", "1.8572", "2.4592"],
    "answer": 1,
    "explanation": "1800 = 2^3 × 3^2 × 5^2. So log 1800 = 3(0.3010) + 2(0.4771) + 2(0.6990) = 3.2552."
  },
  {
    "question": "The parallel sides of an isosceles trapezium are 20 cm and 26 cm, and each non-parallel side is 5 cm. Find its area.",
    "options": ["115 cm^2", "69 cm^2", "184 cm^2", "92 cm^2"],
    "answer": 3,
    "explanation": "Each triangle cut off at the ends has base (26 − 20)/2 = 3 cm and hypotenuse 5 cm, so the height is √(5² − 3²) = 4 cm. Area = ½(20 + 26) × 4 = 92 cm²."
  },
  {
    "question": "Two runners start together from the same point of a circular track 400 m long and run in the same direction at 6 m/s and 4 m/s. After how many seconds will the faster runner first lap the slower one?",
    "options": ["400 seconds", "200 seconds", "250 seconds", "190 seconds"],
    "answer": 1,
    "explanation": "They meet again when the faster gains one full lap on the slower. Relative speed = 6 − 4 = 2 m/s, so time = 400/2 = 200 s."
  },
  {
    "question": "Find the product of all real solutions of |2x - 2| = 14.",
    "options": ["2", "9", "48", "-48"],
    "answer": 3,
    "explanation": "The equation splits into 2x - 2 = 14 and 2x - 2 = −14, giving x = 8 and x = -6. Product = 8 × (-6) = -48."
  },
  {
    "question": "The price of an item falls by 60%. By what percentage must consumption increase so that the total expenditure remains the same?",
    "options": ["60%", "160%", "150%", "40%"],
    "answer": 2,
    "explanation": "Increase% = x/(100 − x) × 100 = 60/40 × 100 = 150%."
  },
  {
    "question": "What is the angle between the hour hand and the minute hand of a clock at 3:18?",
    "options": ["4°", "9°", "18°", "16.5°"],
    "answer": 1,
    "explanation": "Hour hand angle from 12 = 30(3) + 0.5(18) = 99°. Minute hand angle = 6(18) = 108°. Difference = 9°, so the smaller angle is 9°."
  },
  {
    "question": "The equation x^2 − kx + 75 = 0 has one root equal to 3 times the other root. Find the positive value of k.",
    "options": ["20", "15", "25", "76"],
    "answer": 0,
    "explanation": "Let the roots be r and 3r. Product: 3r² = 75, so r = 5. Then k = r + 3r = 4r = 20."
  },
  {
    "question": "A triangle has a perimeter of 70 cm and an area of 210 cm². What is the radius of its incircle?",
    "options": ["12 cm", "7 cm", "6 cm", "3 cm"],
    "answer": 2,
    "explanation": "Area = r × s where s is the semi-perimeter = 35 cm. So r = 210/35 = 6 cm."
  },
  {
    "question": "A trader marks his goods 40% above the cost price and then allows successive discounts of 10% and 15% on the marked price. Find his net profit or loss percent.",
    "options": ["Profit 8.6%", "Loss 7.1%", "Profit 7.1%", "Profit 15%"],
    "answer": 2,
    "explanation": "Take cost = 100. Marked price = 140. After 10% discount: 126. After 15% discount: 107.1. So profit = 7.1%."
  },
  {
    "question": "A bag contains 7 red and 15 non-red balls. Two balls are drawn at random without replacement. Find the probability that at least one of them is red.",
    "options": ["7/11", "5/11", "7/22", "6/11"],
    "answer": 3,
    "explanation": "P(no red) = C(15,2)/C(22,2) = 5/11. So P(at least one red) = 1 − that = 6/11."
  },
  {
    "question": "If 4x - 5y = 31 and 3x - 4y = 23, find the value of 4x - 1y.",
    "options": ["36", "39", "10", "35"],
    "answer": 3,
    "explanation": "Solving the two equations (eliminating one variable) gives x = 9 and y = 1. Therefore 4x - 1y = 4(9) - 1(1) = 35."
  },
  {
    "question": "If A : B = 7 : 5 and B : C = 3 : 5, find A : B : C.",
    "options": ["7:15:5", "7:5:3", "7:5:5", "21:15:25"],
    "answer": 3,
    "explanation": "Make B equal in both ratios: A : B = 21 : 15 and B : C = 15 : 25. So A : B : C = 21 : 15 : 25 = 21:15:25."
  },
  {
    "question": "Evaluate: 4 sin^2 30° + 3 cos^2 45° + 2 tan^2 60°",
    "options": ["8.5", "10.5", "8.25", "9"],
    "answer": 0,
    "explanation": "sin²30° = 1/4, cos²45° = 1/2, tan²60° = 3. Value = 4(1/4) + 3(1/2) + 2(3) = 8.5."
  },
  {
    "question": "Two fair dice are rolled together. What is the probability that the sum of the two numbers is a prime number?",
    "options": ["5/12", "7/12", "0.5", "7/18"],
    "answer": 0,
    "explanation": "Counting the outcomes among the 36 equally likely ones for which the sum of the two numbers is a prime number gives 15 favourable outcomes. Probability = 15/36 = 5/12."
  },
  {
    "question": "Find the sum of the squares of the first 6 odd natural numbers.",
    "options": ["286", "250", "292", "91"],
    "answer": 0,
    "explanation": "Sum = n(2n − 1)(2n + 1)/3 = 6(11)(13)/3 = 286."
  },
  {
    "question": "Evaluate: 4 sin^2 30° + 4 cos^2 60° + 1 tan^2 30°",
    "options": ["10/3", "25/12", "19/3", "7/3"],
    "answer": 3,
    "explanation": "sin²30° = 1/4, cos²60° = 1/4, tan²30° = 1/3. Value = 4(1/4) + 4(1/4) + 1(1/3) = 7/3."
  },
  {
    "question": "Find the coordinates of the point that divides the line segment joining A(3, 7) and B(-2, 7) internally in the ratio 1:4.",
    "options": ["(2, 7)", "(0.5, 7)", "(3, 6)", "(7, 2)"],
    "answer": 0,
    "explanation": "Section formula: x = (1×-2 + 4×3)/5 = 2, y = (1×7 + 4×7)/5 = 7. The point is (2, 7)."
  },
  {
    "question": "If cos θ = 20/29 and θ is an acute angle, find the value of (1 + sin θ)/(1 − sin θ).",
    "options": ["6.5", "0.16", "6.25", "41/29"],
    "answer": 2,
    "explanation": "With sin θ = 21/29, cos θ = 20/29 and tan θ = 21/20 (from a 21-20-29 right triangle), (1 + sin θ)/(1 − sin θ) = 6.25."
  },
  {
    "question": "Find the remainder when 28^199 is divided by 23.",
    "options": ["13", "5", "0", "11"],
    "answer": 1,
    "explanation": "Since gcd(28, 23) = 1, 28^22 ≡ 1 (mod 23). Now 199 = 22 × 9 + 1, so 28^199 ≡ 28^1 ≡ 5 (mod 23)."
  },
  {
    "question": "The side of a square is increased by 40%. By what percentage does its area increase?",
    "options": ["40%", "96%", "80%", "16%"],
    "answer": 1,
    "explanation": "New area/old area = (1 + 40/100)² = 1.96. Increase = 96%."
  },
  {
    "question": "If f(x) = 3x^2 - 3x + 3 and g(x) = 2x + 2, find f(g(2)) − g(f(2)).",
    "options": ["113", "-73", "75", "73"],
    "answer": 3,
    "explanation": "f(g(2)) = f(6) = 93 and g(f(2)) = g(9) = 20. Difference = 93 − (20) = 73."
  },
  {
    "question": "A tap can fill a tank in 8 hours. Because of a leak at the bottom, the tank takes longer to fill. If the leak alone can empty the full tank in 9 hours, how many hours will the tank take to fill with the leak present?",
    "options": ["72/17 hours", "1 hours", "80 hours", "72 hours"],
    "answer": 3,
    "explanation": "Net filling rate = 1/8 − 1/9 = 1/72 of the tank per hour. So time = 72/1 = 72 hours."
  },
  {
    "question": "A tower casts a shadow 60 m long when the angle of elevation of the sun is 30°. Find the height of the tower.",
    "options": ["60 m", "20√3 m", "60√3 m", "40√3 m"],
    "answer": 1,
    "explanation": "tan 30° = h/60 = 1/√3, so h = 60/√3 = 20√3 m."
  },
  {
    "question": "In how many ways can the letters of the word PAKISTAN be arranged so that all the vowels come together?",
    "options": ["2160", "4320", "360", "720"],
    "answer": 0,
    "explanation": "Treat the 3 vowels as one block. Arrange the block with the 5 consonants: 720 ways. Arrange the vowels inside the block: 3 ways. Total = 720 × 3 = 2160."
  },
  {
    "question": "Given log 2 = 0.3010 and log 3 = 0.4771 (base 10), find log 120. Use log 5 = 1 − log 2.",
    "options": ["1.6811", "2.4313", "2.0791", "1.3801"],
    "answer": 2,
    "explanation": "120 = 2^3 × 3^1 × 5^1. So log 120 = 3(0.3010) + 1(0.4771) + 1(0.6990) = 2.0791."
  },
  {
    "question": "How many terms of the geometric series 5 + 20 + 80 + ... must be taken to get a sum of 1705?",
    "options": ["7", "3", "6", "5"],
    "answer": 3,
    "explanation": "S_n = a(r^n − 1)/(r − 1) = 5(r^n − 1)/3 = 1705, so 4^n = 1024 = 4^5. Hence n = 5."
  },
  {
    "question": "A vessel contains 120 litres of a mixture of milk and water in the ratio 7:3. 50 litres of the mixture are drawn out and replaced by water. How many litres of milk are in the vessel now?",
    "options": ["74 litres", "35 litres", "34 litres", "49 litres"],
    "answer": 3,
    "explanation": "Initial milk = 120 × 7/10 = 84 L. Removing 50 L of mixture leaves milk × (120 − 50)/120 = 84 × 70/120 = 49 L."
  },
  {
    "question": "In an election between two candidates, 10% of the votes cast were invalid. The winner secured 75% of the valid votes and won by a margin of 4500 votes. How many votes were cast in total?",
    "options": ["10000", "11000", "20000", "9000"],
    "answer": 0,
    "explanation": "Let the total be T. Valid votes = 90% of T. Margin = (75 − 25)% of valid votes = 50% × 90% × T = 4500. Solving gives T = 10000."
  },
  {
    "question": "Find the length of an arc that subtends an angle of 150° at the centre of a circle of radius 21 cm. (Give the answer in terms of π.)",
    "options": ["42π cm", "35π cm", "17.5π cm", "183.75π cm"],
    "answer": 2,
    "explanation": "Arc length = (θ/360) × 2πr = (150/360) × 2π × 21 = 17.5π cm."
  },
  {
    "question": "A trader marks his goods 50% above the cost price and then allows successive discounts of 15% and 15% on the marked price. Find his net profit or loss percent.",
    "options": ["Profit 10%", "Profit 85/8%", "Profit 67/8%", "Loss 67/8%"],
    "answer": 2,
    "explanation": "Take cost = 100. Marked price = 150. After 15% discount: 127.5. After 15% discount: 867/8. So profit = 67/8%."
  },
  {
    "question": "In how many ways can a committee of 5 be chosen from 9 men and 5 women if one particular woman must be on the committee?",
    "options": ["715", "1287", "1210", "2002"],
    "answer": 0,
    "explanation": "Once she is fixed, choose the remaining 4 members from the other 13 people: C(13,4) = 715."
  },
  {
    "question": "Pipe A can fill a tank in 60 hours and pipe B can fill it in 30 hours. Both are opened together, but pipe B is closed after 7 hours. How long will it take in total to fill the tank?",
    "options": ["45 hours", "26.5 hours", "46 hours", "20 hours"],
    "answer": 2,
    "explanation": "Together they fill 1/60 + 1/30 = 1/20 of the tank per hour. In 7 hours they fill 7/20, leaving 13/20. Pipe A alone then needs 13/20 ÷ (1/60) = 39 hours. Total time = 7 + 39 = 46 hours."
  },
  {
    "question": "How many terms of the geometric series 5 + 15 + 45 + ... must be taken to get a sum of 16400?",
    "options": ["6", "9", "8", "7"],
    "answer": 2,
    "explanation": "S_n = a(r^n − 1)/(r − 1) = 5(r^n − 1)/2 = 16400, so 3^n = 6561 = 3^8. Hence n = 8."
  },
  {
    "question": "In how many distinct ways can the letters of the word MISSISSIPPI be arranged?",
    "options": ["34650", "39916800", "17325", "3628800"],
    "answer": 0,
    "explanation": "The word has 11 letters with repeated letters (I ×4, S ×4, P ×2). Arrangements = 11!/(4! × 4! × 2!) = 34650."
  },
  {
    "question": "What is the highest power of 13 that divides 121! exactly?",
    "options": ["8", "10", "9", "12"],
    "answer": 2,
    "explanation": "Exponent of 13 in 121! = ⌊121/13⌋ + ⌊121/13²⌋ + ... = 9 = 9."
  },
  {
    "question": "What is the angle between the hour hand and the minute hand of a clock at 4:36?",
    "options": ["96°", "78°", "85.5°", "282°"],
    "answer": 1,
    "explanation": "Hour hand angle from 12 = 30(4) + 0.5(36) = 138°. Minute hand angle = 6(36) = 216°. Difference = 78°, so the smaller angle is 78°."
  },
  {
    "question": "The present ages of Ali and Sara are in the ratio 5:6. After 6 years their ages will be in the ratio 11:13. What is Sara's present age?",
    "options": ["78 years", "132 years", "60 years", "72 years"],
    "answer": 3,
    "explanation": "Let the ages be 5k and 6k. Then (5k + 6)/(6k + 6) = 11/13, so 13(5k + 6) = 11(6k + 6). This gives k = 12, so Sara's age = 6 × 12 = 72 years."
  },
  {
    "question": "Find the sum of the squares of the first 9 even natural numbers.",
    "options": ["1140", "285", "570", "180"],
    "answer": 0,
    "explanation": "Sum = 4Σk² = 4 × 285 = 1140."
  },
  {
    "question": "A tap can fill a tank in 6 hours. Because of a leak at the bottom, the tank takes longer to fill. If the leak alone can empty the full tank in 10 hours, how many hours will the tank take to fill with the leak present?",
    "options": ["15 hours", "21 hours", "3.75 hours", "14 hours"],
    "answer": 0,
    "explanation": "Net filling rate = 1/6 − 1/10 = 4/60 of the tank per hour. So time = 60/4 = 15 hours."
  },
  {
    "question": "What is the greatest 4-digit number exactly divisible by 36, 24 and 18?",
    "options": ["9999", "9900", "9936", "10008"],
    "answer": 2,
    "explanation": "LCM(36, 24, 18) = 72. Dividing 9999 by 72 leaves remainder 63, so the number is 9999 − 63 = 9936."
  },
  {
    "question": "If 2^(x + 3) − 2^x = 28, find the value of x.",
    "options": ["3", "1", "4", "2"],
    "answer": 3,
    "explanation": "Factor out 2^x: 2^x(2^3 − 1) = 2^x × 7 = 28. So 2^x = 4, giving x = 2."
  },
  {
    "question": "Find the sum of the squares of the first 17 odd natural numbers.",
    "options": ["4913", "6545", "1785", "6562"],
    "answer": 1,
    "explanation": "Sum = n(2n − 1)(2n + 1)/3 = 17(33)(35)/3 = 6545."
  },
  {
    "question": "Find the remainder when 27^308 is divided by 17.",
    "options": ["11", "6", "5", "4"],
    "answer": 3,
    "explanation": "Since gcd(27, 17) = 1, 27^16 ≡ 1 (mod 17). Now 308 = 16 × 19 + 4, so 27^308 ≡ 27^4 ≡ 4 (mod 17)."
  },
  {
    "question": "A starts a business with Rs. 50000. After 3 months, B joins with Rs. 30000. At the end of the year the total profit is Rs. 14500. What is B's share of the profit?",
    "options": ["Rs. 5500", "Rs. 4500", "Rs. 7250", "Rs. 5437.5"],
    "answer": 1,
    "explanation": "A's capital-time = 50000 × 12 and B's = 30000 × 9. Ratio A : B = 20 : 9. B's share = 14500 × 9/29 = Rs. 4500."
  },
  {
    "question": "A sum of money becomes 5 times itself in 25 years at simple interest. What is the annual rate of interest?",
    "options": ["26%", "20%", "16%", "8%"],
    "answer": 2,
    "explanation": "Interest earned = 4P in 25 years. Rate = (4P × 100)/(P × 25) = 16% per annum."
  },
  {
    "question": "Find the perpendicular distance of the point (-8, -7) from the line 24x - 7y + 18 = 0.",
    "options": ["125/31 units", "125 units", "10 units", "5 units"],
    "answer": 3,
    "explanation": "Distance = |ax0 + by0 + c|/√(a² + b²) = |24(-8) + (-7)(-7) + (18)|/√(24² + -7²) = 125/25 = 5 units."
  },
  {
    "question": "Find the area of the triangle with vertices (0, 4), (7, 7) and (4, -6).",
    "options": ["83 square units", "82 square units", "42 square units", "41 square units"],
    "answer": 3,
    "explanation": "Area = ½|x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| = ½|-82| = 41 square units."
  },
  {
    "question": "A vessel contains 60 litres of a mixture of milk and water in the ratio 9:1. 40 litres of the mixture are drawn out and replaced by water. How many litres of milk are in the vessel now?",
    "options": ["38 litres", "36 litres", "14 litres", "18 litres"],
    "answer": 3,
    "explanation": "Initial milk = 60 × 9/10 = 54 L. Removing 40 L of mixture leaves milk × (60 − 40)/60 = 54 × 20/60 = 18 L."
  },
  {
    "question": "A boat takes 1 hours to travel 15 km downstream and 5 hours to travel the same distance upstream. What is the speed of the boat in still water?",
    "options": ["3 km/h", "9 km/h", "15 km/h", "11 km/h"],
    "answer": 1,
    "explanation": "Downstream speed = 15 km/h and upstream speed = 3 km/h. Speed in still water = (15 + 3)/2 = 9 km/h."
  },
  {
    "question": "How many terms of the geometric series 4 + 16 + 64 + ... must be taken to get a sum of 87380?",
    "options": ["8", "6", "9", "7"],
    "answer": 0,
    "explanation": "S_n = a(r^n − 1)/(r − 1) = 4(r^n − 1)/3 = 87380, so 4^n = 65536 = 4^8. Hence n = 8."
  },
  {
    "question": "The average age of 7 people is 22 years. When a person aged 32 years leaves and a new person joins, the average age increases by 4 years. What is the age of the new person?",
    "options": ["60 years", "64 years", "36 years", "67 years"],
    "answer": 0,
    "explanation": "Total age changes by 7 × 4 = 28, so the new person is 32 + 28 = 60 years old."
  },
  {
    "question": "Two numbers are in the ratio 8:11 and their LCM is 528. What is the larger number?",
    "options": ["74", "66", "114", "48"],
    "answer": 1,
    "explanation": "Let the numbers be 8k and 11k. Their LCM is 88k = 528, so k = 6. The larger number is 11 × 6 = 66."
  },
  {
    "question": "The equation x^2 − kx + 144 = 0 has one root equal to 4 times the other root. Find the positive value of k.",
    "options": ["36", "24", "145", "30"],
    "answer": 3,
    "explanation": "Let the roots be r and 4r. Product: 4r² = 144, so r = 6. Then k = r + 4r = 5r = 30."
  },
  {
    "question": "If A : B = 5 : 4 and B : C = 3 : 7, find A : B : C.",
    "options": ["35:28:12", "5:12:7", "15:28:12", "15:12:28"],
    "answer": 3,
    "explanation": "Make B equal in both ratios: A : B = 15 : 12 and B : C = 12 : 28. So A : B : C = 15 : 12 : 28 = 15:12:28."
  },
  {
    "question": "Find the remainder when 29^134 is divided by 19.",
    "options": ["17", "10", "18", "0"],
    "answer": 0,
    "explanation": "Since gcd(29, 19) = 1, 29^18 ≡ 1 (mod 19). Now 134 = 18 × 7 + 8, so 29^134 ≡ 29^8 ≡ 17 (mod 19)."
  },
  {
    "question": "Given log 2 = 0.3010 and log 3 = 0.4771 (base 10), find log 30. Use log 5 = 1 − log 2.",
    "options": ["1.4771", "2.4771", "0.7781", "1.0791"],
    "answer": 0,
    "explanation": "30 = 2^1 × 3^1 × 5^1. So log 30 = 1(0.3010) + 1(0.4771) + 1(0.6990) = 1.4771."
  },
  {
    "question": "From two points on the same straight line through the foot of a tower, the angles of elevation of its top are 30° and 60°. If the points are 60 m apart, what is the height of the tower?",
    "options": ["60/√3 m", "60√3 m", "30√3 m", "60√3/3 m"],
    "answer": 2,
    "explanation": "If the height is h, the distances from the foot are h√3 (30°) and h/√3 (60°). Their difference is 2h/√3 = 60, so h = 60√3/2 = 30√3 m."
  },
  {
    "question": "The average score of a cricketer in 11 matches is 43. The average of the first six matches is 59 and that of the last six matches is 37. What was his score in the sixth match?",
    "options": ["53", "103", "113", "146"],
    "answer": 1,
    "explanation": "Sixth-match score = (sum of first six) + (sum of last six) − (sum of all 11) = 6(59) + 6(37) − 11(43) = 103."
  },
  {
    "question": "If x = 6 + √35, find the value of x³ + 1/x³.",
    "options": ["1704", "1728", "142", "1692"],
    "answer": 3,
    "explanation": "x + 1/x = 12. So x³ + 1/x³ = (12)³ − 3(12) = 1692."
  },
  {
    "question": "What is the angle between the hour hand and the minute hand of a clock at 4:35?",
    "options": ["80°", "72.5°", "287.5°", "90°"],
    "answer": 1,
    "explanation": "Hour hand angle from 12 = 30(4) + 0.5(35) = 137.5°. Minute hand angle = 6(35) = 210°. Difference = 72.5°, so the smaller angle is 72.5°."
  },
  {
    "question": "Find the compound interest on Rs. 46875 for 3 years at 8% per annum, compounded annually.",
    "options": ["Rs. 12174", "Rs. 8424", "Rs. 59049", "Rs. 15924"],
    "answer": 0,
    "explanation": "Amount = 46875 × (1 + 8/100)^3 = Rs. 59049. Compound interest = 59049 − 46875 = Rs. 12174."
  },
  {
    "question": "Solve for x: 3^(4x - 4) = 9^(x + 2)",
    "options": ["4/3", "3", "4", "5"],
    "answer": 2,
    "explanation": "Write 9 = 3^2, so the right side is 3^(2(x + 2)). Equating exponents: 4x - 4 = 2x + 4, so (4 − 2)x = 8, giving x = 4."
  },
  {
    "question": "One root of the equation x^2 + kx - 27 = 0 is -3. Find the value of k.",
    "options": ["-6", "6", "-24", "-27"],
    "answer": 0,
    "explanation": "The product of roots = -27, so the other root = -27/-3 = 9. The sum of roots = −k, so k = −(-3 + 9) = -6."
  },
  {
    "question": "If a + b + c = 2 and a² + b² + c² = 50, find the value of ab + bc + ca.",
    "options": ["-46", "-23", "27", "23"],
    "answer": 1,
    "explanation": "(a + b + c)² = a² + b² + c² + 2(ab + bc + ca), so 4 = 50 + 2(ab + bc + ca), giving ab + bc + ca = -23."
  },
  {
    "question": "If 15 July 2004 was a Thursday, what day of the week will 23 March 2021 be?",
    "options": ["Tuesday", "Friday", "Sunday", "Wednesday"],
    "answer": 0,
    "explanation": "The number of days between the two dates is 6095, which leaves remainder 5 when divided by 7 (leap years included). Counting 5 day(s) forward from Thursday gives Tuesday."
  },
  {
    "question": "If the equation x^2 + (m − 9)x + 16 = 0 has equal roots, find the larger value of m.",
    "options": ["17", "1", "25", "8"],
    "answer": 0,
    "explanation": "Discriminant = 0: (m − 9)² − 4(16) = 0, so m − 9 = ±8. The larger value is m = 9 + 8 = 17."
  },
  {
    "question": "If α and β are the roots of x^2 - 13x + 40 = 0, find 1/α + 1/β.",
    "options": ["40/13", "13", "13/40", "-40/13"],
    "answer": 2,
    "explanation": "1/α + 1/β = (α + β)/(αβ) = 13/(40) = 13/40."
  },
  {
    "question": "At a meeting, every person shakes hands exactly once with every other person. If there were 66 handshakes in total, how many people attended?",
    "options": ["12", "14", "5", "13"],
    "answer": 0,
    "explanation": "C(n,2) = n(n − 1)/2 = 66, so n² − n − 132 = 0, giving (n − 12)(n + 11) = 0. Hence n = 12."
  },
  {
    "question": "The parallel sides of an isosceles trapezium are 7 cm and 49 cm, and each non-parallel side is 29 cm. Find its area.",
    "options": ["812 cm^2", "580 cm^2", "560 cm^2", "1120 cm^2"],
    "answer": 2,
    "explanation": "Each triangle cut off at the ends has base (49 − 7)/2 = 21 cm and hypotenuse 29 cm, so the height is √(29² − 21²) = 20 cm. Area = ½(7 + 49) × 20 = 560 cm²."
  },
  {
    "question": "The average age of 15 people is 23 years. When a person aged 36 years leaves and a new person joins, the average age increases by 3 years. What is the age of the new person?",
    "options": ["81 years", "39 years", "-9 years", "84 years"],
    "answer": 0,
    "explanation": "Total age changes by 15 × 3 = 45, so the new person is 36 + 45 = 81 years old."
  },
  {
    "question": "If f(x) = 2x^2 - 4x - 4 and g(x) = -x + 2, find f(g(-3)) − g(f(-3)).",
    "options": ["52", "26", "-50", "50"],
    "answer": 3,
    "explanation": "f(g(-3)) = f(5) = 26 and g(f(-3)) = g(26) = -24. Difference = 26 − (-24) = 50."
  },
  {
    "question": "The price of sugar rises by 100%. By what percentage must a household reduce its consumption so that its expenditure remains unchanged?",
    "options": ["55%", "100%", "110%", "50%"],
    "answer": 3,
    "explanation": "Reduction% = r/(100 + r) × 100 = 100/200 × 100 = 50%."
  },
  {
    "question": "In a class of 68 students, 18 study Physics, 29 study Mathematics and 31 study English. 5 study both Physics and Mathematics, 9 study both Mathematics and English, 8 study both English and Physics, and 3 study all three subjects. How many students study exactly one subject?",
    "options": ["37", "43", "56", "46"],
    "answer": 1,
    "explanation": "Exactly one = n(A ∪ B ∪ C) − (exactly two) − (all three) = 59 − 13 − 3 = 43."
  },
  {
    "question": "Solve for x: 5^(4x + 2) = 125^(2x - 2)",
    "options": ["6", "3", "4", "-0.8"],
    "answer": 2,
    "explanation": "Write 125 = 5^3, so the right side is 5^(3(2x - 2)). Equating exponents: 4x + 2 = 6x - 6, so (4 − 6)x = -8, giving x = 4."
  },
  {
    "question": "What is the smallest positive integer by which 945 must be divided to obtain a perfect square?",
    "options": ["315", "105", "106", "107"],
    "answer": 1,
    "explanation": "945 = 3^3 × 5 × 7. Divide out one copy of every prime with an odd exponent: 105."
  },
  {
    "question": "A convex polygon has 104 diagonals. How many sides does it have?",
    "options": ["14", "17", "15", "16"],
    "answer": 3,
    "explanation": "n(n − 3)/2 = 104, so n² − 3n − 208 = 0, i.e. (n − 16)(n + 13) = 0. Hence n = 16."
  },
  {
    "question": "A solid metal cylinder of radius 4 cm and height 13 cm is melted and recast into identical cones, each of radius 4 cm and height 3 cm. How many cones are obtained?",
    "options": ["16", "13/3", "13", "26"],
    "answer": 2,
    "explanation": "Number = volume of cylinder ÷ volume of a cone = π(4)²(13) ÷ [(1/3)π(4)²(3)] = 3 × 208/48 = 13."
  },
  {
    "question": "How many terms of the geometric series 4 + 12 + 36 + ... must be taken to get a sum of 13120?",
    "options": ["6", "10", "8", "7"],
    "answer": 2,
    "explanation": "S_n = a(r^n − 1)/(r − 1) = 4(r^n − 1)/2 = 13120, so 3^n = 6561 = 3^8. Hence n = 8."
  },
  {
    "question": "What is the sum of all 2-digit numbers that are divisible by 11?",
    "options": ["440", "506", "396", "495"],
    "answer": 3,
    "explanation": "The multiples form an AP from 11 to 99 with common difference 11. Number of terms = (99 − 11)/11 + 1 = 9. Sum = 9/2 × (11 + 99) = 495."
  },
  {
    "question": "The equation x^2 − kx + 196 = 0 has one root equal to 4 times the other root. Find the positive value of k.",
    "options": ["197", "35", "28", "49"],
    "answer": 1,
    "explanation": "Let the roots be r and 4r. Product: 4r² = 196, so r = 7. Then k = r + 4r = 5r = 35."
  },
  {
    "question": "In an arithmetic progression, the 4th term is 30 and the 12th term is 78. Find the sum of its first 22 terms.",
    "options": ["1782", "3036", "1650", "1386"],
    "answer": 2,
    "explanation": "Subtracting: 8d = 78 − 30 gives d = 6. Then a = 30 − 3(6) = 12. S_22 = 22/2 × [2(12) + 21(6)] = 1650."
  },
  {
    "question": "If cos θ = 7/25 and θ is an acute angle, find the value of tan θ + cot θ.",
    "options": ["168/625", "313/84", "625/168", "1.24"],
    "answer": 2,
    "explanation": "With sin θ = 24/25, cos θ = 7/25 and tan θ = 24/7 (from a 24-7-25 right triangle), tan θ + cot θ = 625/168."
  },
  {
    "question": "A square is inscribed in a circle whose circumference is 18π cm. What is the area of the square?",
    "options": ["162 cm^2", "36 cm^2", "81 cm^2", "324 cm^2"],
    "answer": 0,
    "explanation": "Circumference = 2πr = 18π, so r = 9 cm. The diagonal of the square = diameter = 18 cm, so area = (diagonal)²/2 = 324/2 = 162 cm²."
  },
  {
    "question": "A and B together can complete a job in 36 days, B and C together in 45 days, and C and A together in 30 days. How many days will A, B and C take to complete it working together?",
    "options": ["26 days", "12 days", "23 days", "24 days"],
    "answer": 3,
    "explanation": "Adding the three rates: 2(A + B + C) = 1/36 + 1/45 + 1/30 = 1/12. So A + B + C = 1/24 per day, and the time is 24 days."
  },
  {
    "question": "The present ages of Ali and Sara are in the ratio 2:7. After 6 years their ages will be in the ratio 3:8. What is Sara's present age?",
    "options": ["12 years", "42 years", "36 years", "48 years"],
    "answer": 1,
    "explanation": "Let the ages be 2k and 7k. Then (2k + 6)/(7k + 6) = 3/8, so 8(2k + 6) = 3(7k + 6). This gives k = 6, so Sara's age = 7 × 6 = 42 years."
  },
  {
    "question": "How many positive divisors does 75 have?",
    "options": ["3", "8", "12", "6"],
    "answer": 3,
    "explanation": "75 = 3 × 5^2. Number of divisors = (1+1) × (2+1) = 6."
  },
  {
    "question": "How many integers x satisfy x^2 + x - 20 < 0?",
    "options": ["9", "10", "8", "7"],
    "answer": 2,
    "explanation": "The quadratic factors as (x − -5)(x − 4) < 0, so -5 < x < 4. The integers strictly between are 8."
  },
  {
    "question": "A bag contains 4 red, 5 blue and 6 green balls. Two balls are drawn at random without replacement. What is the probability that both are of the same colour?",
    "options": ["31/105", "74/105", "77/225", "2/35"],
    "answer": 0,
    "explanation": "Favourable = C(4,2) + C(5,2) + C(6,2) = 31; total = C(15,2) = 105. Probability = 31/105."
  },
  {
    "question": "Given log 2 = 0.3010 and log 3 = 0.4771 (base 10), find log 25920. Use log 5 = 1 − log 2.",
    "options": ["4.4134", "4.0154", "3.7144", "4.7656"],
    "answer": 0,
    "explanation": "25920 = 2^6 × 3^4 × 5^1. So log 25920 = 6(0.3010) + 4(0.4771) + 1(0.6990) = 4.4134."
  },
  {
    "question": "What is the least number which leaves a remainder of 6 when divided by 42, 24 or 72?",
    "options": ["498", "510", "504", "516"],
    "answer": 1,
    "explanation": "The number is LCM + remainder. LCM(42, 24, 72) = 504, so the number is 504 + 6 = 510."
  },
  {
    "question": "A circle is inscribed in a square whose diagonal is 16√2 cm. What is the area of the circle?",
    "options": ["256π cm^2", "64π cm^2", "128π cm^2", "16π cm^2"],
    "answer": 1,
    "explanation": "Side of the square = diagonal/√2 = 16 cm. The inscribed circle has diameter 16 cm, so r = 8 and area = π(8)² = 64π cm²."
  },
  {
    "question": "How many integers x satisfy x^2 - 5x - 36 < 0?",
    "options": ["11", "14", "13", "12"],
    "answer": 3,
    "explanation": "The quadratic factors as (x − -4)(x − 9) < 0, so -4 < x < 9. The integers strictly between are 12."
  },
  {
    "question": "A fair coin is tossed 5 times. What is the probability of getting at least 3 heads?",
    "options": ["5/16", "0.5", "15/32", "17/32"],
    "answer": 1,
    "explanation": "Favourable outcomes = C(5,3) + C(5,4) + C(5,5) = 16. Total = 2^5 = 32. Probability = 0.5."
  },
  {
    "question": "The parallel sides of an isosceles trapezium are 9 cm and 33 cm, and each non-parallel side is 13 cm. Find its area.",
    "options": ["252 cm^2", "273 cm^2", "105 cm^2", "110 cm^2"],
    "answer": 2,
    "explanation": "Each triangle cut off at the ends has base (33 − 9)/2 = 12 cm and hypotenuse 13 cm, so the height is √(13² − 12²) = 5 cm. Area = ½(9 + 33) × 5 = 105 cm²."
  },
  {
    "question": "If A is a 3 × 3 matrix with |A| = 2, find |A² · Aᵀ · Aᵀ|.",
    "options": ["16", "32", "-16", "8"],
    "answer": 0,
    "explanation": "|A²| = 2², |Aᵀ| = |A| = 2 each, so the product = 2² × 2 × 2 = 16."
  },
  {
    "question": "Two numbers are in the ratio 7:12 and their LCM is 336. What is the larger number?",
    "options": ["54", "48", "28", "76"],
    "answer": 1,
    "explanation": "Let the numbers be 7k and 12k. Their LCM is 84k = 336, so k = 4. The larger number is 12 × 4 = 48."
  },
  {
    "question": "A chord 48 cm long is drawn in a circle of radius 51 cm. How far is the chord from the centre?",
    "options": ["27 cm", "24 cm", "45 cm", "75 cm"],
    "answer": 2,
    "explanation": "Half the chord = 24 cm, so the distance = √(51² − 24²) = √2025 = 45 cm."
  },
  {
    "question": "A is 4 times as efficient as B, so A alone can finish a job 45 days sooner than B alone. In how many days can they finish it together?",
    "options": ["14 days", "45 days", "60 days", "12 days"],
    "answer": 3,
    "explanation": "A takes B/4 days. B − B/4 = 45 gives B = 60 days and A = 15 days. Together: 60/(4+1) = 12 days."
  },
  {
    "question": "In how many distinct ways can the letters of the word PAKISTAN be arranged?",
    "options": ["20160", "40320", "5040", "10080"],
    "answer": 0,
    "explanation": "The word has 8 letters with repeated letters (A ×2). Arrangements = 8!/(2!) = 20160."
  },
  {
    "question": "A cone has a radius of 7 cm and a height of 24 cm. Find its total surface area.",
    "options": ["249π cm^2", "224π cm^2", "217π cm^2", "175π cm^2"],
    "answer": 1,
    "explanation": "Slant height = √(7² + 24²) = 25 cm. Total surface area = πr(r + l) = π × 7 × (7 + 25) = 224π cm²."
  },
  {
    "question": "The sum of the first 7 terms of an AP is equal to the sum of its first 18 terms. If the first term is 24, find the common difference.",
    "options": ["-2", "-1", "-24/7", "2"],
    "answer": 0,
    "explanation": "S_7 = S_18 means the terms from 8 to 18 sum to 0, so 2a + (7+18−1)d = 0. Hence d = −2(24)/24 = -2."
  },
  {
    "question": "If 2x + 6y = 28 and 5x - 2y = -15, find the value of 2x - 2y.",
    "options": ["-10", "-12", "12", "4"],
    "answer": 1,
    "explanation": "Solving the two equations (eliminating one variable) gives x = -1 and y = 5. Therefore 2x - 2y = 2(-1) - 2(5) = -12."
  },
  {
    "question": "y varies directly as the square of x and inversely as z. If y = 288 when x = 6 and z = 1, find y when x = 10 and z = 5.",
    "options": ["160", "168", "16", "480"],
    "answer": 0,
    "explanation": "y = kx²/z. From the first case k = y·z/x² = 288×1/36 = 8. Then y = 8×100/5 = 160."
  },
  {
    "question": "If f(x) = 3x^2 + x - 3 and g(x) = x - 4, find f(g(-3)).",
    "options": ["140", "14", "137", "17"],
    "answer": 2,
    "explanation": "g(-3) = -7, so f(g(-3)) = f(-7) = 137."
  },
  {
    "question": "If a + b + c = -3 and a² + b² + c² = 45, find the value of a³ + b³ + c³ − 3abc.",
    "options": ["-135", "-81", "-243", "-189"],
    "answer": 3,
    "explanation": "ab + bc + ca = ((-3)² − 45)/2 = -18. Then a³ + b³ + c³ − 3abc = (a + b + c)(a² + b² + c² − ab − bc − ca) = -3(45 − -18) = -189."
  },
  {
    "question": "If 5 December 2010 was a Sunday, what day of the week will 25 July 2021 be?",
    "options": ["Sunday", "Saturday", "Tuesday", "Monday"],
    "answer": 0,
    "explanation": "The number of days between the two dates is 3885, which leaves remainder 0 when divided by 7 (leap years included). Counting 0 day(s) forward from Sunday gives Sunday."
  },
  {
    "question": "A train crosses a pole in 16 seconds and a bridge 300 m long in 36 seconds. What is its speed in km/h?",
    "options": ["54 km/h", "15 km/h", "24 km/h", "25/6 km/h"],
    "answer": 0,
    "explanation": "Time on the bridge portion = 36 − 16 = 20 s for 300 m, so speed = 15 m/s = 15 × 18/5 = 54 km/h."
  },
  {
    "question": "The present ages of Ali and Sara are in the ratio 5:7. After 8 years their ages will be in the ratio 53:71. What is Sara's present age?",
    "options": ["71 years", "45 years", "108 years", "63 years"],
    "answer": 3,
    "explanation": "Let the ages be 5k and 7k. Then (5k + 8)/(7k + 8) = 53/71, so 71(5k + 8) = 53(7k + 8). This gives k = 9, so Sara's age = 7 × 9 = 63 years."
  },
  {
    "question": "What is the difference between the compound interest and the simple interest on Rs. 20625 for 2 years at 12% per annum?",
    "options": ["Rs. 148.5", "Rs. 297", "Rs. 2772", "Rs. 594"],
    "answer": 1,
    "explanation": "For 2 years, CI − SI = P(r/100)^2 = 20625 × (12/100)^2 = 20625 × 144/10000 = Rs. 297."
  },
  {
    "question": "Two runners start together from the same point of a circular track 1200 m long and run in the same direction at 5 m/s and 4 m/s. After how many seconds will the faster runner first lap the slower one?",
    "options": ["1220 seconds", "240 seconds", "1200 seconds", "1250 seconds"],
    "answer": 2,
    "explanation": "They meet again when the faster gains one full lap on the slower. Relative speed = 5 − 4 = 1 m/s, so time = 1200/1 = 1200 s."
  },
  {
    "question": "Find the area of the triangle with vertices (-4, -5), (7, -2) and (-4, 7).",
    "options": ["133 square units", "66 square units", "67 square units", "132 square units"],
    "answer": 1,
    "explanation": "Area = ½|x1(y2 − y3) + x2(y3 − y1) + x3(y1 − y2)| = ½|132| = 66 square units."
  },
  {
    "question": "In a class of 65 students, 36 study English, 31 study Mathematics and 24 study Computer Science. 14 study both English and Mathematics, 15 study both Mathematics and Computer Science, 14 study both Computer Science and English, and 8 study all three subjects. How many students study none of the three subjects?",
    "options": ["17", "7", "9", "56"],
    "answer": 2,
    "explanation": "n(A ∪ B ∪ C) = 36 + 31 + 24 − 14 − 15 − 14 + 8 = 56. Students studying none = 65 − 56 = 9."
  },
  {
    "question": "In an election between two candidates, 10% of the votes cast were invalid. The winner secured 55% of the valid votes and won by a margin of 1800 votes. How many votes were cast in total?",
    "options": ["40000", "18000", "22000", "20000"],
    "answer": 3,
    "explanation": "Let the total be T. Valid votes = 90% of T. Margin = (55 − 45)% of valid votes = 10% × 90% × T = 1800. Solving gives T = 20000."
  },
  {
    "question": "A shopkeeper mixes 40 kg of flour costing Rs. 85/kg with 40 kg of flour costing Rs. 60/kg. At what price per kg must he sell the mixture to earn a profit of 20%?",
    "options": ["Rs. 58", "Rs. 72.5", "Rs. 92", "Rs. 87"],
    "answer": 3,
    "explanation": "Total cost = 40×85 + 40×60 = 5800, cost per kg = 72.5. Selling price = 72.5 × 120/100 = Rs. 87 per kg."
  },
  {
    "question": "A tap can fill a tank in 5 hours. Because of a leak at the bottom, the tank takes longer to fill. If the leak alone can empty the full tank in 10 hours, how many hours will the tank take to fill with the leak present?",
    "options": ["10 hours", "9 hours", "15 hours", "5 hours"],
    "answer": 0,
    "explanation": "Net filling rate = 1/5 − 1/10 = 5/50 of the tank per hour. So time = 50/5 = 10 hours."
  },
  {
    "question": "Find the sum to infinity of the geometric series with first term 6 and common ratio 1/4.",
    "options": ["8", "24", "14", "4.8"],
    "answer": 0,
    "explanation": "S∞ = a/(1 − r) = 6/(1 − 1/4) = 6/(3/4) = 8."
  },
  {
    "question": "What is the smallest positive integer by which 1944 must be divided to obtain a perfect square?",
    "options": ["8", "7", "12", "6"],
    "answer": 3,
    "explanation": "1944 = 2^3 × 3^5. Divide out one copy of every prime with an odd exponent: 6."
  },
  {
    "question": "If the equation x^2 + (m − 7)x + 36 = 0 has equal roots, find the larger value of m.",
    "options": ["19", "13", "12", "43"],
    "answer": 0,
    "explanation": "Discriminant = 0: (m − 7)² − 4(36) = 0, so m − 7 = ±12. The larger value is m = 7 + 12 = 19."
  },
  {
    "question": "5 fair coins are tossed. Given that at least one head appears, what is the probability that exactly 1 head appear?",
    "options": ["1/6", "5/32", "5/31", "6/31"],
    "answer": 2,
    "explanation": "P(exactly 1) = C(5,1)/2^5 = 5/32; P(at least one head) = 1 − 1/32 = 31/32. Conditional probability = 5/31 = 5/31."
  },
  {
    "question": "A machine costing Rs. 146960 depreciates at 25% per annum. What will its value be after 2 years?",
    "options": ["Rs. 73480", "Rs. 64295", "Rs. 82665", "Rs. 229625"],
    "answer": 2,
    "explanation": "Value = 146960 × (1 − 25/100)^2 = 146960 × (75/100)^2 = Rs. 82665."
  },
  {
    "question": "In an arithmetic progression, the 4th term is 22 and the 7th term is 37. Find the sum of its first 27 terms.",
    "options": ["1971", "1755", "3699", "1944"],
    "answer": 3,
    "explanation": "Subtracting: 3d = 37 − 22 gives d = 5. Then a = 22 − 3(5) = 7. S_27 = 27/2 × [2(7) + 26(5)] = 1944."
  },
  {
    "question": "Find the determinant of the matrix with rows [-3, -1, -3], [0, -2, 3], [-2, 4, -2].",
    "options": ["-42", "44", "42", "39"],
    "answer": 2,
    "explanation": "Expanding along the first row: -3(-8) − (-1)(6) + (-3)(-4) = 42."
  },
  {
    "question": "Pipe A can fill a tank in 30 hours and pipe B can fill it in 15 hours. Both are opened together, but pipe B is closed after 3 hours. How long will it take in total to fill the tank?",
    "options": ["24 hours", "25 hours", "23 hours", "10 hours"],
    "answer": 0,
    "explanation": "Together they fill 1/30 + 1/15 = 1/10 of the tank per hour. In 3 hours they fill 3/10, leaving 7/10. Pipe A alone then needs 7/10 ÷ (1/30) = 21 hours. Total time = 3 + 21 = 24 hours."
  },
  {
    "question": "What is the smallest positive integer by which 432 must be multiplied to obtain a perfect square?",
    "options": ["5", "3", "9", "4"],
    "answer": 1,
    "explanation": "432 = 2^4 × 3^3. Primes with odd exponents must be paired: 3. Multiplier = 3."
  },
  {
    "question": "Find the perpendicular distance of the point (-1, 3) from the line 3x - 4y - 5 = 0.",
    "options": ["5 units", "4 units", "8 units", "20 units"],
    "answer": 1,
    "explanation": "Distance = |ax0 + by0 + c|/√(a² + b²) = |3(-1) + (-4)(3) + (-5)|/√(3² + -4²) = 20/5 = 4 units."
  },
  {
    "question": "Pipe A can fill a tank in 40 hours and pipe B can fill it in 30 hours. Both are opened together, but pipe B is closed after 3 hours. How long will it take in total to fill the tank?",
    "options": ["37 hours", "27.75 hours", "35 hours", "36 hours"],
    "answer": 3,
    "explanation": "Together they fill 1/40 + 1/30 = 7/120 of the tank per hour. In 3 hours they fill 7/40, leaving 33/40. Pipe A alone then needs 33/40 ÷ (1/40) = 33 hours. Total time = 3 + 33 = 36 hours."
  },
  {
    "question": "The sum of the first 10 terms of an AP is equal to the sum of its first 18 terms. If the first term is 54, find the common difference.",
    "options": ["-4", "-5.4", "-5", "4"],
    "answer": 0,
    "explanation": "S_10 = S_18 means the terms from 11 to 18 sum to 0, so 2a + (10+18−1)d = 0. Hence d = −2(54)/27 = -4."
  },
  {
    "question": "A fair coin is tossed 4 times. What is the probability of getting at least 2 heads?",
    "options": ["11/16", "3/8", "5/16", "0.75"],
    "answer": 0,
    "explanation": "Favourable outcomes = C(4,2) + C(4,3) + C(4,4) = 11. Total = 2^4 = 16. Probability = 11/16."
  },
  {
    "question": "Two numbers are in the ratio 7:12 and their HCF is 15. What is their LCM?",
    "options": ["18900", "1260", "180", "84"],
    "answer": 1,
    "explanation": "The numbers are 105 and 180. Since 7 and 12 are co-prime, LCM = 15 × 7 × 12 = 1260."
  },
  {
    "question": "A vessel contains 150 litres of a mixture of milk and water in the ratio 7:3. 30 litres of the mixture are drawn out and replaced by water. How many litres of milk are in the vessel now?",
    "options": ["84 litres", "99 litres", "45 litres", "21 litres"],
    "answer": 0,
    "explanation": "Initial milk = 150 × 7/10 = 105 L. Removing 30 L of mixture leaves milk × (150 − 30)/150 = 105 × 120/150 = 84 L."
  },
  {
    "question": "A straight line passes through the points (7, 2) and (9, -4). What is its y-intercept?",
    "options": ["-3", "23", "-19", "20"],
    "answer": 1,
    "explanation": "Slope = (-4 − 2)/(9 − 7) = -3. Using y = -3x + c at (7, 2): c = 2 − (-3)(7) = 23."
  },
  {
    "question": "If 2^(x + 2) − 2^x = 48, find the value of x.",
    "options": ["5", "4", "3", "6"],
    "answer": 1,
    "explanation": "Factor out 2^x: 2^x(2^2 − 1) = 2^x × 3 = 48. So 2^x = 16, giving x = 4."
  },
  {
    "question": "In how many distinct ways can the letters of the word BANANAS be arranged?",
    "options": ["210", "420", "720", "5040"],
    "answer": 1,
    "explanation": "The word has 7 letters with repeated letters (A ×3, N ×2). Arrangements = 7!/(3! × 2!) = 420."
  },
  {
    "question": "A straight line passes through the points (-5, -5) and (-2, -14). What is its y-intercept?",
    "options": ["20", "-23", "-20", "-3"],
    "answer": 2,
    "explanation": "Slope = (-14 − -5)/(-2 − -5) = -3. Using y = -3x + c at (-5, -5): c = -5 − (-3)(-5) = -20."
  },
  {
    "question": "A is 2 times as efficient as B, so A alone can finish a job 3 days sooner than B alone. In how many days can they finish it together?",
    "options": ["6 days", "4 days", "3 days", "2 days"],
    "answer": 3,
    "explanation": "A takes B/2 days. B − B/2 = 3 gives B = 6 days and A = 3 days. Together: 6/(2+1) = 2 days."
  },
  {
    "question": "What is the angle between the hour hand and the minute hand of a clock at 8:45?",
    "options": ["352.5°", "7.5°", "2.5°", "30°"],
    "answer": 1,
    "explanation": "Hour hand angle from 12 = 30(8) + 0.5(45) = 262.5°. Minute hand angle = 6(45) = 270°. Difference = 7.5°, so the smaller angle is 7.5°."
  },
  {
    "question": "A tap can fill a tank in 10 hours. Because of a leak at the bottom, the tank takes longer to fill. If the leak alone can empty the full tank in 15 hours, how many hours will the tank take to fill with the leak present?",
    "options": ["5 hours", "29 hours", "30 hours", "6 hours"],
    "answer": 2,
    "explanation": "Net filling rate = 1/10 − 1/15 = 5/150 of the tank per hour. So time = 150/5 = 30 hours."
  },
  {
    "question": "A chord of a circle is 96 cm long and is 20 cm away from the centre. What is the radius of the circle?",
    "options": ["68 cm", "52 cm", "28 cm", "53 cm"],
    "answer": 1,
    "explanation": "The perpendicular from the centre bisects the chord, so r² = 48² + 20² = 2704, giving r = 52 cm."
  },
  {
    "question": "What is the smallest positive integer by which 12500 must be divided to obtain a perfect square?",
    "options": ["6", "5", "7", "10"],
    "answer": 1,
    "explanation": "12500 = 2^2 × 5^5. Divide out one copy of every prime with an odd exponent: 5."
  },
  {
    "question": "Two athletes start together from the same point on a circular track and run in the same direction. One completes a lap in 24 seconds and the other in 54 seconds. After how many seconds will they next meet at the starting point?",
    "options": ["648 seconds", "6 seconds", "216 seconds", "222 seconds"],
    "answer": 2,
    "explanation": "They meet at the start after LCM(24, 54) = 216 seconds."
  },
  {
    "question": "If sin θ = 8/17 and θ is an acute angle, find the value of sec θ + tan θ.",
    "options": ["0.6", "5/3", "-5/3", "2"],
    "answer": 1,
    "explanation": "With sin θ = 8/17, cos θ = 15/17 and tan θ = 8/15 (from a 8-15-17 right triangle), sec θ + tan θ = 5/3."
  },
  {
    "question": "A straight line passes through the points (2, 5) and (3, 3). What is its y-intercept?",
    "options": ["1", "9", "7", "-2"],
    "answer": 1,
    "explanation": "Slope = (3 − 5)/(3 − 2) = -2. Using y = -2x + c at (2, 5): c = 5 − (-2)(2) = 9."
  },
  {
    "question": "Find the area of a sector of angle 225° in a circle of radius 6 cm. (Give the answer in terms of π.)",
    "options": ["7.5π cm^2", "22.5π cm^2", "36π cm^2", "45π cm^2"],
    "answer": 1,
    "explanation": "Area = (θ/360) × πr² = (225/360) × π × 36 = 22.5π cm²."
  },
];