import { TIMEOUT_SEC } from './config';

export const AJAX = async (url, recipeData = undefined) => {
  try{
    const fetchData =  recipeData ?fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(recipeData),
    }) : fetch(url);
    const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]) ;
    const data = await res.json();
    if (res.ok === false) throw new Error(`${data.message} ${res.status}`);
    return data
  }catch(err) {
    throw err
  }
}
// export const getJSON = async (url) => {
//   try {
//
//   } catch (err) {
//   throw err;
//   }
// }
export const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// export const sendJSON = async (url, recipeData) => {
//   try {
//     const fetchData =
//     const res = await Promise.race([fetchData, timeout(TIMEOUT_SEC)]) ;
//     const data = await res.json();
//     if (res.ok === false) throw new Error(`${data.message} ${res.status}`);
//     return data
//   } catch (err) {
//     throw err;
//   }
// }