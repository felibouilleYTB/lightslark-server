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
package fr.litarvan.slark.light.server;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import fr.litarvan.commons.App;
import fr.litarvan.commons.config.ConfigProvider;
import fr.litarvan.commons.crash.ExceptionHandler;
import fr.litarvan.commons.io.IOSource;
import fr.litarvan.slark.light.server.http.error.APIError;
import fr.litarvan.slark.light.server.http.Controller;
import fr.litarvan.slark.light.server.http.error.HTTPReportField;
import fr.litarvan.slark.light.server.http.error.InRequestException;
import fr.litarvan.slark.light.server.http.Routes;
import fr.litarvan.slark.light.server.http.controller.MainController;
import java.io.File;
import java.net.InetSocketAddress;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import spark.Filter;
import spark.Request;
import spark.Spark;

@Singleton
public class LightslarkServer implements App
{
    public static final String VERSION = "1.0.0";
    private static final Logger LOGGER = LogManager.getLogger("Lightslark");

    @Inject
    private ConfigProvider configs;

    @Inject
    private Gson gson;

    @Inject
    private ExceptionHandler exceptionHandler;

    @Inject
    private Routes routes;

    @Inject
    private MainController main;

    private boolean debug = false;

    @Override
    public void start()
    {
        LOGGER.info("Starting Lightslark Server v{}", VERSION);

        // This adds HTTP-related info to the crash reports
        exceptionHandler.addField(new HTTPReportField("URL", Request::url));
        exceptionHandler.addField(new HTTPReportField("Scheme", Request::scheme));
        exceptionHandler.addField(new HTTPReportField("Route", (request) -> request.requestMethod() + " " + request.pathInfo()));
        exceptionHandler.addField(new HTTPReportField("Route params", (request) -> request.params().toString()));
        exceptionHandler.addField(new HTTPReportField("Query params", (request) -> request.queryParams().toString()));

        // Configs
        LOGGER.info("Loading configs...");

        configs.from("config/app.json").defaultIn(IOSource.at("assets/app.default.json"));
        configs.from("config/auth.json").defaultIn(IOSource.at("assets/auth.default.json"));
        configs.from("config/whitelist.json").defaultIn(IOSource.at("assets/whitelist.default.json"));

        // Spark
        LOGGER.info("Starting HTTP engine");

        Spark.staticFileLocation("/assets/web");
        Spark.port(configs.at("app.port", int.class));
        Spark.notFound(main::web);

        // Disable CORS protection on debug mode
        Filter corsFilter = (request, response) ->
        {
            response.header("Access-Control-Allow-Origin", "http://127.0.0.1:4200");

            if (request.requestMethod().toLowerCase().equals("options"))
            {
                response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                response.header("Access-Control-Allow-Headers", "origin, x-csrftoken, content-type, token, accept");

                response.body(Controller.SUCCESS);
            }
        };

        if (this.debug = System.getProperty("slark.debug", "false").equalsIgnoreCase("true"))
        {
            LOGGER.warn("!! DEBUG MODE ENABLED ! DISABLING CSRF PROTECTION FOR http://127.0.0.1:4200 !");
            Spark.after(corsFilter);
        }

        // Exception handling
        Spark.exception(Exception.class, (e, request, response) ->
        {
            response.type("application/json; charset=utf-8");

            JsonObject rep = new JsonObject();
            rep.addProperty("success", false);

            if (e instanceof APIError)
            {
                rep.addProperty("title", ((APIError) e).getTitle());
            }
            else
            {
                rep.addProperty("type", e.getClass().getName());
            }

            rep.addProperty("message", e.getMessage());

            response.body(gson.toJson(rep));

            if (!(e instanceof APIError))
            {
                exceptionHandler.handle(new InRequestException(e, request));
            }
            else if (this.debug)
            {
                try
                {
                    corsFilter.handle(request, response);
                }
                catch (Exception ignored)
                {
                }
            }
        });

        // Loading routes
        routes.load();

        // Waiting for spark...
        Spark.awaitInitialization();

        System.out.println();
        LOGGER.info("====> Done ! Lightslark Server started on " + new InetSocketAddress(Spark.port()));
        System.out.println();
    }

    @Override
    public String getName()
    {
        return "Lightslark Server";
    }

    @Override
    public String getVersion()
    {
        return VERSION;
    }

    @Override
    public File getFolder()
    {
        return new File(".");
    }
}
