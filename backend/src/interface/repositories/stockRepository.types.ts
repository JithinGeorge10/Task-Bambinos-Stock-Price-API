export type stockDetailsInput = {
    symbol:String,
    date:Date
  };

  export type stockDetailsOutput = {
    readonly price: Number|null;
  };