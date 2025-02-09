import styles from "./circular-progress-bar.scss?inline";

import "./circular-progress-bar-settings/circular-progress-bar-settings";
import "./circular-progress-bar-loader/circular-progress-bar-loader";
import {
  CircularProgressBarForm,
  CircularProgressBarSetting,
} from "./circular-progress-bar-settings/circular-progress-bar-settings.model";
import { SETTING_ATTRIBUTE_MAPPING } from "./circular-progress-bar.constants";

class CircularProgressBarElement extends HTMLElement {
  private isRendered: boolean = false;

  constructor() {
    super();
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

  connectedCallback(): void {
    if (!this.isRendered) {
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = this.html;
      this.isRendered = true;

      shadow.addEventListener("settings", (event: Event) => {
        const settingsEvent = event as CustomEvent;

        const newState = settingsEvent.detail
          .value as Partial<CircularProgressBarForm>;

        const loaderSlot = shadow.querySelector(
          'slot[name="loader"]'
        ) as HTMLSlotElement;

        console.log(newState);

        const loader = loaderSlot.assignedElements()[0];

        for (const [key, value] of Object.entries(newState)) {
          const attributeName = SETTING_ATTRIBUTE_MAPPING.get(
            key as CircularProgressBarSetting
          )!;
          loader.setAttribute(attributeName, value);
        }
      });
    }
  }
}

customElements.define("circular-progress-bar", CircularProgressBarElement);
