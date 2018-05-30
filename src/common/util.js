/**
 * Created by Feil(admin@feil.wang) on 2018/5/13.
 */
let localCache = { // 本地缓存部分都在这里,
  _sessionstorage: window.sessionStorage,
  _localstorage: window.localStorage, // 修改成了localStorage, 以便于保存更多的内容.

  /**
   *
   * 判断是否存在storage 这个方法
   */
  _hasStorage: function () {
    return this._sessionstorage || this._localstorage;
  },

  /**
   *  返回一个类别
   * @private
   * @param{String} tp        类别 session/storage，默认storage
   */
  _getstorage: function (tp) {
    return !tp ? this._localstorage : tp === 'session' ? this._sessionstorage : this._localstorage;
  },

  /**
   *  返回该类别下的所有数据
   * @param{String} tp        类别 session/storage，默认storage
   */
  getAll: function (tp) {
    if (!this._hasStorage()) {
      return false;
    }
    // 这里没有做decode (decodeURIComponent) 处理, 我们假设我们拿的都是原数据, 我们需要的. 具体显示时各业务模块自己处理
    let i;
    let s = this._getstorage(tp);
    let data = {};
    for (i in s) {
      data[i] = this.get(i, tp);
    }
    return data;
  },

  /**
   *  返回该类别下的该字段数据
   * @param{String} key        选择的字段
   * @param{String} tp        类别 session/storage，默认storage
   */
  get: function (key, tp) {
    if (!this._hasStorage()) {
      return false;
    }
    let s = this._getstorage(tp);
    if (!key || !s.getItem(key)) {
      return false;
    }
    let v = s.getItem(key);
    if (/^({(.*)}|\[(.*)])$/.test(v)) {
      // 取的时候, 一般情况下我们给出的应该是json对象.
      return JSON.parse(s.getItem(key));
    }
    return v;
  },

  /**
   *  设置 session
   * @param {String} key            键值
   * @param {Object} value        存储内容
   * @param {String} tp            类别 session/storage，默认storage
   */
  set: function (key, value, tp) {
    if (!this._hasStorage() || !key || value === undefined) {
      return false;
    }
    let s = this._getstorage(tp);
    let val;
    if (typeof value === 'object') {
      val = JSON.stringify(value);
    } else {
      val = value;
    }
    s.setItem(key, val);
  },

  /**
   *  移除某类别下某键值的值
   * @param {String}key            键值
   * @param {String}tp            类别 session/storage，默认storage
   */
  remove: function (key, tp) {
    if (!key || !this._hasStorage()) {
      return false;
    }
    let s = this._getstorage(tp);
    if (s.getItem(key)) {
      s.removeItem(key);
      return true;
    }
    return false;
  },

  /**
   *  移除全部或者移除某个类别的全部
   * @param {String}tp        类别 session/storage，默认storage
   * @param {Object}isAll    是否删除所有
   */
  removeAll: function (tp, isAll) {
    if (!this._hasStorage()) {
      return false;
    }
    if (!isAll) {
      return this._getstorage(tp).clear();
    }
    this._sessionstorage.clear();
    this._localstorage.clear();
    return true;
  }
};

let validate = {
  isPhone(phone) {
    return /^(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(phone)
  },
  isEmail(email) {
    return /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)
  }
};

let date = {
  formatDate(date, format) {
    if (!date) {
      return;
    }
    if (!format) {
      format = 'yyyy-MM-dd';
    }
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/g, '/'));
        break;
      case 'number':
        date = new Date(date);
        break;
    }
    if (!(date instanceof Date)) {
      return;
    }
    let dict = {
      'yyyy': date.getFullYear(),
      'M': date.getMonth() + 1,
      'd': date.getDate(),
      'H': date.getHours(),
      'm': date.getMinutes(),
      's': date.getSeconds(),
      'MM': ('' + (date.getMonth() + 101)).substr(1),
      'dd': ('' + (date.getDate() + 100)).substr(1),
      'HH': ('' + (date.getHours() + 100)).substr(1),
      'mm': ('' + (date.getMinutes() + 100)).substr(1),
      'ss': ('' + (date.getSeconds() + 100)).substr(1),
      'w': this.formatWeek(date)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?|w)/g, function () {
      return dict[arguments[0]];
    });
  },
  formatWeek: function (date) {
    let week;
    switch (typeof date) {
      case 'string':
        date = new Date(date.replace(/-/g, '/'));
        break;
      case 'number':
        date = new Date(date);
        break;
    }
    switch (date.getDay()) {
      case 0:
        week = '周日';
        break;
      case 1:
        week = '周一';
        break;
      case 2:
        week = '周二';
        break;
      case 3:
        week = '周三';
        break;
      case 4:
        week = '周四';
        break;
      case 5:
        week = '周五';
        break;
      case 6:
        week = '周六';
        break;
    }
    return week;
  }
};

export {
  localCache,
  validate,
  date
}
