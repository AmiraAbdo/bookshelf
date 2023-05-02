<?php
 
$finder = PhpCsFixer\Finder::create()
    ->in(DIR)
    ->exclude('somedir')
;
 
$config = new PhpCsFixer\Config();
return $config->setRules([
        '@PSR12' => true,
    ])
    ->setFinder($finder)
;