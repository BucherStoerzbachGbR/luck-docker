<?php
return array(
    'db' => array(
        'username' => getenv ( 'root' ),
        'password' => getenv ( 'rootpw' ),
        'dbname' => getenv ( 'shopware' ),
        'host' => getenv ( 'MYSQL_PORT_3306_TCP_ADDR' ),
        'port' => getenv ( 'MYSQL_PORT_3306_TCP_PORT' ),
    )
);