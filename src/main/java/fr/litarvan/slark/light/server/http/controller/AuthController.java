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
import java.util.concurrent.ConcurrentHashMap;

/**
 * Documentation note on DoS attacks:
 * The controller blocks abusing clients when providing more than one credential pair each one and an half seconds
 * in order to avoid request flooding that would result in mass sha512 hashing.
 * It also makes sure password are short enough to limit hashs processing time.
**/
public class AuthController extends Controller
{
    public static final long LOGIN_MINIMUM_PERIOD = 1500L;
    public static final int MAX_PASSWORD_LENGTH = 500;

    private String token;
    private ConcurrentHashMap<String, Long> loginHistory = new ConcurrentHashMap<String, Long>();

    @Inject
    private ConfigProvider config;

    public String login(Request request, Response response) throws APIError
    {
        String ip = request.ip();
        long time = System.currentTimeMillis();

        if (loginHistory.containsKey(ip) && time - loginHistory.get(ip) <= LOGIN_MINIMUM_PERIOD)
            throw new APIError("Denial of services protection", "You must wait " + ((double) LOGIN_MINIMUM_PERIOD / 1000D) + " seconds since your last try before issuing new credentials.");

        loginHistory.remove(ip);
        loginHistory.put(ip, time);

        String email = require(request, "email");
        String password = require(request, "password");

        if (password.length() > MAX_PASSWORD_LENGTH) throw new APIError("Denial of services protection", "Passwords longer than " + MAX_PASSWORD_LENGTH + " are not allowed");

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
