import { describe, test, expect, vi } from "vitest"; // Vitest에서 필요한 함수 임포트
import { fetchRandomJoke } from "../src/api/jokesAPI"; // 테스트할 함수 가져오기
type Response = globalThis.Response;
declare const global: { fetch: typeof fetch };

// 테스트 그룹: fetchRandomJoke 함수
describe("fetchRandomJoke", () => {
  // 성공적인 호출 테스트
  test("API 호출 성공 시, 유효한 농담 데이터를 반환해야 합니다.", async () => {
    // 가짜 응답(mock response) 설정
    const mockResponse = {
      id: 1,
      type: "general",
      setup: "Why don't skeletons fight each other?",
      punchline: "They don't have the guts.",
    };

    // axios의 get 메서드를 가짜로 설정
    vi.spyOn(global, "fetch").mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    } as Response);

    // fetchRandomJoke 호출
    const joke = await fetchRandomJoke();

    // 반환된 데이터가 올바른지 확인
    expect(joke).toHaveProperty("id", mockResponse.id);
    expect(joke).toHaveProperty("setup", mockResponse.setup);
    expect(joke).toHaveProperty("punchline", mockResponse.punchline);

    // fetch 스파이를 복구
    vi.resetAllMocks();
  });

  // 실패 시 에러 처리 테스트
  test("API 호출 실패 시, 에러를 발생시켜야 합니다.", async () => {
    // fetch 메서드를 가짜로 설정하여 에러를 반환
    vi.spyOn(global, "fetch").mockRejectedValueOnce(new Error("Network Error"));

    // 함수 호출 시 에러가 발생하는지 확인
    await expect(fetchRandomJoke()).rejects.toThrow(
      "Failed to fetch a random joke"
    );

    // fetch 스파이를 복구
    vi.resetAllMocks();
  });
});
