import { Link } from 'react-router-dom';
import { useState, type FormEvent } from 'react';
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTiktok,
  FaXTwitter,
} from 'react-icons/fa6';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import StepCard from '../components/features/StepCard';
import ContentLibrary from '../components/features/ContentLibrary';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import InputField from '../components/ui/InputField';
import Checkbox from '../components/ui/Checkbox';
import Skeleton from '../components/ui/Skeleton';

const HERO_DASHBOARD =
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop';

const STEPS = [
  {
    stepNumber: 1,
    title: 'Browse the continuously updated collection.',
    description:
      'Explore hundreds of hand-designed templates for social, email, and more. Save the ones that fit your style.',
    imageSrc:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=700&h=450&fit=crop',
    imageAlt: 'Content library grid showing marketing templates',
  },
  {
    stepNumber: 2,
    title: 'We personalize it to your business and market.',
    description:
      'Help real estate professionals create content faster with ready-made templates. Our AI adapts every template to your brand, voice, and local market.',
    imageSrc:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=450&fit=crop',
    imageAlt: 'Personalization interface with branding options',
    reversed: true,
  },
  {
    stepNumber: 3,
    title: 'Post, attract, engage, and stand out.',
    description:
      'Increase audience engagement through visually appealing social media posts. Download your finished content and share it anywhere.',
    imageSrc:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&h=450&fit=crop',
    imageAlt: 'Mobile preview of a social media post',
  },
];

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Monica Erickson',
    role: 'Sales Representative',
    text: 'Agentwise transformed how I market my listings. The templates are gorgeous and the personalization is spot-on every time.',
    rating: 5,
  },
  {
    id: '2',
    name: 'James Whitfield',
    role: 'Broker Associate',
    text: "I used to spend hours on social media content. Now I create a week's worth of posts in under 30 minutes.",
    rating: 5,
  },
  {
    id: '3',
    name: 'Sarah Chen',
    role: 'Luxury Agent',
    text: 'The quality of content is unmatched. My engagement has tripled since I started using Agentwise.',
    rating: 5,
  },
  {
    id: '4',
    name: 'David Martinez',
    role: 'Team Lead',
    text: 'Our entire team uses Agentwise. It keeps our brand consistent and saves us countless hours every week.',
    rating: 5,
  },
];

const socialIcons = [
  { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com', color: 'bg-color-13' },
  {
    icon: FaInstagram,
    label: 'Instagram',
    href: 'https://instagram.com',
    color: 'bg-gradient-to-br from-color-26 to-color-90',
  },
  { icon: FaTiktok, label: 'TikTok', href: 'https://tiktok.com', color: 'bg-color-16' },
  { icon: FaXTwitter, label: 'X (Twitter)', href: 'https://x.com', color: 'bg-color-16' },
  { icon: FaLinkedinIn, label: 'LinkedIn', href: 'https://linkedin.com', color: 'bg-color-13' },
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  experience: string;
  goal: string;
  message: string;
  privacyPolicy: boolean;
  termsOfService: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  privacyPolicy?: string;
  termsOfService?: string;
  form?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[\d\s\-+().]{7,20}$/;

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = 'First name is required.';
  }
  if (!data.lastName.trim()) {
    errors.lastName = 'Last name is required.';
  }
  if (!data.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (data.phone.trim() && !PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!data.privacyPolicy) {
    errors.privacyPolicy = 'You must accept the Privacy Policy.';
  }
  if (!data.termsOfService) {
    errors.termsOfService = 'You must accept the Terms of Service.';
  }

  return errors;
};

const StepsSkeleton = () => (
  <div className="flex flex-col gap-gap-50" aria-busy="true" aria-label="Loading steps">
    {Array.from({ length: 3 }).map((_, i) => (
      <div key={i} className="flex flex-col tablet:flex-row gap-gap-32">
        <div className="flex-1 flex flex-col gap-gap-16">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-12 w-full max-w-md" />
          <Skeleton className="h-20 w-full max-w-lg" />
        </div>
        <Skeleton className="flex-1 h-64 tablet:h-80 rounded-radius-16" />
      </div>
    ))}
  </div>
);

const Home = () => {
  const [stepsLoaded] = useState(true);
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experience: '',
    goal: '',
    message: '',
    privacyPolicy: false,
    termsOfService: false,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = validateForm(formData);
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    setFormState('submitting');

    // UI-only submission — visitor subscribe endpoint is not in the API contract
    window.setTimeout(() => {
      setFormState('success');
    }, 800);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
    setFormErrors((prev) => ({ ...prev, [name]: undefined, form: undefined }));
  };

  return (
    <div className="min-h-screen bg-color-23 text-secondary">
      <Header />

      {/* Hero Section */}
      <section
        className="relative pt-[100px] pb-padding-60 px-padding-16 tablet:px-padding-40 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div
          className="absolute inset-0 opacity-30 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 70% 30%, #7200ff33 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #c8a47e22 0%, transparent 50%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-[1440px]">
          <div className="flex flex-col desktop:flex-row desktop:items-center gap-gap-40 desktop:gap-gap-60">
            <div className="flex-1 flex flex-col gap-gap-24">
              <h1
                id="hero-heading"
                className="font-garamond text-[42px] leading-[1.15] tablet:text-heading-xl-45 text-secondary text-balance"
              >
                Stunning Real Estate Marketing,{' '}
                <span className="text-accent">Personalized To Your Market</span> In Minutes
              </h1>
              <p className="font-almarai text-body-34 text-color-14 max-w-xl">
                The all-in-one marketing platform for residential real estate agents — AI-personalized
                content, a custom business dashboard, and a strategic AI advisor that knows your market.
              </p>

              <div className="flex items-center gap-gap-12" role="list" aria-label="Social media links">
                {socialIcons.map(({ icon: Icon, label, href, color }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    role="listitem"
                    aria-label={label}
                    className={[
                      'flex h-10 w-10 items-center justify-center rounded-full text-secondary',
                      'hover:opacity-80 active:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-opacity',
                      color,
                    ].join(' ')}
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex-1 relative">
              <Card
                variant="elevated"
                className="shadow-drop-shadow-18 rounded-radius-20 overflow-hidden"
              >
                <img
                  src={HERO_DASHBOARD}
                  alt="Agentwise dashboard showing content library and calendar"
                  className="w-full h-auto"
                  loading="eager"
                />
              </Card>
            </div>
          </div>

          <div className="mt-gap-60 text-center flex flex-col items-center gap-gap-24">
            <p className="font-almarai text-body-34 text-color-14">
              Join{' '}
              <span className="text-accent font-bold">Hundreds</span> of other agents on the
              waitlist for Agentwise
            </p>
            <Link to="/signup">
              <Button size="lg" aria-label="Get started with Agentwise">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Content Library Section */}
      <ContentLibrary />

      {/* Three Steps Section */}
      <section
        className="relative py-padding-60 px-padding-16 tablet:px-padding-32 desktop:px-padding-40 overflow-hidden"
        aria-labelledby="steps-heading"
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#ffffff08 1px, transparent 1px), linear-gradient(90deg, #ffffff08 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        <div className="relative mx-auto max-w-[1440px]">
          <h2
            id="steps-heading"
            className="font-garamond text-[32px] tablet:text-heading-xl-37 text-secondary text-center mb-gap-50 text-balance capitalize"
          >
            Stunning marketing, in three simple steps
          </h2>

          {!stepsLoaded ? (
            <StepsSkeleton />
          ) : (
            <div className="flex flex-col gap-gap-50">
              {STEPS.map((step) => (
                <StepCard key={step.stepNumber} {...step} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Ultimate Mind Section */}
      <section
        className="py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="ultimate-mind-heading"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col desktop:flex-row gap-gap-32 rounded-radius-20 overflow-hidden">
            <Card className="flex-1 bg-color-69 p-padding-32 tablet:p-padding-40">
              <div className="flex flex-col gap-gap-24">
                <h3 className="font-garamond text-heading-lg-26 text-secondary">
                  Agentwise Ultimate Mind
                </h3>
                <p className="font-almarai text-body-34 text-color-14">
                  Your strategic AI advisor that understands your market, tracks trends, and
                  helps you make smarter marketing decisions every day.
                </p>
                <img
                  src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=350&fit=crop"
                  alt="Agentwise Ultimate Mind interface"
                  className="w-full rounded-radius-12 shadow-drop-shadow-39"
                  loading="lazy"
                />
              </div>
            </Card>

            <div className="flex-1 flex flex-col justify-center gap-gap-24 bg-color-45 p-padding-32 tablet:p-padding-40 rounded-radius-20">
              <h3
                id="ultimate-mind-heading"
                className="font-garamond text-heading-xl-37 text-secondary text-balance"
              >
                Here&apos;s The Deal...{' '}
                <span className="text-accent">Great Marketing Is Just The Start.</span>
              </h3>
              <p className="font-almarai text-body-34 text-color-14">
                Agentwise helps you build and personalize a brand for your real estate career.
                Our AI learns your market, your brand, and your goals — then delivers a complete
                marketing strategy tailored to you.
              </p>
              <div>
                <Button variant="primary" size="md" aria-label="Learn more about Ultimate Mind">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className="bg-color-50 py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="testimonials-heading"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col desktop:flex-row gap-gap-40">
            <div className="desktop:w-1/3 flex flex-col gap-gap-24">
              <h2
                id="testimonials-heading"
                className="font-garamond text-heading-xl-37 text-color-16 text-balance"
              >
                Built For{' '}
                <span className="text-accent">Agents Like You.</span>
              </h2>
              <p className="font-almarai text-body-34 text-color-14">
                Join thousands of real estate professionals who trust Agentwise to elevate their
                marketing and grow their business.
              </p>
            </div>

            <div
              className="desktop:w-2/3 columns-1 tablet:columns-2 gap-gap-24"
              role="list"
              aria-label="Customer testimonials"
            >
              {TESTIMONIALS.map((testimonial) => (
                <Card
                  key={testimonial.id}
                  role="listitem"
                  className="break-inside-avoid mb-gap-24 p-padding-24 bg-secondary shadow-drop-shadow-40"
                >
                  <div
                    className="flex gap-1 mb-gap-12"
                    aria-label={`${testimonial.rating} out of 5 stars`}
                  >
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <span key={i} className="text-accent" aria-hidden="true">
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="font-almarai text-body-15 text-color-16 mb-gap-16">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <footer>
                    <p className="font-almarai text-body-115 text-color-16">{testimonial.name}</p>
                    <p className="font-almarai text-body-sm-106 text-color-14">{testimonial.role}</p>
                  </footer>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-padding-60 px-padding-16 tablet:px-padding-40"
        aria-labelledby="contact-heading"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col desktop:flex-row gap-gap-32">
            <div className="flex-1 relative rounded-radius-20 overflow-hidden min-h-[400px]">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=800&fit=crop"
                alt="Real estate agent on a phone call"
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-color-16/90 via-color-16/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-padding-32">
                <p className="font-garamond text-heading-lg-26 text-secondary leading-tight">
                  EVERYONE&apos;S WAITING
                  <br />
                  to buy until
                  <br />
                  &apos;the market is right&apos;
                </p>
              </div>
            </div>

            <Card className="flex-1 p-padding-32 tablet:p-padding-40 bg-color-37">
              <h2
                id="contact-heading"
                className="font-garamond text-heading-xl-37 text-secondary mb-gap-32"
              >
                Let&apos;s Work Together
              </h2>

              {formState === 'success' ? (
                <div role="status" className="text-center py-padding-40">
                  <p className="font-garamond text-heading-lg-26 text-accent mb-gap-16">
                    Thank you!
                  </p>
                  <p className="font-almarai text-body-34 text-color-14">
                    We&apos;ve received your message and will be in touch soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-gap-16"
                  noValidate
                >
                  <div className="grid grid-cols-1 tablet:grid-cols-2 gap-gap-16">
                    <InputField
                      label="First Name"
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      required
                      hideLabel
                      value={formData.firstName}
                      onChange={handleInputChange}
                      error={formErrors.firstName}
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      required
                      hideLabel
                      value={formData.lastName}
                      onChange={handleInputChange}
                      error={formErrors.lastName}
                    />
                  </div>

                  <InputField
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                    hideLabel
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={formErrors.email}
                  />

                  <InputField
                    label="Phone number"
                    name="phone"
                    type="tel"
                    placeholder="Phone number"
                    hideLabel
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={formErrors.phone}
                  />

                  <InputField
                    label="How long have you been an Agent?"
                    name="experience"
                    type="text"
                    placeholder="How long have you been an Agent?"
                    hideLabel
                    value={formData.experience}
                    onChange={handleInputChange}
                  />

                  <InputField
                    label="What do you want to do for marketing and real estate?"
                    name="goal"
                    type="text"
                    placeholder="What do you want to do for marketing and real estate?"
                    hideLabel
                    value={formData.goal}
                    onChange={handleInputChange}
                  />

                  <div className="flex flex-col gap-gap-4">
                    <label htmlFor="message" className="sr-only">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      rows={4}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full rounded-radius-10 border border-color-20 bg-color-16 px-padding-16 py-padding-12 font-almarai text-body-77 text-secondary placeholder:text-color-14 hover:border-color-14 focus:border-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors resize-none"
                    />
                  </div>

                  <Checkbox
                    name="privacyPolicy"
                    checked={formData.privacyPolicy}
                    onChange={handleCheckboxChange}
                    error={formErrors.privacyPolicy}
                    label={
                      <>
                        I agree to the{' '}
                        <a
                          href="#privacy"
                          className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Privacy Policy
                        </a>
                      </>
                    }
                  />

                  <Checkbox
                    name="termsOfService"
                    checked={formData.termsOfService}
                    onChange={handleCheckboxChange}
                    error={formErrors.termsOfService}
                    label={
                      <>
                        I agree to the{' '}
                        <a
                          href="#terms"
                          className="text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                        >
                          Terms of Service
                        </a>
                      </>
                    }
                  />

                  {formState === 'error' && formErrors.form && (
                    <p role="alert" className="font-almarai text-body-sm-106 text-color-46">
                      {formErrors.form}
                    </p>
                  )}

                  <Button
                    type="submit"
                    variant="outline"
                    size="lg"
                    fullWidth
                    disabled={formState === 'submitting'}
                    aria-label="Join the waitlist"
                  >
                    {formState === 'submitting' ? 'Submitting...' : 'Join the waitlist now'}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
