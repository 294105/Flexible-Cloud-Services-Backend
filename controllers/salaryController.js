const SalaryPayment = require('../models/SalaryPayment');
const Employee = require('../models/Employee');
const Company = require('../models/Company');

// Pay salary to an employee and update company profit
exports.paySalary = async (req, res) => {
  try {
    const { employeeId, amount, paidBy, note } = req.body;

    // 1. Check if employee exists
    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    // 2. Create new SalaryPayment entry
    const salaryPayment = new SalaryPayment({
      employeeId,
      amount,
      paidBy,
      note
    });
    await salaryPayment.save();

    // 3. Update company finance (reduce profit by salary amount)
    const company = await Company.findOne();
    if (company) {
      company.financeSummary.profit -= amount;
      company.financeSummary.currentBudget -= amount;
      await company.save();
    }

    res.status(201).json({ message: 'Salary paid successfully', salaryPayment });
  } catch (error) {
    console.error('❌ Error paying salary:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all salary payments
exports.getAllSalaryPayments = async (req, res) => {
    try {
      const salaryPayments = await SalaryPayment.find()
        .populate('employeeId', 'name salary') // populate only name and salary from Employee
        .select('status paymentDate employeeId'); // select fields from SalaryPayment
  
      // Map to desired response structure
      const result = salaryPayments.map(payment => ({
        name: payment.employeeId.name,
        salary: payment.employeeId.salary,
        status: payment.status || 'Paid',
        paymentDate: payment.paymentDate
      }));
  
      res.status(200).json(result);
    } catch (error) {
      console.error('❌ Error fetching salary payments:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  