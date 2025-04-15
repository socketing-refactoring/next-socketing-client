export interface LoginData {
  email: string;
  password: string;
}

export interface Manager {
  id?: string;
  name: string;
  nickname: string;
  email: string;
}

export interface AuthTokenData {
  tokenType: string;
  expiresIn: string;
  accessToken: string;
}

export interface NicknameUpdatedManager {
  id: string;
  nickname: string;
}
