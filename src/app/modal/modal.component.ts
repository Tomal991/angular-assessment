import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  [x: string]: any;
  userForm: FormGroup = null;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: [
        '',
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(15),
      ],
      email: ['', Validators.pattern(this.emailPattern)],
      password: ['12345'],
    });
    this.title = 'Add User';
    if (this.id) {
      // edit mode
      this.title = 'Edit User';
    
      this.appService
        .getById(this.id)
        .pipe(first())
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

    this.appService.postData(form.value).subscribe((data) => {
      console.log(data), (error) => console.log(error);
    });

    this.userForm.reset();
  }
}
