new Vue({
  el: "#loginCheck",
  data: {
    mail: "",
    password: "",
    mailError: "",
    passwordError: "",
    errorCnt: 0,
  },
  methods: {
    Validate: function (e) {
      this.mailError = "";
      this.passwordError = "";
      this.errorCnt = 0;

      if (!this.mail) {
        this.mailError = "メールアドレスが入力されていません";
        this.errorCnt++;
      } else if (!this.validateEmail(this.mail)) {
        this.mailError = "有効なメールアドレスを入力してください";
        this.errorCnt++;
      }
      if (!this.password) {
        this.passwordError = "パスワードが入力されていません";
        this.errorCnt++;
      } else if (!this.validatePassword(this.password)) {
        this.passwordError = "半角英数字で６文字以上で入力してください";
        this.errorCnt++;
      }
      e.preventDefault();
      // if (this.errorCnt == 0) {
      //   goSignup();
      // }
    },
    validateEmail: function (mail) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(mail);
    },
    validatePassword: function (pass) {
      const re = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i;
      return re.test(pass);
    },
    // goSignup: function () {
    //   window.location.href = "/signup";
    // },
  },
});
