import "reflect-metadata";
import { injectable, Lifecycle, scoped, singleton } from "tsyringe";

@singleton()
class SingletonClass {
  constructor() {}
}

@injectable()
class TransientExample {
  constructor() {}
}

@scoped(Lifecycle.ContainerScoped)
class ContainerScopedExample {
  constructor() {}
}

@scoped(Lifecycle.ResolutionScoped)
class ResolutionScopedExample {
  constructor() {}
}
