import ReactEcs from '@dcl/sdk/react-ecs'

export interface UIObjectInterface {
  /**
   * Returns UiEntity.
   */
  render(key?: string): ReactEcs.JSX.Element;

  /**
   * Makes an invisible visible again.
   */
  show(): void;

  /**
   * Makes visible an invisible again.
   */
  hide(): void;
}

export type UIObjectConfig = {
  startHidden?: boolean;
}

export abstract class UIObject implements UIObjectInterface {
  protected visible: boolean

  protected constructor({ startHidden = true }: UIObjectConfig) {
    this.visible = !startHidden
  }

  abstract render(key?: string): ReactEcs.JSX.Element

  public show(): void {
    this.visible = true
  }

  public hide(): void {
    this.visible = false
  }
}