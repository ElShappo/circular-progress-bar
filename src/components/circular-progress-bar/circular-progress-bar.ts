import {
  ATTRIBUTE_PROPERTY_MAPPING,
  DEFAULT_STATE,
} from "./circular-progress-bar.constants";
import { CircularProgressBarAttribute } from "./circular-progress-bar.model";
import { convertAttributeValueToBoolean } from "./circular-progress-bar.utils";

class CircularProgressBarElement extends HTMLElement {
  private state = DEFAULT_STATE;
  private attributePropertyMapping = ATTRIBUTE_PROPERTY_MAPPING;

  private isRendered: boolean = false;

  constructor() {
    super();
  }

  static get observedAttributes(): CircularProgressBarAttribute[] {
    return ["value", "is-animated", "is-hidden"];
  }

  connectedCallback(): void {
    if (!this.isRendered) {
      this.render();
      this.isRendered = true;
    }
  }

  attributeChangedCallback(
    attributeName: CircularProgressBarAttribute,
    _oldValue: string | null,
    newValue: string
  ): void {
    this.updateProperty(attributeName, newValue);
    this.render();
  }

  private updateProperty(
    attributeName: CircularProgressBarAttribute,
    newValue: string
  ): void {
    const propertyName = this.attributePropertyMapping.get(attributeName)!;
    const formattedValue =
      attributeName === "value"
        ? +newValue
        : convertAttributeValueToBoolean(newValue);
    this.state[propertyName] = formattedValue;
  }

  private render(): void {
    this.innerHTML = `
      ${this.state.value}, ${this.state.isAnimated}, ${this.state.isHidden} 
    `;
  }
}

customElements.define("circular-progress-bar", CircularProgressBarElement);
