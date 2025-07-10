export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { hobbies, interests, learningStyle, goals, timeAvailable, currentLevel } = req.body;

  // Create a detailed prompt for the AI
  const prompt = `You are an AI educational consultant specializing in personalized learning. Create a comprehensive study plan for a student with the following profile:

Student Profile:
- Hobbies: ${hobbies}
- Subject Interests: ${interests}
- Learning Style: ${learningStyle}
- Academic Goals: ${goals}
- Available Study Time: ${timeAvailable} per day
- Current Academic Level: ${currentLevel}

Please create a detailed, personalized study plan that:
1. Incorporates their hobbies and interests into learning
2. Matches their learning style preferences
3. Fits their available time constraints
4. Is appropriate for their academic level
5. Helps them achieve their stated goals

Respond ONLY with a valid JSON object in this exact format:
{
  "overview": "A 2-3 sentence overview of the personalized study plan",
  "weeklySchedule": [
    {
      "day": "Monday",
      "activities": [
        {"subject": "specific subject/topic", "duration": "X minutes", "description": "brief activity description"}
      ]
    },
    {
      "day": "Tuesday", 
      "activities": [
        {"subject": "specific subject/topic", "duration": "X minutes", "description": "brief activity description"}
      ]
    },
    {
      "day": "Wednesday",
      "activities": [
        {"subject": "specific subject/topic", "duration": "X minutes", "description": "brief activity description"}
      ]
    },
    {
      "day": "Thursday",
      "activities": [
        {"subject": "specific subject/topic", "duration": "X minutes", "description": "brief activity description"}
      ]
    },
    {
      "day": "Friday",
      "activities": [
        {"subject": "specific subject/topic", "duration": "X minutes", "description": "brief activity description"}
      ]
    }
  ],
  "resources": [
    {"type": "resource category", "description": "specific resource recommendation"},
    {"type": "resource category", "description": "specific resource recommendation"},
    {"type": "resource category", "description": "specific resource recommendation"}
  ],
  "tips": [
    "specific tip related to their learning style",
    "specific tip related to their hobbies/interests",
    "specific tip related to their goals",
    "specific tip related to time management"
  ]
}

Make sure the response is valid JSON and incorporates their specific interests, hobbies, and learning preferences.`;

  try {
    // Call OpenRouter API with Gemma 3 12B model
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "HTTP-Referer": "http://localhost:3000",
        "X-Title": "AdaptED - Personalized Learning Platform", // Your site name
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemma-3-12b-it:free",
        "messages": [
          {
            "role": "user",
            "content": prompt
          }
        ],
        "max_tokens": 2000,
        "temperature": 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the AI response
    const aiResponse = data.choices[0].message.content;
    
    // Try to parse the JSON response
    let studyPlan;
    try {
      // Clean the response in case there are any markdown formatting or extra text
      const jsonStart = aiResponse.indexOf('{');
      const jsonEnd = aiResponse.lastIndexOf('}') + 1;
      const jsonString = aiResponse.substring(jsonStart, jsonEnd);
      
      studyPlan = JSON.parse(jsonString);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      console.error('AI Response:', aiResponse);
      
      // Fallback to a structured response if JSON parsing fails
      studyPlan = {
        overview: `Based on your profile, I've created a personalized study plan that incorporates your ${learningStyle} learning style and connects your interests in ${interests} with your academic goals. This plan is designed to fit your ${timeAvailable} daily schedule and is tailored for your ${currentLevel} level.`,
        weeklySchedule: [
          {
            day: "Monday",
            activities: [
              { subject: "Core Subject Review", duration: "30 minutes", description: "Review main academic subjects" },
              { subject: "Interest-based Learning", duration: "15 minutes", description: "Connect hobbies with studies" }
            ]
          },
          {
            day: "Tuesday",
            activities: [
              { subject: "Practice Problems", duration: "25 minutes", description: "Hands-on problem solving" },
              { subject: "Creative Application", duration: "20 minutes", description: "Apply knowledge creatively" }
            ]
          },
          {
            day: "Wednesday",
            activities: [
              { subject: "Review & Consolidation", duration: "30 minutes", description: "Strengthen understanding" },
              { subject: "Hobby Integration", duration: "15 minutes", description: "Learn through your interests" }
            ]
          },
          {
            day: "Thursday",
            activities: [
              { subject: "New Concept Learning", duration: "35 minutes", description: "Explore new topics" },
              { subject: "Hands-on Practice", duration: "10 minutes", description: "Apply new knowledge" }
            ]
          },
          {
            day: "Friday",
            activities: [
              { subject: "Weekly Review", duration: "30 minutes", description: "Comprehensive week review" },
              { subject: "Goal Assessment", duration: "15 minutes", description: "Track progress toward goals" }
            ]
          }
        ],
        resources: [
          { type: "Learning Style Resources", description: `Materials optimized for ${learningStyle} learners` },
          { type: "Interest-based Content", description: `Resources connecting ${interests} with academic subjects` },
          { type: "Practice Platforms", description: "Interactive exercises and assessments" },
          { type: "Progress Tracking", description: "Tools to monitor improvement and adjust the plan" }
        ],
        tips: [
          `Leverage your ${learningStyle} learning style with appropriate study techniques`,
          `Connect your hobbies (${hobbies}) with academic content to increase engagement`,
          `Break your ${timeAvailable} study sessions into focused blocks with short breaks`,
          `Regular review and assessment will help you stay on track with your goals`
        ],
        rawResponse: aiResponse // Include raw response for debugging
      };
    }

    res.status(200).json(studyPlan);
  } catch (error) {
    console.error('Error generating study plan:', error);
    res.status(500).json({ 
      error: 'Failed to generate study plan. Please try again later.',
      details: error.message 
    });
  }
}