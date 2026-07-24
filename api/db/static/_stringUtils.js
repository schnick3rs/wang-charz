const stringToKebab = function (text) {
  return text.toLowerCase().replace(/\W/gm, '-');
};



export {
  stringToKebab,
};
