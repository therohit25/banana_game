export interface responseStructure<T> {
  success: boolean;
  statusCode: number;
  data: T;
}

export function responseBuilder<T>(
  data: T,
  statusCode: number
): responseStructure<T> {
  return {
    success: true,
    statusCode,
    data,
  };
}
