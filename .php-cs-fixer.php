<?php

include_once __DIR__.'/node_modules/@skylib/config/src/PhpCsConfig.php';

$finder = PhpCsFixer\Finder::create()->in([__DIR__.'/chore']);

$config = new PhpCsFixer\Config();

return $config
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules(Skylib\Config\PhpCsConfig::$rules)
;
