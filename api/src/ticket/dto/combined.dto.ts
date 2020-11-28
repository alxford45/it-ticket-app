import { IntersectionType } from '@nestjs/swagger';
import { Ticket } from './ticket.dto';
import { User } from 'src/user/dto/user.dto';
import { Device } from './device.dto';

class TicketAndDevice extends IntersectionType(Ticket, Device) {}

export class Combined extends IntersectionType(TicketAndDevice, User) {}
