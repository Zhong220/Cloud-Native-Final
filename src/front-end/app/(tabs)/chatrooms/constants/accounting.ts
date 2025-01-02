import { Transaction } from "../model";

const sampleAccounting: Transaction[] = [
  {
    id: 1,
    // datetime: "2021-10-01 20:00:00",
    datetime: new Date("2021-10-01 20:00:00").toISOString(),
    title: "Dinner at Restaurant",
    super_cid: "crHjSb",
    payer: 1,
    attendees_ids: [2, 3],
    price: 1200.5,
    issplited: true,
  },
  {
    id: 2,
    datetime: new Date("2021-10-02 10:00:00").toISOString(),
    title: "Stationery Purchase",
    super_cid: "b63sTZ",
    payer: 2,
    attendees_ids: [1, 3],
    price: 300.0,
    issplited: false,
  },
  {
    id: 3,
    datetime: new Date("2021-10-03 12:00:00").toISOString(),
    title: "Lunch at School",
    super_cid: "a63sTZ",
    payer: 3,
    attendees_ids: [1, 2],
    price: 100.0,
    issplited: false,
  },
  {
    id: 4,
    datetime: new Date("2021-10-01 20:00:00").toISOString(),
    title: "Dinner at Restaurant",
    super_cid: "crHjSb",
    payer: 1,
    attendees_ids: [2, 3],
    price: 1200.5,
    issplited: true,
  },
  {
    id: 5,
    datetime: new Date("2021-10-02 10:00:00").toISOString(),
    title: "Stationery Purchase",
    super_cid: "b63sTZ",
    payer: 2,
    attendees_ids: [1, 3],
    price: 300.0,
    issplited: true,
  },
  {
    id: 6,
    datetime: new Date("2021-10-03 12:00:00").toISOString(),
    title: "Lunch at School",
    super_cid: "a63sTZ",
    payer: 3,
    attendees_ids: [1, 2],
    price: 100.0,
    issplited: true,
  },
];

export default sampleAccounting;