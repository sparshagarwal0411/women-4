# Groq API Setup Guide

This guide will help you set up the Groq API integration for the chatbot feature.

## Steps to Set Up

### 1. Get Your Groq API Key

1. Visit [Groq Console](https://console.groq.com/)
2. Sign up or log in to your account
3. Navigate to API Keys section
4. Create a new API key
5. Copy your API key

### 2. Configure Environment Variable

1. Create a `.env` file in the root directory of your project (if it doesn't exist)
2. Add your Groq API key:

```env
VITE_GROQ_API_KEY=your_actual_api_key_here
```

**Important:** 
- Replace `your_actual_api_key_here` with your actual Groq API key
- Never commit your `.env` file to version control (it's already in `.gitignore`)
- The `.env` file should be in the root directory, same level as `package.json`

### 3. Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

### 4. Test the Chatbot

1. Open your application in the browser
2. Click on the chat icon (MessageCircle) in the bottom right corner
3. Type a message and send it
4. The chatbot should respond using Groq AI

## Troubleshooting

### Chatbot shows error about API key
- Make sure your `.env` file is in the root directory
- Verify the variable name is exactly `VITE_GROQ_API_KEY`
- Restart your development server after adding the key
- Check that there are no extra spaces or quotes around the API key

### Chatbot not responding
- Check your browser console for errors
- Verify your API key is valid and has credits/quota
- Check your internet connection
- Ensure the Groq API service is accessible

### API Rate Limits
- Groq has rate limits on free tier
- If you hit rate limits, wait a few minutes and try again
- Consider upgrading your Groq plan for higher limits

## Features

The chatbot is configured to:
- Answer questions about WomenPreneur platform
- Help with entrepreneurship and business questions
- Provide information about schemes, courses, and mentorship
- Be friendly and supportive
- Keep responses concise and helpful

## Model Used

The chatbot uses `llama-3.1-8b-instant` model from Groq, which provides fast and intelligent responses.

