module.exports = {
  
  theme: {
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
        '65':  '17.5rem',
        '66':  '20rem',  
        
        '68':  '27rem',
        '72': '31rem'
      }
    }
  },
  variants: {

    

  },
  plugins: []
}
