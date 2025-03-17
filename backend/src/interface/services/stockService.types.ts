export type stockDetailsInput = {
    symbol:String,
    date:Date
  };

  export type stockDetailsOutput = {
    closingPrice: Number|null;
  };