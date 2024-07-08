const cloneDeep = (obj) => {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  if (Array.isArray(obj)) {
    const clonedArray = [];
    obj.forEach(item => {
      clonedArray.push(cloneDeep(item));
    })
    return clonedArray;
  }

  const clonedObj = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clonedObj[key] = cloneDeep(obj[key]);
    }
  }
  return clonedObj;
}

export default cloneDeep;
