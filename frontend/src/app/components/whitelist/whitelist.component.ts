/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil
 *
 * This file is part of Lightslark.

 * Lightslark is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Lightslark is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Lightslark.  If not, see <http://www.gnu.org/licenses/>.
 */

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
