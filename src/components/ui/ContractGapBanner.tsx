interface ContractGapBannerProps {
  message: string;
}

const ContractGapBanner = ({ message }: ContractGapBannerProps) => (
  <div
    role="alert"
    aria-live="polite"
    className="mb-4 rounded-lg border border-warning/60 bg-warning/20 px-4 py-3 text-sm text-color-20"
  >
    {message}
  </div>
);

export default ContractGapBanner;
