import { render, screen } from "@testing-library/react";
import Apps from "./App";

describe("render components", () => {
  it("should create main page", () => {
    const App = render(<Apps />);
    expect(App).toMatchSnapshot();
  });

  test("renders btn completed", () => {
    const all = "All";
    const active = "Active";
    const clear = "Clear completed";

    render(<Apps />);
    expect(screen.getByText(/All/i)).toBeInTheDocument();
    expect(screen.getByText(/Active/i)).toBeInTheDocument();
    expect(screen.getByText(/Clear completed/i)).toBeInTheDocument();
    expect(screen.getByText(/items left/i)).toBeInTheDocument();
    expect(screen.getAllByText(all).length).toBe(1);
    expect(screen.getAllByText(active).length).toBe(1);
    expect(screen.getAllByText(clear).length).toBe(1);
  });
});
