import { Socket } from './sockets'
var $ = require('jquery-slim')
var lexform = Vue.component('lexform', {
  template: `
    <form @submit.prevent="ask" class="inline-form " id="q-form">
      <div class="input-group input-group-lg ">
        <input id="question" class="form-control" type="text" placeholder="Ask a question ">
        <span class="input-group-btn">
          <button type="submit" id="but-ask" class="btn btn-primary">Ask</button>
        </span>
      </div>
    </form>`,
  props: ['qVal'],
  methods: {
    ask: function (question) {
      Socket.ask({author: 'testauth', text: $('#question').val()})
      $('#question').val('')
    }
  }
})
var lex = new Vue({
  el: 'lex',
  template: `<lexform></lexform>`,
  data: {
    questions: []
  },

  methods: {
    update: function (newQuestions) {
      console.log('new questions!')
      this.questions = newQuestions
    }
  },
  components: {'lexform': lexform}

})

Socket.initSocket(lex.update)
