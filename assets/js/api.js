var $ = require('jquery');

var apiRoot = 'http://localhost:3000/api';

function url(resource) {
  'use strict';
  return apiRoot + '/' + resource;
}

module.exports = {
  /**
   * 指定したリソースの全件を取得する
   * 
   * @param {String} resource 取得するリソース名
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  getAll : function(resource) {
    'use strict';
    return $.getJSON(url(resource));
  },

  /**
   * 指定したリソースに対してpostメソッドを実行する。
   * 
   * @param {String} resource post先のリソース名
   * @param {Object} data postするデータオブジェクト
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  post: function(resource, data) {
    'use strict';
    return $.ajax({
      type: 'POST',
      url : url(resource),
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType : 'json'
    });
  },
  
  /**
   * 指定したリソースに対してputメソッドを実行する。
   * 
   * @param {String} resource post先のリソース名
   * @param {String} id put対象のリソースid
   * @param {Object} data postするデータオブジェクト
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  put: function(resource, id, data) {
    'use strict';
    return $.ajax({
      type: 'PUT',
      url : url(resource) + '/' + id,
      data: JSON.stringify(data),
      contentType: 'application/json',
      dataType : 'json'
    });
  },

  /**
   * 指定したリソースのidに対してdeleteメソッドを実行する
   * 
   * @param {String} resource post先のリソース名
   * @param {String} id 削除するリソースのid
   * @returns {jQuery.Deferred} deferredオブジェクト
   */
  del: function(resource, id) {
    'use strict';
    return $.ajax({
      type: 'DELETE',
      url : url(resource) + '/' + id
    });
  }
};
