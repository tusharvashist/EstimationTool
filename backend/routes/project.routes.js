const express = require('express');
const router = express.Router();
const projectCtrl = require('../controllers/project.controller');


router.get('/',projectCtrl.findAllProject);

router.get('/client',projectCtrl.findProjectsByClientId);

router.get('/:id',projectCtrl.projectById);

router.post('/',projectCtrl.createProject);

router.delete('/:id',projectCtrl.deleteProject);

router.put('/:id',projectCtrl.updateProject);

module.exports = router;