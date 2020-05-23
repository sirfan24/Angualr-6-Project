import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl} from '@angular/forms'
import { CustomValidators} from '../shared/customValidators' 


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

  validationMessages = {
    'fullName': {
      'required' : 'Full Name is required',
      'minlength' : 'Full Name must be greater than 2 charecters',
      'maxlength' : 'Full Name must be less than 10 charecters'
    },
    'email': {
      'required' : 'Email is required',
      'emailDomain' : 'Domain should be prajimtech.com'
    },
    'phone': {
      'required' : 'Phone is required'
    },
    'skillName': {
      'required' : 'SkillName is required'
    },
    'experienceInYears': {
      'required' : 'Experience In Years is required'
    },
    'proficiency': {
      'required' : 'Proficiency is required'
    },
  };

  formErrors = {
    'fullName': '',
    'email' : '',
    'phone' : '',
    'skillName': '',
    'experienceInYears':'',
    'proficiency':''
  };
 
  ngOnInit(): void {

    // Building reactive form using formBuilder class
    this.employeeForm = this.fb.group({
      // All validator functions are sttaic functions, they dont need an instance.
      fullName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      ContactPreference:['email'],
      email:['', [Validators.required,CustomValidators.emailDomain('pragimtech.com')]],
      phone:[''],
      skills: this.fb.group({
        skillName:['', Validators.required],
        experienceInYears:['', Validators.required],
        proficiency:['', Validators.required]
      })
    });

    this.employeeForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.employeeForm);
      }
    );

    this.employeeForm.get('ContactPreference').valueChanges.subscribe(
      (selectedValue:string) => {
        if(selectedValue === 'phone'){
          this.employeeForm.get('phone').setValidators(Validators.required),
          this.employeeForm.get('phone').updateValueAndValidity()
        }else{ 
          this.employeeForm.get('phone').clearValidators()
          this.employeeForm.get('phone').updateValueAndValidity()
        }
      }
    );
  }
  
  logValidationErrors(group: FormGroup = this.employeeForm) : void {
     Object.keys(group.controls).forEach((key:string) => 
     {
       // key = fullName
       const abstractControl = group.get(key);
       if(abstractControl instanceof FormGroup){
         this.logValidationErrors(abstractControl);
       }else{
         this.formErrors[key] = '';
        if(abstractControl && !abstractControl.valid && 
          (abstractControl.touched)|| (abstractControl.dirty)){
          const messages = this.validationMessages[key];
          console.log(messages);
          for (const errorKey in abstractControl.errors){
            if (errorKey){
              this.formErrors[key] += messages[errorKey] + '';
            }
          }
        }
       }
     });
  }


  onSubmit(): void {

    // Accessing FormGroup
    console.log(this.employeeForm.value);

    // Accessing FormControl
    console.log(this.employeeForm.controls.fullName.touched);
    console.log(this.employeeForm.get('fullName').value);

  }

  onLoadDataClick() : void {
    // this.logValidationErrors(this.employeeForm);
    // console.log(this.formErrors);
  }

}
