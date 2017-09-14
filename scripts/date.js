var makeDate = function() {
  var d = new Date();
  var formatedDate = '';

  formatedDate += (d.getMonth() + 1) + '-';
  formatedDate += d.getDate() + '-';
  formatedDate += d.getFullyear();

  return formatedDate;
}

module.exports = makeDate;