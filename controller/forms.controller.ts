const supertest = require("supertest");
const request = supertest("https://api.neuvays.com");

class FormsController {
  postSap(bookingPayload: any) {
    return request.post("/contactSapInsider").send(bookingPayload);
  }

  PostInterest(payload: any) {
    return request.post("/addInterest").send(payload);
  }
}

export default new FormsController();
