import { engine } from '@dcl/sdk/ecs'

export type TimerConfig = {
  seconds: number;
  callback: () => void;
}

export class Timer {
  private readonly _seconds: number
  private readonly _callback: () => void
  private _timer: number

  constructor({ seconds, callback }: TimerConfig) {
    this._seconds = seconds
    this._callback = callback
    this._timer = this._seconds
  }

  public start() {
    if (this._timer !== this._seconds) return

    console.log('start timer_______________________________________________')
    engine.addSystem(this._timeOutSystemHandle)
  }

  public stop() {
    if (!this._callback) return

    console.log('stop timer_______________________________________________')
    engine.removeSystem(this._timeOutSystemHandle)

    this._timer = this._seconds
  }

  private _timeOutSystemHandle = (dt: number): void => {
    this._timer -= dt

    if (this._timer <= 0) {

      this._callback()

      this.stop()
    }
  }
}