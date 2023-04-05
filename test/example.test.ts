import {describe, expect, test} from '@jest/globals';

import { add } from "../src";

describe('Add function', () => {
  test('should properly sum 4+5=9', () => {
    expect(add(4, 5)).toEqual(9);
  });
});