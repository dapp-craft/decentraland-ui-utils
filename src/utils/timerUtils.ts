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
    console.log('this._timer=======================================================', this._timer)
    console.log('this._seconds=====================================================', this._seconds)

    if (this._timer !== this._seconds) return

    engine.addSystem(this._timeOutSystemHandle)
  }

  public stop() {
    if (!this._callback) return

    engine.removeSystem(this._timeOutSystemHandle)

    this._timer = this._seconds
  }

  private _timeOutSystemHandle(dt: number) {
    this._timer -= dt

    console.log('dt--------------------------------------------------------------------', dt)

    if (this._timer <= 0) {
      console.log('=====================================================================================')

      this._callback()

      this.stop()
    }
  }
}