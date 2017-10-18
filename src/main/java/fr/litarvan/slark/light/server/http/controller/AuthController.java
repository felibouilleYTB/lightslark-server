/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil and the Lightslark contributors
 *
 * This file is part of Lightslark.
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
package fr.litarvan.slark.light.server.http.controller;

import com.google.gson.JsonObject;
import fr.litarvan.slark.light.server.http.error.APIError;
import fr.litarvan.slark.light.server.auth.AuthException;
import fr.litarvan.slark.light.server.http.Controller;
import fr.litarvan.slark.light.server.service.AuthService;
import javax.inject.Inject;
import spark.Request;
import spark.Response;

public class AuthController extends Controller
{
    @Inject
    private AuthService auth;

    public String login(Request request, Response response) throws APIError
    {
        String email = require(request, "email");
        String password = require(request, "password");
        boolean remember = Boolean.parseBoolean(require(request, "remember"));
        try
        {
            String token = auth.authenticate(request.ip(), email, password, remember);

            JsonObject object = new JsonObject();
            object.addProperty("success", true);
            object.addProperty("token", token);

            return json(object, response);
        }
        catch (AuthException e)
        {
            switch (e.getType())
            {
                case INVALID_CREDENTIALS:
                    throw new APIError(APIError.INVALID_CREDENTIALS, "Invalid email or password");
                case DOS_PROTECTION:
                    throw new APIError(APIError.DOS_PROTECTION, "Denial of service protection");
                case BRUTE_FORCE_PROTECTION:
                    throw new APIError(APIError.BRUTE_FORCE_PROTECTION, "Brute force protection");
                default:
                    return null;
            }
        }
    }

    public String validate(Request request, Response response) throws APIError
    {
        return result(response, isLogged(request));
    }

    public String logout(Request request, Response response) throws APIError
    {
        requireLogged(request);
        auth.logout(request.ip());

        return success(response);
    }
}
