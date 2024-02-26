import { v4 as uuidv4 } from 'uuid';
import { ChatInterface, ConfigInterface, ModelOptions } from '@type/chat';
import useStore from '@store/store';

const date = new Date();
const dateString =
  date.getFullYear() +
  '-' +
  ('0' + (date.getMonth() + 1)).slice(-2) +
  '-' +
  ('0' + date.getDate()).slice(-2);

// default system message obtained using the following method: https://twitter.com/DeminDimin/status/1619935545144279040
export const _defaultSystemMessage =
  import.meta.env.VITE_DEFAULT_SYSTEM_MESSAGE ??
  `You are ChatGPT, a large language model trained by OpenAI.
Carefully heed the user's instructions. 
Respond using Markdown.`;

// Define default messages for each type of companion
const defaultMessages = {
  ChatGPT: _defaultSystemMessage,
  Doctor: `Hello! I'm Doctor AI, here to assist with your health questions. Remember, always consult with a real doctor for medical advice.`,
  Mentor: `Hi there! I'm Mentor AI, at your service to offer guidance and support on your life's journey.`,
  ChristianGPT: `Greetings! I'm   , ready to discuss teachings and share insights on faith matters.`,
};

// Generate the default message based on companion type
const getDefaultMessage = (companionType: string): string => {
  return defaultMessages[companionType] || defaultMessages['ChatGPT'];
};

export const modelOptions: ModelOptions[] = [
  'gpt-3.5-turbo',
  'gpt-3.5-turbo-16k',
  'gpt-4',
  'gpt-4-32k',
  'gpt-4-1106-preview',
  // 'gpt-3.5-turbo-0301',
  // 'gpt-4-0314',
  // 'gpt-4-32k-0314',
];

export const defaultModel = 'gpt-3.5-turbo';

export const modelMaxToken = {
  'gpt-3.5-turbo': 4096,
  'gpt-3.5-turbo-0301': 4096,
  'gpt-3.5-turbo-0613': 4096,
  'gpt-3.5-turbo-16k': 16384,
  'gpt-3.5-turbo-16k-0613': 16384,
  'gpt-4': 8192,
  'gpt-4-0314': 8192,
  'gpt-4-0613': 8192,
  'gpt-4-32k': 32768,
  'gpt-4-32k-0314': 32768,
  'gpt-4-32k-0613': 32768,
  'gpt-4-1106-preview': 128000,
};

export const modelCost = {
  'gpt-3.5-turbo': {
    prompt: { price: 1, unit: 1000 },
    completion: { price: 1, unit: 1000 },
  },
  'gpt-3.5-turbo-0301': {
    prompt: { price: 1, unit: 1000 },
    completion: { price: 1, unit: 1000 },
  },
  'gpt-3.5-turbo-0613': {
    prompt: { price: 1, unit: 1000 },
    completion: { price: 1, unit: 1000 },
  },
  'gpt-3.5-turbo-16k': {
    prompt: { price: 1, unit: 1000 },
    completion: { price: 1, unit: 1000 },
  },
  'gpt-3.5-turbo-16k-0613': {
    prompt: { price: 1, unit: 1000 },
    completion: { price: 1, unit: 1000 },
  },
  'gpt-4': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
  'gpt-4-0314': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
  'gpt-4-0613': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
  'gpt-4-32k': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
  'gpt-4-32k-0314': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
  'gpt-4-32k-0613': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
  'gpt-4-1106-preview': {
    prompt: { price: 16, unit: 1000 },
    completion: { price: 16, unit: 1000 },
  },
};

export const defaultUserMaxToken = 4000;

export const _defaultChatConfig: ConfigInterface = {
  model: defaultModel,
  max_tokens: defaultUserMaxToken,
  temperature: 1,
  presence_penalty: 0,
  top_p: 1,
  frequency_penalty: 0,
};

export const generateDefaultChat = (
  title?: string,
  folder?: string,
  companionType: string = 'ChatGPT' // Default to ChatGPT if no companionType is provided
): ChatInterface => {
  const defaultSystemMessage = getDefaultMessage(companionType);

  return {
    id: uuidv4(),
    title: title ?? 'New Chat',
    messages: [{ role: 'system', content: defaultSystemMessage }],
    config: { ...useStore.getState().defaultChatConfig },
    titleSet: false,
    folder,
  };
};

export const codeLanguageSubset = [
  'python',
  'javascript',
  'java',
  'go',
  'bash',
  'c',
  'cpp',
  'csharp',
  'css',
  'diff',
  'graphql',
  'json',
  'kotlin',
  'less',
  'lua',
  'makefile',
  'markdown',
  'objectivec',
  'perl',
  'php',
  'php-template',
  'plaintext',
  'python-repl',
  'r',
  'ruby',
  'rust',
  'scss',
  'shell',
  'sql',
  'swift',
  'typescript',
  'vbnet',
  'wasm',
  'xml',
  'yaml',
];
