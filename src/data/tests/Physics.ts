import type { Question } from "./types";

export const Questions: Question[] = [
{
"question": "A physical quantity X is defined as X = (A²B)/(C√D). If the percentage errors in A, B, C and D are 1%, 2%, 3% and 4% respectively, what is the maximum percentage error in X?",
"options": ["8%", "9%", "10%", "12%"],
"answer": 1,
"explanation": "For X = A²B/(C√D), percentage error = 2(1%) + 2% + 3% + ½(4%) = 2% + 2% + 3% + 2% = 9%."
},


{ "question": "In an experiment, the length of a wire is measured as 1.25 m with a vernier caliper having least count 0.01 cm. What is the relative uncertainty in the measurement?",
"options": ["8 × 10⁻⁵", "8 × 10⁻⁴", "8 × 10⁻³", "8 × 10⁻²"],
"answer": 0,
"explanation": "Least count = 0.01 cm = 1 × 10⁻⁴ m. Relative uncertainty = (1 × 10⁻⁴) / 1.25 ≈ 8 × 10⁻⁵."
},

{ "question": "Two vectors A and B have magnitudes 5 and 12 respectively. If the magnitude of their resultant is 13, the angle between A and B is:",
"options": ["0°", "30°", "60°", "90°"],
"answer": 3,
"explanation": "R² = A² + B² + 2AB cosθ ⇒ 13² = 5² + 12² + 2(5)(12)cosθ ⇒ 169 = 25 + 144 + 120 cosθ ⇒ 0 = 120 cosθ ⇒ cosθ = 0 ⇒ θ = 90°."
},

{ "question": "A particle moves along a straight line with position x = 2t³ − 9t² + 12t (x in m, t in s). At what time is its acceleration zero?",
"options": ["1 s", "1.5 s", "2 s", "3 s"],
"answer": 1,
"explanation": "v = dx/dt = 6t² − 18t + 12; a = dv/dt = 12t − 18. Set a = 0 ⇒ 12t − 18 = 0 ⇒ t = 1.5 s."
},

{ "question": "A projectile is fired with speed u at an angle θ with the horizontal. Its horizontal range is equal to its maximum height. The value of tanθ is:",
"options": ["1", "2", "4", "√2"],
"answer": 2,
"explanation": "Range R = u² sin2θ / g; Max height H = u² sin²θ / (2g). Given R = H ⇒ sin2θ = ½ sin²θ ⇒ 2 sinθ cosθ = ½ sin²θ ⇒ 4 cosθ = sinθ ⇒ tanθ = 4."
},

{ "question": "A block of mass 4 kg is placed on a rough horizontal surface. A horizontal force of 12 N is just sufficient to start the block moving. The coefficient of static friction is (g = 10 m/s²):",
"options": ["0.2", "0.3", "0.4", "0.5"],
"answer": 1,
"explanation": "Limiting friction fₛ(max) = μₛ N = μₛ mg = 12 N ⇒ μₛ = 12 / (4 × 10) = 0.3."
},

{ "question": "A car of mass 1000 kg moves on a circular track of radius 50 m with a speed of 20 m/s. The required centripetal force is:",
"options": ["4000 N", "6000 N", "8000 N", "10000 N"],
"answer": 2,
"explanation": "F_c = mv²/r = (1000)(20²)/50 = (1000)(400)/50 = 8000 N."
},

{ "question": "A force F = (6i + 8j) N acts on a particle causing a displacement s = (3i − 4j) m. The work done by the force is:",
"options": ["−14 J", "0 J", "10 J", "50 J"],
"answer": 0,
"explanation": "W = F·s = (6)(3) + (8)(−4) = 18 − 32 = −14 J."
},

{ "question": "A body of mass 2 kg moving with velocity 6 m/s collides head-on with a stationary body of mass 4 kg. If the collision is perfectly inelastic, the loss in kinetic energy is:",
"options": ["8 J", "12 J", "16 J", "24 J"],
"answer": 3,
"explanation": "Initial KE = ½(2)(6²) = 36 J. Final velocity v = (2×6)/(2+4) = 12/6 = 2 m/s. Final KE = ½(6)(2²) = 12 J. Loss = 36 − 12 = 24 J."
},

{ "question": "A uniform disc of mass M and radius R rolls without slipping down an inclined plane of height h. Its speed at the bottom is:",
"options": ["√(gh)", "√(4gh/3)", "√(2gh)", "√(3gh/2)"],
"answer": 1,
"explanation": "Using energy: mgh = ½mv² + ½Iω², I = ½MR², ω = v/R ⇒ mgh = ½mv² + ½(½mR²)(v²/R²) = ½mv² + ¼mv² = ¾mv² ⇒ v² = (4/3)gh ⇒ v = √(4gh/3)."
},

{ "question": "The gravitational potential at a distance r from the center of a uniform solid sphere of mass M and radius R (r < R) is:",
"options": ["−GM/r", "−GM/R", "−GM(3R² − r²)/(2R³)", "−GM(3R² + r²)/(2R³)"],
"answer": 2,
"explanation": "Inside a uniform solid sphere: V(r) = −GM(3R² − r²)/(2R³)."
},

{ "question": "A particle executes SHM with amplitude A and angular frequency ω. Its maximum acceleration is:",
"options": ["Aω", "Aω²", "2Aω", "2Aω²"],
"answer": 1,
"explanation": "For SHM, a_max = ω²A."
},

{ "question": "The speed of sound in air at 27°C is approximately:",
"options": ["330 m/s", "340 m/s", "350 m/s", "360 m/s"],
"answer": 2,
"explanation": "v ∝ √T (in K). At 0°C (273 K), v ≈ 331 m/s. At 27°C (300 K), v ≈ 331√(300/273) ≈ 331 × 1.048 ≈ 347 m/s ≈ 350 m/s."
},

{ "question": "Water flows through a horizontal pipe of varying cross-section. At a point where the area is half, the speed of water is:",
"options": ["Same", "Half", "Double", "Four times"],
"answer": 2,
"explanation": "From continuity: A₁v₁ = A₂v₂. If A₂ = A₁/2, then v₂ = 2v₁."
},

{ "question": "One mole of an ideal gas at 300 K is heated at constant volume until its pressure doubles. The final temperature is:",
"options": ["400 K", "500 K", "600 K", "900 K"],
"answer": 2,
"explanation": "At constant V, P ∝ T. If P doubles, T doubles: T_f = 2 × 300 = 600 K."
},

{ "question": "In a Carnot engine, the efficiency is 40% when the sink temperature is 300 K. The source temperature is:",
"options": ["400 K", "450 K", "500 K", "600 K"],
"answer": 2,
"explanation": "η = 1 − T_c/T_h ⇒ 0.4 = 1 − 300/T_h ⇒ T_h = 300 / 0.6 = 500 K."
},

{ "question": "The root-mean-square speed of gas molecules is proportional to:",
"options": ["T", "√T", "T²", "1/√T"],
"answer": 1,
"explanation": "v_rms = √(3kT/m) ⇒ v_rms ∝ √T."
},

{ "question": "Two point charges +q and +4q are separated by distance d. The electric field is zero at a point on the line joining them at a distance x from +q. The value of x is:",
"options": ["d/5", "d/4", "d/3", "d/2"],
"answer": 2,
"explanation": "Fields cancel: kq/x² = k(4q)/(d − x)² ⇒ 1/x² = 4/(d − x)² ⇒ (d − x)/x = 2 ⇒ d − x = 2x ⇒ d = 3x ⇒ x = d/3."
},

{ "question": "The electric potential due to a uniformly charged spherical shell of radius R and charge Q at a point inside the shell (r < R) is:",
"options": ["0", "kQ/R", "kQ/r", "kQ(R − r)"],
"answer": 1,
"explanation": "Inside a charged shell, E = 0 but V is constant and equal to the surface value: V = kQ/R."
},

{ "question": "A parallel plate capacitor has capacitance C. If the separation between plates is halved and the area is doubled, the new capacitance is:",
"options": ["C", "2C", "4C", "8C"],
"answer": 2,
"explanation": "C = ε₀A/d. New C' = ε₀(2A)/(d/2) = 4ε₀A/d = 4C."
},

{ "question": "A wire of resistance R is stretched to double its length. Its new resistance is:",
"options": ["R", "2R", "4R", "8R"],
"answer": 2,
"explanation": "Volume constant ⇒ A' = A/2. R' = ρ(2L)/(A/2) = 4ρL/A = 4R."
},

{ "question": "In the circuit shown, three resistors 2 Ω, 3 Ω and 6 Ω are connected in parallel. The equivalent resistance is:",
"options": ["0.5 Ω", "1 Ω", "1.5 Ω", "2 Ω"],
"answer": 1,
"explanation": "1/R_eq = 1/2 + 1/3 + 1/6 = (3 + 2 + 1)/6 = 1 ⇒ R_eq = 1 Ω."
},

{ "question": "A long straight wire carries current I. The magnetic field at a distance r from the wire is proportional to:",
"options": ["I/r", "I/r²", "I²/r", "I²/r²"],
"answer": 0,
"explanation": "B = μ₀I/(2πr) ⇒ B ∝ I/r."
},

{ "question": "A coil of N turns and area A rotates with angular speed ω in a uniform magnetic field B. The maximum induced emf is:",
"options": ["NBAω", "NBA", "NBA/ω", "NBAω²"],
"answer": 0,
"explanation": "ε = NBAω sinωt ⇒ ε_max = NBAω."
},

{ "question": "In an AC circuit, the rms value of current is I₀/√2. The peak value of current is:",
"options": ["I₀", "I₀/2", "√2 I₀", "2I₀"],
"answer": 0,
"explanation": "I_rms = I_peak/√2 ⇒ I_peak = √2 I_rms. If I_rms = I₀/√2, then I_peak = I₀."
},

{ "question": "The critical angle for light going from glass (n = 1.5) to air is approximately:",
"options": ["30°", "37°", "42°", "49°"],
"answer": 2,
"explanation": "sinθ_c = n₂/n₁ = 1/1.5 ⇒ θ_c = sin⁻¹(0.667) ≈ 42°."
},

{ "question": "In Young’s double-slit experiment, if the slit separation is doubled and the distance to the screen is halved, the fringe width becomes:",
"options": ["Same", "Half", "One-fourth", "Double"],
"answer": 2,
"explanation": "β = λD/d. New β' = λ(D/2)/(2d) = (1/4)(λD/d) = β/4."
},

{ "question": "The de Broglie wavelength of an electron accelerated through a potential difference V is proportional to:",
"options": ["V", "√V", "1/V", "1/√V"],
"answer": 3,
"explanation": "λ = h/√(2meV) ⇒ λ ∝ 1/√V."
},

{ "question": "The energy of an electron in the nth orbit of hydrogen atom is proportional to:",
"options": ["n", "n²", "1/n", "1/n²"],
"answer": 3,
"explanation": "E_n ∝ −1/n²."
},

{ "question": "A radioactive nucleus has a half-life of 10 days. The fraction remaining after 30 days is:",
"options": ["1/2", "1/4", "1/8", "1/16"],
"answer": 2,
"explanation": "After 3 half-lives: (1/2)³ = 1/8."
},

{ "question": "In a p-n junction diode under forward bias, the depletion region:",
"options": ["Increases", "Decreases", "Remains same", "Becomes infinite"],
"answer": 1,
"explanation": "Forward bias reduces the barrier, so the depletion region decreases."
},

{ "question": "In a common-emitter transistor amplifier, the phase difference between input and output voltages is:",
"options": ["0°", "90°", "180°", "270°"],
"answer": 2,
"explanation": "Common-emitter configuration inverts the signal ⇒ 180° phase shift."
},

{
"question": "In the photoelectric effect, if the frequency of incident light is increased, the maximum kinetic energy of emitted electrons:",
"options": ["Increases linearly", "Decreases", "Remains constant", "Becomes zero"],
"answer": 0,
"explanation": "According to Einstein’s photoelectric equation, Kmax = hf − φ. Since φ is constant for a metal, increasing frequency increases maximum kinetic energy linearly."
},

{ "question": "X-rays are produced when high-energy electrons strike a metal target. The minimum wavelength of X-rays is inversely proportional to:",
"options": ["Electron charge", "Accelerating voltage", "Electron mass", "Target atomic number"],
"answer": 1,
"explanation": "λ_min = hc/eV ⇒ λ_min ∝ 1/V."
},

{
  question: "According to special relativity, which statement about the rest mass of a particle is correct?",
  options: [
    "It decreases as speed increases",
    "It increases as speed increases",
    "It remains invariant",
    "It becomes zero at the speed of light"
  ],
  answer: 2,
  explanation: "In modern special relativity, rest mass (invariant mass) does not depend on the observer's inertial frame or on the particle's speed. The particle's total energy and momentum increase as its speed approaches c."
},

{
"question": "In a meter bridge experiment, if the balance point is at 40 cm from the left end and resistance R₁ is connected in the left gap while R₂ is in the right gap, the ratio R₁:R₂ is:",
"options": ["2:3", "3:2", "4:1", "1:4"],
"answer": 0,
"explanation": "At balance, R₁/R₂ = l₁/l₂ = 40/60 = 2/3. Therefore, R₁:R₂ = 2:3."
},

{
  question: "The velocity-time graph of a particle moving with constant acceleration is:",
  options: [
    "A straight line with constant slope",
    "Always a horizontal line",
    "A parabola",
    "A hyperbola"
  ],
  answer: 0,
  explanation: "For constant acceleration, v = u + at. Therefore velocity varies linearly with time, producing a straight-line velocity-time graph whose slope equals the acceleration."
},

{ "question": "A particle moves such that its displacement-time graph is a parabola opening upwards. Its acceleration is:",
"options": ["Zero", "Constant and positive", "Constant and negative", "Variable"],
"answer": 1,
"explanation": "If x = At² + Bt + C, then acceleration = d²x/dt² = 2A, which is constant and positive because the parabola opens upward."
},

{ "question": "A body is projected vertically upward. At the highest point,",
"options": ["Velocity and acceleration are zero", "Velocity is zero, acceleration is g downward", "Velocity is maximum, acceleration is zero", "Both velocity and acceleration are maximum"],
"answer": 1,
"explanation": "At top, v = 0 but a = g (downward) always."
},

{
  question: "Which statement about friction and work is correct?",
  options: [
    "Friction always does negative work",
    "Friction can do positive, negative, or zero work depending on the situation",
    "Friction can never transfer energy to an object",
    "Static friction always does zero work"
  ],
  answer: 1,
  explanation: "The work done by friction depends on the displacement of the point on which the frictional force acts. Depending on the situation, friction may do positive, negative, or zero work."
},


{ "question": "A body of mass 2 kg is acted upon by two forces 3 N and 4 N perpendicular to each other. Its acceleration is:",
"options": ["1.5 m/s²", "2.0 m/s²", "2.5 m/s²", "3.5 m/s²"],
"answer": 2,
"explanation": "Resultant F = √(3² + 4²) = 5 N. a = F/m = 5/2 = 2.5 m/s²."
},

{ "question": "The dimensional formula of gravitational constant G is:",
"options": ["[M⁻¹L³T⁻²]", "[M⁻¹L²T⁻²]", "[ML³T⁻²]", "[M⁻¹L³T⁻¹]"],
"answer": 0,
"explanation": "From F = Gm₁m₂/r² ⇒ G = Fr²/(m₁m₂) ⇒ [MLT⁻²][L²]/[M²] = [M⁻¹L³T⁻²]."
},

{ "question": "A simple pendulum has period T on Earth. On the Moon (g_moon ≈ g_earth/6), its period becomes:",
"options": ["T", "√6 T", "T/√6", "6T"],
"answer": 1,
"explanation": "T = 2π√(L/g) ⇒ T' = 2π√(L/(g/6)) = √6 T."
},

{ "question": "The refractive index of a medium is 1.33. The speed of light in this medium is approximately:",
"options": ["1.5 × 10⁸ m/s", "2.0 × 10⁸ m/s", "2.25 × 10⁸ m/s", "2.5 × 10⁸ m/s"],
"answer": 2,
"explanation": "v = c/n = (3 × 10⁸)/1.33 ≈ 2.25 × 10⁸ m/s."
},

{ "question": "The binding energy per nucleon is maximum for:",
"options": ["Hydrogen", "Helium", "Iron", "Uranium"],
"answer": 2,
"explanation": "Binding energy per nucleon is greatest for nuclei in the iron-nickel region. Among the given options, iron is therefore the correct choice."
},

{ "question": "In a Wheatstone bridge, if the galvanometer shows zero deflection, then:",
"options": ["No current flows in the circuit", "The bridge is balanced", "The battery is dead", "The resistors are equal"],
"answer": 1,
"explanation": "Zero galvanometer current ⇒ bridge balanced ⇒ ratio condition holds."
},

{ "question": "A convex lens forms a real image of an object. If the object is moved closer to the lens but still beyond f, the image:",
"options": ["Moves away and becomes larger", "Moves away and becomes smaller", "Moves closer and becomes larger", "Moves closer and becomes smaller"],
"answer": 0,
"explanation": "As object approaches f from beyond, image distance increases and magnification increases."
},

{ "question": "The specific heat capacity of a substance is defined as the heat required to raise the temperature of:",
"options": ["1 g by 1°C", "1 kg by 1°C", "1 mole by 1°C", "Any mass by 1°C"],
"answer": 1,
"explanation": "Specific heat capacity is per unit mass (usually 1 kg) per degree."
},

{ "question": "In an ideal gas, the average kinetic energy of molecules depends only on:",
"options": ["Pressure", "Volume", "Temperature", "Nature of gas"],
"answer": 2,
"explanation": "⟨KE⟩ = (3/2)kT ⇒ depends only on T."
},

// Q50
{
  question: "A screw gauge has a pitch of 0.5 mm and 50 divisions on its circular scale. Its least count is:",
  options: ["0.001 mm", "0.01 mm", "0.1 mm", "0.025 mm"],
  answer: 1,
  explanation: "Least count = pitch / number of circular-scale divisions = 0.5/50 = 0.01 mm."
},

// Q51
{
  question: "Two vectors of equal magnitude P have a resultant of magnitude P. What is the angle between the two vectors?",
  options: ["60°", "90°", "120°", "150°"],
  answer: 2,
  explanation: "For two equal vectors, R² = P² + P² + 2P²cosθ. Since R = P, 1 = 2 + 2cosθ, so cosθ = -1/2 and θ = 120°."
},

// Q52
{
  question: "A vector A = 3i + 4j is perpendicular to a vector B = 4i + kj. What is the value of k?",
  options: ["-3", "-4", "-6", "-8"],
  answer: 0,
  explanation: "For perpendicular vectors, A·B = 0. Thus (3)(4) + (4)(k) = 0, giving 12 + 4k = 0 and k = -3."
},

// Q53
{
  question: "A particle starts from rest and moves with acceleration a = 4t m/s². What is its velocity after 3 s?",
  options: ["6 m/s", "12 m/s", "18 m/s", "36 m/s"],
  answer: 2,
  explanation: "Since a = dv/dt = 4t, v = ∫4t dt = 2t² + C. Starting from rest gives C = 0. At t = 3 s, v = 2(9) = 18 m/s."
},

// Q54
{
  question: "A car moving at 20 m/s is brought uniformly to rest in 5 s. How far does it travel during braking?",
  options: ["25 m", "40 m", "50 m", "100 m"],
  answer: 2,
  explanation: "For uniform acceleration, average velocity = (u + v)/2 = (20 + 0)/2 = 10 m/s. Distance = average velocity × time = 10 × 5 = 50 m."
},

// Q55
{
  question: "A stone is dropped from rest from a height of 80 m. Taking g = 10 m/s² and neglecting air resistance, its speed just before reaching the ground is:",
  options: ["20 m/s", "40 m/s", "60 m/s", "80 m/s"],
  answer: 1,
  explanation: "Using v² = u² + 2gh with u = 0: v² = 2(10)(80) = 1600, so v = 40 m/s."
},

// Q56
{
  question: "A projectile is launched with speed 20 m/s at 30° above the horizontal. Taking g = 10 m/s², its time of flight is:",
  options: ["1 s", "2 s", "2√3 s", "4 s"],
  answer: 1,
  explanation: "Time of flight T = 2u sinθ/g = 2(20)(1/2)/10 = 2 s."
},

// Q57
{
  question: "For a projectile launched and landing at the same level with fixed initial speed, which two projection angles give the same horizontal range?",
  options: ["Angles whose sum is 45°", "Angles whose difference is 90°", "Complementary angles", "Only equal angles"],
  answer: 2,
  explanation: "R = u²sin(2θ)/g. For θ and 90° - θ, sin(2(90° - θ)) = sin(180° - 2θ) = sin(2θ), so complementary angles give the same range."
},

// Q58
{
  question: "A 5 kg block is pulled horizontally by a 30 N force on a surface where the coefficient of kinetic friction is 0.2. Taking g = 10 m/s², the acceleration of the block is:",
  options: ["2 m/s²", "4 m/s²", "5 m/s²", "6 m/s²"],
  answer: 1,
  explanation: "Normal force N = mg = 50 N. Kinetic friction = μN = 0.2(50) = 10 N. Net force = 30 - 10 = 20 N, so a = 20/5 = 4 m/s²."
},

// Q59
{
  question: "A 2 kg block rests on a smooth 30° incline. What force parallel to the incline is required to keep it at rest? Take g = 10 m/s².",
  options: ["5 N up the incline", "10 N up the incline", "10 N down the incline", "20 N up the incline"],
  answer: 1,
  explanation: "The component of weight down the incline is mg sin30° = 2(10)(1/2) = 10 N. Therefore, a 10 N force up the incline is required for equilibrium."
},

// Q60
{
  question: "A 1200 kg car travels around a level circular curve of radius 60 m at 15 m/s. What minimum coefficient of static friction is required to prevent skidding? Take g = 10 m/s².",
  options: ["0.225", "0.375", "0.50", "0.625"],
  answer: 1,
  explanation: "Static friction supplies the centripetal force: μmg = mv²/r. Thus μ = v²/(rg) = 225/(60×10) = 0.375."
},

// Q61
{
  question: "A 2 kg object initially at rest is acted upon by a constant net force of 6 N over a displacement of 12 m. Its final speed is:",
  options: ["6 m/s", "6√2 m/s", "12 m/s", "3√2 m/s"],
  answer: 1,
  explanation: "Work done W = Fs = 6×12 = 72 J. By the work-energy theorem, 72 = 1/2(2)v² = v², so v = √72 = 6√2 m/s."
},

// Q62
{
  question: "A machine lifts a 200 kg load vertically through 5 m in 10 s. Taking g = 10 m/s², its useful output power is:",
  options: ["500 W", "1000 W", "2000 W", "5000 W"],
  answer: 1,
  explanation: "Work done = mgh = 200×10×5 = 10,000 J. Power = W/t = 10,000/10 = 1000 W."
},

// Q63
{
  question: "A spring of force constant 200 N/m is compressed by 0.10 m. The elastic potential energy stored in it is:",
  options: ["0.5 J", "1 J", "2 J", "10 J"],
  answer: 1,
  explanation: "Elastic potential energy U = 1/2 kx² = 1/2(200)(0.10)² = 1 J."
},

// Q64
{
  question: "A bullet of mass 0.02 kg moving at 300 m/s embeds itself in a stationary 1.98 kg wooden block. The common speed immediately after collision is:",
  options: ["1 m/s", "2 m/s", "3 m/s", "6 m/s"],
  answer: 2,
  explanation: "Conservation of momentum gives (0.02)(300) = (0.02 + 1.98)v. Thus 6 = 2v, so v = 3 m/s."
},

// Q65
{
  question: "A force of 10 N acts tangentially at the rim of a wheel of radius 0.40 m. The torque about the center of the wheel is:",
  options: ["2.5 N·m", "4 N·m", "10 N·m", "25 N·m"],
  answer: 1,
  explanation: "For a tangential force, τ = rF = 0.40×10 = 4 N·m."
},

// Q66
{
  question: "A solid cylinder and a hollow cylinder of the same mass and radius roll without slipping with the same linear speed. Which has the greater total kinetic energy?",
  options: ["Solid cylinder", "Hollow cylinder", "Both have equal total kinetic energy", "It depends only on their masses"],
  answer: 1,
  explanation: "K = 1/2Mv² + 1/2Iω². For equal M, R, and v, the hollow cylinder has the larger moment of inertia, so it has greater rotational and therefore greater total kinetic energy."
},

// Q67
{
  question: "A satellite moves in a circular orbit of radius r around Earth. If the orbital radius is increased to 4r, its orbital speed becomes:",
  options: ["v/2", "v/4", "2v", "4v"],
  answer: 0,
  explanation: "Orbital speed v = √(GM/r), so v ∝ 1/√r. Increasing r to 4r reduces the speed by √4 = 2, giving v/2."
},

// Q68
{
  question: "The escape speed from a planet is 10 km/s. If another planet has the same radius but four times the mass, its escape speed is:",
  options: ["5 km/s", "10 km/s", "20 km/s", "40 km/s"],
  answer: 2,
  explanation: "Escape speed v_e = √(2GM/R). With the same radius, v_e ∝ √M. Four times the mass gives twice the escape speed: 20 km/s."
},

// Q69
{
  question: "At what height h above Earth's surface will the gravitational acceleration be one-fourth of its value at the surface, assuming Earth has radius R?",
  options: ["h = R/2", "h = R", "h = 2R", "h = 3R"],
  answer: 1,
  explanation: "g_h/g = R²/(R+h)² = 1/4. Therefore R/(R+h) = 1/2, so R+h = 2R and h = R."
},

// Q70
{
  question: "A mass attached to a spring executes SHM with period T. If the mass is increased to four times its original value while the spring remains unchanged, the new period is:",
  options: ["T/2", "T", "2T", "4T"],
  answer: 2,
  explanation: "For a mass-spring system, T = 2π√(m/k). Replacing m by 4m multiplies the period by √4 = 2."
},

// Q71
{
  question: "A particle in SHM has amplitude A. At displacement x = A/2 from equilibrium, the ratio of its kinetic energy to potential energy is:",
  options: ["1:3", "3:1", "1:1", "4:1"],
  answer: 1,
  explanation: "Total energy E = 1/2kA² and potential energy U = 1/2kx² = E(x²/A²) = E/4. Thus K = E - U = 3E/4, so K:U = 3:1."
},

// Q72
{
  question: "A wave is represented by y = A sin(4πt - 2πx), where x is in metres and t in seconds. The speed of the wave is:",
  options: ["0.5 m/s", "1 m/s", "2 m/s", "4 m/s"],
  answer: 2,
  explanation: "Comparing with y = A sin(ωt - kx), ω = 4π rad/s and k = 2π rad/m. Wave speed v = ω/k = 2 m/s."
},

// Q73
{
  question: "A string fixed at both ends has length 1.2 m. If wave speed on the string is 240 m/s, the frequency of its third harmonic is:",
  options: ["100 Hz", "200 Hz", "300 Hz", "600 Hz"],
  answer: 2,
  explanation: "The fundamental frequency is f₁ = v/(2L) = 240/(2.4) = 100 Hz. The third harmonic is f₃ = 3f₁ = 300 Hz."
},

// Q74
{
  question: "In a stationary medium, a stationary observer detects a frequency higher than the emitted frequency when:",
  options: ["The source moves toward the observer", "The source moves away from the observer", "Both source and observer are stationary", "The speed of sound decreases while both remain stationary"],
  answer: 0,
  explanation: "When the source approaches a stationary observer, successive wavefronts are compressed, decreasing wavelength and increasing the observed frequency."
},

// Q75
{
  question: "Water flows through a horizontal pipe. At one point its speed is 2 m/s and pressure is P. At a narrower point its speed is 4 m/s. Ignoring viscosity, the pressure at the narrower point is:",
  options: ["Greater than P", "Equal to P", "Less than P", "Zero"],
  answer: 2,
  explanation: "For horizontal flow, Bernoulli's equation gives P + 1/2ρv² = constant. Since the speed is greater at the narrower point, its pressure must be lower."
},

// Q76
{
  question: "A hydraulic press has input piston area 5 cm² and output piston area 200 cm². If a force of 50 N is applied to the input piston, the ideal output force is:",
  options: ["500 N", "1000 N", "2000 N", "4000 N"],
  answer: 2,
  explanation: "By Pascal's principle, F₁/A₁ = F₂/A₂. Thus F₂ = 50×(200/5) = 2000 N."
},

// Q77
{
  question: "A metal rod of length 2.0 m has coefficient of linear expansion 2 × 10⁻⁵ K⁻¹. If its temperature rises by 50 K, its increase in length is:",
  options: ["0.2 mm", "1 mm", "2 mm", "20 mm"],
  answer: 2,
  explanation: "ΔL = αLΔT = (2×10⁻⁵)(2)(50) = 2×10⁻³ m = 2 mm."
},

// Q78
{
  question: "An ideal gas expands isothermally from volume V to 2V. Which statement is correct?",
  options: ["Its internal energy increases", "Its internal energy decreases", "Its temperature increases", "Its internal energy remains unchanged"],
  answer: 3,
  explanation: "For an ideal gas, internal energy depends only on temperature. During an isothermal process the temperature is constant, so ΔU = 0."
},

// Q79
{
  question: "A gas absorbs 500 J of heat and does 200 J of work on its surroundings. The change in its internal energy is:",
  options: ["+300 J", "+700 J", "-300 J", "-700 J"],
  answer: 0,
  explanation: "Using the first law ΔU = Q - W, where W is work done by the gas: ΔU = 500 - 200 = +300 J."
},

// Q80
{
  question: "Two identical conducting spheres carry charges +6 μC and -2 μC. They are touched together and then separated. The charge on each sphere becomes:",
  options: ["+1 μC", "+2 μC", "+4 μC", "-2 μC"],
  answer: 1,
  explanation: "Total charge is +6 - 2 = +4 μC. Identical conducting spheres share the total charge equally, so each receives +2 μC."
},

// Q81
{
  question: "Two point charges are separated by distance r and exert force F on each other. If each charge is doubled and their separation is tripled, the new force is:",
  options: ["4F/3", "4F/9", "2F/9", "9F/4"],
  answer: 1,
  explanation: "Coulomb's law gives F ∝ q₁q₂/r². Doubling both charges multiplies the numerator by 4, while tripling the distance multiplies the denominator by 9. Therefore F' = 4F/9."
},

// Q82
{
  question: "A parallel-plate capacitor of capacitance 6 μF is connected to a 12 V battery. The charge stored on either plate is:",
  options: ["0.5 μC", "18 μC", "72 μC", "144 μC"],
  answer: 2,
  explanation: "Using Q = CV, Q = (6 μF)(12 V) = 72 μC."
},

// Q83
{
  question: "Two capacitors of 6 μF and 3 μF are connected in series. Their equivalent capacitance is:",
  options: ["2 μF", "3 μF", "4.5 μF", "9 μF"],
  answer: 0,
  explanation: "For capacitors in series, 1/Ceq = 1/6 + 1/3 = 3/6 = 1/2, so Ceq = 2 μF."
},

// Q84
{
  question: "A 4 μF capacitor is charged to a potential difference of 100 V. The energy stored in it is:",
  options: ["0.002 J", "0.02 J", "0.04 J", "0.20 J"],
  answer: 1,
  explanation: "U = 1/2 CV² = 1/2(4 × 10⁻⁶)(100)² = 0.02 J."
},

// Q85
{
  question: "An electron moves from a point at electric potential 20 V to a point at 50 V. The change in its electric potential energy is:",
  options: ["-30 eV", "+30 eV", "-70 eV", "+70 eV"],
  answer: 0,
  explanation: "ΔU = qΔV. For an electron q = -e and ΔV = 50 - 20 = 30 V, so ΔU = -30 eV."
},

// Q86
{
  question: "A wire carries a current of 2 A for 5 minutes. The total charge passing through a cross-section of the wire is:",
  options: ["10 C", "150 C", "300 C", "600 C"],
  answer: 3,
  explanation: "Q = It. Here t = 5 min = 300 s, so Q = 2 × 300 = 600 C."
},

// Q87
{
  question: "A 12 V battery is connected across a 4 Ω resistor. How much electrical energy is converted into heat in 10 s?",
  options: ["120 J", "240 J", "360 J", "480 J"],
  answer: 2,
  explanation: "Power P = V²/R = 12²/4 = 36 W. Energy E = Pt = 36 × 10 = 360 J."
},

// Q88
{
  question: "Two resistors 4 Ω and 12 Ω are connected in parallel across a 12 V supply. The total current drawn from the supply is:",
  options: ["1 A", "2 A", "4 A", "6 A"],
  answer: 2,
  explanation: "1/Req = 1/4 + 1/12 = 1/3, so Req = 3 Ω. Total current I = V/Req = 12/3 = 4 A."
},

// Q89
{
  question: "A cell of emf 12 V and internal resistance 1 Ω is connected to an external resistance of 5 Ω. The terminal potential difference of the cell is:",
  options: ["2 V", "10 V", "12 V", "14 V"],
  answer: 1,
  explanation: "Current I = E/(R+r) = 12/(5+1) = 2 A. Terminal voltage V = IR = 2×5 = 10 V."
},

// Q90
{
  question: "A copper wire has resistance R. Another copper wire has twice the length and twice the radius. Its resistance is:",
  options: ["R/2", "R", "2R", "4R"],
  answer: 0,
  explanation: "R = ρL/A. Doubling the length multiplies resistance by 2, while doubling radius makes area four times larger. Thus R' = 2R/4 = R/2."
},

// Q91
{
  question: "A proton enters a uniform magnetic field perpendicular to the field with speed v. If its speed is doubled while the field remains unchanged, the radius of its circular path becomes:",
  options: ["r/2", "r", "2r", "4r"],
  answer: 2,
  explanation: "For perpendicular motion in a magnetic field, r = mv/(qB). Therefore r is directly proportional to v, so doubling v doubles the radius."
},

// Q92
{
  question: "A charged particle moves parallel to a uniform magnetic field. The magnetic force on the particle is:",
  options: ["qvB", "qvB/2", "Maximum", "Zero"],
  answer: 3,
  explanation: "Magnetic force F = qvB sinθ. For motion parallel to the field, θ = 0° and sin0° = 0, so F = 0."
},

// Q93
{
  question: "A straight wire of length 0.50 m carries a current of 4 A perpendicular to a uniform magnetic field of 0.20 T. The magnetic force on the wire is:",
  options: ["0.04 N", "0.20 N", "0.40 N", "4.0 N"],
  answer: 2,
  explanation: "F = BIL sinθ. With θ = 90°, F = (0.20)(4)(0.50) = 0.40 N."
},

// Q94
{
  question: "A rectangular coil has 20 turns, area 0.010 m², and carries a current of 2 A in a uniform magnetic field of 0.50 T. Its maximum torque is:",
  options: ["0.10 N·m", "0.20 N·m", "0.40 N·m", "2.0 N·m"],
  answer: 1,
  explanation: "Maximum torque τmax = NIAB = (20)(2)(0.010)(0.50) = 0.20 N·m."
},

// Q95
{
  question: "The magnetic flux through a single loop changes uniformly from 0.80 Wb to 0.20 Wb in 0.10 s. The magnitude of the average induced emf is:",
  options: ["0.6 V", "2 V", "6 V", "10 V"],
  answer: 2,
  explanation: "By Faraday's law, |ε| = |ΔΦ|/Δt = |0.20 - 0.80|/0.10 = 0.60/0.10 = 6 V."
},

// Q96
{
  question: "According to Lenz's law, the direction of an induced current is such that its magnetic effect:",
  options: ["Opposes the change in magnetic flux that produces it", "Always increases the external magnetic field", "Is always parallel to the conductor", "Is independent of the change in magnetic flux"],
  answer: 0,
  explanation: "Lenz's law states that the induced current produces a magnetic effect that opposes the change in magnetic flux responsible for the induction."
},

// Q97
{
  question: "An ideal transformer has 500 turns in its primary coil and 100 turns in its secondary coil. If the primary voltage is 220 V, the secondary voltage is:",
  options: ["22 V", "44 V", "110 V", "1100 V"],
  answer: 1,
  explanation: "For an ideal transformer, Vs/Vp = Ns/Np. Thus Vs = 220(100/500) = 44 V."
},

// Q98
{
  question: "An ideal transformer steps the voltage down from 240 V to 60 V. If the secondary current is 4 A, the primary current is:",
  options: ["0.5 A", "1 A", "4 A", "16 A"],
  answer: 1,
  explanation: "For an ideal transformer, VpIp = VsIs. Thus Ip = (60×4)/240 = 1 A."
},

// Q99
{
  question: "In a purely inductive AC circuit, the current:",
  options: ["Leads the voltage by 90°", "Is in phase with the voltage", "Lags the voltage by 90°", "Lags the voltage by 180°"],
  answer: 2,
  explanation: "In an ideal purely inductive AC circuit, current lags the applied voltage by 90°."
},

// Q100
{
  question: "The inductive reactance of an inductor is 40 Ω at frequency f. At frequency 3f, its inductive reactance becomes:",
  options: ["40/3 Ω", "40 Ω", "80 Ω", "120 Ω"],
  answer: 3,
  explanation: "Inductive reactance XL = 2πfL, so XL is directly proportional to frequency. Tripling f gives XL = 3×40 = 120 Ω."
},

// Q101
{
  question: "A series RLC circuit is at resonance. Which statement is correct?",
  options: ["XL = XC", "XL = 0", "XC = 0", "The impedance is infinite"],
  answer: 0,
  explanation: "At series resonance, inductive and capacitive reactances are equal: XL = XC. They cancel, leaving the impedance equal to the resistance."
},

// Q102
{
  question: "A concave mirror has focal length 20 cm. An object is placed 60 cm in front of it. The magnitude of the image distance is:",
  options: ["15 cm", "20 cm", "30 cm", "60 cm"],
  answer: 2,
  explanation: "Using magnitudes for a real object and real image, 1/f = 1/u + 1/v. Thus 1/20 = 1/60 + 1/v, so 1/v = 2/60 = 1/30 and v = 30 cm."
},

// Q103
{
  question: "A convex lens of focal length 10 cm forms a real image of an object placed 15 cm from the lens. The image distance is:",
  options: ["6 cm", "20 cm", "30 cm", "60 cm"],
  answer: 2,
  explanation: "Using 1/f = 1/u + 1/v for magnitudes, 1/10 = 1/15 + 1/v. Therefore 1/v = 1/30, giving v = 30 cm."
},

// Q104
{
  question: "The power of a converging lens of focal length 25 cm is:",
  options: ["+2 D", "+4 D", "-2 D", "-4 D"],
  answer: 1,
  explanation: "Power P = 1/f with f in metres. Here f = +0.25 m, so P = 1/0.25 = +4 D."
},

// Q105
{
  question: "A ray of light travels from air into glass of refractive index √2 at an angle of incidence 45°. The angle of refraction is:",
  options: ["30°", "45°", "60°", "90°"],
  answer: 0,
  explanation: "By Snell's law, n1 sin i = n2 sin r. Thus sin45° = √2 sin r, so sin r = (√2/2)/√2 = 1/2 and r = 30°."
},

// Q106
{
  question: "In Young's double-slit experiment, the wavelength is 600 nm, slit separation is 0.50 mm, and screen distance is 2.0 m. The fringe width is:",
  options: ["0.24 mm", "1.2 mm", "2.4 mm", "4.8 mm"],
  answer: 2,
  explanation: "β = λD/d = (600×10⁻⁹×2)/(0.50×10⁻³) = 2.4×10⁻³ m = 2.4 mm."
},

// Q107
{
  question: "Two coherent waves of equal amplitude arrive at a point with a phase difference of 180°. The resultant amplitude at that point is:",
  options: ["Zero", "Equal to one wave's amplitude", "√2 times one wave's amplitude", "Twice one wave's amplitude"],
  answer: 0,
  explanation: "Equal-amplitude waves differing in phase by 180° undergo complete destructive interference, so their resultant amplitude is zero."
},

// Q108
{
  question: "A diffraction grating has 5000 lines per centimetre. The spacing between adjacent lines is:",
  options: ["2 × 10⁻⁷ m", "2 × 10⁻⁶ m", "5 × 10⁻⁶ m", "5 × 10⁻⁵ m"],
  answer: 1,
  explanation: "5000 lines/cm corresponds to 500,000 lines/m. The grating spacing is d = 1/N = 1/(5×10⁵) = 2×10⁻⁶ m."
},

// Q109
{
  question: "Light of photon energy 5 eV falls on a metal whose work function is 2 eV. The maximum kinetic energy of the emitted photoelectrons is:",
  options: ["2 eV", "3 eV", "5 eV", "7 eV"],
  answer: 1,
  explanation: "Einstein's photoelectric equation gives Kmax = EPhoton - φ = 5 - 2 = 3 eV."
},

// Q110
{
  question: "If the momentum of a non-relativistic particle is doubled, its de Broglie wavelength becomes:",
  options: ["Twice as large", "Four times as large", "Half as large", "One-fourth as large"],
  answer: 2,
  explanation: "The de Broglie relation is λ = h/p. Therefore, doubling momentum reduces the wavelength to half its original value."
},

// Q111
{
  question: "An electron in a hydrogen atom falls from the n = 4 energy level to the n = 2 level. Compared with a transition from n = 3 to n = 2, the emitted photon has:",
  options: ["Greater energy", "Smaller energy", "The same energy", "Zero energy"],
  answer: 0,
  explanation: "Hydrogen energy levels are En = -13.6/n² eV. The energy difference between n = 4 and n = 2 is greater than that between n = 3 and n = 2, so the 4→2 photon has greater energy."
},

// Q112
{
  question: "A radioactive sample initially contains 8000 undecayed nuclei. After two half-lives, the number of undecayed nuclei is:",
  options: ["1000", "2000", "4000", "6000"],
  answer: 1,
  explanation: "After each half-life the number halves. After two half-lives, N = 8000(1/2)² = 2000."
},

// Q113
{
  question: "A radioactive isotope has decay constant λ. Its mean lifetime is:",
  options: ["λ", "1/λ", "ln2/λ", "λ/ln2"],
  answer: 1,
  explanation: "For radioactive decay, the mean lifetime τ is the reciprocal of the decay constant: τ = 1/λ."
},

// Q114
{
  question: "A radioactive isotope has a half-life of 6 hours. What percentage of the original sample remains undecayed after 18 hours?",
  options: ["6.25%", "12.5%", "25%", "37.5%"],
  answer: 1,
  explanation: "18 hours corresponds to 3 half-lives. The remaining fraction is (1/2)^3 = 1/8 = 12.5%."
},

// Q115
{
  question: "The activity of a radioactive sample is 1600 Bq initially. After three half-lives, its activity is:",
  options: ["100 Bq", "200 Bq", "400 Bq", "800 Bq"],
  answer: 1,
  explanation: "Activity decreases by half during each half-life. After three half-lives, A = 1600(1/2)^3 = 200 Bq."
},

// Q116
{
  question: "Which nuclear process is primarily responsible for the energy released by the Sun?",
  options: ["Fission of uranium", "Fusion of light nuclei", "Alpha decay", "Beta decay"],
  answer: 1,
  explanation: "The Sun releases energy mainly through nuclear fusion, in which hydrogen nuclei ultimately combine to form helium with a corresponding mass-energy release."
},

// Q117
{
  question: "A nucleus has a mass defect of 0.020 u. Using 1 u = 931.5 MeV/c², its binding energy is approximately:",
  options: ["9.32 MeV", "18.63 MeV", "46.58 MeV", "93.15 MeV"],
  answer: 1,
  explanation: "Binding energy = Δmc² = (0.020 u)(931.5 MeV/u) = 18.63 MeV."
},

// Q118
{
  question: "An alpha particle consists of:",
  options: ["Two protons and two neutrons", "One proton and one neutron", "Two electrons and two protons", "Four neutrons"],
  answer: 0,
  explanation: "An alpha particle is a helium-4 nucleus containing two protons and two neutrons."
},

// Q119
{
  question: "During beta-minus decay of a nucleus, its atomic number:",
  options: ["Decreases by 2", "Decreases by 1", "Remains unchanged", "Increases by 1"],
  answer: 3,
  explanation: "In beta-minus decay, a neutron transforms into a proton while emitting an electron and an antineutrino. Therefore, the atomic number increases by 1 while the mass number remains unchanged."
},

// Q120
{
  question: "A semiconductor diode conducts strongly when:",
  options: ["It is reverse biased below breakdown", "It is forward biased sufficiently", "No potential difference is applied", "Its p-side and n-side are at exactly the same potential"],
  answer: 1,
  explanation: "Forward bias lowers the junction potential barrier and narrows the depletion region, allowing substantial current to flow."
},

// Q121
{
  question: "In an n-type semiconductor, the majority charge carriers are:",
  options: ["Electrons", "Holes", "Protons", "Neutrons"],
  answer: 0,
  explanation: "Donor impurities provide additional free electrons, making electrons the majority carriers in an n-type semiconductor."
},

// Q122
{
  question: "A pure semiconductor is converted into a p-type semiconductor by adding an impurity that primarily creates:",
  options: ["Extra neutrons", "Free protons", "Holes", "Photons"],
  answer: 2,
  explanation: "Trivalent acceptor impurities create vacancies called holes, which become the majority charge carriers in a p-type semiconductor."
},

// Q123
{
  question: "For a transistor, the emitter current IE, base current IB and collector current IC satisfy:",
  options: ["IE = IC - IB", "IC = IE + IB", "IB = IE + IC", "IE = IC + IB"],
  answer: 3,
  explanation: "By charge conservation at the transistor junctions, the emitter current is the sum of collector and base currents: IE = IC + IB."
},

// Q124
{
  question: "A transistor has collector current 4.95 mA and base current 0.05 mA. Its emitter current is:",
  options: ["4.90 mA", "5.00 mA", "5.05 mA", "99.0 mA"],
  answer: 1,
  explanation: "IE = IC + IB = 4.95 mA + 0.05 mA = 5.00 mA."
},

// Q125
{
  question: "A transistor has collector current 6 mA and base current 0.04 mA. Its current gain β is:",
  options: ["24", "60", "150", "240"],
  answer: 2,
  explanation: "For a common-emitter transistor, β = IC/IB = 6/0.04 = 150."
},

// Q126
{
  question: "Which logic gate produces output 0 only when all of its inputs are 1?",
  options: ["NAND", "NOR", "XOR", "OR"],
  answer: 0,
  explanation: "A NAND gate is the complement of an AND gate. It produces 0 only when all inputs are 1."
},

// Q127
{
  question: "The output of an XOR gate with inputs A = 1 and B = 0 is:",
  options: ["0", "1", "Undefined", "Depends on frequency"],
  answer: 1,
  explanation: "An XOR gate outputs 1 when its two binary inputs are different. Since 1 and 0 differ, the output is 1."
},

// Q128
{
  question: "A body moving at 10 m/s accelerates uniformly at 2 m/s² for 5 s. Its displacement during this interval is:",
  options: ["50 m", "60 m", "75 m", "100 m"],
  answer: 2,
  explanation: "Using s = ut + (1/2)at²: s = (10)(5) + (1/2)(2)(25) = 50 + 25 = 75 m."
},

// Q129
{
  question: "A particle has initial velocity 5 m/s and constant acceleration -2 m/s². How long does it take to reach a velocity of -5 m/s?",
  options: ["2.5 s", "5 s", "7.5 s", "10 s"],
  answer: 1,
  explanation: "Using v = u + at: -5 = 5 - 2t. Thus -10 = -2t and t = 5 s."
},

// Q130
{
  question: "A ball is thrown vertically upward with speed 30 m/s. Taking g = 10 m/s², the maximum height reached above the point of projection is:",
  options: ["30 m", "45 m", "60 m", "90 m"],
  answer: 1,
  explanation: "At maximum height v = 0. Using v² = u² - 2gh gives 0 = 900 - 20h, so h = 45 m."
},

// Q131
{
  question: "A projectile is fired horizontally from a cliff 45 m high with speed 20 m/s. Taking g = 10 m/s², how far horizontally does it travel before hitting the ground?",
  options: ["40 m", "50 m", "60 m", "90 m"],
  answer: 2,
  explanation: "Vertical motion gives 45 = (1/2)(10)t², so t² = 9 and t = 3 s. Horizontal distance = vt = 20×3 = 60 m."
},

// Q132
{
  question: "A lift accelerates upward at 2 m/s². A passenger of mass 60 kg stands on a scale inside it. Taking g = 10 m/s², the scale reading is:",
  options: ["480 N", "600 N", "720 N", "840 N"],
  answer: 2,
  explanation: "For upward acceleration, N - mg = ma. Thus N = m(g+a) = 60(10+2) = 720 N."
},

// Q133
{
  question: "A lift moves downward with constant velocity. The apparent weight of a passenger of mass m is:",
  options: ["Zero", "mg/2", "mg", "2mg"],
  answer: 2,
  explanation: "Constant velocity means acceleration is zero. Therefore the net force is zero and the normal reaction equals the weight: N = mg."
},

// Q134
{
  question: "A 10 kg block lies on a horizontal surface with coefficient of static friction 0.4. Taking g = 10 m/s², the maximum static friction is:",
  options: ["20 N", "40 N", "80 N", "100 N"],
  answer: 1,
  explanation: "Maximum static friction is fs,max = μsN = μsmg = 0.4×10×10 = 40 N."
},

// Q135
{
  question: "A 4 kg object moving at 5 m/s has the same kinetic energy as an object of mass 1 kg moving at speed v. The value of v is:",
  options: ["5 m/s", "10 m/s", "15 m/s", "20 m/s"],
  answer: 1,
  explanation: "Equating kinetic energies: (1/2)(4)(5²) = (1/2)(1)v². Therefore 4×25 = v², so v² = 100 and v = 10 m/s."
},

// Q136
{
  question: "A constant force of 20 N acts on an object through a displacement of 5 m at an angle of 60° to the displacement. The work done is:",
  options: ["25 J", "50 J", "100 J", "200 J"],
  answer: 1,
  explanation: "W = Fs cosθ = (20)(5)cos60° = 100×0.5 = 50 J."
},

// Q137
{
  question: "A motor delivers 6000 J of useful mechanical energy while consuming 7500 J of electrical energy. Its efficiency is:",
  options: ["60%", "75%", "80%", "125%"],
  answer: 2,
  explanation: "Efficiency = useful output/input × 100% = 6000/7500 × 100% = 80%."
},

// Q138
{
  question: "A body moves in a circle of radius 2 m with constant speed 6 m/s. Its centripetal acceleration is:",
  options: ["3 m/s²", "12 m/s²", "18 m/s²", "36 m/s²"],
  answer: 2,
  explanation: "Centripetal acceleration ac = v²/r = 36/2 = 18 m/s²."
},

// Q139
{
  question: "A wheel rotates at 120 revolutions per minute. Its angular speed is:",
  options: ["2π rad/s", "4π rad/s", "8π rad/s", "120π rad/s"],
  answer: 1,
  explanation: "120 rpm = 2 revolutions per second. Angular speed ω = 2πf = 2π(2) = 4π rad/s."
},

// Q140
{
  question: "A wheel initially at rest has constant angular acceleration 3 rad/s². Its angular speed after 4 s is:",
  options: ["7 rad/s", "12 rad/s", "16 rad/s", "24 rad/s"],
  answer: 1,
  explanation: "Using ω = ω0 + αt with ω0 = 0: ω = 3×4 = 12 rad/s."
},

// Q141
{
  question: "A particle moves in a circle with constant angular speed. Which quantity remains constant?",
  options: ["Velocity vector", "Centripetal acceleration vector", "Linear momentum vector", "Kinetic energy"],
  answer: 3,
  explanation: "The speed remains constant, so kinetic energy remains constant. Velocity, momentum, and centripetal acceleration vectors continuously change direction."
},

// Q142
{
  question: "A uniform rod of length L and mass M rotates about an axis through its center and perpendicular to the rod. Its moment of inertia is:",
  options: ["ML²/3", "ML²/12", "ML²/2", "ML²"],
  answer: 1,
  explanation: "The standard moment of inertia of a uniform thin rod about an axis through its center perpendicular to its length is I = ML²/12."
},

// Q143
{
  question: "If the net external torque on a system is zero, which quantity is conserved?",
  options: ["Linear speed", "Angular momentum", "Angular velocity", "Moment of inertia"],
  answer: 1,
  explanation: "The rotational equation τext = dL/dt shows that if net external torque is zero, angular momentum L remains constant."
},

// Q144
{
  question: "A skater spinning with arms extended pulls the arms inward. Neglecting external torque, the skater's angular speed:",
  options: ["Decreases", "Remains constant", "Increases", "Becomes zero"],
  answer: 2,
  explanation: "Angular momentum L = Iω is conserved. Pulling the arms inward decreases moment of inertia I, so angular speed ω increases."
},

// Q145
{
  question: "The gravitational force between two masses is F. If one mass is tripled, the other is doubled, and their separation is doubled, the new gravitational force is:",
  options: ["3F/2", "2F", "3F", "6F"],
  answer: 0,
  explanation: "F ∝ m1m2/r². The masses give a factor of 3×2 = 6, while doubling distance gives a factor of 4 in the denominator. Thus F' = (6/4)F = 3F/2."
},

// Q146
{
  question: "A satellite has orbital period T at orbital radius r. If its orbital radius is increased to 9r, its new orbital period is:",
  options: ["3T", "9T", "27T", "81T"],
  answer: 2,
  explanation: "From Kepler's third law, T² ∝ r³, so T ∝ r^(3/2). Therefore T' = T(9)^(3/2) = 27T."
},

// Q147
{
  question: "At a depth d below Earth's surface, assuming Earth has uniform density and radius R, the acceleration due to gravity is:",
  options: ["g(1 - d/R)", "g(1 + d/R)", "gR/(R+d)", "gR²/(R-d)²"],
  answer: 0,
  explanation: "For a uniform Earth, gravitational acceleration inside varies linearly with distance from the center. At depth d, g_d = g(R-d)/R = g(1-d/R)."
},

// Q148
{
  question: "A planet has twice Earth's mass and twice Earth's radius. The acceleration due to gravity at its surface, in terms of Earth's surface gravity g, is:",
  options: ["g/4", "g/2", "g", "2g"],
  answer: 1,
  explanation: "Surface gravity is g = GM/R². Thus g' = G(2M)/(2R)² = 2GM/(4R²) = g/2."
},

// Q149
{
  question: "The gravitational potential at a distance r from the center of an isolated spherical mass M, outside the mass, is:",
  options: ["GM/r", "-GM/r", "-GM/r²", "GM/r²"],
  answer: 1,
  explanation: "Taking gravitational potential to be zero at infinity, the potential outside a spherical mass is V = -GM/r."
},

// Q150
{
  question: "A satellite in a circular orbit has kinetic energy K. Its gravitational potential energy is:",
  options: ["-K", "-2K", "2K", "-K/2"],
  answer: 1,
  explanation: "For a circular gravitational orbit, K = GMm/(2r) while U = -GMm/r. Therefore U = -2K."
},

// Q151
{
  question: "The total mechanical energy of a satellite of mass m in a circular orbit of radius r around a planet of mass M is:",
  options: ["-GMm/(2r)", "-GMm/r", "GMm/(2r)", "Zero"],
  answer: 0,
  explanation: "For a circular orbit, E = K + U = GMm/(2r) - GMm/r = -GMm/(2r)."
},

// Q152
{
  question: "The pressure due to a liquid column of density 800 kg/m³ and depth 5 m is, taking g = 10 m/s²:",
  options: ["4.0 × 10³ Pa", "8.0 × 10³ Pa", "4.0 × 10⁴ Pa", "8.0 × 10⁴ Pa"],
  answer: 2,
  explanation: "Hydrostatic pressure p = ρgh = 800×10×5 = 40,000 Pa = 4.0×10⁴ Pa."
},

// Q153
{
  question: "An object of volume 0.020 m³ is completely submerged in water of density 1000 kg/m³. Taking g = 10 m/s², the buoyant force is:",
  options: ["20 N", "100 N", "200 N", "2000 N"],
  answer: 2,
  explanation: "By Archimedes' principle, F_B = ρVg = 1000×0.020×10 = 200 N."
},

// Q154
{
  question: "A body floats in a liquid with 75% of its volume submerged. The ratio of the density of the body to the density of the liquid is:",
  options: ["1/4", "1/2", "3/4", "4/3"],
  answer: 2,
  explanation: "For a floating body, ρ_body Vg = ρ_liquid V_sub g. Thus ρ_body/ρ_liquid = V_sub/V = 0.75 = 3/4."
},

// Q155
{
  question: "For a small sphere moving slowly through a viscous fluid, Stokes' law states that the viscous drag force is proportional to:",
  options: ["rv", "r²v", "rv²", "r²v²"],
  answer: 0,
  explanation: "Stokes' law is F = 6πηrv, so the viscous drag is directly proportional to the sphere's radius r and speed v."
},

// Q156
{
  question: "A wire of original length 2.0 m extends by 1.0 mm under tension. The longitudinal strain is:",
  options: ["2 × 10⁻⁴", "5 × 10⁻⁴", "1 × 10⁻³", "2 × 10⁻³"],
  answer: 1,
  explanation: "Strain = ΔL/L = (1.0×10⁻³)/2.0 = 5×10⁻⁴."
},

// Q157
{
  question: "A wire of cross-sectional area 2 × 10⁻⁶ m² is pulled by a force of 100 N. The tensile stress in the wire is:",
  options: ["2 × 10⁵ Pa", "5 × 10⁵ Pa", "2 × 10⁷ Pa", "5 × 10⁷ Pa"],
  answer: 3,
  explanation: "Stress = F/A = 100/(2×10⁻⁶) = 5×10⁷ Pa."
},

// Q158
{
  question: "A material experiences stress 2 × 10⁸ Pa and strain 1 × 10⁻³ within its elastic limit. Its Young's modulus is:",
  options: ["2 × 10⁵ Pa", "2 × 10⁸ Pa", "2 × 10¹¹ Pa", "2 × 10¹³ Pa"],
  answer: 2,
  explanation: "Young's modulus Y = stress/strain = (2×10⁸)/(1×10⁻³) = 2×10¹¹ Pa."
},

// Q159
{
  question: "A particle performs SHM according to x = 0.05 cos(4πt), with SI units. Its frequency is:",
  options: ["1 Hz", "2 Hz", "4 Hz", "8 Hz"],
  answer: 1,
  explanation: "Comparing with x = A cos(ωt), ω = 4π rad/s. Since f = ω/(2π), f = 2 Hz."
},

// Q160
{
  question: "A particle executes SHM with amplitude 0.20 m and angular frequency 5 rad/s. Its maximum speed is:",
  options: ["0.04 m/s", "0.25 m/s", "1.0 m/s", "5.0 m/s"],
  answer: 2,
  explanation: "Maximum SHM speed is vmax = Aω = 0.20×5 = 1.0 m/s."
},

// Q161
{
  question: "In SHM, when a particle passes through its equilibrium position:",
  options: ["Its speed and acceleration are both maximum", "Its speed is maximum and acceleration is zero", "Its speed is zero and acceleration is maximum", "Both speed and acceleration are zero"],
  answer: 1,
  explanation: "At equilibrium x = 0, so a = -ω²x = 0. The kinetic energy and speed are maximum there."
},

// Q162
{
  question: "Two tuning forks of frequencies 256 Hz and 260 Hz are sounded together. The beat frequency is:",
  options: ["2 Hz", "4 Hz", "8 Hz", "516 Hz"],
  answer: 1,
  explanation: "Beat frequency equals the absolute difference between the frequencies: |260 - 256| = 4 Hz."
},

// Q163
{
  question: "A sound wave has frequency 500 Hz and travels at 340 m/s. Its wavelength is:",
  options: ["0.34 m", "0.68 m", "1.47 m", "170 m"],
  answer: 1,
  explanation: "Using v = fλ, λ = v/f = 340/500 = 0.68 m."
},

// Q164
{
  question: "If the intensity of a wave is increased to four times its original value, its amplitude becomes:",
  options: ["Twice the original", "Four times the original", "Half the original", "One-fourth the original"],
  answer: 0,
  explanation: "Wave intensity is proportional to the square of amplitude, I ∝ A². Therefore multiplying intensity by 4 multiplies amplitude by √4 = 2."
},

// Q165
{
  question: "A pipe open at both ends has length 0.85 m. If the speed of sound is 340 m/s, its fundamental frequency is:",
  options: ["100 Hz", "200 Hz", "400 Hz", "800 Hz"],
  answer: 1,
  explanation: "For an open pipe, f₁ = v/(2L) = 340/(2×0.85) = 200 Hz."
},

// Q166
{
  question: "A pipe closed at one end has length 0.85 m. If the speed of sound is 340 m/s, its fundamental frequency is:",
  options: ["50 Hz", "100 Hz", "200 Hz", "400 Hz"],
  answer: 1,
  explanation: "For a pipe closed at one end, f₁ = v/(4L) = 340/(4×0.85) = 100 Hz."
},

// Q167
{
  question: "Resonance occurs when the frequency of an external periodic force is:",
  options: ["Zero", "Much smaller than the natural frequency", "Equal or very close to the natural frequency", "Always twice the natural frequency"],
  answer: 2,
  explanation: "Resonance occurs when the driving frequency matches or is very close to the natural frequency, producing a large response amplitude."
},

// Q168
{
  question: "How much heat is required to raise the temperature of 2 kg of a substance by 5 K if its specific heat capacity is 400 J kg⁻¹ K⁻¹?",
  options: ["400 J", "1000 J", "2000 J", "4000 J"],
  answer: 3,
  explanation: "Q = mcΔT = 2×400×5 = 4000 J."
},

// Q169
{
  question: "A 0.50 kg metal block of specific heat capacity 400 J kg⁻¹ K⁻¹ cools by 20 K. The magnitude of heat released is:",
  options: ["1000 J", "2000 J", "4000 J", "8000 J"],
  answer: 2,
  explanation: "Q = mcΔT = 0.50×400×20 = 4000 J."
},

// Q170
{
  question: "For a fixed amount of ideal gas at constant pressure, its absolute temperature is doubled. Its volume becomes:",
  options: ["Half", "Unchanged", "Twice", "Four times"],
  answer: 2,
  explanation: "At constant pressure, Charles's law gives V ∝ T when temperature is measured in kelvin. Doubling T therefore doubles V."
},

// Q171
{
  question: "An ideal gas undergoes an isochoric process. The work done by the gas is:",
  options: ["Positive", "Negative", "Zero", "Equal to its internal energy"],
  answer: 2,
  explanation: "For constant volume, dV = 0. Since work W = ∫P dV, the work done is zero."
},

// Q172
{
  question: "During an adiabatic expansion of an ideal gas, the gas does positive work. Its internal energy therefore:",
  options: ["Increases", "Decreases", "Remains constant", "Must become zero"],
  answer: 1,
  explanation: "For an adiabatic process Q = 0. From ΔU = Q - W, positive work done by the gas gives ΔU = -W, so internal energy decreases."
},

// Q173
{
  question: "One mole of an ideal gas is heated at constant volume through a temperature increase ΔT. If its molar heat capacity at constant volume is Cv, the heat supplied is:",
  options: ["CvΔT", "RΔT", "(Cv + R)ΔT", "Cv/ΔT"],
  answer: 0,
  explanation: "At constant volume, Q = nCvΔT. For one mole, n = 1, so Q = CvΔT."
},

// Q174
{
  question: "A positive test charge is released from rest in an electric field. Neglecting other forces, it initially accelerates:",
  options: ["Opposite to the electric field", "Perpendicular to the electric field", "Along the electric field", "Along an equipotential surface"],
  answer: 2,
  explanation: "The electric field direction is defined as the direction of force on a positive test charge. Since F = qE for q > 0, its acceleration is along the field."
},

// Q175
{
  question: "The electric field magnitude at a distance r from an isolated point charge is E. At distance 2r from the same charge, the field magnitude is:",
  options: ["E/4", "E/2", "2E", "4E"],
  answer: 0,
  explanation: "For a point charge, E = kQ/r². Doubling the distance makes the field E' = E/4."
},

// Q176
{
  question: "A 2 μF capacitor and a 4 μF capacitor are connected in parallel. Their equivalent capacitance is:",
  options: ["4/3 μF", "2 μF", "4 μF", "6 μF"],
  answer: 3,
  explanation: "Capacitances in parallel add directly: Ceq = 2 + 4 = 6 μF."
},

// Q177
{
  question: "A resistor dissipates 18 W when a current of 3 A passes through it. Its resistance is:",
  options: ["1 Ω", "2 Ω", "3 Ω", "6 Ω"],
  answer: 1,
  explanation: "Using P = I²R, R = P/I² = 18/9 = 2 Ω."
},

// Q178
{
  question: "A 6 Ω resistor and a 3 Ω resistor are connected in series across an 18 V supply. The current through the 3 Ω resistor is:",
  options: ["1 A", "2 A", "3 A", "6 A"],
  answer: 1,
  explanation: "The total resistance is 6 + 3 = 9 Ω. The series current is I = V/R = 18/9 = 2 A, and the same current flows through each resistor."
},

// Q179
{
  question: "A 10 Ω resistor carries a current of 2 A for 5 minutes. The electrical energy converted into heat is:",
  options: ["200 J", "2000 J", "6000 J", "12000 J"],
  answer: 3,
  explanation: "P = I²R = (2)²(10) = 40 W. Time = 5 min = 300 s, so E = Pt = 40×300 = 12000 J."
},

// Q180
{
  question: "A wire has resistance 5 Ω at a certain temperature. If its resistivity and length remain unchanged while its cross-sectional area is reduced to half, its resistance becomes:",
  options: ["2.5 Ω", "5 Ω", "10 Ω", "20 Ω"],
  answer: 2,
  explanation: "R = ρL/A. Halving the cross-sectional area doubles the resistance, giving R' = 10 Ω."
},

// Q181
{
  question: "A cell of emf 9 V and internal resistance 0.5 Ω supplies a current of 2 A. Its terminal potential difference while discharging is:",
  options: ["8 V", "9 V", "10 V", "18 V"],
  answer: 0,
  explanation: "For a discharging cell, terminal voltage V = E - Ir = 9 - (2)(0.5) = 8 V."
},

// Q182
{
  question: "In a potentiometer, the balance length for a cell is 60 cm. If the potential gradient along the wire is 0.02 V/cm, the emf of the cell is:",
  options: ["0.3 V", "1.2 V", "3.0 V", "12 V"],
  answer: 1,
  explanation: "At balance, emf E = potential gradient × balance length = 0.02×60 = 1.2 V."
},

// Q183
{
  question: "At a junction, currents of 3 A and 5 A enter while a current of 4 A leaves. According to Kirchhoff's junction rule, the other current leaving the junction is:",
  options: ["2 A", "4 A", "6 A", "12 A"],
  answer: 1,
  explanation: "Total current entering equals total current leaving. Thus 3 + 5 = 4 + I, giving I = 4 A."
},

// Q184
{
  question: "A charged particle of charge 2 × 10⁻⁶ C moves at 3 × 10⁴ m/s perpendicular to a magnetic field of 0.5 T. The magnetic force on it is:",
  options: ["0.003 N", "0.03 N", "0.3 N", "3 N"],
  answer: 1,
  explanation: "F = qvB sin90° = (2×10⁻⁶)(3×10⁴)(0.5) = 3×10⁻² N = 0.03 N."
},

// Q185
{
  question: "An electron and a proton enter the same uniform magnetic field perpendicular to it with equal speeds. The ratio of the radius of the proton's path to that of the electron's path is approximately:",
  options: ["1", "1/1836", "1836", "1836²"],
  answer: 2,
  explanation: "For perpendicular motion, r = mv/(|q|B). The particles have equal charge magnitude and speed, so rp/re = mp/me ≈ 1836."
},

// Q186
{
  question: "Two long parallel wires carry currents in the same direction. The magnetic force between the wires is:",
  options: ["Attractive", "Repulsive", "Zero", "Alternately attractive and repulsive"],
  answer: 0,
  explanation: "Parallel currents flowing in the same direction attract each other. Oppositely directed parallel currents repel."
},

// Q187
{
  question: "The magnetic field inside a long ideal solenoid with n turns per unit length carrying current I is:",
  options: ["μ₀I/(2πr)", "μ₀nI", "μ₀n/I", "μ₀I/n"],
  answer: 1,
  explanation: "For a long air-core solenoid, the approximately uniform internal magnetic field is B = μ₀nI."
},

// Q188
{
  question: "A conducting rod of length 0.50 m moves at 8 m/s perpendicular to a uniform magnetic field of 0.25 T. The motional emf across its ends is:",
  options: ["0.25 V", "0.50 V", "1.0 V", "4.0 V"],
  answer: 2,
  explanation: "For perpendicular motion, ε = Blv = (0.25)(0.50)(8) = 1.0 V."
},

// Q189
{
  question: "An inductor of inductance 2 H carries a current of 3 A. The energy stored in its magnetic field is:",
  options: ["3 J", "6 J", "9 J", "18 J"],
  answer: 2,
  explanation: "Energy stored in an inductor is U = 1/2 LI² = 1/2(2)(3²) = 9 J."
},

// Q190
{
  question: "The capacitive reactance of a capacitor connected to an AC source is XC. If the frequency of the source is doubled, the new capacitive reactance is:",
  options: ["XC/2", "XC", "2XC", "4XC"],
  answer: 0,
  explanation: "XC = 1/(2πfC), so capacitive reactance is inversely proportional to frequency. Doubling f halves XC."
},

// Q191
{
  question: "In a purely resistive AC circuit, the phase difference between current and voltage is:",
  options: ["0°", "45°", "90°", "180°"],
  answer: 0,
  explanation: "For a pure resistor, current and voltage vary in phase, so their phase difference is 0°."
},

// Q192
{
  question: "An AC supply has an rms voltage of 220 V. Its peak voltage is approximately:",
  options: ["110 V", "156 V", "311 V", "440 V"],
  answer: 2,
  explanation: "For a sinusoidal voltage, Vrms = V0/√2. Therefore V0 = 220√2 ≈ 311 V."
},

// Q193
{
  question: "In a series RLC circuit at resonance, the power factor is:",
  options: ["0", "1/2", "1/√2", "1"],
  answer: 3,
  explanation: "At resonance XL = XC, so the impedance is purely resistive and voltage and current are in phase. Thus cosφ = 1."
},

// Q194
{
  question: "A transformer has 1000 primary turns and 250 secondary turns. If the primary current is 0.50 A, the secondary current of an ideal transformer is:",
  options: ["0.125 A", "0.50 A", "1.0 A", "2.0 A"],
  answer: 3,
  explanation: "For an ideal transformer, Is/Ip = Np/Ns. Thus Is = 0.50×(1000/250) = 2.0 A."
},

// Q195
{
  question: "A plane mirror is rotated through an angle of 10° while the incident ray remains fixed. The reflected ray rotates through:",
  options: ["5°", "10°", "20°", "40°"],
  answer: 2,
  explanation: "When a plane mirror rotates through an angle θ with the incident ray fixed, the reflected ray rotates through 2θ. Thus it rotates through 20°."
},

// Q196
{
  question: "An object is placed 30 cm in front of a concave mirror of focal length 15 cm. The image is formed:",
  options: ["15 cm behind the mirror", "30 cm in front of the mirror", "60 cm in front of the mirror", "At infinity"],
  answer: 1,
  explanation: "The object is at 2f. For a concave mirror, an object at the center of curvature forms a real image at the center of curvature, 30 cm in front of the mirror."
},

// Q197
{
  question: "Two thin converging lenses of powers +2 D and +3 D are placed in contact. Their combined focal length is:",
  options: ["0.20 m", "0.50 m", "1.0 m", "5.0 m"],
  answer: 0,
  explanation: "Ptotal = P1 + P2 = 5 D. Therefore f = 1/P = 1/5 = 0.20 m."
},

// Q198
{
  question: "An object is placed between the optical center and focal point of a convex lens. The image formed is:",
  options: ["Real, inverted and diminished", "Real, inverted and enlarged", "Virtual, upright and enlarged", "Virtual, upright and diminished"],
  answer: 2,
  explanation: "For a convex lens with the object inside its focal length, the emerging rays diverge and their backward extensions form a virtual, upright and enlarged image."
},

// Q199
{
  question: "When light passes from glass into air at an angle greater than the critical angle, it undergoes:",
  options: ["Complete refraction", "Total internal reflection", "Polarization only", "Dispersion only"],
  answer: 1,
  explanation: "When light travels from an optically denser to a rarer medium and the incidence angle exceeds the critical angle, total internal reflection occurs."
},

// Q200
{
  question: "In Young's double-slit experiment, a bright fringe occurs when the path difference between the two coherent waves is:",
  options: ["(m + 1/2)λ", "mλ", "λ/4 only", "(2m + 1)λ/4"],
  answer: 1,
  explanation: "Constructive interference occurs when the path difference is an integral multiple of the wavelength: Δ = mλ, where m is an integer."
},

// Q201
{
  question: "In Young's double-slit experiment, the first dark fringe corresponds to a path difference of:",
  options: ["0", "λ/4", "λ/2", "λ"],
  answer: 2,
  explanation: "Destructive interference occurs for Δ = (m + 1/2)λ. For the first dark fringe, m = 0, giving Δ = λ/2."
},

// Q202
{
  question: "When unpolarized light passes through an ideal polarizer, its transmitted intensity is half the incident intensity. If it then passes through a second ideal polarizer whose axis is at 60° to the first, the final intensity in terms of the original intensity I₀ is:",
  options: ["I₀/2", "I₀/4", "I₀/8", "3I₀/8"],
  answer: 2,
  explanation: "After the first polarizer, I1 = I₀/2. By Malus's law, I2 = I1 cos²60° = (I₀/2)(1/4) = I₀/8."
},

// Q203
{
  question: "The energy of a photon of frequency f is:",
  options: ["hf", "h/f", "f/h", "hc/f"],
  answer: 0,
  explanation: "Planck's relation gives photon energy directly as E = hf."
},

// Q204
{
  question: "If the wavelength of a photon is halved, its energy becomes:",
  options: ["Half", "Unchanged", "Twice", "Four times"],
  answer: 2,
  explanation: "Photon energy E = hc/λ. Therefore energy is inversely proportional to wavelength, so halving λ doubles E."
},

// Q205
{
  question: "The momentum of a photon of wavelength λ is:",
  options: ["hλ", "h/λ", "λ/h", "hc/λ"],
  answer: 1,
  explanation: "Photon momentum is p = h/λ."
},

// Q206
{
  question: "The threshold frequency of a metal is f₀. Its work function is:",
  options: ["h/f₀", "hf₀", "f₀/h", "hc f₀"],
  answer: 1,
  explanation: "At the threshold frequency, the photon has just enough energy to overcome the work function. Thus φ = hf₀."
},

// Q207
{
  question: "In the photoelectric effect, the stopping potential is 3 V. The maximum kinetic energy of the emitted electrons is:",
  options: ["1.5 eV", "3 eV", "6 eV", "9 eV"],
  answer: 1,
  explanation: "Kmax = eVs. When energy is expressed in electron-volts, an electron stopped by 3 V has maximum kinetic energy 3 eV."
},

// Q208
{
  question: "According to Bohr's model of hydrogen, the radius of the nth allowed orbit is proportional to:",
  options: ["1/n²", "1/n", "n", "n²"],
  answer: 3,
  explanation: "For hydrogen, rn = a₀n². Therefore the orbital radius is proportional to n²."
},

// Q209
{
  question: "A radioactive nucleus undergoes alpha decay. Compared with the parent nucleus, the daughter nucleus has:",
  options: [
    "Mass number reduced by 4 and atomic number reduced by 2",
    "Mass number reduced by 2 and atomic number reduced by 4",
    "Mass number unchanged and atomic number increased by 1",
    "Mass number reduced by 1 and atomic number unchanged"
  ],
  answer: 0,
  explanation: "An alpha particle contains two protons and two neutrons. Alpha emission therefore reduces the mass number by 4 and the atomic number by 2."
},

// Q210
{
  question: "In a full-wave rectifier supplied by an AC source of frequency 50 Hz, the frequency of the rectified output pulses is:",
  options: ["25 Hz", "50 Hz", "100 Hz", "200 Hz"],
  answer: 2,
  explanation: "A full-wave rectifier uses both half-cycles of the AC input, producing two output pulses per input cycle. Therefore the output ripple frequency is 2f = 100 Hz."
},

// Q211
{
  question: "A Zener diode is commonly used in electronic circuits as a:",
  options: ["Voltage regulator", "Current amplifier", "Variable resistor", "Transformer"],
  answer: 0,
  explanation: "When operated in its reverse-breakdown region, a Zener diode maintains an approximately constant voltage and is therefore widely used for voltage regulation."
},

// Q212
{
  question: "The output of a NOR gate is 1 when:",
  options: ["At least one input is 1", "All inputs are 1", "The inputs are different", "All inputs are 0"],
  answer: 3,
  explanation: "A NOR gate is an OR gate followed by NOT. Its output is 1 only when none of its inputs is 1, meaning all inputs are 0."
},

// Q213
{
  question: "Which logic gate produces an output of 1 when two binary inputs are equal?",
  options: ["XOR", "XNOR", "NAND", "OR"],
  answer: 1,
  explanation: "An XNOR gate produces 1 when its inputs are identical: either both 0 or both 1."
},

// Q214
{
  question: "A measurement is written as (25.0 ± 0.5) cm. Its percentage uncertainty is:",
  options: ["0.5%", "1%", "2%", "5%"],
  answer: 2,
  explanation: "Percentage uncertainty = (absolute uncertainty/measured value)×100 = (0.5/25.0)×100 = 2%."
},

// Q215
{
  question: "The number 0.004050 has how many significant figures?",
  options: ["3", "4", "5", "6"],
  answer: 1,
  explanation: "Leading zeros are not significant, but the zero between 4 and 5 and the trailing zero after the decimal are significant. Therefore 0.004050 has four significant figures."
},

// Q216
{
  question: "If two measured quantities are added or subtracted, the maximum absolute uncertainty in the result is found by:",
  options: ["Adding their absolute uncertainties", "Multiplying their absolute uncertainties", "Adding their percentage uncertainties", "Taking the smaller absolute uncertainty"],
  answer: 0,
  explanation: "For addition or subtraction, maximum absolute uncertainties are added. Percentage uncertainties are generally added for multiplication or division."
},

// Q217
{
  question: "Two perpendicular vectors have magnitudes 8 units and 15 units. The magnitude of their resultant is:",
  options: ["17 units", "23 units", "7 units", "120 units"],
  answer: 0,
  explanation: "For perpendicular vectors, R = √(8² + 15²) = √(64 + 225) = √289 = 17 units."
},

// Q218
{
  question: "The magnitude of the cross product of two vectors of magnitudes 6 and 8 with an angle of 30° between them is:",
  options: ["12", "24", "24√3", "48"],
  answer: 1,
  explanation: "|A×B| = AB sinθ = (6)(8)sin30° = 48×1/2 = 24."
},

// Q219
{
  question: "A person walks 3 km east and then 4 km north. The magnitude of the person's displacement from the starting point is:",
  options: ["1 km", "5 km", "7 km", "12 km"],
  answer: 1,
  explanation: "The two displacements are perpendicular, so the resultant is √(3² + 4²) = 5 km."
},

// Q220
{
  question: "A car travels 60 km at 30 km/h and then another 60 km at 60 km/h. Its average speed for the entire journey is:",
  options: ["40 km/h", "45 km/h", "48 km/h", "50 km/h"],
  answer: 0,
  explanation: "Total distance = 120 km. Times are 60/30 = 2 h and 60/60 = 1 h, so total time = 3 h. Average speed = 120/3 = 40 km/h."
},

// Q221
{
  question: "The slope of a displacement-time graph at a particular instant represents:",
  options: ["Acceleration", "Velocity", "Force", "Momentum"],
  answer: 1,
  explanation: "Velocity is the rate of change of displacement with time, v = dx/dt, so it equals the slope of a displacement-time graph."
},

// Q222
{
  question: "The area under an acceleration-time graph between two times represents the:",
  options: ["Displacement", "Distance", "Change in velocity", "Average acceleration"],
  answer: 2,
  explanation: "Since a = dv/dt, integrating acceleration over time gives Δv = ∫a dt. Therefore the area under an acceleration-time graph gives the change in velocity."
},

// Q223
{
  question: "A car moving at 25 m/s slows uniformly at 5 m/s². The distance it travels before stopping is:",
  options: ["25 m", "50 m", "62.5 m", "125 m"],
  answer: 2,
  explanation: "Using v² = u² + 2as with v = 0, u = 25 and a = -5: 0 = 625 - 10s, so s = 62.5 m."
},

// Q224
{
  question: "A ball is thrown vertically upward with speed 20 m/s. Taking g = 10 m/s², the total time taken to return to its point of projection is:",
  options: ["2 s", "4 s", "6 s", "8 s"],
  answer: 1,
  explanation: "Time to reach maximum height is u/g = 20/10 = 2 s. The descent takes the same time, so total time is 4 s."
},

// Q225
{
  question: "A projectile is launched at 20 m/s at an angle of 45° to the horizontal. Taking g = 10 m/s², its horizontal range is:",
  options: ["20 m", "20√2 m", "40 m", "80 m"],
  answer: 2,
  explanation: "R = u²sin2θ/g = 20² sin90°/10 = 400/10 = 40 m."
},

// Q226
{
  question: "A 6 kg object experiences a net force that changes its velocity from 2 m/s to 8 m/s in 3 s. The magnitude of the net force is:",
  options: ["6 N", "12 N", "18 N", "36 N"],
  answer: 1,
  explanation: "Acceleration a = (8-2)/3 = 2 m/s². Therefore F = ma = 6×2 = 12 N."
},

// Q227
{
  question: "A force of 50 N acts on an object for 0.20 s. The impulse delivered to the object is:",
  options: ["2.5 N·s", "10 N·s", "50 N·s", "250 N·s"],
  answer: 1,
  explanation: "Impulse J = FΔt = 50×0.20 = 10 N·s."
},

// Q228
{
  question: "A 0.20 kg ball moving at 10 m/s reverses direction and moves at 5 m/s. The magnitude of its change in momentum is:",
  options: ["1 kg·m/s", "2 kg·m/s", "3 kg·m/s", "5 kg·m/s"],
  answer: 2,
  explanation: "Taking the original direction as positive, pi = 0.20(10) = 2 and pf = 0.20(-5) = -1 kg·m/s. Thus Δp = -1 - 2 = -3 kg·m/s, whose magnitude is 3 kg·m/s."
},

// Q229
{
  question: "A 1000 kg car increases its speed from 10 m/s to 20 m/s. The increase in its kinetic energy is:",
  options: ["5.0 × 10⁴ J", "1.0 × 10⁵ J", "1.5 × 10⁵ J", "2.0 × 10⁵ J"],
  answer: 2,
  explanation: "ΔK = 1/2m(v²-u²) = 1/2(1000)(400-100) = 500×300 = 1.5×10⁵ J."
},

// Q230
{
  question: "A 2 kg object is raised vertically through 8 m. Taking g = 10 m/s², the increase in gravitational potential energy is:",
  options: ["16 J", "80 J", "160 J", "320 J"],
  answer: 2,
  explanation: "ΔU = mgh = 2×10×8 = 160 J."
},

// Q231
{
  question: "A constant torque of 12 N·m acts on a body having moment of inertia 3 kg·m². Its angular acceleration is:",
  options: ["2 rad/s²", "4 rad/s²", "9 rad/s²", "36 rad/s²"],
  answer: 1,
  explanation: "Using τ = Iα, α = τ/I = 12/3 = 4 rad/s²."
},

// Q232
{
  question: "A disc rotates at an angular speed of 10 rad/s. A point 0.30 m from its axis has linear speed:",
  options: ["0.03 m/s", "3 m/s", "10.3 m/s", "30 m/s"],
  answer: 1,
  explanation: "Linear and angular speeds are related by v = rω. Thus v = 0.30×10 = 3 m/s."
},

// Q233
{
  question: "A rotating body has moment of inertia 4 kg·m² and angular speed 3 rad/s. Its angular momentum is:",
  options: ["7 kg·m²/s", "12 kg·m²/s", "18 kg·m²/s", "36 kg·m²/s"],
  answer: 1,
  explanation: "Angular momentum L = Iω = 4×3 = 12 kg·m²/s."
},

// Q234
{
  question: "The rotational kinetic energy of a body with moment of inertia 2 kg·m² rotating at 4 rad/s is:",
  options: ["8 J", "16 J", "24 J", "32 J"],
  answer: 1,
  explanation: "Krot = 1/2 Iω² = 1/2(2)(4²) = 16 J."
},

// Q235
{
  question: "A satellite moves from a lower circular orbit to a higher circular orbit around Earth. Its orbital speed:",
  options: ["Increases", "Decreases", "Remains unchanged", "Becomes equal to escape speed"],
  answer: 1,
  explanation: "Circular orbital speed is v = √(GM/r). Increasing orbital radius r therefore decreases orbital speed."
},

// Q236
{
  question: "The gravitational field strength at a point is numerically equal to:",
  options: ["Force per unit mass", "Potential energy per unit charge", "Work per unit time", "Momentum per unit volume"],
  answer: 0,
  explanation: "Gravitational field strength is defined as gravitational force per unit test mass: g = F/m."
},

// Q237
{
  question: "A body weighs 100 N in air and 60 N when completely submerged in a liquid. The buoyant force acting on it is:",
  options: ["40 N", "60 N", "100 N", "160 N"],
  answer: 0,
  explanation: "The apparent loss of weight equals the buoyant force. Thus FB = 100 - 60 = 40 N."
},

// Q238
{
  question: "For steady incompressible flow through a pipe, if the cross-sectional area becomes three times larger, the fluid speed becomes:",
  options: ["Three times larger", "One-third as large", "Nine times larger", "Unchanged"],
  answer: 1,
  explanation: "The continuity equation A₁v₁ = A₂v₂ applies. If area becomes 3A, speed must become v/3."
},

// Q239
{
  question: "A mass-spring oscillator has spring constant 100 N/m and mass 1 kg. Its angular frequency is:",
  options: ["5 rad/s", "10 rad/s", "20 rad/s", "100 rad/s"],
  answer: 1,
  explanation: "For a spring-mass oscillator, ω = √(k/m) = √(100/1) = 10 rad/s."
},

// Q240
{
  question: "A simple pendulum has period 2.0 s. If its length is increased by a factor of 4 while g remains unchanged, its new period is:",
  options: ["1.0 s", "2.0 s", "4.0 s", "8.0 s"],
  answer: 2,
  explanation: "For a simple pendulum, T ∝ √L. Increasing length by a factor of 4 increases the period by √4 = 2, giving 4.0 s."
},

// Q241
{
  question: "An ideal gas has pressure P, volume V and absolute temperature T. If its pressure is doubled and its volume is halved for the same amount of gas, its final temperature is:",
  options: ["T/2", "T", "2T", "4T"],
  answer: 1,
  explanation: "For a fixed amount of ideal gas, PV/T is constant. Since P'V' = (2P)(V/2) = PV, the absolute temperature remains T."
},

// Q242
{
  question: "A particle moving with constant acceleration covers 20 m in the first 2 s and 40 m in the next 2 s. Its acceleration is:",
  options: ["2.5 m/s²", "5 m/s²", "10 m/s²", "20 m/s²"],
  answer: 1,
  explanation: "For constant acceleration, displacement in the first 2 s is 2u + 2a = 20. Displacement from t = 2 s to t = 4 s is 2u + 6a = 40. Subtracting gives 4a = 20, so a = 5 m/s²."
},

// Q243
{
  question: "A projectile is launched with speed 25 m/s. Taking g = 10 m/s², the maximum possible horizontal range on level ground is:",
  options: ["31.25 m", "50 m", "62.5 m", "125 m"],
  answer: 2,
  explanation: "For a given launch speed, maximum range occurs at 45°. Thus Rmax = u²/g = 25²/10 = 62.5 m."
},

// Q244
{
  question: "A 5 kg block slides down a smooth incline of angle 30°. Taking g = 10 m/s², its acceleration down the incline is:",
  options: ["2.5 m/s²", "5 m/s²", "8.66 m/s²", "10 m/s²"],
  answer: 1,
  explanation: "For a smooth incline, acceleration down the plane is a = g sinθ = 10 sin30° = 5 m/s²."
},

// Q245
{
  question: "Two blocks of masses 2 kg and 3 kg are connected by a light string on a smooth horizontal surface. A horizontal force of 10 N is applied to the 3 kg block. The tension in the string is:",
  options: ["2 N", "4 N", "6 N", "10 N"],
  answer: 1,
  explanation: "The acceleration of the system is a = 10/(2+3) = 2 m/s². The tension accelerating the 2 kg block is T = ma = 2×2 = 4 N."
},

// Q246
{
  question: "A 2 kg object moving at 6 m/s collides elastically head-on with an identical stationary object. After the collision, the first object's velocity is:",
  options: ["0 m/s", "3 m/s", "6 m/s", "-6 m/s"],
  answer: 0,
  explanation: "In a one-dimensional elastic collision between identical masses where one is initially stationary, the moving object transfers its velocity to the stationary object and comes to rest."
},

// Q247
{
  question: "A constant force F acts on an object moving in the same direction as the force. If its speed is v, the instantaneous power delivered by the force is:",
  options: ["F/v", "Fv", "Fv²", "F²v"],
  answer: 1,
  explanation: "Instantaneous mechanical power is P = F·v. When force and velocity are parallel, P = Fv."
},

// Q248
{
  question: "A 0.50 kg ball moves in a horizontal circle of radius 2 m at speed 4 m/s. The centripetal force is:",
  options: ["2 N", "4 N", "8 N", "16 N"],
  answer: 1,
  explanation: "Fc = mv²/r = (0.50)(16)/2 = 4 N."
},

// Q249
{
  question: "A point on the rim of a wheel of radius 0.50 m has centripetal acceleration 8 m/s². The angular speed of the wheel is:",
  options: ["2 rad/s", "4 rad/s", "8 rad/s", "16 rad/s"],
  answer: 1,
  explanation: "Centripetal acceleration ac = ω²r. Thus 8 = ω²(0.50), giving ω² = 16 and ω = 4 rad/s."
},

// Q250
{
  question: "A body rotating about a fixed axis has moment of inertia 5 kg·m². Its angular speed changes from 2 rad/s to 6 rad/s. The increase in rotational kinetic energy is:",
  options: ["40 J", "60 J", "80 J", "100 J"],
  answer: 2,
  explanation: "ΔK = 1/2 I(ωf² - ωi²) = 1/2(5)(36-4) = 2.5×32 = 80 J."
},

// Q251
{
  question: "The escape speed from the surface of a planet is related to the circular orbital speed just above its surface by:",
  options: ["ve = vo/√2", "ve = vo", "ve = √2 vo", "ve = 2vo"],
  answer: 2,
  explanation: "Near the surface, orbital speed vo = √(GM/R), while escape speed ve = √(2GM/R). Therefore ve = √2 vo."
},

// Q252
{
  question: "If Earth's mass remained unchanged but its radius became half its present value, the surface gravitational acceleration would become:",
  options: ["g/4", "g/2", "2g", "4g"],
  answer: 3,
  explanation: "Surface gravity g = GM/R². Replacing R by R/2 gives g' = GM/(R/2)² = 4GM/R² = 4g."
},

// Q253
{
  question: "A cube of density 600 kg/m³ floats in water of density 1000 kg/m³. What fraction of the cube's volume is above the water surface?",
  options: ["20%", "40%", "60%", "80%"],
  answer: 1,
  explanation: "For floating equilibrium, the submerged fraction is ρcube/ρwater = 600/1000 = 0.60. Therefore 40% of the volume remains above the surface."
},

// Q254
{
  question: "Water flows through a pipe of cross-sectional area 4 cm² at 3 m/s. It enters a section of area 6 cm². The speed in the wider section is:",
  options: ["1 m/s", "2 m/s", "3 m/s", "4.5 m/s"],
  answer: 1,
  explanation: "Using continuity, A1v1 = A2v2. Thus v2 = (4×3)/6 = 2 m/s."
},

// Q255
{
  question: "In a horizontal streamline flow, the fluid speed increases from 2 m/s to 6 m/s. For a fluid of density 1000 kg/m³, the decrease in pressure is:",
  options: ["8000 Pa", "12000 Pa", "16000 Pa", "32000 Pa"],
  answer: 2,
  explanation: "Bernoulli's equation gives P1-P2 = 1/2ρ(v2²-v1²) = 1/2(1000)(36-4) = 16000 Pa."
},

// Q256
{
  question: "A spring-mass oscillator has total mechanical energy E. When its displacement is A/√2, where A is its amplitude, its kinetic energy is:",
  options: ["E/4", "E/2", "E/√2", "3E/4"],
  answer: 1,
  explanation: "Potential energy U/E = x²/A². At x = A/√2, U = E/2. Therefore K = E-U = E/2."
},

// Q257
{
  question: "Two particles execute SHM with the same amplitude and frequency but differ in phase by π radians. Their displacements at any instant are:",
  options: ["Always equal", "Equal in magnitude and opposite in sign", "Always zero", "Different only in amplitude"],
  answer: 1,
  explanation: "A phase difference of π corresponds to 180°. If x1 = A sinωt, then x2 = A sin(ωt+π) = -x1."
},

// Q258
{
  question: "A wave has frequency 20 Hz and wavelength 1.5 m. How far does the wave travel in 4 s?",
  options: ["30 m", "60 m", "90 m", "120 m"],
  answer: 3,
  explanation: "Wave speed v = fλ = 20×1.5 = 30 m/s. Distance in 4 s is vt = 30×4 = 120 m."
},

// Q259
{
  question: "A string fixed at both ends vibrates in its second harmonic. If its length is L, the wavelength of this harmonic is:",
  options: ["L/2", "L", "2L", "4L"],
  answer: 1,
  explanation: "For a string fixed at both ends, λn = 2L/n. For n = 2, λ2 = L."
},

// Q260
{
  question: "The sound intensity level increases by 10 dB. The sound intensity has increased by a factor of:",
  options: ["2", "5", "10", "100"],
  answer: 2,
  explanation: "Sound level difference is Δβ = 10 log10(I2/I1). For Δβ = 10 dB, log10(I2/I1)=1, so I2/I1 = 10."
},

// Q261
{
  question: "A source of sound approaches a stationary observer. Compared with the emitted sound, the sound detected by the observer has:",
  options: ["Lower frequency and longer wavelength", "Higher frequency and shorter wavelength", "Higher frequency and longer wavelength", "The same frequency and wavelength"],
  answer: 1,
  explanation: "An approaching source compresses the wavefronts in front of it, producing a shorter wavelength and therefore a higher observed frequency."
},

// Q262
{
  question: "Two kilograms of water at 20°C are mixed with 1 kg of water at 80°C in an insulated container. Neglecting heat capacity of the container, the final temperature is:",
  options: ["30°C", "40°C", "50°C", "60°C"],
  answer: 1,
  explanation: "For the same substance with no heat loss, 2(T-20) = 1(80-T). Thus 2T-40 = 80-T, giving 3T = 120 and T = 40°C."
},

// Q263
{
  question: "A 100 g substance absorbs 2000 J of heat and its temperature rises by 20°C. Its specific heat capacity is:",
  options: ["100 J kg⁻¹ K⁻¹", "500 J kg⁻¹ K⁻¹", "1000 J kg⁻¹ K⁻¹", "2000 J kg⁻¹ K⁻¹"],
  answer: 2,
  explanation: "c = Q/(mΔT) = 2000/(0.10×20) = 1000 J kg⁻¹ K⁻¹."
},

// Q264
{
  question: "An ideal heat engine absorbs 1000 J of heat from a hot reservoir and rejects 600 J to a cold reservoir. Its efficiency is:",
  options: ["20%", "40%", "60%", "80%"],
  answer: 1,
  explanation: "Work output W = QH-QC = 1000-600 = 400 J. Efficiency η = W/QH = 400/1000 = 40%."
},

// Q265
{
  question: "For one mole of an ideal gas, the difference between the molar heat capacities at constant pressure and constant volume is:",
  options: ["R", "2R", "R/2", "Zero"],
  answer: 0,
  explanation: "For an ideal gas, Mayer's relation is Cp - Cv = R."
},

// Q266
{
  question: "The average translational kinetic energy of one molecule of an ideal gas at absolute temperature T is:",
  options: ["kT/2", "kT", "3kT/2", "3kT"],
  answer: 2,
  explanation: "From kinetic theory, the average translational kinetic energy per molecule is 3kT/2."
},

// Q267
{
  question: "At the same temperature, hydrogen molecules and oxygen molecules have the same:",
  options: ["Root-mean-square speed", "Momentum of every molecule", "Average translational kinetic energy", "Molecular mass"],
  answer: 2,
  explanation: "The average translational kinetic energy per molecule is 3kT/2, so it depends only on absolute temperature and not molecular mass."
},

// Q268
{
  question: "Two identical positive point charges +Q are fixed a distance 2a apart. The electric field exactly midway between them is:",
  options: ["Zero", "kQ/a²", "2kQ/a²", "4kQ/a²"],
  answer: 0,
  explanation: "At the midpoint, each charge produces an electric field of equal magnitude but in the opposite direction. The fields therefore cancel."
},

// Q269
{
  question: "Two identical positive charges +Q are separated by distance 2a. The electric potential at their midpoint is:",
  options: ["Zero", "kQ/a", "2kQ/a", "4kQ/a"],
  answer: 2,
  explanation: "Electric potential is a scalar. Each charge contributes kQ/a at the midpoint, so V = kQ/a + kQ/a = 2kQ/a."
},

// Q270
{
  question: "A charge of 2 μC is moved through a potential difference of 50 V. The magnitude of the change in electric potential energy is:",
  options: ["25 μJ", "50 μJ", "100 μJ", "250 μJ"],
  answer: 2,
  explanation: "|ΔU| = |qΔV| = (2×10⁻⁶)(50) = 100×10⁻⁶ J = 100 μJ."
},

// Q271
{
  question: "A 3 μF capacitor and a 6 μF capacitor are connected in series across an 18 V supply. The charge on the 3 μF capacitor is:",
  options: ["18 μC", "36 μC", "54 μC", "108 μC"],
  answer: 1,
  explanation: "The series equivalent capacitance is Ceq = (3×6)/(3+6) = 2 μF. The series charge is Q = CeqV = 2×18 = 36 μC. Each capacitor carries this same charge."
},

// Q272
{
  question: "A parallel-plate capacitor remains connected to a battery while a dielectric of relative permittivity 4 completely fills the space between its plates. Its stored energy becomes:",
  options: ["One-fourth", "Unchanged", "Four times", "Sixteen times"],
  answer: 2,
  explanation: "With the battery connected, voltage remains constant. The dielectric increases capacitance to 4C. Since U = 1/2 CV², the stored energy becomes four times as large."
},

// Q273
{
  question: "A 12 V battery is connected to two series resistors of 2 Ω and 4 Ω. The potential difference across the 4 Ω resistor is:",
  options: ["2 V", "4 V", "8 V", "12 V"],
  answer: 2,
  explanation: "Total resistance is 6 Ω, so current I = 12/6 = 2 A. The voltage across the 4 Ω resistor is V = IR = 2×4 = 8 V."
},
// Q274
{
  question: "A 24 V battery is connected to a 6 Ω resistor. If the resistor operates for 2 minutes, the electrical energy dissipated is:",
  options: ["960 J", "2880 J", "5760 J", "11520 J"],
  answer: 3,
  explanation: "Power P = V²/R = 24²/6 = 96 W. For t = 120 s, E = Pt = 96×120 = 11520 J."
},

// Q275
{
  question: "Three identical resistors, each of resistance R, are connected in parallel. This combination is then connected in series with another resistor R. The total resistance is:",
  options: ["R/3", "2R/3", "4R/3", "3R"],
  answer: 2,
  explanation: "Three identical resistors in parallel have equivalent resistance R/3. Adding another R in series gives Req = R + R/3 = 4R/3."
},

// Q276
{
  question: "A charged particle enters a uniform magnetic field perpendicular to the field. The magnetic field does no work on the particle because the magnetic force is:",
  options: ["Zero at every point", "Always perpendicular to the particle's velocity", "Always parallel to the particle's velocity", "Independent of the particle's charge"],
  answer: 1,
  explanation: "The magnetic force q(v×B) is perpendicular to the instantaneous velocity. Therefore F·ds = 0, so the field changes the direction of velocity but not the particle's kinetic energy."
},

// Q277
{
  question: "A proton moves perpendicular to a uniform magnetic field in a circular path. If the magnetic field strength is doubled while its speed remains unchanged, the radius of its path becomes:",
  options: ["r/4", "r/2", "2r", "4r"],
  answer: 1,
  explanation: "The radius is r = mv/(qB). With m, v and q unchanged, doubling B reduces the radius to r/2."
},

// Q278
{
  question: "A coil of 50 turns experiences a change in magnetic flux per turn from 0.04 Wb to zero in 0.20 s. The magnitude of the average induced emf is:",
  options: ["2 V", "5 V", "10 V", "20 V"],
  answer: 2,
  explanation: "Faraday's law gives |ε| = N|ΔΦ|/Δt = 50(0.04)/0.20 = 10 V."
},

// Q279
{
  question: "An ideal transformer increases voltage from 100 V to 500 V. If the primary has 200 turns, the secondary has:",
  options: ["40 turns", "200 turns", "500 turns", "1000 turns"],
  answer: 3,
  explanation: "Vs/Vp = Ns/Np. Thus 500/100 = Ns/200, giving Ns = 1000 turns."
},

// Q280
{
  question: "In a series RLC circuit, R = 30 Ω, XL = 50 Ω and XC = 10 Ω. The impedance of the circuit is:",
  options: ["40 Ω", "50 Ω", "70 Ω", "90 Ω"],
  answer: 1,
  explanation: "Z = √[R² + (XL-XC)²] = √[30² + 40²] = √2500 = 50 Ω."
},

// Q281
{
  question: "A series RLC circuit has R = 40 Ω and net reactance XL - XC = 30 Ω. If connected to an rms voltage of 100 V, the rms current is:",
  options: ["1 A", "2 A", "2.5 A", "4 A"],
  answer: 1,
  explanation: "Z = √(40² + 30²) = 50 Ω. Therefore Irms = Vrms/Z = 100/50 = 2 A."
},

// Q282
{
  question: "A convex lens of focal length 20 cm forms a real image 60 cm from the lens. The object distance is:",
  options: ["15 cm", "30 cm", "40 cm", "80 cm"],
  answer: 1,
  explanation: "Using 1/f = 1/u + 1/v in magnitude form, 1/20 = 1/u + 1/60. Thus 1/u = 2/60 = 1/30, so u = 30 cm."
},

// Q283
{
  question: "A convex lens forms a real image three times the size of the object. If the image distance is 60 cm, the magnitude of the object distance is:",
  options: ["20 cm", "30 cm", "60 cm", "180 cm"],
  answer: 0,
  explanation: "The magnitude of linear magnification is |m| = v/u. Thus 3 = 60/u, giving u = 20 cm."
},

// Q284
{
  question: "A ray travels from glass of refractive index 1.5 into air. If the angle of incidence in glass is 30°, the sine of the angle of refraction is:",
  options: ["1/3", "1/2", "3/4", "1"],
  answer: 2,
  explanation: "Snell's law gives 1.5 sin30° = 1×sin r. Therefore sin r = 1.5×0.5 = 0.75 = 3/4."
},

// Q285
{
  question: "Monochromatic light of wavelength λ produces interference fringes in a double-slit experiment. If the experiment is performed in a medium of refractive index n while the geometry remains unchanged, the fringe width becomes:",
  options: ["nβ", "β/n", "n²β", "β"],
  answer: 1,
  explanation: "In the medium, wavelength becomes λ/n. Since fringe width β = λD/d, the new fringe width is β/n."
},

// Q286
{
  question: "In a single-slit diffraction experiment, the slit width is decreased while wavelength remains constant. The central diffraction maximum becomes:",
  options: ["Narrower", "Wider", "Unchanged in width", "Completely absent"],
  answer: 1,
  explanation: "The angular width of the central maximum is inversely proportional to slit width. Decreasing the slit width therefore makes the central maximum wider."
},

// Q287
{
  question: "The fact that light can be polarized provides evidence that light waves are:",
  options: ["Longitudinal", "Transverse", "Stationary only", "Mechanical"],
  answer: 1,
  explanation: "Polarization is a characteristic property of transverse waves because their oscillations can be restricted to a particular direction perpendicular to propagation."
},

// Q288
{
  question: "The work function of a metal is 2.5 eV. If photons of energy 4.0 eV strike its surface, the stopping potential is:",
  options: ["1.0 V", "1.5 V", "2.5 V", "4.0 V"],
  answer: 1,
  explanation: "Kmax = 4.0 - 2.5 = 1.5 eV. Since Kmax = eVs, a maximum kinetic energy of 1.5 eV corresponds to a stopping potential of 1.5 V."
},

// Q289
{
  question: "If an electron and a proton have the same de Broglie wavelength, they must have the same magnitude of:",
  options: ["Velocity", "Kinetic energy", "Momentum", "Acceleration"],
  answer: 2,
  explanation: "The de Broglie relation is λ = h/p. Equal wavelengths therefore imply equal momentum magnitudes, although their speeds and kinetic energies need not be equal."
},

// Q290
{
  question: "According to Bohr's model of hydrogen, the angular momentum of an electron in the nth orbit is:",
  options: ["nh/(2π)", "h/(2πn)", "n²h/(2π)", "2πnh"],
  answer: 0,
  explanation: "Bohr's angular-momentum quantization condition is L = nħ = nh/(2π)."
},

// Q291
{
  question: "A hydrogen atom absorbs exactly enough energy to move its electron from n = 1 to n = 2. Using En = -13.6/n² eV, the required energy is:",
  options: ["3.4 eV", "6.8 eV", "10.2 eV", "13.6 eV"],
  answer: 2,
  explanation: "E1 = -13.6 eV and E2 = -3.4 eV. Required energy = E2-E1 = -3.4 - (-13.6) = 10.2 eV."
},

// Q292
{
  question: "A radioactive isotope has a half-life of 20 minutes. Its decay constant is approximately:",
  options: ["0.0347 min⁻¹", "0.0500 min⁻¹", "0.0693 min⁻¹", "0.693 min⁻¹"],
  answer: 0,
  explanation: "λ = ln2/T1/2 = 0.693/20 ≈ 0.0347 min⁻¹."
},

// Q293
{
  question: "A radioactive sample has activity 800 Bq. After two half-lives, its activity becomes:",
  options: ["100 Bq", "200 Bq", "400 Bq", "600 Bq"],
  answer: 1,
  explanation: "After two half-lives, A = A0(1/2)² = 800/4 = 200 Bq."
},

// Q294
{
  question: "In nuclear fission, energy is released mainly because:",
  options: [
    "The total rest mass of the products is slightly less than that of the initial system",
    "Electric charge is destroyed",
    "Neutrons are converted completely into photons",
    "The number of nucleons decreases"
  ],
  answer: 0,
  explanation: "The products have slightly less total rest mass than the initial system. The corresponding mass difference appears as released energy according to E = Δmc²."
},

// Q295
{
  question: "Which statement about nuclear fusion is correct?",
  options: [
    "It combines light nuclei to form heavier nuclei",
    "It occurs only when heavy nuclei split",
    "It violates conservation of charge",
    "It produces energy without any change in binding energy"
  ],
  answer: 0,
  explanation: "Fusion combines light nuclei into heavier nuclei. For suitable light nuclei, the products have greater binding energy per nucleon, allowing energy to be released."
},

// Q296
{
  question: "An object has rest mass m and moves at speed v. According to special relativity, its total energy is:",
  options: ["mv²/2", "mc²", "γmc²", "mc²/γ"],
  answer: 2,
  explanation: "Relativistic total energy is E = γmc², where γ = 1/√(1-v²/c²). The rest energy mc² is recovered when v = 0."
},

// Q297
{
  question: "According to special relativity, which quantity associated with a particle remains invariant for all inertial observers?",
  options: ["Its kinetic energy", "Its momentum", "Its speed", "Its rest mass"],
  answer: 3,
  explanation: "Rest mass, or invariant mass, is observer-independent. Energy and momentum depend on the inertial reference frame."
},

// Q298
{
  question: "In a transistor, the common-emitter current gain is β = 120. If the base current is 25 μA, the collector current is:",
  options: ["0.30 mA", "3.0 mA", "30 mA", "300 mA"],
  answer: 1,
  explanation: "IC = βIB = 120×25 μA = 3000 μA = 3.0 mA."
},

// Q299
{
  question: "For an AND gate followed immediately by a NOT gate, the resulting logic operation is:",
  options: ["OR", "NOR", "NAND", "XOR"],
  answer: 2,
  explanation: "An AND gate followed by inversion produces the complement of AND, which is the NAND operation."
},

// Q300
{
  question: "A 2 kg object moving at 8 m/s collides head-on with a stationary 2 kg object. After the collision, the first object moves at 2 m/s in its original direction. The speed of the second object immediately after the collision is:",
  options: ["2 m/s", "4 m/s", "6 m/s", "8 m/s"],
  answer: 2,
  explanation: "Conservation of momentum gives (2)(8) = (2)(2) + (2)v. Thus 16 = 4 + 2v, so v = 6 m/s."
},
];