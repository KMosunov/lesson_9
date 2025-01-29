export class LoginDTO {
  username: string
  password: string

  private constructor(username: string, password: string) {
    this.username = username
    this.password = password
  }

  static createLoginWithCorrectData(): LoginDTO {
    return new LoginDTO(process.env.USERNAME || '', process.env.PASSWORD || '')
  }
  static createLoginWithIncorrectData(): LoginDTO {
    return new LoginDTO(process.env.USERNAME_1 || '', process.env.PASSWORD_1 || '')
  }
}
