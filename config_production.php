<?php
return array(
    'db' => array(
        'username' => 'liquidluck',
        'password' => 'massari555',
        'dbname' => 'ebdb',
        'host' => 'shopware-liquid-luck.cdi8xylxzz9g.eu-west-1.rds.amazonaws.com',
        'port' => '3306'
    ),
    'cdn' => [
        'backend' => 's3',
        'adapters' => [
            's3' => [
                'type' => 's3',
                'mediaUrl' => 'https://dutvf1x4mk0ko.cloudfront.net/',
                'key' => 'AKIAJERMHSSEIWQJJASA',
                'secret' => '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',
                'region' => 'eu-central-1',
                'bucket' => 'liquid-luck-media',
                'prefix' => ''
            ]
        ]
    ]
);
