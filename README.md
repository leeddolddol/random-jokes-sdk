# 랜덤 농담 SDK

간단하고 재미있는 농담을 가져오고 관리할 수 있는 TypeScript SDK입니다.

## 설치 방법

```bash
npm install random-jokes-sdk
```

## 주요 기능

- 랜덤 농담 가져오기
- 농담 저장하기
- 저장된 농담 목록 조회
- 농담 삭제하기

## 사용 방법

```ts
import JokesSDK from "random-jokes-sdk";

// 랜덤 농담 가져오기
const joke = await JokesSDK.getRandomJoke();
console.log(joke);

// 농담 저장하기
await JokesSDK.saveJoke(joke);

// 저장된 농담 목록 조회
const savedJokes = await JokesSDK.getSavedJokes();
console.log(savedJokes);

// 농담 삭제하기
await JokesSDK.deleteJoke(joke.id);
```

## API 명세

### getRandomJoke()

- 새로운 랜덤 농담을 가져옵니다.
- 반환 타입: `Promise<Joke>`

### saveJoke(joke: Joke)

- 저장된 농담 목록에 새로운 농담을 추가합니다. 로컬 스토리지에 저장됩니다.
- 매개변수: `joke: Joke`
- 반환 타입: `Promise<void>`

### getSavedJokes()

- 저장된 모든 농담 목록을 가져옵니다.
- 반환 타입: `Promise<Joke[]>`

### deleteJoke(jokeId: number)

- 저장된 농담 목록에서 특정 농담을 삭제합니다.
- 매개변수: `jokeId: number`
- 반환 타입: `Promise<void>`

## Joke 타입

```ts
interface Joke {
  id: number;
  type: string;
  setup: string;
  punchline: string;
}
```

## 샘플 프로젝트

[샘플 프로젝트](./samples/jokes-app)를 참조하세요.

## 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다. 자세한 내용은 [LICENSE](./LICENSE) 파일을 참조하세요.
