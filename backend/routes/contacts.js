const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  createContact,
  updateContactStatus,
  deleteContact
} = require('../controllers/contactController');

router.route('/')
  .get(getAllContacts)
  .post(createContact);

router.put('/:id/status', updateContactStatus);
router.delete('/:id', deleteContact);

module.exports = router;