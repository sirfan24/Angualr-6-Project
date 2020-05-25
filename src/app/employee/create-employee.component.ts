import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray} from '@angular/forms'
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
    'confirmEmail': {
      'required' : 'Confrim Email is required',
    },
    'emailGroup': {
      'missMatch' : 'Confrim Email doesnt match with the email provided',
    },
    'phone': {
      'required' : 'Phone is required'
    }    
  };

  formErrors = {
    
  };
 
  ngOnInit(): void {

    // Building reactive form using formBuilder class
    this.employeeForm = this.fb.group({
      // All validator functions are sttaic functions, they dont need an instance.
      fullName:['',[Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference:['email'],
      emailGroup : this.fb.group({
        email:['', [Validators.required,CustomValidators.emailDomain('pragimtech.com')]],
        confirmEmail:['', Validators.required],
      }, {validator : matchEmail}),
      phone:[''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    this.employeeForm.valueChanges.subscribe(
      (data) => {
        this.logValidationErrors(this.employeeForm);
      }
    );

    this.employeeForm.get('contactPreference').valueChanges.subscribe(
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
       
       const abstractControl = group.get(key);

       this.formErrors[key] = '';
       if(abstractControl && !abstractControl.valid && 
         (abstractControl.touched)|| (abstractControl.dirty)){
         const messages = this.validationMessages[key];  
         for (const errorKey in abstractControl.errors){
           if (errorKey){
             this.formErrors[key] += messages[errorKey] + ' ';
           }
         }
       }
       if(abstractControl instanceof FormGroup){
         this.logValidationErrors(abstractControl);
       }
      
      console.log(this.formErrors);
     });
  }

  addSkillFormGroup() : FormGroup{
    return this.fb.group({
      skillName:['', Validators.required],
      experienceInYears:['', Validators.required],
      proficiency:['', Validators.required]
    })
  }
  addSkillButtonClick(): void{
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup())
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

function matchEmail(group: AbstractControl): { [key: string]: any } | null {

  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value || confirmEmailControl.pristine) {
    return null
  } else {
    return { 'missMatch': true }
  }
} 
