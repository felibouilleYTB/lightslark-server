/*
 * Copyright 2014-2017 Adrien 'Litarvan' Navratil
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
package fr.litarvan.slark.light.server.http;

import com.google.gson.Gson;
import fr.litarvan.slark.light.server.APIError;
import javax.inject.Inject;

import fr.litarvan.slark.light.server.AuthToken;
import spark.Request;
import spark.Response;

import java.util.concurrent.ConcurrentHashMap;

public class Controller
{
    public static final String SUCCESS = "{\n    \"success\": true\n}";
    public static final String FAILURE = "{\n    \"success\": false\n}";

    protected static ConcurrentHashMap<String, AuthToken> tokens = new ConcurrentHashMap<>();

    @Inject
    protected Gson gson;

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
        String ip = request.ip();
        AuthToken token = tokens.get(ip);

        if (token != null && System.currentTimeMillis() >= token.getValidUntil())
        {
            tokens.remove(ip);
            token = null;
        }

        return token != null && request.headers("Token") != null && request.headers("Token").equals(token.getToken());
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
