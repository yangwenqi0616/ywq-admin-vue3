<template>
  <div class="wrap">
    <div class="login-wrap">
      <div class="ms-login">
        <el-tabs type="border-card" class="tabs">
          <el-tab-pane label="个人">
            <el-tabs>
              <el-tab-pane label="密码登录">
                <el-form
                  ref="personPassFrom"
                  :model="personPassFrom"
                  :rules="rules"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="tel" label="手机号">
                    <el-input
                      :maxlength="11"
                      class="login-input"
                      v-model="personPassFrom.tel"
                      placeholder="手机号"
                    >
                    </el-input>
                  </el-form-item>
                  <el-form-item prop="pass" label="密码">
                    <el-input
                      :maxlength="20"
                      class="login-input"
                      type="password"
                      placeholder="6-20位字母、数字、字符组合"
                      v-model="personPassFrom.pass"
                      @keyup.enter="submitForm('ruleForm')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="code" label="图形验证码">
                    <el-input
                      :maxlength="4"
                      v-model="personPassFrom.code"
                      class="validate-code"
                      placeholder="图形验证码"
                    ></el-input>
                    <div class="code" @click="refreshCode">
                      <img
                        v-if="personPassFrom.identifyCode"
                        :src="`${userUrl}xxxUrl${personPassFrom.identifyCode}`"
                        alt
                      />
                    </div>
                  </el-form-item>
                  <div class="login-btn">
                    <el-button
                      type="primary"
                      round
                      @click="submitForm1('personPassFrom')"
                    >登录
                    </el-button
                    >
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="手机号快捷登录">
                <el-form
                  :model="personTelFrom"
                  :rules="rules"
                  ref="personTelFrom"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="tel" label="手机号">
                    <el-input
                      :maxlength="11"
                      class="login-input"
                      v-model="personTelFrom.tel"
                      placeholder="手机号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="phoneCode" label="短信验证码">
                    <el-input
                      :maxlength="6"
                      v-model="personTelFrom.phoneCode"
                      class="validate-code"
                      placeholder="短信验证码"
                    ></el-input>
                    <div>
                      <el-button
                        :type="type"
                        :disabled="!show"
                        @click="getSmsVerifyCode"
                        class="show"
                      >
                        <span v-show="show">获取验证码</span>
                        <span v-show="!show" class="count"
                        >{{ count }}s后重新发送</span
                        >
                      </el-button>
                    </div>
                  </el-form-item>
                  <el-form-item prop="code" label="图形验证码">
                    <el-input
                      :maxlength="4"
                      v-model="personTelFrom.code"
                      class="validate-code"
                      placeholder="图形验证码"
                    ></el-input>
                    <div class="code" @click="newrefreshCode">
                      <img
                        v-if="personTelFrom.identifyCode"
                        :src="`${taxUrl}xxx/image/${personTelFrom.identifyCode}`"
                        alt
                      />
                    </div>
                  </el-form-item>
                  <div class="login-btn">
                    <el-button
                      type="primary"
                      round
                      @click="submitForm2('personTelFrom')"
                    >登录
                    </el-button
                    >
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="企业">
            <el-tabs>
              <el-tab-pane label="账户密码登录">
                <el-form
                  :model="companyFrom"
                  :rules="rules"
                  ref="companyFrom"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="name" label="用户名">
                    <el-input
                      class="login-input"
                      v-model="companyFrom.name"
                      placeholder="用户名"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="pass" label="密码">
                    <el-input
                      :maxlength="20"
                      class="login-input"
                      type="password"
                      placeholder="6-20位字母、数字、字符组合"
                      v-model="companyFrom.pass"
                      @keyup.enter="submitForm('ruleForm')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="code" label="图形验证码">
                    <el-input
                      v-model="companyFrom.code"
                      :maxlength="4"
                      class="validate-code"
                      placeholder="图形验证码"
                    ></el-input>
                    <div class="code" @click="refreshCode">
                      <img
                        v-if="companyFrom.identifyCode"
                        :src="`${userUrl}xxxUrl${companyFrom.identifyCode}`"
                        alt
                      />
                    </div>
                  </el-form-item>
                  <div class="login-btn">
                    <el-button
                      type="primary"
                      round
                      @click="submitForm3('companyFrom', companyFrom)"
                    >登录
                    </el-button
                    >
                  </div>
                </el-form>
              </el-tab-pane>
              <el-tab-pane label="邮箱密码登录">
                <el-form
                  :model="companyEmailFrom"
                  :rules="rules"
                  ref="companyEmailFrom"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item prop="email" label="邮箱">
                    <el-input
                      class="login-input"
                      v-model="companyEmailFrom.email"
                      placeholder="邮箱"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="pass" label="密码">
                    <el-input
                      :maxlength="20"
                      class="login-input"
                      type="password"
                      placeholder="6-20位字母、数字、字符组合"
                      v-model="companyEmailFrom.pass"
                      @keyup.enter="submitForm('ruleForm')"
                    ></el-input>
                  </el-form-item>
                  <el-form-item prop="code" label="图形验证码">
                    <el-input
                      v-model="companyEmailFrom.code"
                      :maxlength="4"
                      class="validate-code"
                      placeholder="图形验证码"
                    ></el-input>
                    <div class="code" @click="refreshCode">
                      <img
                        v-if="companyEmailFrom.identifyCode"
                        :src="`${userUrl}xxxUrl${companyEmailFrom.identifyCode}`"
                        alt
                      />
                    </div>
                  </el-form-item>
                  <div class="login-btn">
                    <el-button
                      type="primary"
                      round
                      @click="submitForm3('companyEmailFrom', companyEmailFrom)"
                    >登录
                    </el-button
                    >
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { REG_USER_NAME, REG_EMAIL, REG_IS_PHONE } from "@/utils/reg_exp";
import { ElMessage } from "element-plus";
import { setToken } from "@/utils/common";
import { useStore } from "vuex";
import {
  computed,
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch
} from "vue";

const TIME_COUNT = 60;
export default defineComponent({
  name: "login",
  // setup() {
  //   const store = useStore();
  //   const personPassFrom = ref();
  //   const personTelFrom = ref();
  //   const companyFrom = ref();
  //   const companyEmailFrom = ref();
  //   const refs: any = {
  //     personPassFrom, personTelFrom, companyFrom, companyEmailFrom
  //   };
  //   return {refs, store};
  // },
  data() {
    let validateName = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        let reg = REG_USER_NAME;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("6-20位字母、数字、字符组合"));
        }
      }
    };
    let validateEmail = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        if (REG_EMAIL.test(value)) {
          callback();
        } else {
          callback(new Error("邮箱格式错误"));
        }
      }
    };
    let validatePass = (rule: any, value: any, callback: any) => {
      value = value.trim();
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (REG_USER_NAME.test(value)) {
          callback();
        } else {
          callback(new Error("6-20位字母、数字、字符组合"));
        }
      }
    };
    let validateTel = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        let reg = REG_IS_PHONE;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("手机号格式有误"));
        }
      }
    };
    let validateTelCode = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    let validateCode = (rule: any, value: any, callback: any) => {
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      userUrl: "/api/xx/",
      taxUrl: "/api/xx/",
      codeImg: "",
      personPassFrom: {
        //个人密码登录
        loginType: "BY_PASSWORD",
        userType: "PERSONAL",
        tel: "",
        pass: "",
        identifyCode: "",
        code: "",
        agreement: true
      },
      personTelFrom: {
        //个人手机号登录
        loginType: "BY_PHONE_CODE",
        userType: "PERSONAL",
        tel: "",
        name: "",
        pass: "",
        code: "",
        identifyCode: "",
        phoneCode: ""
      },
      companyFrom: {
        //企业登录
        loginType: "passType",
        userType: "ENTERPRISE",
        name: "",
        pass: "",
        code: "",
        identifyCode: ""
      },
      companyEmailFrom: {
        //企业邮箱登录
        loginType: "BY_EMAIL",
        userType: "ENTERPRISE",
        email: "",
        pass: "",
        code: "",
        identifyCode: ""
      },
      rules: {
        tel: [{ validator: validateTel, trigger: "blur" }],
        name: [{ validator: validateName, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        pass: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: validateCode, trigger: "blur" }],
        phoneCode: [{ validator: validateTelCode, trigger: "blur" }]
      },
      type: "primary",
      show: true,
      count: 0,
      timer: 0,
      userToken: "" // 用户token
    };
  },
  methods: {
    submitForm1(formName: string) {
      //个人密码登录
      this.submitForm(formName, this.personPassFrom);
    },
    //个人手机号登录
    submitForm2(formName: any) {
      (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
        if (valid) {
          console.log("个人手机号登录");
        }
      });
    },
    submitForm3(formName: string, sendFrom: any) {
      //企业登录
      formName == "companyEmailFrom" ? (sendFrom.name = sendFrom.email) : "";
      this.submitForm(formName, sendFrom);
    },
    // 手机短信验证码倒计时
    send() {
      if (!this.timer) {
        this.count = TIME_COUNT;
        this.show = false;
        const timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--;
          } else {
            this.show = true;
            clearInterval(timer);
          }
        }, 1000);
      }
    },
    //发送短信验证码
    getSmsVerifyCode() {
      if (this.personTelFrom.tel != "") {
        this.send();
        console.log("send");
      } else {
        ElMessage.warning("请输入电话号");
      }
    },
    // 个人手机号快捷登录   获取最新的图片验证码
    newrefreshCode() {
      console.log("get");
    },
    refreshCode() {
      console.log("refresh");
    },
    submitForm: function (formName: any, param: any = {}) {
      (this.$refs[formName] as HTMLFormElement).validate((valid: any) => {
        if (valid) {
          param["pass"] = param["pass"].trim();
          this.$router.push("/dashboard");
          setToken("111");
        } else {
          console.log("loginErr");
        }
      });
    },
    formatPhone(phone: string) {
      if (phone) {
        const pat = /(\d{3})\d*(\d{4})/;
        let newPhone = phone.replace(pat, "$1****$2");
        return newPhone;
      } else {
        return phone;
      }
    }
  }
});
</script>
<style lang="scss">
.wrap {
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;
  margin-top: 200px;
}

.login-wrap {
  width: 500px;
  max-width: 100%;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  z-index: 999;
  box-shadow: 3px 3px 15px #c3d0d9;

  .show {
    margin-left: 10px;
  }

  .validate-code {
    float: left;
    width: 196px !important;
  }

  .code {
    float: left;
    width: 112px;
    height: 40px;

    img {
      display: inline-block;
      width: 100%;
      height: 100%;
      margin-left: 10px;
    }
  }

  .login-input {
    width: 320px;
  }

  .el-form-item__content {
    display: flex;
  }

  .login-btn {
    margin: 0 auto;
    text-align: center;

    .el-button--primary,
    .el-button--info {
      width: 80%;
      margin: 10px 0;
    }
  }
}
</style>
