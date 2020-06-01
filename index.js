const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser())

app.get('/:processType/:processNumber/actions', (req, res) => {
  const { processType, processNumber } = req.params
  res.json([{
    label: 'Approve',
    action: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/approve`
  }, {
    label: 'Refuse',
    action: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/resuse`,
    form: [{
      input: 'textarea',
      label: 'Reason',
      required: true
    }]
  }, {
    label: 'Delegate',
    url: 'https://www.google.com.br/'
  }])
});

app.post('/:processType/:processNumber/action/:action', (req, res) => {
  const { processNumber, action } = req.params
  res.json({
    message: `Process ${processNumber} successfully ${action}`,
    form: JSON.stringify(req.body)
  })
})

app.listen(process.env.PORT || 3100, () => {
  console.log('API running!')
});
