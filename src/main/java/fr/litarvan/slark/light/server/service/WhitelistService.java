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
package fr.litarvan.slark.light.server.service;

import fr.litarvan.commons.config.ConfigProvider;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.apache.commons.lang3.ArrayUtils;

@Singleton
public class WhitelistService
{
    @Inject
    private ConfigProvider config;

    public void add(String entry)
    {
        config.get("whitelist").append("whitelist", String[].class, entry);
    }

    public void update(String entry, String newEntry)
    {
        String[] whitelist = get();

        for (int i = 0; i < whitelist.length; i++)
        {
            if (whitelist[i].equals(entry))
            {
                whitelist[i] = newEntry;
                break;
            }
        }

        config.get("whitelist").set("whitelist", whitelist);
    }

    public void delete(String entry)
    {
        config.get("whitelist").set("whitelist", ArrayUtils.removeAllOccurences(get(), entry));
    }

    public String[] get()
    {
        return config.at("whitelist.whitelist", String[].class);
    }
}
