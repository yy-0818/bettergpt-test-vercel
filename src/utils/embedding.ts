import { supabase } from '@utils/supabaseClient';
import { createClient } from '@supabase/supabase-js';

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Replace with your OpenAI API key
const OPENAI_ENDPOINT =
  'https://api.openai.com/v1/engines/text-embedding-ada-002/embeddings'; // OpenAI's text-embedding endpoint
type EmbeddingResponse = number[];

async function convertTextToOpenAIEmbedding(
  text: string
): Promise<EmbeddingResponse> {
  const response = await fetch(OPENAI_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input: text }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.data[0].embedding;
}

export async function storeMessageWithEmbedding(
  userId: string,
  sessionId: number,
  role: string,
  content: string
): Promise<void> {
  // Convert text to embedding
  const embedding = await convertTextToOpenAIEmbedding(content);

  const { data, error } = await supabase.from('conversation_history').insert([
    {
      user_id: userId,
      session_id: sessionId,
      role: role,
      content: content,
      embedding: embedding,
    },
  ]);

  if (error) {
    console.error('Error storing message with embedding:', error);
  } else {
    console.log('Message with embedding stored successfully:', data);
  }
}

export async function retrieveSimilarHistory(
  userId: string,
  sessionId: number,
  query: string
): Promise<any[]> {
  // 将用户的查询转换为嵌入式表示
  const embedding = await convertTextToOpenAIEmbedding(query);
  // console.log('Embedding:', embedding.length);

  // 执行 Supabase 查询以检索历史记录
  const { data, error } = await supabase
    .rpc('search_conversation_history', {
      query_vector: embedding,
    }) // 调用Supabase中的远程过程调用函数
    .eq('user_id', userId) // 选择特定用户的记录
    .eq('session_id', sessionId); // 选择特定会话的记录

  // 如果有错误，抛出异常或者处理错误
  if (error) {
    throw new Error(`Error retrieving similar history: ${error.message}`);
  }

  // 返回查询到的相似历史记录
  return data;
}

export async function fetchDocumentSections(query: string): Promise<any[]> {
  const embedding = await convertTextToOpenAIEmbedding(query);
  const { data, error } = await supabase
    .rpc('search_document_sections', {
      query_vector: embedding,
    })
    .limit(5);
  if (error) {
    throw new Error(`Error retrieving similar history: ${error.message}`);
  }
  return data;
}
