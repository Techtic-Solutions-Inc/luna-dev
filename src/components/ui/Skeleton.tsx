interface SkeletonProps {
  className?: string;
  'aria-label'?: string;
}

const Skeleton = ({
  className = '',
  'aria-label': ariaLabel = 'Loading content',
}: SkeletonProps) => (
  <div
    role="status"
    aria-label={ariaLabel}
    aria-busy="true"
    className={[
      'animate-pulse rounded-radius-12 bg-color-20',
      className,
    ].join(' ')}
  />
);

export default Skeleton;
