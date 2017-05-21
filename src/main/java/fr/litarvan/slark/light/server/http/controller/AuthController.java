package fr.litarvan.slark.light.server.http.controller;

import com.google.common.hash.Hashing;
import com.google.gson.JsonObject;
import fr.litarvan.commons.config.ConfigProvider;
import fr.litarvan.slark.light.server.APIError;
import fr.litarvan.slark.light.server.http.Controller;
import java.nio.charset.Charset;
import javax.inject.Inject;
import org.apache.commons.lang3.RandomStringUtils;
import spark.Request;
import spark.Response;

public class AuthController extends Controller
{
    private String token;

    @Inject
    private ConfigProvider config;

    public String login(Request request, Response response) throws APIError
    {
        String email = require(request, "email");
        String password = require(request, "password");

        if (email.equalsIgnoreCase(config.at("auth.email")) && Hashing.sha512().hashString(password, Charset.defaultCharset()).toString().equals(config.at("auth.password")))
        {
            token = RandomStringUtils.randomAlphanumeric(512);
            response.cookie("token", token);

            return success(response);
        }

        throw new APIError(APIError.INVALID_CREDENTIALS, "Invalid email or password");
    }

    public String logout(Request request, Response response) throws APIError
    {
        requireLogged(request);

        token = null;
        response.removeCookie("token");

        return success(response);
    }

    public void requireLogged(Request request) throws APIError
    {
        if (request.cookie("token") == null || !request.cookie("token").equals(token))
        {
            throw new APIError(APIError.UNAUTHORIZED, "You can't do that without being logged");
        }
    }
}
