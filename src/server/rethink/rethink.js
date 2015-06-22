/**
 * Created by nathanleniz on 6/22/15.
 */
import r from 'rethinkdb';

let conn, sockets;

module.exports = {
  init(connection, io) {
    conn = connection;
    sockets = io;
  },

  insert(message, collection) {
    r.table(collection).insert([{
      message: message,
      time: Date.now()
    }]).run(conn, (err) => {
      if (err) throw err;
    });
  },

  get(collection, callback) {
    r.table(collection).run(conn, (err, cursor) => {
      if (err) {
        console.error(err);
        callback(err);
      }
      cursor.toArray((err, result) => {
        if (err) {
          console.error(err);
          callback(err);
        }
        callback(null, result);
      });
    });
  },

  subscribe(collection) {
    r.table(collection).changes().run(conn, function(err, cursor) {
      if (err) throw err;
      cursor.each(function(err, row) {
        if (err) throw err;
        console.log(row.new_val.message);
        sockets.emit('chat message', row.new_val.message);
      });
    });
  }
};