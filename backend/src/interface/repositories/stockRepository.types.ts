export type stockDetailsInput = {
    symbol:String,
    date:Date
  };

  export type stockDetailsOutput = {
    readonly closingPrice: Number|null;
  };