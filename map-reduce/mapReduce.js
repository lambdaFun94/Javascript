/*
 * MapReduce for educative JS course
 *
 */

const setup = (arr) => {
  let obj = {};
  arr.forEach((row) => {
    let [fst, snd] = row;
    if (obj[fst]) {
      obj[fst].push(snd);
    } else {
      obj[fst] = [snd];
    }
    if (obj[snd]) {
      obj[snd].push(fst);
    } else {
      obj[snd] = [fst];
    }
  });
  return obj;
};

const mapper = (obj) => {
  const alphaOrder = (letOne, letTwo) =>
    letOne < letTwo ? letOne + letTwo : letTwo + letOne;

  const arr = [];
  for (let key in obj) {
    let val = obj[key];
    const newKeys = val.map((item) => alphaOrder(item, key));
    newKeys.forEach((item) => {
      let obj = {};
      obj[item] = val;
      arr.push(obj);
    });
  }
  return arr;
};

const group = (arr) => {
  let obj = {};
  arr.forEach((elem) => {
    for (let key in elem) {
      if (!obj[key]) {
        obj[key] = new Array();
        obj[key].push(elem[key]);
      } else {
        obj[key].push(elem[key]);
      }
    }
  });
  return obj;
};

const reducer = (obj) => {
  let returnObj = {};
  for (let key in obj) {
    let arr = [];
    const [fst, snd] = obj[key];
    fst.forEach((elem) => {
      snd.includes(elem) ? arr.push(elem) : "";
    });
    returnObj[key] = arr;
  }
  return returnObj;
};

const mapReduce = (array) => reducer(group(mapper(setup(array))));
export default mapReduce;
