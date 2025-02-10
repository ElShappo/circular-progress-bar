import styles from "./circular-progress-bar.scss?inline";

import "./circular-progress-bar-settings/circular-progress-bar-settings";
import "./circular-progress-bar-loader/circular-progress-bar-loader";
import {
  CircularProgressBarForm,
  CircularProgressBarSetting,
} from "./circular-progress-bar-settings/circular-progress-bar-settings.model";
import {
  DEFAULT_COLOR,
  SETTING_ATTRIBUTE_MAPPING,
} from "./circular-progress-bar.constants";

class CircularProgressBarElement extends HTMLElement {
  private isRendered: boolean = false;
  private settingsEventHandler = this.handleSettingsEvent.bind(this);

  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = this.html;
  }

  get html(): string {
    return `
      <style>${styles}</style>
      <article class='circular-progress-bar'>
        <div class='circular-progress-bar__wrapper'>
          <slot name='title'></slot>
          <slot name='loader'></slot>
          <slot name='settings'></slot>
        </div>
      </article>
    `;
  }

  static get observedAttributes(): string[] {
    return ["color"];
  }

  connectedCallback(): void {
    if (!this.isRendered) {
      const shadow = this.shadowRoot!;

      shadow.addEventListener("settings", this.settingsEventHandler);
      this.isRendered = true;
    }
  }

  disconnectedCallback(): void {
    const shadow = this.shadowRoot!;
    shadow.removeEventListener("settings", this.settingsEventHandler);
  }

  attributeChangedCallback(
    _attributeName: CircularProgressBarSetting,
    _oldValue: string | null,
    newValue: string
  ): void {
    const shadow = this.shadowRoot!;

    const card = shadow.querySelector(
      ".circular-progress-bar"
    ) as HTMLElement | null;

    if (!card) {
      console.error(
        "Couldn't locate a card component within template. Make sure you've passed it."
      );
      return;
    }

    card.style.backgroundColor = newValue || DEFAULT_COLOR;
  }

  private handleSettingsEvent(event: Event): void {
    const settingsEvent = event as CustomEvent;

    const newState = settingsEvent.detail
      .value as Partial<CircularProgressBarForm>;

    const shadow = this.shadowRoot!;

    const loaderSlot = shadow.querySelector(
      'slot[name="loader"]'
    ) as HTMLSlotElement | null;

    if (!loaderSlot) {
      console.error(
        "Couldn't locate 'loader' slot within <circular-progress-bar> component. Make sure you've specified it."
      );
      return;
    }

    const loader = loaderSlot.assignedElements()[0] as Element | undefined;

    if (!loader) {
      console.error(
        "Couldn't locate any component within 'loader' slot. Make sure you've passed it."
      );
      return;
    }

    for (const [key, value] of Object.entries(newState)) {
      const attributeName = SETTING_ATTRIBUTE_MAPPING.get(
        key as CircularProgressBarSetting
      )!;
      loader.setAttribute(attributeName, value);
    }
  }
}

customElements.define("circular-progress-bar", CircularProgressBarElement);
