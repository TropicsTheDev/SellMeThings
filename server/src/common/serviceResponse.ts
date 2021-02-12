export class ServiceResponse {
  isSuccess: boolean;
  message: string;
  timeStamp: string;
  data: object;

  constructor({ isSuccess, messgae, timeStamp, data }) {
    this.isSuccess = isSuccess;
    this.timeStamp = new Date(timeStamp).toLocaleString("en-US", {
      timeZone: "America/New_York",
    });
    this.message = messgae;
    this.data = data;
  }
}
