const express = require("express");
const router = express.Router();
const Employee = require("../../models/Employee");
const Moment = require("moment");
//@route GET api/employees
//@des Retrives employees
//@access Public
router.get("/", (req, resp) => {
  Employee.find()
    .sort({ firstName: -1 })
    .then((employees) => resp.json(employees))
    .catch((error) => console.log(eerror));
});

//@route POST api/employees
//@des Add employees
//@access Public
router.post("/", (req, resp) => {
  const employee = new Employee({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfJoining: req.body.dateOfJoining,
    department: req.body.department,
    reportingTo: req.body.reportingTo || "NA",
    skillSet: req.body.skillSet,
  });
  employee.save().then((employee) => {
    console.log("employee", employee);
    resp.json(employee);
  });
});

//@route UPDATE api/employees
//@des Update employees
//@access Public
router.put("/:id", (req, resp) => {
  Employee.findOneAndUpdate(
    { _id: req.params.id }, // Filter
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        dateOfJoining: req.body.dateOfJoining,
        department: req.body.department,
        reportingTo: req.body.reportingTo,
        skillSet: req.body.skillSet,
      },
    }
  )
    .then((employee) => {
      resp
        .status(200)
        .json({ message: "Update successful!", employee: employee });
    })
    .catch((err) => res.status(404).json({ success: false }));
});

// @route   DELETE api/employees/:id
// @desc    Delete A Item
// @access  Private
router.delete("/:id", (req, res) => {
  Employee.findOneAndDelete({ _id: req.params.id })
    .then((employee) =>
      employee.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => res.status(404).json({ success: false }));
});

module.exports = router;
