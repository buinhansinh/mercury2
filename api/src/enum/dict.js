module.exports = (values) => {
  var dic = {};
  values.forEach((v, i) => {
    dic[v] = i;
  });
  return dic;
}