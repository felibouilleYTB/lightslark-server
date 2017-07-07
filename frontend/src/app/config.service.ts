import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService
{
    private publicConfig;
    private privateConfig;

    constructor()
    {
        this.publicConfig = {
            server: 'TestServer'
        };
    }

    public get server()
    {
        return this.publicConfig.server;
    }
}
