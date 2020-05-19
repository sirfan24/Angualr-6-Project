import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  constructor() { }

  employeeForm: FormGroup;
 
  ngOnInit(): void {
    this.employeeForm = new FormGroup({
      fullName : new FormControl(),
      email : new FormControl(),
      // create skills form group

      skills: new FormGroup({
        skillName : new FormControl(),
        experienceInYears : new FormControl(),
        proficiency : new FormControl()
      })
    })
  }


  onSubmit(): void {

    // Accessing FormGroup
    console.log(this.employeeForm.value);

    // Accessing FormControl
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);

  }

}
