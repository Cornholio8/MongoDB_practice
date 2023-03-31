const Employee = require('../employee.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {

    it('should throw an error if args are missing', () => {
      const emp = new Employee({});
      emp.validate(err => {
        expect(err.errors).to.exist;
      });
      after(() => {
        mongoose.models = {};
      });
    });

    it('should throw an error if arg is not a string', () => {
      const cases = [{}, []];
      for (let employee of cases) {
        const emp = new Employee({
          firstName: employee,
          lastName: employee,
          department: employee,
        });
        emp.validate(err => {
          expect(err.errors).to.exist;
        });
        after(() => {
          mongoose.models = {};
        });
      }
    });

    it('should throw an error if single arg is missing', () => {
      const cases = [
        { firstName: 'John' },
        { lastName: 'Doe', department: 'IT' },
        { firstName: 'Amanda', lastName: 'Doe' },
      ];
      for (let employee of cases) {
        const emp = new Employee(employee);
        emp.validate(err => {
          expect(err.errors).to.exist;
        });
        after(() => {
          mongoose.models = {};
        });
      }
    });
    
    it('should not throw an error if args are okay', () => {
      const cases = [
        { firstName: 'John', lastName: 'Doe', department: 'IT' },
        { firstName: 'Amanda', lastName: 'Doe', department: 'Marketing' },
      ];
      for (let employee of cases) {
        const emp = new Employee(employee);
        emp.validate(err => {
          expect(err).to.not.exist;
        });
        after(() => {
          mongoose.models = {};
        });
      }
    });
  });