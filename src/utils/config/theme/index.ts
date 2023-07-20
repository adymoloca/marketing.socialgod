import lightTheme from './light';
import darkTheme from './dark';
import common from './common';

const light = lightTheme(common);
const dark = darkTheme(common);

const theme = {
	light,
	dark,
};

export default theme;
