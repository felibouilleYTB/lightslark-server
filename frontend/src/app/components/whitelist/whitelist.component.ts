import { Component, OnInit } from '@angular/core';
import { WhitelistEntry } from '../../whitelist-entry';

@Component({
    selector: 'slark-whitelist',
    templateUrl: './whitelist.component.html',
    styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit
{
    entries: WhitelistEntry[];

    ngOnInit()
    {
        this.entries = [
            {
                value: 'truc.txt',
                type: 'file'
            },
            {
                value: 'lol',
                type: 'folder'
            }
        ];

        $('.modal').modal({});
    }
}
