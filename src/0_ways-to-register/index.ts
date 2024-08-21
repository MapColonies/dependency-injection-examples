import "reflect-metadata";
import { injectable, container, Lifecycle } from "tsyringe";

// decorator - works only for classes and injects into global container
@injectable()
class Example {
  constructor() {}

  public speak() {
    console.log("Hello example");
  }
}

class Example2 {
  constructor() {}

  public speak() {
    console.log("Hello example 2");
  }
}

// That way you can register an interface instead of class and non class objects
container.register("Example2Interface", { useClass: Example2 });
container.register("valueRegister", { useValue: "value" });

const example = container.resolve(Example);
example.speak();

const example2 = container.resolve<Example2>("Example2Interface");
example2.speak();
