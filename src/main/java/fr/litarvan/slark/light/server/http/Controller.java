package fr.litarvan.slark.light.server.http;

import com.google.gson.Gson;
import fr.litarvan.slark.light.server.APIError;
import javax.inject.Inject;
import spark.Request;
import spark.Response;

public class Controller
{
    public static final String SUCCESS = "{\n    \"success\": \"true\"\n}";

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

    public String success(Response response)
    {
        return json(SUCCESS, response);
    }
}
