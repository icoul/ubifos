import style, { css } from 'styled-components'

export const GraphDataContainer = style.div`
  padding-top: 1vh;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;

  & text {
    fill: #fff;
  }

  & span.apexcharts-legend-text {
    color: #fff !important;
  }
`