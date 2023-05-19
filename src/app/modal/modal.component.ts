import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  id:string='';
  userForm: FormGroup = null;
  // emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  // phonePattern="/^(?:(?:\+|00)88|01)?\d{11}$/"
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userForm = this.formBuilder.group({
      name: ['', ],
      // phone: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(11)])],
      // email: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
    });

    if (this.id) {
      // edit mode
      this.appService
        .getById(this.id)
        .subscribe((x) => {
          this.userForm.patchValue(x);
        });
    }
  }

  onFormSubmit(form: FormGroup) {
    if (form.invalid) {
      form.markAllAsTouched();
      return;
    }
    
    this.saveUser(form)
      .subscribe({
        next: () => {
          this.router.navigate(['']);
          this.userForm.reset();
          this.ngOnInit()
        },
        error: (error) => {
        },
      });

  }
  private saveUser(form) {
    // create or update user based on id param
    return this.id
      ? this.appService.updateData(this.id!, form.value)
      : this.appService.postData(form.value);

  }
  get name(){
    return this.userForm.get('name')
  }
  get phone(){
    return this.userForm.get('phone')
  }
   get email(){
    return this.userForm.get('email')
  }
}
