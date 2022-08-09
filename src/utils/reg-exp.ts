export const REG_USER_NAME = /(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+|\\s+)$)^[\w~!@#$%^&*?./]{6,20}$/;// 6-20位字母、数字、字符组合
export const REG_EMAIL = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/; // 邮箱格式
export const REG_IS_PHONE = /^1\d{10}$/;
export const REG_ID_CARD_15 = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;//是否是身份证号码（15位）
export const REG_ID_CARD_18 = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;//是否是身份证号码（18位）
export const REG_IS_CHINESE = /[\u4e00-\u9fa5]+/g;//判断是否是汉字
