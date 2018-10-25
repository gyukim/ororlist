var express = require("express");
var mysql = require("mysql");
const path = require("path");
var router = express.Router();
var db = mysql.createConnection({
  host: "35.231.214.187",
  user: "root",
  password: "123456",
  database: "or"
});

db.connect();
router.get("/", function(req, res, next) {
  db.query(`SELECT year,school,title, number FROM student`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/rand", function(req, res, next) {
  db.query(`SELECT * FROM student ORDER BY RAND()`, function(error, topics) {
    res.send(topics);
  });
});

router.get("/title", function(req, res, next) {
  db.query(
    `SELECT year,school,title, number FROM student ORDER BY title`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/title/reverse", function(req, res, next) {
  db.query(
    `SELECT year,school,title, number FROM student ORDER BY title DESC`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/school", function(req, res, next) {
  db.query(
    `SELECT year,school,title, number FROM student ORDER BY school`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/school/reverse", function(req, res, next) {
  db.query(
    `SELECT year,school,title, number  FROM student ORDER BY school DESC`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/year", function(req, res, next) {
  db.query(
    `SELECT  year,school,title, number FROM student ORDER BY year`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/year/reverse", function(req, res, next) {
  db.query(
    `SELECT year,school,title, number FROM student ORDER BY year DESC`,
    function(error, topics) {
      res.send(topics);
    }
  );
});

router.get("/textList", function(req, res, next) {
  db.query(`SELECT * FROM student`, function(error, topics) {
    res.send(topics);
  });
});

router.get("/onlytitle", function(req, res, next) {
  db.query(`SELECT title, number FROM student`, function(error, topics) {
    res.send(topics);
  });
});

router.get("/schoolindex", function(req, res, next) {
  db.query(`SELECT DISTINCT  school FROM student ORDER BY school`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/yearindex", function(req, res, next) {
  db.query(`SELECT DISTINCT  year FROM student ORDER BY year`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});
router.get("/lectureindex", function(req, res, next) {
  db.query(`SELECT DISTINCT  lecture FROM student ORDER BY lecture`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});
router.get("/mediaindex", function(req, res, next) {
  db.query(`SELECT DISTINCT  media FROM student ORDER BY media`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/onlytitle/rand", function(req, res, next) {
  db.query(`SELECT title, number FROM student ORDER BY RAND()`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/page/:id", function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  db.query(`SELECT * FROM student WHERE number= ${id}`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});
router.get("/page/:id/photo", function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  db.query(`SELECT photo, video,url FROM student WHERE number= ${id}`, function(
    error,
    topics
  ) {
    res.send(topics);
  });
});

router.get("/page/:id/lecture", function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  var lectureName = "";
  lectureGet(id).then(function(lectureName) {
    db.query(`SELECT * FROM lecture WHERE name= '${lectureName}'`, function(
      error,
      topics
    ) {
      res.send(topics);
    });
  });
});

router.get("/page/:id/relative", function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  var lectureName = "";
  lectureGet(id).then(function(lectureName) {
    db.query(
      `SELECT title,school,year FROM student WHERE lecture= '${lectureName}'`,
      function(error, topics) {
        res.send(topics);
      }
    );
  });
});

function lectureGet(id) {
  return new Promise(function(resolve, reject) {
    db.query(`SELECT * FROM student WHERE number= ${id}`, function(
      error,
      topics
    ) {
      resolve(topics[0].lecture);
    });
  });
}

router.get("/textList/rand", function(req, res, next) {
  db.query(`SELECT * FROM student ORDER BY RAND()`, function(error, topics) {
    res.send(topics);
  });
});

router.get("/:id", function(req, res, next) {
  res.send("ss");
});

module.exports = router;
