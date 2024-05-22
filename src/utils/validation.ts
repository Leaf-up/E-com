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
    maxSize: (size: number, message: string | null = null) => {
      rules.push({
        message: message ?? `Maximum size should be ${size} characters`,
        test: (value: string | null) => !value || value.length > size,
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
    date: (message: string | null = null) => {
      rules.push({
        message: message ?? 'Enter the correct date in the format mm.dd.yyyy',
        test: (value: string | null) =>
          !value || !value.match(/^(0[1-9]|1[012])[.](0[1-9]|[12][0-9]|3[01])[.](19|20)\d\d$/),
      });

      return builder;
    },
    minAge: (minAge: number, message: string | null = null) => {
      rules.push({
        message: message ?? `Minimum age must be ${minAge} years old`,
        test: (value: string | null) => {
          const birthday = value && new Date(value);
          const currentDate = new Date();
          const age = birthday && currentDate.getFullYear() - birthday.getFullYear();

          return (
            !value ||
            !age ||
            age < minAge ||
            (age === minAge &&
              (currentDate.getMonth() < birthday.getMonth() ||
                (currentDate.getMonth() === birthday.getMonth() && currentDate.getDate() < birthday.getDate())))
          );
        },
      });

      return builder;
    },
    onlyLetters: (message: string | null = null) => {
      rules.push({
        message: message ?? 'Field must contain only latin letters',
        test: (value: string | null) => !value || !value.match(/^[a-zA-Z]*$/),
      });

      return builder;
    },
    onlyNumbers: (message: string | null = null) => {
      rules.push({
        message: message ?? 'Field must contain only numbers',
        test: (value: string | null) => !value || !value.match(/^[\d]*$/),
      });

      return builder;
    },
    string: (message: string | null = null) => {
      rules.push({
        message: message ?? 'The field must contain at least one latin letter',
        test: (value: string | null) => !value || !value.match(/[a-zA-Z]+/),
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
