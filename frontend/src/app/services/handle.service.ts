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
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { APIError } from './base.service';

@Injectable()
export class HandleService
{
    constructor(private snack: MatSnackBar)
    {
    }

    handle(observable: Observable<APIError>, successText: string)
    {
        observable.toPromise().then(err => {
            this.snack.open(err == null ? successText : `${err.title} : ${err.message}`, 'OK', {
                duration: err == null ? 2000 : 3500
            });
        }).catch(err => {
            this.snack.open(`Erreur : ${err}`, 'OK', {
                duration: 3500
            });
        });
    }

    handleError(title: string, err: any) {
        this.snack.open(`${title} : ${err}`, 'OK', {
            duration: 3500
        });
    }
}
