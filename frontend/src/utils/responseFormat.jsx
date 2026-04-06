export class errorResponse { 
  constructor (success, message,) { 
    this.success = success;
    this.message = message;
  }
}

export class successResponse {
  constructor (success, data, message) {
    this.success = success;
    this.data = data;
    this.message = message;
  }
}