import styled from 'styled-components';
import type { AboutTeamMember } from '../../types/api';
import Card from '../ui/Card';

interface TeamMembersListProps {
  members: AboutTeamMember[];
}

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--gap-24);
`;

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: var(--gap-20);
  margin: 0;
  padding: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const MemberCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: var(--gap-12);
  padding: var(--padding-16);
  background: var(--secondary);
`;

const ImageFrame = styled.div`
  aspect-ratio: 1 / 1;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-10);
  background: var(--color-48);
`;

const MemberImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const MemberName = styled.h3`
  font-family: var(--font-heading-md-84-family);
  font-size: var(--font-heading-md-84-size);
  font-weight: var(--font-heading-md-84-weight);
  line-height: var(--font-heading-md-84-line-height);
  color: var(--color-20);
`;

const MemberRole = styled.p`
  font-family: var(--font-body-sm-94-family);
  font-size: var(--font-body-sm-94-size);
  font-weight: var(--font-body-sm-94-weight);
  line-height: var(--font-body-sm-94-line-height);
  color: var(--text-secondary);
`;

const EmptyState = styled.p`
  padding: var(--padding-24);
  border-radius: var(--radius-10);
  background: var(--color-38);
  color: var(--text-secondary);
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
  font-weight: var(--font-body-sm-2-weight);
  line-height: var(--font-body-sm-2-line-height);
`;

const TeamMembersList = ({ members }: TeamMembersListProps) => {
  if (members.length === 0) {
    return (
      <Section aria-labelledby="meet-our-team">
        <EmptyState role="status">
          No team members are available at this time.
        </EmptyState>
      </Section>
    );
  }

  return (
    <Section aria-labelledby="meet-our-team">
      <Grid>
        {members.map((member) => (
          <li key={member.id}>
            <MemberCard as="article">
              <ImageFrame>
                <MemberImage
                  src={member.image_url}
                  alt={`${member.name}, ${member.role}`}
                  loading="lazy"
                />
              </ImageFrame>
              <MemberName>{member.name}</MemberName>
              <MemberRole>{member.role}</MemberRole>
            </MemberCard>
          </li>
        ))}
      </Grid>
    </Section>
  );
};

export default TeamMembersList;
