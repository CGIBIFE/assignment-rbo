export const LOAD_ISUSSES = 'LOAD_ISSUES';
export const LOW_TO_HIGH = 'LOW_TO_HIGH';
export const HIGH_TO_LOW = 'HIGH_TO_LOW';
export const LESS_THAN = 'LESS_THAN';
export const GREATER_THAN = 'GREATER_THAN';

export class LoadIssues {
  static readonly type = LOAD_ISUSSES;
  constructor(public data: {}) {
  }
}

export class LowToHigh {
  static readonly type = LOW_TO_HIGH;
  constructor() {
  }
}

export class HighToLow {
  static readonly type = HIGH_TO_LOW;
  constructor() {
  }
}

export class LessThan {
  static readonly type = LESS_THAN;
  constructor(public count: number) {
  }
}

export class GreaterThan {
  static readonly type = GREATER_THAN;
  constructor(public count: number) {
  }
}
