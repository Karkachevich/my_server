import { CONFLICT_STATUS_CODE } from '../constants/status-code';

export default class ConflictError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = CONFLICT_STATUS_CODE;
  }
}
