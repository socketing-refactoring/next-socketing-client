export interface LoginData {
  email: string;
  password: string;
}

export interface Member {
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

export interface NicknameUpdatedMember {
  id: string;
  nickname: string;
}
