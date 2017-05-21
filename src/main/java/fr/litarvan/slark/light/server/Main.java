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
