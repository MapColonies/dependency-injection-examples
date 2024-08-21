import "reflect-metadata";

import { container, inject, injectable, Lifecycle } from "tsyringe";

class Counter {
  private static number = 1;
  private ownNumber;
  constructor() {
    this.ownNumber = Counter.number++;
  }

  public getNumber() {
    return this.ownNumber;
  }
}

@injectable()
class SpeakClass {
  constructor(@inject("Counter") private counter: Counter) {}

  public speak() {
    console.log("speak", this.counter.getNumber());
  }
}

@injectable()
class ScreamClass {
  constructor(@inject("Counter") private counter: Counter) {}

  public scream() {
    console.log("scream", this.counter.getNumber());
  }
}

@injectable()
class WrapperClass {
  constructor(
    @inject(SpeakClass) private speakClass: SpeakClass,
    @inject(ScreamClass) private screamClass: ScreamClass
  ) {}

  public talk() {
    this.speakClass.speak();
    this.screamClass.scream();
    console.log();
  }
}

container.register(
  "Counter",
  { useClass: Counter },
  { lifecycle: Lifecycle.ResolutionScoped }
);

const wrapper = container.resolve(WrapperClass);
wrapper.talk();

const wrapper2 = container.resolve(WrapperClass);
wrapper2.talk();

const childContainer = container.createChildContainer();
const childWrapper = childContainer.resolve(WrapperClass);
childWrapper.talk();
