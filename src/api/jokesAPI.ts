import { JokesSDKError } from "../errors";

// 농담 API 기본 URL
const API_URL = "https://official-joke-api.appspot.com/random_joke";

export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

export async function fetchRandomJoke(): Promise<Joke> {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new JokesSDKError(
        `API request failed with status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new JokesSDKError(
      "Failed to fetch a random joke",
      error instanceof Error ? error : undefined
    );
  }
}
