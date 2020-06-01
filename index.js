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
    url: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/approve`,
    icon: 'me-icon icon-check',
    description: 'This action will approve the document',
    confirmation: 'You are approving the document, are you sure?',
    style: 'btn-primary btn-pill'
  }, {
    label: 'Refuse',
    url: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/resuse`,
    icon: 'me-icon icon-ban',
    style: 'btn-outline-primary btn-pill',
    form: [{
      type: 'textarea',
      name: 'reason',
      label: 'Reason',
      required: true
    }]
  }, {
    label: 'Delegate',
    icon: 'me-icon icon-user-edit',
    style: 'btn-outline-primary btn-pill',
    location: 'https://www.google.com.br/'
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
