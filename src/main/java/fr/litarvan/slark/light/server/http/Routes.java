package fr.litarvan.slark.light.server.http;


import fr.litarvan.slark.light.server.APIError;
import fr.litarvan.slark.light.server.http.controller.AuthController;
import javax.inject.Inject;


import static spark.Spark.*;

public final class Routes
{
    @Inject
    private AuthController auth;

    public void load()
    {
        path("/api", () -> {
            path("/auth", () -> {
                post("/login", auth::login);
                post("/logout", auth::logout);
            });
        });
    }
}
