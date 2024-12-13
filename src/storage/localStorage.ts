import { JokesSDKError } from "../errors";
import localforage from "localforage";

// IndexedDB 인스턴스 생성
const jokesStorage = localforage.createInstance({
  name: "randomJokesApp",
  storeName: "jokes",
});

// 농담 데이터 타입
export interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}

/**
 * 농담 저장
 * @param joke 저장할 농담 데이터
 */
export async function saveJoke(joke: Joke): Promise<void> {
  try {
    await jokesStorage.setItem(String(joke.id), joke);
  } catch (error) {
    throw new JokesSDKError(
      "Failed to save joke to storage",
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * 저장된 모든 농담 가져오기
 * @returns 농담 배열
 */
export async function getSavedJokes(): Promise<Joke[]> {
  try {
    const keys = await jokesStorage.keys();
    const jokes = await Promise.all(
      keys.map((key) => jokesStorage.getItem<Joke>(key))
    );
    return jokes.filter((joke): joke is Joke => joke !== null);
  } catch (error) {
    throw new JokesSDKError(
      "Failed to retrieve saved jokes from storage",
      error instanceof Error ? error : undefined
    );
  }
}

/**
 * 특정 농담 삭제
 * @param jokeId 삭제할 농담의 ID
 */
export async function deleteJoke(jokeId: number): Promise<void> {
  try {
    await jokesStorage.removeItem(String(jokeId));
  } catch (error) {
    throw new JokesSDKError(
      "Failed to delete joke from storage",
      error instanceof Error ? error : undefined
    );
  }
}
