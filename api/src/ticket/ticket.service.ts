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

    /* Check to see if user exists */
    const findQuery: QueryConfig = {
      name: 'select_user_by_id_or_email',
      text: 'SELECT * FROM "user" WHERE lsu_id = $1 OR email = $2',
      values: [lsu_id, email],
    };

    try {
      const res = await this.connection.query<User>(findQuery);

      /* If user exists abort insert operation by returning early */
      if (res.rows.length > 0) {
        return res.rows[0];
      }
    } catch (error) {
      throw new HttpException(
        {
          query: findQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    /* Insert new user into db */
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

      /* Return newly inserted user */
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          query: insertQuery,
          error: error,
        },
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

    /* Status set to open for new ticket */
    const status = 'OPEN';

    /* Submission date set to current server time */
    const submission_date = this.createDate();

    /* Insert new ticket into db */
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

      /* Return newly inserted ticket */
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          query: query,
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

    /* Insert Device into db */
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

      /* Return newly inserted device */
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          query: query,
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

  /* WORKING Implementation */
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

      /* Accumulate user to response */
      response = { ...response, ...user };
    } catch (error) {
      Logger.error(error);
      return error;
    }

    /* Create new Ticket */
    const createTicket: CreateTicket = { ...createCombined };
    try {
      ticket = await this.createTicket(createTicket);

      /* Accumulate ticket to response */
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

      /* Accumulate device to response */
      response = { ...response, ...device };
    } catch (error) {
      Logger.error(error);
      return error;
    }

    /* Return flat object with the intersection of properties from user, ticket, and deivce */
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

      /* If no tickets return empty array */
      if (queryRes.rows.length === 0) {
        return [];
      }

      return queryRes.rows;
    } catch (error) {
      throw new HttpException(
        {
          query: query,
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

      /* If no ticket found return empty object*/
      if (queryRes.rows.length === 0) {
        return {};
      }

      return queryRes.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          query: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /* WORKING Implementation */
  async update(ticket_id: number, updateTicketDto: UpdateTicketDto) {
    const {
      core_issue,
      description,
      problem_category,
      status,
      priority,
    } = updateTicketDto;

    /* Check to see if ticket exist */
    const findQuery: QueryConfig = {
      name: 'select_ticket_by_ticket_id',
      text: 'SELECT * FROM ticket WHERE ticket_id = $1',
      values: [ticket_id],
    };
    try {
      const res = await this.connection.query<Ticket>(findQuery);

      /* If no ticket found throw custom error*/
      if (res.rows.length < 1) {
        throw new Error('BAD_REQUEST');
      }
    } catch (error) {
      /* catch custom error for ticket not found */
      if (error.message === 'BAD_REQUEST') {
        /* Throw HttpException for ticket not found */
        throw new HttpException(
          {
            message: `Ticket with ticket_id: ${ticket_id} DOES NOT EXIST`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      /* Throw HttpException for postgres errors */
      throw new HttpException(
        {
          query: findQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    /* Update ticket */
    const updateQuery = {
      name: 'update_ticket',
      text:
        'UPDATE ticket SET core_issue = $1, description = $2, problem_category = $3, status = $4, priority = $5 WHERE ticket_id = $6 RETURNING *',
      values: [
        core_issue,
        description,
        problem_category,
        status,
        priority,
        ticket_id,
      ],
    };
    try {
      const res = await this.connection.query(updateQuery);
      return res.rows[0];
    } catch (error) {
      throw new HttpException(
        {
          query: updateQuery,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
