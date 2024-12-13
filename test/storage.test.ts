import "fake-indexeddb/auto";
import { describe, test, expect } from "vitest";
import {
  saveJoke,
  getSavedJokes,
  deleteJoke,
  Joke,
} from "../src/storage/localStorage";

// 테스트용 농담 데이터
const mockJoke: Joke = {
  id: 1,
  type: "general",
  setup: "Why did the scarecrow win an award?",
  punchline: "Because he was outstanding in his field!",
};

describe("localStorage", () => {
  test("농담 저장 및 조회 테스트", async () => {
    // 농담 저장
    await saveJoke(mockJoke);

    // 저장된 농담 조회
    const jokes = await getSavedJokes();
    expect(jokes.length).toBe(1);
    expect(jokes[0]).toEqual(mockJoke);
  });

  test("농담 삭제 테스트", async () => {
    // 농담 저장
    await saveJoke(mockJoke);

    // 농담 삭제
    await deleteJoke(mockJoke.id);

    // 저장된 농담 조회 (빈 배열이어야 함)
    const jokes = await getSavedJokes();
    expect(jokes.length).toBe(0);
  });
});
