type TValidationRule = {
  message: string;
  test: (value: string | null) => boolean;
};

export type TFormValidationErrors<T> = {
  [key in keyof T]?: string;
};

export const validationRules = () => {
  const rules: TValidationRule[] = [];

  const builder = {
    notEmpty: (message: string | null = null) => {
      rules.push({
        message: message ?? 'Field cannot be empty',
        test: (value: string | null) => !value || value.length === 0,
      });

      return builder;
    },
    email: (message: string | null = null) => {
      rules.push({
        message: message ?? 'Invalid email address',
        test: (value: string | null) =>
          !value ||
          !value.match(
            /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          ),
      });

      return builder;
    },
    noSpaces: (message: string | null = null) => {
      rules.push({
        message: message ?? 'Field cannot contain spaces',
        test: (value: string | null) => !value || value.includes(' '),
      });

      return builder;
    },
    minSize: (size: number, message: string | null = null) => {
      rules.push({
        message: message ?? `Minimum size should be ${size} characters`,
        test: (value: string | null) => !value || value.length < size,
      });

      return builder;
    },
    password: (message: string | null = null) => {
      rules.push({
        message:
          message ??
          'Password must contain latin letters, at least one uppercase letter, one lowercase letter and one number',
        test: (value: string | null) => !value || !value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]*$/),
      });

      return builder;
    },
    finalize: () => rules,
  };

  return builder;
};

export const checkRules = (value: string | null, rules: TValidationRule[]) => {
  for (let i = 0; i < rules.length; i += 1) {
    const testResult = rules[i].test(value);

    if (testResult) {
      return rules[i].message;
    }
  }

  return null;
};
