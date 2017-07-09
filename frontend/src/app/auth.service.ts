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

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { API_URL } from '../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService
{
    logged = false;

    constructor(private http: Http)
    {
    }

    login(email: string, password: string, remember: boolean): Observable<boolean>
    {
        return this.http.post(`${API_URL}/auth/login`, '', { params: {
            email: email,
            password: password,
            remember: remember
        }}).map(res => {
            return this.logged = (res.json().success || false);
        }).catch(error => {
            console.error(error);
            return Observable.throw(error);
        });
    }
}
