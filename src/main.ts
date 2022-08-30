import { createApplication } from './app';
import { EnvConfig } from './config';

async function bootstrap() {
  const [app, config, logger] = await createApplication();

  await app.listen(config.get(EnvConfig.Port), async () => {
    logger.log(`Application running on ${await app.getUrl()}`);
  });
}
bootstrap();
