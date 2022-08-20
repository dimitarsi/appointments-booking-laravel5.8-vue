FROM pensiero/apache-php-mysql:php7.4

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY . /var/www/html

RUN apt update
RUN apt install vim -y
RUN apt install php7.4-xdebug -y

COPY ./apache-config/apache2.conf /etc/apache2/apache2.conf
COPY ./apache-config/000-default.conf /etc/apache2/sites-enabled/000-default.conf

RUN cd /var/www/html/packages && composer install
RUN cd /var/www/html/ && composer install

RUN chown www-data:www-data -R /var/www/html/storage

RUN cd /var/www/html

RUN php artisan key:generate
RUN php artisan migrate
RUN php artisan db:seed
