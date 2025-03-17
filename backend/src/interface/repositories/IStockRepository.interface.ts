import { stockDetailsOutput} from './stockRepository.types';


export interface IStockRepository {
    getStockPrice(symbol:String,date:String): Promise<stockDetailsOutput>;
  }
  