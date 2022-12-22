import { NOT_FOUND_STATUS_CODE } from '../constants/status-code';

export default class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = NOT_FOUND_STATUS_CODE;
  }
}
