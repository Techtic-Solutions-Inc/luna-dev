import "styled-components";
import type { AppTheme } from "./tokens";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {
    /** Preserves module augmentation for styled-components DefaultTheme. */
    readonly __styledComponentsTheme?: true;
  }
}
