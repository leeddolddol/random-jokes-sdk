// SDK에서 발생하는 에러를 나타내는 커스텀 에러 클래스
export class JokesSDKError extends Error {
  public name = "JokesSDKError";
  public originalError?: Error;

  constructor(message: string, originalError?: Error) {
    super(message);
    this.originalError = originalError;
  }
}
