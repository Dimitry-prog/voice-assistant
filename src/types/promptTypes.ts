export type RequestOpenAIType = {
  model: string;
  messages: RequestOpenAIMessageType[];
  temperature: number;
  max_tokens: number;
};

export type RequestOpenAIMessageType = {
  role: 'system' | 'user';
  content: string;
};

export type RequestOpenAIDataPropsType = {
  lang: string;
  text: string;
};

export type ResponseOpenAIType = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
};

export type Choice = {
  index: number;
  message: Message;
  finish_reason: string;
};

export type Message = {
  role: string;
  content: string;
};

export type Usage = {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
};

export type GPTConfigType = {
  date: GPTConfigDateType;
  role: GPTConfigRoleType;
};

export type GPTConfigDateType = {
  start: string;
  days: string | number;
  end: string;
};

export type GPTConfigRoleType = {
  frontend: number;
  backend: number;
  designer: number;
  fullstack: number;
  projectmanager: number;
  analyst: number;
  datascientist: number;
  QAengineer: number;
};

export type GPTAnswerType = {
  id: string;
  parentId: string | null;
  role: string;
  start: string;
  end: string;
  description: string;
  cardName: string;
};

export type CardData = {
  role: string;
  start: string;
  end: string;
  description: string;
};
