import { MetadataType } from "./metadata.type";

export interface ResponseDataType<T> {
  data: T[];
  metadata: MetadataType;
}