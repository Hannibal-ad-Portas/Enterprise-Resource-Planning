const express = require('express');

const itemController = require('../models/Item/ItemController');

const router = express.Router();

router.post('/:companyId/createNewItem', itemController.createNewItem);

router.get('/:companyId/all', itemController.listAllItems);

router.get('/:companyId/:itemId/find', itemController.findItemById);

router.put('/:companyId/:itemId/update', itemController.updateItem);

router.delete('/:companyId/:itemId/delete', itemController.deleteItem);

module.exports = router;