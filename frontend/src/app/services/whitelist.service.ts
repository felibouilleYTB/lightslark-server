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

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { API_URL } from '../../environments/environment';
import { AuthService } from './auth.service';
import { APIError, BaseService } from './base.service';

@Injectable()
export class WhitelistService extends BaseService
{
    constructor(private http: Http, auth: AuthService)
    {
        super(auth);
    }

    add(entry: string): Observable<APIError>
    {
        return this.handle(this.http.put(`${API_URL}/whitelist`, '', this.withToken({
            entry: entry
        })));
    }

    update(entry: WhitelistEntry, newEntry: string): Observable<APIError>
    {
        return this.handle(this.http.post(`${API_URL}/whitelist`, '', this.withToken({
            entry: entry.name,
            newEntry: newEntry
        })));
    }

    remove(entry: WhitelistEntry): Observable<APIError>
    {
        return this.handle(this.http.delete(`${API_URL}/whitelist`, this.withToken({
            entry: entry.name
        })));
    }

    get(): Observable<WhitelistEntry[]>
    {
        return this.http.get(`${API_URL}/whitelist`, this.withToken()).map(res => {
            const json = res.json();
            const entries: WhitelistEntry[] = [];

            json.forEach((item, index) => {
               entries.push(createEntry(index, item))
            });

            return entries;
        }).catch(error => Observable.throw(error));
    }
}

export interface WhitelistEntry
{
    id: string;
    name: string;
    type: string;
}

export function createEntry(id: string, entry: string): WhitelistEntry {
    return {
        id: id,
        name: entry,
        type: entry.includes('*') ? 'glob' : (entry.endsWith('/') ? 'folder' : 'file')
    }
}