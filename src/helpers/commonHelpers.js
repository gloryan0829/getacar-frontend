export const CheckEmail = (str) => {
  const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
  return !reg_email.test(str);
};

export const CheckNumber = (str) => {
  const reg_mobile = /^\d{3}-\d{3,4}-\d{4}$/;
  return !reg_mobile.test(str);
}
