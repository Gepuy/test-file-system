export interface IErrorService {
  handle(err: Error | string): void;
}
class Service implements IErrorService {
  handle(err: Error | string = "Something went wrong") {
    console.error(err);
  }
}

export const errorService = new Service();
