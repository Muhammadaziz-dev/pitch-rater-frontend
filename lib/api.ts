const API_BASE_URL = "https://api.filterai.uz/"

export async function analyzePitchDeck(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/analyze-pitch-deck`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to analyze pitch deck")
  }

  return response.json()
}

export async function getJob(jobId: string) {
  const response = await fetch(`${API_BASE_URL}/jobs/${jobId}`)
  if (!response.ok) {
    throw new Error("Failed to fetch job status")
  }
  return response.json()
}

export async function analyzeMarketSize(data: {
  company_name: string
  business_description: string
  industry: string
  region: string
}) {
  const response = await fetch(`${API_BASE_URL}/analyze-market-size`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to analyze market size")
  }

  return response.json()
}

export async function analyzeGitHubRepository(repository_url: string) {
  const response = await fetch(`${API_BASE_URL}/analyze-github-repository`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ repository_url }),
  })

  if (!response.ok) {
    throw new Error("Failed to analyze GitHub repository")
  }

  return response.json()
}

export async function chatAssistant(data: {
  message: string
  thread_id?: string | null
  model?: string
  agent_config?: Record<string, any>
}) {
  const response = await fetch(`${API_BASE_URL}/chat-assistant`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: data.message,
      thread_id: data.thread_id ?? null,
      model: data.model ?? "gemini-2.5-pro",
      agent_config: data.agent_config ?? {},
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to chat with assistant")
  }

  return response.json()
}

export async function analyzeVideoPitch(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  const response = await fetch(`${API_BASE_URL}/analyze-video-pitch`, {
    method: "POST",
    body: formData,
  })

  if (!response.ok) {
    throw new Error("Failed to analyze video pitch")
  }

  return response.json()
}

export async function analyzeVideoPitchText(transcript: string) {
  const response = await fetch(`${API_BASE_URL}/analyze-video-pitch-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ transcript }),
  })

  if (!response.ok) {
    throw new Error("Failed to analyze video pitch text")
  }

  return response.json()
}

export async function extractClaimsText(text: string) {
  const response = await fetch(`${API_BASE_URL}/extract-claims-text`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text, source_type: "text" }),
  })

  if (!response.ok) {
    throw new Error("Failed to extract claims from text")
  }

  return response.json()
}

export async function scoreStartup(claim_assumptions: any, market_research: any) {
  const response = await fetch(`${API_BASE_URL}/score-startup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      claim_assumptions,
      market_research,
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to score startup")
  }

  return response.json()
}

export async function investorPersonas(transcript: string) {
  const response = await fetch(`${API_BASE_URL}/investor-personas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      transcript,
      model: "gemini-2.5-pro",
    }),
  })

  if (!response.ok) {
    throw new Error("Failed to get investor personas")
  }

  return response.json()
}

