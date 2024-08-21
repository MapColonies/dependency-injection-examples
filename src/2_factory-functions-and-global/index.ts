import "reflect-metadata";
import {
  container as globalContainer,
  DependencyContainer,
  injectable,
  container,
  instanceCachingFactory,
  instancePerContainerCachingFactory,
} from "tsyringe";

@injectable()
export class Logger {
  public log(message: string) {
    console.log(message);
  }
}

export function BadFactoryFunction() {
  const logger = globalContainer.resolve(Logger);
  logger.log("Hello from BadFactoryFunction");
  return "avi";
}

export function GoodFactoryFunction(container: DependencyContainer) {
  const logger = container.resolve(Logger);

  logger.log("Hello from GoodFactoryFunction");
  return "avi";
}

container.register("FactoryFunction", { useFactory: GoodFactoryFunction });
// container.register("FactoryFunction", { useFactory: instanceCachingFactory(GoodFactoryFunction) });
// container.register("FactoryFunction", {
//   useFactory: instancePerContainerCachingFactory(GoodFactoryFunction)
// });

const a = container.resolve("FactoryFunction");

console.log(a);
