import { UNAUTHORIZED_STATUS_CODE } from '../constants/status-code';

export default class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED_STATUS_CODE;
  }
}
