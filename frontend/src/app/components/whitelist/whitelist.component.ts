import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WhitelistEntry } from '../../whitelist-entry';

@Component({
    selector: 'slark-whitelist',
    templateUrl: './whitelist.component.html',
    styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit
{
    entries: WhitelistEntry[];

    constructor(private title: Title)
    {
    }

    ngOnInit()
    {
        this.title.setTitle('Lightslark Server - Whitelist');

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
    }
}
