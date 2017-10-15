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

import fr.litarvan.slark.light.server.http.controller.AuthController;
import fr.litarvan.slark.light.server.http.controller.MainController;
import fr.litarvan.slark.light.server.http.controller.WhitelistController;
import javax.inject.Inject;

import static spark.Spark.*;

public final class Routes
{
    @Inject
    private MainController main;

    @Inject
    private AuthController auth;

    @Inject
    private WhitelistController whitelist;

    public void load()
    {
        get("/", main::web);

        path("/api", () -> {
            path("/auth", () -> {
                post("/login",      auth::login);
                post("/validate",   auth::validate);
                post("/logout",     auth::logout);
            });

            get("/whitelist",    whitelist::get);
            put("/whitelist",    whitelist::add);
            post("/whitelist",   whitelist::update);
            delete("/whitelist", whitelist::delete);
        });
    }
}
