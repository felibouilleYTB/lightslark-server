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
