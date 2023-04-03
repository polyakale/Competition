require("dotenv").config();

const express = require("express");
const mysql = require("mysql");
const app = express();
const sanitizeHtml = require("sanitize-html");

const pool = require("./config/database.js");
const {
  sendingGet,
  sendingGetError,
  sendingGetById,
  sendingPost,
  sendingPut,
  sendingDelete,
  sendingInfo,
} = require("./config/sending.js");

//#region middlewares
app.use(express.json());
//#endregion middlewares

//#region students
app.get("/students", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403)
      return;
    }
    const sql = "SELECT * FROM students";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/students/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM students
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM students
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/students", (req, res) => {
  console.log(req.body);
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    TestScore: mySanitizeHtml(req.body.TestScore)
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403);
      return;
    }
    const sql = `
    INSERT INTO students
      (Name, TestScore)
      VALUES
      (?, ?)
    `;
    connection.query(
      sql,
      [newR.Name, newR.TestScore],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/students/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    TestScore: mySanitizeHtml(req.body.TestScore)
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403);
      return;
    }

    const sql = `
    UPDATE students SET
    Name = ?,
    TestScore = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.Name, newR.TestScore, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/students/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403);
      return;
    }

    const sql = `
    DELETE from students
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion students

//#region competitiond
app.get("/competitions", (req, res) => {
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403)
      return;
    }
    const sql = "SELECT * FROM competitions";
    connection.query(sql, (error, results, fields) => {
      sendingGet(res, error, results);
    });
    connection.release();
  });
});

app.get("/competitions/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403)
      return;
    }
    //   const sql = `
    //   SELECT * FROM students
    // WHERE id = ${id}
    //   `;
    const sql = `
    SELECT * FROM competitions
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingGetById(res, error, results, id)
    });
    connection.release();
  });
});

app.post("/competitions", (req, res) => {
  console.log(req.body);
  const newR = {
    competitionName: mySanitizeHtml(req.body.competitionName)
  };

  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403);
      return;
    }
    const sql = `
    INSERT INTO students
      (Name, TestScore)
      VALUES
      (?, ?)
    `;
    connection.query(
      sql,
      [newR.Name, newR.TestScore],
      (error, results, fields) => {
        sendingPost(res, error, results, newR);
      }
    );
    connection.release();
  });
});

//update
app.put("/competitions/:id", (req, res) => {
  const id = req.params.id;
  const newR = {
    Name: mySanitizeHtml(req.body.Name),
    TestScore: mySanitizeHtml(req.body.TestScore)
  };
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403);
      return;
    }

    const sql = `
    UPDATE students SET
    Name = ?,
    TestScore = ?
    WHERE id = ?
  `;
    connection.query(
      sql,
      [newR.Name, newR.TestScore, id],
      (error, results, fields) => {
        sendingPut(res, error, results, id, newR)
      }
    );
    connection.release();
  });
});

app.delete("/competitions/:id", (req, res) => {
  const id = req.params.id;
  pool.getConnection(function (error, connection) {
    if (error) {
      sendingInfo(res, 0, "Server ERROR", [], 403);
      return;
    }

    const sql = `
    DELETE from students
  WHERE id = ?
  `;
    connection.query(sql, [id], (error, results, fields) => {
      sendingDelete(res, error, results, id)
    });
    connection.release();
  });
});

//#endregion competitions

function mySanitizeHtml(data) {
  return sanitizeHtml(data, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

app.listen(process.env.APP_PORT, () => {
  console.log(`Data server, listen port: ${process.env.APP_PORT}`);
});
