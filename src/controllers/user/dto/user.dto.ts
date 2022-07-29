export default class User {
  private user_name;
  private phone_number;
  private name;
  private password;
  private birthday;
  private register;
  public user_status;
  public accept_date;
  public refresh_token;

  constructor(body: any) {
    this.user_name = body.user_name;
    // 유니크한 아이디
    this.phone_number = body.phone_number;
    // 휴대폰 번호
    this.name = body.name;
    // 사용자 이름
    this.password = body.password;
    // 비밀번호 필수
    this.birthday = body.birthday;
    // 생일 필수
    this.register = body.register;
    // 가입 경로 ex) kakao , self
    this.user_status = body.user_status;
    // 유저 상태 delete active
    this.accept_date = body.accept_date;
    // 동의 날짜
    this.refresh_token = body.refresh_token;
    // 리프레시 토큰
  }
}

export { User };
