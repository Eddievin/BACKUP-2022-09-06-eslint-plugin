<?php

include_once __DIR__.'/node_modules/@skylib/config/src/php-cs-config.php';

$finder = PhpCsFixer\Finder::create()->in([__DIR__.'/chore']);

$config = new PhpCsFixer\Config();

return $config
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules(PhpCsConfig::$rules)
;
