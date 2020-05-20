import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

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
  fullNameLength = 0;
 
  ngOnInit(): void {

    // Building reactive form using formBuilder class
    this.employeeForm = this.fb.group({
      // All validator functions are sttaic functions, they dont need an instance.
      fullName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      email:[''],
      skills: this.fb.group({
        skillName:[''],
        experienceInYears:[''],
        proficiency:['beginner']
      })
    });

    this.employeeForm.get('fullName').valueChanges.subscribe(
      (value: string) => {
        this.fullNameLength = value.length;
        //console.log(value);
      }
    );
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
