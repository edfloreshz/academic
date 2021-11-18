const setKeyValue = function <T extends object, U extends keyof T>(
  obj: T,
  key: U,
  newValue: T[U]
): T {
  let currentValue = obj[key];
  newValue = parse(currentValue, newValue);
  obj[key] = newValue;
  return obj;
};

function parse(currentValue: any, newValue: any): any {
  switch (typeof currentValue) {
    case "number":
      console.log(currentValue, newValue)
      if (newValue !== "") {
        return parseInt(newValue);
      } else {
        return 0;
      }
    case "string":
      return newValue;
    case "boolean":
      return JSON.parse(newValue);
    default:
      return null;
  }
}

export { setKeyValue };
