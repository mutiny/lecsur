// Initializes the `questions` service on path `/questions`
const createService = require('feathers-memory')
const hooks = require('./questions.hooks')
const filters = require('./questions.filters')

module.exports = function () {
  const app = this
  const paginate = app.get('paginate')

  const options = {
    name: 'questions',
    paginate
  }

  // Initialize our service with any options it requires
  app.use('/questions', createService(options))

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('questions')
  service.on('updated', message => console.log('updated', message)) // DEBUG
/*  service.on('created', () => {
    service.find({
      query: {
        $limit: 15,
        $sort: {votes: -1}
      }
    }).then(questions => service.emit('news'))
  }) */
  service.hooks(hooks)

  if (service.filter) {
    service.filter(filters)
  }
}
