const SKUS = {
  ANDROID: {
    subscription: ['com.jatievip.air.permonth', 'com.jatievip.air.year'],
    product: [
      'com.jatievip.air.product.permonth',
      'com.jatievip.air.product.year',
    ],
  },
  IOS: ['com.jatievip.air.permonth', 'com.jatievip.air.year'],
  ONE_MONTH: 'com.jatievip.air.permonth',
  YEAR: 'com.jatievip.air.year',
};

const RECEIPT_STATUS = {
  VALID_RECEIPT: 'Valid Receipt',
  INVALID_RECEIPT: 'Invalid Receipt',
};
export { SKUS, RECEIPT_STATUS };
