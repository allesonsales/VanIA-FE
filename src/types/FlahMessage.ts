import { FlashMessageType } from '../app/service/flash-message.service';

export interface FlashMessage {
  message: string;
  status: FlashMessageType;
}
