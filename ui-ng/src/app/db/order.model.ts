import { OfferType, Offer } from "./offer.model";
import { Contact } from "./contact.model";
import { Document } from "./document.model";

export interface OrderItem {
  offer: Offer;
  custom_description: string;
  quantity: number;
  price: number;
}

export interface OrderPricing {
  suggested: number;
  last: number;
  low: number;
  high: number;
  cost: number;
}

export enum OrderStatus {
  PLACED = 1,
  FULFILLED = 2,
  CANCELED = 3
}

export interface Order {
  id: string;
  contact: Contact;
  date: Date;
  ref_no: string;
  status: OrderStatus;
  items: OrderItem[];
  total: number;
}
