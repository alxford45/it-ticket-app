import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool, QueryConfig } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateWorkDTO } from './dto/create-work.dto';
import { WorkDTO, WorkType } from './dto/work.dto';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class WorkService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async create(createTicketWorkDto: CreateWorkDTO) {
    const {
      lsu_id,
      ticket_id,
      start_datetime,
      end_datetime,
    } = createTicketWorkDto;

    /*Insert work into db*/
    const query: QueryConfig = {
      name: 'insert_work',
      text:
        'INSERT INTO work(lsu_id, ticket_id, start_datetime, end_datetime) VALUES ($1, $2, $3, $4) RETURNING *',
      values: [lsu_id, ticket_id, start_datetime, end_datetime],
    };
    try {
      const res = await this.connection.query<WorkDTO>(query);
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

  /* TODO */
  async findAll() {
    const query: QueryConfig = {
      name: 'find_all_work',
      text: 'SELECT * FROM work',
    };
    try {
      const res = await this.connection.query<WorkDTO>(query);
      if (res.rows.length < 1) {
        return [];
      }
      return res.rows;
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

  /* TODO */
  async findOne(work_id: number) {
    const query: QueryConfig = {
      name: 'find_work_by_work_id',
      text: 'SELECT * FROM work WHERE work_id = $1',
      values: [work_id],
    };
    try {
      const res = await this.connection.query<WorkDTO>(query);
      if (res.rows.length < 1) {
        throw new Error('BAD_REQUEST');
      }
      return res.rows[0];
    } catch (error) {
      if (error.message === 'BAD_REQUEST') {
        throw new HttpException(
          {
            query: query,
            error: `No work exists with work_id: ${query.values[0]}`,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        {
          query: query,
          error: error,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async findAllById(type: WorkType, id: number) {
    let query: QueryConfig;
    switch (type) {
      case WorkType.LSU_ID:
        query = {
          name: 'find_all_work_by_lsu_id',
          text: 'SELECT * from work WHERE lsu_id = $1',
          values: [id],
        };
        break;
      case WorkType.TICKET_ID:
        query = {
          name: 'find_all_work_by_ticket_id',
          text: 'SELECT * from work WHERE ticket_id = $1',
          values: [id],
        };
        break;
      default:
        throw new HttpException(
          {
            error: 'Switch statement in work.service.findAllById failed',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    try {
      const res = await this.connection.query<WorkDTO>(query);
      if (res.rows.length < 1) {
        return [];
      }
      return res.rows;
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
}
