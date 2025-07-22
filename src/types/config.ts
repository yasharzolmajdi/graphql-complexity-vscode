export interface GraphQLComplexityConfig {
  endpoint: string;
  maxThreshold: number;
  scalarCost: number;
  fragmentsPath: string;
}
