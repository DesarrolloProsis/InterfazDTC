module.exports = {
  
  theme: {
    fontFamily: {
      titulo: ['IBM Plex Sans'],
      boton: ['Montserrat'],
    },
    purge: [
      './src/**/*.html',
      './src/**/*.vue',
      './src/**/*.jsx',
      './src/**/*.js',
    ],
    screens:{
      'sm': {'min': '320px', 'max': '895px'},
      'md': {'min': '896px', 'max': '1024px'},
      'lg': {'min': '1025px', 'max': '1279px'},
      'xl': {'min': '1280px', 'max':'2040px'},
      '4k': {'min': '2040px', 'max':'3840px'}
    },
    extend: {
      spacing: {
        '31': '6.5rem',
        '33': '9.5rem',
        '34': '11rem',
        '35': '10rem',
        '36': '12rem',
        '37': '13rem',
        '49': '14.5rem',
        '62': '18.5rem',
        '63': '17rem',
        '64': '16rem',
        '65': '17.5rem',
        '66': '20rem', 
        '67': '22rem',         
        '68': '27rem',
        '69': '29rem',
        '70': '25rem',
        '71': '30rem',
        '72': '31rem',
        '73': '34rem',
        '74': '37rem',
        '75': '39.5rem',
        '77': '51rem',
        '78': '59rem',
        '79': '90rem',
        '80': '95rem',        
      }      
    }
  },
  variants: {    
  },
  plugins: []
}
