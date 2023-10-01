const SERVER_URL =
  process.env.SERVICE_URL ||
  process.env.NEXT_PUBLIC_SERVICE_URL ||
  "http://localhost:8080";
export default SERVER_URL;
