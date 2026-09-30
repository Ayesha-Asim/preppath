import type { Question } from "./types";

export const Questions: Question[] = [
{ 
    question: "If x + 1/x = 3, then x^3 + 1/x^3 equals:",
    options: ["21", "18", "24", "27"],
    answer: 1,
    explanation: "Use (x + 1/x)^3 = x^3 + 1/x^3 + 3(x + 1/x). So 27 = x^3 + 1/x^3 + 9, hence x^3 + 1/x^3 = 18."
},

{ 
    question: "If f(x) = (2x - 1)/(x + 3), then f^{-1}(x) is:",
    options: ["(1 + 3x)/(2 - x)", "(3x - 1)/(2 - x)", "(1 - 3x)/(x - 2)", "(x + 3)/(2x - 1)"],
    answer: 0,
    explanation: "Let y = (2x - 1)/(x + 3). Solving for x gives x = (1 + 3y)/(2 - y), so f^{-1}(x) = (1 + 3x)/(2 - x)."
},

{ 
    question: "If det([[a,b],[c,d]]) = 5, then det([[2a,2b],[c/2,d/2]]) equals:",
    options: ["20", "10", "0", "5"],
    answer: 3,
    explanation: "The first row is multiplied by 2 and the second row by 1/2, so the determinant is unchanged."
},

{     
    question: "If sin θ = 3/5 and θ is acute, then cos 2θ equals:",
    options: ["7/25", "-7/25", "16/25", "-16/25"],
    answer: 0,
    explanation: "Since cos θ = 4/5, cos 2θ = cos^2 θ - sin^2 θ = 16/25 - 9/25 = 7/25. The correct option is 7/25, so select the option containing 7/25."
},

{ 
    question: "The slope of the tangent to y = x^2 at x = 3 is:",
    options: ["3", "6", "9", "12"],
    answer: 1,
    explanation: "dy/dx = 2x, so at x = 3 the slope is 6."
},

{ 
    question: "If lim(x->0) (e^(2x) - 1)/x equals:",
    options: ["1", "0", "2", "4"],
    answer: 2,
    explanation: "Using the standard limit (e^(ax) - 1)/x -> a as x -> 0, the value is 2."
},

{ 
    question: "If a, ar, ar^2 are consecutive terms of a G.P. and their product is 216, then the middle term is:",
    options: ["3", "4", "6", "9"],
    answer: 2,
    explanation: "For three consecutive GP terms, the product equals the cube of the middle term. So (ar)^3 = 216, hence ar = 6."
},

{ 
    question: "The roots of z^2 + 4z + 13 = 0 are:",
    options: ["-2 ± 3i", "2 ± 3i", "-4 ± i", "4 ± i"],
    answer: 0,
    explanation: "By the quadratic formula, z = (-4 ± sqrt(16 - 52))/2 = -2 ± 3i."
},

{ 
    question: "If P(A) = 0.6, P(B) = 0.5 and A, B are independent, then P(A ∪ B) is:",
    options: ["0.1", "0.7", "0.9", "0.8"],
    answer: 3,
    explanation: "P(A ∪ B) = P(A) + P(B) - P(A)P(B) = 0.6 + 0.5 - 0.3 = 0.8."
},

{ 
    question: "Evaluate log_2 32 + log_4 16:",
    options: ["6", "7", "8", "9"],
    answer: 1,
    explanation: "log_2 32 = 5 and log_4 16 = 2, so the sum is 7."
},

{ 
    question: "If →a = (1,2,2) and →b = (2,-1,2), then →a · →b is:",
    options: ["0", "6", "2", "4"],
    answer: 3,
    explanation: "Dot product = 1·2 + 2·(-1) + 2·2 = 4."
},

{ 
    question: "For the parabola y^2 = 8x, the length of the latus rectum is:",
    options: ["2", "4", "8", "16"],
    answer: 2,
    explanation: "For y^2 = 4ax, latus rectum length is 4a. Here 4a = 8, so the length is 8."
},

{ 
    question: "If x - 1/x = 2, then x^2 + 1/x^2 equals:",
    options: ["6", "4", "0", "8"],
    answer: 0,
    explanation: "Square both sides: x^2 + 1/x^2 - 2 = 4, so x^2 + 1/x^2 = 6."
},

{ 
    question: "If f(x) = x^2 - 4x + 1, then the minimum value of f(x) is:",
    options: ["-3", "-4", "-5", "-6"],
    answer: 0,
    explanation: "Complete the square: f(x) = (x - 2)^2 - 3, so the minimum value is -3."
},

{ 
    question: "The determinant of [[1,2,3],[0,4,5],[5,3,0]] is:",
    options: ["25", "-25", "0", "2"],
    answer: 1,
    explanation: "Expanding along the first row: 1(4·0 − 5·3) − 2(0·0 − 5·5) + 3(0·3 − 4·5) = -15 + 50 - 60 = -25."
},

{ 
    question: "If tan θ = 1/3, then sin 2θ equals:",
    options: ["3/5", "1/5", "3/10", "6/10"],
    answer: 0,
    explanation: "sin 2θ = 2tan θ / (1 + tan^2 θ) = 2/3 ÷ (10/9) = 3/5."
},

{ 
    question: "The distance between points (1,2) and (7,10) is:",
    options: ["8", "9", "10", "12"],
    answer: 2,
    explanation: "Distance = sqrt((7 - 1)^2 + (10 - 2)^2) = sqrt(36 + 64) = 10."
},

{ 
    question: "If lim(x->0) (sin 5x)/x equals:",
    options: ["1", "25", "0", "5"],
    answer: 3,
    explanation: "Using sin(kx)/x -> k as x -> 0, the limit is 5."
},

{ 
    question: "Differentiate y = x^x:",
    options: ["x^x", "x^x(1 + ln x)", "x^(x-1)", "ln x"],
    answer: 1,
    explanation: "Take logs: ln y = x ln x. Differentiate to get y'/y = ln x + 1, so y' = x^x(1 + ln x)."
},
{ 
    question: "Σ from n=1 to 5 of n is:",
    options: ["10", "12", "15", "20"],
    answer: 2,
    explanation: "1 + 2 + 3 + 4 + 5 = 15."
},

{ 
    question: "If (1+i)^4 equals:",
    options: ["-4", "4", "-4i", "4i"],
    answer: 0,
    explanation: "(1+i)^2 = 2i, so (1+i)^4 = (2i)^2 = -4."
},

{ 
    question: "A bag has 3 red and 2 blue balls. Probability of drawing two red balls without replacement is:",
    options: ["1/5", "3/10", "3/20", "2/5"],
    answer: 1,
    explanation: "Probability = (3/5)(2/4) = 6/20 = 3/10."
},

{ 
    question: "Solve log_3(x) + log_3(x-2) = 2:",
    options: ["1 + sqrt(10)", "sqrt(10) - 1", "3", "4"],
    answer: 0,
    explanation: "Combine logs: log_3(x(x - 2)) = 2, so x^2 - 2x - 9 = 0. The valid solution is x = 1 + sqrt(10)."
},

{ 
    question: "If matrix A = [[1,2],[2,3]], then A^2 has trace:",
    options: ["10", "13", "16", "18"],
    answer: 3,
    explanation: "A² = [[5,8],[8,13]], so trace = 5 + 13 = 18."
},

{ 
    question: "The equation of the circle with center (2,-1) and radius 3 is:",
    options: ["(x-2)^2 + (y+1)^2 = 9", "(x+2)^2 + (y-1)^2 = 9", "(x-2)^2 + (y-1)^2 = 9", "(x+2)^2 + (y+1)^2 = 9"],
    answer: 0,
    explanation: "Use (x-h)^2 + (y-k)^2 = r^2 with h = 2, k = -1, r = 3."
},

{ 
    question: "If sec θ = 5/4, then tan θ equals:",
    options: ["3/4", "4/3", "1/5", "5/3"],
    answer: 0,
    explanation: "From sec^2 θ - tan^2 θ = 1, tan^2 θ = 25/16 - 1 = 9/16, so tan θ = 3/4."
},

{ 
    question: "The integral of 2x is:",
    options: ["x^2 + C", "2x^2 + C", "x + C", "ln x + C"],
    answer: 0,
    explanation: "∫2x dx = x^2 + C."
},

{ 
    question: "If a vector has components (3,4,0), its magnitude is:",
    options: ["1", "7", "5", "6"],
    answer: 2,
    explanation: "Magnitude = sqrt(3^2 + 4^2 + 0^2) = 5."
},

{ 
    question: "The sum of the first 20 natural numbers is:",
    options: ["190", "200", "210", "220"],
    answer: 2,
    explanation: "Sum = n(n + 1)/2 = 20·21/2 = 210."
},

{ 
    question: "If z = 2cis 60°, then |z| is:",
    options: ["60°", "2", "sqrt(3)", "1"],
    answer: 1,
    explanation: "The modulus is the coefficient of cis, which is 2."
},

{ 
    question: "Probability of getting exactly one head in two tosses of a fair coin is:",
    options: ["1/4", "1/2", "3/4", "1"],
    answer: 1,
    explanation: "The favorable outcomes are HT and TH, so probability = 2/4 = 1/2."
},

{ 
    question: "If 2^x = 8, then x equals:",
    options: ["2", "3", "4", "8"],
    answer: 1,
    explanation: "8 = 2^3, hence x = 3."
},

{ 
    question: "The value of determinant [[a,b],[b,a]] is:",
    options: ["a-b", "a+b", "a^2-b^2", "(a+b)^2"],
    answer: 2,
    explanation: "det = a·a - b·b = a^2 - b^2."
},

{ 
    question: "If x^2 - 5x + 6 = 0, then the sum of the roots is:",
    options: ["5", "6", "1", "11"],
    answer: 0,
    explanation: "For ax^2 + bx + c = 0, sum of roots = -b/a = 5."
},

{ 
    question: "If f(x) = |x - 2|, then f(5) + f(-1) equals:",
    options: ["4", "5", "6", "7"],
    answer: 2,
    explanation: "f(5) = 3 and f(-1) = 3, so total = 6."
},

{ 
    question: "The number of ways to choose 2 students from 5 is:",
    options: ["5", "8", "10", "20"],
    answer: 2,
    explanation: "5C2 = 5·4/2 = 10."
},

{
    question: "If tan(A + B) = 0, tan A = 1, tan B = -1, and A + B is an angle between 90° and 270°, then A + B is:",
    options: ["0°", "45°", "90°", "180°"],
    answer: 3,
    explanation: "tan(A + B) = 0 implies A + B is an integer multiple of 180°. Since A + B lies between 90° and 270°, the possible value is 180°."
},

{ 
    question: "The eccentricity of a circle is:",
    options: ["0", "1", "Less than 1 but not 0", "Greater than 1"],
    answer: 0,
    explanation: "A circle has eccentricity 0."
},

{ 
    question: "If z = 1 - i, then |z|^2 equals:",
    options: ["1", "2", "3", "4"],
    answer: 1,
explanation: "|1 - i|^2 = 1^2 + (-1)^2 = 2."
},
{ 
    question: "Evaluate lim(x->0) (1 - cos x)/x^2:",
    options: ["0", "1/2", "1", "2"],
    answer: 1,
explanation: "Using the standard limit, (1 - cos x)/x^2 -> 1/2."
},
{ 
    question: "If a sequence is 2, 6, 18, 54, ... then its nth term is:",
    options: ["2n", "2·3^(n-1)", "3·2^(n-1)", "2^(n+1)"],
    answer: 1,
explanation: "It is a geometric progression with first term 2 and common ratio 3, so a_n = 2·3^(n-1)."
},
{ 
    question: "The determinant of an invertible 2×2 matrix A and its inverse A^{-1} satisfy:",
    options: ["det(A^{-1}) = det(A)", "det(A^{-1}) = -det(A)", "det(A^{-1}) = 1/det(A)", "det(A^{-1}) = 0"],
    answer: 2,
    explanation: "For an invertible matrix, det(A^{-1}) = 1/det(A)."
},
{ 
    question: "If log_a 27 = 3, then a equals:",
    options: ["2", "3", "9", "sqrt(3)"],
    answer: 1,
    explanation: "log_a 27 = 3 means a^3 = 27, so a = 3."
},

{ 
    question: "The equation of the line with slope 2 passing through (1,3) is:",
    options: ["y = 2x + 1", "y = 2x + 2", "y = 2x - 1", "y = x + 2"],
    answer: 0,
    explanation: "Using point-slope form: y - 3 = 2(x - 1), so y = 2x + 1."
},

{ 
    question: "If sin θ = 0.6 and θ is acute, then tan θ equals:",
    options: ["3/4", "4/3", "5/4", "4/5"],
    answer: 0,
    explanation: "cos θ = 0.8, so tan θ = 0.6/0.8 = 3/4."
},

{ 
    question: "The value of ∫_0^1 x dx is:",
    options: ["1/2", "1", "1/4", "2"],
    answer: 0,
    explanation: "∫_0^1 x dx = [x^2/2]_0^1 = 1/2."
},

{ 
    question: "If a, b, c are in AP and a + c = 10, then which pair can be a and c?",
    options: ["2 and 8", "3 and 7", "4 and 6", "1 and 9"],
    answer: 0,
    explanation: "In an AP, the middle term is the average of the first and third terms. Since a + c = 10, b = 5. The pair 2 and 8 has average 5, so it satisfies the AP condition."
},

{ 
    question: "The dot product of two perpendicular nonzero vectors is:",
    options: ["1", "0", "-1", "Undefined"],
    answer: 1,
    explanation: "Perpendicular vectors have zero dot product."
},

{ 
    question: "If x^2 = 49 and x > 0, then x is:",
    options: ["-7", "7", "49", "0"],
    answer: 1,
    explanation: "Since x is positive, x = 7."
},

{ 
    question: "The number of real solutions of x^2 + 4x + 8 = 0 is:",
    options: ["0", "1", "2", "3"],
    answer: 0,
    explanation: "Discriminant = 16 - 32 = -16 < 0, so there are no real solutions."
},
{
    question: "If α and β are the roots of x^2 - 6x + 4 = 0, then α^2 + β^2 equals:",
    options: ["32", "28", "20", "36"],
    answer: 1,
    explanation: "α + β = 6 and αβ = 4. So α^2 + β^2 = (α + β)^2 - 2αβ = 36 - 8 = 28."
},
{
    question: "If α and β are the roots of x^2 - 5x + 3 = 0, then α^3 + β^3 equals:",
    options: ["65", "95", "110", "80"],
    answer: 3,
    explanation: "α^3 + β^3 = (α + β)^3 - 3αβ(α + β) = 125 - 3·3·5 = 80."
},
{
    question: "For k > 0, the equation x^2 + kx + 9 = 0 has equal roots when k equals:",
    options: ["9", "12", "6", "3"],
    answer: 2,
    explanation: "Equal roots require discriminant zero: k^2 - 36 = 0, so k = 6 (since k > 0)."
},
{
    question: "The sum of the squares of the roots of 2x^2 - 7x + 3 = 0 is:",
    options: ["37/4", "49/4", "13/4", "25/4"],
    answer: 0,
    explanation: "Sum = 7/2 and product = 3/2. Sum of squares = 49/4 - 2(3/2) = 49/4 - 3 = 37/4."
},
{
    question: "The remainder when x^3 - 2x^2 + 3x - 4 is divided by (x - 2) is:",
    options: ["0", "4", "2", "-2"],
    answer: 2,
    explanation: "By the Remainder Theorem, f(2) = 8 - 8 + 6 - 4 = 2."
},
{
    question: "If (x - 1) is a factor of x^3 + ax^2 - 2x + 5, then a equals:",
    options: ["4", "-4", "-6", "6"],
    answer: 1,
    explanation: "f(1) = 1 + a - 2 + 5 = a + 4 = 0, so a = -4."
},
{
    question: "The number of real roots of x^4 - 5x^2 + 4 = 0 is:",
    options: ["0", "2", "3", "4"],
    answer: 3,
    explanation: "Let t = x^2: t^2 - 5t + 4 = 0 gives t = 1 or 4. So x = ±1, ±2, which are 4 real roots."
},
{
    question: "The solution set of |2x - 3| < 5 is:",
    options: ["-4 < x < 1", "1 < x < 4", "-1 < x < 4", "x < 4"],
    answer: 2,
    explanation: "-5 < 2x - 3 < 5 gives -2 < 2x < 8, so -1 < x < 4."
},
{
    question: "The solution set of (x - 1)(x - 4) > 0 is:",
    options: ["1 < x < 4", "x < 1 or x > 4", "x > 4", "x < -4 or x > -1"],
    answer: 1,
    explanation: "The parabola opens upward with roots 1 and 4, so it is positive outside the roots: x < 1 or x > 4."
},
{
    question: "The coefficient of x^4 in the expansion of (1 + 2x)^6 is:",
    options: ["160", "120", "240", "480"],
    answer: 2,
    explanation: "Coefficient = 6C4 · 2^4 = 15 · 16 = 240."
},
{
    question: "The term independent of x in the expansion of (x^2 + 1/x)^9 is:",
    options: ["126", "36", "72", "84"],
    answer: 3,
    explanation: "General term = 9Cr · x^(18 - 2r) · x^(-r) = 9Cr · x^(18 - 3r). Setting 18 - 3r = 0 gives r = 6, so the term is 9C6 = 84."
},
{
    question: "The sum of all the coefficients in the expansion of (2x - 1)^5 is:",
    options: ["1", "0", "32", "243"],
    answer: 0,
    explanation: "Put x = 1: (2 - 1)^5 = 1."
},
{
    question: "The value of 10C3 + 10C4 is:",
    options: ["165", "330", "210", "462"],
    answer: 1,
    explanation: "By Pascal's rule, 10C3 + 10C4 = 11C4 = 330."
},
{
    question: "The number of distinct arrangements of the letters of the word LEVEL is:",
    options: ["30", "60", "120", "15"],
    answer: 0,
    explanation: "L and E each repeat twice: 5!/(2!·2!) = 120/4 = 30."
},
{
    question: "The number of distinct arrangements of the letters of MISSISSIPPI is:",
    options: ["39916800", "34650", "69300", "17325"],
    answer: 1,
    explanation: "11!/(4!·4!·2!) = 39916800/1152 = 34650."
},
{
    question: "How many 4-digit numbers can be formed from the digits 1, 2, 3, 4, 5 without repetition?",
    options: ["625", "96", "120", "60"],
    answer: 2,
    explanation: "5P4 = 5·4·3·2 = 120."
},
{
    question: "A committee of 3 is chosen from 5 men and 4 women. The number of committees containing at least one woman is:",
    options: ["84", "64", "80", "74"],
    answer: 3,
    explanation: "Total = 9C3 = 84. Committees with no woman = 5C3 = 10. So the answer is 84 - 10 = 74."
},
{
    question: "In how many ways can 6 people be seated around a circular table?",
    options: ["720", "24", "60", "120"],
    answer: 3,
    explanation: "Circular arrangements of n people = (n - 1)! = 5! = 120."
},
{
    question: "The number of diagonals of a polygon with 12 sides is:",
    options: ["66", "54", "60", "48"],
    answer: 1,
    explanation: "Diagonals = n(n - 3)/2 = 12·9/2 = 54."
},
{
    question: "Two fair dice are thrown. The probability that the sum is 9 is:",
    options: ["1/6", "5/36", "1/12", "1/9"],
    answer: 3,
    explanation: "Favorable outcomes: (3,6), (4,5), (5,4), (6,3), which is 4 out of 36, so 1/9."
},
{
    question: "If P(A) = 0.4, P(B) = 0.3 and P(A ∪ B) = 0.58, then P(A | B) equals:",
    options: ["0.3", "0.4", "0.12", "0.58"],
    answer: 1,
    explanation: "P(A ∩ B) = 0.4 + 0.3 - 0.58 = 0.12. Then P(A | B) = 0.12/0.3 = 0.4 (so A and B are independent)."
},
{
    question: "Urn I has 3 red and 2 blue balls; Urn II has 1 red and 4 blue balls. An urn is chosen at random and a ball drawn is red. The probability it came from Urn I is:",
    options: ["3/5", "1/4", "3/4", "2/3"],
    answer: 2,
    explanation: "By Bayes' theorem: (1/2·3/5)/(1/2·3/5 + 1/2·1/5) = (3/5)/(4/5) = 3/4."
},
{
    question: "A fair coin is tossed 4 times. The probability of getting exactly 3 heads is:",
    options: ["3/8", "1/4", "1/2", "3/16"],
    answer: 1,
    explanation: "P = 4C3 (1/2)^4 = 4/16 = 1/4."
},
{
    question: "If X is the number obtained on a fair die roll, then E(X^2) equals:",
    options: ["49/4", "35/12", "91/6", "7/2"],
    answer: 2,
    explanation: "E(X^2) = (1 + 4 + 9 + 16 + 25 + 36)/6 = 91/6."
},
{
    question: "The value of [(1 + i)/(1 - i)]^2026 is:",
    options: ["1", "-1", "i", "-i"],
    answer: 1,
    explanation: "(1 + i)/(1 - i) = i. Since 2026 = 4·506 + 2, i^2026 = i^2 = -1."
},
{
    question: "The modulus of (3 + 4i)/(1 - 2i) is:",
    options: ["5", "1", "sqrt(10)", "sqrt(5)"],
    answer: 3,
    explanation: "|3 + 4i| = 5 and |1 - 2i| = sqrt(5), so the modulus is 5/sqrt(5) = sqrt(5)."
},
{
    question: "The principal argument of the complex number -1 + i·sqrt(3) is:",
    options: ["π/3", "2π/3", "-π/3", "5π/6"],
    answer: 1,
    explanation: "The point (-1, sqrt(3)) lies in the second quadrant with tan(reference angle) = sqrt(3), so the argument is π - π/3 = 2π/3."
},
{
    question: "If ω is a non-real cube root of unity, then (1 + ω^2)^4 equals:",
    options: ["ω^2", "ω", "1", "-1"],
    answer: 1,
    explanation: "1 + ω^2 = -ω. So (-ω)^4 = ω^4 = ω^3·ω = ω."
},
{
    question: "The product of all the fourth roots of unity is:",
    options: ["1", "-1", "i", "0"],
    answer: 1,
    explanation: "The roots are 1, -1, i, -i. Their product is (1)(-1)(i)(-i) = (-1)(1) = -1."
},
{
    question: "If z + 1/z = sqrt(3), then z^6 + 1/z^6 equals:",
    options: ["2", "0", "sqrt(3)", "-2"],
    answer: 3,
    explanation: "z + 1/z = 2cos 30° means z = cis 30°. So z^6 + 1/z^6 = 2cos 180° = -2."
},
{
    question: "If z1 and z2 are the roots of z^2 - 2z + 5 = 0, then z1^2 + z2^2 equals:",
    options: ["6", "-6", "4", "-4"],
    answer: 1,
    explanation: "z1 + z2 = 2 and z1z2 = 5. So z1^2 + z2^2 = 4 - 10 = -6."
},
{
    question: "The locus of a point z satisfying |z - 1| = |z + 1| is:",
    options: ["the real axis", "the imaginary axis", "the unit circle", "the line y = x"],
    answer: 1,
    explanation: "z is equidistant from 1 and -1, so it lies on the perpendicular bisector of the segment joining them, which is the imaginary axis."
},
{
    question: "The equation |z - 2i| = 3 represents:",
    options: ["a circle with center (0,-2) and radius 3", "a circle with center (2,0) and radius 3", "a circle with center (0,2) and radius 3", "a circle with center (0,2) and radius 9"],
    answer: 2,
    explanation: "|z - z0| = r is a circle with center z0 = 2i, i.e. (0,2), and radius 3."
},
{
    question: "The imaginary part of 1/(2 - 3i) is:",
    options: ["-3/13", "2/13", "3/5", "3/13"],
    answer: 3,
    explanation: "1/(2 - 3i) = (2 + 3i)/13, so the imaginary part is 3/13."
},
{
    question: "The square roots of 3 + 4i are:",
    options: ["±(1 + 2i)", "±(2 + i)", "±(2 - i)", "±(3 + i)"],
    answer: 1,
    explanation: "(2 + i)^2 = 4 + 4i - 1 = 3 + 4i, so the roots are ±(2 + i)."
},
{
    question: "If p(x) is the monic cubic polynomial with roots 1, 2, 3, then p(4) equals:",
    options: ["12", "24", "10", "6"],
    answer: 3,
    explanation: "p(x) = (x - 1)(x - 2)(x - 3), so p(4) = 3·2·1 = 6."
},
{
    question: "The sum to infinity of the series 6 - 2 + 2/3 - 2/9 + ... is:",
    options: ["9", "9/2", "4", "3"],
    answer: 1,
    explanation: "First term 6, ratio -1/3. Sum = 6/(1 + 1/3) = 6/(4/3) = 9/2."
},
{
    question: "If the sum of the first n terms of a sequence is Sn = 3n^2 + 2n, then its 10th term is:",
    options: ["62", "56", "59", "65"],
    answer: 2,
    explanation: "a10 = S10 - S9 = 320 - 261 = 59."
},
{
    question: "In an AP the 4th term is 14 and the 9th term is 34. The 20th term is:",
    options: ["82", "78", "74", "86"],
    answer: 1,
    explanation: "5d = 20 gives d = 4, and a = 14 - 12 = 2. So a20 = 2 + 19·4 = 78."
},
{
    question: "In a GP the 3rd term is 12 and the 6th term is 96. The sum of the first 5 terms is:",
    options: ["96", "186", "63", "93"],
    answer: 3,
    explanation: "r^3 = 96/12 = 8, so r = 2 and a = 12/4 = 3. S5 = 3(2^5 - 1)/(2 - 1) = 93."
},
{
    question: "The 10th term of the harmonic progression 1/2, 1/5, 1/8, ... is:",
    options: ["1/26", "1/29", "1/32", "1/20"],
    answer: 1,
    explanation: "The reciprocals 2, 5, 8, ... form an AP with d = 3. The 10th term is 2 + 27 = 29, so the HP term is 1/29."
},
{
    question: "The value of Σ from k=1 to 10 of k(k + 1) is:",
    options: ["385", "330", "440", "550"],
    answer: 2,
    explanation: "Σk^2 + Σk = 385 + 55 = 440."
},
{
    question: "The value of 1^3 + 2^3 + ... + 8^3 is:",
    options: ["1296", "1024", "1156", "1444"],
    answer: 0,
    explanation: "The sum of cubes equals (n(n + 1)/2)^2 = 36^2 = 1296."
},
{
    question: "The value of 1/(1·2) + 1/(2·3) + ... + 1/(19·20) is:",
    options: ["19/20", "20/21", "18/19", "1"],
    answer: 0,
    explanation: "The sum telescopes: each term is 1/k - 1/(k + 1), giving 1 - 1/20 = 19/20."
},
{
    question: "For x > 0, the minimum value of x + 16/x is:",
    options: ["4", "12", "16", "8"],
    answer: 3,
    explanation: "By AM-GM, x + 16/x ≥ 2·sqrt(16) = 8, with equality at x = 4."
},
{
    question: "The maximum value of x(12 - 2x) is:",
    options: ["16", "18", "20", "12"],
    answer: 1,
    explanation: "f(x) = 12x - 2x^2 has its maximum at x = 3, where f(3) = 36 - 18 = 18."
},
{
    question: "If (3x + 5)/((x + 1)(x + 2)) = A/(x + 1) + B/(x + 2), then A - B equals:",
    options: ["1", "3", "-1", "2"],
    answer: 0,
    explanation: "At x = -1: A = (−3 + 5)/1 = 2. At x = -2: B = (−6 + 5)/(−1) = 1. So A - B = 1."
},
{
    question: "If A = [[2,1],[1,1]], the sum of all entries of A^{-1} is:",
    options: ["1", "0", "2", "-1"],
    answer: 0,
    explanation: "det A = 1, so A^{-1} = [[1,-1],[-1,2]]. The sum of entries is 1 - 1 - 1 + 2 = 1."
},
{
    question: "Given log10(2) = 0.3010, the number of digits in 2^40 is:",
    options: ["12", "14", "13", "11"],
    answer: 2,
    explanation: "log10(2^40) = 40 × 0.3010 = 12.04. The number of digits is floor(12.04) + 1 = 13."
},
{
    question: "The solution of the equation 2·log(x) = log(x + 6) is:",
    options: ["3", "-2", "6", "2"],
    answer: 0,
    explanation: "x^2 = x + 6 gives x = 3 or x = -2. Since the logarithm requires x > 0, x = 3."
},
{
    question: "The determinant of [[1,2,0],[3,1,1],[2,0,1]] is:",
    options: ["5", "1", "-5", "-1"],
    answer: 3,
    explanation: "Expanding along the first row: 1(1·1 - 1·0) - 2(3·1 - 1·2) + 0 = 1 - 2 = -1."
},
{
    question: "If A is a 3×3 matrix with det(A) = 4, then det(2A) equals:",
    options: ["8", "16", "32", "64"],
    answer: 2,
    explanation: "For an n×n matrix, det(kA) = k^n det(A). So det(2A) = 2^3 · 4 = 32."
},
{
    question: "If A is a 3×3 matrix with det(A) = 5, then det(adj A) equals:",
    options: ["5", "25", "125", "10"],
    answer: 1,
    explanation: "det(adj A) = (det A)^(n-1) = 5^2 = 25."
},
{
    question: "If A is a square matrix with det(A) = -2, then det(A^3) equals:",
    options: ["8", "-6", "6", "-8"],
    answer: 3,
    explanation: "det(A^3) = (det A)^3 = (-2)^3 = -8."
},
{
    question: "If A = [[1,1],[0,1]], then A^50 equals:",
    options: ["[[1,1],[0,50]]", "[[1,50],[0,1]]", "[[50,50],[0,50]]", "[[1,2^50],[0,1]]"],
    answer: 1,
    explanation: "A^2 = [[1,2],[0,1]] and by induction A^n = [[1,n],[0,1]]. So A^50 = [[1,50],[0,1]]."
},
{
    question: "The eigenvalues of the matrix [[4,1],[2,3]] are:",
    options: ["4 and 3", "6 and 1", "7 and 10", "5 and 2"],
    answer: 3,
    explanation: "Characteristic equation: λ^2 - (trace)λ + det = λ^2 - 7λ + 10 = 0, so λ = 5 and 2."
},
{
    question: "The solution of the system 2x + 3y = 8, x - y = -1 is:",
    options: ["(2,1)", "(-1,3)", "(3,0)", "(1,2)"],
    answer: 3,
    explanation: "From the second equation x = y - 1. Then 2(y - 1) + 3y = 8 gives y = 2 and x = 1."
},
{
    question: "The system x + 2y = 3, 2x + ky = 6 has infinitely many solutions when k equals:",
    options: ["2", "3", "4", "6"],
    answer: 2,
    explanation: "The second equation must be twice the first: 2x + 4y = 6, so k = 4."
},
{
    question: "If x + y + z = 6, x - y + z = 2 and x + y - z = 0, then x + 2y + 3z equals:",
    options: ["14", "12", "10", "16"],
    answer: 0,
    explanation: "Subtracting the first two equations gives y = 2. Then x + z = 4 and x - z = -2, so x = 1, z = 3. Hence x + 2y + 3z = 1 + 4 + 9 = 14."
},
{
    question: "The (1,2) entry of the inverse of [[2,3],[1,2]] is:",
    options: ["3", "-1", "2", "-3"],
    answer: 3,
    explanation: "det = 4 - 3 = 1, so the inverse is [[2,-3],[-1,2]]. The (1,2) entry is -3."
},
{
    question: "If A = [[1,2],[3,4]] and A^2 = pA + qI, then p + q equals:",
    options: ["3", "7", "5", "2"],
    answer: 1,
    explanation: "By Cayley-Hamilton, A^2 - (trace)A + (det)I = 0, i.e. A^2 = 5A + 2I. So p + q = 7."
},
{
    question: "For the determinant with rows (1,a,a^2), (1,b,b^2), (1,c,c^2), the value when a = 1, b = 2, c = 3 is:",
    options: ["6", "1", "0", "2"],
    answer: 3,
    explanation: "The Vandermonde determinant equals (b - a)(c - a)(c - b) = (1)(2)(1) = 2."
},
{
    question: "The rank of the matrix [[1,2,3],[2,4,6],[1,1,1]] is:",
    options: ["1", "2", "3", "0"],
    answer: 1,
    explanation: "Row 2 is twice row 1, so they are dependent, while row 3 is independent of row 1. Hence the rank is 2."
},
{
    question: "The determinant of a 3×3 real skew-symmetric matrix is:",
    options: ["1", "-1", "dependent on the entries", "0"],
    answer: 3,
    explanation: "For skew-symmetric A of odd order, det(A) = det(A^T) = det(-A) = (-1)^n det(A) = -det(A), so det(A) = 0."
},
{
    question: "The exact value of sin 75° is:",
    options: ["(sqrt(6) - sqrt(2))/4", "sqrt(3)/2", "(sqrt(3) + 1)/2", "(sqrt(6) + sqrt(2))/4"],
    answer: 3,
    explanation: "sin(45° + 30°) = sin45 cos30 + cos45 sin30 = (sqrt(2)/2)(sqrt(3)/2) + (sqrt(2)/2)(1/2) = (sqrt(6) + sqrt(2))/4."
},
{
    question: "The value of cos 15° · cos 75° is:",
    options: ["1/2", "sqrt(3)/4", "1/4", "1/8"],
    answer: 2,
    explanation: "cos 75° = sin 15°, so the product is sin15 cos15 = (1/2) sin 30° = 1/4."
},
{
    question: "The value of sin 10° · sin 50° · sin 70° is:",
    options: ["1/4", "1/8", "sqrt(3)/8", "1/16"],
    answer: 1,
    explanation: "Using sin θ sin(60° - θ) sin(60° + θ) = (1/4) sin 3θ with θ = 10°: (1/4) sin 30° = 1/8."
},
{
    question: "If tan A = 1/2 and tan B = 1/3, then A + B equals (A, B acute):",
    options: ["30°", "60°", "90°", "45°"],
    answer: 3,
    explanation: "tan(A + B) = (1/2 + 1/3)/(1 - 1/6) = (5/6)/(5/6) = 1, so A + B = 45°."
},
{
    question: "If sin x + cos x = 1/2, then sin 2x equals:",
    options: ["3/4", "-3/4", "1/4", "-1/4"],
    answer: 1,
    explanation: "Squaring: 1 + sin 2x = 1/4, so sin 2x = -3/4."
},
{
    question: "The maximum value of 5 sin x - 12 cos x + 3 is:",
    options: ["10", "13", "16", "15"],
    answer: 2,
    explanation: "The amplitude of 5 sin x - 12 cos x is sqrt(25 + 144) = 13, so the maximum of the expression is 13 + 3 = 16."
},
{
    question: "The number of solutions of 2 sin^2 x - 3 sin x + 1 = 0 in [0, 2π] is:",
    options: ["2", "4", "1", "3"],
    answer: 3,
    explanation: "(2 sin x - 1)(sin x - 1) = 0 gives sin x = 1/2 (x = π/6, 5π/6) or sin x = 1 (x = π/2). That is 3 solutions."
},
{
    question: "The number of solutions of cos 2x = 1/2 in [0, π] is:",
    options: ["2", "1", "3", "4"],
    answer: 0,
    explanation: "For x in [0, π], 2x is in [0, 2π] where cos = 1/2 at 2x = π/3 and 5π/3. So x = π/6 and 5π/6: 2 solutions."
},
{
    question: "The value of sin^{-1}(sin(5π/6)) is:",
    options: ["5π/6", "π/6", "-π/6", "π/3"],
    answer: 1,
    explanation: "The principal value lies in [-π/2, π/2]. Since sin(5π/6) = sin(π/6) = 1/2, the answer is π/6."
},
{
    question: "The value of tan^{-1}(1) + tan^{-1}(2) + tan^{-1}(3) is:",
    options: ["π/2", "3π/4", "π", "2π"],
    answer: 2,
    explanation: "tan^{-1}2 + tan^{-1}3 = π + tan^{-1}((5)/(1 - 6)) = π - π/4 = 3π/4. Adding π/4 gives π."
},
{
    question: "The value of sin^{-1}(3/5) + sin^{-1}(4/5) is:",
    options: ["π", "π/2", "π/4", "3π/4"],
    answer: 1,
    explanation: "If α = sin^{-1}(3/5), then cos α = 4/5, so sin^{-1}(4/5) = π/2 - α. The sum is π/2."
},
{
    question: "The value of sin(2 tan^{-1}(1/2)) is:",
    options: ["3/5", "1/2", "4/5", "2/5"],
    answer: 2,
    explanation: "sin 2θ = 2 tan θ/(1 + tan^2 θ) = 1/(1 + 1/4) = 4/5."
},
{
    question: "In a triangle with sides 7, 8 and 9, the cosine of the angle opposite the side of length 7 is:",
    options: ["1/3", "2/3", "3/4", "5/6"],
    answer: 1,
    explanation: "cos A = (8^2 + 9^2 - 7^2)/(2·8·9) = 96/144 = 2/3."
},
{
    question: "The area of a triangle with sides 13, 14, 15 is:",
    options: ["91", "72", "96", "84"],
    answer: 3,
    explanation: "s = 21. Area = sqrt(21·8·7·6) = sqrt(7056) = 84."
},
{
    question: "The circumradius of a triangle with sides 3, 4, 5 is:",
    options: ["2", "3", "5", "2.5"],
    answer: 3,
    explanation: "The triangle is right-angled, so the hypotenuse is the diameter of the circumcircle: R = 5/2 = 2.5."
},
{
    question: "In triangle ABC, a = sqrt(3) and A = 60°. The circumradius R is:",
    options: ["2", "1", "sqrt(3)", "1/2"],
    answer: 1,
    explanation: "a/sin A = 2R gives 2R = sqrt(3)/(sqrt(3)/2) = 2, so R = 1."
},
{
    question: "From a point 30 m from the foot of a tower, the angle of elevation of the top is 60°. The height of the tower is:",
    options: ["10sqrt(3) m", "30 m", "60 m", "30sqrt(3) m"],
    answer: 3,
    explanation: "Height = 30 tan 60° = 30sqrt(3) m."
},
{
    question: "The period of the function f(x) = sin^2 x is:",
    options: ["2π", "π", "π/2", "4π"],
    answer: 1,
    explanation: "sin^2 x = (1 - cos 2x)/2, whose period is 2π/2 = π."
},
{
    question: "The range of f(x) = 2 sin x + 1 is:",
    options: ["[-2, 2]", "[1, 3]", "[-1, 3]", "[0, 2]"],
    answer: 2,
    explanation: "sin x is in [-1, 1], so 2 sin x + 1 is in [-1, 3]."
},
{
    question: "The domain of f(x) = sqrt(x^2 - 5x + 6) is:",
    options: ["2 ≤ x ≤ 3", "x ≥ 3", "x ≤ 2", "x ≤ 2 or x ≥ 3"],
    answer: 3,
    explanation: "We need (x - 2)(x - 3) ≥ 0, which holds for x ≤ 2 or x ≥ 3."
},
{
    question: "The domain of f(x) = ln(4 - x^2) is:",
    options: ["(-2, 2)", "[-2, 2]", "(-∞, -2) ∪ (2, ∞)", "(0, 4)"],
    answer: 0,
    explanation: "We need 4 - x^2 > 0, so -2 < x < 2."
},
{
    question: "The distance from the point (3,4) to the line 3x + 4y - 5 = 0 is:",
    options: ["5", "4", "3", "2"],
    answer: 1,
    explanation: "Distance = |3·3 + 4·4 - 5|/sqrt(9 + 16) = 20/5 = 4."
},
{
    question: "The area of the triangle with vertices (1,1), (4,5) and (7,2) is:",
    options: ["21", "21/2", "15", "12"],
    answer: 1,
    explanation: "Area = (1/2)|1(5 - 2) + 4(2 - 1) + 7(1 - 5)| = (1/2)|3 + 4 - 28| = 21/2."
},
{
    question: "The line through (2,3) parallel to 3x - y + 5 = 0 is:",
    options: ["3x - y + 3 = 0", "3x + y - 9 = 0", "3x - y - 3 = 0", "x + 3y - 11 = 0"],
    answer: 2,
    explanation: "A parallel line has the form 3x - y + c = 0. Substituting (2,3): 6 - 3 + c = 0, so c = -3."
},
{
    question: "The line through the origin perpendicular to 2x + 3y = 6 is:",
    options: ["2x - 3y = 0", "3x + 2y = 0", "2x + 3y = 0", "3x - 2y = 0"],
    answer: 3,
    explanation: "The given line has slope -2/3, so the perpendicular has slope 3/2. Through the origin: y = (3/2)x, i.e. 3x - 2y = 0."
},
{
    question: "The acute angle between the lines y = x and y = sqrt(3)x is:",
    options: ["30°", "45°", "60°", "15°"],
    answer: 3,
    explanation: "The lines make angles 45° and 60° with the x-axis, so the angle between them is 15°."
},
{
    question: "The reflection of the point (1,2) in the line x + y = 0 is:",
    options: ["(2,1)", "(-2,-1)", "(-1,-2)", "(2,-1)"],
    answer: 1,
    explanation: "Reflection in y = -x maps (x, y) to (-y, -x), so (1,2) goes to (-2,-1)."
},
{
    question: "The centroid of the triangle with vertices (1,2), (3,4) and (5,9) is:",
    options: ["(3,4)", "(9,15)", "(3,5)", "(2,5)"],
    answer: 2,
    explanation: "Centroid = ((1 + 3 + 5)/3, (2 + 4 + 9)/3) = (3, 5)."
},
{
    question: "The radius of the circle x^2 + y^2 - 6x + 8y = 0 is:",
    options: ["sqrt(5)", "25", "10", "5"],
    answer: 3,
    explanation: "Completing squares: (x - 3)^2 + (y + 4)^2 = 25, so the radius is 5."
},
{
    question: "The radius of the circle passing through (0,0), (4,0) and (0,6) is:",
    options: ["5", "13", "sqrt(13)", "sqrt(26)"],
    answer: 2,
    explanation: "The right angle at the origin makes the hypotenuse a diameter, so the center is (2,3) and the radius is sqrt(4 + 9) = sqrt(13)."
},
{
    question: "The length of the tangent from the point (5,0) to the circle x^2 + y^2 = 9 is:",
    options: ["5", "3", "4", "sqrt(34)"],
    answer: 2,
    explanation: "Length = sqrt(x1^2 + y1^2 - r^2) = sqrt(25 - 9) = 4."
},
{
    question: "The line y = x + c is tangent to the circle x^2 + y^2 = 8 if c equals:",
    options: ["±2sqrt(2)", "±4", "±8", "±2"],
    answer: 1,
    explanation: "Distance from the origin to x - y + c = 0 must equal the radius: |c|/sqrt(2) = 2sqrt(2), so |c| = 4."
},
{
    question: "The circles x^2 + y^2 = 1 and (x - 3)^2 + y^2 = 4 touch:",
    options: ["internally", "externally", "at two points (intersect)", "not at all (they are disjoint)"],
    answer: 1,
    explanation: "The centers are 3 apart and the radii are 1 and 2. Since 3 = 1 + 2, the circles touch externally."
},
{
    question: "The focus of the parabola y^2 = 12x is:",
    options: ["(6,0)", "(3,0)", "(0,3)", "(12,0)"],
    answer: 1,
    explanation: "y^2 = 4ax with 4a = 12 gives a = 3, so the focus is (3,0)."
},
{
    question: "The directrix of the parabola x^2 = -16y is:",
    options: ["y = -4", "x = 4", "y = 4", "x = -4"],
    answer: 2,
    explanation: "x^2 = 4ay with 4a = -16 gives a = -4. The directrix is y = -a = 4."
},
{
    question: "The eccentricity of the ellipse x^2/25 + y^2/9 = 1 is:",
    options: ["3/5", "16/25", "5/4", "4/5"],
    answer: 3,
    explanation: "e = sqrt(1 - b^2/a^2) = sqrt(1 - 9/25) = 4/5."
},
{
    question: "The length of the latus rectum of the ellipse 9x^2 + 16y^2 = 144 is:",
    options: ["9", "9/2", "3/2", "8"],
    answer: 1,
    explanation: "The ellipse is x^2/16 + y^2/9 = 1 with a = 4, b = 3. Latus rectum = 2b^2/a = 18/4 = 9/2."
},
{
    question: "The eccentricity of the hyperbola x^2/16 - y^2/9 = 1 is:",
    options: ["4/3", "5/4", "5/3", "3/4"],
    answer: 1,
    explanation: "e = sqrt(1 + b^2/a^2) = sqrt(1 + 9/16) = 5/4."
},
{
    question: "The eccentricity of the rectangular hyperbola x^2 - y^2 = 4 is:",
    options: ["2", "sqrt(2)", "1", "sqrt(3)"],
    answer: 1,
    explanation: "Here a = b = 2, so e = sqrt(1 + 1) = sqrt(2)."
},
{
    question: "The distance between the foci of the ellipse x^2/25 + y^2/16 = 1 is:",
    options: ["3", "8", "6", "10"],
    answer: 2,
    explanation: "c^2 = a^2 - b^2 = 25 - 16 = 9, so c = 3 and the distance between foci is 2c = 6."
},
{
    question: "The asymptotes of the hyperbola x^2/9 - y^2/4 = 1 are:",
    options: ["y = ±(3/2)x", "y = ±(2/3)x", "y = ±(4/9)x", "y = ±x"],
    answer: 1,
    explanation: "The asymptotes are y = ±(b/a)x = ±(2/3)x."
},
{
    question: "If |a| = 3, |b| = 4 and a · b = 6sqrt(2), the angle between a and b is:",
    options: ["30°", "60°", "90°", "45°"],
    answer: 3,
    explanation: "cos θ = 6sqrt(2)/(3·4) = sqrt(2)/2, so θ = 45°."
},
{
    question: "If a = (1,2,3) and b = (2,-1,1), then |a × b| equals:",
    options: ["15", "5", "3sqrt(5)", "5sqrt(3)"],
    answer: 3,
    explanation: "a × b = (2·1 - 3·(-1), 3·2 - 1·1, 1·(-1) - 2·2) = (5, 5, -5). Its magnitude is sqrt(75) = 5sqrt(3)."
},
{
    question: "The area of the triangle with vertices (1,0,0), (0,1,0) and (0,0,1) is:",
    options: ["1/2", "sqrt(3)", "sqrt(3)/2", "3/2"],
    answer: 2,
    explanation: "AB = (-1,1,0), AC = (-1,0,1), and AB × AC = (1,1,1). Area = (1/2)sqrt(3) = sqrt(3)/2."
},
{
    question: "The volume of the parallelepiped with edges (2,0,1), (1,3,0) and (0,1,4) is:",
    options: ["23", "24", "25", "26"],
    answer: 2,
    explanation: "The scalar triple product is det[[2,0,1],[1,3,0],[0,1,4]] = 2(12) - 0 + 1(1) = 25."
},
{
    question: "The vectors (1,2,λ) and (3,-1,2) are perpendicular when λ equals:",
    options: ["1/2", "-1/2", "-1", "2"],
    answer: 1,
    explanation: "Dot product: 3 - 2 + 2λ = 0, so λ = -1/2."
},
{
    question: "The scalar projection of a = (2,3,6) on b = (1,2,2) is:",
    options: ["20/9", "6", "4", "20/3"],
    answer: 3,
    explanation: "Projection = (a · b)/|b| = (2 + 6 + 12)/3 = 20/3."
},
{
    question: "A unit vector perpendicular to both (1,1,0) and (0,1,1) is:",
    options: ["(1,1,1)/sqrt(3)", "(1,-1,1)/sqrt(3)", "(1,-1,-1)/sqrt(3)", "(1,0,-1)/sqrt(2)"],
    answer: 1,
    explanation: "The cross product is (1,-1,1), whose magnitude is sqrt(3). Dividing gives (1,-1,1)/sqrt(3)."
},
{
    question: "The angle between the vectors i + j and j + k is:",
    options: ["30°", "45°", "60°", "90°"],
    answer: 2,
    explanation: "cos θ = (0 + 1 + 0)/(sqrt(2)·sqrt(2)) = 1/2, so θ = 60°."
},
{
    question: "The distance of the plane x + y + z = 1 from the origin is:",
    options: ["1", "1/sqrt(3)", "sqrt(3)", "1/3"],
    answer: 1,
    explanation: "Distance = |0 + 0 + 0 - 1|/sqrt(1 + 1 + 1) = 1/sqrt(3)."
},
{
    question: "The distance of the point (1,2,3) from the plane 2x - 2y + z = 5 is:",
    options: ["1", "4/3", "5/3", "2"],
    answer: 1,
    explanation: "Distance = |2 - 4 + 3 - 5|/sqrt(4 + 4 + 1) = 4/3."
},
{
    question: "The radius of the sphere x^2 + y^2 + z^2 - 2x + 4y - 6z = 0 is:",
    options: ["14", "sqrt(12)", "4", "sqrt(14)"],
    answer: 3,
    explanation: "The center is (1,-2,3) and r^2 = 1 + 4 + 9 - 0 = 14, so r = sqrt(14)."
},
{
    question: "The value of lim(x->0) (tan x - x)/x^3 is:",
    options: ["1/2", "1/3", "1", "0"],
    answer: 1,
    explanation: "tan x = x + x^3/3 + ..., so (tan x - x)/x^3 -> 1/3."
},
{
    question: "The value of lim(x->0) (sin x - x)/x^3 is:",
    options: ["1/6", "-1/6", "-1/3", "0"],
    answer: 1,
    explanation: "sin x = x - x^3/6 + ..., so (sin x - x)/x^3 -> -1/6."
},
{
    question: "The value of lim(x->∞) (1 + 2/x)^x is:",
    options: ["e", "2e", "1", "e^2"],
    answer: 3,
    explanation: "Using lim (1 + a/x)^x = e^a with a = 2, the limit is e^2."
},
{
    question: "The value of lim(x->0) (3^x - 1)/x is:",
    options: ["3", "1/ln 3", "ln 3", "0"],
    answer: 2,
    explanation: "lim (a^x - 1)/x = ln a, so the limit is ln 3."
},
{
    question: "The value of lim(x->1) (x^3 - 1)/(x^2 - 1) is:",
    options: ["2/3", "3/2", "1", "3"],
    answer: 1,
    explanation: "Factor: (x - 1)(x^2 + x + 1)/((x - 1)(x + 1)) = (x^2 + x + 1)/(x + 1) -> 3/2."
},
{
    question: "The value of lim(x->∞) (3x^2 + 2x)/(5x^2 - 1) is:",
    options: ["0", "2/5", "∞", "3/5"],
    answer: 3,
    explanation: "Divide numerator and denominator by x^2: the limit is 3/5."
},
{
    question: "The value of lim(x->0) (1 - cos 4x)/x^2 is:",
    options: ["16", "4", "2", "8"],
    answer: 3,
    explanation: "1 - cos 4x ≈ (4x)^2/2 = 8x^2, so the limit is 8."
},
{
    question: "The value of lim(x->2) (x^2 - 4)/(sqrt(x + 2) - 2) is:",
    options: ["16", "8", "4", "2"],
    answer: 0,
    explanation: "Rationalize: sqrt(x + 2) - 2 = (x - 2)/(sqrt(x + 2) + 2). The expression becomes (x + 2)(sqrt(x + 2) + 2) -> 4·4 = 16."
},
{
    question: "If f(x) = (x^2 - 9)/(x - 3) for x ≠ 3 and f(3) = k is continuous at x = 3, then k equals:",
    options: ["3", "9", "0", "6"],
    answer: 3,
    explanation: "For x ≠ 3, f(x) = x + 3, so the limit at 3 is 6. Continuity requires k = 6."
},
{
    question: "The derivative of ln(sin x) is:",
    options: ["tan x", "1/sin x", "-cot x", "cot x"],
    answer: 3,
    explanation: "d/dx ln(sin x) = cos x/sin x = cot x."
},
{
    question: "The derivative of x^2 e^x is:",
    options: ["2x e^x", "x^2 e^x", "e^x(x^2 + x)", "e^x(x^2 + 2x)"],
    answer: 3,
    explanation: "By the product rule: 2x e^x + x^2 e^x = e^x(x^2 + 2x)."
},
{
    question: "The derivative of tan^{-1}(x^2) is:",
    options: ["1/(1 + x^4)", "2x/(1 + x^4)", "2x/(1 + x^2)", "x^2/(1 + x^4)"],
    answer: 1,
    explanation: "By the chain rule: (1/(1 + (x^2)^2)) · 2x = 2x/(1 + x^4)."
},
{
    question: "If y = (ln x)/x, then dy/dx at x = e is:",
    options: ["1/e", "0", "1/e^2", "e"],
    answer: 1,
    explanation: "dy/dx = (1 - ln x)/x^2, which equals 0 at x = e."
},
{
    question: "If x = t^2 and y = t^3, then dy/dx at t = 2 is:",
    options: ["6", "3", "2", "3/2"],
    answer: 1,
    explanation: "dy/dx = (3t^2)/(2t) = 3t/2, which equals 3 at t = 2."
},
{
    question: "If y = x^4 - 3x^2, then d^2y/dx^2 at x = 1 is:",
    options: ["12", "-6", "0", "6"],
    answer: 3,
    explanation: "y'' = 12x^2 - 6, so y''(1) = 6."
},
{
    question: "The tangent to y = x^3 - 3x + 2 is horizontal at:",
    options: ["x = 0", "x = ±sqrt(3)", "x = ±1", "x = 3"],
    answer: 2,
    explanation: "y' = 3x^2 - 3 = 0 gives x = ±1."
},
{
    question: "The equation of the normal to y = x^2 at the point (1,1) is:",
    options: ["2x + y = 3", "x + 2y = 3", "x - 2y = -1", "2x - y = 1"],
    answer: 1,
    explanation: "The tangent slope is 2, so the normal slope is -1/2. Normal: y - 1 = -(1/2)(x - 1), i.e. x + 2y = 3."
},
{
    question: "The maximum value of f(x) = x^3 - 12x on the interval [-3, 3] is:",
    options: ["9", "16", "-16", "0"],
    answer: 1,
    explanation: "f'(x) = 3x^2 - 12 = 0 gives x = ±2. f(-2) = 16, f(2) = -16, f(-3) = 9, f(3) = -9. The maximum is 16."
},
{
    question: "The minimum value of f(x) = x ln x for x > 0 is:",
    options: ["-e", "0", "1/e", "-1/e"],
    answer: 3,
    explanation: "f'(x) = ln x + 1 = 0 gives x = 1/e. Then f(1/e) = (1/e)(-1) = -1/e."
},
{
    question: "The local maximum value of f(x) = 2x^3 - 9x^2 + 12x is:",
    options: ["4", "6", "3", "5"],
    answer: 3,
    explanation: "f'(x) = 6(x - 1)(x - 2) and f''(x) = 12x - 18 is negative at x = 1. So the local maximum is f(1) = 2 - 9 + 12 = 5."
},
{
    question: "The radius of a circle increases at 2 cm/s. The rate of increase of its area when the radius is 5 cm is:",
    options: ["10π cm^2/s", "25π cm^2/s", "20π cm^2/s", "50π cm^2/s"],
    answer: 2,
    explanation: "dA/dt = 2πr(dr/dt) = 2π(5)(2) = 20π."
},
{
    question: "The function f(x) = x^3 - 3x^2 + 5 is decreasing in the interval:",
    options: ["(-∞, 0)", "(0, 2)", "(2, ∞)", "(-2, 0)"],
    answer: 1,
    explanation: "f'(x) = 3x(x - 2) is negative for 0 < x < 2."
},
{
    question: "For f(x) = x^2 on [1, 3], the value of c guaranteed by the Mean Value Theorem is:",
    options: ["3/2", "5/2", "1", "2"],
    answer: 3,
    explanation: "f'(c) = (9 - 1)/(3 - 1) = 4, so 2c = 4 and c = 2."
},
{
    question: "The value of lim(x->0) (e^x - 1 - x)/x^2 is:",
    options: ["1", "1/2", "0", "2"],
    answer: 1,
    explanation: "e^x = 1 + x + x^2/2 + ..., so the limit is 1/2."
},
{
    question: "The integral of x e^x dx is:",
    options: ["e^x(x + 1) + C", "e^x(x - 1) + C", "x e^x + C", "x^2 e^x/2 + C"],
    answer: 1,
    explanation: "Integration by parts: ∫x e^x dx = x e^x - ∫e^x dx = e^x(x - 1) + C."
},
{
    question: "The value of ∫_0^{π/2} sin^2 x dx is:",
    options: ["π/2", "1", "π/4", "1/2"],
    answer: 2,
    explanation: "sin^2 x = (1 - cos 2x)/2, so the integral is [x/2 - sin 2x/4] from 0 to π/2 = π/4."
},
{
    question: "The value of ∫_1^e ln x dx is:",
    options: ["e", "e - 1", "1", "0"],
    answer: 2,
    explanation: "∫ln x dx = x ln x - x. Evaluating: (e - e) - (0 - 1) = 1."
},
{
    question: "The integral of 1/(x^2 + 4) dx is:",
    options: ["tan^{-1}(x/2) + C", "(1/4) tan^{-1}(x/2) + C", "2 tan^{-1}(x/2) + C", "(1/2) tan^{-1}(x/2) + C"],
    answer: 3,
    explanation: "∫dx/(x^2 + a^2) = (1/a) tan^{-1}(x/a). With a = 2 this is (1/2) tan^{-1}(x/2) + C."
},
{
    question: "The integral of 2x/(x^2 + 1) dx is:",
    options: ["2 ln(x^2 + 1) + C", "ln(x^2 + 1) + C", "tan^{-1} x + C", "ln|2x| + C"],
    answer: 1,
    explanation: "The numerator is the derivative of the denominator, so the integral is ln(x^2 + 1) + C."
},
{
    question: "The value of ∫_0^1 x·sqrt(1 + x^2) dx is:",
    options: ["(2sqrt(2) + 1)/3", "2sqrt(2)/3", "(2sqrt(2) - 1)/3", "1/3"],
    answer: 2,
    explanation: "Let u = 1 + x^2: (1/2)∫u^{1/2} du = (1/3)u^{3/2} from 1 to 2 = (2sqrt(2) - 1)/3."
},
{
    question: "The value of ∫_{-2}^{2} (x^3 + x^2) dx is:",
    options: ["8/3", "0", "32/3", "16/3"],
    answer: 3,
    explanation: "The odd term x^3 integrates to 0. The even term gives 2∫_0^2 x^2 dx = 2·(8/3) = 16/3."
},
{
    question: "The area enclosed between y = x and y = x^2 is:",
    options: ["1/3", "1/2", "1/6", "1/12"],
    answer: 2,
    explanation: "They meet at x = 0 and 1. Area = ∫_0^1 (x - x^2) dx = 1/2 - 1/3 = 1/6."
},
{
    question: "The area bounded by y = 4 - x^2 and the x-axis is:",
    options: ["16/3", "32/3", "8", "16"],
    answer: 1,
    explanation: "Area = ∫_{-2}^{2} (4 - x^2) dx = 16 - 16/3 = 32/3."
},
{
    question: "The volume generated by revolving y = x, 0 ≤ x ≤ 2, about the x-axis is:",
    options: ["4π", "8π/3", "8π", "4π/3"],
    answer: 1,
    explanation: "V = π∫_0^2 x^2 dx = π(8/3) = 8π/3."
}
];