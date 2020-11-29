import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Pool, Query, QueryConfig } from 'pg';
import { PG_CONNECTION } from 'src/connection';
import { CreateAssignmentDTO } from './dto/create-assignment.dto';
import { AssignmentDTO, AssignmentType } from './dto/assignment.dto';
import { createDate } from 'src/util';

/* TODO: 
   - Implement remaining methods
   - Find solution to abstract SQL
*/
@Injectable()
export class AssignmentService {
  constructor(@Inject(PG_CONNECTION) private connection: Pool) {}

  async create(createAssignmentDTO: CreateAssignmentDTO) {
    const { lsu_id, ticket_id } = createAssignmentDTO;
    const assigned_date = createDate();

    /* Insert new assignment into db */
    const query: QueryConfig = {
      name: 'insert_assignment',
      text:
        'INSERT INTO assignment(lsu_id, ticket_id, assigned_date) VALUES ($1, $2, $3) RETURNING *',
      values: [lsu_id, ticket_id, assigned_date],
    };
    try {
      const res = await this.connection.query<AssignmentDTO>(query);

      /* Return newly inserted assignment */
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
  async findAllById(type: AssignmentType, id: number) {
    let query: QueryConfig;
    switch (type) {
      case AssignmentType.LSU_ID:
        query = {
          name: 'select_all_assignment_by_lsu_id',
          text: 'SELECT * FROM assignment WHERE lsu_id = $1',
          values: [id],
        };
        break;
      case AssignmentType.TICKET_ID:
        query = {
          name: 'select_all_assignment_by_ticket_id',
          text: 'SELECT * FROM assignment WHERE ticket_id = $1',
          values: [id],
        };
        break;

      default:
        /* default error caused by not using controller properly */
        throw new HttpException(
          {
            error:
              'Switch statment in assignment.service.findAllById somehow failed',
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
    try {
      const res = await this.connection.query<AssignmentDTO>(query);

      /* If none exist, return empty array */
      if (res.rows.length < 1) {
        return [];
      }
      /* return array of Assignment objects */
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

  async findAll() {
    const query: QueryConfig = {
      name: 'select_all_assignment',
      text: 'SELECT * FROM assignment',
    };
    try {
      const res = await this.connection.query<AssignmentDTO>(query);

      /* If none exist, return empty array */
      if (res.rows.length < 1) {
        return [];
      }
      /* return array of Assignment objects */
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
  async findOne(assignment_id: number) {
    const query: QueryConfig = {
      name: 'select_assignment_by_assignment_id',
      text: 'SELECT * FROM assignment WHERE assignment_id = $1',
      values: [assignment_id],
    };
    try {
      const res = await this.connection.query<AssignmentDTO>(query);

      /* If none exist, return empty object */
      if (res.rows.length < 1) {
        return {};
      }
      /* return Assignment object */
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
}
