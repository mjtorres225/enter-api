import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export class FallbackExpectionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    const BAD_REQUEST: HttpStatus = HttpStatus.BAD_REQUEST;

    return response.status(BAD_REQUEST).json({
      success: false,
      statusCode: BAD_REQUEST,
      message: exception.message
        ? exception.message
        : "Unexpected error ocurred.",
    });
  }
}
