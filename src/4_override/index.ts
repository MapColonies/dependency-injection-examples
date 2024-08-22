import "reflect-metadata";
import { registerDependencies, RegisterOptions } from "../helper";

class Logger {
  public log(message: string) {
    console.log(message);
  }
}

function app(registerOptions?: RegisterOptions) {
  const container = registerDependencies(
    [
      {
        token: "logger",
        provider: { useClass: Logger },
      },
    ],
    registerOptions?.override,
    registerOptions?.useChild
  );

  const logger = container.resolve<Logger>("logger");
  logger.log("Hello from app");
}

const differentLogger = {
  log(message: string) {
    console.log("OVERRIDE", message);
  },
};

app({
  override: [{ token: "logger", provider: { useValue: differentLogger } }],
});
