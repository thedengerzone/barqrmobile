export interface ResponseEntity<T> {
  status: number;
  headers: Record<string, string>;
  data: T;
}
