import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../../auth.service';
import { ConfigService } from '../../config.service';

@Component({
    selector: 'slark-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit
{
    server: String;

    constructor(private title: Title, private auth: AuthService, private config: ConfigService)
    {
        this.server = config.server;
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
