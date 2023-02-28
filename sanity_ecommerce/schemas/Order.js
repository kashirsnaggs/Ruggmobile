// schema.js
export default {
  name: 'order',
  type: 'document',
  title: 'Order',
  fields: [
    {
      name: 'payerName',
      type: 'string',
      title: 'Payer Name'
    },
    {
      name: 'shippingAddress',
      type: 'string',
      title: 'Shipping Address'
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price'
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image'
    }
  ]
};
