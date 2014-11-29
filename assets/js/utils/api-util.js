
module.exports = {

  /**
   * 指定したURLに対するAPIのURLを返す。
   * @param {String} url 利用するAPI
   * @returns APIに対するURL
   */
  getApi: function(url) {
    'use strict';
    return 'http://localhost:3000/api/' + url;
  }
};
