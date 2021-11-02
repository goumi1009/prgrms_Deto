import { css } from 'styled-components';

const fontType = {
  micro: css`
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.005em;
  `,
  tiny: css`
    font-size: 13px;
    line-height: 20px;
    letter-spacing: -0.01em;
  `,
  small: css`
    font-size: 14px;
    line-height: 24px;
    letter-spacing: -0.01em;
  `,
  base: css`
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.01em;
  `,
  medium: css`
    font-size: 18px;
    line-height: 28px;
    letter-spacing: -0.02em;
  `,
  large: css`
    font-size: 24px;
    line-height: 34px;
    letter-spacing: -0.01em;
  `,
};

export default fontType;
