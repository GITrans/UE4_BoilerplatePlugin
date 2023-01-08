
import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  del,
  requestBody,
  HttpErrors,
} from '@loopback/rest';
import {Context} from '@loopback/context';
import {Game, Move, PlayerResult, GameAmount, GameAmountInterface} from '../models';
import {GameRepository} from '../repositories';
import {MoveController} from './move.controller';
import {Raiden} from './raiden.controller';
import {Robot} from './robot.controller';
import {RaidenDataSource, RobotDataSource} from '../datasources';
import {IndexToPlayer, TOKEN, TOKEN_AMOUNT_WEI} from '../constants';

import {RockPaperScissorsGetLoser} from '../rpsWinner';

export class GameController {
  constructor(
    @repository(GameRepository)
    public gameRepository : GameRepository,
  ) {}

  @get('/game/amount', {
    responses: {
        '200': {
          description: 'Game move amount',
          content: {'application/json': {schema: {'x-ts-type': GameAmount}}},
        },
    }
  })
  getAmount(): GameAmountInterface {
    return {
        amount: TOKEN_AMOUNT_WEI,