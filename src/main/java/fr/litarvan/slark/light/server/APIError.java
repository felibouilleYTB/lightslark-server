package fr.litarvan.slark.light.server;

import com.google.gson.Gson;
import spark.Response;

public class APIError extends Exception
{
    public static final String INVALID_CREDENTIALS = "Invalid credentials";
    public static final String UNAUTHORIZED = "Unauthorized";
    public static final String MISSING_PARAMETER = "Missing parameter";

    private static Gson gson = Main.injector().getInstance(Gson.class);

    private String title;
    private String message;

    public APIError(String title, String message)
    {
        super(message);

        this.title = title;
        this.message = message;
    }

    public String response(Response response)
    {
        String rep = gson.toJson(this);

        response.type("application/json");
        response.body(rep);

        return rep;
    }

    public String getTitle()
    {
        return title;
    }

    public String getMessage()
    {
        return message;
    }
}
