// Houses all routes assosciated with /institutions
// ------------------------------------------------

const express = require("express");
const router = express.Router();

const instutionController = require('../controllers/institutionController');

// Retrieve all institutions
router.get('/', instutionController.all_institutions);
//Retrieve a single institution
router.get('/:id', instutionController.specific_institution);
// Add an institution
router.post('/', instutionController.add_institution);
// Update an institution name
router.put('/:id', instutionController.update_institution);
// Delete an institution
router.delete('/:id', instutionController.delete_institution);



module.exports = router;