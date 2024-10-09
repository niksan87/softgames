import * as PIXI from 'pixi.js';
import { convertPoint } from '../utils/utils.convertPoint';
import type { SafeArea } from '../app/ts/app.types';

export abstract class View extends PIXI.Container {

    public abstract update( safearea: SafeArea ): void;

}