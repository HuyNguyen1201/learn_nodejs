const Employee = require('../model/Employee')

const getAllEmployee = async (req,res)=>{
    allEmployees = await Employee.find()
    res.json(allEmployees)
}

const createNewEmployee = async (req, res)=>{
    const newEmployee = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
    }
    if (!newEmployee.firstname || !newEmployee.lastname){
        return res.status(400).json({'message':"First and last name are required"})
    }
    const result = await Employee.create(newEmployee)
    const employees = await Employee.find()
    res.status(201).json(employees)
}
const updateEmployee = async (req, res)=>{
    const employee = await Employee.findOne({_id:req.body.id})
    if (!employee){
        return res.status(400).json({'message': `Employee ID ${req.body.id} not found`})
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    await employee.save()
    res.json(await Employee.find());
}
const deleteEmployee = (req, res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployees([...filteredArray]);
    res.json(data.employees);    res.json({
        "id": req.body.id
    })
}

const getEmployee = (req, res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.params.id));
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.params.id} not found` });
    }
    res.json(employee);    res.json({"id":req.params.id})
}
module.exports = {
    getAllEmployee,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}