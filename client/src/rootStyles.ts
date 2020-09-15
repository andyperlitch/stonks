export const rootStyles = {
  '@global': {
    ':root': {
      '--ion-background-color':
        'linear-gradient(180deg, #253b40 0%, #000000 100%)', //background color of the app
      '--ion-color-primary': '#E830AB', //primary color used for props as color="primary"
      '--ion-color-secondary': '#56009B', //secondary color user for props as color="secondary"
      '--ion-color-medium': '#3880FF',
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
