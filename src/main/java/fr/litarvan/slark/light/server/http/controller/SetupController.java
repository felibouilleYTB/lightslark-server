package fr.litarvan.slark.light.server.http.controller;

import com.google.gson.JsonObject;
import fr.litarvan.commons.config.ConfigProvider;
import fr.litarvan.slark.light.server.http.Controller;
import fr.litarvan.slark.light.server.http.error.APIError;
import fr.litarvan.slark.light.server.service.AuthService;
import javax.inject.Inject;
import spark.Request;
import spark.Response;

public class SetupController extends Controller
{
    @Inject
    private ConfigProvider config;

    @Inject
    private AuthService auth;

    public Object isSetup(Request request, Response response)
    {
        JsonObject result = new JsonObject();
        result.addProperty("success", true);
        result.addProperty("isSetup", isSetup());

        return json(request, response);
    }

    public Object setup(Request request, Response response) throws APIError
    {
        if (isSetup())
        {
            throw new APIError(APIError.ALREADY_SETUP, "Setup can't be done twice");
        }

        String email = require(request, "email");
        String password = require(request, "password");

        config.get("auth").set("email", email);
        config.get("auth").set("password", auth.hash(password));

        return SUCCESS;
    }

    protected boolean isSetup()
    {
        String password = config.at("auth.password");
        return password == null || password.trim().isEmpty();
    }
}
