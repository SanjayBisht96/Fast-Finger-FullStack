import connection from '../connect';
import util from 'util';


function insertQuery (sql) {
  try{
    connection.query(sql, function (err, result) {
      if (err) throw err;
    });
  } catch(err) {
    console.log(err);
  }
}

async function selectQuery (sql) {
    let row = null;
    try{
    const query = util.promisify(connection.query).bind(connection);
    row = await query(sql);
    } catch(err){
      console.log(err);
    }
    return row;
}
  
export {
    insertQuery,
    selectQuery
}