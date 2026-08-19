import styled from 'styled-components';

export const AuthInput = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #ffffff;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid ${(p) => (p.$hasError ? '#ff2f2f' : 'rgba(255, 255, 255, 0.15)')};
  border-radius: 10px;
  outline: none;
  transition: border-color 0.2s;

  &::placeholder {
    color: rgba(255, 255, 255, 0.35);
  }

  &:focus {
    border-color: ${(p) => (p.$hasError ? '#ff2f2f' : 'var(--accent)')};
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px var(--accent);
  }
`;

export const AuthErrorText = styled.span`
  display: block;
  font-family: 'Almarai', sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #ff2f2f;
  margin-top: 4px;
`;

export const AuthSubmitButton = styled.button<{ $loading?: boolean }>`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #ffffff;
  background: var(--accent);
  border: none;
  border-radius: 10px;
  cursor: ${(p) => (p.$loading ? 'not-allowed' : 'pointer')};
  opacity: ${(p) => (p.$loading ? 0.7 : 1)};
  transition: opacity 0.2s;

  &:hover:not(:disabled) {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const PasswordToggle = styled.button`
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export const EyeIcon = ({ open }: { open: boolean }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    {open ? (
      <>
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
        <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
        <line x1="1" y1="1" x2="23" y2="23" />
      </>
    )}
  </svg>
);

export const HiddenCheckbox = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

export const CheckboxBox = styled.span<{ $checked: boolean; $hasError?: boolean }>`
  width: 18px;
  height: 18px;
  min-width: 18px;
  border: 1.5px solid ${(p) => (p.$hasError ? '#ff2f2f' : p.$checked ? 'var(--accent)' : 'rgba(255, 255, 255, 0.3)')};
  border-radius: 4px;
  background: ${(p) => (p.$checked ? 'var(--accent)' : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s, border-color 0.15s;
  margin-top: 1px;

  ${HiddenCheckbox}:focus-visible + & {
    outline: 2px solid var(--accent);
    outline-offset: 2px;
  }
`;

export const CheckIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AuthApiError = styled.div`
  width: 100%;
  padding: 12px 16px;
  margin-top: 12px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #ff2f2f;
  background: rgba(255, 47, 47, 0.08);
  border-radius: 8px;
  text-align: center;
`;
