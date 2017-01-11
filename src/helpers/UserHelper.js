/**
 * Helper to read / write user object from / to the session storage.
 *
 * @class
 * @classdesc UserHelper is an Object indeed, but it is used like a class.
 */
let UserHelper = {

  /**
   * @property {string} KEYWORD_USER: keyword under with the user object is stored.
   */
  KEYWORD_USER: 'user',


  /**
   * Reads the users' data out of the session storage.
   *
   * @returns {object} user object.
   */
  getUser: function() {
    return JSON.parse(sessionStorage.getItem(this.KEYWORD_USER));
  },


  /**
   * Serializes the given user object and writes it into the session storage.
   *
   * @param {object} user: user object to store.
   */
  setUser: function(user) {
    sessionStorage.setItem(this.KEYWORD_USER, JSON.stringify(user));
  }

};

export default UserHelper;