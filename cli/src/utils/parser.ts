


export const parseCliArray = (str:string) => {
  return str.slice(1,str.length - 1).split(",").map((currentStr) => currentStr.trim());
}
