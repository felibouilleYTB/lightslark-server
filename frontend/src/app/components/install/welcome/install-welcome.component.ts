import { Component } from '@angular/core';
import { InstallService } from '../../../services/install.service';

@Component({
    selector: 'slark-install-welcome',
    templateUrl: 'install-welcome.component.html',
    styleUrls: ['install-welcome.component.css']
})
export class InstallWelcomeComponent
{
    constructor(public install: InstallService)
    {
    }
}