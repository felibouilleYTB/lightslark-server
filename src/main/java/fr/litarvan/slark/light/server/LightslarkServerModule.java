package fr.litarvan.slark.light.server;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.inject.AbstractModule;
import fr.litarvan.commons.App;

public class LightslarkServerModule extends AbstractModule
{
    @Override
    protected void configure()
    {
        bind(App.class).to(LightslarkServer.class);
        bind(Gson.class).toInstance(new GsonBuilder().setPrettyPrinting().create());
    }
}
