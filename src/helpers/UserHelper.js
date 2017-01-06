let UserHelper = {

  KEYWORD_USER: 'user',

  getUser() {
    return JSON.parse(sessionStorage.getItem(this.KEYWORD_USER));
  },

  setUser(user) {
    sessionStorage.setItem(this.KEYWORD_USER, JSON.stringify(user));
  }

};

export default UserHelper;