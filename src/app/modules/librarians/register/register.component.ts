import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { MatSnackBar } from '@angular/material';
import { LibrarianService } from 'src/app/core/services/librarians.service';
import { AlertService } from 'src/app/core/services/alert.service';

@Component({ templateUrl: 'register.component.html' })
export class LibrarianRegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private alertService: AlertService,
        private librarianService: LibrarianService,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            rePassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.librarianService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.alertService.showToastSuccess();
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.showToastError();
                    this.loading = false;
                });
    }
}
