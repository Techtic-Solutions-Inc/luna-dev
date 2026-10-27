import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { IconDemo } from "@/components/ui/IconDemo";

describe("smoke", () => {
  it("renders Font Awesome demo", () => {
    render(<IconDemo />);
    expect(screen.getByText("Font Awesome is configured.")).toBeInTheDocument();
  });
});
