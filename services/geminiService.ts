
import { GoogleGenAI, Type, Modality } from "@google/genai";

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async getAcademicCounseling(message: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: message,
        config: {
          systemInstruction: `شما یک دستیار هوشمند دانشگاهی به نام UniPlus هستید. 
          وظایف شما:
          1. کمک به دانشجویان در فهم دروس.
          2. ارائه نقشه راه برای ارشد و دکترا.
          3. پاسخ به سوالات آیین‌نامه‌ای (اگر دانش نداری بگو به آموزش مراجعه کنند).
          4. همیشه به زبان فارسی محترمانه و صمیمی پاسخ دهید.`,
          temperature: 0.7,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini API Error:", error);
      return "متاسفانه در حال حاضر قادر به پاسخگویی نیستم. لطفا دوباره تلاش کنید.";
    }
  }

  async getFlashcardsFromText(text: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `از متن زیر ۵ فلش کارت (پرسش و پاسخ) استخراج کن: \n\n ${text}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                answer: { type: Type.STRING }
              },
              required: ["question", "answer"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Gemini Flashcard Error:", error);
      return [];
    }
  }

  async suggestRecipes(ingredients: string) {
    try {
      const prompt = `من یک دانشجو هستم و این مواد را در خوابگاه دارم: "${ingredients}".
      لطفاً ۳ غذای ساده، ارزان و سریع که می‌توانم با این مواد (و مواد اولیه پایه مثل روغن و نمک) بپزم را پیشنهاد بده.
      خروجی باید فرمت JSON باشد.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "نام غذا" },
                time: { type: Type.STRING, description: "زمان پخت (مثلا ۲۰ دقیقه)" },
                difficulty: { type: Type.STRING, description: "سختی (آسان/متوسط)" },
                steps: { 
                  type: Type.ARRAY, 
                  items: { type: Type.STRING },
                  description: "مراحل پخت کوتاه"
                }
              },
              required: ["name", "time", "difficulty", "steps"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Gemini Recipe Error:", error);
      return []; // Return empty array on error
    }
  }

  async analyzeThesisText(text: string) {
    try {
      const prompt = `Act as a strict academic editor for a PhD or Master's thesis. 
      Analyze the following text for:
      1. Academic Tone (Formal, objective)
      2. Clarity and Flow
      3. Grammar and Structure
      
      Input Text:
      "${text}"
      
      Return a JSON response with a score (0-100), a general critique, a list of specific improvements, and a rewritten version of the text that fixes the issues. The output language must be Persian (Farsi).`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              score: { type: Type.NUMBER, description: "نمره کیفیت متن از ۱۰۰" },
              critique: { type: Type.STRING, description: "نقد کلی پاراگراف" },
              suggestions: { 
                type: Type.ARRAY, 
                items: { type: Type.STRING },
                description: "لیست پیشنهادات اصلاحی"
              },
              rewritten: { type: Type.STRING, description: "متن بازنویسی شده و اصلاح شده" }
            },
            required: ["score", "critique", "suggestions", "rewritten"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Thesis Analysis Error:", error);
      return null;
    }
  }

  async generateSpeech(text: string, voiceName: string = 'Kore') {
    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash-preview-tts",
        contents: [{ parts: [{ text: text }] }],
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: { voiceName: voiceName },
              },
          },
        },
      });
      
      const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      return base64Audio;
    } catch (error) {
      console.error("Gemini TTS Error:", error);
      return null;
    }
  }

  async summarizeText(text: string) {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `متن زیر را برای یک دانشجو خلاصه کن. نکات کلیدی را به صورت بولت پوینت بنویس و ساختار متن را حفظ کن. لحن باید آموزشی و دقیق باشد.\n\n متن: ${text}`,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Summary Error:", error);
      return "خطا در خلاصه‌سازی متن.";
    }
  }

  async generateSlides(topic: string) {
    try {
      const prompt = `Create a presentation outline for the topic: "${topic}".
      Generate 4 to 6 slides.
      For each slide, provide a Title and 3-4 bullet points of Content.
      Also provide a single 'iconKeyword' for each slide (e.g., 'target', 'users', 'chart', 'code', 'book', 'idea', 'world').
      Output strictly in JSON format.
      Language: Persian (Farsi).`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.ARRAY, items: { type: Type.STRING } },
                iconKeyword: { type: Type.STRING, description: "A simple keyword for an icon (e.g., globe, chart, brain)" }
              },
              required: ["title", "content", "iconKeyword"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Gemini Slide Generation Error:", error);
      return [];
    }
  }

  async generateSlidesFromText(text: string) {
    try {
      const prompt = `Analyze the following text and convert it into a presentation outline.
      Extract the main concepts and structure them into 5 to 8 slides.
      For each slide, provide a Title and 3-5 bullet points of Content.
      Also provide a single 'iconKeyword' for each slide (e.g., 'target', 'users', 'chart', 'code', 'book', 'idea', 'world').
      
      Input Text:
      "${text}"

      Output strictly in JSON format.
      Language: Persian (Farsi).`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                content: { type: Type.ARRAY, items: { type: Type.STRING } },
                iconKeyword: { type: Type.STRING, description: "A simple keyword for an icon (e.g., globe, chart, brain)" }
              },
              required: ["title", "content", "iconKeyword"]
            }
          }
        }
      });
      return JSON.parse(response.text || '[]');
    } catch (error) {
      console.error("Gemini Slide Generation From Text Error:", error);
      return [];
    }
  }

  async generateCaption(topic: string, platform: string, tone: string) {
    try {
      const prompt = `Write a creative and engaging caption in Persian (Farsi) for ${platform} about: "${topic}".
      Tone: ${tone}.
      Requirements:
      1. Use relevant emojis liberally to make it attractive.
      2. Use artistic line separators or spacers between paragraphs (like ────────, • • •, or ✨).
      3. Include 5-10 relevant hashtags at the very end.
      4. Ensure the spacing allows for easy reading.
      5. Don't include any introductory text like "Here is the caption:", just output the caption itself.`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Caption Error:", error);
      return "خطا در تولید کپشن.";
    }
  }

  async playPoetryGame(userVerse: string) {
    try {
      const prompt = `You are playing "Mushaereh" (Persian Poetry Game). 
      The user has recited this verse: "${userVerse}".
      
      Task:
      1. Identify the last letter of the user's verse.
      2. Find a classic Persian poem verse (Bayt) that starts with that letter.
      3. Provide a simple and beautiful interpretation (meaning) of the verse you selected.
      
      Output strictly in JSON format:
      {
        "lastLetter": "The letter you identified",
        "responseVerse": "The verse you selected (in Persian)",
        "poet": "Name of the poet (e.g., Hafez, Saadi)",
        "interpretation": "A 2-3 sentence interpretation of the meaning in Persian"
      }`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              lastLetter: { type: Type.STRING },
              responseVerse: { type: Type.STRING },
              poet: { type: Type.STRING },
              interpretation: { type: Type.STRING }
            },
            required: ["responseVerse", "poet", "interpretation"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Poetry Game Error:", error);
      return null;
    }
  }

  // --- NEW METHODS FOR LANGUAGE LEARNING ---

  async generateLanguageLesson(level: string, topic: string) {
    try {
      const prompt = `Act as an expert English language teacher for Persian speakers.
      Create a bite-sized lesson for Level: ${level}, Topic: ${topic}.
      
      The output must be in JSON format with the following structure:
      {
        "title": "Lesson Title",
        "explanation": "A clear, short explanation of the grammar rule or vocabulary in Persian.",
        "examples": [
           { "en": "English sentence 1", "fa": "Persian translation 1" },
           { "en": "English sentence 2", "fa": "Persian translation 2" }
        ],
        "quiz": {
          "question": "A multiple-choice question to test understanding (in Persian).",
          "options": ["Option A", "Option B", "Option C", "Option D"],
          "correctIndex": 0 // Index of the correct option (0-3)
        }
      }`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              explanation: { type: Type.STRING },
              examples: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: {
                    en: { type: Type.STRING },
                    fa: { type: Type.STRING }
                  },
                  required: ["en", "fa"]
                }
              },
              quiz: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctIndex: { type: Type.INTEGER }
                },
                required: ["question", "options", "correctIndex"]
              }
            },
            required: ["title", "explanation", "examples", "quiz"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Language Lesson Error:", error);
      return null;
    }
  }

  async checkGrammarAndDict(text: string) {
    try {
      const prompt = `Analyze the following English text or word for a Persian student.
      Input: "${text}"
      
      Tasks:
      1. Correct any spelling or grammar mistakes.
      2. If it's a sentence, provide the corrected version and explain the grammar rule in Persian.
      3. If it's a word, provide the definition, part of speech, and 2 synonyms.
      4. Translate the input (or corrected input) to Persian.

      Output JSON:
      {
        "corrected": "Corrected text (or same if correct)",
        "isCorrect": boolean,
        "type": "word" | "sentence",
        "translation": "Persian translation",
        "explanation": "Grammar explanation or Word definition in Persian",
        "synonyms": ["synonym1", "synonym2"] // Empty if sentence
      }`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              corrected: { type: Type.STRING },
              isCorrect: { type: Type.BOOLEAN },
              type: { type: Type.STRING },
              translation: { type: Type.STRING },
              explanation: { type: Type.STRING },
              synonyms: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["corrected", "isCorrect", "type", "translation", "explanation"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Grammar Check Error:", error);
      return null;
    }
  }

  async generateBilingualStory(level: string, genre: string) {
    try {
      const prompt = `Write a short story (approx 150 words) for English learner level: ${level}. Genre: ${genre}.
      Return JSON with paragraphs. Each paragraph object should have "en" (English) and "fa" (Persian translation).
      {
        "titleEn": "Title in English",
        "titleFa": "Title in Persian",
        "paragraphs": [
          { "en": "Paragraph 1 English", "fa": "Paragraph 1 Persian" },
          ...
        ]
      }`;

      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              titleEn: { type: Type.STRING },
              titleFa: { type: Type.STRING },
              paragraphs: { 
                type: Type.ARRAY, 
                items: { 
                  type: Type.OBJECT,
                  properties: { en: { type: Type.STRING }, fa: { type: Type.STRING } },
                  required: ["en", "fa"]
                }
              }
            },
            required: ["titleEn", "titleFa", "paragraphs"]
          }
        }
      });
      return JSON.parse(response.text || '{}');
    } catch (error) {
      console.error("Gemini Story Generation Error:", error);
      return null;
    }
  }
}

export const gemini = new GeminiService();
