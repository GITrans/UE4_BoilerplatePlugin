import {Entity, model, property} from '@loopback/repository';

@model()
export class Move extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  _id: string;

  @property({
    type: 'string',
    required: true,
  })
  playerId: string;

  @property({
    type: 'string',
  })
  gameId: string;

  @propert