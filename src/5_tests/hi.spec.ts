import request from "supertest";
import { DependencyContainer } from "tsyringe";
import { app, DB } from "./app";
import { Application } from "express";

describe("hi", () => {
  let container: DependencyContainer;
  let expressApp: Application;
  beforeEach(function () {
    const [a, dependencyContainer] = app({
      useChild: true,
      override: [
        {
          token: "logger",
          provider: {
            useValue: {
              log(message: string) {},
            },
          },
        },
      ],
    });
    container = dependencyContainer;
    expressApp = a;
  });

  it("should return user", async function () {
    const res = await request(expressApp).get("/");
    expect(res.text).toBe("user");
  });

  it("should return hi", async function () {
    const dbSpy = jest.spyOn(container.resolve<DB>("DB"), "getUser");
    dbSpy.mockReturnValue("hi");

    const res = await request(expressApp).get("/");
    expect(res.text).toBe("hi");
  });
});
