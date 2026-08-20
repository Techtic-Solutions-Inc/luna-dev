import { describe, expect, it } from 'vitest';
import {
  defaultGallery,
  emptyHomeForm,
  galleryFromSearch,
  normalizeHomeSearchItems,
  validateHomeForm,
} from '../src/lib/home';

describe('home helpers', () => {
  it('requires name, email, phone, and both policy checkboxes', () => {
    const errors = validateHomeForm(emptyHomeForm);
    expect(errors.first_name).toBe('First name is required');
    expect(errors.last_name).toBe('Last name is required');
    expect(errors.email).toBe('Email is required');
    expect(errors.phone).toBe('Phone number is required');
    expect(errors.privacy_policy).toBe('Please accept the Privacy Policy');
    expect(errors.terms_of_service).toBe('Please accept the Terms of Service');
  });

  it('rejects invalid email and phone values', () => {
    const errors = validateHomeForm({
      ...emptyHomeForm,
      first_name: 'Ava',
      last_name: 'Sterling',
      email: 'not-an-email',
      phone: '123',
      privacy_policy: true,
      terms_of_service: true,
    });
    expect(errors.email).toBe('Enter a valid email');
    expect(errors.phone).toBe('Enter a valid phone number');
  });

  it('accepts a complete waitlist form', () => {
    const errors = validateHomeForm({
      ...emptyHomeForm,
      first_name: 'Ava',
      last_name: 'Sterling',
      email: 'ava@agentwise.com',
      phone: '512-555-0142',
      privacy_policy: true,
      terms_of_service: true,
    });
    expect(errors).toEqual({});
  });

  it('normalizes search envelopes into gallery cards', () => {
    const items = normalizeHomeSearchItems({
      message: 'ok',
      data: {
        items: [
          {
            id: 't1',
            title: 'Just listed',
            description: 'Neighborhood showing post',
            image: '/assets/figma/content-library.png',
          },
        ],
      },
    });
    expect(items).toHaveLength(1);
    expect(items[0]?.title).toBe('Just listed');
    expect(galleryFromSearch(items)[0]?.caption).toBe('Just listed');
  });

  it('returns an empty list for unknown search payloads', () => {
    expect(normalizeHomeSearchItems({})).toEqual([]);
    expect(defaultGallery.length).toBeGreaterThan(0);
  });
});
