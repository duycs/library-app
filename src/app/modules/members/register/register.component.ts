import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MemberService } from '../../../core/services/members.service';
import { AuthenticationService } from '../../../core/authentication/authentication.service';
import { MatSnackBar } from '@angular/material';

@Component({ templateUrl: 'register.component.html' })
export class MemberRegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private snackBar: MatSnackBar,
        private memberService: MemberService,
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
        this.memberService.register(this.registerForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.snackBar.open("Success", "", {duration: 2000,});
                    this.router.navigate(['/login']);
                },
                error => {
                    this.snackBar.open("Error", "", {
                        duration: 2000,
                    });
                    this.loading = false;
                });
    }
}
