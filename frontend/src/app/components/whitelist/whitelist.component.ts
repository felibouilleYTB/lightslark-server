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

import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';
import { isNullOrUndefined } from 'util';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { createEntry, WhitelistEntry, WhitelistService } from '../../services/whitelist.service';
import { HandleService } from '../../services/handle.service';
import { DataSource } from '@angular/cdk/collections';

@Component({
    selector: 'slark-whitelist',
    templateUrl: './whitelist.component.html',
    styleUrls: ['./whitelist.component.css']
})
export class WhitelistComponent implements OnInit
{
    displayedColumns = ['name', 'type', 'action'];
    database = new WhitelistDatabase(this.whitelist, this.handler);
    data: WhitelistDataSource | null;

    private _editing: string;

    @ViewChild('filter')
    filter: ElementRef;

    constructor(private title: Title, private dialog: MatDialog, private whitelist: WhitelistService, private handler: HandleService)
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

    add()
    {
        this.dialog.open(WhitelistAddDialogComponent, {
            width: '250px',
            data: {
                name: ''
            }
        }).afterClosed().subscribe(result => {
            if (isNullOrUndefined(result) || result.trim() == "")
            {
                return;
            }

            this.handler.handle(this.whitelist.add(result),'Entrée ajoutée');

            this.database.data.push(createEntry(this.database.data.length.toString(), result));
            this.database.update();
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
        this.handler.handle(this.whitelist.remove(entry), `${entry.name} supprimé`);

        this.database.data.splice(this.database.data.indexOf(entry), 1)
        this.database.update()
    }

    get editing(): string
    {
        return this._editing;
    }

    set editing(value: string)
    {
        if (value == null && this.editing != null)
        {
            const oldEntry = this.database.data[this.editing];
            const newVal = (<HTMLInputElement> document.getElementById(`edit-${this.editing}`)).value;

            if (oldEntry.name != newVal)
            {
                this.handler.handle(this.whitelist.update(oldEntry, newVal), "Entrée éditée");

                this.database.data[this.editing] = createEntry(oldEntry.id, newVal);
                this.database.update()
            }
        }

        this._editing = value;
    }
}

export class WhitelistDatabase
{
    dataChange: BehaviorSubject<WhitelistEntry[]> = new BehaviorSubject<WhitelistEntry[]>([]);

    constructor(private whitelist: WhitelistService, private handler: HandleService)
    {
        this.whitelist.get().toPromise().then(val => {
            this.dataChange.next(val);
        }).catch(err => this.handler.handleError('Impossible de charger la whitelist', err));
    }

    set data(val: WhitelistEntry[])
    {
        this.dataChange.next(val);
    }

    update()
    {
        this.dataChange.next(this.data)
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

@Component({
    selector: 'slark-whitelist-add-dialog',
    templateUrl: 'whitelist-add-dialog.component.html',
})
export class WhitelistAddDialogComponent
{
    constructor(public dialogRef: MatDialogRef<WhitelistAddDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any)
    {
    }

    trigger(): void
    {
        this.dialogRef.close(this.data.name)
    }

    onNoClick(): void
    {
        this.dialogRef.close();
    }
}