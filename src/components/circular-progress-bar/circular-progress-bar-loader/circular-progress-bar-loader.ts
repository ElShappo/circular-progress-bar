import {
  ATTRIBUTE_PROPERTY_MAPPING,
  DEFAULT_STATE,
} from "../circular-progress-bar.constants";
import {
  CircularProgressBarAttribute,
  CircularProgressBarProperty,
} from "../circular-progress-bar.model";
import { convertAttributeValueToBoolean } from "../circular-progress-bar.utils";
import styles from "./circular-progress-bar-loader.scss?inline";
import svgElement from "./circular-progress-bar-loader.svg?raw";

class CircularProgressBarLoaderElement extends HTMLElement {
  private state = DEFAULT_STATE;
  private arc: SVGCircleElement | null = null;
  private circle: SVGElement | null = null;
  private isRendered: boolean = false;
  private basePath = "circular-progress-bar-loader";

  constructor() {
    super();
  }

  get html(): string {
    return `
        <style>${styles}</style>
        ${svgElement} 
      `;
  }

  static get observedAttributes(): CircularProgressBarAttribute[] {
    return ["value", "is-animated", "is-hidden"];
  }

  connectedCallback(): void {
    if (!this.isRendered) {
      const shadow = this.attachShadow({ mode: "open" });
      shadow.innerHTML = this.html;

      this.render();
      this.isRendered = true;
    }
  }

  attributeChangedCallback(
    attributeName: CircularProgressBarAttribute,
    _oldValue: string | null,
    newValue: string
  ): void {
    const propertyName = ATTRIBUTE_PROPERTY_MAPPING.get(attributeName)!;
    this.updateProperty(propertyName, newValue);
    this.render();
  }

  private updateProperty(
    propertyName: CircularProgressBarProperty,
    newValue: string
  ): void {
    const formattedValue =
      propertyName === "value"
        ? +newValue
        : convertAttributeValueToBoolean(newValue);
    this.state[propertyName] = formattedValue;
  }

  private render(): void {
    const shadow = this.shadowRoot;

    if (shadow) {
      const circle = shadow.querySelector(`.${this.basePath}`);
      const arc = shadow.querySelector(`.${this.basePath}__arc`);

      this.circle = circle as SVGElement;
      this.arc = arc as SVGCircleElement;

      if (!this.arc || !this.circle) {
        return;
      }

      const circumference = 2 * Math.PI * this.arc.r.baseVal.value;

      this.arc.style.strokeDasharray = `${
        (circumference * (this.state.value as number)) / 100
      } ${circumference}`;

      this.circle.classList.toggle(
        `${this.basePath}_hidden`,
        this.state.isHidden as boolean
      );

      this.arc.classList.toggle(
        `${this.basePath}__arc_animated`,
        this.state.isAnimated as boolean
      );
    }
  }
}

customElements.define(
  "circular-progress-bar-loader",
  CircularProgressBarLoaderElement
);
