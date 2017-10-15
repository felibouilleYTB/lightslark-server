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

import com.google.common.hash.Hashing;
import fr.litarvan.commons.config.ConfigProvider;
import fr.litarvan.slark.light.server.auth.AuthToken;
import fr.litarvan.slark.light.server.auth.AuthError;
import fr.litarvan.slark.light.server.auth.AuthException;
import java.nio.charset.Charset;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;
import javax.inject.Inject;
import javax.inject.Singleton;
import org.apache.commons.lang3.RandomStringUtils;

/**
 * Authentication service
 *
 * [By Sam543381] Documentation note on DoS/Brute-force attacks:
 *
 * The controller blocks abusing clients when providing more than one credential pair each one and an half seconds
 * in order to avoid request flooding that would result in mass sha512 hashing.
 * It also makes sure password are short enough to limit hash processing time.
 */
@Singleton
public class AuthService
{
    public static final long LOGIN_MINIMUM_PERIOD = 1500L;
    public static final int MAX_PASSWORD_LENGTH = 500;

    private ConcurrentHashMap<String, Long> loginHistory = new ConcurrentHashMap<>();
    private ConcurrentHashMap<String, AuthToken> tokens = new ConcurrentHashMap<>();

    @Inject
    private ConfigProvider config;

    public String authenticate(String hostIP, String email, String password, boolean remember) throws AuthException
    {
        long time = System.currentTimeMillis();

        if (loginHistory.containsKey(hostIP) && time - loginHistory.get(hostIP) <= LOGIN_MINIMUM_PERIOD)
        {
            float period = ((float) LOGIN_MINIMUM_PERIOD / 1000F);
            String message = "You must wait at least " + period  + " seconds since your last try before issuing new credentials.";

            throw new AuthException(AuthError.BRUTE_FORCE_PROTECTION, message);
        }

        loginHistory.remove(hostIP);
        loginHistory.put(hostIP, time);

        if (password.length() > MAX_PASSWORD_LENGTH)
        {
            throw new AuthException(AuthError.DOS_PROTECTION, "Passwords longer than " + MAX_PASSWORD_LENGTH + " are not allowed");
        }

        String hash = Hashing.sha512().hashString(password, Charset.defaultCharset()).toString();
        if (email.equalsIgnoreCase(config.at("auth.email")) && hash.equals(config.at("auth.password")))
        {
            String token = RandomStringUtils.randomAlphanumeric(512);
            tokens.put(hostIP, new AuthToken(token, System.currentTimeMillis() + TimeUnit.DAYS.toMillis(remember ? 30 : 1)));

            return token;
        }

        throw new AuthException(AuthError.INVALID_CREDENTIALS, "Invalid email or password");
    }

    public String getToken(String hostIP)
    {
        AuthToken token = tokens.get(hostIP);

        if (token != null && System.currentTimeMillis() >= token.getValidUntil())
        {
            tokens.remove(hostIP);
            token = null;
        }

        return token != null ? token.getToken() : null;
    }

    public void logout(String hostIP)
    {
        tokens.remove(hostIP);
    }
}
