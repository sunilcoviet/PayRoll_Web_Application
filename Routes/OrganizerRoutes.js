const router = require('express').Router();
const Organization = require('../Controllers/Organization/OrganizationController');
const auth = require('../Middleware/auth');

router.get('/:id/list', Organization.getOrganizations);

router.post("/add",auth, Organization.organization);

router.get("/:id",auth, Organization.organization);

router.patch("/update/:id",auth, Organization.organization);

router.delete("/remove/:id", Organization.organization);

module.exports = router;