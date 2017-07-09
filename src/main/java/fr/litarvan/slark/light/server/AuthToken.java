package fr.litarvan.slark.light.server;

public class AuthToken
{
    private String token;
    private long validUntil;

    public AuthToken(String token, long validUntil)
    {
        this.token = token;
        this.validUntil = validUntil;
    }

    public String getToken()
    {
        return token;
    }

    public long getValidUntil()
    {
        return validUntil;
    }
}
