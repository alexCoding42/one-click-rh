import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "../../test-utils";
import HomePage from "../HomePage";

describe("<HomePage />", () => {
  it("display a title", () => {
    const { getByTestId } = render(<HomePage />);

    const title = getByTestId("title");

    expect(title).toHaveTextContent(
      "Prenez un rendez-vous téléphonique au Click et Kiosque RH"
    );
  });

  it("display a subtitle", () => {
    const { getByTestId } = render(<HomePage />);

    const subtitle = getByTestId("subtitle");

    expect(subtitle).toHaveTextContent(
      "Les experts de l'administration et de la paie vous répondent"
    );
  });

  it("display a message to indicate all fields are required", () => {
    const { getByTestId } = render(<HomePage />);

    const requiredFieldsMessage = getByTestId("required-fields-message");

    expect(requiredFieldsMessage).toHaveTextContent(
      "Tous les champs de saisie sont obligatoires pour prendre un rendez-vous"
    );
  });

  it("display a form", () => {
    const { getByTestId } = render(<HomePage />);

    const form = getByTestId("custom-form");

    expect(form).not.toBeNull();
  });
});
