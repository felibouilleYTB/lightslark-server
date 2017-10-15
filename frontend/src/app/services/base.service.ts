import { AuthService } from './auth.service';
import { Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export class BaseService
{
    constructor(protected auth: AuthService)
    {
    }

    tokenHeaders(): Headers {
        return new Headers({
            'Token': this.auth.token
        });
    }

    withToken(params?: string | URLSearchParams | {
        [key: string]: any | any[];
    } | null): RequestOptionsArgs {
        return {
            headers: new Headers({
                'Token': this.auth.token
            }),
            params: params
        };
    }

    handle(observable: Observable<Response>): Observable<APIError> {
        return observable.map(res => {
            return this.handleResponse(res);
        }).catch(err => Observable.throw(err));
    }

    handleResponse(response: Response): APIError {
        const json = response.json();
        return (json.success || false) ? null : {
            title: json.title,
            message: json.message
        };
    }
}

export interface APIError {
    title: string,
    message: string
}