import { useMemo, useState } from "react";
import { MapPin, Wallet, Target, Star, Building2, Route, GraduationCap, Trophy, UserRound, BookOpen, ArrowRight, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import { useTheme } from "../context/ThemeContext";


type City =
  | "Karachi"
  | "Lahore"
  | "Islamabad"
  | "Rawalpindi"
  | "Faisalabad"
  | "Multan"
  | "Peshawar"
  | "Quetta"
  | "Sialkot"
  | "Gujranwala"
  | "Hyderabad"
  | "Sargodha"
  | "Bahawalpur"
  | "Sukkur"
  | "Abbottabad";

type Budget = "Low" | "Medium" | "High";
type Merit = "Low" | "Medium" | "High";

type University = {
  name: string;
  university: string;
  universityMatch: string;
  tag: string;
  desc: string;
  color: string;
  subjects: string[];
  difficulty: string;
  reason: string;
  budget: Budget;
  requiredMerit: Merit;
  lat: number;
  lng: number;

  logo: string;
  rating: number;
  campusCount: number;
};

type RankedUniversity = University & {
  distance: number;
  matchScore: number;
  meritLevel: Merit;
};

const cityCoords: Record<City, { lat: number; lng: number }> = {
  Karachi: { lat: 24.8607, lng: 67.0011 },
  Lahore: { lat: 31.5204, lng: 74.3587 },
  Islamabad: { lat: 33.6844, lng: 73.0479 },
  Rawalpindi: { lat: 33.5651, lng: 73.0169 },
  Faisalabad: { lat: 31.4504, lng: 73.135 },
  Multan: { lat: 30.1575, lng: 71.5249 },
  Peshawar: { lat: 34.0151, lng: 71.5249 },
  Quetta: { lat: 30.1798, lng: 66.975 },
  Sialkot: { lat: 32.4945, lng: 74.5229 },
  Gujranwala: { lat: 32.1877, lng: 74.1945 },
  Hyderabad: { lat: 25.396, lng: 68.3578 },
  Sargodha: { lat: 32.0836, lng: 72.6711 },
  Bahawalpur: { lat: 29.3956, lng: 71.6836 },
  Sukkur: { lat: 27.7052, lng: 68.8574 },
  Abbottabad: { lat: 34.1688, lng: 73.2215 },
};

const universities: University[] = [
// =======================
// FAST National University
// =======================

{
  name: "FAST NUCES Islamabad",
  university: "FAST NUCES",
  universityMatch: "Islamabad",
  tag: "Flagship Campus",
  desc: "The Islamabad campus is one of FAST's flagship campuses, known for its highly competitive Computer Science, Software Engineering, AI, and Data Science programs.",
  color: "#EF4444",
  logo: "/logos/fast.png",
  subjects: [
    "Advanced Mathematics",
    "Basic Mathematics",
    "IQ / Analytical Reasoning",
    "English"
  ],
  difficulty: "Very Competitive",
  reason: "Ideal for students seeking one of Pakistan's strongest computing programs with excellent industry recognition.",
  budget: "High",
  requiredMerit: "High",
  rating: 9.8,
  campusCount: 6,
  lat: 33.6565,
  lng: 73.0157,
},

{
  name: "FAST NUCES Lahore",
  university: "FAST NUCES",
  universityMatch: "Lahore",
  tag: "Top CS Campus",
  desc: "FAST Lahore is among Pakistan's leading campuses for Computer Science and Software Engineering, with strong links to the software industry.",
  color: "#EF4444",
  logo: "/logos/fast.png",
  subjects: [
    "Advanced Mathematics",
    "Basic Mathematics",
    "IQ / Analytical Reasoning",
    "English"
  ],
  difficulty: "Very Competitive",
  reason: "Excellent choice for students aiming for careers in software development, AI, cybersecurity, and data science.",
  budget: "High",
  requiredMerit: "High",
  rating: 9.7,
  campusCount: 6,
  lat: 31.4814,
  lng: 74.3035,
},

{
  name: "FAST NUCES Karachi",
  university: "FAST NUCES",
  universityMatch: "Karachi",
  tag: "Strong CS Campus",
  desc: "FAST Karachi has an outstanding reputation in Computer Science and Software Engineering with strong industry exposure.",
  color: "#EF4444",
  logo: "/logos/fast.png",
  subjects: [
    "Advanced Mathematics",
    "Basic Mathematics",
    "IQ / Analytical Reasoning",
    "English"
  ],
  difficulty: "Very Competitive",
  reason: "Recommended for students in Sindh looking for a highly respected computing university.",
  budget: "High",
  requiredMerit: "High",
  rating: 9.5,
  campusCount: 6,
  lat: 24.9056,
  lng: 67.1384,
},

{
  name: "FAST NUCES Peshawar",
  university: "FAST NUCES",
  universityMatch: "Peshawar",
  tag: "Growing Campus",
  desc: "FAST Peshawar offers quality computing education with the same curriculum followed across all FAST campuses.",
  color: "#EF4444",
  logo: "/logos/fast.png",
  subjects: [
    "Advanced Mathematics",
    "Basic Mathematics",
    "IQ / Analytical Reasoning",
    "English"
  ],
  difficulty: "Competitive",
  reason: "A strong option for students in Khyber Pakhtunkhwa who want the FAST experience.",
  budget: "Medium",
  requiredMerit: "High",
  rating: 8.9,
  campusCount: 6,
  lat: 34.0151,
  lng: 71.5249,
},

{
  name: "FAST NUCES Chiniot-Faisalabad",
  university: "FAST NUCES",
  universityMatch: "Faisalabad",
  tag: "Emerging Campus",
  desc: "The Chiniot-Faisalabad campus provides quality computing programs for students across Central Punjab.",
  color: "#EF4444",
  logo: "/logos/fast.png",
  subjects: [
    "Advanced Mathematics",
    "Basic Mathematics",
    "IQ / Analytical Reasoning",
    "English"
  ],
  difficulty: "Competitive",
  reason: "Good choice for students from Faisalabad and nearby cities seeking FAST's curriculum.",
  budget: "Medium",
  requiredMerit: "High",
  rating: 8.8,
  campusCount: 6,
  lat: 31.3977,
  lng: 73.0352,
},

{
  name: "FAST NUCES Multan",
  university: "FAST NUCES",
  universityMatch: "Multan",
  tag: "South Punjab Campus",
  desc: "FAST Multan offers quality education in Computer Science, Artificial Intelligence, Software Engineering, and related fields.",
  color: "#EF4444",
  logo: "/logos/fast.png",
  subjects: [
    "Advanced Mathematics",
    "Basic Mathematics",
    "IQ / Analytical Reasoning",
    "English"
  ],
  difficulty: "Competitive",
  reason: "Excellent option for students across South Punjab looking for FAST's academic standards.",
  budget: "Medium",
  requiredMerit: "High",
  rating: 8.8,
  campusCount: 6,
  lat: 30.1782,
  lng: 71.4885,
},

  // =======================
// COMSATS University Islamabad (CUI)
// =======================

{
  name: "COMSATS Islamabad",
  university: "COMSATS",
  universityMatch: "Islamabad",
  tag: "Flagship Campus",
  desc: "The Islamabad campus is the flagship campus of COMSATS University Islamabad, offering highly ranked programs in Computer Science, Software Engineering, Artificial Intelligence, Data Science, and Cyber Security.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Competitive",
  reason: "Best COMSATS campus for students seeking excellent academics, research opportunities, and strong industry connections.",
  budget: "Medium",
  requiredMerit: "High",
  rating: 9.4,
  campusCount: 7,
  lat: 33.6518,
  lng: 73.1566,
},

{
  name: "COMSATS Lahore",
  university: "COMSATS",
  universityMatch: "Lahore",
  tag: "Top CS Campus",
  desc: "COMSATS Lahore is among Pakistan's leading campuses for computing disciplines with excellent faculty and modern facilities.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Competitive",
  reason: "Excellent choice for students in Punjab looking for quality computing education.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 9.1,
  campusCount: 7,
  lat: 31.4062,
  lng: 74.2545,
},

{
  name: "COMSATS Abbottabad",
  university: "COMSATS",
  universityMatch: "Abbottabad",
  tag: "Established Campus",
  desc: "Abbottabad is one of the oldest COMSATS campuses, offering strong undergraduate and graduate computing programs.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Moderate",
  reason: "Well-established campus with quality academics and a peaceful learning environment.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.7,
  campusCount: 7,
  lat: 34.1926,
  lng: 73.2402,
},

{
  name: "COMSATS Vehari",
  university: "COMSATS",
  universityMatch: "Vehari",
  tag: "South Punjab Campus",
  desc: "COMSATS Vehari provides quality computing education for students across South Punjab.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Moderate",
  reason: "A strong regional campus with affordable education and growing computing programs.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.4,
  campusCount: 7,
  lat: 30.0424,
  lng: 72.3489,
},

{
  name: "COMSATS Wah",
  university: "COMSATS",
  universityMatch: "Wah Cantt",
  tag: "Technology Campus",
  desc: "COMSATS Wah offers quality education in Computer Science and Engineering disciplines for students in northern Punjab.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Moderate",
  reason: "Excellent option for students living near Wah, Taxila, and Rawalpindi.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.3,
  campusCount: 7,
  lat: 33.7662,
  lng: 72.7512,
},

{
  name: "COMSATS Attock",
  university: "COMSATS",
  universityMatch: "Attock",
  tag: "Regional Campus",
  desc: "The Attock campus serves students from northern Punjab with modern facilities and quality computing programs.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Moderate",
  reason: "A good regional option for students looking for COMSATS education closer to home.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.1,
  campusCount: 7,
  lat: 33.7665,
  lng: 72.3599,
},

{
  name: "COMSATS Sahiwal",
  university: "COMSATS",
  universityMatch: "Sahiwal",
  tag: "Growing Campus",
  desc: "COMSATS Sahiwal offers undergraduate computing programs with a modern learning environment and expanding academic facilities.",
  color: "#10B981",
  logo: "/logos/comsats.png",
  subjects: [
    "English",
    "Analytical Reasoning",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
    "Mathematics"
  ],
  difficulty: "Moderate",
  reason: "Suitable for students from Central Punjab looking for a quality public-sector university.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.2,
  campusCount: 7,
  lat: 30.6682,
  lng: 73.1114,
},

 // =======================
// NUST
// =======================

{
  name: "NUST Islamabad",
  university: "NUST",
  universityMatch: "Islamabad",
  tag: "Pakistan's Top University",
  desc: "NUST's Islamabad campus is Pakistan's leading university for engineering, computer science, artificial intelligence, cyber security, and research.",
  color: "#3B82F6",
  logo: "/logos/nust.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Extremely Competitive",
  reason: "Ideal for students seeking world-class education, outstanding campus life, research, and international recognition.",
  budget: "Medium",
  requiredMerit: "High",
  rating: 9.9,
  campusCount: 9,
  lat: 33.6426,
  lng: 72.9906,
},

// =======================
// UET Lahore
// =======================

{
  name: "UET Lahore",
  university: "UET",
  universityMatch: "Lahore",
  tag: "Top Engineering University",
  desc: "The main campus of UET Lahore is one of Pakistan's oldest and most prestigious engineering universities, offering Computer Science, Software Engineering, Computer Engineering, and many engineering disciplines.",
  color: "#F59E0B",
  logo: "/logos/uet.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Competitive",
  reason: "Excellent public-sector choice with affordable tuition and strong employer recognition.",
  budget: "Low",
  requiredMerit: "High",
  rating: 9.0,
  campusCount: 5,
  lat: 31.5797,
  lng: 74.3576,
},

{
  name: "UET Kala Shah Kaku",
  university: "UET",
  universityMatch: "Kala Shah Kaku",
  tag: "New Campus",
  desc: "UET's Kala Shah Kaku campus offers Computer Science, Software Engineering, Biomedical Engineering, and several other modern engineering programs in a purpose-built campus near Lahore.",
  color: "#F59E0B",
  logo: "/logos/uet.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Competitive",
  reason: "A modern UET campus with expanding computing programs and strong academic standards.",
  budget: "Low",
  requiredMerit: "Medium",
  rating: 8.6,
  campusCount: 5,
  lat: 31.7293,
  lng: 74.2732,
},

{
  name: "UET Faisalabad",
  university: "UET",
  universityMatch: "Faisalabad",
  tag: "Regional Campus",
  desc: "UET Faisalabad provides engineering and computing programs for students across Central Punjab.",
  color: "#F59E0B",
  logo: "/logos/uet.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Competitive",
  reason: "Affordable public-sector option with UET's curriculum and reputation.",
  budget: "Low",
  requiredMerit: "Medium",
  rating: 8.4,
  campusCount: 5,
  lat: 31.3960,
  lng: 73.0358,
},

{
  name: "UET Narowal",
  university: "UET",
  universityMatch: "Narowal",
  tag: "Regional Campus",
  desc: "UET Narowal offers quality engineering and computing education with growing academic facilities.",
  color: "#F59E0B",
  logo: "/logos/uet.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Competitive",
  reason: "Great public-sector option for students in northeastern Punjab.",
  budget: "Low",
  requiredMerit: "Medium",
  rating: 8.3,
  campusCount: 5,
  lat: 32.0997,
  lng: 74.8836,
},

{
  name: "UET RCET Gujranwala",
  university: "UET",
  universityMatch: "Gujranwala",
  tag: "Regional Campus",
  desc: "Rachna College of Engineering and Technology (RCET) is a constituent campus of UET Lahore offering engineering and technology programs.",
  color: "#F59E0B",
  logo: "/logos/uet.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Competitive",
  reason: "A good regional UET campus for engineering and technology students.",
  budget: "Low",
  requiredMerit: "Medium",
  rating: 8.3,
  campusCount: 5,
  lat: 32.1877,
  lng: 74.1945,
},

// =======================
// GIKI
// =======================

{
  name: "GIKI",
  university: "GIKI",
  universityMatch: "Topi",
  tag: "Elite Engineering University",
  desc: "Located in Topi, Swabi, GIKI is internationally respected for engineering, computer science, AI, cyber security, and research.",
  color: "#A855F7",
  logo: "/logos/giki.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English"
  ],
  difficulty: "Extremely Competitive",
  reason: "Excellent choice for students seeking high-quality education, research, and industry recognition.",
  budget: "High",
  requiredMerit: "High",
  rating: 9.5,
  campusCount: 1,
  lat: 34.0702,
  lng: 72.6217,
},

// =======================
// PIEAS
// =======================

{
  name: "PIEAS Islamabad",
  university: "PIEAS",
  universityMatch: "Islamabad",
  tag: "Research University",
  desc: "PIEAS is internationally recognized for engineering, computing, and scientific research with highly selective admissions.",
  color: "#0EA5E9",
  logo: "/logos/pieas.png",
  subjects: [
    "Mathematics",
    "Physics",
    "Computer Science",
    "English"
  ],
  difficulty: "Very Competitive",
  reason: "Excellent choice for students interested in engineering, research, and advanced technologies.",
  budget: "Low",
  requiredMerit: "High",
  rating: 9.3,
  campusCount: 1,
  lat: 33.7693,
  lng: 72.8235,
},

// =======================
// ITU
// =======================

{
  name: "ITU Lahore",
  university: "ITU",
  universityMatch: "Lahore",
  tag: "Technology University",
  desc: "Information Technology University (ITU) Lahore specializes in Computer Science, Artificial Intelligence, Data Science, Software Engineering, and related technology fields.",
  color: "#06B6D4",
  logo: "/logos/itu.png",
  subjects: [
    "Basic Mathematics",
    "Analytical Reasoning"
  ],
  difficulty: "Competitive",
  reason: "Excellent technology-focused university with modern curricula and growing industry partnerships.",
  budget: "Low",
  requiredMerit: "Medium",
  rating: 8.9,
  campusCount: 1,
  lat: 31.5497,
  lng: 74.3436,
},

  // =======================
// FCCU
// =======================

{
  name: "FCCU Lahore",
  university: "FCCU",
  universityMatch: "Lahore",
  tag: "Highly Reputed Private University",
  desc: "Forman Christian College (A Chartered University) is one of Pakistan's oldest and most respected universities, offering excellent Computer Science, Software Engineering, Artificial Intelligence, and Data Science programs.",
  color: "#2563EB",
  logo: "/logos/fccu.png",
  subjects: [
    "English",
    "Mathematics",
    "Computer Science",
  ],
  difficulty: "Moderate",
  reason: "Excellent private university with a beautiful campus, strong academics, and an active student life.",
  budget: "High",
  requiredMerit: "Medium",
  rating: 9.1,
  campusCount: 1,
  lat: 31.5589,
  lng: 74.3355,
},

// =======================
// GCU
// =======================

{
  name: "Government College University Lahore",
  university: "GCU",
  universityMatch: "Lahore",
  tag: "Historic Public University",
  desc: "Government College University Lahore is one of Pakistan's oldest universities with strong Computer Science, Mathematics, and research programs.",
  color: "#F59E0B",
  logo: "/logos/gcu.png",
  subjects: [
    "Mathematics",
    "Analytical Reasoning/IQ",
    "English",
  ],
  difficulty: "Competitive",
  reason: "A prestigious and affordable public university with a rich academic tradition.",
  budget: "Low",
  requiredMerit: "High",
  rating: 8.9,
  campusCount: 1,
  lat: 31.5709,
  lng: 74.3093,
},

// =======================
// LUMS
// =======================

{
  name: "LUMS Lahore",
  university: "LUMS",
  universityMatch: "Lahore",
  tag: "Pakistan's Leading Private University",
  desc: "LUMS is internationally recognized for excellence in Computer Science, Artificial Intelligence, Mathematics, Business, and interdisciplinary research.",
  color: "#8B5CF6",
  logo: "/logos/lums.png",
  subjects: [
    "General Knowledge",
    "English",
    "Mathematics"
  ],
  difficulty: "Extremely Competitive",
  reason: "Perfect for students seeking international-quality education, research opportunities, and outstanding career prospects.",
  budget: "High",
  requiredMerit: "High",
  rating: 9.9,
  campusCount: 1,
  lat: 31.4708,
  lng: 74.4098,
},

// =======================
// PUCIT
// =======================

{
  name: "PUCIT Lahore",
  university: "PUCIT",
  universityMatch: "Lahore",
  tag: "Top Public CS Institute",
  desc: "Punjab University College of Information Technology (PUCIT) is widely regarded as one of Pakistan's best public institutes for Computer Science, Software Engineering, Artificial Intelligence, and Information Technology.",
  color: "#16A34A",
  logo: "/logos/pucit.png",
  subjects: [
    "Mathematics",
    "English",
    "Quantitative Reasoning",
    "Physics",
    "Computer Science",
  ],
  difficulty: "Highly Competitive",
  reason: "Excellent choice for students looking for high-quality CS education at affordable public-sector fees.",
  budget: "Low",
  requiredMerit: "High",
  rating: 9.3,
  campusCount: 2,
  lat: 31.5767,
  lng: 74.3076,
},

// =======================
// UCP
// =======================

{
  name: "University of Central Punjab",
  university: "UCP",
  universityMatch: "Lahore",
  tag: "Private University",
  desc: "The University of Central Punjab offers modern programs in Computer Science, Artificial Intelligence, Software Engineering, Cyber Security, and Data Science.",
  color: "#DC2626",
  logo: "/logos/ucp.png",
  subjects: [
    "Mathematics",
    "English",
    "Analytical Reasoning",
    "Computer Science",
  ],
  difficulty: "Easy to Moderate",
  reason: "A solid private-sector option with modern facilities and flexible admissions.",
  budget: "Medium",
  requiredMerit: "Low",
  rating: 8.2,
  campusCount: 1,
  lat: 31.4296,
  lng: 74.2645,
},

// =======================
// UMT
// =======================

{
  name: "University of Management and Technology",
  university: "UMT",
  universityMatch: "Lahore",
  tag: "Private Technology University",
  desc: "UMT offers a wide range of computing degrees including Computer Science, Artificial Intelligence, Software Engineering, Data Science, and Cyber Security.",
  color: "#14B8A6",
  logo: "/logos/umt.png",
  subjects: [
    "Mathematics",
    "English",
  ],
  difficulty: "Easy to Moderate",
  reason: "Well-equipped private university with strong industry collaborations and modern computing labs.",
  budget: "High",
  requiredMerit: "Low",
  rating: 8.4,
  campusCount: 1,
  lat: 31.4509,
  lng: 74.2934,
},

// =======================
// University of Lahore
// =======================

{
  name: "University of Lahore",
  university: "UOL",
  universityMatch: "Lahore",
  tag: "Large Private University",
  desc: "The University of Lahore is one of Pakistan's largest private universities, offering numerous computing programs including Computer Science, Artificial Intelligence, Software Engineering, Cyber Security, and Information Technology.",
  color: "#EC4899",
  logo: "/logos/uol.png",
  subjects: [
    "Mathematics",
    "English",
    "Analytical Reasoning",
    "Computer Science",
    "Physics",
  ],
  difficulty: "Easy to Moderate",
  reason: "Good choice for students seeking a large campus, modern facilities, and flexible admissions.",
  budget: "Medium",
  requiredMerit: "Low",
  rating: 8.3,
  campusCount: 7,
  lat: 31.4018,
  lng: 74.2412,
},

// =======================
// AIR UNIVERSITY
// =======================

{
  name: "Air University Islamabad",
  university: "Air University",
  universityMatch: "Islamabad",
  tag: "Top Computing University",
  desc: "Air University Islamabad is one of Pakistan's leading universities for Computer Science, Artificial Intelligence, Cyber Security, Software Engineering, and Data Science.",
  color: "#2563EB",
  logo: "/logos/air.png",
  subjects: [
    "Mathematics",
    "English",
    "Physics"
  ],
  difficulty: "Competitive",
  reason: "Excellent university with strong industry reputation and computing programs.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 9.2,
  campusCount: 3,
  lat: 33.7134,
  lng: 73.0245,
},

{
  name: "Air University Multan",
  university: "Air University",
  universityMatch: "Multan",
  tag: "Regional Campus",
  desc: "Offers quality computing and engineering programs for South Punjab.",
  color: "#2563EB",
  logo: "/logos/air.png",
  subjects: [
    "Mathematics",
    "English",
    "Physics"
  ],
  difficulty: "Moderate",
  reason: "Strong regional option with modern facilities.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.5,
  campusCount: 3,
  lat: 30.1815,
  lng: 71.4924,
},

{
  name: "Air University Kamra",
  university: "Air University",
  universityMatch: "Kamra",
  tag: "Aerospace Campus",
  desc: "Known for aerospace, engineering, and computing disciplines.",
  color: "#2563EB",
  logo: "/logos/air.png",
  subjects: [
    "Mathematics",
    "English",
    "Physics"
  ],
  difficulty: "Moderate",
  reason: "Excellent engineering-focused campus.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.3,
  campusCount: 3,
  lat: 33.8694,
  lng: 72.4004,
},

// =======================
// BAHRIA UNIVERSITY
// =======================

{
  name: "Bahria University Islamabad",
  university: "Bahria",
  universityMatch: "Islamabad",
  tag: "Popular Private University",
  desc: "Offers highly respected Computer Science, Software Engineering, Artificial Intelligence, and Cyber Security programs.",
  color: "#0F766E",
  logo: "/logos/bahria.png",
  subjects: [
    "Mathematics",
    "English",
    "Physics",
    "Analytical Reasoning",
    "Quantitative Reasoning",
  ],
  difficulty: "Moderate",
  reason: "Strong computing programs with excellent campus facilities.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.9,
  campusCount: 3,
  lat: 33.6602,
  lng: 73.0728,
},

{
  name: "Bahria University Lahore",
  university: "Bahria",
  universityMatch: "Lahore",
  tag: "Growing Campus",
  desc: "Modern campus offering quality computing degrees.",
  color: "#0F766E",
  logo: "/logos/bahria.png",
  subjects: [
    "Mathematics",
    "English",
    "Physics",
    "Analytical Reasoning",
    "Quantitative Reasoning",
  ],
  difficulty: "Moderate",
  reason: "Good option for students in Lahore.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.4,
  campusCount: 3,
  lat: 31.4628,
  lng: 74.2654,
},

{
  name: "Bahria University Karachi",
  university: "Bahria",
  universityMatch: "Karachi",
  tag: "Major Campus",
  desc: "One of the largest Bahria campuses with excellent computing facilities.",
  color: "#0F766E",
  logo: "/logos/bahria.png",
  subjects: [
    "Mathematics",
    "English",
    "Physics",
    "Analytical Reasoning",
    "Quantitative Reasoning",
  ],
  difficulty: "Moderate",
  reason: "Excellent private option in Karachi.",
  budget: "Medium",
  requiredMerit: "Medium",
  rating: 8.8,
  campusCount: 3,
  lat: 24.8598,
  lng: 67.0696,
},

// =======================
// NED
// =======================

{
  name: "NED University Karachi",
  university: "NED",
  universityMatch: "Karachi",
  tag: "Top Public Engineering University",
  desc: "One of Pakistan's leading public universities for engineering and Computer Science.",
  color: "#EA580C",
  logo: "/logos/ned.png",
  subjects: [
    "Mathematics",
    "Physics",
    "English",
    "Computer Science"
  ],
  difficulty: "Highly Competitive",
  reason: "Excellent public-sector university with strong employer recognition.",
  budget: "Low",
  requiredMerit: "High",
  rating: 9.3,
  campusCount: 1,
  lat: 24.9312,
  lng: 67.1138,
},

// =======================
// SZABIST
// =======================

{
  name: "SZABIST Karachi",
  university: "SZABIST",
  universityMatch: "Karachi",
  tag: "Private Technology University",
  desc: "Well-known private university offering Computer Science, AI, Data Science, and Software Engineering.",
  color: "#7C3AED",
  logo: "/logos/szabist.png",
  subjects: [
    "Mathematics",
    "English",
    "Computer Science"
  ],
  difficulty: "Moderate",
  reason: "Excellent private-sector university with strong computing programs.",
  budget: "High",
  requiredMerit: "Medium",
  rating: 8.8,
  campusCount: 5,
  lat: 24.8608,
  lng: 67.0715,
},
];

function distanceKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;

  const x =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;

  return Math.round(R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x)));
}

function getMeritLevel(value: string): Merit {
  const percent = Number(value);
  if (percent >= 75) return "High";
  if (percent >= 60) return "Medium";
  return "Low";
}

function meritScore(studentMerit: Merit, requiredMerit: Merit) {
  const order = { Low: 1, Medium: 2, High: 3 };
  if (order[studentMerit] >= order[requiredMerit]) return 35;
  if (order[studentMerit] + 1 === order[requiredMerit]) return 14;
  return 0;
}

function budgetScore(userBudget: Budget, uniBudget: Budget) {
  if (userBudget === uniBudget) return 25;
  if (userBudget === "High" && uniBudget !== "High") return 18;
  if (userBudget === "Medium" && uniBudget === "Low") return 18;
  return 5;
}


type Group = "Top" | "Safe" | "Reach" | "Nearby";

export default function UniversityMatch() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [city, setCity] = useState<City>("Lahore");
  const [budget, setBudget] = useState<Budget>("Medium");
  const [meritPercentage, setMeritPercentage] = useState("");
  const [result, setResult] = useState<RankedUniversity | null>(null);
  const [showAll, setShowAll] = useState(false);
  const [activeGroup, setActiveGroup] = useState<Group>("Top");
  const [error, setError] = useState("");
  const [examDate, setExamDate] = useState("");
  const [dailyMinutes, setDailyMinutes] = useState(90);
  const [weakSubjects, setWeakSubjects] = useState<string[]>([]);
  const [planReady, setPlanReady] = useState(false);
  const studentMerit = getMeritLevel(meritPercentage || "0");

  const getScoreBreakdown = (uni: University) => {
    const distance = distanceKm(cityCoords[city], { lat: uni.lat, lng: uni.lng });
    const location = uni.universityMatch === city ? 40 : Math.max(0, 20 - Math.round(distance / 35));
    const merit = meritScore(studentMerit, uni.requiredMerit);
    const budgetPoints = budgetScore(budget, uni.budget);
    const reputation = Math.round(uni.rating);
    return { distance, location, merit, budget: budgetPoints, reputation,
      total: Math.min(100, location + merit + budgetPoints + reputation) };
  };

  const rankedUniversities: RankedUniversity[] = useMemo(() => universities.map((uni) => {
    const breakdown = getScoreBreakdown(uni);
    return { ...uni, distance: breakdown.distance, meritLevel: studentMerit, matchScore: breakdown.total };
  }).sort((a, b) => b.matchScore - a.matchScore || b.rating - a.rating), [city, budget, studentMerit]);

  const groupedUniversities = useMemo(() => rankedUniversities.filter((uni) => {
    if (activeGroup === "Safe") return meritScore(studentMerit, uni.requiredMerit) === 35;
    if (activeGroup === "Reach") return meritScore(studentMerit, uni.requiredMerit) < 35;
    if (activeGroup === "Nearby") return uni.distance <= 35 || uni.universityMatch === city;
    return true;
  }), [rankedUniversities, activeGroup, studentMerit, city]);
  const visibleUniversities = showAll ? groupedUniversities : groupedUniversities.slice(0, 6);
  const bestUniversity = result;
  const bestBreakdown = bestUniversity ? getScoreBreakdown(bestUniversity) : null;
  const prepSubjects = bestUniversity?.subjects || [];
  const today = new Date();
  const todayLocal = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  const daysRemaining = examDate
    ? Math.ceil((new Date(`${examDate}T12:00:00`).getTime() - new Date(`${todayLocal}T12:00:00`).getTime()) / 86400000)
    : 0;
  const validPlan = !!bestUniversity && !!examDate && daysRemaining > 0 && dailyMinutes >= 30;
  const planDays = validPlan ? Math.min(daysRemaining, 28) : 0;
  const prioritySubjects = [...prepSubjects].sort((a, b) =>
    Number(weakSubjects.includes(b)) - Number(weakSubjects.includes(a))
  );
  const subjectMinutes = Math.max(15, Math.floor(dailyMinutes * 0.65));
  const practiceMinutes = Math.max(10, Math.floor(dailyMinutes * 0.25));
  const reviewMinutes = Math.max(5, dailyMinutes - subjectMinutes - practiceMinutes);
  const prepPlan = Array.from({ length: planDays }, (_, index) => {
    const day = index + 1;
    const subject = prioritySubjects[index % prioritySubjects.length];
    const isMockDay = day % 7 === 0 || day === planDays;
    const phase = day <= Math.ceil(planDays * 0.35) ? "Build foundations" :
      day <= Math.ceil(planDays * 0.75) ? "Timed practice" : "Exam readiness";
    return {
      day,
      date: new Date(new Date(`${todayLocal}T12:00:00`).getTime() + index * 86400000)
        .toLocaleDateString("en-PK", { month: "short", day: "numeric" }),
      subject,
      phase,
      text: isMockDay
        ? `Take a timed ${bestUniversity?.university || "entry-test"} practice test covering ${prepSubjects.join(", ")}. Review every missed or guessed question and record the topics to revisit.`
        : `${subjectMinutes} min: ${weakSubjects.includes(subject) ? "rebuild weak concepts and solve worked examples in" : "revise key concepts and formulas for"} ${subject}. ${practiceMinutes} min: ${phase === "Build foundations" ? "solve topic-based questions" : "solve timed questions"}. ${reviewMinutes} min: check errors and note what to revise tomorrow.`
    };
  });
  const resetResult = () => { setResult(null); setShowAll(false); setError(""); setPlanReady(false); setWeakSubjects([]); };
  const findBestUniversity = () => {
    const percent = Number(meritPercentage);
    if (!meritPercentage.trim() || !Number.isFinite(percent) || percent < 0 || percent > 100) {
      setError("Enter a merit percentage between 0 and 100.");
      return;
    }
    setError("");
    setResult(rankedUniversities[0]);
    setShowAll(false);
  };
  const formatDistance = (distance: number) => distance <= 20 ? `${distance} km away` : distance <= 80 ? `${distance} km from your city` : "Outside your city";
  const meritFit = (uni: RankedUniversity) => meritScore(studentMerit, uni.requiredMerit) === 35 ? "Meets merit band" : "Below merit band";

  return <MainLayout>
    <div className={`um-page ${isDark ? "um-dark" : "um-light"}`}>
      <header className="um-top"><div><p className="um-eyebrow">University Match</p><h1>Find Your University Match</h1></div><button className="um-secondary" onClick={() => navigate("/universities")}>View All Universities <ArrowRight size={16}/></button></header>
      <section className="um-hero"><div className="um-glow"/><div className="um-hero-copy"><span className="um-hero-badge"><GraduationCap size={16}/> Smart recommendation engine</span><h2>Explore universities based on your city, merit, and budget.</h2><p>Compare campus options using location, merit band, budget, and an illustrative match score.</p></div><div className="um-campus-count"><span>Campus options</span><strong>{universities.length}</strong></div></section>
      <div className="um-main-grid">
        <section className="um-panel"><h2 className="um-heading"><UserRound/> Your Details</h2><div className="um-fields"><label>City<select value={city} onChange={(e) => { setCity(e.target.value as City); resetResult(); }}>{Object.keys(cityCoords).map((c) => <option key={c} value={c}>{c}</option>)}</select></label><label>Budget<select value={budget} onChange={(e) => { setBudget(e.target.value as Budget); resetResult(); }}><option>Low</option><option>Medium</option><option>High</option></select></label><label className="um-merit">Your Merit Percentage<input type="number" min="0" max="100" value={meritPercentage} onChange={(e) => { setMeritPercentage(e.target.value); resetResult(); }} placeholder="Example: 78" /></label></div><p className="um-help">75+ = High merit, 60–74 = Medium merit, below 60 = Low merit.</p>{error && <p className="um-error" role="alert">{error}</p>}<button className="um-primary" onClick={findBestUniversity}>Find University Match <ArrowRight size={16}/></button></section>
        <section className="um-panel"><h2 className="um-heading"><Trophy/> Your Match</h2><p className="um-subtitle">Your highest-scoring campus appears here after you enter your details.</p>{!bestUniversity ? <div className="um-empty"><Trophy size={38}/><strong>Enter your details first</strong><p>Add your merit percentage and click Find University Match.</p></div> : <><div className="um-best-head"><img src={bestUniversity.logo} alt=""/><div><span className="um-chip">Highest match score</span><h3>{bestUniversity.name}</h3><p>{bestUniversity.tag}</p></div></div><p className="um-subtitle">{bestUniversity.reason}</p><div className="um-score-row"><div className="um-ring" style={{ background: `conic-gradient(var(--um-accent) ${bestUniversity.matchScore}%, var(--um-line) 0)` }}><span>{bestUniversity.matchScore}%</span></div><div className="um-breakdown">{bestBreakdown && <><div><span>Location</span><strong>{bestBreakdown.location}/40</strong></div><div><span>Merit band</span><strong>{bestBreakdown.merit}/35</strong></div><div><span>Budget</span><strong>{bestBreakdown.budget}/25</strong></div><div><span>Rating component</span><strong>{bestBreakdown.reputation}/10</strong></div></>}</div></div><div className="um-info">{[["Campus",bestUniversity.universityMatch],["Budget",bestUniversity.budget],["Required merit",bestUniversity.requiredMerit],["Listed rating",`${bestUniversity.rating}/10`]].map(([label,value]) => <div key={label}><small>{label}</small><strong>{value}</strong></div>)}</div><h3>Entry Test Subjects</h3><div className="um-subjects">{bestUniversity.subjects.map((subject) => <span key={subject}>{subject}</span>)}</div></>}</section>
      </div>
      <section className="um-panel um-recommend"><div className="um-section-top"><div><h2 className="um-heading"><GraduationCap/> Recommended Universities</h2><p className="um-subtitle">Explore options using your selected city, budget, and merit band.</p></div><button className="um-secondary" onClick={() => setShowAll((v) => !v)}>{showAll ? "Show Top Results" : `Show All ${groupedUniversities.length} Campus Options`}</button></div><div className="um-tabs">{(["Top","Safe","Reach","Nearby"] as Group[]).map((tab) => <button key={tab} className={activeGroup === tab ? "um-active" : ""} onClick={() => { setActiveGroup(tab); setShowAll(false); }}>{tab}</button>)}</div><div className="um-recommend-grid">{visibleUniversities.map((uni) => <article key={uni.name} className="um-uni-card"><div className="um-uni-head"><img src={uni.logo} alt=""/><div><h3>{uni.name}</h3><p>{uni.university}</p></div><span className="um-arrow"><ChevronRight size={18}/></span></div><div className="um-meta"><span><MapPin/> {uni.universityMatch}</span><span><Route/> {formatDistance(uni.distance)}</span><span><Wallet/> Budget: {uni.budget}</span><span><Target/> Required merit: {uni.requiredMerit}</span><span><Building2/> Campuses: {uni.campusCount}</span><span><Star/> Listed rating: {uni.rating}/10</span></div><div className="um-score-line"><span>Match score</span><strong>{uni.matchScore}%</strong></div><div className="um-chip">{meritFit(uni)}</div><div className="um-reason"><strong>Why this matches</strong><div>{uni.universityMatch === city && <span><MapPin/> Same city</span>}{budget === uni.budget && <span><Wallet/> Budget fit</span>}{studentMerit === uni.requiredMerit && <span><Target/> Merit-band fit</span>}<span><Star/> {uni.rating}/10 listed rating</span></div></div><div className="um-card-actions"><button onClick={() => navigate("/universities")}>View Universities</button><button onClick={() => navigate("/mock-test")}>Start Preparation</button></div></article>)}</div>{visibleUniversities.length === 0 && <div className="um-empty"><strong>No universities in this filter</strong><p>Try the Top or Nearby filter.</p></div>}</section>
      <section className="um-panel um-prep"><h2 className="um-heading"><BookOpen/> Your Preparation Plan</h2>
        <p className="um-subtitle">Build a study schedule around your matched university’s listed subjects, exam date, available time, and subjects you find difficult.</p>
         {!bestUniversity ? <div className="um-empty"><BookOpen size={30}/><strong>Find your university match first</strong><p>Enter your details above to select the subjects for your plan.</p></div> : <>
           <div className="um-plan-form">
             <label>Target exam date<input type="date" min={todayLocal} value={examDate} onChange={(e) => {setExamDate(e.target.value);setPlanReady(false);}} /></label>
             <label>Study time per day<select value={dailyMinutes} onChange={(e) => {setDailyMinutes(Number(e.target.value));setPlanReady(false);}}><option value={30}>30 minutes</option><option value={60}>1 hour</option><option value={90}>1.5 hours</option><option value={120}>2 hours</option><option value={180}>3 hours</option><option value={240}>4 hours</option></select></label>
             <fieldset><legend>Which subjects need extra attention?</legend><div className="um-weak-grid">{prepSubjects.map((subject) => <label key={subject}><input type="checkbox" checked={weakSubjects.includes(subject)} onChange={(e) => {setWeakSubjects((current) => e.target.checked ? [...current,subject] : current.filter((x) => x !== subject));setPlanReady(false);}} />{subject}</label>)}</div><small>Optional. Selected subjects appear earlier and more often when there is time.</small></fieldset>
           </div>
           {examDate && daysRemaining <= 0 && <p className="um-error" role="alert">Choose a future exam date.</p>}
           <button className="um-primary" disabled={!validPlan} onClick={() => setPlanReady(true)}>Generate My Study Plan <ArrowRight size={16}/></button>
           {planReady && validPlan && <><p className="um-plan-summary">{planDays}-day schedule · {dailyMinutes} minutes/day · {bestUniversity.name} · {daysRemaining > 28 ? "Showing the next 28 days; regenerate later for the remaining days." : "Runs until your target exam date."}</p>
             <div className="um-plan-grid">{prepPlan.map((step) => <article className="um-plan-step" key={step.day}><div className="um-plan-step-head"><strong>Day {step.day} · {step.date}</strong><span>{step.phase}</span></div><h3>{step.day % 7 === 0 || step.day === planDays ? "Practice test & review" : step.subject}</h3><p>{step.text}</p></article>)}</div>
            <p className="um-help">This is a practice schedule based on your inputs, not an official syllabus or a diagnosis of your strengths. Adjust it after reviewing your mock-test results.</p>
           </>}
         </>}
         <div className="um-footer-actions"><button className="um-secondary" onClick={() => navigate("/mock-test")}>Start Mock Test <ArrowRight size={16}/></button><button className="um-secondary" onClick={() => navigate("/universities")}>View Universities</button></div>
       </section>
      <p className="um-disclaimer">Match scores and merit bands are illustrative, not official admission eligibility or admission probabilities. Check each university’s current program requirements, fees, and entry-test rules before applying.</p>
    </div>
    <style>{`
      .um-page{--um-bg:${isDark?'#09070F':'#F4F4FA'};--um-panel:${isDark?'#1C1426':'#FFFFFF'};--um-soft:${isDark?'#241B30':'#FAF8FE'};--um-text:${isDark?'#FFFFFF':'#15111C'};--um-muted:${isDark?'#C8BCD3':'#6E6476'};--um-line:${isDark?'rgba(171,132,255,.12)':'#E4DDED'};--um-accent:#8B5CF6;--um-icon:${isDark?'#C4A5FF':'#6D28D9'};background:var(--um-bg);color:var(--um-text);min-height:100vh;padding:32px 40px;box-sizing:border-box;font-family:inherit}
      .um-page *{box-sizing:border-box}.um-page button,.um-page select,.um-page input{font:inherit}.um-page button{cursor:pointer}.um-top,.um-section-top{display:flex;justify-content:space-between;align-items:center;gap:16px}.um-top{margin-bottom:20px}.um-top h1{font-size:30px;margin:4px 0;font-weight:700}.um-eyebrow{font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:var(--um-icon);font-weight:700;margin:0}.um-hero{background:linear-gradient(115deg,#2A1644,#5122A2 65%,#5149E7);border-radius:26px;min-height:210px;padding:30px 34px;display:flex;align-items:center;justify-content:space-between;gap:25px;position:relative;overflow:hidden;margin-bottom:20px;color:white}.um-hero:before{content:"";position:absolute;width:230px;height:230px;border-radius:50%;right:-70px;top:-110px;background:#ffffff24}.um-glow{position:absolute;width:170px;height:170px;border-radius:50%;left:52%;bottom:-120px;background:#ffffff16}.um-hero-copy{position:relative;z-index:1;max-width:780px}.um-hero-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border:1px solid #ffffff33;border-radius:100px;background:#ffffff20;font-weight:700;font-size:13px}.um-hero h2{font-size:clamp(25px,3vw,37px);line-height:1.17;margin:14px 0;font-weight:700}.um-hero p{line-height:1.5;margin:0;color:#f0eaff}.um-campus-count{z-index:1;min-width:175px;padding:22px;border:1px solid #ffffff40;background:#ffffff22;border-radius:22px;display:grid;gap:8px;text-align:center}.um-campus-count strong{font-size:40px}.um-main-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px;align-items:start}.um-panel{background:var(--um-panel);border:1px solid var(--um-line);border-radius:23px;padding:24px;margin-bottom:20px;min-width:0;box-shadow:0 8px 24px #0000000c}.um-heading{font-size:22px;display:flex;align-items:center;gap:12px;margin:0 0 12px;font-weight:700}.um-heading svg,.um-empty svg,.um-meta svg,.um-reason svg{color:var(--um-icon);flex-shrink:0}.um-heading svg{width:24px;height:24px}.um-subtitle{color:var(--um-muted);line-height:1.55;margin:0 0 16px}.um-fields{display:grid;grid-template-columns:1fr 1fr;gap:15px}.um-fields label{font-size:14px;font-weight:650;display:grid;gap:8px;min-width:0}.um-fields .um-merit{grid-column:1/-1}.um-fields input,.um-fields select{width:100%;min-width:0;border:1px solid var(--um-line);border-radius:14px;padding:13px 14px;background:var(--um-soft);color:var(--um-text);outline-offset:2px}.um-help{
  color:var(--um-muted);
  font-size:12px;
  line-height:1.5;
  margin:10px 0 18px;
}.um-error{color:#e879a8;font-size:13px}.um-primary,.um-secondary{border-radius:13px;border:1px solid transparent;padding:12px 17px;font-weight:650;display:inline-flex;align-items:center;justify-content:center;gap:8px}.um-primary{color:white;background:linear-gradient(120deg,#7C3AED,#5B21B6)}.um-secondary{background:var(--um-soft);border-color:var(--um-line);color:var(--um-text)}.um-empty{min-height:180px;border:1px dashed var(--um-line);border-radius:18px;background:var(--um-soft);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:9px;text-align:center;padding:22px}.um-empty p{margin:0;color:var(--um-muted)}.um-best-head{display:flex;align-items:center;gap:14px;margin:18px 0}.um-best-head img{width:64px;height:64px;object-fit:contain;background:white;border-radius:14px;padding:8px}.um-best-head h3{font-size:20px;margin:7px 0 3px}.um-best-head p,.um-uni-head p{margin:0;color:var(--um-muted)}.um-chip{display:inline-flex;width:fit-content;background:${isDark?'#392453':'#F0E9FF'};color:var(--um-icon);border-radius:999px;padding:6px 10px;font-size:12px;font-weight:650}.um-score-row{display:flex;align-items:center;gap:20px;flex-wrap:wrap;margin:18px 0}.um-ring{width:112px;height:112px;border-radius:50%;display:grid;place-items:center;flex-shrink:0}.um-ring span{width:82px;height:82px;border-radius:50%;background:var(--um-panel);display:grid;place-items:center;font-size:23px;font-weight:700}.um-breakdown{flex:1;min-width:160px;display:grid;gap:9px}.um-breakdown div{display:flex;justify-content:space-between;gap:10px}.um-info{display:grid;grid-template-columns:1fr 1fr;gap:10px}.um-info div{background:var(--um-soft);border:1px solid var(--um-line);border-radius:13px;padding:12px;display:grid;gap:5px}.um-info small{color:var(--um-muted)}.um-subjects{display:flex;gap:7px;flex-wrap:wrap}.um-subjects span{padding:7px 10px;border-radius:100px;background:var(--um-soft);border:1px solid var(--um-line);font-size:13px}.um-section-top{align-items:flex-start;margin-bottom:14px}.um-tabs{display:flex;gap:9px;flex-wrap:wrap;margin-bottom:16px}.um-tabs button{background:var(--um-soft);border:1px solid var(--um-line);color:var(--um-text);border-radius:100px;padding:8px 16px;font-weight:700}.um-tabs .um-active{background:#7135D9;color:white;border-color:#7135D9}.um-recommend-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.um-uni-card{background:var(--um-soft);border:1px solid var(--um-line);border-left:3px solid var(--um-accent);border-radius:17px;padding:16px;display:flex;flex-direction:column;gap:13px;min-width:0;transition:transform .2s,box-shadow .2s}.um-uni-card:hover{transform:translateY(-2px);box-shadow:0 12px 28px #4c1d951a}.um-uni-head{display:flex;align-items:center;gap:10px;min-width:0}.um-uni-head img{width:50px;height:50px;object-fit:contain;padding:6px;background:white;border-radius:12px;flex-shrink:0}.um-uni-head>div{min-width:0;flex:1}.um-uni-head h3{font-size:15px;margin:0 0 5px;line-height:1.35}.um-arrow{color:var(--um-icon);background:${isDark?'#392453':'#F0E9FF'};border-radius:50%;padding:7px;display:flex}.um-meta{display:grid;grid-template-columns:1fr 1fr;gap:10px 8px;font-size:13px}.um-meta span{display:flex;align-items:center;gap:6px;min-width:0}.um-meta svg,.um-reason svg{width:15px;height:15px}.um-score-line{display:flex;justify-content:space-between;gap:10px;color:var(--um-icon);font-weight:700}.um-reason{background:${isDark?'#2D203E':'#F3EDFF'};border-radius:13px;padding:12px;font-size:13px}.um-reason>div{display:flex;flex-wrap:wrap;gap:10px;margin-top:9px}.um-reason span{display:inline-flex;align-items:center;gap:4px}.um-card-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:auto}.um-card-actions button{background:${isDark?'#4C1D95':'#6D28D9'};border:0;border-radius:11px;color:white;padding:10px 12px;font-size:13px;font-weight:650}.um-plan-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:18px}.um-plan-step{background:${isDark?'#2C1D43':'#F1EAFF'};border:1px solid var(--um-line);border-radius:16px;padding:17px;line-height:1.55}.um-plan-step strong{color:var(--um-icon)}.um-plan-step p{margin:8px 0 0}.um-plan-step h3{font-size:16px;margin:10px 0 0}.um-plan-step-head{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap}.um-plan-step-head span{font-size:12px;color:var(--um-muted)}.um-plan-summary{color:var(--um-muted);line-height:1.5}.um-plan-form{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:18px 0}.um-plan-form>label{display:grid;gap:8px;font-weight:650}.um-plan-form input[type=date],.um-plan-form select{width:100%;min-width:0;border:1px solid var(--um-line);border-radius:12px;padding:12px;background:var(--um-soft);color:var(--um-text);font:inherit}.um-plan-form fieldset{grid-column:1/-1;border:1px solid var(--um-line);border-radius:14px;padding:14px;min-width:0}.um-plan-form legend{font-weight:700;padding:0 6px}.um-weak-grid{display:flex;gap:10px;flex-wrap:wrap;margin:8px 0}.um-weak-grid label{display:inline-flex;align-items:center;gap:7px;background:var(--um-soft);border:1px solid var(--um-line);border-radius:100px;padding:8px 12px;font-size:13px}.um-weak-grid input{accent-color:var(--um-accent)}.um-plan-form small{color:var(--um-muted)}.um-primary:disabled{opacity:.5;cursor:not-allowed}.um-footer-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.um-disclaimer{font-size:12px;line-height:1.5;color:var(--um-muted);margin:0 0 10px}
      @media(max-width:1200px){.um-recommend-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:1050px){.um-main-grid{grid-template-columns:1fr}.um-plan-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:720px){.um-page{padding:22px 14px}.um-top,.um-section-top,.um-hero{flex-direction:column;align-items:stretch}.um-campus-count{min-width:0}.um-recommend-grid{grid-template-columns:1fr}.um-hero{padding:26px}.um-top h1{font-size:26px}}@media(max-width:480px){.um-fields,.um-info,.um-plan-grid,.um-meta,.um-plan-form{grid-template-columns:1fr}.um-panel{padding:18px}.um-heading{font-size:20px}.um-section-top .um-secondary{width:100%}}
    `}</style>
  </MainLayout>;
}
