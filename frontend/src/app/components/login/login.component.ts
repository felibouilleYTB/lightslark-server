import { AfterViewInit, Component, OnInit, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { ConfigService } from '../../config.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'slark-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit
{
    @ViewChildren('email')
    email;

    @ViewChildren('password')
    password;

    logging = false;
    server: String;
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
        ]),
        password: new FormControl('', [
            Validators.required
        ])
    });

    constructor(private title: Title, private auth: AuthService, private config: ConfigService)
    {
        this.server = config.server;
    }

    ngOnInit()
    {
        this.title.setTitle('Lightslark Server - Connexion');
    }

    ngAfterViewInit()
    {
        (this.email.first.nativeElement.value === '' ? this.email : this.password).first.nativeElement.focus();
    }

    login()
    {
        this.logging = true;
    }
}
