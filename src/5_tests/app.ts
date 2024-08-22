import express, { Application } from "express";
import { DependencyContainer, inject, injectable } from "tsyringe";
import { registerDependencies, RegisterOptions } from "../helper";

@injectable()
export class Logger {
  public log(message: string) {
    console.log(message);
  }
}

@injectable()
export class DB {
  constructor(@inject("logger") private logger: Logger) {}
  public getUser() {
    this.logger.log("User fetched");
    return "user";
  }

  async dispose() {
    return Promise.resolve();
  }
}

@injectable()
export class Service {
  constructor(@inject("DB") private db: DB) {}

  public getUser(): string {
    const user = this.db.getUser();
    return user;
  }
}

export function app(
  registerOptions: RegisterOptions
): [Application, DependencyContainer] {
  const container = registerDependencies(
    [
      { provider: { useClass: Logger }, token: "logger" },
      { token: "DB", provider: { useClass: DB } },
      { token: "Service", provider: { useClass: Service } },
    ],
    registerOptions?.override,
    registerOptions?.useChild
  );

  const service = container.resolve<Service>("Service");

  const expressApp = express();

  expressApp.get("/", (req, res) => {
    res.send(service.getUser());
  });

  return [expressApp, container];
}
