import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import IconSelection from "./IconSelection"; // Adjust the import path as necessary
import "@testing-library/jest-dom";

const mockIcons = [
  { name: "Icon1", icon: <div>Icon1</div> },
  { name: "Icon2", icon: <div>Icon2</div> },
];

describe("IconSelection Component", () => {
  it("renders correctly", () => {
    render(<IconSelection icons={mockIcons} onSelectIcon={() => {}} />);
    expect(screen.getByLabelText("select icon")).toBeInTheDocument();
  });

  it("opens dialog on button click", () => {
    render(<IconSelection icons={mockIcons} onSelectIcon={() => {}} />);
    fireEvent.click(screen.getByLabelText("select icon"));
    expect(screen.getByText("Select an Icon")).toBeInTheDocument();
  });

  it("initially has the dialog closed", () => {
    render(<IconSelection icons={mockIcons} onSelectIcon={() => {}} />);
    expect(screen.queryByText("Select an Icon")).not.toBeInTheDocument();
  });

  it("calls onSelectIcon with correct icon name when an icon is clicked", () => {
    const onSelectIconMock = jest.fn();
    render(<IconSelection icons={mockIcons} onSelectIcon={onSelectIconMock} />);

    fireEvent.click(screen.getByLabelText("select icon"));
    fireEvent.click(screen.getByText("Icon1"));

    expect(onSelectIconMock).toHaveBeenCalledWith("Icon1");
  });

  it("shows 'Select Icon' when no icon is initially selected", () => {
    render(<IconSelection icons={mockIcons} onSelectIcon={() => {}} />);
    expect(screen.getByText("Select Icon")).toBeInTheDocument();
  });

  it("updates selected icon correctly", () => {
    const onSelectIconMock = jest.fn();
    render(<IconSelection icons={mockIcons} onSelectIcon={onSelectIconMock} />);

    fireEvent.click(screen.getByLabelText("select icon"));
    fireEvent.click(screen.getByText("Icon1"));

    expect(onSelectIconMock).toHaveBeenCalledWith("Icon1");
  });
});
