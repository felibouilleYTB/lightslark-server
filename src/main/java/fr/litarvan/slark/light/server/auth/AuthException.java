package fr.litarvan.slark.light.server.auth;

public class AuthException extends Exception
{
    private AuthError type;

    public AuthException(AuthError type, String s)
    {
        super(s);

        this.type = type;
    }

    public AuthError getType()
    {
        return type;
    }
}