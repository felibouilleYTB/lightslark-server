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
import { Http, Response, Headers } from '@angular/http';
import { API_URL } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService
{
    token = null;

    constructor(private http: Http)
    {
    }

    login(email: string, password: string, remember: boolean): Observable<boolean>
    {
        return this.http.post(`${API_URL}/auth/login`, '', {
            params: {
                email: email,
                password: password,
                remember: remember
            }
        }).map(res => {
            const json = res.json();
            this.token = (json.token || null);

            localStorage.setItem('slark.token', this.token);

            return json.success || false;
        }).catch(error => Observable.throw(error));
    }

    refresh(): Promise<any>
    {
        const token = localStorage.getItem('slark.token');

        return this.http.post(`${API_URL}/auth/validate`, '', {
            headers: new Headers({
                token: token
            })
        }).map(res => {
            const json = res.json();
            const success = json.success || false;

            if (success)
            {
                this.token = token;
            }

            return success;
        }).toPromise().catch(error => Promise.resolve());
    }

    logout(): Observable<boolean>
    {
        return this.http.post(`${API_URL}/auth/logout`, '', {
            headers: new Headers({
                'Token': this.token
            })
        }).map(res => {
            const json = res.json();
            const success = json.success || false;

            this.token = success ? null : this.token;

            localStorage.setItem('slark.token', null);

            return success;
        }).catch(error => Observable.throw(error));
    }

    get logged(): boolean
    {
        return this.token != null;
    }
}
