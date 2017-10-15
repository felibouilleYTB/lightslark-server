package fr.litarvan.slark.light.server.http.controller;

import fr.litarvan.slark.light.server.http.Controller;
import fr.litarvan.slark.light.server.http.error.APIError;
import fr.litarvan.slark.light.server.service.WhitelistService;
import javax.inject.Inject;
import spark.Request;
import spark.Response;

public class WhitelistController extends Controller
{
    @Inject
    private WhitelistService whitelist;

    public Object add(Request request, Response response) throws APIError
    {
        requireLogged(request);

        String entry = require(request, "entry");
        whitelist.add(entry);

        return SUCCESS;
    }

    public Object update(Request request, Response response) throws APIError
    {
        requireLogged(request);

        String entry = require(request, "entry");
        String newEntry = require(request, "newEntry");

        whitelist.update(entry, newEntry);

        return SUCCESS;
    }

    public Object delete(Request request, Response response) throws APIError
    {
        requireLogged(request);

        String entry = require(request, "entry");
        whitelist.delete(entry);

        return SUCCESS;
    }

    public Object get(Request request, Response response)
    {
        return json(whitelist.get(), response);
    }
}
