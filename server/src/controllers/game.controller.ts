
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
    };
  }

  @get('/game/create', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: {'x-ts-type': Game}}},
      },
      '403': {
        description: 'Previous game has not ended',
      }
    },
  })
  async create(): Promise<Game> {
    // Return an existing running game or create a new one
    let game: Game, newGame: any = {};
    let now: number, deltaTime: number;

    game = (await this.gameRepository.find({order: ['_id DESC'], limit: 1}))[0];

    if (game) {
        now = new Date().getTime();
        deltaTime = game.startTime.getTime() + game.gameTime;
        if (now < deltaTime) {
            return game;
        }
        if (now < deltaTime + game.resolveTime) {
            throw new HttpErrors.Forbidden('Previous game has not ended');
        }
    }

    newGame.startTime = new Date();
    newGame.move_amount = TOKEN_AMOUNT_WEI;
    return await this.gameRepository.create(newGame);
  }

  @get('/game/count', {
    responses: {
      '200': {
        description: 'Game model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Game)) where?: Where,
  ): Promise<Count> {
    return await this.gameRepository.count(where);
  }

  @get('/game', {
    responses: {
      '200': {
        description: 'Array of Game model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Game}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Game)) filter?: Filter,
  ): Promise<Game[]> {
    return await this.gameRepository.find(filter);
  }

  @patch('/game', {
    responses: {
      '200': {
        description: 'Game PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() game: Game,
    @param.query.object('where', getWhereSchemaFor(Game)) where?: Where,
  ): Promise<Count> {
    return await this.gameRepository.updateAll(game, where);
  }

  @get('/game/{id}', {
    responses: {
      '200': {
        description: 'Game model instance',
        content: {'application/json': {schema: {'x-ts-type': Game}}},
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Game> {
    // Check if date is > after resolution time
    // get all game moves sorted -> calculate entire amount received by the game
    // calculate winning move -> count all the winners -> get amount of guardian ->  amount/winner
    // connect to Guardian Raiden node -> get all game payments by payment identifiers (identifier > x)
    // calculate
    // send Raiden payments to all winners
    let game: Game;
    let currentTime, resolveTime, deltaTime;
    let moves: Move[], validMoves: Move[] = [], winningMoves: Move[] = [];
    let moveController;
    let total_amount: number = 0, winner_amount: number, guardian_amount: number;
    let move_count: any = {
        '1': {
            rock: 0,
            paper: 0,
            scissors: 0,
        },
        '2': {
            rock: 0,
            paper: 0,
            scissors: 0,
        }