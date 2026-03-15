// Gemini API integration for contrarian perspective generation
import { GoogleGenerativeAI } from '@google/generative-ai';

let genAI: GoogleGenerativeAI | null = null;

export function initGemini(apiKey: string) {
  genAI = new GoogleGenerativeAI(apiKey);
}

export function isGeminiReady() { return genAI !== null; }

export interface PerspectiveShift {
  opposing_viewpoint: string;
  unexpected_connection: string;
  unconsidered_question: string;
  cognitive_bias_warning: string;
}

export async function generatePerspectiveShift(topic: string): Promise<PerspectiveShift> {
  if (!genAI) throw new Error('Gemini API not initialized. Enter your API key in settings.');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  const prompt = `You are System 0, an ambient cognitive reshaper. Your job is to challenge the user's thinking and expand their perspective. Given the following topic, generate exactly 4 responses in JSON format:

Topic: "${topic}"

Respond ONLY with valid JSON in this exact format:
{
  "opposing_viewpoint": "A well-reasoned contrarian perspective that challenges the mainstream view on this topic. Be specific, cite real concepts or thinkers. 2-3 sentences.",
  "unexpected_connection": "An unexpected connection between this topic and a completely different field (biology, music theory, urban planning, linguistics, etc). Show how insights from that field illuminate this topic differently. 2-3 sentences.",
  "unconsidered_question": "A profound question about this topic that most people haven't considered. The kind of question that makes someone stop and think. Frame it as a single compelling question with a brief explanation of why it matters.",
  "cognitive_bias_warning": "Identify a specific cognitive bias that commonly affects thinking about this topic. Name the bias and explain how it distorts understanding. 1-2 sentences."
}`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();
  
  // Extract JSON from response
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error('Failed to parse Gemini response');
  
  return JSON.parse(jsonMatch[0]) as PerspectiveShift;
}

export async function* streamPerspectiveShift(topic: string): AsyncGenerator<{ field: string; text: string }> {
  if (!genAI) throw new Error('Gemini API not initialized');
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  
  const prompt = `You are System 0, an ambient cognitive reshaper. Analyze this topic and provide contrarian perspectives.

Topic: "${topic}"

Structure your response with these exact headers (use ### for each):

### Opposing Viewpoint
A well-reasoned contrarian perspective. Be specific, cite real concepts or thinkers.

### Unexpected Connection  
Connect this topic to a completely unrelated field. Show cross-domain insight.

### Unconsidered Question
A profound question most people haven't asked about this topic.

### Cognitive Bias Warning
Name a specific bias affecting thinking on this topic and explain it.`;

  const result = await model.generateContentStream(prompt);
  
  let currentField = '';
  for await (const chunk of result.stream) {
    const text = chunk.text();
    // Detect field headers
    if (text.includes('### Opposing')) currentField = 'opposing_viewpoint';
    else if (text.includes('### Unexpected')) currentField = 'unexpected_connection';
    else if (text.includes('### Unconsidered')) currentField = 'unconsidered_question';
    else if (text.includes('### Cognitive')) currentField = 'cognitive_bias_warning';
    
    if (currentField) {
      yield { field: currentField, text: text.replace(/###\s*[^\n]+\n?/, '') };
    }
  }
}

// Analyze browsing pattern for echo chamber detection
export async function analyzeBrowsingPattern(domains: { domain: string; timeSpent: number }[]): Promise<string> {
  if (!genAI) return 'Connect Gemini API for AI-powered analysis.';
  
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
  const domainList = domains.slice(0, 10).map(d => `${d.domain}: ${Math.round(d.timeSpent / 60)}min`).join(', ');
  
  const prompt = `You are System 0, analyzing a user's browsing pattern. In 2-3 sentences, assess the cognitive diversity of this browsing session and suggest one specific change. Be direct and insightful, not generic.

Browsing data: ${domainList}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
