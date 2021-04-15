var router = require("express").Router();

module.exports = (con) => {
  router.route("/main").get((req, res) => {
    console.log(req.session)
    const sql = "select * from chart where u_id = ? order by c_date asc";
    con.query(sql, [req.user.userId], function (err, results) {
      if (err) throw err;
      var list = [];
      for (const col of results) {
        list.push({
          date: col.c_date.toString(),
          userID:req.user.userId,
          money: col.c_money,
          used: col.c_used,
          year: col.c_year,
          month: col.c_month,
          day: col.c_day,
        });
      }
      const delDuplicate = list
      .reduce((a, c) => {
          let ele = a.find(e => e.date === c.date && e.used === c.used);
  
          if (ele) {
              ele.money += c.money;
          } else {
              a.push(c);
          }
  
          return a;
      }, []);
      res.render("../views/main.ejs", { 
        list: list ,
        delDuplicate:delDuplicate,
      });
    });
  });

  router.route("/").get((req, res) => {
    if (req.session && "user" in req.session.passport) {
      res.render("main", {});
    } else {
      res.render("../views/login.ejs");
    }
  });
  router.route("/signup").get((req, res) => {
    res.render("../views/signup.ejs");
  });

  return router;
};
