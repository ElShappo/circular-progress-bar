import { convertAttributeValueToBoolean } from "../circular-progress-bar.utils";
import { ATTRIBUTES } from "./circular-progress-bar-settings.constants";
import html from "./circular-progress-bar-settings.html?raw";
import {
  CircularProgressBarForm,
  CircularProgressBarSetting,
} from "./circular-progress-bar-settings.model";

class CircularProgressBarSettingsElement extends HTMLElement {
  private isRendered: boolean = false;

  constructor() {
    super();
  }

  static get observedAttributes(): CircularProgressBarSetting[] {
    return ATTRIBUTES;
  }

  connectedCallback(): void {
    if (!this.isRendered) {
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = html;
      // this.initializeForm();

      const form = shadow.querySelector(
        ".circular-progress-bar__settings"
      ) as HTMLFormElement;

      form.addEventListener("submit", (event: Event) => {
        event.preventDefault();
      });

      form.addEventListener("input", () => {
        this.filterValueControl();
        const formValue = this.getFormValue(form);

        this.dispatchEvent(
          new CustomEvent("settings", {
            detail: { value: formValue },
            bubbles: true,
            composed: false,
          })
        );
      });

      this.isRendered = true;
    }
  }

  attributeChangedCallback(
    attributeName: CircularProgressBarSetting,
    _oldValue: string | null,
    newValue: string
  ): void {
    setTimeout(() => {
      const shadow = this.shadowRoot;

      if (shadow) {
        const form = shadow.querySelector(
          ".circular-progress-bar__settings"
        ) as HTMLFormElement;

        const formControl = shadow.querySelector(
          `input[name="${attributeName}"]`
        ) as HTMLInputElement;

        if (attributeName === "value") {
          formControl.value = newValue;
        } else {
          formControl.checked = convertAttributeValueToBoolean(newValue);
        }

        form.dispatchEvent(new Event("input"));
      }
    }, 0);
  }

  private getFormValue(
    form: HTMLFormElement
  ): Partial<CircularProgressBarForm> {
    const formData = new FormData(form);
    const formValue = {} as CircularProgressBarForm;

    for (const attribute of ATTRIBUTES) {
      const controlValue = (formData.get(attribute) || "false") as string;
      formValue[attribute] = controlValue;
    }

    return formValue;
  }

  private filterValueControl(): void {
    const shadow = this.shadowRoot;

    if (shadow) {
      const valueControl = shadow.querySelector(
        'input[name="value"]'
      ) as HTMLInputElement;

      const value = +valueControl.value;

      if (value < 0) {
        valueControl.value = "0";
      } else if (value > 100) {
        valueControl.value = "100";
      } else {
        valueControl.value = value.toString();
      }
    }
  }
}

customElements.define(
  "circular-progress-bar-settings",
  CircularProgressBarSettingsElement
);
