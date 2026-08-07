import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { breakpointValues, grid } from '../theme/breakpoints';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h2`
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
  font-size: ${({ theme }) => theme.typography.fontSizes['2xl']};
  margin: 0;
`;

const Status = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.fontSizes.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${({ theme }) => theme.typography.fontSizes.sm};
`;

const Th = styled.th`
  text-align: left;
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: ${({ theme }) => theme.borders.styles.strong};
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
`;

const Td = styled.td`
  padding: ${({ theme }) => theme.spacing.sm};
  border-bottom: ${({ theme }) => theme.borders.styles.subtle};
  font-family: ${({ theme }) => theme.typography.fontFamilies.mono};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Active = styled.span`
  display: inline-block;
  padding: ${({ theme }) => `${theme.spacing.xxs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borders.radius.full};
  background-color: ${({ theme, $active }) =>
    $active ? theme.colors.semantic.successBg : theme.colors.neutral[100]};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.semantic.success : theme.colors.text.muted};
  font-size: ${({ theme }) => theme.typography.fontSizes.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeights.medium};
`;

function getActiveBreakpoint(width) {
  const ordered = Object.entries(breakpointValues).sort((a, b) => b[1] - a[1]);
  for (const [name, min] of ordered) {
    if (width >= min) return name;
  }
  return 'mobile';
}

/**
 * Breakpoints and grid configuration reference.
 */
export function Breakpoints() {
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const active = getActiveBreakpoint(width);

  return (
    <Section aria-labelledby="breakpoints-heading">
      <Title id="breakpoints-heading">Breakpoints</Title>
      <Status aria-live="polite">
        Viewport width: {width}px · Active: {active}
      </Status>
      <Table>
        <caption className="sr-only">Breakpoint min-widths</caption>
        <thead>
          <tr>
            <Th scope="col">Name</Th>
            <Th scope="col">Min width</Th>
            <Th scope="col">Status</Th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(breakpointValues).map(([name, value]) => (
            <tr key={name}>
              <Td>{name}</Td>
              <Td>{value}px</Td>
              <Td>
                <Active $active={active === name}>
                  {active === name ? 'Active' : 'Inactive'}
                </Active>
              </Td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Table>
        <caption className="sr-only">Grid column configuration</caption>
        <thead>
          <tr>
            <Th scope="col">Viewport</Th>
            <Th scope="col">Columns</Th>
            <Th scope="col">Gutter</Th>
            <Th scope="col">Margin</Th>
          </tr>
        </thead>
        <tbody>
          {['mobile', 'tablet', 'desktop'].map((vp) => (
            <tr key={vp}>
              <Td>{vp}</Td>
              <Td>{grid.columns[vp]}</Td>
              <Td>{grid.gutter[vp]}</Td>
              <Td>{grid.margin[vp]}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Section>
  );
}

export default Breakpoints;
