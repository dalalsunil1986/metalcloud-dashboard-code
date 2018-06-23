// @flow
import { css } from 'styled-components';

const sizes = {
    giant: 1170,
    desktop: 992,
    tablet: 768,
    phablet: 572,
    phone: 376,
};

const media = Object.keys(sizes).reduce((accumulator, label) => {
    const newAccumulator = accumulator;
    newAccumulator[label] = (...args: any) => css`
        @media (max-width: ${sizes[label]}px) {
            ${css(...args)};
        }
    `;
    return newAccumulator;
}, {});

const Colors = {
    Primary: '#c1c1c6',
    Background: '#1d1e33',
    SecondaryBackground: '#15182a',
    SidebarBackground: '#0f101e',
    SidebarSeparator: '#051717',
    Active: '#c1c1c6',
    Text: '#777a8f',
    Footer: '#0b0c17',
    Tint: '#ed275c'
};

export { Colors, media };
