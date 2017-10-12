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
package fr.litarvan.slark.light.server.http.controller;

import fr.litarvan.commons.io.IOSource;
import fr.litarvan.slark.light.server.http.Controller;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.Charset;
import org.apache.commons.io.IOUtils;
import spark.Request;
import spark.Response;

public class MainController extends Controller
{
    public String home(Request request, Response response) throws IOException
    {
        InputStream in = IOSource.at("assets/web/index.html").provideInput();

        try
        {
            return IOUtils.toString(in, Charset.defaultCharset());
        }
        finally
        {
            IOUtils.closeQuietly(in);
        }
    }
}
