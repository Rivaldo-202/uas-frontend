const express = require('express');
const router = express.Router();
const {
  getAllRegistrations,
  getRegistrationById,
  createRegistration,
  updateRegistrationStatus,
  deleteRegistration
} = require('../controllers/registrationController');

router.route('/')
  .get(getAllRegistrations)
  .post(createRegistration);

router.route('/:id')
  .get(getRegistrationById)
  .delete(deleteRegistration);

router.put('/:id/status', updateRegistrationStatus);
router.get("/", (req, res) => {
  res.json({ message: "Registrations route working" });
});

module.exports = router;