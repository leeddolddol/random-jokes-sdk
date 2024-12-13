import { fetchRandomJoke } from "./api/jokesAPI";
import { saveJoke, getSavedJokes, deleteJoke } from "./storage/localStorage";
import { Joke } from "./types";
import { JokesSDKError } from "./errors";

// SDK 인터페이스
const JokesSDK = {
  getRandomJoke: async (): Promise<Joke> => {
    try {
      return await fetchRandomJoke();
    } catch (error) {
      if (error instanceof JokesSDKError) {
        console.error("Error in getRandomJoke:", error.message);
      }
      throw error;
    }
  },

  saveJoke: async (joke: Joke): Promise<void> => {
    try {
      await saveJoke(joke);
    } catch (error) {
      if (error instanceof JokesSDKError) {
        console.error("Error in saveJoke:", error.message);
      }
      throw error;
    }
  },

  getSavedJokes: async (): Promise<Joke[]> => {
    try {
      return await getSavedJokes();
    } catch (error) {
      if (error instanceof JokesSDKError) {
        console.error("Error in getSavedJokes:", error.message);
      }
      throw error;
    }
  },

  deleteJoke: async (jokeId: number): Promise<void> => {
    try {
      await deleteJoke(jokeId);
    } catch (error) {
      if (error instanceof JokesSDKError) {
        console.error("Error in deleteJoke:", error.message);
      }
      throw error;
    }
  },
};

export default JokesSDK;
export type { Joke };
