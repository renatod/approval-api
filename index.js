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
    action: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/approve`,
    icon: 'me-icon icon-check',
    description: 'This action will approve the document',
    confirmation: 'You are approving the document, are you sure?'
  }, {
    label: 'Refuse',
    action: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/resuse`,
    icon: 'me-icon icon-ban',
    form: [{
      type: 'textarea',
      label: 'Reason',
      required: true
    }]
  }, {
    label: 'Delegate',
    icon: 'me-icon icon-user-edit',
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
