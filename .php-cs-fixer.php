<?php

include_once 'node_modules/@skylib/config/src/php-cs-rules.php';

$finder = PhpCsFixer\Finder::create()->in(['scripts']);

$config = new PhpCsFixer\Config();

return $config
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules($phpCsRules)
;
