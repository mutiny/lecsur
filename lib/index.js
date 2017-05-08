import { Socket } from './sockets'
var $ = require('jquery-slim')
Vue.component('question-item', {
  template: `
    <li>
      {{ author }} - {{ qtext }}
      <button v-on:click="$emit('remove')">X</button>
    </li>
  `,
  props: ['author', 'qtext']
})
var lex = new Vue({
  el: '#lex',
  data: {
    username: '', // TODO
    newQuestionText: '',
    questions: []
  },
  methods: {
    addNewQuestion: function () {
      Socket.ask({author: 'testAuthor', text: this.newQuestionText})
      this.questions.push({author: 'testAuthor', text: this.newQuestionText})
      this.newQuestionText = ''
    },
    updateQuestions: function (newQuestions) {
      this.questions = newQuestions
    }
  }
})

Socket.initSocket(lex.updateQuestions)
