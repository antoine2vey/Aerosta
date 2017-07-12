import { SQLite } from 'expo';

const db = SQLite.openDatabase('aerosta');

const insertBalloon = (lat, lng, h = 18.8) =>
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO balloons (code, height, lat, lng) VALUES (?, ?, ?, ?);`,
      ['ACC363', h, lat, lng]
    );
  })

const clearDb = () =>
  db.transaction(tx => tx.executeSql('delete from aerostagram'));

const clearBalloon = (col, val) =>
  db.transaction(tx => tx.executeSql(`delete from aerostagram where ${col}=${val}`));

const initDatabase = () =>
  db.transaction(tx => {
    tx.executeSql('create table if not exists balloons (id integer primary key not null, code text, height float, lat float, lng float);');
    tx.executeSql(`
      create table if not exists aerostagram
      (id integer primary key not null,
      image string,
      liked int default 0,
      description text,
      title string,
      hashtags text,
      faved int default 0);
    `);
  });

export { db, insertBalloon, clearBalloon, clearDb, initDatabase};
