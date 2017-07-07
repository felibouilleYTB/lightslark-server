import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { ConfigService } from '../../config.service';

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

    server: String;

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
        this.auth.logged = true;
    }
}
