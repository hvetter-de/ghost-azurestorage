const getDate = {
    useDate() {
      let date = new Date();
        date.getFullYear() +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        date.getDate() +
        date.getHours() +
        date.getMinutes() +
        "_";
    }
  };
  
  module.exports = getDate;
  