module.exports = {
  content: [
    './projects/project/src/**/*.{html,ts}',
    './projects/code/src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      colors: {
        bronze: '#CD7F32',
        silver: '#D3D3D3',
        gold: '#FFD700',
        platinum: '#E5E4E2',
        diamond: '#B9F2FF',
        primary: {
          50: '#E6FCFF',
          100: '#C9F4FB',
          200: '#95E4F8',
          300: '#5EC7EC',
          400: '#36A5DA',
          500: '#0078C2',
          600: '#005DA6',
          700: '#00458B',
          800: '#003170',
          900: '#00235D'
        },
        info: {
          50: '#F5FFE8',
          100: '#E8FBCF',
          200: '#CDF7A0',
          300: '#A4E76D',
          400: '#7BCF47',
          500: '#47AF16',
          600: '#329610',
          700: '#207D0B',
          800: '#126507',
          900: '#085304',
        },
        secondary: {
          50: '#FAFAFC',
          100: '#F0F4F8',
          200: '#E2E9F2',
          300: '#C3CCD8',
          400: '#9CA4B2',
          500: '#6b7280',
          600: '#4E576E',
          700: '#35405C',
          800: '#222B4A',
          900: '#141C3D',
        },
        danger: {
          50: '#FFF2EB',
          100: '#FDE1D3',
          200: '#FBBDA8',
          300: '#F4907B',
          400: '#EA6558',
          500: '#DC2626',
          600: '#BD1B29',
          700: '#9E132B',
          800: '#7F0C2A',
          900: '#690729'
        },
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
