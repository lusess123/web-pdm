import { IField } from './field'
export interface IModel {
  key: string,
  name: string,
  moduleKey?: string,
  fields: IField[],
  originalKey: string,
  aggregateRoot?: string,
  belongAggregate?: string,
  // aggregateRoot:  m.aggregateRoot,
  aggregateModelKey?: string,
  type: string,
}
