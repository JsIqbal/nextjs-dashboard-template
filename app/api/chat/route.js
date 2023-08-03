// Next.js 13.4 API
import { NextResponse } from 'next/server';
import axios from 'axios'

export async function POST(req) {
  // Get the prompt and history from the request body
  const { prompt, history } = await req.json()
  console.log(prompt)
  // Set the headers for the EdenAI API
  const headers = {
    Authorization: `Bearer ${process.env.EDENAI_API_KEY}`
  }

  // Set the payload for the EdenAI API
  const payload = {
    providers: 'openai',
    text: prompt,
    chat_global_action: 'You are a ChatBot assistant',
    previous_history: history, // Extract only the messages from history
    temperature: 0.7,
    max_tokens: 300
  }

  // Make a POST request to the EdenAI API
  try {
    const response = await axios.post(
      'https://api.edenai.run/v2/text/chat',
      payload,
      { headers }
    )

    // Get the result from the response data
    const result = response.data

    // Send the result as JSON
    return NextResponse.json(result.openai, {status: 200})
  } catch (error) {
    console.error(error.response.data)
    // Handle any errors
    return NextResponse.json(error.message, {status:500})
  }
}