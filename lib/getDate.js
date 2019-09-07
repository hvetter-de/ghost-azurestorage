const getDate = {
    useDate() {
      let date = new Date();
      var result = date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        date.getHours() +
        date.getMinutes() +
        "_";
      return result
    }
  };
  
  module.exports = getDate;
  