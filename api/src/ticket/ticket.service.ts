import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Pool, QueryConfig } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateTicket } from './dto/create-ticket.dto';
import { Ticket, TicketType } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* TODO: test implementation */
  async create(createTicketDto: CreateTicket) {
    const {
      lsu_id,
      core_issue,
      description,
      problem_category,
    } = createTicketDto;
    const status = 'OPEN';
    const priority = 1;
    /**
     * Adapted from:
     * https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
     *
     * START
     */
    //@ts-ignore
    Number.prototype.padLeft = function (base, chr) {
      var len = String(base || 10).length - String(this).length + 1;
      return len > 0 ? new Array(len).join(chr || '0') + this : this;
    };
    const d = new Date(Date.now());
    const submission_date =
      [d.getMonth() + 1, d.getDate(), d.getFullYear()].join('-') +
      ' ' +
      [d.getHours(), d.getMinutes(), d.getSeconds()].join(':');

    /**END */

    /* Insert new ticket into db */
    const query: QueryConfig = {
      name: 'insert_ticket',
      text:
        'INSERT INTO ticket(lsu_id, core_issues, description, problem_category, status, priority, submission_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
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
    /* Handle db errors */
    try {
      const res = await this.connection.query<Ticket, CreateTicket[]>(query);
      /* If no db errors return Ticket object */
      return res.rows[0];
    } catch (error) {
      /* If db error return response with error */
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
  async findAll(param: TicketType | number) {
    let query: QueryConfig;
    switch (param) {
      case TicketType.ANY:
        query = {
          name: 'find_all_tickets',
          text: 'SELECT * FROM ticket',
        };
        break;
      case TicketType.OPENED:
        query = {
          name: 'find_opened_tickets',
          text: 'SELECT * FROM ticket WHERE "status" = \'OPEN\'',
        };
        break;
      case TicketType.CLOSED:
        query = {
          name: 'find_closed_tickets',
          text: 'SELECT * FROM ticket WHERE "status" = \'CLOSE\'',
        };
        break;
      default:
        query = {
          name: 'find_ticket_by_lsu_id',
          text: 'SELECT * FROM ticket WHERE lsu_id = $1',
          values: [param],
        };
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
