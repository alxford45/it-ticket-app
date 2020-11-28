import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Pool, QueryConfig } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateUser } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/dto/user.dto';
import { Combined } from './dto/combined.dto';
import { CreateCombined } from './dto/create-combined.dto';
import { CreateDevice } from './dto/create-device.dto';
import { CreateTicket } from './dto/create-ticket.dto';
import { Device } from './dto/device.dto';
import { Ticket, TicketType } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /**
   * Queries and inserts user if user does not exists
   *
   * @param createUser
   * @returns User
   */
  private async createUser(createUser: CreateUser) {
    const {
      lsu_id,
      email,
      first_name,
      last_name,
      phone_number,
      department,
      admin,
    } = createUser;

    const findQuery: QueryConfig = {
      name: 'select_user_by_id_or_email',
      text: 'SELECT * FROM "user" WHERE lsu_id = $1 OR email = $2',
      values: [lsu_id, email],
    };

    /* Query User by lsuid or email */
    try {
      const res = await this.connection.query<User>(findQuery);
      /* Test to see if student exists */
      if (res.rows.length > 0) {
        return res.rows[0];
      }
    } catch (error) {
      throw new HttpException(
        { query: findQuery, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    /* Insert new student into db */
    const insertQuery: QueryConfig = {
      name: 'insert_user',

      text:
        'INSERT INTO "user" (lsu_id, email, first_name, last_name, phone_number, department, admin) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [
        lsu_id,
        email,
        first_name,
        last_name,
        phone_number,
        department,
        admin,
      ],
    };
    try {
      const res = await this.connection.query<User>(insertQuery);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        { query: insertQuery, error: error },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Inserts ticket into ticket table
   *
   * @param createTicket
   * @returns Ticket
   */
  private async createTicket(createTicket: CreateTicket) {
    const {
      lsu_id,
      core_issue,
      description,
      problem_category,
      priority,
    } = createTicket;

    const status = 'OPEN';
    const submission_date = this.createDate();

    const query: QueryConfig = {
      name: 'insert_ticket',
      text:
        'INSERT INTO ticket (lsu_id, core_issue, description, problem_category, status, priority, submission_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [
        lsu_id,
        core_issue,
        description,
        problem_category,
        status,
        priority,
        submission_date,
      ],
    };

    try {
      const res = await this.connection.query<Ticket>(query);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Inserts new device into device table
   * @param createDevice
   * @returns Device
   */
  private async createDevice(createDevice: CreateDevice) {
    const {
      ticket_id,
      manufacturer,
      model,
      operating_system,
      operating_system_version,
    } = createDevice;
    const query: QueryConfig = {
      name: 'insert_device',
      text:
        'INSERT INTO device(ticket_id, manufacturer, model, operating_system, operating_system_version) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      values: [
        ticket_id,
        manufacturer,
        model,
        operating_system,
        operating_system_version,
      ],
    };
    try {
      const res = await this.connection.query<Device>(query);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Helper method for createTicket to get current date in SQL format
   *
   * @author KooiInc
   * (https://stackoverflow.com/users/58186/kooiinc)
   *
   * @adapted from https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
   * @returns Date (YYYY-MM-DD HH:MM:SS)
   */
  private createDate() {
    //@ts-ignore
    Number.prototype.padLeft = function (base, chr) {
      var len = String(base || 10).length - String(this).length + 1;
      return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };
    const d = new Date(Date.now());
    const date =
      [d.getFullYear(), d.getMonth() + 1, d.getDate()].join('-') +
      ' ' +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');
    return date;
  }
  /* TODO: test implementation */
  async create(createCombined: CreateCombined) {
    /* Response Accumulator */
    let response: Combined;

    let device: Device;
    let ticket: Ticket;
    let user: User;

    /* Insert or Retrieve User */
    const createUser: CreateUser = { ...createCombined, admin: false }; // tickets are created by students so admin is false
    try {
      user = await this.createUser(createUser);
      response = { ...response, ...user };
    } catch (error) {
      Logger.error(error);
      return error;
    }

    /* Create new Ticket */
    const createTicket: CreateTicket = { ...createCombined };
    try {
      ticket = await this.createTicket(createTicket);
      response = { ...response, ...ticket };
    } catch (error) {
      Logger.error(error);
      return error;
    }

    /* Create new Device */
    const createDevice: CreateDevice = {
      ...createCombined,
      ticket_id: ticket.ticket_id,
    };
    try {
      device = await this.createDevice(createDevice);
      response = { ...response, ...device };
    } catch (error) {
      Logger.error(error);
      return error;
    }

    return response;
  }

  /* WORKING implementation */
  async findAll(param: TicketType | number) {
    let query: QueryConfig;
    switch (param) {
      case TicketType.ANY:
        query = {
          name: 'find_all_tickets',
          text:
            'SELECT * FROM ticket LEFT JOIN "user" ON ticket.lsu_id = "user".lsu_id LEFT JOIN "device" ON ticket.ticket_id = device.ticket_id',
        };
        break;
      case TicketType.OPENED:
        query = {
          name: 'find_opened_tickets',
          text:
            'SELECT * FROM ticket LEFT JOIN "user" ON ticket.lsu_id = "user".lsu_id LEFT JOIN "device" ON ticket.ticket_id = device.ticket_id WHERE "status" = \'OPEN\'',
        };
        break;
      case TicketType.CLOSED:
        query = {
          name: 'find_closed_tickets',
          text:
            'SELECT * FROM ticket LEFT JOIN "user" ON ticket.lsu_id = "user".lsu_id LEFT JOIN "device" ON ticket.ticket_id = device.ticket_id WHERE "status" = \'CLOSE\'',
        };
        break;
      default:
        query = {
          name: 'find_ticket_by_lsu_id',
          text:
            'SELECT * FROM ticket LEFT JOIN "user" ON ticket.lsu_id = "user".lsu_id LEFT JOIN "device" ON ticket.ticket_id = device.ticket_id WHERE ticket.lsu_id = $1',
          values: [param],
        };
        Logger.log(query);
        break;
    }
    try {
      const queryRes = await this.connection.query<Ticket>(query);

      /* If no tickets */
      if (queryRes.rows.length === 0) {
        return [];
      }

      return queryRes.rows;
    } catch (error) {
      throw new HttpException(
        {
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* WORKING implementation */
  async findOne(ticket_id: number) {
    const query: QueryConfig = {
      name: 'select_ticket_by_ticket_id',
      text: 'SELECT * FROM ticket WHERE ticket_id = $1',
      values: [ticket_id],
    };
    try {
      const queryRes = await this.connection.query<Ticket>(query);

      /* If no ticket found */
      if (queryRes.rows.length === 0) {
        return {};
      }

      return queryRes.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* NOT WORKING implementation */
  async update(id: number, updateTicketDto: UpdateTicketDto) {
    id = Number(id);
    let keys = [];
    let values = [];

    /* unknown properties to be updated */
    for (let key in updateTicketDto) {
      if (!!updateTicketDto[key]) {
        keys = [...keys, key];
        values = [...values, updateTicketDto[key]];
      }
    }
    /* keys variable defined by interface NOT user so avoids sql injection */
    const columns = keys.map((val, idx) => `${val} = $${idx + 1}`).join(', ');
    let txt = String.raw`UPDATE ticket SET ${columns} WHERE ticket_id = $${keys.length}`;

    const query = {
      name: 'update_ticket',
      text: txt,
      values: [...values, id],
    };
    try {
      const queryRes = await this.connection.query(query, [...values, id]);
      return queryRes.rows;
    } catch (error) {
      throw new HttpException(
        {
          message: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
