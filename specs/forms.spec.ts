import * as controller from "../controller/forms.controller";
const { faker } = require("@faker-js/faker");

describe("POST /contactSapInsider", () => {
  // ✅ Test: Successful booking
  jest.setTimeout(10000);
  it("should create a booking successfully", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: "12345", // Invalid phone number
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "2025-03-20",
      time: "12:30 PM - 01:00 PM",
    };

    const response = await controller.default.postSap(bookingPayload);

    console.log(response.status, response.body);
    expect(response.status).toBe(201);
    // expect(response.body.message).toMatch(/invalid phone number/i);
  }, 10000); // Extend timeout

  // ❌ Test: Missing required fields
  it("should return 400 if required fields are missing", async () => {
    const bookingPayload = {};
    const response = await controller.default.postSap(bookingPayload);
    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/missing/i);
  });

  // ❌ Test: Invalid email format
  it("should return 400 if email format is invalid", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number("##########"),
      companyName: faker.company.name(),
      businessEmail: "invalid-email",
      date: "2025-03-20",
      time: "12:30 PM - 01:00 PM",
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/invalid email/i);
  });

  // ❌ Test: Invalid phone number (not 10 digits)
  it("should return 400 if phone number is not 10 digits", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: "12345", // Invalid phone number
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "2025-03-20",
      time: "12:30 PM - 01:00 PM",
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/invalid phone number/i);
  });

  // ❌ Test: Invalid date format
  it("should return 400 if date format is incorrect", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number("##########"),
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "20-03-2025", // Invalid format
      time: "12:30 PM - 01:00 PM",
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/invalid date format/i);
  });

  // ❌ Test: Booking a past date
  it("should return 400 if date is in the past", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number("##########"),
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "2023-01-01", // Past date
      time: "12:30 PM - 01:00 PM",
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/date must be in the future/i);
  });

  // ❌ Test: Invalid time format
  it("should return 400 if time format is incorrect", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number("##########"),
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "2025-03-20",
      time: "12:30", // Incorrect format
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/invalid time format/i);
  });

  // ❌ Test: Name contains numbers or special characters
  it("should return 400 if fullName contains invalid characters", async () => {
    const bookingPayload = {
      fullName: "John123!",
      phoneNumber: faker.phone.number("##########"),
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "2025-03-20",
      time: "12:30 PM - 01:00 PM",
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    // expect(response.body.message).toMatch(/invalid name/i);
  });

  // ❌ Test: Extra unexpected fields
  it("should return 400 if unexpected fields are included", async () => {
    const bookingPayload = {
      fullName: faker.person.fullName(),
      phoneNumber: faker.phone.number("##########"),
      companyName: faker.company.name(),
      businessEmail: faker.internet.email(),
      date: "2025-03-20",
      time: "12:30 PM - 01:00 PM",
      extraField: "This should not be here",
    };

    const response = await controller.default.postSap(bookingPayload);

    expect(response.status).toBe(400);
    //   expect(response.body.message).toMatch(/unexpected field/i);
  });
});

describe("POST /addInterest", () => {
  jest.setTimeout(10000); // Increase timeout for API calls

  it("should add interest successfully", async () => {
    const payload = {
      fullName: faker.person.fullName(),
      businessEmail: faker.internet.email(),
      phone: faker.phone.number("+91 ##########"),
      country: faker.location.country(),
      trial: faker.helpers.arrayElement(["basic", "premium", "enterprise"]),
      subscribe: faker.datatype.boolean(),
    };

    const response = await controller.default.PostInterest(payload);

    console.log(response.status, response.body);

    expect(response.status).toBe(201);
    // expect(response.body).toHaveProperty(
    //   "message",
    //   "Interest added successfully"
    // );
  });

  it("should return 400 for missing required fields", async () => {
    const payload = {}; // Empty payload

    const response = await controller.default.PostInterest(payload);

    expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty("error", "Missing required fields");
  });

  it("should return 400 for invalid email format", async () => {
    const payload = {
      fullName: faker.person.fullName(),
      businessEmail: "invalid-email", // Invalid email
      phone: faker.phone.number("+91 ##########"),
      country: faker.location.country(),
      trial: faker.helpers.arrayElement(["basic", "premium", "enterprise"]),
      subscribe: faker.datatype.boolean(),
    };

    const response = await controller.default.PostInterest(payload);

    expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty("error", "Invalid email format");
  });

  it("should return 400 for invalid phone number", async () => {
    const payload = {
      fullName: faker.person.fullName(),
      businessEmail: faker.internet.email(),
      phone: "12345", // Invalid phone number
      country: faker.location.country(),
      trial: faker.helpers.arrayElement(["basic", "premium", "enterprise"]),
      subscribe: faker.datatype.boolean(),
    };

    const response = await controller.default.PostInterest(payload);

    expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty("error", "Invalid phone number");
  });

  it("should return 400 for invalid trial type", async () => {
    const payload = {
      fullName: faker.person.fullName(),
      businessEmail: faker.internet.email(),
      phone: faker.phone.number("+91 ##########"),
      country: faker.location.country(),
      trial: "invalid-trial", // Invalid trial type
      subscribe: faker.datatype.boolean(),
    };

    const response = await controller.default.PostInterest(payload);

    expect(response.status).toBe(400);
    // expect(response.body).toHaveProperty("error", "Invalid trial type");
  });
});
