import React from "react";
import UserFormView from "./UserForm.view";
import userEvent from "@testing-library/user-event";
import {
  render,
  cleanup,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react";
import * as Yup from "yup";

afterEach(cleanup);

const FIRST_NAME_INPUT_TEXT = "First Name:";
const LAST_NAME_INPUT_TEXT = "Last Name:";
const EMAIL_INPUT_TEXT = "Email:";

const initValues = {
  firstName: "",
  lastName: "",
  email: "",
};

const validationSchema = Yup.object({
  firstName: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  lastName: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
});

const onSubmit = jest.fn();

const testName = "testName";
const testLastName = "testLastName";
const testEmail = "testEmail@email.com";

afterEach(() => {
  jest.clearAllMocks();
});

it("should render all labels", async () => {
  render(
    <UserFormView
      onSubmit={onSubmit}
      initValues={initValues}
      validationSchema={validationSchema}
    />
  );

  const name = screen.queryAllByText(FIRST_NAME_INPUT_TEXT);
  const lastName = screen.queryAllByText(LAST_NAME_INPUT_TEXT);
  const email = screen.queryAllByText(EMAIL_INPUT_TEXT);
  const btn = screen.getAllByRole("button", { name: /submit/i });

  await waitFor(() => {
    expect(name).toHaveLength(1);
    expect(lastName).toHaveLength(1);
    expect(email).toHaveLength(1);
    expect(btn).toHaveLength(1);
  });
});

describe("Submiting", () => {
  describe("given valid data", () => {
    it("should let the user submit the data", async () => {
      const { container } = render(
        <UserFormView
          onSubmit={onSubmit}
          initValues={initValues}
          validationSchema={validationSchema}
        />
      );

      const submit = container.querySelector('button[type="submit"]');

      const inputName = screen.getByLabelText(
        new RegExp(FIRST_NAME_INPUT_TEXT, "i")
      );

      const inputLastName = screen.getByLabelText(
        new RegExp(LAST_NAME_INPUT_TEXT, "i")
      );

      const inputEmail = screen.getByLabelText(
        new RegExp(EMAIL_INPUT_TEXT, "i")
      );

      await waitFor(() => {
        fireEvent.change(inputName, { target: { value: testName } });
        fireEvent.change(inputLastName, { target: { value: testLastName } });
        fireEvent.change(inputEmail, { target: { value: testEmail } });
      });

      await waitFor(() => {
        fireEvent.click(submit);
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit).toHaveBeenCalledWith({
        email: testEmail,
        firstName: testName,
        lastName: testLastName,
      });
    });
  });

  describe("given invalid data", () => {
    it("shouldn't let the user submit the data", async () => {
      const arrOfWrongValues = [
        {
          email: testEmail,
          firstName: "",
          lastName: testLastName,
        },
        {
          email: testEmail,
          firstName: testName,
          lastName: "",
        },
        {
          email: "",
          firstName: testName,
          lastName: testLastName,
        },
      ];

      for (let i = 0; i < 3; i++) {
        const { container } = render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        const submit = container.querySelector('button[type="submit"]');

        const inputName = screen.getByLabelText(
          new RegExp(FIRST_NAME_INPUT_TEXT, "i")
        );

        const inputLastName = screen.getByLabelText(
          new RegExp(LAST_NAME_INPUT_TEXT, "i")
        );

        const inputEmail = screen.getByLabelText(
          new RegExp(EMAIL_INPUT_TEXT, "i")
        );

        await waitFor(() => {
          fireEvent.change(inputName, {
            target: { value: arrOfWrongValues[i].firstName },
          });
          fireEvent.change(inputLastName, {
            target: { value: arrOfWrongValues[i].lastName },
          });
          fireEvent.change(inputEmail, {
            target: { value: arrOfWrongValues[i].email },
          });
          fireEvent.click(submit);
        });

        expect(onSubmit).toHaveBeenCalledTimes(0);

        jest.clearAllMocks();
      }
    });
  });
});

describe("Inputs fields", () => {
  describe("given valid data", () => {
    it("should not show any errors for valid data", async () => {
      render(
        <UserFormView
          onSubmit={onSubmit}
          initValues={initValues}
          validationSchema={validationSchema}
        />
      );

      const inputName = screen.getByLabelText(
        new RegExp(FIRST_NAME_INPUT_TEXT, "i")
      );

      const inputLastName = screen.getByLabelText(
        new RegExp(LAST_NAME_INPUT_TEXT, "i")
      );

      const inputEmail = screen.getByLabelText(
        new RegExp(EMAIL_INPUT_TEXT, "i")
      );

      await waitFor(() => {
        fireEvent.change(inputName, { target: { value: testName } });
        fireEvent.change(inputLastName, {
          target: { value: testLastName },
        });
        fireEvent.change(inputEmail, { target: { value: testEmail } });
      });
    });
  });

  describe("given invalid data", () => {
    it("should print 3 errors when all inputs are empty & clicked on submit", async () => {
      render(
        <UserFormView
          onSubmit={onSubmit}
          initValues={initValues}
          validationSchema={validationSchema}
        />
      );

      userEvent.click(screen.getByRole("button", { name: /submit/i }));

      await waitFor(() => {
        const errors = screen.getAllByText("Required");
        expect(errors).toHaveLength(3);
      });
    });

    describe("First name input", () => {
      it("should not show errors after inputting a proper name", async () => {
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, "i")),
          testName
        );

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(0);
        });
      });

      it('should show "Required" when input field left empty after clicking on it', async () => {
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.click(
          screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, "i"))
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(1);
        });
      });

      it("should show error when name is longer than 15 chars", async () => {
        const error = "Must be 15 characters or less";
        const toLongName = "a".repeat(16);
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(FIRST_NAME_INPUT_TEXT, "i")),
          toLongName
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText(error);
          expect(errors).toHaveLength(1);
        });
      });
    });

    describe("Last name input", () => {
      it("should not show errors after inputting a proper lastname", async () => {
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, "i")),
          testName
        );

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(0);
        });
      });

      it('should show "Required" when input field left empty after clicking on it', async () => {
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.click(
          screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, "i"))
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(1);
        });
      });

      it("should show error when name is longer than 20 chars", async () => {
        const error = "Must be 20 characters or less";
        const toLongName = "a".repeat(21);
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(LAST_NAME_INPUT_TEXT, "i")),
          toLongName
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText(error);
          expect(errors).toHaveLength(1);
        });
      });
    });

    describe("Email input", () => {
      it("should not show errors after inputting a proper lastname", async () => {
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, "i")),
          "email@email.com"
        );

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(0);
        });
      });

      it('should show "Required" when input field left empty after clicking on it', async () => {
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.click(
          screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, "i"))
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(1);
        });
      });

      it("should show error when name is longer than 15 chars", async () => {
        const error = "Invalid email address";
        render(
          <UserFormView
            onSubmit={onSubmit}
            initValues={initValues}
            validationSchema={validationSchema}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(EMAIL_INPUT_TEXT, "i")),
          "email"
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText(error);
          expect(errors).toHaveLength(1);
        });
      });
    });
  });
});
