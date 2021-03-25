var express = require('express');
var router = express.Router();
const db = require('../db')

/* GET edit page. */
router.get('/edit/:id', async (req, res) => {
  const id = req.params.id
  const doc = await db.findOne(id)
  res.render('new', { title: 'Edição de Cliente', doc, action: '/edit/' + doc._id })
})

/* POST edit page. */
router.post('/edit/:id', async (req, res) => {
  const id = req.params.id
  const { nome, idade, uf } = req.body
  await db.update(id, {nome, idade, uf})
  res.redirect('/?edit=true')
})

/* GET delete page. */
router.get('/delete/:id', async function(req, res) {
  const id = req.params.id
  await db.deleteOne(id)
  res.redirect('/?delete=true')
})

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render('index', { teste: 'asda', docs: await db.findAll() });
});

router.get('/new', (req, res) => {
  res.render('new', { title: 'Cadastro de Clientes', action: '/new', doc: {}})
})

/* POST home page. */
router.post('/new', async (req, res) => {
  const nome = req.body.nome
  const idade = parseInt(req.body.idade)
  const uf = req.body.uf
  await db.insert({nome, idade, uf})
  res.redirect('/?new=true')
})

module.exports = router;
