/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil and the Lightslark contributors
 *
 * This file is part of Lightslark
 *
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

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { isNullOrUndefined } from 'util';
import { MdSnackBar } from '@angular/material';

@Component({
    selector: 'slark-whitelist',
    templateUrl: './whitelist.component.html',
    styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit
{
    displayedColumns = ['name', 'type', 'action'];
    database = new WhitelistDatabase();
    data: WhitelistDataSource | null;
    editing: string;

    @ViewChild('filter')
    filter: ElementRef;

    constructor(private title: Title, private snack: MdSnackBar)
    {
    }

    ngOnInit()
    {
        this.title.setTitle('Lightslark Server - Whitelist');
        this.data = new WhitelistDataSource(this.database);

        Observable.fromEvent(this.filter.nativeElement, 'keyup')
            .debounceTime(150)
            .distinctUntilChanged()
            .subscribe(() => {
                if (!this.data)
                {
                    return;
                }

                this.data.filter = this.filter.nativeElement.value;
            });

        document.addEventListener('click', ev =>
        {
            const editField = document.getElementById(`edit-${this.editing}`);

            if (ev.target != editField && !isNullOrUndefined(editField))
            {
                this.editing = null;
            }
        });

        document.addEventListener('keyup', ev =>
        {
            if (ev.key == 'Enter' || ev.key == 'Escape')
            {
                this.editing = null;
            }

            const editNum = parseInt(this.editing);

            if (!isNullOrUndefined(this.editing))
            {
                if ((ev.key == 'ArrowDown' || ev.key == 'Tab') && editNum != this.database.data.length)
                {
                    this.edit((editNum + 1).toString());
                }
                else if (ev.key == 'ArrowUp' && editNum != 1)
                {
                    this.edit((editNum - 1).toString());
                }
            }
        });
    }

    edit(id: string)
    {
        setTimeout(_ =>
        {
            this.editing = id;
        }, 25);

        setTimeout(_ =>
        {
            document.getElementById(`edit-${id}`).focus();
        }, 50);
    }

    remove(entry: WhitelistEntry)
    {
        this.snack.open(`'${entry.name}' supprimé`, 'OK', {
            duration: 3000
        });
    }
}

export interface WhitelistEntry
{
    id: string;
    name: string;
    type: string;
}

export class WhitelistDatabase
{
    dataChange: BehaviorSubject<WhitelistEntry[]> = new BehaviorSubject<WhitelistEntry[]>([]);

    constructor()
    {
        const names = ["trucs.json", "username.txt", "launcher/launcher.properties", "config/", "*.log"];
        const types = ["file", "file", "file", "folder", "glob"];

        for (let i = 0; i < 5; i++) {
            const copiedData = this.data.slice();
            copiedData.push({
                id: (this.data.length + 1).toString(),
                name: names[i],
                type: types[i]
            });
            this.dataChange.next(copiedData);
        }
    }

    get data(): WhitelistEntry[]
    {
        return this.dataChange.value;
    }
}

export class WhitelistDataSource extends DataSource<any>
{
    _filterChange = new BehaviorSubject('');

    constructor(private _database: WhitelistDatabase)
    {
        super();
    }

    get filter()
    {
        return this._filterChange.value;
    }

    set filter(filter: string)
    {
        this._filterChange.next(filter);
    }

    connect(): Observable<WhitelistEntry[]>
    {
        const displayedDataChange = [
            this._database.dataChange,
            this._filterChange
        ];

        return Observable.merge(...displayedDataChange).map(() =>
        {
            return this._database.data.slice().filter((entry: WhitelistEntry) =>
            {
                let search = (entry.name + entry.type).toLowerCase();
                return search.indexOf(this.filter.toLowerCase()) != -1;
            })
        })
    }

    disconnect()
    {
    }
}