import "fake-indexeddb/auto";
import { describe, test, expect } from "vitest";
import JokesSDK, { Joke } from "../src/index";

describe("JokesSDK", () => {
  const mockJoke: Joke = {
    id: 1,
    type: "general",
    setup: "Why don't skeletons fight each other?",
    punchline: "They don't have the guts.",
  };

  test("getRandomJoke: 랜덤 농담 가져오기", async () => {
    const joke = await JokesSDK.getRandomJoke();
    expect(joke).toHaveProperty("id");
    expect(joke).toHaveProperty("setup");
    expect(joke).toHaveProperty("punchline");
  });

  test("saveJoke & getSavedJokes: 농담 저장 및 조회", async () => {
    await JokesSDK.saveJoke(mockJoke);

    const savedJokes = await JokesSDK.getSavedJokes();
    expect(savedJokes.length).toBeGreaterThan(0);
    expect(savedJokes).toContainEqual(mockJoke);
  });

  test("deleteJoke: 농담 삭제", async () => {
    await JokesSDK.saveJoke(mockJoke);

    await JokesSDK.deleteJoke(mockJoke.id);
    const savedJokes = await JokesSDK.getSavedJokes();
    expect(savedJokes).not.toContainEqual(mockJoke);
  });
});
