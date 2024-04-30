module.exports = class UserDto {
  email;
  id;
  gender;
  age;
  isMarried;
  job;
  hobby;
  salary;
 
  constructor(model) {
    this.email = model.email;
    this.id = model._id;
    this.gender = model.gender
    this.age = model.age;
    this.isMarried = model.isMarried;
    this.job = model.job;
    this.hobby = model.hobby;
    this.salary = model.salary;
  }
}