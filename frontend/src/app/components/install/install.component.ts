import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstallService } from '../../services/install.service';

@Component({
    selector: 'slark-install',
    templateUrl: 'install.component.html',
    styleUrls: ['install.component.css']
})
export class InstallComponent implements OnInit
{

    constructor(private router: Router, public install: InstallService)
    {
    }

    ngOnInit()
    {
        this.router.navigate(['/install', {
            outlets: {
                'install': ['welcome']
            }
        }]);
    }
}
