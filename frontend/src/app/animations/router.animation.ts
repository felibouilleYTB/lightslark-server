import { trigger, animate, transition, style, query } from '@angular/animations';

export const routerAnimation = trigger('routerAnimation', [
    transition('* <=> *', [
        query(':enter', [
            style({
                opacity: 0
            })
        ],{
            optional: true
        }),
        query(':leave',
            animate('.2s', style({
                opacity: 0
            })),
            {
                optional: true
            }
        ),
        query(':enter', [
            animate('.2s', style({
                opacity: 1
            }))
        ],{
            optional: true
        })
    ]),
]);