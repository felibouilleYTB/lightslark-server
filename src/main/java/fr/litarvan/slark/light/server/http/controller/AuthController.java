/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil and the Lightslark contributors
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
package fr.litarvan.slark.light.server.http.controller;

import com.google.common.hash.Hashing;
import com.google.gson.JsonObject;
import fr.litarvan.commons.config.ConfigProvider;
import fr.litarvan.slark.light.server.APIError;
import fr.litarvan.slark.light.server.AuthToken;
import fr.litarvan.slark.light.server.http.Controller;
import java.nio.charset.Charset;
import javax.inject.Inject;
import org.apache.commons.lang3.RandomStringUtils;
import spark.Request;
import spark.Response;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

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

    private ConcurrentHashMap<String, Long> loginHistory = new ConcurrentHashMap<>();

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
        boolean remember = Boolean.parseBoolean(require(request, "remember"));

        if (password.length() > MAX_PASSWORD_LENGTH) throw new APIError("Denial of services protection", "Passwords longer than " + MAX_PASSWORD_LENGTH + " are not allowed");

        if (email.equalsIgnoreCase(config.at("auth.email")) && Hashing.sha512().hashString(password, Charset.defaultCharset()).toString().equals(config.at("auth.password")))
        {
            String token = RandomStringUtils.randomAlphanumeric(512);

            tokens.put(ip, new AuthToken(token, System.currentTimeMillis() + TimeUnit.DAYS.toMillis(remember ? 30 : 1)));

            JsonObject object = new JsonObject();
            object.addProperty("success", true);
            object.addProperty("token", token);

            return json(object, response);
        }

        throw new APIError(APIError.INVALID_CREDENTIALS, "Invalid email or password");
    }

    public String validate(Request request, Response response) throws APIError
    {
        return result(response, isLogged(request));
    }

    public String logout(Request request, Response response) throws APIError
    {
        requireLogged(request);

        tokens.remove(request.ip());

        return success(response);
    }
}
