export * from './account.service';
import { AccountService } from './account.service';
export * from './communication.service';
import { CommunicationService } from './communication.service';
export * from './support.service';
import { SupportService } from './support.service';
export const APIS = [AccountService, CommunicationService, SupportService];
