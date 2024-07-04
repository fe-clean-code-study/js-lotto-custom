function deepCopy(value) {
  if (value instanceof Map) {
    throw new Error("The value must not be Map");
  }

  if (value instanceof Set) {
    throw new Error("The value must not be Set");
  }

  if (Array.isArray(value)) {
    return value.map((v) => deepCopy(v));
  } else if (value === null) {
    return null;
  } else if (typeof value === "object") {
    const obj = {};

    for (const key of Object.keys(value)) {
      obj[key] = deepCopy(value[key]);
    }

    return obj;
  } else {
    return value;
  }
}

export default deepCopy;
