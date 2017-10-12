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
package fr.litarvan.slark.light.server;

import com.google.inject.Guice;
import com.google.inject.Injector;
import fr.litarvan.commons.App;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class Main
{
    private static final Logger LOGGER = LogManager.getLogger(Main.class);
    private static Injector injector;

    public static void main(String[] args)
    {
        if (args.length > 0 && args[0].equalsIgnoreCase("--debug"))
        {
            System.setProperty("slark.debug", "true");
        }

        LOGGER.info("Creating Lightslark...");

        injector = Guice.createInjector(new LightslarkServerModule());
        App app = injector.getInstance(App.class);

        LOGGER.info("Done.");
        System.out.println();

        app.start();
    }

    public static Injector injector()
    {
        return injector;
    }
}
