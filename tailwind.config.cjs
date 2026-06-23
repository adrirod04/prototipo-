module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        sigrieaBg: '#F4F0EA',
        sigrieaSidebar: '#1C3040',
        sigrieaBlue: '#1C3040',
        sigrieaAccent: '#2B7A78',
        danger: '#E03E3E'
      },
      fontFamily: {
        title: ['Urbanist', 'sans-serif'],
        body: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
}
