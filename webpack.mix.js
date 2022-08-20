const mix = require('laravel-mix');

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

mix.setPublicPath('./public');

mix.js([
   './resources/js/components/common/index.js',
   './packages/src/resources/assets/js/app.js'
], './storage/app/scripts/app.js');
// mix.setPublicPath('./');


mix.sourceMaps();

mix.disableNotifications();
mix.browserSync("klendr.localhost");