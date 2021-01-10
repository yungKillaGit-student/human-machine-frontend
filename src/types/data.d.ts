export interface DataOptions {
  params?: Record<string, any>;
}

export interface UpdateResult<T> {
  oldObject: T;
  newObject: T;
}
