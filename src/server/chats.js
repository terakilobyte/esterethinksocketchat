module.exports = {
  messages: ['Welcome to Chat'],
  pushMessage: function(data) {
    this.messages.push(data);
  }
};