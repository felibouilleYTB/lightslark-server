import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';

@Component({
    selector: 'slark-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
    constructor(private title: Title, private auth: AuthService)
    {
    }

    ngOnInit()
    {
        this.title.setTitle('Lightslark Server - Connexion');
    }

    login()
    {
        this.auth.logged = true;
    }
}
