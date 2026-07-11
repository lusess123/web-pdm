import { describe, expect, it } from 'vitest';

import { getEngGroup } from './util';

describe('getEngGroup', () => {
  it('splits camel-case labels without creating an empty group', () => {
    expect(getEngGroup('userProfile')).toEqual(['user', 'Profile']);
  });

  it('keeps a single word intact', () => {
    expect(getEngGroup('user')).toEqual(['user']);
  });

  it('splits consecutive uppercase letters consistently', () => {
    expect(getEngGroup('APIClient')).toEqual(['A', 'P', 'I', 'Client']);
  });
});
