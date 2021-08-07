import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddEventView from "./AddEvent.view";
import * as Yup from "yup";

const EVENT_NAME = "Event name:";
const EVENT_DATE = "Event date:";

const TEST_NAME = "name";
const TEST_DATE = new Date("01/01/2022");

const initialValues = {
  eventName: "",
  eventDate: null,
};

const validation = Yup.object({
  eventName: Yup.string()
    .max(30, "Must be 30 characters or less")
    .required("Required"),
  eventDate: Yup.string().required("Required").nullable(),
});

const onSubmit = jest.fn();

afterEach(() => {
  jest.clearAllMocks();
});

it("should render the h1", async () => {
  render(
    <AddEventView
      onSubmit={onSubmit}
      validation={validation}
      initialValues={initialValues}
    />
  );

  const h1 = screen.queryAllByText("Add an event:");

  await waitFor(() => {
    expect(h1).toHaveLength(1);
  });
});

it("should render all labels", async () => {
  render(
    <AddEventView
      onSubmit={onSubmit}
      validation={validation}
      initialValues={initialValues}
    />
  );

  const name = screen.queryAllByText(EVENT_NAME);
  const date = screen.queryAllByText(EVENT_DATE);
  const btn = screen.getAllByRole("button", { name: /submit/i });

  await waitFor(() => {
    expect(name).toHaveLength(1);
    expect(date).toHaveLength(1);
    expect(btn).toHaveLength(1);
  });
});

describe("Submiting", () => {
  describe("given valid data,", () => {
    it("should call onSubmit", async () => {
      const { container } = render(
        <AddEventView
          onSubmit={onSubmit}
          validation={validation}
          initialValues={initialValues}
        />
      );

      const submit = container.querySelector('button[type="submit"]');
      const inputData = container.querySelector('input[name="eventDate"]');

      const inputName = screen.getByLabelText(new RegExp(EVENT_NAME, "i"));

      await waitFor(() => {
        fireEvent.change(inputName, { target: { value: TEST_NAME } });
        fireEvent.change(inputData, { target: { value: TEST_DATE } });
      });

      await waitFor(() => {
        fireEvent.click(submit);
      });

      expect(onSubmit).toHaveBeenCalledTimes(1);

      expect(onSubmit).toHaveBeenCalledWith({
        eventName: TEST_NAME,
        eventDate: TEST_DATE,
      });
    });
  });

  describe("given invalid data", () => {
    it("should do not call onSubmit", async () => {
      const testData = [
        {
          name: TEST_NAME,
          date: null,
        },
        {
          name: null,
          date: TEST_DATE,
        },
      ];

      for (let i = 0; i < testData.length; i++) {
        const { container } = render(
          <AddEventView
            onSubmit={onSubmit}
            validation={validation}
            initialValues={initialValues}
          />
        );

        const submit = container.querySelector('button[type="submit"]');
        const inputData = container.querySelector('input[name="eventDate"]');

        const inputName = screen.getByLabelText(new RegExp(EVENT_NAME, "i"));

        await waitFor(() => {
          fireEvent.change(inputName, { target: { value: testData[i].name } });
          fireEvent.change(inputData, { target: { value: testData[i].date } });
        });

        await waitFor(() => {
          fireEvent.click(submit);
        });

        expect(onSubmit).toHaveBeenCalledTimes(0);
        jest.clearAllMocks();
      }
    });
  });
});

describe("Inputs fields", () => {
  describe("Event name", () => {
    describe("given valid input", () => {
      it("should not show errors", async () => {
        render(
          <AddEventView
            onSubmit={onSubmit}
            validation={validation}
            initialValues={initialValues}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(EVENT_NAME, "i")),
          "testName"
        );

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(0);
        });
      });
    });

    describe("given invalid input", () => {
      it('should show "Required" when input field is clicked & lefted empty', async () => {
        render(
          <AddEventView
            onSubmit={onSubmit}
            validation={validation}
            initialValues={initialValues}
          />
        );

        userEvent.click(screen.getByLabelText(new RegExp(EVENT_NAME, "i")));
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(1);
        });
      });

      it("should show error when name is longer than 30 chars", async () => {
        const error = "Must be 30 characters or less";
        const toLongName = "a".repeat(31);
        render(
          <AddEventView
            onSubmit={onSubmit}
            validation={validation}
            initialValues={initialValues}
          />
        );

        userEvent.type(
          screen.getByLabelText(new RegExp(EVENT_NAME, "i")),
          toLongName
        );
        userEvent.tab();

        await waitFor(() => {
          const errors = screen.queryAllByText(error);
          expect(errors).toHaveLength(1);
        });
      });
    });
  });

  describe("Event date:", () => {
    describe("given valid input", () => {
      it("should not show errors", async () => {
        const { container } = render(
          <AddEventView
            onSubmit={onSubmit}
            validation={validation}
            initialValues={initialValues}
          />
        );

        const inputData = container.querySelector('input[name="eventDate"]');

        await waitFor(() => {
          fireEvent.change(inputData, { target: { value: TEST_DATE } });
        });

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(0);
        });
      });
    });

    describe("given invalid input", () => {
      it('should show "required" when input is clicked & left empty', async () => {
        const { container } = render(
          <AddEventView
            onSubmit={onSubmit}
            validation={validation}
            initialValues={initialValues}
          />
        );

        const inputData = container.querySelector('input[name="eventDate"]');

        await waitFor(() => {
          userEvent.click(inputData);
          userEvent.tab();
        });

        await waitFor(() => {
          const errors = screen.queryAllByText("Required");
          expect(errors).toHaveLength(1);
        });
      });
    });
  });
});
