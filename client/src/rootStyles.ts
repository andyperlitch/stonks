export const rootStyles = {
  '@global': {
    ':root': {
      '--background-color':
        'linear-gradient(180deg, rgba(34,6,50,1) 0%, rgba(33,9,89,1) 82%, rgba(30,28,112,1) 100%)', //background color of the app
      '--color-primary': '#3962c0',
      '--color-primary-rgb': '57,98,192',
      '--color-primary-contrast': '#ffffff',
      '--color-primary-contrast-rgb': '255,255,255',
      '--color-primary-shade': '#3256a9',
      '--color-primary-tint': '#4d72c6',

      '--color-secondary': '#e1c62d',
      '--color-secondary-rgb': '61,194,255',
      '--color-secondary-contrast': '#ffffff',
      '--color-secondary-contrast-rgb': '255,255,255',
      '--color-secondary-shade': '#36abe0',
      '--color-secondary-tint': '#50c8ff',

      '--color-tertiary': '#a3f5f3',
      '--color-tertiary-rgb': '163,245,243',
      '--color-tertiary-contrast': '#000000',
      '--color-tertiary-contrast-rgb': '0,0,0',
      '--color-tertiary-shade': '#8fd8d6',
      '--color-tertiary-tint': '#acf6f4',

      '--color-success': '#24b25d',
      '--color-success-rgb': '36,178,93',
      '--color-success-contrast': '#ffffff',
      '--color-success-contrast-rgb': '255,255,255',
      '--color-success-shade': '#209d52',
      '--color-success-tint': '#3aba6d',

      '--color-warning': '#df910c',
      '--color-warning-rgb': '223,145,12',
      '--color-warning-contrast': '#000000',
      '--color-warning-contrast-rgb': '0,0,0',
      '--color-warning-shade': '#c4800b',
      '--color-warning-tint': '#e29c24',

      '--color-danger': '#e23636',
      '--color-danger-rgb': '226,54,54',
      '--color-danger-contrast': '#ffffff',
      '--color-danger-contrast-rgb': '255,255,255',
      '--color-danger-shade': '#c73030',
      '--color-danger-tint': '#e54a4a',

      '--color-dark': '#222428',
      '--color-dark-rgb': '34,36,40',
      '--color-dark-contrast': '#ffffff',
      '--color-dark-contrast-rgb': '255,255,255',
      '--color-dark-shade': '#1e2023',
      '--color-dark-tint': '#383a3e',

      '--color-medium': '#92949c',
      '--color-medium-rgb': '146,148,156',
      '--color-medium-contrast': '#ffffff',
      '--color-medium-contrast-rgb': '255,255,255',
      '--color-medium-shade': '#808289',
      '--color-medium-tint': '#9d9fa6',

      '--color-light': '#f4f5f8',
      '--color-light-rgb': '244,245,248',
      '--color-light-contrast': '#000000',
      '--color-light-contrast-rgb': '0,0,0',
      '--color-light-shade': '#d7d8da',
      '--color-light-tint': '#f5f6f9',
      '--font-family': "'Courier New', 'Poppins', sans-serif", //Font-family so don't have to import everytime
      '--placeholder-color': 'white',
      '--placeholder-opacity': '1',
    },
    /* Set text color of the entire app for iOS only */
    '.ios': {
      color: 'white',
      '--placeholder-color': 'white',
      '--placeholder-opacity': '1',
    },

    /* Set text color of the entire app for Material Design only */
    '.md': {
      color: 'white',
      '--placeholder-color': 'white',
      '--placeholder-opacity': '1',
    },

    h3: {
      textDecoration: 'underline',
    },
  },
}
