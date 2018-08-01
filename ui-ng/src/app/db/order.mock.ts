import { Order, OrderStatus } from "./order.model";
import { CONTACTS } from "./contact.mock";
import { OFFERS } from "./offer.mock";
import { DocumentType } from "./document.model";

export const ORDERS: Order[] = [
  {
    id: "1",
    status: 1,
    contact: CONTACTS[0],
    ref_no: "1234",
    date: new Date(2018, 2, 14),
    items: [
      {
        offer: OFFERS[0],
        custom_description: null,
        quantity: 11,
        price: 111
      },
      {
        offer: OFFERS[1],
        custom_description: "this is a custom description",
        quantity: 22,
        price: 222
      }
    ],
    total: null
  }
];
