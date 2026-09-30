import type { Subject, Question } from "./types";

import { Questions as advancedMathematicsQuestions } from "./AdvancedMathematics";
import { Questions as basicMathematicsQuestions } from "./BasicMathematics";
import { Questions as IQQuestions } from "./IQ";
import { Questions as analyticalReasoningQuestions } from "./AnalyticalReasoning";
import { Questions as quantitativeReasoningQuestions } from "./QuantitativeReasoning";
import { Questions as computerScienceQuestions } from "./ComputerScience";
import { Questions as physicsQuestions } from "./Physics";
import { Questions as englishQuestions } from "./English";

export const questionBank: Record<Subject, Question[]> = {
  "Advanced Mathematics": advancedMathematicsQuestions,
  "Basic Mathematics": basicMathematicsQuestions,
  "IQ": IQQuestions,
  "Analytical Reasoning": analyticalReasoningQuestions,
  "Quantitative Reasoning": quantitativeReasoningQuestions,
  "Computer Science": computerScienceQuestions,
  "Physics": physicsQuestions,
  "English": englishQuestions,
};

export type { Subject, Question };