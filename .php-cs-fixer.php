<?php

include_once 'node_modules/@skylib/config/src/php-cs-config.php';

$finder = PhpCsFixer\Finder::create()->in(['chore']);

$config = new PhpCsFixer\Config();

return $config
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules(PhpCsConfig::$rules)
;
