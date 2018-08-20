var express = require('express');
var router = express.Router();
var {userAuth} = require('../middlewares/authentication')
var {addItem,deleteItem,updateItem,getAllItem,getOneItem,getItemByName} = require('../controllers/items')

/* GET home page. */
router.get('/',userAuth,getAllItem);
router.get('/:id',userAuth,getOneItem);
router.get('/name',userAuth,getItemByName)

router.post('/',userAuth,addItem)

router.put('/:id',userAuth,updateItem)

router.delete('/:id',userAuth,deleteItem)


module.exports = router;