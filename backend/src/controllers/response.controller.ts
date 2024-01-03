import { Response } from 'express';

export class ResponseController {
  static message = {
    // SERVICES
    SUCCESS_GET_DATA: 'Success access data',
    SUCCESS_CREATE_DATA: 'Success create data',
    SUCCESS_UPDATE_DATA: 'Success update data',
    SUCCESS_DELETE_DATA: 'Success delete Data',
    FAILED_GET_DATA: 'Failed access data',
    FAILED_CREATE_DATA: 'Failed create data',
    FAILED_UPDATE_DATA: 'Failed update data',
    FAILED_DELETE_DATA: 'Failed delete Data',
    // DATABASE
    SUCCESS_CONNECT_DB: 'Connection has been established successfully.',
    FAILED_CONNECT_DB: 'Unable to connect to the database:',
    // SYNC DATABASE
    SUCCESS_SYNC_DB: 'Database has been syncronized successfully',
    FAILED_SYNC_DB: 'Failed to syncronized Database',
    // AUTH
    SUCCESS_AUTH: 'Success authentication',
    FAILED_AUTH: 'Failed authentication'
  };

  static failed(res: Response, error: any, message?: string) {
    return res.status(500).json({
      status: false,
      name: error.name,
      message: message || error.message,
      response: error
    });
  }

  static failedPrisma(res: Response, error: any, message?: string) {
    return res.status(500).json({
      status: false,
      name: error.name,
      message: JSON.parse(message!) || error.message,
      response: error
    });
  }
}
