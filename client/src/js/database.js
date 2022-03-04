import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {

  const jateDataBase = await openDB('jate', 1);
  const transAct = jateDataBase.transaction('jate', 'readwrite');
  const storage = transAct.objectStore('jate');
  const request = storage.put({id:1, value: content });
  const result = await request;
  console.log('data saved to the jate database', result.value);

};

// logic for a method that gets all the content from the database
export const getDb = async () => {

  const jateDataBase = await openDB('jate', 1);
  const transAct = jateDataBase.transaction('jate', 'readonly');
  const storage = transAct.objectStore('jate');
  const request = storage.get(1);
  const result = await request;
  result ? console.log('data saved to the jate database', result.value) : 
  console.log('data not sent to the jate database.');
  return result?.value
};


initdb();