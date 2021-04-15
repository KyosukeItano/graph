const express = require("express");
const ejs = require("ejs");
const mysql = require("mysql");
const app = express();
var passport = require("passport");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
var bodyParser = require("body-parser");
var userId;

// mysql
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "graph",
});
// EJS設定
app.set("view engine", "ejs");
app.set("ejs", ejs.renderFile);
app.engine("ejs", ejs.renderFile);
app.use(express.static("public"));
// bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(
  cookieSession({
    keys: ["aaa", "iii", "uuu"],
  })
);
app.use(
  session({
    secret: "itanonono",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60 * 1000,
    },
  })
);

//セッション

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

var LocalStrategy = require("passport-local").Strategy;
// 認証処理の定義
passport.use(
  new LocalStrategy(function (mail, password, done) {
    con.query("select * from user;", function (err, users) {
      var mails = [];
      var passwords = [];
      var id = [];
      for (i = 0; i < users.length; i++) {
        mails.push(users[i].u_email);
        passwords.push(users[i].u_password);
        id.push(users[i].u_id);
      }
      if (mails.includes(mail) && passwords.includes(password)) {
        const sql = "select * from user where u_email = ? AND u_password = ?;";
        con.query(sql, [mail, password], function (err, table) {
          userId = table[0].u_id;
          const user = { mail, password, userId };
          done(null, user);
        });
      } else {
        res.redirect("/")
        done(null, false);
      }
    });
  })
);

// routing
app.use("/", require("./routes/route.js")(con));

// 認証処理
app.post(
  "/",
  passport.authenticate("local", { session: true }),
  function (req, res) {
    res.redirect("/main");
  }
);

// 新規登録
app.post("/signup", function (req, res, next) {
  con.query("select * from user;", function (err) {
    const sql =
      "insert into user (u_username,u_email,u_password,u_gender,u_create) values(?,?,?,?,?);";
    con.query(
      sql,
      [
        req.body.uname,
        req.body.uemail,
        req.body.upassword,
        req.body.ugender,
        new Date(),
      ],
      function (err, results) {
        if (err) throw err;
        res.redirect("/");
      }
    );
  });
});

// main database追加
app.post("/main", function (req, res) {
  con.query("select * from chart", function (err) {
    const sql =
      "insert into chart(c_date,u_id,c_money,c_used,c_year,c_month,c_day) values (?,?,?,?,?,?,?);";
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const date = year + "-" + month + "-" + day;
    if (date === "--") {
      return false;
    }
    con.query(
      sql,
      [date, userId, req.body.input_money, req.body.use, year, month, day],
      function (err) {
        if (err) throw err;
        res.redirect("/main")
      }
    );
  });
});

// ログアウト
app.get("/logout", function (req, res) {
  req.logout();
  res.redirect("/");
});


app.listen(8080, () => {
  console.log("server start");
  console.log("http://localhost:8080/");
});
