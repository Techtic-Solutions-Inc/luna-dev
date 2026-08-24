import React from 'react';
import { useDashboardData } from '../hooks/useDashboardData';
import { NavigationMenu, AccountInfo, Announcements, NewFeatures, SubscriptionDetails } from '../components';
import { Spinner, ErrorMessage } from '../components/common';

const Dashboard: React.FC = () => {
  const { data, isLoading, isError, error } = useDashboardData();

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={error.message} />;

  return (
    <div style={{ backgroundColor: '#0B0B0B', color: '#FFFFFF', padding: '30px' }}>
      <NavigationMenu items={data.menuItems} activeItem={data.activeItem} />
      <AccountInfo userName={data.userName} accountStatus={data.accountStatus} />
      <Announcements announcements={data.announcements} />
      <NewFeatures features={data.newFeatures} />
      <SubscriptionDetails subscriptionType={data.subscriptionType} renewalDate={data.renewalDate} />
    </div>
  );
};

export default Dashboard;