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
    style: 'btn-primary btn-pill',
    form: [{
      type: 'text',
      name: 'code',
      label: 'Código do cliente',
      required: true
    }, {
      type: 'select',
      name: 'conformidade',
      label: 'Informe a situação do processo.',
      required: true,
      options: {
        label: 'label',
        value: 'value',
        options: [{
          value: 'PC',
          label: 'Processo Conforme'
        }, {
          value: 'PNC',
          label: 'Processo Não Conforme'
        }]
      }
    }, {
      type: 'textarea',
      name: 'reason',
      label: 'Reason',
      requiredIf: {
        any: [{
          field: 'conformidade',
          equalsTo: 'PNC'
        }]
      }
    }]
  }, {
    label: 'Refuse',
    url: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/refuse`,
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
  }, {
    label: 'Submit Form',
    url: `https://approval-api-dummy.herokuapp.com/${processType}/${processNumber}/action/submit`,
    icon: 'me-icon icon-check',
    style: 'btn-outline-primary btn-pill',
    form: [{
      type: 'number',
      name: 'total',
      label: 'Valor Unitátio',
      required: true,
      options: {
        precision: 2,
        thousandSeparator: '.'
      }
    }, {
      type: 'boolean',
      name: "receberEmail",
      label: "Receber E-Mail"
    }]
  }])
});

app.post('/:processType/:processNumber/action/:action', (req, res) => {
  const { processNumber, action } = req.params

  setTimeout(() => {
    if (action === 'approve') {
      res.status(403).json({
        title: "Access forbidden",
        message: `You dont have access to approve this document`
      })
    } else {
      res.json({
        message: `Process ${processNumber} successfully ${action}d`
      })
    }
  }, 3000)
})

app.listen(process.env.PORT || 3100, () => {
  console.log('API running!')
});
