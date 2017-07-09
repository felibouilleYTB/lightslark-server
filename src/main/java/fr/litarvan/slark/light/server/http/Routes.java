package fr.litarvan.slark.light.server.http;

import fr.litarvan.slark.light.server.http.controller.AuthController;
import fr.litarvan.slark.light.server.http.controller.MainController;
import javax.inject.Inject;

import static spark.Spark.*;

public final class Routes
{
    @Inject
    private AuthController auth;

    @Inject
    private MainController main;

    public void load()
    {
        get("/", main::home);
        path("/api", () -> {
            path("/auth", () -> {
                post("/login", auth::login);
                post("/logout", auth::logout);
            });
        });
    }
}
