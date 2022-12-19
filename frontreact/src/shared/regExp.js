export const userIdCheck = (id) => {
  // 최소조건
  // 첫글자는 대소문자로
  // 5자 이상 9자 미만
  // 입력값 [대소문자,숫자]
  let regExp = /[a-zA-Z0-9]{5,8}$/;
  return regExp.test(id);
};

export const passwordCheck = (pw) => {
  // 최소조건
  // 8자 이상 16자 미만
  // 입력값 [특수문자,대소문자,숫자]
  let regExp = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*()_+=~₩])(?=.*[0-9]).{8,15}$/;
  return regExp.test(pw);
};

// export const nickNameCheck = (nick) => {
//   // 최소조건
//   // 2자 이상 8자 미만
//   // 입력값 [대소문자,숫자][특수문자,대소문자,숫자,한글][!@#$%^&*()_+=~₩]
//   let regExp = /[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣][!@#$%^&*()_+=~₩]{2,7}/;

//   return regExp.test(nick);
// };
