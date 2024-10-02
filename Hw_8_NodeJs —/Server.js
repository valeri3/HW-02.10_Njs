var express = require('express');
var app = express();
var mssql = require('mssql');

var port = 8080;

var config = {
    user: 'oleg',
    password: '123',
    server: 'ASUS_PC\\SQLEXPRESS',
    database: 'Library',
    port: 1433,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

function createHtmlTable(data) {
    let html = `<table border="1" cellpadding="5" cellspacing="0"><thead><tr>`;
    // заголовки
    Object.keys(data[0]).forEach(column => {
        html += `<th>${column}</th>`;
    });
    html += `</tr></thead><tbody>`;
    // строки
    data.forEach(row => {
        html += `<tr>`;
        Object.values(row).forEach(value => {
            html += `<td>${value}</td>`;
        });
        html += `</tr>`;
    });
    html += `</tbody></table>`;
    return html;
}

// 1 все книги
// http://localhost:8080/books
app.get('/books', function(req, res) {
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.query('SELECT * FROM Books', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset));
            }
            connection.close();
        });
    });
});

// 2 книги конкретного автора
// http://localhost:8080/books/author/1
app.get('/books/author/:authorId', function(req, res) {
    var authorId = req.params.authorId;
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.input('authorId', mssql.Int, authorId);
        request.query('SELECT * FROM Books WHERE Id_Author = @authorId', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset));
            }
            connection.close();
        });
    });
});

// 3 книги конкретного издательства
// http://localhost:8080/books/press/2
app.get('/books/press/:pressId', function(req, res) {
    var pressId = req.params.pressId;
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.input('pressId', mssql.Int, pressId);
        request.query('SELECT * FROM Books WHERE Id_Press = @pressId', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset));
            }
            connection.close();
        });
    });
});

// 4 все студенты
// http://localhost:8080/students
app.get('/students', function(req, res) {
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.query('SELECT * FROM Students', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset));
            }
            connection.close();
        });
    });
});

// 5 студенты конкретной группы
// http://localhost:8080/students/group/3
app.get('/students/group/:groupId', function(req, res) {
    var groupId = req.params.groupId;
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.input('groupId', mssql.Int, groupId);
        request.query('SELECT * FROM Students WHERE Id_Group = @groupId', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset));
            }
            connection.close();
        });
    });
});

// 6 все преподаватели
// http://localhost:8080/teachers
app.get('/teachers', function(req, res) {
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.query('SELECT * FROM Teachers', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset)); //
            }
            connection.close();
        });
    });
});

// 7 все факультеты
// http://localhost:8080/faculties
app.get('/faculties', function(req, res) {
    var connection = new mssql.ConnectionPool(config);
    connection.connect(function(err) {
        if (err) throw err;
        var request = new mssql.Request(connection);
        request.query('SELECT * FROM Faculties', function(err, data) {
            if (err) console.log(err);
            else {
                res.send(createHtmlTable(data.recordset));
            }
            connection.close();
        });
    });
});

app.listen(port, function() {
    console.log(`App running on port ${port}`);
});
