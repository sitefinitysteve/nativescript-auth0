export interface Result<T> {
    success?: T;
    failure?: Error;
}
