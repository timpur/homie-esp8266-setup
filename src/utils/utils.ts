const EMPTY_VALS = [undefined, null];

export function createObjectDiff(currentObject: any, newObject: any) {
  const keys = [...Object.keys(currentObject), ...Object.keys(newObject)];
  const diff = {};
  for (let key of keys) {
    diff[key] = diffValue(currentObject[key], newObject[key]);
  }
  cleanupObject(diff, [undefined]);
  return diff;
}

function diffValue(currentVal: any, newVal: any) {
  if (valIsOneOf(currentVal, EMPTY_VALS) && valIsOneOf(newVal, EMPTY_VALS)) return undefined;
  if (!valIsOneOf(currentVal, EMPTY_VALS) && valIsOneOf(newVal, EMPTY_VALS)) return null;
  if (valIsOneOf(currentVal, EMPTY_VALS) && !valIsOneOf(newVal, EMPTY_VALS)) return newVal;
  if (typeof currentVal === "object" && typeof newVal === "object") return createObjectDiff(currentVal, newVal);
  if (currentVal !== newVal) return newVal;
  return undefined;
}

export function cleanupObject(object: object, removeIf: Array<any>) {
  for (let key of Object.keys(object)) {
    const val = object[key];
    if (valIsOneOf(val, removeIf)) {
      delete object[key];
    } else if (typeof val === "object" && val !== null) {
      cleanupObject(val, removeIf);
    }
  }
}

function valIsOneOf(val: any, vals: Array<any>) {
  return vals.indexOf(val) !== -1;
}

