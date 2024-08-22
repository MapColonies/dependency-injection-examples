import "reflect-metadata";

import { lstat } from "fs/promises";
import { container, DependencyContainer, injectable } from "tsyringe";

@injectable()
class Logger {
  public log(message: string) {
    console.log(message);
  }
}

async function asyncFactory(container: DependencyContainer): Promise<number> {
  const logger = container.resolve(Logger);
  const stats = await lstat("package.json");
  logger.log(stats.atime.toLocaleString());
  return stats.size;
}

container.register("AsyncFactory", { useFactory: asyncFactory });

const size = await container.resolve<Promise<string>>("AsyncFactory");
console.log(size);
