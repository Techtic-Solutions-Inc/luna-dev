import { type FormEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { updateProfile } from '../../lib/api/client';
import { getApiErrorMessage } from '../../lib/api/errors';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Button from '../ui/Button';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Spinner from '../Spinner';
import ErrorBoundary from '../ErrorBoundary';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: var(--gap-16);
  max-width: 32rem;
`;

const Title = styled.h2`
  font-family: var(--font-heading-md-21-family);
  font-size: var(--font-heading-md-21-size);
  font-weight: var(--font-heading-md-21-weight);
  line-height: var(--font-heading-md-21-line-height);
  margin-bottom: var(--gap-8);
  color: var(--text-primary);
`;

const StatusMessage = styled.p<{ $variant: 'error' | 'success' | 'empty' }>`
  padding: var(--padding-12);
  border-radius: var(--radius-6);
  font-family: var(--font-body-sm-2-family);
  font-size: var(--font-body-sm-2-size);
  font-weight: var(--font-body-sm-2-weight);
  line-height: var(--font-body-sm-2-line-height);

  ${({ $variant }) => {
    if ($variant === 'error') {
      return `
        background: var(--color-29);
        border: 1px solid var(--border);
        color: var(--color-53);
      `;
    }
    if ($variant === 'success') {
      return `
        background: var(--color-37);
        border: 1px solid var(--color-17);
        color: var(--color-64);
      `;
    }
    return `
      background: var(--color-38);
      color: var(--text-secondary);
    `;
  }}
`;

const EmailDisplay = styled.p`
  color: var(--text-secondary);
  margin-bottom: var(--gap-8);
`;

const ProfileFormContent = () => {
  const { data, isLoading, error, isEmpty, refetch } = useCurrentUser();
  const [bio, setBio] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (data?.profile?.bio && typeof data.profile.bio === 'string') {
      setBio(data.profile.bio);
    }
  }, [data]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      await updateProfile({ bio });
      setSuccessMessage('Profile updated successfully.');
      await refetch();
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, 'Failed to update profile'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <Spinner label="Loading profile..." />;
  }

  if (error) {
    return (
      <StatusMessage $variant="error" role="alert">
        {error}
      </StatusMessage>
    );
  }

  if (isEmpty) {
    return (
      <StatusMessage $variant="empty" role="status">
        No profile data is available.
      </StatusMessage>
    );
  }

  return (
    <Card aria-labelledby="profile-form-title">
      <Title id="profile-form-title">Profile settings</Title>
      {data?.email ? (
        <EmailDisplay>Signed in as {data.email}</EmailDisplay>
      ) : null}
      <Form onSubmit={handleSubmit} noValidate>
        <Input
          label="Bio"
          name="bio"
          value={bio}
          onChange={(event) => setBio(event.target.value)}
          placeholder="Tell us about yourself"
          disabled={isSubmitting}
        />
        {submitError ? (
          <StatusMessage $variant="error" role="alert">
            {submitError}
          </StatusMessage>
        ) : null}
        {successMessage ? (
          <StatusMessage $variant="success" role="status">
            {successMessage}
          </StatusMessage>
        ) : null}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save profile'}
        </Button>
      </Form>
    </Card>
  );
};

const ProfileForm = () => (
  <ErrorBoundary>
    <ProfileFormContent />
  </ErrorBoundary>
);

export default ProfileForm;
