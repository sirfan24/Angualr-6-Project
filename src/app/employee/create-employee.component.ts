import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

/*  FormBuilder class is provided as a service, so for us to be able to use 
 we will have to inject it using constructor. */ 
  
 constructor(private fb: FormBuilder) { }

  employeeForm: FormGroup;
 
  ngOnInit(): void {

    // Building reactive form using formBuilder class
    this.employeeForm = this.fb.group({
      fullName:[''],
      email:[''],
      skills: this.fb.group({
        skillName:[''],
        experienceInYears:[''],
        proficiency:['beginner']
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

  onLoadDataClick() : void {
    // difference between setValue and patchValue methods
    this.employeeForm.patchValue({
      fullName: 'Pragim Technologies',
      email: 'pragin@pragimtech.com',
      skills:{
        skillName: 'C#',
        //experienceInYears: 5,
        proficiency: 'beginner'
      }
    })
  }

}
