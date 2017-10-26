import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstallService } from '../../services/install.service';
import { routerAnimation } from '../../animations/router.animation';

@Component({
    selector: 'slark-install',
    templateUrl: 'install.component.html',
    styleUrls: ['install.component.css'],
    animations: [routerAnimation]
})
export class InstallComponent implements OnInit
{
    constructor(private router: Router, public install: InstallService)
    {
    }

    ngOnInit()
    {
        this.install.current = 0;

        this.router.navigate(['/install', {
            outlets: {
                'install': ['welcome']
            }
        }]);
    }

    getRouteAnimation(outlet)
    {
        return outlet.activatedRouteData.animation
    }
}
