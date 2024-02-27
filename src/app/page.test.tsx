import Home from "./page";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Home", () => {
  it("should render the home page", () => {
    render(<Home />);
  });
});
