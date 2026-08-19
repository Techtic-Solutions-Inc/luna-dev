import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiSearch, FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi2';
import type { DashboardAnnouncement } from '../../../types/dashboard';
import { getGreeting } from './dashboardUtils';

const Section = styled.section`
  margin-bottom: 32px;
`;

const Greeting = styled.h1`
  font-family: 'EB Garamond', serif;
  font-size: 32px;
  font-weight: 500;
  line-height: 41.76px;
  color: #ffffff;
  margin: 0 0 20px;
`;

const BannerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 340px;
  gap: 24px;
  background: linear-gradient(135deg, #2f271f 0%, #1a1a19 100%);
  border-radius: 16px;
  padding: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Headline = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  color: #c8a47e;
  margin: 0;
`;

const Description = styled.p`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22px;
  color: #959595;
  margin: 0;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: #2f271f;
  border: 1px solid #383838;
  border-radius: 10px;
  padding: 12px 16px;
  margin-top: 4px;
`;

const SearchInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: #e0e0e0;
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 15.624px;
  outline: none;

  &::placeholder {
    color: #959595;
  }

  &:focus {
    outline: none;
  }
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const PlanButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #c8a47e;
  color: #1a1a19;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const CalendarButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: #383838;
  color: #e0e0e0;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  font-family: 'Almarai', sans-serif;
  font-size: 13px;
  font-weight: 400;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background: #444444;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const AnnouncementHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AnnouncementLabel = styled.span`
  font-family: 'Almarai', sans-serif;
  font-size: 14px;
  font-weight: 400;
  color: #e0e0e0;
`;

const NavButtons = styled.div`
  display: flex;
  gap: 4px;
`;

const NavBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: 1px solid #383838;
  background: transparent;
  color: #959595;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: #c8a47e;
  }

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: -2px;
  }

  svg {
    width: 14px;
    height: 14px;
  }
`;

const AnnouncementCard = styled.div`
  background: #232323;
  border-radius: 12px;
  overflow: hidden;
  height: 160px;
`;

const AnnouncementImage = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #2f271f 0%, #473e33 100%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AnnouncementImagePlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: rgba(200, 164, 126, 0.15);
`;

const Dots = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  margin-top: 4px;
`;

const Dot = styled.button<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: none;
  background: ${({ $active }) => ($active ? '#c8a47e' : '#383838')};
  cursor: pointer;
  padding: 0;
  transition: background-color 0.15s ease;

  &:focus-visible {
    outline: 2px solid #c8a47e;
    outline-offset: 2px;
  }
`;

interface GreetingBannerProps {
  firstName: string;
  announcements: DashboardAnnouncement[];
}

const GreetingBanner: React.FC<GreetingBannerProps> = ({ firstName, announcements }) => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = Math.max(announcements.length, 1);

  const goNext = () => setActiveSlide((prev) => (prev + 1) % totalSlides);
  const goPrev = () => setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const currentAnnouncement = announcements.length > 0 ? announcements[activeSlide] : null;

  return (
    <Section aria-label="Dashboard greeting">
      <Greeting>
        {getGreeting()}, {firstName}.
      </Greeting>
      <BannerWrapper>
        <LeftContent>
          {currentAnnouncement ? (
            <>
              <Headline>{currentAnnouncement.announcement_title}</Headline>
              <Description>{currentAnnouncement.announcement_content}</Description>
            </>
          ) : (
            <Description>Welcome to your dashboard. You have no new announcements.</Description>
          )}
          <SearchBar>
            <FiSearch size={16} color="#959595" aria-hidden="true" />
            <SearchInput
              type="search"
              placeholder="Generate captions, listing descriptions, email blasts, and Reels scripts in your brand voice."
              aria-label="Search or generate content"
            />
          </SearchBar>
          <ActionRow>
            <PlanButton type="button" aria-label="Plan my week">
              <HiOutlineSparkles />
              Plan My Week
            </PlanButton>
            <CalendarButton
              type="button"
              aria-label="Open content calendar"
              onClick={() => navigate('/content-calendar')}
            >
              <FiCalendar />
              My Content Calendar
            </CalendarButton>
          </ActionRow>
        </LeftContent>
        <RightPanel>
          <AnnouncementHeader>
            <AnnouncementLabel>Announcements</AnnouncementLabel>
            <NavButtons>
              <NavBtn onClick={goPrev} aria-label="Previous announcement" type="button">
                <FiChevronLeft />
              </NavBtn>
              <NavBtn onClick={goNext} aria-label="Next announcement" type="button">
                <FiChevronRight />
              </NavBtn>
            </NavButtons>
          </AnnouncementHeader>
          <AnnouncementCard>
            <AnnouncementImage>
              <AnnouncementImagePlaceholder />
            </AnnouncementImage>
          </AnnouncementCard>
          {announcements.length > 1 && (
            <Dots>
              {announcements.slice(0, 5).map((_, i) => (
                <Dot
                  key={i}
                  $active={i === activeSlide}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Go to announcement ${i + 1}`}
                  type="button"
                />
              ))}
            </Dots>
          )}
        </RightPanel>
      </BannerWrapper>
    </Section>
  );
};

export default GreetingBanner;
