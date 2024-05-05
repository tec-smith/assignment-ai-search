import {
  Content,
  GenerateContentRequest,
  GenerateContentResponse,
  HarmBlockThreshold,
  HarmCategory,
  SafetySetting,
  TextPart,
  VertexAI,
} from '@google-cloud/vertexai';
import { parseInterpretedInfoFromText } from './parseInterpretedInfo';

// Initialise Vertex AI with your Cloud project and location
const model = process.env.AIMODEL_IDENTITY || 'gemini-1.0-pro-001';
const projectId = process.env.PROJECT_IDENTITY || '';
const region = process.env.PROJECT_LOCATION || 'us-central1';
const vertexAI = new VertexAI({ project: projectId, location: region });

// Define an array of safety settings with explicit typing
const safetySettings: SafetySetting[] = [
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }
];

/**
 * Extracts and accumulates the text content from the stream of model responses.
 * @param stream The asynchronous stream of model responses.
 * @returns The accumulated text content from the stream.
 */
async function processStream(stream: AsyncIterable<GenerateContentResponse>): Promise<string> {
  const textParts: string[] = [];

  for await (const item of stream) {
    if (item.candidates && item.candidates.length > 0 && item.candidates[0].content) {
      const content = item.candidates[0].content as Content;

      // Iterate over each part in the content
      for (const part of content.parts) {
        if ('text' in part && typeof (part as TextPart).text === 'string') {
          const textPart = part as TextPart;
          textParts.push(textPart.text);
        }
      }
    }
  }

  // Join all text parts into a single string
  const accumulatedText = textParts.join('');

  return accumulatedText;
}

/**
 * Interprets user input, generates content using the model, and returns formatted information.
 * @param userInput The user input text.
 * @returns The formatted JSON string representing the interpreted information.
 * @throws Error if input interpretation or content generation fails.
 */
export async function inputInterpreter(userInput: string): Promise<string> {
  // Describe the context of the prompt for the model
  const hotelPrompt = 'Extract the city, two-letter country code, check-in and check-out dates (including present year 2024 in the format YYYY-MM-DD), as well as the number of people from the following sentence, and then return it in a JSON format with the following variables filled in: city, country_code, check_in, check_out, num_of_rooms.';

  try {
    const req: GenerateContentRequest = {
      contents: [{ role: 'user', parts: [{ text: hotelPrompt + userInput }] }],
    };

    const generativeModel = vertexAI.preview.getGenerativeModel({
      model: model,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.9,
        topP: 1,
      },
      safetySettings: safetySettings,
    });

    const streamingResp = await generativeModel.generateContentStream(req);
    const accumulatedText = await processStream(streamingResp.stream);
    const parsedInfo = parseInterpretedInfoFromText(accumulatedText);

    console.log('Model Response:', parsedInfo);

    return JSON.stringify(parsedInfo);
  } catch (error) {
    console.error('Error in inputInterpreter:', error);
    throw new Error('Failed to interpret input.');
  }
}
