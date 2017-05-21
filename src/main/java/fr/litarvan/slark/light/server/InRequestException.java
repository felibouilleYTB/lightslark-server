package fr.litarvan.slark.light.server;

import spark.Request;

public class InRequestException extends Exception
{
    private Request request;

    public InRequestException(Throwable throwable, Request request)
    {
        super(throwable);
        this.request = request;
    }

    public Request getRequest()
    {
        return request;
    }
}
