// cookie 설정 및 삭제가 용이하도록 instance를 생성하였습니다.
const setCookie = (name, value, exp = 5) => {
  // 현재 날짜와 시간이 지정된 date 객체 생성
  let date = new Date();
  // setTime () 메서드는 Date 객체를 1970 년 1 월 1 일 00:00:00 UTC부터 밀리 초 단위로 나타내는 시간으로 설정
  // getTime() 메서드는 표준시에 따라 지정된 날짜의 시간에 해당하는 숫자 값을 반환
  // exp = 5가 입력되었으므로, 5일 * 24시간 * 60분 * 60초 * 1000밀리초
  // 쿠키가 설정되면 5일 동안 유효하다는 뜻인것 같다.
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};

const deleteCookie = (name) => {
  // 쿠키를 삭제하는 방법은 과거의 날짜를 지정하여 expire로 인식하게 만드는 것이다.
  let date = new Date("2020-01-01").toUTCString();
  document.cookie = name + "=; expires=" + date;
};

export { setCookie, deleteCookie };
