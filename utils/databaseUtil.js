import connection from '../connect';
import util from 'util';
//const util = require('util');

function insertQuery (sql) {
    if(!connection.connect()){
      throw err;
    }
    connection.query(sql, function (err, result) {
      if (err) throw err;
    });
    connection.end();
  }

async function selectQuery (sql) {
    if(!connection.connect()){
      throw err;
    }

    let row = null;
    const query = util.promisify(connection.query).bind(connection);
    row = await query(sql);
    connection.end();
    return row;
}  
  
export {
    insertQuery,
    selectQuery
}