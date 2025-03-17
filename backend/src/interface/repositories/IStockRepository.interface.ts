import { stockDetailsOutput} from './stockRepository.types';


export interface IStockRepository {
    getStockPrice(symbol:String,date:Date): Promise<stockDetailsOutput>;
  }
  