export const rootStyles = {
  '@global': {
    ':root': {
      '--ion-background-color':
        'linear-gradient(180deg, #253b40 0%, #000000 100%)', //background color of the app
      '--ion-color-primary': '#3962c0',
      '--ion-color-primary-rgb': '57,98,192',
      '--ion-color-primary-contrast': '#ffffff',
      '--ion-color-primary-contrast-rgb': '255,255,255',
      '--ion-color-primary-shade': '#3256a9',
      '--ion-color-primary-tint': '#4d72c6',

      '--ion-color-secondary': '#3dc2ff',
      '--ion-color-secondary-rgb': '61,194,255',
      '--ion-color-secondary-contrast': '#ffffff',
      '--ion-color-secondary-contrast-rgb': '255,255,255',
      '--ion-color-secondary-shade': '#36abe0',
      '--ion-color-secondary-tint': '#50c8ff',

      '--ion-color-tertiary': '#a3f5f3',
      '--ion-color-tertiary-rgb': '163,245,243',
      '--ion-color-tertiary-contrast': '#000000',
      '--ion-color-tertiary-contrast-rgb': '0,0,0',
      '--ion-color-tertiary-shade': '#8fd8d6',
      '--ion-color-tertiary-tint': '#acf6f4',

      '--ion-color-success': '#24b25d',
      '--ion-color-success-rgb': '36,178,93',
      '--ion-color-success-contrast': '#ffffff',
      '--ion-color-success-contrast-rgb': '255,255,255',
      '--ion-color-success-shade': '#209d52',
      '--ion-color-success-tint': '#3aba6d',

      '--ion-color-warning': '#df910c',
      '--ion-color-warning-rgb': '223,145,12',
      '--ion-color-warning-contrast': '#000000',
      '--ion-color-warning-contrast-rgb': '0,0,0',
      '--ion-color-warning-shade': '#c4800b',
      '--ion-color-warning-tint': '#e29c24',

      '--ion-color-danger': '#e23636',
      '--ion-color-danger-rgb': '226,54,54',
      '--ion-color-danger-contrast': '#ffffff',
      '--ion-color-danger-contrast-rgb': '255,255,255',
      '--ion-color-danger-shade': '#c73030',
      '--ion-color-danger-tint': '#e54a4a',

      '--ion-color-dark': '#222428',
      '--ion-color-dark-rgb': '34,36,40',
      '--ion-color-dark-contrast': '#ffffff',
      '--ion-color-dark-contrast-rgb': '255,255,255',
      '--ion-color-dark-shade': '#1e2023',
      '--ion-color-dark-tint': '#383a3e',

      '--ion-color-medium': '#92949c',
      '--ion-color-medium-rgb': '146,148,156',
      '--ion-color-medium-contrast': '#ffffff',
      '--ion-color-medium-contrast-rgb': '255,255,255',
      '--ion-color-medium-shade': '#808289',
      '--ion-color-medium-tint': '#9d9fa6',

      '--ion-color-light': '#f4f5f8',
      '--ion-color-light-rgb': '244,245,248',
      '--ion-color-light-contrast': '#000000',
      '--ion-color-light-contrast-rgb': '0,0,0',
      '--ion-color-light-shade': '#d7d8da',
      '--ion-color-light-tint': '#f5f6f9',
      '--ion-font-family': "'Poppins', sans-serif", //Font-family so don't have to import everytime
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
  },
}
