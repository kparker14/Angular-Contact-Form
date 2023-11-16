import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../hero';
import {
  FormsModule,
  FormGroup,
  Validators,
  FormControl,
  ValidatorFn,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
//import { ContactService } from '../contact.service';
@Component({
  selector: 'app-contact-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  encapsulation: ViewEncapsulation.None

})
export class HeroFormComponent implements OnInit, AfterViewInit {

  //https://us6.api.mailchimp.com/3.0/ 
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
  ) {

    if (elemRef.nativeElement.value.length <= 0 && !formControl.valid) {

      // error condition
      elemRef.nativeElement.classList.remove('good-to-go');
      elemRef.nativeElement.classList.remove('no-border');
      elemRef.nativeElement.classList.add('error');
      //return true;

    } else if (elemRef.nativeElement.value.length > 0 && formControl.valid) {

      elemRef.nativeElement.classList.remove('error');
      elemRef.nativeElement.classList.remove('no-border');
      elemRef.nativeElement.classList.add('good-to-go');
      //return true;

    } else if (elemRef.nativeElement.value.length > 0 && !formControl.valid) {

      elemRef.nativeElement.classList.remove('good-to-go');
      elemRef.nativeElement.classList.remove('no-border');
      elemRef.nativeElement.classList.add('error');
      //return true;

    } 
    else 
     {
      elemRef.nativeElement.classList.add('no-border');
      console.log('this condition does not exist');
      //return false;
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

  ngAfterViewInit(): void {
    this.commentChildElement.nativeElement.classList.remove('error');
    this.commentChildElement.nativeElement.classList.remove('no-border');
    this.commentChildElement.nativeElement.classList.add('good-to-go');
  }

  onSubmit() {
  
    if (this.form.valid) {
      this.submitted = true;
      this.sendMail(this.firstName.value, this.lastName.value, this.email.value, this.comment.value)
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

  sendMail(firstName: string, lastName: string, email: string, comment: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set('Authorization', 'Basic ' + btoa('5bde5d6e463702f2e6737496315a1bb3'+":" +'674d0fac8b1b951435369385bbb866f4'));
  
    const data = JSON.stringify({
      "Messages": [{
        "From": {"Email": "<YOUR EMAIL>", "FirstName": "<YOUR NAME>"},
        "To": [{"Email": email, "Name": firstName + " " +  lastName}],
        "TextPart": comment
      }]
    });
  
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
    };
  
    fetch("https://api.mailjet.com/v3.1/send", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  
  //sendMail('Test Name',"<YOUR EMAIL>",'Test Subject','Test Message')
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value } } : null;
  };
}
