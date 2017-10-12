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

import fr.litarvan.commons.crash.ExceptionHandler;
import fr.litarvan.commons.crash.IReportField;
import fr.litarvan.commons.crash.ReportField;
import java.util.function.BiFunction;
import java.util.function.Function;
import spark.Request;

public class HTTPReportField implements IReportField
{
    private String key;
    private Function<Request, String> generator;

    public HTTPReportField(String key, Function<Request, String> generator)
    {
        this.key = key;
        this.generator = generator;
    }

    @Override
    public String getKey()
    {
        return this.key;
    }

    @Override
    public String generateValue(ExceptionHandler handler, Throwable t)
    {
        if (t instanceof InRequestException)
        {
            return this.generator.apply(((InRequestException) t).getRequest());
        }

        return "None";
    }
}
