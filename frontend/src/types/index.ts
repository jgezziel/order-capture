export type Customer = {
  id: number;
  name: string;
  rfc: string;
  fiscalAddress: string;
  email: string;
  phone: string;
  contact: string;
  status: string;
};

export type ShippingAddress = {
  id: number;
  customerId: number;
  NameShort: string;
  address: string;
  postalCode: string;
  phone: string;
  contact: string;
  status: string;
};

export type Product = {
  id: number;
  sku: string;
  description: string;
  measurementUnit: string;
  price: number;
  status: string;
};

export type Order = {
  id: number;
  idOrder: string;
  idProduct: number;
  quantity: number;
  price: number;
  idCustomer: number;
  idShippingAddress: number;
};
