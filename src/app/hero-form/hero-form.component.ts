import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero';
import {
  FormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-contact-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  encapsulation: ViewEncapsulation.None,
})
export class HeroFormComponent implements OnInit {

  @ViewChild('contactForm') myForm!: FormGroup;
  @ViewChild('firstNameTemplateVariable') firstNameChildElement!: ElementRef;
  @ViewChild('lastNameTemplateVariable') lastNameChildElement!: ElementRef;
  @ViewChild('emailTemplateVariable') emailChildElement!: ElementRef;
  @ViewChild('commentTemplateVariable') commentChildElement!: ElementRef;

  checkValue() {}
  alertPopup(value: string) {
    if (value) alert(value + ' typof: ' + typeof value);
  }

  public changeCSSBorder(
    elemRef: ElementRef,
    formControl: FormControl
  ): Boolean {

    if (elemRef.nativeElement.value.length <= 0 && !formControl.valid) {

      // error condition
      elemRef.nativeElement.classList.remove('good-to-go');
      elemRef.nativeElement.classList.remove('no-border');
      elemRef.nativeElement.classList.add('error');
      return true;

    } else if (elemRef.nativeElement.value.length > 0 && formControl.valid) {

      elemRef.nativeElement.classList.remove('error');
      elemRef.nativeElement.classList.remove('no-border');
      elemRef.nativeElement.classList.add('good-to-go');
      return true;

    } else if (elemRef.nativeElement.value.length > 0 && !formControl.valid) {

      elemRef.nativeElement.classList.remove('good-to-go');
      elemRef.nativeElement.classList.remove('no-border');
      elemRef.nativeElement.classList.add('error');
      return true;

    } 
    else 
     {
      elemRef.nativeElement.classList.add('no-border');
      console.log('this condition does not exist');
      return false;
    } 
  }

  constructor() {

    this.firstName = new FormControl(null, [
      Validators.required,
      forbiddenNameValidator(/bob/i),
    ]);
    this.lastName = new FormControl(null, [Validators.required]);
    this.email = new FormControl(null, [Validators.required, Validators.email]);
    this.comment = new FormControl(null, [Validators.required]);

    this.form = new FormGroup({});

    this.form.addControl('firstName', this.firstName);
    this.form.addControl('lastName', this.lastName);
    this.form.addControl('email', this.email);
    this.form.addControl('comment', this.comment);
    this.submitted = false;
  }

  form: FormGroup;
  submitted: boolean;
  lastName: FormControl;
  firstName: FormControl;
  email: FormControl;
  comment: FormControl;

  
  public value = "";
  public charachtersCount: number;
  public counter: string;
  public maxlength = 1000;
  public myValue = "Dear Katherine, ";

  ngOnInit(): void {

    //this.comment.setValue(value) = this.myValue;
   //this.comment.patchValue ({myValue: this.myValue});
   this.comment.setValue(this.myValue);

    this.charachtersCount = this.value ? this.value.length : 0;
    this.counter = `${this.charachtersCount}/${this.maxlength}`;
  }

  onSubmit() {
  
    if (this.form.valid) {
      this.submitted = true;
    } else {
    }

    if (this.form.valid) console.log('this form is valid');
    else console.log('this form is not valid');
  }

  public onValueChange(event: Event): void {

    let text = (event.target as HTMLInputElement).value
    
    this.charachtersCount = text.length;
   
    this.counter = `${this.charachtersCount}/${this.maxlength}`; 
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
