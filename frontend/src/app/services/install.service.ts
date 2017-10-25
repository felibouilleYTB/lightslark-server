import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class InstallService
{
    steps = [
        {
            name: 'Bienvenue',
            route: 'welcome'
        },
        {
            name: 'Infos',
            route: 'infos'
        },
        {
            name: 'Mise à jour',
            route: 'update'
        },
        {
            name: 'Commencer',
            route: 'start'
        }
    ];

    current = 0;

    constructor(private router: Router)
    {
    }

    switchStep(id: number, acceptNext: boolean)
    {
        console.log(this.current);
        console.log(id);
        console.log(acceptNext);

        if (this.current >= (acceptNext ? id - 1 : id)) {
            this.router.navigate(['/install', {
                outlets: {
                    'install': [this.steps[id].route]
                }
            }]);

            this.current = id;
        }
    }

    next()
    {
        this.switchStep(this.current + 1, true);
    }
}