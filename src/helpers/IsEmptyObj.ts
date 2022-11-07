export function isEmptyObj(obj: any) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
