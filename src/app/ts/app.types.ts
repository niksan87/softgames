import type * as PIXI from 'pixi.js';

export type AppOptions = {
    targetId: string;
    renderer: Partial<PIXI.IRendererOptionsAuto>;
    safearea: number;
}

export type SafeArea = {
    x: number;
    y: number;
    width: number;
    height: number;
    ratio?: number;
    debug?: PIXI.Graphics;
}