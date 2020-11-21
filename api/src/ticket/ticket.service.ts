import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Pool, QueryConfig } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { TicketDto } from './dto/ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  /* TODO: test implementation */
  async create(createTicketDto: CreateTicketDto) {
    const {
      priority,
      manufacturer,
      model,
      os,
      problem,
      description,
    } = createTicketDto;

    /* Insert new ticket into db */
    const query: QueryConfig = {
      name: 'insertTicket',
      text:
        'INSERT INTO ticket(priority, manufacturer, model, os, problem, description) VALUES ($1, $2, $3, $4, $5, %6) RETURNING *',
      values: [priority, manufacturer, model, os, problem, description],
    };
    /* Handle db errors */
    try {
      const res = await this.connection.query<TicketDto, CreateTicketDto[]>(
        query,
      );
      /* If no db errors return Ticket object */
      return res.rows[0];
    } catch (error) {
      /* If db error return response with error and status code 422 */
      const err = {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: error,
        message: { name: query.name, text: query.text, values: query.values },
      };
      throw new HttpException(err, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  /* TODO: test implementation */
  async findAll() {
    try {
      const query = 'SELECT * FROM ticket';
      const queryRes = await this.connection.query<TicketDto>(query);

      /* If no tickets */
      if (queryRes.rows.length === 0) {
        return [];
      }

      return [...queryRes.rows];
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  /* TODO: test implementation */
  async findOne(ticket_id: number) {
    try {
      const query = 'SELECT * FROM ticket WHERE ticket_id = $1';
      const queryRes = await this.connection.query<TicketDto, number[]>(query, [
        ticket_id,
      ]);

      /* If no customer found */
      if (queryRes.rows.length === 0) {
        Logger.verbose(
          {
            res: {
              body: {},
            },
          },
          'TicketService.findOne',
          false,
        );
        return {};
      }
      Logger.verbose(
        {
          res: {
            body: queryRes.rows[0],
          },
        },
        'TicketService.findOne',
        false,
      );
      return queryRes.rows[0];
    } catch (error) {
      const err = {
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: error,
      };
      Logger.error({ message: err, context: 'TicketService.findone' });
      throw new HttpException(err, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  /* TODO: test implementation */
  async update(id: number, updateTicketDto: UpdateTicketDto) {
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
    try {
      const query = `UPDATE ticket SET ${columns} WHERE id = $${keys.length}`;
      const queryRes = await this.connection.query(query, [...values, id]);
      return queryRes.rows;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          error: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
