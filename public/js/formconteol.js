new Vue({
  el: "#formcontrol",
  data: {
    page: 1,
    errorCnt: 0,
    nameErr: "",
    mailErr: "",
    pass1Err: "",
    pass2Err: "",
    pass3Err: "",
    genderErr: "",
    name: "",
    mail: null,
    pass1: null,
    pass2: null,
    pass3: null,
    gender: 0,
  },
  methods: {
    validate: function (e) {
      this.errorCnt = 0;
      this.nameErr = "";
      this.mailErr = "";
      this.pass1Err = "";
      this.pass2Err = "";
      this.pass3Err = "";
      this.genderErr = "";

      if (this.name === "") {
        this.nameErr = "名前が入力されていません";
        this.errorCnt++;
      }
      if (!this.mail) {
        this.mailErr = "メールアドレスが入力されていません";
      } else if (!this.validateEmail(this.mail)) {
        this.mailErr = "有効なメールアドレスを入力してください";
        this.errorCnt++;
      }
      if (!this.pass1) {
        this.pass1Err = "パスワードが入力されていません";
        this.errorCnt++;
      }
      if (!this.pass2) {
        this.pass2Err = "パスワードが入力されていません";
        this.errorCnt++;
      } else if (this.pass1 !== this.pass2) {
        this.pass1Err = "パスワードが一致しません";
        this.pass2Err = "パスワードが一致しません";
        this.errorCnt++;
      } else if (!this.validatePassword(this.pass1)) {
        this.pass1Err = "半角英数字で６文字以上で入力してください";
        this.errorCnt++;
      } else if (this.pass1 === this.pass2) {
        this.pass3 = this.pass1;
      } else if (!this.pass3) {
        this.pass3Err = "パスワードが入力されていません";
        this.errorCnt++;
      } else if (!this.validatePassword(this.pass3)) {
        this.pass3Err = "半角英数字で６文字以上で入力してください";
        this.errorCnt++;
      }
      if (!this.gender == null) {
        this.genderErr = "性別が入力されていません";
        this.errorCnt++;
      }

      e.preventDefault();
      if (this.errorCnt == 0 ) {
        this.page++;
        return true;
      }
    },
    validateEmail: function (Mail) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(Mail);
    },
    validatePassword: function (pass) {
      const re = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i;
      return re.test(pass);
    },
    goHome: function () {
      window.location.href = "/";
    },
  },
});