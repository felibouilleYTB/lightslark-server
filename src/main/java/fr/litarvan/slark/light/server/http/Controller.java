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
package fr.litarvan.slark.light.server.http;

import com.google.gson.Gson;
import fr.litarvan.slark.light.server.http.error.APIError;
import fr.litarvan.slark.light.server.service.AuthService;
import javax.inject.Inject;

import spark.Request;
import spark.Response;

public class Controller
{
    public static final String SUCCESS = "{\n    \"success\": true\n}";
    public static final String FAILURE = "{\n    \"success\": false\n}";

    @Inject
    private Gson gson;

    @Inject
    private AuthService auth;

    protected String json(Object data, Response response)
    {
        response.type("application/json; charset=utf-8");
        return data instanceof String ? (String) data : gson.toJson(data);
    }

    protected String require(Request request, String parameter) throws APIError
    {
        String value = request.params(parameter);

        if (value == null)
        {
            value = request.queryParams(parameter);
        }

        if (value == null)
        {
            throw new APIError(APIError.MISSING_PARAMETER, "Missing parameter '" + parameter + "'");
        }

        return value;
    }


    protected void requireLogged(Request request) throws APIError
    {
        if (!isLogged(request))
        {
            throw new APIError(APIError.UNAUTHORIZED, "You can't do that without being logged");
        }
    }

    protected boolean isLogged(Request request)
    {
        String token = auth.getToken(request.ip());
        String given = request.headers("Token");

        return token != null && given != null && given.equals(token);
    }

    public String success(Response response)
    {
        return json(SUCCESS, response);
    }

    public String failure(Response response)
    {
        return json(FAILURE, response);
    }

    public String result(Response response, boolean result)
    {
        return result ? success(response) : failure(response);
    }
}
