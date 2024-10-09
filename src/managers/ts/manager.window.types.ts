export type WindowListener = EventListenerOrEventListenerObject
    | ( <K extends keyof WindowEventMap>( this: Window, ev: WindowEventMap[K] ) => unknown )
    | Function;

export type WindowListenerOptions = boolean | AddEventListenerOptions;
export type WindowEvent = keyof WindowEventMap;

export type ListenerConfig = {
    event: WindowEvent;
    listener: WindowListener;
    options?: WindowListenerOptions;
}
