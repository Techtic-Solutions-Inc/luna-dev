import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiGrid, FiFolder, FiCalendar, FiZap, FiStar, FiCreditCard, FiLogOut, FiChevronRight, FiUser, FiBell } from 'react-icons/fi';

const SidebarContainer = styled.nav`
  width: 176px;
  min-width: 176px;
  min-height: 100vh;
  background-color: #1a1a19;
  display: flex;
  flex-direction: column;
  padding: 24px 0 16px;
  overflow-y: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Logo = styled.div`
  padding: 0 20px 24px;
  font-family: 'Kalam', cursive;
  font-size: 22px;
  font-weight: 700;
  color: #c8a47e;
  cursor: pointer;
`;

const LogoSub = styled.span`
  display: block;
  font-family: 'Almarai', sans-serif;
  font-size: 7px;
  font-weight: 400;
  color: #c8a47e;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-top: -2px;
`;

const SectionLabel = styled.div`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #959595;
  padding: 16px 20px 6px;
  text-transform: capitalize;
`;

const NavItem = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  width: calc(100% - 12px);
  margin: 1px 6px;
  padding: 9px 14px;
  border: none;
  border-radius: 8px;
  background: ${({ $active }) => ($active ? '#c8a47e' : 'transparent')};
  color: ${({ $active }) => ($active ? '#1a1a19' : '#e0e0e0')};
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  text-align: left;
  transition: background-color 0.15s ease;

  &:hover {
    background: ${({ $active }) => ($active ? '#c8a47e' : 'rgba(200, 164, 126, 0.12)')};
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: -2px;
  }

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

const CreditBox = styled.div`
  margin: 0 12px 12px;
  padding: 12px;
  background: #232323;
  border-radius: 10px;
`;

const CreditTitle = styled.div`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #959595;
  margin-bottom: 4px;
`;

const CreditRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const CreditLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #e0e0e0;
`;

const CreditValue = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #e0e0e0;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 4px;
  background: #383838;
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressFill = styled.div<{ $percent: number }>`
  width: ${({ $percent }) => $percent}%;
  height: 100%;
  background: #c8a47e;
  border-radius: 2px;
  transition: width 0.3s ease;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background: rgba(200, 164, 126, 0.08);
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #c8a47e;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1a1a19;
  font-size: 14px;
`;

const UserName = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  color: #e0e0e0;
  flex: 1;
`;

const LogoutItem = styled(NavItem)`
  margin-top: 4px;
`;

interface SidebarProps {
  userName?: string;
  aiCreditsUsed?: number;
  aiCreditsTotal?: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  userName = 'Joseph Stanley',
  aiCreditsUsed = 1420,
  aiCreditsTotal = 5000,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const creditPercent = aiCreditsTotal > 0 ? (aiCreditsUsed / aiCreditsTotal) * 100 : 0;

  const isActive = (path: string) => location.pathname === path;

  const handleNav = (path: string) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <SidebarContainer aria-label="Main navigation">
      <Logo onClick={() => handleNav('/')}>
        Agentwise
        <LogoSub>Real Estate Marketing</LogoSub>
      </Logo>

      <SectionLabel>Studio</SectionLabel>
      <NavItem $active={isActive('/dashboard')} onClick={() => handleNav('/dashboard')} aria-current={isActive('/dashboard') ? 'page' : undefined}>
        <FiGrid />
        Overview
      </NavItem>
      <NavItem $active={isActive('/content-library')} onClick={() => handleNav('/content-library')} aria-current={isActive('/content-library') ? 'page' : undefined}>
        <FiFolder />
        Content Library
      </NavItem>
      <NavItem $active={isActive('/content-calendar')} onClick={() => handleNav('/content-calendar')} aria-current={isActive('/content-calendar') ? 'page' : undefined}>
        <FiCalendar />
        Content Calendar
      </NavItem>

      <SectionLabel>Tools</SectionLabel>
      <NavItem $active={isActive('/ultimate-mind')} onClick={() => handleNav('/ultimate-mind')} aria-current={isActive('/ultimate-mind') ? 'page' : undefined}>
        <FiZap />
        Ultimate Mind
      </NavItem>

      <SectionLabel>Account</SectionLabel>
      <NavItem $active={isActive('/announcements')} onClick={() => handleNav('/announcements')} aria-current={isActive('/announcements') ? 'page' : undefined}>
        <FiBell />
        Announcements
      </NavItem>
      <NavItem $active={isActive('/new-features')} onClick={() => handleNav('/new-features')} aria-current={isActive('/new-features') ? 'page' : undefined}>
        <FiStar />
        New Features
      </NavItem>
      <NavItem $active={isActive('/subscription')} onClick={() => handleNav('/subscription')} aria-current={isActive('/subscription') ? 'page' : undefined}>
        <FiCreditCard />
        Subscription
      </NavItem>

      <Spacer />

      <CreditBox>
        <CreditTitle>AI Credit Usage</CreditTitle>
        <CreditRow>
          <CreditLabel>Current</CreditLabel>
          <CreditValue>{aiCreditsUsed.toLocaleString()} / {aiCreditsTotal.toLocaleString()}</CreditValue>
        </CreditRow>
        <ProgressBar>
          <ProgressFill $percent={creditPercent} />
        </ProgressBar>
      </CreditBox>

      <UserSection onClick={() => handleNav('/profile')}>
        <UserAvatar aria-hidden="true">
          <FiUser size={14} />
        </UserAvatar>
        <UserName>{userName}</UserName>
        <FiChevronRight size={14} color="#959595" />
      </UserSection>

      <LogoutItem onClick={handleLogout}>
        <FiLogOut />
        Logout
      </LogoutItem>
    </SidebarContainer>
  );
};

export default Sidebar;
