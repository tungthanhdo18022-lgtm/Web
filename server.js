import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

app.use(express.json({ limit: '2mb' }));

// Helper to get GoogleGenAI client with required User-Agent
function getAI() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not configured on the server. Please set it in your environment.');
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Generate content with resilient fallback across approved models if one experiences high demand
async function generateWithFallback(ai, params) {
  const models = ['gemini-3.8-flash', 'gemini-flash-latest', 'gemini-3.1-flash-lite'];
  let lastErr = null;
  for (const model of models) {
    try {
      return await ai.models.generateContent({
        ...params,
        model,
      });
    } catch (err) {
      lastErr = err;
      const msg = String(err?.message || '');
      const isTransient = msg.includes('503') || msg.includes('high demand') || msg.includes('UNAVAILABLE') || msg.includes('RESOURCE_EXHAUSTED');
      if (!isTransient) {
        throw err;
      }
      console.warn(`[AI Studio] Model ${model} returned transient error (${msg.slice(0, 80)}...), trying next model...`);
    }
  }
  throw lastErr;
}

// -------------------------------------------------------------
// AI API Endpoints
// -------------------------------------------------------------

// 1. AI Hint (Progressive hints for practice and exam)
app.post('/api/ai/hint', async (req, res) => {
  try {
    const { question, level = 1, userAnswer = null } = req.body;
    if (!question || !question.prompt) {
      return res.status(400).json({ error: 'Missing question details' });
    }

    const ai = getAI();
    let instruction = '';
    if (level === 1) {
      instruction = `Provide Level 1 hint: Identify the core mathematical concept, definition, or primary formula needed for this problem. DO NOT give away the solving steps or final answer. Keep it to 2-3 encouraging sentences.`;
    } else if (level === 2) {
      instruction = `Provide Level 2 hint: Provide the mathematical setup or key equation. Show how to start setting up the variables or diagram. DO NOT give the final numerical answer.`;
    } else {
      instruction = `Provide Level 3 hint: Walk through the key mathematical deductions and equations. Explain the reasoning clearly, and also mention how the Desmos calculator could be used to check or solve it. Provide the complete solution and final answer.`;
    }

    const promptText = `You are an expert Digital SAT Math tutor.
Question:
Domain: ${question.domain || 'Digital SAT Math'}
Prompt:
${question.prompt}

${question.type === 'mcq' && question.choices ? `Choices:\n${question.choices.map((c, i) => `${'ABCD'[i]}. ${c}`).join('\n')}` : ''}
${question.answer ? `Correct Answer: ${JSON.stringify(question.answer)}` : ''}
${userAnswer ? `Student's Current Attempt / Answer: ${userAnswer}` : ''}

Task: ${instruction}
Format rules:
- Use LaTeX for all math expressions (e.g. $x^2 - 4x + 4 = 0$ or $$...$$ for display math).
- Use clear markdown formatting.`;

    const response = await generateWithFallback(ai, {
      contents: promptText,
      config: {
        systemInstruction: 'You are an elite Digital SAT Math coach. You guide students with pedagogy, clarity, and precision. Always format math expressions with standard LaTeX ($...$ for inline, $$...$$ for block math).',
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('AI Hint Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate AI hint' });
  }
});

// 2. AI Explanation & Breakdown (Full solution, Desmos shortcut, or mistake diagnosis)
app.post('/api/ai/explain', async (req, res) => {
  try {
    const { question, mode = 'full', userAnswer = null } = req.body;
    if (!question || !question.prompt) {
      return res.status(400).json({ error: 'Missing question details' });
    }

    const ai = getAI();
    let modeInstruction = '';
    if (mode === 'desmos') {
      modeInstruction = `Focus primarily on the DESMOS GRAPHING CALCULATOR method for this Digital SAT Math problem:
1. Exact expressions or equations to type into Desmos.
2. What features to use (sliders, table, intersection points, zeros, regression).
3. Any speed tricks or time-saving shortcuts.
4. When to prefer Desmos vs algebra on test day.`;
    } else if (mode === 'why_wrong') {
      modeInstruction = `The student selected answer: "${userAnswer || 'Unknown'}".
The correct answer is: "${JSON.stringify(question.answer)}".
1. Diagnose why this incorrect answer is a common trap or misconception (e.g. sign error, forgetting to solve for 2x instead of x, confusing diameter and radius, extraneous solutions).
2. Contrast the student's likely train of thought with the correct approach.
3. Provide a tip to avoid falling for this trap on the real SAT.`;
    } else {
      modeInstruction = `Provide a comprehensive SAT Math explanation:
1. **Key Concept & Domain**: Identify what College Board tests here.
2. **Standard Algebraic Solution**: Clean, step-by-step mathematical derivation.
3. **Desmos / Fast Strategy**: Alternative shortcut method (Desmos calculator or plugging in numbers).
4. **Takeaway & Pro Tip**: A memorable rule for test day.`;
    }

    const promptText = `Question:
Domain: ${question.domain || 'Digital SAT Math'}
Prompt:
${question.prompt}

${question.type === 'mcq' && question.choices ? `Choices:\n${question.choices.map((c, i) => `${'ABCD'[i]}. ${c}`).join('\n')}` : ''}
${question.answer ? `Correct Answer: ${JSON.stringify(question.answer)}` : ''}
${question.explanation ? `Provided base explanation:\n${question.explanation}` : ''}

${modeInstruction}

Formatting rules:
- Format all formulas, variables, and numbers in LaTeX ($...$ or $$...$$).
- Use clear bullet points and bold headers.`;

    const response = await generateWithFallback(ai, {
      contents: promptText,
      config: {
        systemInstruction: 'You are an elite Digital SAT Math coach. Provide crystal-clear explanations with standard LaTeX math notation.',
        temperature: 0.6,
      },
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('AI Explain Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate explanation' });
  }
});

// 3. AI Interactive Math Tutor Chat
app.post('/api/ai/chat', async (req, res) => {
  try {
    const { question, message, history = [] } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Missing chat message' });
    }

    const ai = getAI();
    const systemInstruction = `You are "Gemini SAT Math Tutor", a friendly, brilliant, and patient Digital SAT Math coach inside the tunn.sat platform.
You are helping a high-school student understand the following problem:
Problem Prompt:
${question?.prompt || 'No question prompt specified'}
Choices: ${question?.choices ? question.choices.join(', ') : 'None'}
Correct Answer: ${JSON.stringify(question?.answer || 'Unknown')}
Domain: ${question?.domain || 'SAT Math'}

Guidelines:
- Guide the student step by step. If they ask a conceptual question, explain it simply with intuitive examples.
- If they ask for Desmos help, provide exact formulas they can type into Desmos.
- Always use LaTeX ($...$ or $$...$$) for any mathematical expressions, formulas, variables, or coordinates.
- Keep responses focused, encouraging, and easy to read on screen.`;

    // Build contents array with conversation history
    const contents = [];
    if (Array.isArray(history)) {
      history.slice(-8).forEach((item) => {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text }],
        });
      });
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await generateWithFallback(ai, {
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('AI Chat Error:', err);
    res.status(500).json({ error: err.message || 'Failed to get AI chat response' });
  }
});

// 4. AI Diagnostic & Personalized Study Plan
app.post('/api/ai/diagnostic', async (req, res) => {
  try {
    const { testTitle, score, byDomain, byType, mistakes = [] } = req.body;
    const ai = getAI();

    const promptText = `Analyze this student's Digital SAT Math practice test performance:
Test: ${testTitle || 'Digital SAT Math Practice'}
Score: ${score?.correct || 0} / ${score?.total || 0} (${score?.percentage || 0}%)
Time Spent: ${score?.timeFormatted || 'Not recorded'}

Domain Performance:
${byDomain ? Object.entries(byDomain).map(([dom, data]) => `- ${dom}: ${data.correct}/${data.total} (${Math.round((data.correct / (data.total || 1)) * 100)}%)`).join('\n') : 'N/A'}

Question Types:
- Multiple Choice: ${byType?.mcq?.correct || 0}/${byType?.mcq?.total || 0}
- Student-Produced Response (Grid-in): ${byType?.spr?.correct || 0}/${byType?.spr?.total || 0}

Missed Questions Summary (${mistakes.length} mistakes):
${mistakes.slice(0, 10).map((m, idx) => `${idx + 1}. Question #${m.number} [${m.domain || 'General'}] Type: ${m.type}. Student answer: ${m.userAnswer || 'omitted'}, Correct: ${m.correctAnswer}. Prompt excerpt: "${m.promptExcerpt || ''}"`).join('\n')}

Generate a comprehensive, actionable SAT Math Diagnostic Report structured as follows:
1. ### 🎯 Performance Diagnostic & SAT Score Projection
Evaluate their current readiness and estimate their SAT Math scaled score range (200-800 scale).
2. ### 🌟 Key Strengths & Mastered Skills
Highlight which domains and problem types they excelled at.
3. ### ⚠️ Critical Target Areas & Priority Fixes
Pinpoint the specific topics causing the most score leakage based on their missed questions.
4. ### ⚡ Desmos Calculator & Exam Strategy Tips
Actionable shortcuts and testing pacing recommendations to gain an immediate +30 to +50 points.
5. ### 📅 3-Step Personalized Action Plan
Concrete next steps to review and practice on this platform.

Use clean Markdown formatting with LaTeX for mathematical notations.`;

    const response = await generateWithFallback(ai, {
      contents: promptText,
      config: {
        systemInstruction: 'You are an authoritative Digital SAT Math prep advisor. Provide actionable, high-impact diagnostic feedback for students.',
        temperature: 0.6,
      },
    });

    res.json({ text: response.text });
  } catch (err) {
    console.error('AI Diagnostic Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate diagnostic' });
  }
});

// 5. AI Question Generator for Test Builder
app.post('/api/ai/generate-question', async (req, res) => {
  try {
    const { domain = 'Algebra', difficulty = 'Medium', type = 'mcq', topic = '' } = req.body;
    const ai = getAI();

    const promptText = `Generate 1 authentic Digital SAT Math question meeting the following specifications:
- Domain: ${domain} (College Board Digital SAT Math official domains: Algebra, Advanced Math, Problem-Solving and Data Analysis, Geometry and Trigonometry)
- Difficulty: ${difficulty} (Easy, Medium, or Hard)
- Question Type: ${type === 'spr' ? 'Student-Produced Response (grid-in numerical answer)' : 'Multiple Choice (4 options: A, B, C, D)'}
${topic ? `- Specific Topic / Scenario: ${topic}` : ''}

Strict requirements:
1. The question must strictly mimic the style, vocabulary, and rigor of College Board Digital SAT Math exams.
2. Use standard LaTeX for all math formulas and variables in the prompt, choices, and explanation (e.g. $2x + 5 = 17$, $f(x) = ax^2 + bx + c$, $\\frac{a}{b}$).
3. For multiple-choice questions, provide exactly 4 distinct choices A, B, C, D with plausible distractors, and set "answer" to "A", "B", "C", or "D".
4. For SPR (student-produced response) questions, set choices to [] and set "answer" to a list of acceptable string values (e.g. ["12", "12.0"]).
5. Include a thorough step-by-step explanation.`;

    const response = await generateWithFallback(ai, {
      contents: promptText,
      config: {
        systemInstruction: 'You are an official Digital SAT Math test creator. Generate mathematically rigorous and realistic SAT Math questions.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            prompt: { type: Type.STRING, description: 'The question text including LaTeX math' },
            type: { type: Type.STRING, description: 'mcq or spr' },
            choices: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Four choices for MCQ (without the A. B. C. D. letter prefixes), empty for SPR',
            },
            answer: {
              type: Type.STRING,
              description: 'Letter "A", "B", "C", or "D" for MCQ, or string answer for SPR',
            },
            explanation: { type: Type.STRING, description: 'Detailed step-by-step explanation with LaTeX' },
            domain: { type: Type.STRING, description: 'Official SAT Math domain' },
          },
          required: ['prompt', 'type', 'answer', 'explanation', 'domain'],
        },
        temperature: 0.8,
      },
    });

    const parsed = JSON.parse(response.text.trim());
    res.json({ question: parsed });
  } catch (err) {
    console.error('AI Generate Question Error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate question' });
  }
});

// -------------------------------------------------------------
// Static Asset Serving
// -------------------------------------------------------------

// Serve static assets from project root
app.use(
  express.static(__dirname, {
    extensions: ['html'],
    index: 'index.html',
  })
);

// Fallback to index.html for SPA hash/history routing
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
